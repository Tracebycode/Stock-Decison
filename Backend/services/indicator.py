"""
Indicator Service

Pure functions that compute technical indicators from price data.
No external libraries — all math is done manually for transparency.
"""


def moving_average(prices: list[float], period: int) -> float:
    """Calculate the Simple Moving Average (SMA) over the last *period* data points.

    Args:
        prices: List of historical closing prices (oldest → newest).
        period: Number of recent data points to average.

    Returns:
        The simple moving average as a float.

    Raises:
        ValueError: If the period is invalid or exceeds available data.
    """
    if period <= 0:
        raise ValueError("Period must be a positive integer.")
    if period > len(prices):
        raise ValueError(
            f"Period ({period}) exceeds available data length ({len(prices)})."
        )

    window = prices[-period:]
    return sum(window) / period


def calculate_rsi(prices: list[float], period: int = 5) -> float:
    """Compute a simple Relative Strength Index (RSI).

    Algorithm:
        1. Calculate price changes between consecutive closing prices.
        2. Separate gains (positive changes) and losses (absolute negative changes).
        3. Average gain and average loss over the look-back *period*.
        4. RS  = average_gain / average_loss
        5. RSI = 100 - (100 / (1 + RS))

    Args:
        prices: At least *period + 1* closing prices (oldest → newest).
        period: Look-back window for averaging gains/losses.

    Returns:
        RSI value between 0 and 100.

    Raises:
        ValueError: If there is insufficient data.
    """
    if len(prices) < period + 1:
        raise ValueError(
            f"Need at least {period + 1} prices to compute RSI with period={period}; "
            f"got {len(prices)}."
        )

    # Price changes over the look-back window
    changes = [
        prices[i] - prices[i - 1]
        for i in range(len(prices) - period, len(prices))
    ]

    gains = [c for c in changes if c > 0]
    losses = [abs(c) for c in changes if c < 0]

    avg_gain = sum(gains) / period if gains else 0.0
    avg_loss = sum(losses) / period if losses else 0.0

    # Edge case: no losses → RSI = 100 (maximum bullish)
    if avg_loss == 0:
        return 100.0

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return round(rsi, 2)


def price_trend(prices: list[float]) -> str:
    """Determine the short-term price direction.

    Compares the last two prices in the series.

    Returns:
        ``"up"``      — last price > previous price
        ``"down"``    — last price < previous price
        ``"neutral"`` — no change
    """
    if len(prices) < 2:
        return "neutral"

    if prices[-1] > prices[-2]:
        return "up"
    elif prices[-1] < prices[-2]:
        return "down"
    else:
        return "neutral"
