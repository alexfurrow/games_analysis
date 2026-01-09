# Retention Metrics Dashboard

A simple React frontend dashboard with Flask backend to display user retention metrics.

## Setup

### Backend Setup

1. Install Python dependencies using UV:
```bash
uv pip install -r requirements.txt
```
Or if using UV project management:
```bash
uv sync
```

2. Run the Flask server:
```bash
uv run python app.py
```
Or if using a virtual environment:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both the backend and frontend servers are running
2. Open your browser to `http://localhost:3000`
3. The dashboard will automatically fetch and display retention metrics

## API Endpoints

- `GET /api/retention` - Get retention metrics with default period
- `GET /api/retention/<period>` - Get retention metrics for custom period (in seconds)
- `GET /api/health` - Health check endpoint

## Configuration

Create a `.env` file in the root directory with the following content:
```
PORT=5000
RETENTION_PERIOD=11186400
```

Configuration options:
- `PORT` - Backend server port (default: 5000)
- `RETENTION_PERIOD` - Default retention period in seconds (default: 11186400)

Note: If `.env` file is not present, the app will use default values.

