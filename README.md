# PhishGuard — URL Intelligence Lab

[![Python Version](https://img.shields.io/badge/Python-3.14%2B-blue.svg)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/Backend-Flask-green.svg)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite%20%2B%20TailwindCSS%20v4-ccff00.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-36%20Passing-brightgreen.svg)](#running-automated-tests)
[![Art Direction](https://img.shields.io/badge/Design-Experimental%20Digital%20Art-ff2a5f.svg)](#art-direction--visual-identity)
[![Security Policy](https://img.shields.io/badge/Air--Gapped-Zero%20External%20Requests-emerald.svg)](#safety-architecture)

> **"PHISHING IS HIDING IN PLAIN SIGHT."**  
> *Every URL tells a story. Learn to read the signals.*

**PhishGuard — URL Intelligence Lab** is an avant-garde, experimental digital-art web application and educational cybersecurity demonstration. Inspired by contemporary creative lab aesthetics (e.g. Fiddle Digital), it marries oversized expressive typography, sculptural 3D kinetic forms, and electric neon accents with an air-gapped, RFC 3986-compliant Python analysis engine.

---

## Art Direction & Visual Identity

- **Foundation**: Pitch obsidian and deep graphite (`#08080c`, `#050508`) with bone/off-white typography (`#f2f2ee`).
- **High-Voltage Accents**:
  - **Electric Lime / Cyberpunk Acid**: `#ccff00`
  - **Hot Vermillion / Crimson Red**: `#ff2a5f`
  - **Cobalt Blue**: `#2563eb` / `#3b82f6`
  - **Ultraviolet**: `#a855f7`
- **Typographic Hierarchy**: Massive editorial display headings, monospaced metadata stamps (`[STAGE 01 // OVERVIEW]`), technical coordinate indices, and generous negative space.
- **Sculptural Interactive Elements**: 3D interactive URL kinetic sculpture responding to cursor coordinates, exploded URL anatomy with dimensional hover feedback, and a real-time terminal analyzer.
- **Presentation Integration**: The complete college speech is woven naturally into editorial presentation panels across the 6 narrative stages—**zero "Speaker Notes" labels anywhere**.

---

## The 6-Stage Narrative Walkthrough

1. **Stage 01: Introduction**
   - Monumental Title: *"PHISHING IS HIDING IN PLAIN SIGHT."*
   - Subtitle: *"Every URL tells a story. Learn to read the signals."*
   - Interactive 3D abstract URL kinetic sculpture responding to mouse tilt.
   - Complete verbatim opening hook on fraudulent banking links and scam alerts.
   - Primary action: **"Explore the experiment"**.
2. **Stage 02: What is Phishing URL Analysis?**
   - Core concept definition and deception taxonomy.
   - **Interactive Exploded URL Anatomy**: Click Scheme, Hostname/IP, Path, or Query to animate the literal segment and unveil its cryptographic role and phishing attack vector.
3. **Stage 03: Why Python?**
   - Technical rationale for Python standard library introspection.
   - Annotated code canvas illustrating `urllib.parse.urlsplit()` and `ipaddress.ip_address()`.
4. **Stage 04: How Our Detector Works**
   - The 5-stage cybernetic data pipeline: URL Input → URL Parsing → Feature Extraction → Rule-Based Scoring → Results.
   - Authentic scoring rules matrix displaying actual weights from `backend/detector.py` (+40 IP, +35 userinfo, +30 brand mimicry).
5. **Stage 05: Live URL Analysis**
   - High-contrast experimental terminal console accepting **any arbitrary HTTP or HTTPS URL**.
   - Direct communication with the Python Flask API (`POST /api/analyze`).
   - Dynamic Estimated URL Risk score (0–100), chromatic tier badges, triggered structural warnings with point values, and passed parameter audit drawer.
6. **Stage 06: Epilogue & Thank You**
   - Candid technical boundaries (no DOM inspection, no reputation queries, heuristic realities).
   - Monumental kinetic **"THANK YOU"** digital artwork with return-to-top interaction.

---

## Safety Architecture

PhishGuard is engineered as an **air-gapped, local string inspection laboratory**:
- **Zero Remote Requests**: The server never opens, connects to, fetches, crawls, or pings submitted URLs.
- **No HTML/DOM Execution**: Remote assets and JavaScript payloads are never downloaded.
- **Safe Demonstration**: Test arbitrary live or suspicious URLs in front of your class without triggering network alarms or security risks.
- **Estimated Risk Metric**: Scores reflect an *Estimated Structural Risk index*, not an empirically calibrated probability of maliciousness.

---

## Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Backend Engine** | Python 3.14+ | Core RFC 3986 parsing & weighted heuristics |
| **URL Parsing** | `urllib.parse.urlsplit` | Standard library component segregation |
| **IP Detection** | `ipaddress.ip_address` | IPv4 & IPv6 literal identification |
| **API Server** | Flask + Flask-CORS | REST API (`/api/analyze`, `/api/health`) |
| **Frontend** | React 19 + Vite | Reactive digital-art experimental interface |
| **Styling** | Tailwind CSS v4 + Custom CSS | Brutalist / experimental laboratory design |
| **Testing** | Python `unittest` | 36 automated unit & integration test cases |

---

## How to Run Locally (Windows PowerShell)

### Prerequisites
- Python 3.10+ (tested on Python 3.14)
- Node.js 18+ (tested on Node.js v24)
- Windows PowerShell

### 1. Start Flask Backend (Port 5000)
```powershell
cd E:\phishing
.\venv\Scripts\Activate.ps1
python backend/app.py
```
*Backend runs on `http://127.0.0.1:5000`.*

### 2. Start React Frontend (Port 5173)
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

### Verified Test Suite (36 Tests Passing)
- Standard HTTPS & HTTP URLs
- IPv4 & IPv6 literals
- Arbitrary custom ports (`:8080`, `:443`)
- Deep subdomains & query strings
- Brand mimicry in hyphenated hostnames
- Protocol validation & rejection of unsupported schemes (`ftp://`, `ssh://`, `mailto:`, etc.)
- Dynamic re-analysis idempotence and repeatability
- REST API error handling & JSON formatting

---

## Live Presentation Script & Flow

1. **Title & Opening (Stage 01)**:
   - Fullscreen the browser (`F11`).
   - Move your mouse over the 3D kinetic sculpture in the hero to show real-time perspective tracking.
   - Read the opening speech from the hero text block:
     > *"Good morning everyone! Today, I'm going to talk about Phishing URL Analysis Using Python..."*
   - Click **"Explore the experiment"**.
2. **Anatomy Deconstruction (Stage 02)**:
   - Click the interactive URL buttons (**Scheme**, **Hostname**, **Path**, **Query**) to show the exploded digital artwork. Explain why attackers focus on hostname manipulation while modern phishing sites exploit HTTPS encryption to display false padlock icons.
3. **Python Standard Library (Stage 03)**:
   - Present the code canvas showing `urlsplit()` and `ipaddress`. Explain that component segregation prevents attackers from disguising domains in path or query strings.
4. **Pipeline & Scoring Rules (Stage 04)**:
   - Walk through the 5 stages and point to the **Authentic Rule Weights** table. Explain that high-impact anomalies (e.g. direct IP hosts or `@` userinfo disguises) contribute +35 to +40 points, while generic path keywords contribute minor weights.
5. **Live URL Analysis (Stage 05)**:
   - Paste or type any arbitrary link live:
     - Normal link: `https://github.com/torvalds/linux` -> Low Risk (0/100).
     - Suspicious link: `http://198.51.100.25:8080/secure/update?verify=true` -> High Risk (80/100).
     - Audience choice: Paste any URL suggested by your evaluators.
   - Point out the triggered indicators, passed checks drawer, and RFC 3986 parsed components.
6. **Epilogue & Thank You (Stage 06)**:
   - Discuss architectural limitations (no DOM execution, air-gapped evaluation).
   - Conclude with the manifesto and the monumental kinetic **"THANK YOU"** composition.
