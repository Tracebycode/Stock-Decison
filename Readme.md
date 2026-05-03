# Explainable Stock Decision & Paper Trading Platform

A full-stack web application designed to help users make informed stock trading decisions using an explainable decision engine. The platform provides a simple interface to input a stock symbol and select a risk tolerance, which the backend uses to generate a BUY, SELL, or HOLD recommendation with a clear explanation based on moving averages.

## Features
- **Explainable Decisions**: Understand exactly *why* a decision was made (e.g., "Price is significantly below Moving Average...").
- **Risk-Aware Analysis**: Adjust the engine's behavior by selecting Low, Medium, or High risk tolerance.
- **Modern UI**: A clean, responsive dashboard built with React and Tailwind CSS.
- **FastAPI Backend**: A highly performant, modular Python backend.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Axios
- **Backend**: FastAPI, Python, Pydantic

## Project Structure
- `/Backend` - The FastAPI application
  - `main.py` - Application entry point
  - `/routes` - API route definitions (e.g., `/analyze`)
  - `/services` - Business logic (data fetching, indicator calculation, decision making)
- `/frontend/stock-app` - The React frontend application

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies (it's recommended to use a virtual environment):
   ```bash
   pip install fastapi uvicorn pydantic
   ```
3. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/stock-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at the URL provided in the terminal (usually `http://localhost:5173`).
