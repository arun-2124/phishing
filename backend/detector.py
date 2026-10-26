"""
PhishGuard - URL Phishing Risk Detector
Modular rule-based URL analysis engine written in Python.

Analyzes URL strings locally without making any network requests or DNS queries.
Extracts structural features and applies transparent, weighted rules to calculate
an estimated risk score (0-100) and risk tier (LOW, MEDIUM, HIGH).
"""

import ipaddress
import re
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import parse_qs, unquote, urlsplit


class ValidationError(Exception):
    """Raised when URL input cannot be parsed or violates structural constraints."""
    pass


# Recognized targeted brands commonly impersonated in phishing attacks
POPULAR_BRANDS = [
    "paypal", "google", "apple", "microsoft", "amazon", "netflix",
    "facebook", "instagram", "chase", "wellsfargo", "bankofamerica",
    "citibank", "dropbox", "yahoo", "outlook", "office365", "binance",
    "coinbase", "metamask", "steam", "whatsapp", "telegram"
]

# High-risk keywords often used to simulate authentication/security alerts
SECURITY_KEYWORDS = [
    "login", "signin", "sign-in", "log-in", "verify", "verification",
    "account", "update", "security", "secure", "banking", "authenticate",
    "confirm", "password", "credential", "billing", "recover", "wallet",
    "support", "service", "alert"
]

# Suspicious top-level or free dynamic domains frequently abused
SUSPICIOUS_TLDS = [
    "tk", "ml", "ga", "cf", "gq", "top", "xyz", "work", "loan", "click",
    "fit", "country", "kim", "buzz", "rest", "surf"
]


