"""
Decision Service

Rule-based engine that produces an explainable BUY / SELL / HOLD decision
based on the current price, a moving average, and the user's risk tolerance.
"""


def make_decision(
    price: float,
    ma: float,
    risk: str = "medium",
) -> tuple[str, str]:
    """Return a (decision, explanation) tuple.

    Rules
    -----
    Base signal (price vs. MA):
        * price > MA  →  bullish  →  BUY
        * price < MA  →  bearish  →  SELL
        * price == MA →  neutral  →  HOLD

    Risk modifier:
        * **low**  — conservative: demote BUY/SELL → HOLD unless the gap is large (> 3 %).
        * **high** — aggressive: keep BUY/SELL as-is (no extra filter).
        * **medium** — balanced: keep the base signal unchanged.
    """

    diff_pct = ((price - ma) / ma) * 100 if ma != 0 else 0.0

    # ── Base signal ──────────────────────────────────────────────────────
    if price > ma:
        base_decision = "BUY"
        base_reason = (
            f"Price (${price}) is above the moving average (${ma:.2f}), "
            "indicating a bullish trend."
        )
    elif price < ma:
        base_decision = "SELL"
        base_reason = (
            f"Price (${price}) is below the moving average (${ma:.2f}), "
            "indicating a bearish trend."
        )
    else:
        return (
            "HOLD",
            f"Price (${price}) equals the moving average (${ma:.2f}). "
            "No clear signal — holding position.",
        )

    # ── Risk adjustment ──────────────────────────────────────────────────
    risk = risk.lower()

    if risk == "low" and abs(diff_pct) <= 3.0:
        return (
            "HOLD",
            f"{base_reason} However, the difference is small "
            f"({diff_pct:+.1f} %) and risk tolerance is low — suggesting to hold.",
        )

    if risk == "high":
        return (
            base_decision,
            f"{base_reason} Risk tolerance is high — acting aggressively "
            f"on a {diff_pct:+.1f} % gap.",
        )

    # medium (default)
    return (base_decision, base_reason)
