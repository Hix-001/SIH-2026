# NyayaSetu | Citizen Legal Triage & Automated Rights Navigator

**Smart India Hackathon (SIH 2026) Prototype**  
**Theme:** Smart Automation  
**Repository:** [https://github.com/Hix-001/SIH-2026.git](https://github.com/Hix-001/SIH-2026.git)

---

## 🏛️ Project Overview

**NyayaSetu** is an AI-powered Citizen Legal Triage and Automated Rights Navigator designed to empower everyday Indian citizens when navigating complex legal disputes—such as unlawful landlord actions, online UPI cyber fraud, and consumer deficiencies.

The platform translates citizen grievances into applicable statutory sections under the new **Bharatiya Nyaya Sanhita (BNS 2023)**, **Information Technology Act 2000**, and **Consumer Protection Act 2019**, while providing an automated formal legal notice drafter with one-click PDF export.

---

## 🌟 Key Features

1. **🏛️ BNS (2023) vs IPC Cross-Reference Engine:**
   - Automatically maps dispute facts to newly codified BNS 2023 sections, highlighting legacy IPC equivalents, bailable/cognizable classifications, and statutory penalties.

2. **🔒 Zero-Knowledge Client-Side PII Scrubbing:**
   - Sensitive personal identifiers (Aadhaar 12-digit, PAN, mobile numbers, UPI handles, bank accounts) are sanitized directly in the citizen's browser prior to analysis.

3. **🗣️ Multilingual Voice & Text Input (22 Indic Languages):**
   - Integrated Web Speech API and Bhashini AI translation pipeline supporting Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, and more.

4. **📜 Automated Legal Demand Notice Drafter:**
   - Court-compliant 15-day statutory demand notice generator with editable clauses, print preview, and one-click PDF download via jsPDF.

5. **🚨 Emergency Golden-Hour Helpline Connectors:**
   - Instant 1-click dialers for **1930 Cyber Fraud Helpline**, **1915 Consumer Helpline**, and **15100 NALSA Free Legal Aid**.

---

## 🚀 Quick Start & Running Locally

```bash
# 1. Clone repository
git clone https://github.com/Hix-001/SIH-2026.git
cd SIH-2026/PROTOTYPE

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
PROTOTYPE/
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Footer, Layout
│   │   ├── common/       # EmergencyBanner, LanguageSelector, LegalDisclaimer
│   │   ├── home/         # HeroSection, FeaturesSection, PresetScenarios, Stats
│   │   ├── triage/       # TriageForm, VoiceInput, FileUpload, AnalysisProgress
│   │   └── results/      # ResultsDashboard, LegalSections, ActionableSteps, LegalNoticeGenerator, Resources
│   ├── context/          # LanguageContext, ThemeContext, TriageContext
│   ├── hooks/            # useSpeechRecognition, usePIIRedaction, useTranslation
│   ├── services/         # legal.service, api.service, bhashini.service, pdfGenerator
│   ├── utils/            # constants (BNS KB), piiRedactor, formatters
│   ├── pages/            # HomePage, TriagePage, ResultsPage, LegalPage, AboutPage, PrivacyPage
│   └── styles/           # index.css, variables.css, animations.css
├── backend/              # Python 3.11+ FastAPI backend with Dockerfile
├── docs/                 # API.md, DEPLOYMENT.md, PRESENTATION.md
└── package.json
```

---

## ⚖️ Constitutional Alignment
Fulfilling **Article 39A of the Constitution of India** (Equal Justice and Free Legal Aid).