class URLFeatureExtractor:
    """Extracts structural, lexical, and protocol features from a normalized URL."""

    def __init__(self, raw_url: str):
        self.raw_url = raw_url
        self.normalized_url, self.split_result = self._validate_and_normalize(raw_url)
        self.features = self._extract_features()

    def _validate_and_normalize(self, raw_url: str) -> Tuple[str, Any]:
        if not raw_url or not isinstance(raw_url, str):
            raise ValidationError("URL cannot be empty.")

        url_str = raw_url.strip()
        if not url_str:
            raise ValidationError("URL cannot be empty or just whitespace.")

        if len(url_str) > 4096:
            raise ValidationError("URL exceeds maximum length limit of 4,096 characters.")

        # Check for control characters or invalid whitespace inside the URL
        if any(c in url_str for c in ['\r', '\n', '\t', ' ']):
            raise ValidationError("URL contains invalid whitespace or control characters.")

        try:
            split = urlsplit(url_str)
        except Exception as e:
            raise ValidationError(f"Failed to parse URL: {str(e)}")

        scheme = split.scheme.lower()
        if not scheme:
            raise ValidationError(
                "Missing URL scheme. Please include 'https://' or 'http://' (e.g., https://example.com)."
            )

        if scheme not in ("http", "https"):
            raise ValidationError(
                f"Unsupported URL scheme '{scheme}'. Only HTTP and HTTPS protocols are supported."
            )

        hostname = split.hostname
        if not hostname:
            raise ValidationError("URL does not contain a valid hostname or domain.")

        # Reconstruct normalized URL (scheme lowercased, hostname lowercased, trailing dot trimmed)
        netloc_normalized = split.netloc
        # If hostname has uppercase or trailing dot, normalize it cleanly
        clean_host = hostname.rstrip(".").lower()
        if not clean_host:
            raise ValidationError("URL hostname is invalid.")

        normalized_url = urlsplit(url_str)._replace(scheme=scheme).geturl()
        return normalized_url, split

    def _extract_features(self) -> Dict[str, Any]:
        split = self.split_result
        raw_hostname = split.hostname or ""
        clean_hostname = raw_hostname.rstrip(".").lower()
        raw_netloc = split.netloc
        raw_path = split.path or "/"
        raw_query = split.query or ""
        raw_fragment = split.fragment or ""

        # IP Detection (IPv4 or IPv6)
        is_ip = False
        ip_version = None
        ip_is_private = False
        try:
            # Handle bracketed IPv6 if needed
            stripped_host = clean_hostname.strip("[]")
            ip_obj = ipaddress.ip_address(stripped_host)
            is_ip = True
            ip_version = ip_obj.version
            ip_is_private = ip_obj.is_private or ip_obj.is_reserved or ip_obj.is_loopback
        except ValueError:
            is_ip = False

        # Hostname labels and subdomain breakdown
        hostname_labels = clean_hostname.split(".") if not is_ip else [clean_hostname]
        subdomain_count = max(0, len(hostname_labels) - 2) if not is_ip else 0

        # Userinfo in authority (e.g. user:pass@host)
        has_userinfo = False
        userinfo_value = ""
        if "@" in raw_netloc:
            has_userinfo = True
            userinfo_value = raw_netloc.split("@", 1)[0]

        # Port detection
        has_non_standard_port = False
        port_num = None
        try:
            port_num = split.port
            if port_num is not None:
                default_port = 443 if split.scheme.lower() == "https" else 80
                if port_num != default_port:
                    has_non_standard_port = True
        except ValueError:
            has_non_standard_port = True

        # Query parameter extraction
        query_params = {}
        try:
            query_params = parse_qs(raw_query, keep_blank_values=True)
        except Exception:
            pass

        # Check for URLs embedded inside query parameters (redirect evasion)
        embedded_urls_in_query = []
        for param, values in query_params.items():
            for val in values:
                if re.match(r"^https?://", val, re.IGNORECASE):
                    embedded_urls_in_query.append(val)

        # Keyword checks in hostname, path, and query (separately analyzed!)
        host_keywords_found = [kw for kw in SECURITY_KEYWORDS if kw in clean_hostname]
        path_keywords_found = [kw for kw in SECURITY_KEYWORDS if kw in raw_path.lower()]
        query_keywords_found = [kw for kw in SECURITY_KEYWORDS if kw in raw_query.lower()]

        # Brand checks in hostname and subdomains
        brands_in_subdomains = []
        apex_domain = ".".join(hostname_labels[-2:]) if len(hostname_labels) >= 2 else clean_hostname
        subdomain_part = ".".join(hostname_labels[:-2]) if len(hostname_labels) > 2 else ""

        for brand in POPULAR_BRANDS:
            # If brand appears in subdomains or hyphenated segments, but is not the legitimate apex domain
            if brand in subdomain_part:
                brands_in_subdomains.append(brand)
            elif brand in clean_hostname and not apex_domain.startswith(brand + "."):
                brands_in_subdomains.append(brand)

        # Percent encoding analysis
        percent_encodings = re.findall(r"%[0-9a-fA-F]{2}", self.raw_url)
        percent_count = len(percent_encodings)

        # Double slash in path check
        has_double_slash_in_path = "//" in raw_path

        # Hyphen count in hostname
        hostname_hyphen_count = clean_hostname.count("-")

        # TLD extraction
        tld = hostname_labels[-1] if len(hostname_labels) > 1 and not is_ip else ""

        return {
            "raw_url": self.raw_url,
            "normalized_url": self.normalized_url,
            "scheme": split.scheme.lower(),
            "uses_https": split.scheme.lower() == "https",
            "hostname": clean_hostname,
            "raw_hostname": raw_hostname,
            "port": port_num,
            "has_non_standard_port": has_non_standard_port,
            "path": raw_path,
            "query": raw_query,
            "fragment": raw_fragment,
            "total_length": len(self.raw_url),
            "hostname_length": len(clean_hostname),
            "path_length": len(raw_path),
            "is_ip_address": is_ip,
            "ip_version": ip_version,
            "ip_is_private": ip_is_private,
            "hostname_labels": hostname_labels,
            "subdomain_count": subdomain_count,
            "has_userinfo": has_userinfo,
            "userinfo_value": userinfo_value,
            "query_param_count": len(query_params),
            "query_params": query_params,
            "embedded_urls_in_query": embedded_urls_in_query,
            "host_keywords_found": host_keywords_found,
            "path_keywords_found": path_keywords_found,
            "query_keywords_found": query_keywords_found,
            "brands_in_subdomains": brands_in_subdomains,
            "percent_encoding_count": percent_count,
            "has_double_slash_in_path": has_double_slash_in_path,
            "hostname_hyphen_count": hostname_hyphen_count,
            "tld": tld,
            "has_trailing_dot": raw_hostname.endswith("."),
            "has_uppercase_host": any(c.isupper() for c in raw_hostname),
        }


