"""
Decision Service

Multi-indicator, scoring-based decision engine.
Produces an explainable BUY / SELL / HOLD recommendation with a confidence
level derived from a composite score across three technical signals.
"""

from __future__ import annotations
from typing import Any


# ── Score thresholds ────────────────────────────────────────────────────────

_BUY_THRESHOLD = 2
_SELL_THRESHOLD = -2


def make_decision(
    price: float,
    ma: float,
    rsi: float,
    trend: str,
    risk: str = "medium",
) -> dict[str, Any]:
    """Run the scoring engine and return a structured decision payload.

    Scoring Rules
    -------------
    1. **Moving Average**
       - price > MA  → +2
       - price ≤ MA  → −2

    2. **RSI**
       - RSI < 30 (oversold)   → +2
       - RSI > 70 (overbought) → −2
       - otherwise              → 0

    3. **Trend**
       - up   → +1
       - down → −1
       - neutral → 0

    Risk Adjustment
    ---------------
    * *low*  — conservative: BUY requires score ≥ 3 instead of 2.
    * *high* — aggressive: BUY allowed at score ≥ 1.
    * *medium* — default thresholds apply.

    Returns a dict ready to be serialized as the API response body.
    """

    score: int = 0
    signals: list[str] = []
    indicators: dict[str, str] = {}

    # ── Rule 1: Moving Average ──────────────────────────────────────────
    if price > ma:
        score += 2
        signals.append("Price above moving average (+2)")
        indicators["ma_signal"] = "+2"
    else:
        score -= 2
        signals.append("Price below moving average (-2)")
        indicators["ma_signal"] = "-2"

    # ── Rule 2: RSI ─────────────────────────────────────────────────────
    if rsi < 30:
        score += 2
        signals.append("RSI indicates oversold (+2)")
        indicators["rsi_signal"] = "+2"
    elif rsi > 70:
        score -= 2
        signals.append("RSI indicates overbought (-2)")
        indicators["rsi_signal"] = "-2"
    else:
        signals.append("RSI neutral (0)")
        indicators["rsi_signal"] = "0"

    # ── Rule 3: Trend ───────────────────────────────────────────────────
    if trend == "up":
        score += 1
        signals.append("Uptrend detected (+1)")
        indicators["trend_signal"] = "+1"
    elif trend == "down":
        score -= 1
        signals.append("Downtrend detected (-1)")
        indicators["trend_signal"] = "-1"
    else:
        signals.append("Trend neutral (0)")
        indicators["trend_signal"] = "0"

    # ── Risk adjustment ─────────────────────────────────────────────────
    risk = risk.lower()

    if risk == "low":
        buy_threshold = 3        # more conservative
        sell_threshold = -2
    elif risk == "high":
        buy_threshold = 1        # more aggressive
        sell_threshold = -3
    else:
        buy_threshold = _BUY_THRESHOLD
        sell_threshold = _SELL_THRESHOLD

    # ── Final decision ──────────────────────────────────────────────────
    if score >= buy_threshold:
        decision = "BUY"
    elif score <= sell_threshold:
        decision = "SELL"
    else:
        decision = "HOLD"

    # ── Confidence ──────────────────────────────────────────────────────
    abs_score = abs(score)
    if abs_score >= 3:
        confidence = "High"
    elif abs_score >= 1:
        confidence = "Medium"
    else:
        confidence = "Low"

    return {
        "decision": decision,
        "score": score,
        "confidence": confidence,
        "price": price,
        "ma": round(ma, 2),
        "rsi": rsi,
        "trend": trend,
        "indicators": indicators,
        "explanation": signals,
    }
