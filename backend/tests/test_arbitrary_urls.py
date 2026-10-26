"""
Tests for Arbitrary User-Provided HTTP/HTTPS URLs
Verifies dynamic analysis across arbitrary domains, paths, query parameters,
ports, subdomains, encodings, and validation rejections.
"""

import unittest
from backend.detector import PhishingRiskDetector, ValidationError


class TestArbitraryURLs(unittest.TestCase):
    def setUp(self):
        self.detector = PhishingRiskDetector()

    def test_popular_major_websites(self):
        urls = [
            "https://github.com/torvalds/linux",
            "https://en.wikipedia.org/wiki/Computer_security",
            "https://stackoverflow.com/questions/tagged/python",
            "https://docs.python.org/3/library/urllib.parse.html",
            "https://news.ycombinator.com/item?id=123456",
        ]
        for url in urls:
            with self.subTest(url=url):
                res = self.detector.analyze(url)
                self.assertIn(res["risk_level"], ["LOW RISK", "MEDIUM RISK"])
                self.assertGreaterEqual(res["risk_score"], 0)
                self.assertLessEqual(res["risk_score"], 100)
                self.assertEqual(res["url"], url)
                self.assertTrue(res["features"]["uses_https"])
                self.assertFalse(res["features"]["is_ip_address"])

    def test_custom_ports_and_protocols(self):
        # HTTP with port 8080
        res = self.detector.analyze("http://internal-portal.university.edu:8080/dashboard")
        self.assertTrue(res["features"]["has_non_standard_port"])
        self.assertEqual(res["features"]["port"], 8080)
        self.assertFalse(res["features"]["uses_https"])
        self.assertTrue(any(r["id"] == "NON_STANDARD_PORT" for r in res["triggered_rules"]))
        self.assertTrue(any(r["id"] == "UNENCRYPTED_HTTP" for r in res["triggered_rules"]))

        # HTTPS with standard port 443
        res2 = self.detector.analyze("https://api.service.io:443/v1/users")
        self.assertFalse(res2["features"]["has_non_standard_port"])
        self.assertEqual(res2["features"]["port"], 443)

    def test_deep_subdomains_and_path_hierarchies(self):
        res = self.detector.analyze("https://dev.staging.corp.internal.example.org/projects/2026/phishing-study")
        self.assertGreaterEqual(res["features"]["subdomain_count"], 3)
        self.assertTrue(any(r["id"] == "EXCESSIVE_SUBDOMAINS" for r in res["triggered_rules"]))

    def test_query_parameters_and_percent_encoding(self):
        res = self.detector.analyze(
            "https://shop.example.com/checkout?item=laptop%20pro&currency=USD&coupon=SAVE%2020&ref=partner%20link"
        )
        self.assertEqual(res["features"]["query_param_count"], 4)
        self.assertGreaterEqual(res["features"]["percent_encoding_count"], 3)
        self.assertTrue(any(r["id"] == "PERCENT_ENCODING" for r in res["triggered_rules"]))

    def test_brand_mimicry_in_hyphenated_hostname(self):
        # Unencrypted HTTP brand mimicry with multiple hyphens and credential keywords
        res = self.detector.analyze("http://paypal-security-verification-portal.com/login")
        self.assertTrue(any(r["id"] == "BRAND_IMPERSONATION" for r in res["triggered_rules"]))
        self.assertTrue(any(r["id"] == "HYPHENATED_HOSTNAME" for r in res["triggered_rules"]))
        self.assertTrue(any(r["id"] == "SENSITIVE_KEYWORDS" for r in res["triggered_rules"]))
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertGreaterEqual(res["risk_score"], 65)

    def test_query_redirect_detection(self):
        res = self.detector.analyze("https://safe-search.com/redirect?url=https://malicious-destination.org/exploit")
        self.assertEqual(res["features"]["hostname"], "safe-search.com")
        self.assertTrue(any(r["id"] == "EMBEDDED_QUERY_REDIRECT" for r in res["triggered_rules"]))

    def test_rejection_of_unsupported_schemes(self):
        invalids = [
            "mailto:admin@example.com",
            "ssh://root@192.168.1.1",
            "ws://socket.example.com",
            "wss://secure-socket.example.com",
            "ldap://directory.example.com",
        ]
        for inv in invalids:
            with self.subTest(url=inv):
                with self.assertRaises(ValidationError):
                    self.detector.analyze(inv)

    def test_dynamic_reanalysis_repeatability(self):
        # Repeated analysis should be idempotent and independent
        u1 = "https://example.com/"
        u2 = "http://192.0.2.10/login"
        r1_a = self.detector.analyze(u1)
        r2 = self.detector.analyze(u2)
        r1_b = self.detector.analyze(u1)
        self.assertEqual(r1_a["risk_score"], r1_b["risk_score"])
        self.assertNotEqual(r1_a["risk_score"], r2["risk_score"])


if __name__ == "__main__":
    unittest.main()