class PhishingRiskDetector:
    """
    Transparent, rule-based phishing risk scoring engine.
    Calculates estimated risk score (0-100) using weighted structural rules.
    """

    def __init__(self):
        pass

    def analyze(self, url: str) -> Dict[str, Any]:
        """
        Main entry point. Validates URL, extracts features, evaluates rules,
        and returns structured analysis results.
        """
        extractor = URLFeatureExtractor(url)
        features = extractor.features
        triggered_rules, passed_rules, total_score = self._evaluate_rules(features)

        # Cap score between 0 and 100
        total_score = max(0, min(100, round(total_score)))

        if total_score >= 65:
            risk_level = "HIGH RISK"
            risk_color = "red"
            summary_tone = "critical"
        elif total_score >= 30:
            risk_level = "MEDIUM RISK"
            risk_color = "amber"
            summary_tone = "warning"
        else:
            risk_level = "LOW RISK"
            risk_color = "emerald"
            summary_tone = "safe"

        recommendation = self._generate_recommendation(risk_level, features, triggered_rules)

        return {
            "url": features["normalized_url"],
            "raw_input": url,
            "risk_score": total_score,
            "risk_level": risk_level,
            "risk_color": risk_color,
            "summary_tone": summary_tone,
            "score_label": "Estimated URL Risk",
            "triggered_rules": triggered_rules,
            "passed_rules": passed_rules,
            "features": {
                "scheme": features["scheme"],
                "uses_https": features["uses_https"],
                "hostname": features["hostname"],
                "is_ip_address": features["is_ip_address"],
                "ip_version": features["ip_version"],
                "subdomain_count": features["subdomain_count"],
                "hostname_labels_count": len(features["hostname_labels"]),
                "total_length": features["total_length"],
                "has_userinfo": features["has_userinfo"],
                "port": features["port"],
                "has_non_standard_port": features["has_non_standard_port"],
                "query_param_count": features["query_param_count"],
                "percent_encoding_count": features["percent_encoding_count"],
                "has_double_slash_in_path": features["has_double_slash_in_path"],
                "hostname_hyphen_count": features["hostname_hyphen_count"],
                "host_keywords": features["host_keywords_found"],
                "path_keywords": features["path_keywords_found"],
                "query_keywords": features["query_keywords_found"],
                "brands_in_subdomains": features["brands_in_subdomains"],
            },
            "components": {
                "scheme": features["scheme"],
                "netloc": extractor.split_result.netloc,
                "hostname": features["hostname"],
                "port": features["port"],
                "path": features["path"],
                "query": features["query"],
                "fragment": features["fragment"],
            },
            "recommendation": recommendation,
            "disclaimer": (
                "Educational rule-based risk estimate. URL indicators evaluate structural anomalies "
                "without visiting the server or inspecting website content. A low score does not "
                "guarantee safety, nor does a high score guarantee malice."
            ),
        }

    def _evaluate_rules(self, f: Dict[str, Any]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], float]:
        triggered = []
        passed = []
        score = 0.0

        # RULE 1: IP Address Hostname
        # Strong indicator: phishing sites frequently use direct IP addresses to evade domain registry reputation.
        r1_id = "IP_ADDRESS_HOSTNAME"
        r1_name = "IP Address Used as Hostname"
        r1_category = "Host & Authority"
        if f["is_ip_address"]:
            weight = 40.0
            score += weight
            triggered.append({
                "id": r1_id,
                "name": r1_name,
                "category": r1_category,
                "severity": "high",
                "weight": weight,
                "explanation": (
                    f"The URL uses a raw IPv{f['ip_version']} address ({f['hostname']}) instead of a domain name. "
                    "Legitimate organizations rarely distribute consumer links using raw IP addresses."
                ),
            })
        else:
            passed.append({
                "id": r1_id,
                "name": r1_name,
                "category": r1_category,
                "status": "Hostname is a standard domain name, not a raw IP address."
            })

        # RULE 2: Userinfo in Authority (Disguised Destination)
        # Strong indicator: http://paypal.com@evil.com sends the user to evil.com while tricking humans.
        r2_id = "USERINFO_EMBEDDED"
        r2_name = "Userinfo Disguise in URL Authority"
        r2_category = "Host & Authority"
        if f["has_userinfo"]:
            weight = 35.0
            score += weight
            triggered.append({
                "id": r2_id,
                "name": r2_name,
                "category": r2_category,
                "severity": "high",
                "weight": weight,
                "explanation": (
                    f"The URL authority contains an embedded '@' delimiter ('{f['userinfo_value']}@'). "
                    "In standard URL parsing, text preceding '@' is treated as user authentication credentials, "
                    "not the destination host. Attackers exploit this to visually spoof recognizable brand names."
                ),
            })
        else:
            passed.append({
                "id": r2_id,
                "name": r2_name,
                "category": r2_category,
                "status": "No userinfo credentials or '@' spoofing found in URL authority."
            })

        # RULE 3: Transport Protocol (HTTP vs HTTPS)
        # Moderate indicator: unencrypted HTTP is rare for modern authentication/accounts.
        r3_id = "UNENCRYPTED_HTTP"
        r3_name = "Unencrypted Transport (HTTP)"
        r3_category = "Security & Protocol"
        if not f["uses_https"]:
            weight = 15.0
            score += weight
            triggered.append({
                "id": r3_id,
                "name": r3_name,
                "category": r3_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    "The URL communicates over unencrypted plain HTTP rather than HTTPS. "
                    "Sensitive portals and modern services require encrypted connections. "
                    "Note: HTTPS alone does not guarantee legitimacy, but lack of HTTPS adds risk."
                ),
            })
        else:
            passed.append({
                "id": r3_id,
                "name": r3_name,
                "category": r3_category,
                "status": "Uses HTTPS encrypted protocol (Note: HTTPS is required but not sufficient for safety)."
            })

        # RULE 4: Non-Standard Port
        r4_id = "NON_STANDARD_PORT"
        r4_name = "Non-Standard Port Specified"
        r4_category = "Security & Protocol"
        if f["has_non_standard_port"]:
            weight = 15.0
            score += weight
            triggered.append({
                "id": r4_id,
                "name": r4_name,
                "category": r4_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"The URL specifies custom port {f['port']}. Standard web traffic operates on ports 80 or 443. "
                    "Non-standard ports are frequently associated with unauthorized servers, test rigs, or evasive hosting."
                ),
            })
        else:
            passed.append({
                "id": r4_id,
                "name": r4_name,
                "category": r4_category,
                "status": "Uses default web port (80/443)."
            })

        # RULE 5: Brand Impersonation in Subdomain or Hostname
        r5_id = "BRAND_IMPERSONATION"
        r5_name = "Brand Mimicry in Subdomains"
        r5_category = "Host & Authority"
        if f["brands_in_subdomains"]:
            weight = 30.0
            score += weight
            brands_str = ", ".join(f["brands_in_subdomains"])
            triggered.append({
                "id": r5_id,
                "name": r5_name,
                "category": r5_category,
                "severity": "high",
                "weight": weight,
                "explanation": (
                    f"Recognizable brand identifier(s) [{brands_str}] detected inside subdomains or hyphenated segments "
                    f"of host '{f['hostname']}'. Phishers often prefix targets to third-party domains to mislead victims."
                ),
            })
        else:
            passed.append({
                "id": r5_id,
                "name": r5_name,
                "category": r5_category,
                "status": "No brand mimicry detected in subdomains."
            })

        # RULE 6: Excessive Subdomain Depth
        # Normal domains have 2 or 3 labels (e.g. sub.domain.com). >= 4 indicates deep nesting.
        r6_id = "EXCESSIVE_SUBDOMAINS"
        r6_name = "Deep Subdomain Hierarchy"
        r6_category = "Host & Authority"
        if f["subdomain_count"] >= 3:
            weight = 15.0
            score += weight
            triggered.append({
                "id": r6_id,
                "name": r6_name,
                "category": r6_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"The hostname contains {len(f['hostname_labels'])} domain labels ({f['subdomain_count']} subdomains). "
                    "Excessive domain nesting is often used to conceal the true parent domain."
                ),
            })
        elif f["subdomain_count"] == 2:
            weight = 5.0
            score += weight
            triggered.append({
                "id": r6_id,
                "name": "Moderate Subdomain Depth",
                "category": r6_category,
                "severity": "low",
                "weight": weight,
                "explanation": (
                    f"The hostname contains {len(f['hostname_labels'])} domain labels. "
                    "While common in large enterprises, multiple subdomains warrant verification."
                ),
            })
        else:
            passed.append({
                "id": r6_id,
                "name": r6_name,
                "category": r6_category,
                "status": "Subdomain count is normal (standard 2-3 domain labels)."
            })

        # RULE 7: Unusual URL Length
        r7_id = "EXCESSIVE_URL_LENGTH"
        r7_name = "Abnormally Long URL"
        r7_category = "Length & Obfuscation"
        if f["total_length"] > 120:
            weight = 15.0
            score += weight
            triggered.append({
                "id": r7_id,
                "name": r7_name,
                "category": r7_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"Total URL length is {f['total_length']} characters (> 120 chars). "
                    "Unusually long URLs are frequently used in phishing to hide suspicious hostnames "
                    "or pass serialized tracking/payload structures."
                ),
            })
        elif f["total_length"] > 75:
            weight = 8.0
            score += weight
            triggered.append({
                "id": r7_id,
                "name": "Moderately Long URL",
                "category": r7_category,
                "severity": "low",
                "weight": weight,
                "explanation": (
                    f"Total URL length is {f['total_length']} characters (> 75 chars). "
                    "Slightly longer than typical short navigation links."
                ),
            })
        else:
            passed.append({
                "id": r7_id,
                "name": r7_name,
                "category": r7_category,
                "status": f"URL length is compact ({f['total_length']} characters)."
            })

        # RULE 8: Security / Authentication Keywords in Hostname or Path
        # Carefully weighted: We do NOT flag a URL as malicious solely because it contains words like 'login'.
        # However, keywords in hostname (e.g. login-secure-update.com) carry higher weight than in standard path.
        r8_id = "SENSITIVE_KEYWORDS"
        r8_name = "Security & Credential Keywords"
        r8_category = "Content Indicators"
        if f["host_keywords_found"]:
            weight = 15.0
            score += weight
            kws = ", ".join(f["host_keywords_found"])
            triggered.append({
                "id": r8_id,
                "name": "Sensitive Keywords in Hostname",
                "category": r8_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"The hostname itself contains authentication/security terms: [{kws}]. "
                    "Legitimate companies typically host authentication on standardized paths or subdomains, "
                    "whereas attackers frequently register domains with these terms to instill false trust."
                ),
            })
        elif f["path_keywords_found"] and not f["uses_https"]:
            # Keywords in path on unencrypted HTTP is high concern
            weight = 10.0
            score += weight
            kws = ", ".join(f["path_keywords_found"])
            triggered.append({
                "id": r8_id,
                "name": "Login/Account Keywords over Unencrypted HTTP",
                "category": r8_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"Path contains sensitive keywords [{kws}] over unencrypted HTTP. "
                    "Authentication endpoints must always use HTTPS to prevent credential interception."
                ),
            })
        elif f["path_keywords_found"]:
            # Low weight purely informational: legitimate websites have /login all the time!
            weight = 2.0
            score += weight
            kws = ", ".join(f["path_keywords_found"])
            triggered.append({
                "id": r8_id,
                "name": "Standard Authentication Path Keywords",
                "category": r8_category,
                "severity": "low",
                "weight": weight,
                "explanation": (
                    f"Path contains authentication keywords [{kws}]. "
                    "This is normal for legitimate login portals, but warrants verifying the root domain."
                ),
            })
        else:
            passed.append({
                "id": r8_id,
                "name": r8_name,
                "category": r8_category,
                "status": "No high-risk credential or authentication terms detected."
            })

        # RULE 9: Hyphenated Hostname
        r9_id = "HYPHENATED_HOSTNAME"
        r9_name = "Multiple Hyphens in Hostname"
        r9_category = "Host & Authority"
        if f["hostname_hyphen_count"] >= 2:
            weight = 12.0
            score += weight
            triggered.append({
                "id": r9_id,
                "name": r9_name,
                "category": r9_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"Hostname contains {f['hostname_hyphen_count']} hyphens. Attackers frequently concatenate "
                    "words with hyphens (e.g., 'secure-login-account-update') to mimic official services."
                ),
            })
        else:
            passed.append({
                "id": r9_id,
                "name": r9_name,
                "category": r9_category,
                "status": f"Hostname contains {f['hostname_hyphen_count']} hyphens (normal)."
            })

        # RULE 10: Suspicious or Free Abuse-Prone TLD
        r10_id = "SUSPICIOUS_TLD"
        r10_name = "High-Risk / Abuse-Prone TLD"
        r10_category = "Host & Authority"
        if f["tld"] in SUSPICIOUS_TLDS:
            weight = 15.0
            score += weight
            triggered.append({
                "id": r10_id,
                "name": r10_name,
                "category": r10_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"The domain uses '.{f['tld']}', a top-level domain with statistically high abuse rates "
                    "often provided through free or low-verification registrar campaigns."
                ),
            })
        else:
            passed.append({
                "id": r10_id,
                "name": r10_name,
                "category": r10_category,
                "status": f"Top-level domain (.{f['tld'] or 'standard'}) is not flagged as high-abuse."
            })

        # RULE 11: Excessive Percent Encoding (Obfuscation)
        r11_id = "PERCENT_ENCODING"
        r11_name = "Heavy Percent-Encoding / Obfuscation"
        r11_category = "Length & Obfuscation"
        if f["percent_encoding_count"] >= 3:
            weight = 10.0
            score += weight
            triggered.append({
                "id": r11_id,
                "name": r11_name,
                "category": r11_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"URL contains {f['percent_encoding_count']} percent-encoded sequences (e.g., %20, %2f). "
                    "Excessive hex-encoding is frequently employed to obfuscate malicious payloads or bypass security scanners."
                ),
            })
        else:
            passed.append({
                "id": r11_id,
                "name": r11_name,
                "category": r11_category,
                "status": "Normal encoding levels detected."
            })

        # RULE 12: Embedded Redirect URL in Query Parameters
        r12_id = "EMBEDDED_QUERY_REDIRECT"
        r12_name = "Embedded Destination URL in Query"
        r12_category = "Path & Query"
        if f["embedded_urls_in_query"]:
            weight = 12.0
            score += weight
            triggered.append({
                "id": r12_id,
                "name": r12_name,
                "category": r12_category,
                "severity": "medium",
                "weight": weight,
                "explanation": (
                    f"Query parameter carries a secondary URL ({f['embedded_urls_in_query'][0][:40]}...). "
                    "This pattern is often used in Open Redirect exploits or credential relay phishing."
                ),
            })
        else:
            passed.append({
                "id": r12_id,
                "name": r12_name,
                "category": r12_category,
                "status": "No nested redirect URLs found in query parameters."
            })

        # RULE 13: Double Slash in Path (Path Traversal / Evasion)
        r13_id = "DOUBLE_SLASH_PATH"
        r13_name = "Consecutive Slashes in URL Path"
        r13_category = "Path & Query"
        if f["has_double_slash_in_path"]:
            weight = 8.0
            score += weight
            triggered.append({
                "id": r13_id,
                "name": r13_name,
                "category": r13_category,
                "severity": "low",
                "weight": weight,
                "explanation": (
                    "URL path contains '//' (double slash). This structural anomaly can be used "
                    "for URL parser confusion or open redirect workarounds."
                ),
            })
        else:
            passed.append({
                "id": r13_id,
                "name": r13_name,
                "category": r13_category,
                "status": "Path structure is clean with standard delimiters."
            })

        return triggered, passed, score

    def _generate_recommendation(
        self,
        risk_level: str,
        features: Dict[str, Any],
        triggered_rules: List[Dict[str, Any]]
    ) -> str:
        if risk_level == "HIGH RISK":
            reasons = []
            if features["is_ip_address"]:
                reasons.append("it points to a raw IP address")
            if features["has_userinfo"]:
                reasons.append("it attempts authority credential spoofing (@)")
            if features["brands_in_subdomains"]:
                reasons.append("it contains brand mimicry in subdomains")
            if not features["uses_https"]:
                reasons.append("it lacks HTTPS encryption")

            cause_str = f" because {', '.join(reasons)}" if reasons else ""
            return (
                f"Caution strongly advised: This URL exhibits high-risk phishing indicators{cause_str}. "
                "Do NOT enter passwords, financial details, or personal data. "
                "Verify the organization's official domain directly through a trusted search engine or bookmark."
            )
        elif risk_level == "MEDIUM RISK":
            return (
                "Moderate suspicion: This URL contains structural characteristics occasionally seen in phishing "
                "or deceptive campaigns (such as unusual subdomains, unencrypted HTTP, or long parameters). "
                "Exercise diligence and verify the apex domain before providing any credentials."
            )
        else:
            return (
                "Low estimated risk: The URL exhibits standard structural patterns consistent with normal web conventions. "
                "However, remember that sophisticated phishing pages on newly registered HTTPS domains may evade "
                "rule-based heuristics. Always confirm you intended to visit this specific domain."
            )
