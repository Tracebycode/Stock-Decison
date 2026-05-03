"""
Indicator Service

Pure functions that compute technical indicators from price data.
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
