"""
Data Service — fetches real OHLCV data from Yahoo Finance via yfinance.
Returns closing prices + display dates for indicator computation and chart rendering.
"""

from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional
import yfinance as yf


@dataclass
class StockData:
    prices: list[float]
    dates: List[str] = field(default_factory=list)
    timestamp: Optional[str] = None


def fetch_stock_data(symbol: str) -> StockData:
    stock = yf.Ticker(symbol.upper())
    hist = stock.history(period="14d")
    prices = hist["Close"].tolist()

    if not prices or len(prices) < 5:
        raise ValueError(
            f"Not enough data for '{symbol}'. It may be invalid or markets were closed."
        )

    dates: List[str] = [idx.to_pydatetime().strftime("%b %d") for idx in hist.index]
    latest: datetime = hist.index[-1].to_pydatetime()
    timestamp = latest.strftime("%Y-%m-%d %H:%M UTC")

    return StockData(prices=prices, dates=dates, timestamp=timestamp)
