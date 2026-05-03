"""
Stock Decision Engine — FastAPI Entry Point

Run with:
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.stock import router as stock_router

app = FastAPI(
    title="Explainable Stock Decision Engine",
    description="A rule-based stock decision API with explainable outputs.",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the React frontend (or any origin during development)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
app.include_router(stock_router)


@app.get("/", tags=["health"])
async def health_check():
    """Simple health-check endpoint."""
    return {"status": "ok", "service": "stock-decision-engine"}
