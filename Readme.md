# Explainable Stock Decision & Paper Trading

Full-stack app for **BUY / SELL / HOLD** recommendations from a rule-based, multi-indicator score, with human-readable explanations and a **client-side paper trading** simulator. Market data comes from **Yahoo Finance** via `yfinance`.

## Features

- **Explainable decisions** — Composite score from moving average, RSI, and short-term trend; each rule contributes to an `explanation` list and indicator breakdown in the UI.
- **Risk levels** — `low`, `medium`, or `high` adjust buy/sell score thresholds (more conservative or aggressive).
- **Charts** — Price and rolling moving average over recent history (`history` from the API); Recharts in the dashboard.
- **Paper trading** — After an analysis, simulate fixed **5-share** buy/sell against a starting **$100,000** balance; holdings and trades stay in the browser (not persisted).
- **API** — FastAPI with OpenAPI docs; single analysis route plus a health check.

## Tech stack

| Layer | Stack |
|--------|--------|
| Frontend | React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), Recharts, `fetch`-based API client in `src/services/api.js` |
| Backend | FastAPI, Pydantic, `yfinance`; blocking fetch wrapped with `asyncio.to_thread` |

## API (backend)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Health: `status`, `service`, `version` |
| `POST` | `/analyze` | Body: `{ "symbol": "AAPL", "risk": "medium" }` — `risk` must be `low`, `medium`, or `high` |

**`POST /analyze` response (summary):** `decision`, `score`, `confidence`, `price`, `ma`, `rsi`, `trend`, `timestamp`, `indicators` (`ma_signal`, `rsi_signal`, `trend_signal`), `explanation` (string list), `history` (`time`, `price`, `ma` per day for charts).

**Data window:** Last **14 trading days** of closes; at least **5** points required or the API returns `404` with a clear message.

**Scoring (backend):** MA (±2), RSI oversold/overbought (±2 or 0), trend vs previous close (±1 or 0). Risk adjusts buy/sell thresholds (`decision.py`).

## Project structure

```
Backend/
  main.py              # FastAPI app, CORS, router mount
  routes/
    stock.py           # POST /analyze
  services/
    data.py            # Yahoo Finance fetch
    indicator.py       # SMA, RSI, trend
    decision.py        # Score + risk + BUY/SELL/HOLD

frontend/stock-app/
  src/
    App.jsx
    main.jsx
    index.css
    pages/
      Dashboard.jsx    # Analyze flow, portfolio state, layout
    components/
      StockForm.jsx
      ResultCard.jsx
      ChartSection.jsx
      PortfolioCard.jsx
      IndicatorBreakdown.jsx
      ScoreVisualization.jsx
      ExplanationPanel.jsx
    services/
      api.js           # POST http://localhost:5000/analyze
```

## Prerequisites

- Python **3.10+** recommended (3.8+ may work)
- Node.js **18+**

## Backend setup

From the repo root:

```bash
cd Backend
python -m venv .venv
```

Activate the venv (Windows PowerShell: `.\.venv\Scripts\Activate.ps1`), then:

```bash
pip install fastapi uvicorn pydantic yfinance
uvicorn main:app --reload --port 5000
```

- API base: `http://localhost:5000`
- Interactive docs: `http://localhost:5000/docs`

> **Port:** The frontend is configured for **5000**. If you run Uvicorn without `--port 5000`, update `frontend/stock-app/src/services/api.js` to match.

## Frontend setup

```bash
cd frontend/stock-app
npm install
npm run dev
```

Use the URL Vite prints (typically `http://localhost:5173`). Keep the backend running on port **5000** (or change the client URL above).

## Scripts

- **Frontend:** `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
- **Backend:** `uvicorn main:app --reload --port 5000`

## Production notes

- CORS is set to `allow_origins=["*"]` in `main.py` for development; restrict origins in production.
- Paper trading and portfolio data are **in-memory in the browser only** — refreshing the page resets the simulated portfolio.
