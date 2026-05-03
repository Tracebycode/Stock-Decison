"""
Route: /analyze

Accepts a stock symbol and risk level, orchestrates the data → indicator →
decision pipeline, and returns a fully explainable JSON response.

Uses ``asyncio.to_thread`` to run the blocking yfinance call without
stalling the async event loop.
"""

import asyncio

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Any, Optional

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
    explanation: list[str]


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_stock(payload: AnalyzeRequest):
    """Analyze a stock symbol and return a multi-indicator, scored decision."""

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

    return AnalyzeResponse(**result)
