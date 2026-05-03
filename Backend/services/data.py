"""
Data Service

Provides simulated stock price data.
In a production system this would be replaced by a real market-data provider.
"""

from typing import Optional

# ---------------------------------------------------------------------------
# In-memory price store (symbol → list of historical closing prices)
# ---------------------------------------------------------------------------

_PRICE_STORE: dict[str, list[float]] = {
    "AAPL":  [100, 102, 101, 105, 110, 108, 112],
    "GOOG":  [2800, 2820, 2810, 2850, 2870, 2860, 2880],
    "TSLA":  [700, 710, 705, 720, 730, 725, 740],
    "AMZN":  [3300, 3320, 3310, 3350, 3370, 3360, 3380],
    "MSFT":  [310, 315, 312, 318, 322, 320, 325],
}


def get_prices(symbol: str) -> Optional[list[float]]:
    """Return the simulated price history for a given stock symbol.

    Lookup is case-insensitive so that ``aapl`` and ``AAPL`` both work.
    Returns ``None`` if the symbol is not found.
    """
    return _PRICE_STORE.get(symbol.upper())
