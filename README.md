# PhishGuard — Phishing URL Analysis Using Python

[![Python Version](https://img.shields.io/badge/Python-3.14%2B-blue.svg)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/Backend-Flask-green.svg)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20TailwindCSS-cyan.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-28%20Passing-brightgreen.svg)](#running-automated-tests)
[![Security Policy](https://img.shields.io/badge/Air--Gapped-Zero%20External%20Requests-emerald.svg)](#security--architecture)

**PhishGuard** is an educational, transparent, presentation-ready web application for detecting phishing characteristics in Uniform Resource Locators (URLs). Engineered with Python's standard library (`urllib.parse` and `ipaddress`) and a React dashboard, PhishGuard evaluates structural anomalies and deceptive lexical patterns locally on the server without ever opening or visiting the submitted destination.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [How the Detection Rules Work](#how-the-detection-rules-work)
5. [Scoring & Classification Thresholds](#scoring--classification-thresholds)
6. [Operational Limitations & False Positives](#operational-limitations--false-positives)
7. [Installation & Setup (Windows PowerShell)](#installation--setup-windows-powershell)
8. [Starting the Application](#starting-the-application)
9. [Running Automated Tests](#running-automated-tests)
10. [Demonstration Samples](#demonstration-samples)
11. [Presentation & Demo Script](#presentation--demo-script)
12. [Project Structure](#project-structure)

---

## Project Overview

Phishing attacks commonly rely on deceptive URL structures to impersonate trusted services. While modern browser defenses use cloud reputation feeds, understanding the underlying anatomy of suspicious URLs is essential for cybersecurity education and threat modeling.

PhishGuard provides an explainable heuristic scanner that:
- Decomposes URLs into standard RFC 3986 components.
- Analyzes authority spoofing, raw IP usage, subdomain depth, and protocol safety.
- Computes an **Estimated URL Risk** score from 0 to 100.
- Explains the exact reason why each specific indicator was triggered.
- Operates under strict **safe analysis constraints** (the engine never issues DNS lookups or HTTP requests to submitted targets).

---

## Key Features

- **100% Local String Inspection**: Air-gapped safety guarantees that submitted URLs are never visited, crawled, or pinged.
- **Python Standard Library Core**: Uses `urllib.parse.urlsplit` and `ipaddress.ip_address` for RFC-compliant parsing.
- **Explainable Heuristics**: Every triggered rule returns a plain-English explanation of the underlying attack vector.
- **Passed Check Audit**: Displays both triggered flags and passed security criteria for full transparency.
- **Modern Security Dashboard**: Dark navy visual design with cyan/blue accents, accessible color-coded risk tiers, and responsive layouts.
- **Curated Demonstration Catalog**: Built-in reference samples to immediately test clean, suspicious, nuanced, and malformed inputs with one click.
- **Comprehensive Test Suite**: 28 unit and integration tests verifying parsing edge cases, scoring boundaries, and error rejection.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend Engine** | Python 3.14+ | Core heuristic analysis & feature extraction |
| **Parsing** | `urllib.parse.urlsplit` | Standard library URL component separation |
| **IP Detection** | `ipaddress.ip_address` | IPv4 & bracketed IPv6 literal identification |
| **API Framework** | Flask + Flask-CORS | REST API (`/api/analyze`, `/api/health`, `/api/samples`) |
| **Testing** | Python `unittest` | Automated test suite for detector and endpoints |
| **Frontend** | React 19 + Vite | High-performance reactive user interface |
| **Styling** | Tailwind CSS v4 | Dark navy cybersecurity design system |
| **Icons** | Lucide React | Cybersecurity UI indicators |

---

## How the Detection Rules Work

The detection engine evaluates URLs across four functional categories using 13+ weighted structural rules:

```
                          Target URL String
                                 │
                                 ▼
                    [ Input Validation & Trim ]
              (Check Scheme: http/https, Max Length)
                                 │
                                 ▼
                     [ urllib.parse.urlsplit ]
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
 [ Host & Authority ]   [ Security & Transport ]  [ Path & Parameters ]
 - Raw IP Address       - HTTPS vs HTTP           - Consecutive '//'
 - Userinfo Spoof (@)   - Custom Web Ports        - Query Redirect URLs
 - Brand Impersonation                            - Credential Keywords
 - Subdomain Depth                                - Percent-Encoding
 - Hyphen Concatenation
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                     [ Weighted Rule Scoring ]
                    (Clamped to 0 - 100 Range)
                                 │
                                 ▼
                 [ Structured Output & Guidance ]
```

### Core Heuristic Rules

1. **IP Address Hostname (`IP_ADDRESS_HOSTNAME`, +40 pts)**:
   Detects raw IPv4 or bracketed IPv6 literals (e.g. `http://192.0.2.10/login`). Legitimate consumer portals almost never use direct IP addresses.
2. **Userinfo Disguise in Authority (`USERINFO_EMBEDDED`, +35 pts)**:
   Detects `@` delimiter in the URL authority (e.g. `https://paypal.com:account@evil.com`). The text before `@` represents user credentials, not the host, frequently confusing victims.
3. **Brand Mimicry in Subdomains (`BRAND_IMPERSONATION`, +30 pts)**:
   Detects targeted brand names (PayPal, Apple, Google, Microsoft, Chase, etc.) placed inside subdomains or hyphenated segments of a third-party root domain.
4. **Unencrypted HTTP Protocol (`UNENCRYPTED_HTTP`, +15 pts)**:
   Identifies plaintext HTTP. Sensitive portals mandate encrypted connections.
5. **Non-Standard Port (`NON_STANDARD_PORT`, +15 pts)**:
   Detects non-default ports (e.g. `:8080`, `:8443`). Phishing campaigns often deploy on ad-hoc or compromised ports.
6. **Excessive Subdomain Depth (`EXCESSIVE_SUBDOMAINS`, +15 pts)**:
   Flags hostnames containing 4 or more labels (3+ subdomains) designed to hide the parent domain.
7. **Abnormal URL Length (`EXCESSIVE_URL_LENGTH`, +8 to +15 pts)**:
   Evaluates length (> 75 chars = moderate; > 120 chars = high) commonly used to pass encoded tracking payloads or push domains off-screen.
8. **Security Keywords in Hostname/Path (`SENSITIVE_KEYWORDS`, +2 to +15 pts)**:
   Assesses authentication terms (`login`, `verify`, `account`, `secure`). Keywords in hostnames receive higher penalty than standard paths.
9. **Hyphenated Hostname (`HYPHENATED_HOSTNAME`, +12 pts)**:
   Detects two or more hyphens in the hostname (e.g. `secure-account-update-portal`).
10. **Suspicious / Abuse-Prone TLD (`SUSPICIOUS_TLD`, +15 pts)**:
    Flags top-level domains frequently abused in free or low-verification registrar campaigns.
11. **Heavy Percent-Encoding (`PERCENT_ENCODING`, +10 pts)**:
    Identifies multiple `%XX` hex sequences used to obfuscate path strings.
12. **Embedded Redirect in Query (`EMBEDDED_QUERY_REDIRECT`, +12 pts)**:
    Detects secondary URLs in query parameters (`?redirect=http://...`) indicating Open Redirect abuse.
13. **Consecutive Slashes in Path (`DOUBLE_SLASH_PATH`, +8 pts)**:
    Checks for `//` in the path, often used for parser confusion.

---

## Scoring & Classification Thresholds

The score is explicitly labeled **"Estimated URL Risk"** and is mapped into three clear tiers:

| Tier | Score Range | Visual Style | Practical Interpretation |
|---|---|---|---|
| **LOW RISK** | **0 – 29** | Emerald Green | Standard structural patterns. No high-risk anomalies detected. |
| **MEDIUM RISK** | **30 – 64** | Amber / Orange | Moderate caution points detected (unencrypted HTTP, deep subdomains, or length). |
| **HIGH RISK** | **65 – 100** | Crimson Red | Critical structural red flags present (raw IP host, userinfo spoofing, brand mimicry). |

> **Score Calibration Note:** The score is a deterministic, rule-based heuristic index. It is intentionally designed to be explainable rather than a statistically calibrated probability of maliciousness.

---

## Operational Limitations & False Positives

To maintain academic and professional integrity, PhishGuard clearly highlights its boundaries:

- **Low score != Guaranteed Safe**: A newly registered domain with clean syntax and valid HTTPS certificate can still host an active phishing scam.
- **High score != Definite Malice**: Internal development environments, enterprise load balancers, or intranet tools with IP addresses or custom ports may trigger warnings (**false positives**).
- **No Reputation Querying**: PhishGuard evaluates syntactic structure only. It does not perform DNS domain age lookups or query commercial threat intelligence APIs.
- **No Page Inspection**: PhishGuard never visits the remote server or renders target HTML/JavaScript, ensuring safe execution on any machine.

---

## Installation & Setup (Windows PowerShell)

### Prerequisites
- Python 3.10+ (tested on Python 3.14)
- Node.js 18+ (tested on Node.js v24)
- Git

### 1. Clone or Open the Repository
```powershell
cd E:\phishing
```

### 2. Set Up Python Virtual Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r backend/requirements.txt
```

### 3. Install Frontend Dependencies
```powershell
cd frontend
npm install
cd ..
```

---

## Starting the Application

To run the application locally, start both the Flask backend and Vite frontend:

### Terminal 1: Start Flask Backend (Port 5000)
```powershell
cd E:\phishing
.\venv\Scripts\python backend/app.py
```
*The backend API will start on `http://127.0.0.1:5000`.*

### Terminal 2: Start React Frontend (Port 5173)
```powershell
cd E:\phishing\frontend
npm run dev
```
*Open your browser and navigate to `http://localhost:5173/`.*

The frontend automatically proxies `/api/*` requests to the Flask backend.

---

## Running Automated Tests

Run the complete Python test suite covering feature extraction, edge cases, and REST endpoints:

```powershell
cd E:\phishing
.\venv\Scripts\python -m unittest discover -s backend/tests -v
```

### Test Coverage Highlights (28 Tests)
- Standard HTTPS URL (low risk verification)
- Standard HTTP URL (unencrypted transport warning)
- Hostname that is an IPv4 literal
- Hostname that is an IPv6 literal (`[2001:db8::1]`)
- Unusually long URLs (> 120 chars)
- Multiple hostname labels / deep subdomains
- User information in URL authority (`user:pass@host`)
- URL with query parameters
- Malformed URLs (missing host, spaces in URL)
- Unsupported schemes (`ftp://`, `javascript:`, `file://`)
- Empty or whitespace input
- Unusual non-standard ports
- Case-insensitive hostname normalization
- Hostname with trailing FQDN dot (`example.com.`)
- Query parameters containing deceptive domain text (ensuring host parser is not confused)
- Flask API status codes, JSON validation, and error handlers

---

## Demonstration Samples

The application includes interactive demonstration samples accessible directly on the UI:

| Sample Name | Target URL | Expected Tier | Educational Focus |
|---|---|---|---|
| **Clean Reference** | `https://example.com/` | **LOW RISK (0/100)** | Demonstrates clean domain structure with 0 triggered rules. |
| **Raw IP Hostname** | `http://192.0.2.10/login?verify=1` | **HIGH RISK (65/100)** | Highlights raw IP address, unencrypted HTTP, and credential keywords. |
| **Subdomain Nuance** | `https://login.example.com/account/verify` | **LOW RISK (15/100)** | Shows how legitimate corporate subdomains are not falsely flagged as high risk. |
| **Compound Deceptive URL** | `https://paypal.com:account@update-billing-support.tk/login` | **HIGH RISK (92/100)** | Demonstrates brand impersonation, authority spoofing (`@`), and abusive TLD. |
| **Unsupported Protocol** | `ftp://files.example.com/archive.zip` | **Validation Error** | Demonstrates robust protocol validation and user feedback. |

---

## Presentation & Demo Script

When presenting this project, follow this 3-minute walkthrough:

1. **Introduction (30s)**:
   - *"Welcome! This is PhishGuard, a cybersecurity web application that analyzes URL strings to detect phishing indicators using Python."*
   - Point to the navigation bar: note the **Python API Online** status badge and dark cybersecurity dashboard theme.
2. **Safety Architecture (30s)**:
   - Highlight the **Safety Guarantee**: *"Our tool never visits or pings the target website. It analyzes the anatomy of the URL string locally using Python's `urllib.parse` and `ipaddress` modules."*
3. **Interactive Demonstration (1m)**:
   - **Sample 1**: Click **Standard Reference URL (`https://example.com/`)**.
     - Show the 0/100 LOW RISK score, the green gauge, and open the *Checked Parameters That Passed* drawer to show all 13 verified checks.
   - **Sample 2**: Click **Subdomain & Keyword Nuance (`https://login.example.com/account/verify`)**.
     - Explain: *"Notice how our engine doesn't blindly flag the URL as malicious just because it contains the word 'login'. It awards only 15 points, remaining in the Low Risk tier because the apex domain structure is legitimate."*
   - **Sample 3**: Click **Raw IP Address (`http://192.0.2.10/login?verify=1`)**.
     - Point out the instant classification transition to **HIGH RISK (65/100)**, showing the exact triggered indicators (IPv4 literal, unencrypted HTTP, login over plaintext).
   - **Sample 4**: Click **Compound Deceptive URL**.
     - Show how userinfo authority spoofing (`@`) and brand impersonation in subdomains are detected and explained in plain English.
4. **Validation Handling (15s)**:
   - Enter `ftp://example.com` or empty text to demonstrate the friendly validation alert that guides the user to supply valid HTTP/HTTPS URLs.
5. **Conclusion (15s)**:
   - Scroll down to the **How It Works** pipeline, **Feature Grid**, and **About & Security Disclaimer** to reiterate responsible disclosure and heuristic boundaries.

---

## Project Structure

```
phishing/
├── backend/
│   ├── app.py                 # Flask REST API endpoints & CORS configuration
│   ├── detector.py            # Python URL parser & weighted rule scoring engine
│   ├── requirements.txt       # Flask & Flask-Cors dependencies
│   └── tests/
│       ├── __init__.py
│       ├── test_detector.py   # 18 unit tests for URL parsing & rules
│       └── test_api.py        # 10 integration tests for Flask REST endpoints
├── frontend/
│   ├── index.html             # HTML entry point with PhishGuard branding
│   ├── package.json           # Frontend dependencies & build scripts
│   ├── vite.config.js         # Vite configuration with Tailwind CSS & API proxy
│   └── src/
│       ├── App.jsx            # Main application layout
│       ├── main.jsx           # React DOM root
│       ├── index.css          # Tailwind CSS v4 directives & theme variables
│       └── components/
│           ├── Navbar.jsx          # Header with live API health indicator
│           ├── Hero.jsx            # Hero banner with feature pills & safety note
│           ├── Analyzer.jsx        # URL input console & demo sample chips
│           ├── ResultsPanel.jsx    # Score gauge, indicators, parsed components
│           ├── HowItWorks.jsx      # 5-step visual analysis pipeline
│           ├── Features.jsx        # 8 security inspection highlights
│           ├── AboutDisclaimer.jsx # Educational context & limitations callout
│           └── Footer.jsx          # Tech stack badges & GitHub reference
├── .gitignore                 # Excludes venv, node_modules, cache, dist
└── README.md                  # Complete documentation and presentation guide
```

---

## License

Developed for educational and demonstration purposes. Use responsibly.
