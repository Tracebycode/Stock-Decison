"""
Data Service

Fetches real stock price data from Yahoo Finance via yfinance.
Returns historical closing prices for technical analysis.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Optional

import yfinance as yf


@dataclass
class StockData:
    """Container for fetched stock market data."""
    prices: list[float]
    timestamp: Optional[str]


def fetch_stock_data(symbol: str) -> StockData:
    """Fetch the last 7 days of closing prices for a given stock symbol.

    Uses Yahoo Finance as the data source.  The symbol lookup is
    case-insensitive (yfinance handles normalisation internally).

    Args:
        symbol: A valid stock ticker (e.g. ``"AAPL"``, ``"GOOG"``).

    Returns:
        A ``StockData`` object containing closing prices (oldest → newest)
        and the ISO-formatted date of the most recent trading day.

    Raises:
        ValueError: If the symbol is invalid or fewer than 5 data points
                    are returned (weekends / holidays can reduce the window).
    """
    stock = yf.Ticker(symbol.upper())
    hist = stock.history(period="7d")

    prices = hist["Close"].tolist()

    if not prices or len(prices) < 5:
        raise ValueError(
            f"Not enough data for symbol '{symbol}'. "
            "It may be invalid or the market may have been closed."
        )

    # Extract latest trading-day timestamp
    latest: datetime = hist.index[-1].to_pydatetime()
    timestamp = latest.strftime("%Y-%m-%d")

    return StockData(prices=prices, timestamp=timestamp)
