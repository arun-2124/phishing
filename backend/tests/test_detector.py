"""
Comprehensive Unit Tests for PhishGuard Python URL Detector
"""

import unittest
from backend.detector import PhishingRiskDetector, URLFeatureExtractor, ValidationError


class TestURLDetector(unittest.TestCase):
    def setUp(self):
        self.detector = PhishingRiskDetector()

    def test_standard_https_url(self):
        res = self.detector.analyze("https://example.com/")
        self.assertEqual(res["risk_level"], "LOW RISK")
        self.assertLessEqual(res["risk_score"], 29)
        self.assertEqual(res["features"]["scheme"], "https")
        self.assertTrue(res["features"]["uses_https"])
        self.assertFalse(res["features"]["is_ip_address"])
        self.assertIn("recommendation", res)
        self.assertIn("disclaimer", res)

    def test_standard_http_url(self):
        res = self.detector.analyze("http://example.com/")
        # HTTP triggers unencrypted transport warning
        self.assertTrue(any(r["id"] == "UNENCRYPTED_HTTP" for r in res["triggered_rules"]))
        self.assertFalse(res["features"]["uses_https"])
        # Should still be low or medium risk, never high for plain legitimate domain
        self.assertIn(res["risk_level"], ["LOW RISK", "MEDIUM RISK"])

    def test_ipv4_hostname(self):
        res = self.detector.analyze("http://192.0.2.10/login?verify=1")
        self.assertTrue(res["features"]["is_ip_address"])
        self.assertEqual(res["features"]["ip_version"], 4)
        self.assertTrue(any(r["id"] == "IP_ADDRESS_HOSTNAME" for r in res["triggered_rules"]))
        self.assertEqual(res["risk_level"], "HIGH RISK")
        self.assertGreaterEqual(res["risk_score"], 65)

    def test_ipv6_literal_hostname(self):
        res = self.detector.analyze("http://[2001:db8::1]/path")
        self.assertTrue(res["features"]["is_ip_address"])
        self.assertEqual(res["features"]["ip_version"], 6)
        self.assertTrue(any(r["id"] == "IP_ADDRESS_HOSTNAME" for r in res["triggered_rules"]))

    def test_unusually_long_url(self):
        long_url = "https://example.com/" + ("a" * 150)
        res = self.detector.analyze(long_url)
        self.assertGreater(res["features"]["total_length"], 120)
        self.assertTrue(any(r["id"] == "EXCESSIVE_URL_LENGTH" for r in res["triggered_rules"]))

    def test_multiple_hostname_labels_deep_subdomains(self):
        deep_url = "https://sub4.sub3.sub2.sub1.example.com/portal"
        res = self.detector.analyze(deep_url)
        self.assertGreaterEqual(res["features"]["subdomain_count"], 3)
        self.assertTrue(any(r["id"] == "EXCESSIVE_SUBDOMAINS" for r in res["triggered_rules"]))

    def test_user_information_in_url_authority(self):
        spoofed_url = "https://paypal.com:secret@phishing-target.com/login"
        res = self.detector.analyze(spoofed_url)
        self.assertTrue(res["features"]["has_userinfo"])
        self.assertTrue(any(r["id"] == "USERINFO_EMBEDDED" for r in res["triggered_rules"]))
        self.assertGreaterEqual(res["risk_score"], 35)

    def test_url_with_query_parameters(self):
        url = "https://example.com/search?category=books&order=desc&page=2"
        res = self.detector.analyze(url)
        self.assertEqual(res["features"]["query_param_count"], 3)
        self.assertEqual(res["features"]["hostname"], "example.com")

    def test_malformed_url_rejected(self):
        with self.assertRaises(ValidationError):
            self.detector.analyze("https://")
        with self.assertRaises(ValidationError):
            self.detector.analyze("http://   /space")
        with self.assertRaises(ValidationError):
            self.detector.analyze("not_a_url")

    def test_unsupported_schemes_rejected(self):
        unsupported = [
            "ftp://files.example.com",
            "javascript:alert('xss')",
            "data:text/html,<h1>test</h1>",
            "file:///C:/Windows/System32",
        ]
        for url in unsupported:
            with self.subTest(url=url):
                with self.assertRaises(ValidationError):
                    self.detector.analyze(url)

    def test_empty_or_whitespace_input(self):
        with self.assertRaises(ValidationError):
            self.detector.analyze("")
        with self.assertRaises(ValidationError):
            self.detector.analyze("   \t\n ")
        with self.assertRaises(ValidationError):
            self.detector.analyze(None)

    def test_unusual_port(self):
        res = self.detector.analyze("https://example.com:8443/account")
        self.assertTrue(res["features"]["has_non_standard_port"])
        self.assertEqual(res["features"]["port"], 8443)
        self.assertTrue(any(r["id"] == "NON_STANDARD_PORT" for r in res["triggered_rules"]))

    def test_hostname_with_uppercase_characters(self):
        res = self.detector.analyze("https://EXAMPLE.COM/login")
        self.assertEqual(res["features"]["hostname"], "example.com")
        self.assertEqual(res["risk_level"], "LOW RISK")

    def test_hostname_with_trailing_dot(self):
        res = self.detector.analyze("https://example.com./path")
        self.assertEqual(res["features"]["hostname"], "example.com")
        self.assertFalse(res["features"]["hostname"].endswith("."))

    def test_misleading_query_string_does_not_affect_hostname(self):
        # Extremely important: Query parameter contains another URL/domain text
        url = "https://example.com/search?q=https://fake-bank.com/login&target=paypal.com"
        res = self.detector.analyze(url)
        # Hostname MUST remain example.com and NOT fake-bank.com or paypal.com
        self.assertEqual(res["features"]["hostname"], "example.com")
        self.assertEqual(res["components"]["hostname"], "example.com")
        # Should identify embedded URL in query without corrupting host features
        self.assertEqual(res["features"]["subdomain_count"], 0)

    def test_subdomain_keyword_demonstration_sample(self):
        # https://login.example.com/account/verify
        res = self.detector.analyze("https://login.example.com/account/verify")
        # Demonstrates moderate keyword/subdomain indicator, but should not be classified HIGH RISK
        self.assertNotEqual(res["risk_level"], "HIGH RISK")
        self.assertLess(res["risk_score"], 65)

    def test_score_bounded_between_zero_and_hundred(self):
        # Highly suspicious compound URL
        evil = "http://paypal.com:update@192.0.2.1:8080/login/verify/update?redirect=https://bad.com&token=" + ("x"*200)
        res = self.detector.analyze(evil)
        self.assertGreaterEqual(res["risk_score"], 0)
        self.assertLessEqual(res["risk_score"], 100)
        self.assertEqual(res["risk_level"], "HIGH RISK")

    def test_no_external_network_requests(self):
        # Test analyzing an unreachable non-routable host finishes in milliseconds
        # because NO socket or DNS or HTTP request is performed.
        import time
        start = time.time()
        res = self.detector.analyze("http://192.0.2.254:9999/test-nonexistent-path")
        duration = time.time() - start
        self.assertLess(duration, 0.1, "Analysis must be purely local and fast (no timeouts/network calls)")
        self.assertTrue(res["features"]["is_ip_address"])


if __name__ == "__main__":
    unittest.main()
