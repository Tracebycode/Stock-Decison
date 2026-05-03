"""
Route: /analyze

Accepts a stock symbol and risk level, orchestrates the data → indicator →
decision pipeline, and returns a fully explainable JSON response including
a `history` array for chart rendering.

Uses ``asyncio.to_thread`` to run the blocking yfinance call without
stalling the async event loop.
"""

import asyncio
from typing import Any, List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.data import fetch_stock_data
from services.indicator import moving_average, calculate_rsi, price_trend
from services.decision import make_decision

router = APIRouter(tags=["stock"])


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------

class AnalyzeRequest(BaseModel):
    symbol: str = Field(..., min_length=1, examples=["AAPL"])
    risk: str = Field(
        default="medium",
        pattern="^(low|medium|high)$",
        description="Risk tolerance: low, medium, or high",
    )


class IndicatorDetail(BaseModel):
    ma_signal: str
    rsi_signal: str
    trend_signal: str


class HistoryPoint(BaseModel):
    time: str
    price: float
    ma: float


class AnalyzeResponse(BaseModel):
    decision: str
    score: int
    confidence: str
    price: float
    ma: float
    rsi: float
    trend: str
    timestamp: Optional[str] = None
    indicators: IndicatorDetail
    explanation: List[str]
    history: List[HistoryPoint] = []


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_stock(payload: AnalyzeRequest):
    """Analyze a stock symbol and return a multi-indicator, scored decision
    along with a full history array suitable for chart rendering."""

    # ── Fetch real price data (blocking → offloaded to thread) ──────────
    try:
        stock_data = await asyncio.to_thread(fetch_stock_data, payload.symbol)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch market data for '{payload.symbol}': {exc}",
        )

    prices = stock_data.prices
    dates = stock_data.dates

    # ── Compute indicators ──────────────────────────────────────────────
    period = min(5, len(prices))
    current_price = prices[-1]

    ma_value = moving_average(prices, period)
    rsi_value = calculate_rsi(prices, period=period)
    trend_value = price_trend(prices)

    # ── Produce decision ────────────────────────────────────────────────
    result: dict[str, Any] = make_decision(
        price=current_price,
        ma=ma_value,
        rsi=rsi_value,
        trend=trend_value,
        risk=payload.risk,
    )

    result["timestamp"] = stock_data.timestamp

    # ── Build per-day history for the chart ─────────────────────────────
    # For each trading day we compute a rolling 5-day MA up to that point.
    history: List[dict] = []
    for i, (price, date) in enumerate(zip(prices, dates)):
        if i < period - 1:
            # Not enough data yet for a full MA window — skip early points
            continue
        window = prices[max(0, i - period + 1): i + 1]
        day_ma = round(sum(window) / len(window), 2)
        history.append({
            "time": date,
            "price": round(price, 2),
            "ma": day_ma,
        })

    result["history"] = history

    return AnalyzeResponse(**result)
