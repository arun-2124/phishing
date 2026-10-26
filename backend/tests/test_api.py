"""
Unit and Integration Tests for PhishGuard Flask API
"""

import json
import unittest
from backend.app import app


class TestPhishGuardAPI(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()

    def test_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "healthy")
        self.assertFalse(data["network_requests"])

    def test_get_samples(self):
        res = self.client.get("/api/samples")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("samples", data)
        self.assertGreaterEqual(len(data["samples"]), 3)

    def test_analyze_clean_url(self):
        payload = {"url": "https://example.com/login"}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["risk_level"], "LOW RISK")
        self.assertIn("risk_score", data)
        self.assertIn("features", data)
        self.assertIn("components", data)
        self.assertIn("recommendation", data)
        self.assertIn("disclaimer", data)

    def test_analyze_ip_address_url(self):
        payload = {"url": "http://192.0.2.10/login?verify=1"}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["risk_level"], "HIGH RISK")
        self.assertTrue(data["features"]["is_ip_address"])

    def test_analyze_missing_url_field(self):
        payload = {"not_url": "https://example.com"}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertIn("error", data)

    def test_analyze_empty_url(self):
        payload = {"url": "   "}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertIn("error", data)

    def test_analyze_unsupported_scheme(self):
        payload = {"url": "ftp://files.example.com"}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertIn("error", data)
        self.assertIn("Validation Error", data["error"])

    def test_analyze_payload_too_large(self):
        payload = {"url": "https://example.com/" + ("x" * 5000)}
        res = self.client.post(
            "/api/analyze",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(res.status_code, 413)

    def test_analyze_invalid_content_type(self):
        res = self.client.post(
            "/api/analyze",
            data="url=https://example.com",
            content_type="application/x-www-form-urlencoded"
        )
        self.assertEqual(res.status_code, 400)

    def test_404_handling(self):
        res = self.client.get("/api/unknown_route")
        self.assertEqual(res.status_code, 404)


if __name__ == "__main__":
    unittest.main()
