from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load data
def load_data():
    """Load registration and authentication data"""
    reg_data = pd.read_csv('reg_data.csv', sep=';')
    auth_data = pd.read_csv('auth_data.csv', sep=';')
    retention_df = pd.merge(reg_data, auth_data, on='uid', how='left')
    return retention_df

# Retention calculation function
def retention_calc(df, period):
    """
    Calculate retention metrics for a given period (in seconds)
    Returns a dictionary with retention statistics
    """
    retained = df[
        (df['auth_ts'] != df['reg_ts']) &
        ((df["auth_ts"] - df["reg_ts"]) <= period) & 
        ((df["auth_ts"] - df["reg_ts"]) >= 0)
    ]
    
    days = period // 86400
    rem1 = period % 86400
    hours = rem1 // 3600
    rem2 = rem1 % 3600
    minutes = rem2 // 60
    seconds = rem2 % 60
    
    total_users = df['uid'].nunique()
    retained_users = retained['uid'].nunique()
    retention_rate = (retained_users / total_users * 100) if total_users > 0 else 0
    
    return {
        'retained_users': int(retained_users),
        'total_users': int(total_users),
        'retention_rate': round(retention_rate, 2),
        'period_days': int(days),
        'period_hours': int(hours),
        'period_minutes': int(minutes),
        'period_seconds': int(seconds),
        'period_total_seconds': int(period),
        'message': f'{retained_users} users were retained over {days} days, {hours} hours, and {minutes} minutes'
    }

@app.route('/api/retention', methods=['GET'])
def get_retention():
    """API endpoint to get retention metrics"""
    try:
        # Load data
        retention_df = load_data()
        
        # Get period from query parameter (default: 11186400 seconds = ~129 days)
        period = int(os.getenv('RETENTION_PERIOD', 11186400))
        
        # Calculate retention
        result = retention_calc(retention_df, period)
        
        return jsonify({
            'success': True,
            'data': {
                'name': 'User Retention Metrics',
                'retention_calc': result
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/retention/<int:period>', methods=['GET'])
def get_retention_custom(period):
    """API endpoint to get retention metrics for a custom period (in seconds)"""
    try:
        # Load data
        retention_df = load_data()
        
        # Calculate retention
        result = retention_calc(retention_df, period)
        
        return jsonify({
            'success': True,
            'data': {
                'name': 'User Retention Metrics',
                'retention_calc': result
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)

