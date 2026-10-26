# PhishGuard — Phishing URL Analysis Using Python

[![Python Version](https://img.shields.io/badge/Python-3.14%2B-blue.svg)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/Backend-Flask-green.svg)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20TailwindCSS-cyan.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-36%20Passing-brightgreen.svg)](#running-automated-tests)
[![Presentation Mode](https://img.shields.io/badge/Presentation-Built--In%20Slides%20%26%20Speech-indigo.svg)](#presentation-walkthrough)
[![Security Policy](https://img.shields.io/badge/Air--Gapped-Zero%20External%20Requests-emerald.svg)](#safety-architecture)

**PhishGuard** is an educational, presentation-ready cybersecurity web application for analyzing Uniform Resource Locators (URLs) to identify characteristics commonly associated with phishing. Engineered with Python's standard library (`urllib.parse` and `ipaddress`) and a React dashboard, PhishGuard incorporates your entire college presentation speech, interactive anatomy diagrams, and a live analyzer directly on the screen—eliminating the need for a separate PowerPoint presentation.

---

## Presentation Structure (6 In-Page Slides)

The website is structured into six presentation sections with verbatim speaker notes:

1. **Introduction**:
   - Heading: *"Phishing URL Analysis Using Python"*
   - Opening hook on fraudulent bank links and the mechanics of deceptive URLs.
2. **What is Phishing URL Analysis?**:
   - Definition of syntactic indicators.
   - **Interactive URL Anatomy Illustration**: Click to inspect Scheme, Hostname/IP, Path, and Query Parameters with their specific phishing relevance.
3. **Why Python?**:
   - Technical rationale for Python standard library tools.
   - Annotated Python code snippet illustrating `urllib.parse.urlsplit()` and `ipaddress.ip_address()`.
4. **How Does Our Detector Work?**:
   - 3-step core process: Input -> Extraction -> Heuristic Scoring.
   - **Interactive 5-Step Pipeline** and transparent rule weights table (+40 pts for IP, +35 for userinfo disguise, +30 for brand mimicry).
5. **Live Demonstration**:
   - Heading: *"Let's Analyse a URL"*
   - Live interactive URL inspection console accepting **any arbitrary HTTP or HTTPS URL** (paste any URL from the audience).
   - Dynamic 0-100 Estimated URL Risk scoring, triggered indicators breakdown, and passed check audit.
6. **Limitations and Conclusion**:
   - Candid discussion of false positives, evasion by sophisticated attackers, and lack of content/reputation lookups.
   - Clean "Thank You!" presentation closing card.

---

## Safety Architecture

PhishGuard operates as a **strictly air-gapped, local string inspection engine**:
- **Zero External Network Calls**: The server never opens, connects to, fetches, crawls, or pings submitted URLs.
- **No HTML Inspection**: Webpage DOM, JavaScript, and remote assets are never downloaded.
- **Safe Demonstration**: You can safely analyze suspicious or malformed URLs in front of your class or evaluators without triggering security alarms or malware downloads.
- **Estimated Risk Label**: Scores represent an *Estimated Structural Risk index*, not an empirically calibrated probability of maliciousness.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend Engine** | Python 3.14+ | Core heuristic analysis & feature extraction |
| **URL Parsing** | `urllib.parse.urlsplit` | RFC 3986 component separation |
| **IP Detection** | `ipaddress.ip_address` | IPv4 & bracketed IPv6 literal identification |
| **API Framework** | Flask + Flask-CORS | REST API (`/api/analyze`, `/api/health`) |
| **Testing** | Python `unittest` | 36 automated test cases covering edge cases & arbitrary URLs |
| **Frontend** | React 19 + Vite | High-performance reactive presentation interface |
| **Styling** | Tailwind CSS v4 | Dark navy cybersecurity dashboard theme |
| **Icons** | Lucide React | Cybersecurity UI indicators |

---

## How to Run Locally (Windows PowerShell)

### Prerequisites
- Python 3.10+ (tested on Python 3.14)
- Node.js 18+ (tested on Node.js v24)
- Windows PowerShell

### Step 1: Start Flask Backend (Port 5000)
Open a PowerShell terminal:
```powershell
cd E:\phishing
.\venv\Scripts\Activate.ps1
python backend/app.py
```
*Backend runs on `http://127.0.0.1:5000`.*

### Step 2: Start React Frontend (Port 5173)
Open a second PowerShell terminal:
```powershell
cd E:\phishing\frontend
npm run dev
```
*Open your browser and navigate to `http://localhost:5173/`.*

The frontend automatically proxies `/api/*` requests to the Flask backend.

---

## Running Automated Tests

Run the complete 36-test automated suite verifying feature extraction, arbitrary URLs, and API endpoints:

```powershell
cd E:\phishing
.\venv\Scripts\python -m unittest discover -s backend/tests -v
```

### Verified Test Cases (36 Tests Passing)
- Standard HTTPS URL (`https://example.com/`)
- Standard HTTP URL (unencrypted transport warning)
- Hostname that is an IPv4 literal
- Hostname that is an IPv6 literal (`[2001:db8::1]`)
- Arbitrary major website URLs (`github.com/torvalds/linux`, `wikipedia.org`, `stackoverflow.com`)
- Arbitrary custom ports (`http://internal-portal.edu:8080/dashboard`)
- Deep subdomains (`dev.staging.corp.internal.example.org`)
- Query parameters and percent encoding (`item=laptop%20pro`)
- Brand mimicry in hyphenated hostnames
- Query parameters containing deceptive domain text
- User information in URL authority (`user:pass@host`)
- Rejection of unsupported schemes (`ftp://`, `javascript:`, `mailto:`, `ssh:`)
- Rejection of malformed URLs and empty/whitespace inputs
- Dynamic re-analysis idempotence and repeatability
- Flask API status codes, JSON validation, and error handlers

---

## Presentation Walkthrough & Demonstration Guide

Use this sequence to present directly off the website:

1. **Title & Opening (Section 1)**:
   - Scroll to **Section 1: Introduction**.
   - Read or refer to the on-screen speaker notes:
     > *"Good morning everyone! Today, I'm going to talk about Phishing URL Analysis Using Python..."*
   - Click **"Next: What is Phishing URL Analysis?"**.
2. **Concept & Anatomy (Section 2)**:
   - Read the definition of phishing URL indicators.
   - Use the **Interactive URL Anatomy Illustration**: click **Scheme**, **Hostname**, **Path**, and **Query** to explain what each component does and how attackers manipulate them.
   - Click **"Next: Why Python?"**.
3. **Python Standard Library (Section 3)**:
   - Explain why `urllib.parse` and `ipaddress` were chosen.
   - Point to the on-screen code snippet showing `urlsplit()` extracting components cleanly.
   - Click **"Next: How Does Our Detector Work?"**.
4. **Heuristic Pipeline (Section 4)**:
   - Click through the 5 interactive pipeline steps (Input -> Parsing -> Feature Extraction -> Scoring -> Explanation).
   - Point out the **Transparent Rule Weights** table showing that high-impact anomalies (like raw IP hosts or userinfo `@` disguises) contribute +35 to +40 points, whereas generic path keywords only contribute minimal points.
   - Click **"Proceed to Live Demonstration"**.
5. **Live URL Analysis (Section 5)**:
   - Announce: *"We can enter any properly formatted HTTP or HTTPS URL."*
   - Paste or type any arbitrary URL:
     - Example clean URL: `https://github.com/torvalds/linux` -> Click **Analyse URL** -> Show **LOW RISK (0/100)** with green bar and open the *Checked Parameters That Passed* drawer.
     - Example suspicious IP URL: `http://198.51.100.25:8080/secure/update?verify=true` -> Click **Analyse URL** -> Show **HIGH RISK (80/100)** and point out the detected indicators (IPv4 literal +40, unencrypted HTTP +15, custom port +15, login keywords +10).
     - Example input from the audience: Paste any link suggested by your classmates or evaluators.
     - Example malformed test: Enter `ftp://example.com` or `invalid_link` to show friendly validation feedback.
   - Click **"Next: Limitations and Conclusion"**.
6. **Closing & Limitations (Section 6)**:
   - Reiterate that this is a rule-based syntactic detector: it does not crawl page HTML or query reputation feeds.
   - Deliver the concluding takeaway:
     > *"Most importantly, we learn that cybersecurity is not only about detecting threats but also about understanding the warning signs behind them. Thank you!"*

---

## Project Structure

```
phishing/
├── backend/
│   ├── app.py                      # Flask REST API endpoints & CORS configuration
│   ├── detector.py                 # Python URL parser & weighted rule scoring engine
│   ├── requirements.txt            # Flask & Flask-Cors dependencies
│   └── tests/
│       ├── __init__.py
│       ├── test_detector.py        # 18 unit tests for URL parsing & rules
│       ├── test_api.py             # 10 integration tests for Flask REST endpoints
│       └── test_arbitrary_urls.py  # 8 integration tests for arbitrary URLs & edge cases
├── frontend/
│   ├── index.html                  # HTML entry point with PhishGuard branding
│   ├── package.json                # Frontend dependencies & build scripts
│   ├── vite.config.js              # Vite configuration with Tailwind CSS & API proxy
│   └── src/
│       ├── App.jsx                 # Presentation slide sequence coordinator
│       ├── main.jsx                # React DOM root
│       ├── index.css               # Tailwind CSS v4 directives & theme variables
│       └── components/
│           ├── Navbar.jsx                   # Sticky navigation & live backend health badge
│           ├── Section1_Introduction.jsx    # Slide 1: Title, hook & speaker notes
│           ├── Section2_WhatIsAnalysis.jsx  # Slide 2: Definition & interactive URL anatomy
│           ├── Section3_WhyPython.jsx       # Slide 3: urllib.parse code snippet & explanation
│           ├── Section4_HowItWorks.jsx      # Slide 4: 5-step pipeline & rule weights table
│           ├── Analyzer.jsx                 # Slide 5: Live console accepting arbitrary URLs
│           ├── ResultsPanel.jsx             # Results panel: score, indicators, passed checks
│           ├── Section6_Conclusion.jsx      # Slide 6: Limitations, takeaways & thank you card
│           └── Footer.jsx                   # Academic attribution & GitHub link
├── .gitignore                      # Excludes venv, node_modules, cache, dist
└── README.md                       # Comprehensive guide and presentation script
```

---

## Presentation Checklist

Before starting your college presentation:
- [x] Flask backend running on `http://127.0.0.1:5000` (`python backend/app.py`).
- [x] React frontend running on `http://localhost:5173` (`npm run dev`).
- [x] Live backend indicator shows **"Python API Online"** in green on the top right.
- [x] Full-screen your browser (`F11`) for a clean, distraction-free slide presentation.
