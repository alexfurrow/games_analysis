import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(7); // Default to 7 days

  useEffect(() => {
    fetchRetentionData(selectedPeriod);
  }, [selectedPeriod]);

  const fetchRetentionData = async (period = 7) => {
    const fetchStart = performance.now();
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:14',message:'Fetch started',data:{period:Number(period),startTime:Number(fetchStart)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    try {
      const setLoadingStart = performance.now();
      setLoading(true);
      setError(null);
      const setLoadingTime = performance.now() - setLoadingStart;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:17',message:'setLoading called',data:{setLoadingTime:Number(setLoadingTime),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      const fetchCallStart = performance.now();
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/retention/${period}`);
      const fetchCallTime = performance.now() - fetchCallStart;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:19',message:'Fetch call complete',data:{fetchCallTime:Number(fetchCallTime),status:Number(response.status),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const parseStart = performance.now();
      const result = await response.json();
      const parseTime = performance.now() - parseStart;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:25',message:'JSON parse complete',data:{parseTime:Number(parseTime),success:Boolean(result.success),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      if (result.success) {
        const setDataStart = performance.now();
        setData(result.data);
        const setDataTime = performance.now() - setDataStart;
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:28',message:'setData called',data:{setDataTime:Number(setDataTime),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
      } else {
        setError(result.error || 'Failed to fetch data');
      }
      
      const totalTime = performance.now() - fetchStart;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:32',message:'Fetch function complete',data:{totalTime:Number(totalTime),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
      setData(null);
    } finally {
      const setLoadingFalseStart = performance.now();
      setLoading(false);
      const setLoadingFalseTime = performance.now() - setLoadingFalseStart;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3dec54ad-78f0-4689-9d15-edc577496530',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.js:36',message:'setLoading(false) called',data:{setLoadingFalseTime:Number(setLoadingFalseTime),period:Number(period)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    }
  };

  const handlePeriodChange = (event) => {
    const newPeriod = parseInt(event.target.value);
    setSelectedPeriod(newPeriod);
  };

  if (loading) {
    return (
      <div className="app">
        <header className="header-banner">
          <h1 className="title">Retention Dashboard</h1>
        </header>
        <div className="container">
          <div className="loading">Loading retention metrics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="header-banner">
          <h1 className="title">User Retention Metrics</h1>
        </header>
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
        <header className="header-banner">
          <h1 className="title">User Retention Metrics</h1>
        </header>
        <div className="container">
          <div className="error">No data available</div>
        </div>
      </div>
    );
  }

  const { name, retention_calc } = data;

  if (!retention_calc) {
    return (
      <div className="app">
        <header className="header-banner">
          <h1 className="title">{name || 'Retention Dashboard'}</h1>
        </header>
        <div className="container">
          <div className="error">Missing data: retention_calc not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header-banner">
        <h1 className="title">{name}</h1>
      </header>
      <div className="container">
        <div className="period-selector">
          <label htmlFor="period-select">Retention Period:</label>
          <select 
            id="period-select" 
            value={selectedPeriod} 
            onChange={handlePeriodChange}
            className="period-dropdown"
          >
            <option value={3}>3 Days</option>
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
          </select>
        </div>
        
        <div className="metrics-container">
          <div className="metric-card">
            <h2 className="metric-header">
              Retention Rate
              <span className="info-icon" title="Retention Calculation">
                i
                <span className="tooltip">
                  Retention rate is calculated as the percentage of users who logged in 
                  within {retention_calc.period_days} days after their registration date.
                </span>
              </span>
            </h2>
            <p className="metric-value">{retention_calc.retention_rate}%</p>
          </div>
        </div>

        <button className="refresh-button" onClick={() => fetchRetentionData(selectedPeriod)}>
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;

