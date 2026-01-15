# Retention Metrics Dashboard

A simple React frontend dashboard with Flask backend to display user retention metrics.

## Setup

### Backend Setup

1. Install Python dependencies using UV:
```bash
uv pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

Or use the provided script:
```bash
chmod +x run.sh
./run.sh
```

The backend will run on `http://localhost:8000` (or the port specified in `.env`)

**For Production Deployment:**
- Set `FLASK_DEBUG=False` in your `.env` file
- Consider using a production WSGI server like gunicorn:
  ```bash
  uv pip install gunicorn
  gunicorn -w 4 -b 0.0.0.0:$PORT app:app
  ```

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

The frontend will run on `http://localhost:3000` and automatically open in your browser.

**Note:** The frontend is configured to connect to the backend at `http://localhost:8000` by default.

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
PORT=8000
RETENTION_PERIOD=11186400
```

Configuration options:
- `PORT` - Backend server port (default: 8000, changed from 5000 to avoid macOS AirPlay conflict)
- `RETENTION_PERIOD` - Default retention period in seconds (default: 11186400)

Note: If `.env` file is not present, the app will use default values.

