"""
Route: /analyze

Accepts a stock symbol and risk level, returns an explainable decision.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.data import get_prices
from services.indicator import moving_average
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


class AnalyzeResponse(BaseModel):
    decision: str
    explanation: str
    price: float
    ma: float


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_stock(payload: AnalyzeRequest):
    """Analyze a stock symbol and return an explainable BUY / SELL / HOLD decision."""

    prices = get_prices(payload.symbol)

    if not prices or len(prices) < 2:
        raise HTTPException(
            status_code=404,
            detail=f"No sufficient price data available for symbol '{payload.symbol}'.",
        )

    period = min(5, len(prices))          # default MA window
    ma_value = moving_average(prices, period)
    current_price = prices[-1]

    decision, explanation = make_decision(
        price=current_price,
        ma=ma_value,
        risk=payload.risk,
    )

    return AnalyzeResponse(
        decision=decision,
        explanation=explanation,
        price=current_price,
        ma=round(ma_value, 2),
    )
