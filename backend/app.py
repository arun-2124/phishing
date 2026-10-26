"""
PhishGuard - Flask REST API
Provides endpoints for URL phishing risk analysis.
Operates completely locally; never visits, fetches, or pings submitted targets.
"""

import sys
from os import path
sys.path.insert(0, path.dirname(path.dirname(path.abspath(__file__))))

from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.detector import PhishingRiskDetector, ValidationError

app = Flask(__name__)

# Configure CORS to allow local development frontend
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "*"
        ]
    }
})

# Instantiate detector singleton
detector = PhishingRiskDetector()

DEMO_SAMPLES = [
    {
        "id": "legit",
        "title": "Standard Reference URL",
        "url": "https://example.com/",
        "badge": "Standard Clean",
        "description": "Standard HTTPS domain with clean hierarchy and no deceptive indicators."
    },
    {
        "id": "ip_host",
        "title": "Raw IP Address Hostname",
        "url": "http://192.0.2.10/login?verify=1",
        "badge": "Structural Red Flag",
        "description": "Uses reserved documentation IPv4 address over unencrypted HTTP with login query."
    },
    {
        "id": "subdomain_kw",
        "title": "Subdomain & Keyword Nuance",
        "url": "https://login.example.com/account/verify",
        "badge": "Keyword Context",
        "description": "Demonstrates legitimate corporate patterns (login subdomain) vs deceptive mimicry."
    },
    {
        "id": "spoofed_brand",
        "title": "Compound Deceptive URL",
        "url": "https://paypal.com:account@update-billing-support.tk/login",
        "badge": "High Risk Spoof",
        "description": "Exhibits brand impersonation, userinfo authority disguise (@), and abuse-prone TLD."
    },
    {
        "id": "malformed",
        "title": "Unsupported Protocol",
        "url": "ftp://files.example.com/archive.zip",
        "badge": "Validation Test",
        "description": "Non-HTTP protocol to verify safe input rejection and user guidance."
    }
]


@app.route("/api/health", methods=["GET"])
def health_check():
    """Confirms API status and readiness."""
    return jsonify({
        "status": "healthy",
        "service": "PhishGuard Phishing URL Analysis API",
        "version": "1.0.0",
        "engine": "Python urllib.parse & ipaddress rule-based heuristic detector",
        "network_requests": False
    }), 200


@app.route("/api/samples", methods=["GET"])
def get_samples():
    """Returns curated non-live demonstration samples."""
    return jsonify({
        "samples": DEMO_SAMPLES
    }), 200


@app.route("/api/analyze", methods=["POST"])
def analyze_url():
    """
    Analyzes submitted URL string locally.
    Never executes or connects to the remote host.
    """
    if not request.is_json:
        return jsonify({
            "error": "Bad Request",
            "message": "Request payload must be formatted as JSON (Content-Type: application/json)."
        }), 400

    data = request.get_json(silent=True)
    if not data or not isinstance(data, dict):
        return jsonify({
            "error": "Bad Request",
            "message": "Invalid JSON body provided. Expected object with 'url' field."
        }), 400

    raw_url = data.get("url")
    if raw_url is None:
        return jsonify({
            "error": "Missing Field",
            "message": "The 'url' property is required in request payload."
        }), 400

    if not isinstance(raw_url, str):
        return jsonify({
            "error": "Invalid Data Type",
            "message": "The 'url' property must be a string."
        }), 400

    trimmed = raw_url.strip()
    if not trimmed:
        return jsonify({
            "error": "Empty Input",
            "message": "Please enter a valid URL to analyze."
        }), 400

    if len(trimmed) > 4096:
        return jsonify({
            "error": "Payload Too Large",
            "message": "Submitted URL exceeds 4,096 character limit."
        }), 413

    try:
        result = detector.analyze(trimmed)
        return jsonify(result), 200

    except ValidationError as ve:
        return jsonify({
            "error": "Validation Error",
            "message": str(ve),
            "suggestion": "Check that the URL begins with 'https://' or 'http://' and contains a valid host."
        }), 400

    except Exception as e:
        return jsonify({
            "error": "Internal Error",
            "message": "An unexpected error occurred while analyzing the URL."
        }), 500


@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "error": "Not Found",
        "message": "Requested endpoint does not exist. Available endpoints: /api/health, /api/samples, /api/analyze."
    }), 404


@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({
        "error": "Method Not Allowed",
        "message": "The HTTP method is not supported for this endpoint."
    }), 405


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
