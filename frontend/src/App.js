import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRetentionData();
  }, []);

  const fetchRetentionData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/retention');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading retention metrics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="container">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={fetchRetentionData}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app">
        <div className="container">
          <div className="error">No data available</div>
        </div>
      </div>
    );
  }

  const { name, retention_calc } = data;

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">{name}</h1>
        
        <div className="metrics-container">
          <div className="metric-card">
            <h2>Retention Calculation Output</h2>
            <div className="metric-content">
              <p className="message">{retention_calc.message}</p>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Retained Users</h3>
              <p className="metric-value">{retention_calc.retained_users.toLocaleString()}</p>
            </div>

            <div className="metric-card">
              <h3>Total Users</h3>
              <p className="metric-value">{retention_calc.total_users.toLocaleString()}</p>
            </div>

            <div className="metric-card">
              <h3>Retention Rate</h3>
              <p className="metric-value">{retention_calc.retention_rate}%</p>
            </div>

            <div className="metric-card">
              <h3>Period</h3>
              <p className="metric-value">
                {retention_calc.period_days} days, {retention_calc.period_hours} hours, {retention_calc.period_minutes} minutes
              </p>
            </div>
          </div>
        </div>

        <button className="refresh-button" onClick={fetchRetentionData}>
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;

