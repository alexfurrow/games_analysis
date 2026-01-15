from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
# Enable CORS for React frontend - allow all origins in production
CORS(app, resources={r"/api/*": {"origins": "*"}})

