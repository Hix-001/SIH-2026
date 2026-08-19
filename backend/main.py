from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import datetime
import re

app = FastAPI(
    title="NyayaSetu - Citizen Legal Triage API",
    description="Backend AI API for Citizen Legal Triage, BNS 2023 Statutory Mapping, and PII Scrubbing - SIH 2026",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Request / Response Models -----------------

class TriageRequest(BaseModel):
    query: str = Field(..., min_length=10, description="Dispute facts in citizen's words")
    categoryHint: Optional[str] = None
    incidentDate: Optional[str] = None
    disputeAmount: Optional[str] = None
    stateOrCity: Optional[str] = None
    uploadedEvidenceName: Optional[str] = None
    isUrgent: Optional[bool] = False
    language: Optional[str] = "en"

class PIIRedactRequest(BaseModel):
    text: str

class BhashiniTranslateRequest(BaseModel):
    text: str
    sourceLang: str = "en"
    targetLang: str = "hi"

# ----------------- Helper Logic -----------------

def scrub_pii(text: str) -> str:
    # Aadhaar (12 digits)
    text = re.sub(r'\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b', '[AADHAAR: XXXX-XXXX-1234]', text)
    # PAN Card
    text = re.sub(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', '[PAN: ABC****F]', text)
    # Phone (10 digits)
    text = re.sub(r'(?:\+?91[\s-]?)?[6-9]\d{9}\b', '[PHONE: +91 98****3210]', text)
    # Email
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', '[EMAIL: u***@domain.com]', text)
    # UPI
    text = re.sub(r'\b[a-zA-Z0-9.\-_]{3,}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|axl|upi)\b', '[UPI: u***@upi]', text)
    return text

# ----------------- API Endpoints -----------------

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NyayaSetu Legal Triage Engine",
        "bns_codified_version": "2023.1",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.post("/api/v1/pii/redact")
def redact_pii_endpoint(req: PIIRedactRequest):
    scrubbed = scrub_pii(req.text)
    return {
        "success": True,
        "originalLength": len(req.text),
        "redactedText": scrubbed
    }

@app.post("/api/v1/legal/analyze")
def analyze_dispute_endpoint(req: TriageRequest):
    query_lower = req.query.lower()
    scrubbed_query = scrub_pii(req.query)

    # Classification
    if any(k in query_lower for k in ["rent", "landlord", "tenant", "deposit"]):
        category = "property_landlord_dispute"
        category_name = "Landlord & Tenant Disputes"
        sections = [
            {
                "id": "bns_303",
                "act": "Bharatiya Nyaya Sanhita (BNS), 2023",
                "section": "Section 303",
                "oldIpcSection": "IPC Section 405 & 406 (Criminal Breach of Trust)",
                "title": "Criminal Breach of Trust",
                "description": "Dishonest misappropriation of property/deposit entrusted under lease contract.",
                "relevanceScore": 0.94,
                "punishment": "Imprisonment up to 3 years or fine",
                "cognizable": True,
                "bailable": False
            }
        ]
        limitation = "3 Years under Limitation Act 1963; 15-day demand notice required."
        steps = [
            {
                "id": "step_1",
                "stepNumber": 1,
                "title": "Collate Tenancy Agreement & Handover Inspection",
                "timeline": "Day 1 - 2",
                "urgency": "within_7_days",
                "authorityName": "Evidence Dossier",
                "description": "Gather signed lease and UPI payment receipts."
            },
            {
                "id": "step_2",
                "stepNumber": 2,
                "title": "Serve Formal 15-Day Statutory Legal Demand Notice",
                "timeline": "Day 3 - 7",
                "urgency": "within_7_days",
                "authorityName": "Opposite Party via RPAD Speed Post",
                "description": "Issue notice under BNS Section 303 demanding deposit refund with 18% p.a. interest."
            }
        ]
    elif any(k in query_lower for k in ["upi", "fraud", "scam", "otp", "debited", "electricity"]):
        category = "online_financial_fraud"
        category_name = "Online UPI & Cyber Fraud"
        sections = [
            {
                "id": "it_66d",
                "act": "Information Technology Act, 2000",
                "section": "Section 66D",
                "oldIpcSection": "IPC 419/420 (Cyber Personation & Cheating)",
                "title": "Cheating by Personation using Computer Resource",
                "description": "Deceptive impersonation over digital channels leading to unauthorized transfer.",
                "relevanceScore": 0.98,
                "punishment": "Imprisonment up to 3 years and fine up to ₹1,00,000",
                "cognizable": True,
                "bailable": False
            }
        ]
        limitation = "Golden Hour (within 24h) on 1930 Helpline; 3 days for RBI customer liability relief."
        steps = [
            {
                "id": "step_1",
                "stepNumber": 1,
                "title": "Call 1930 Cyber Fraud Helpline Immediately",
                "timeline": "Immediate (Golden Hour)",
                "urgency": "immediate",
                "authorityName": "National Cybercrime Reporting Portal (MHA)",
                "description": "Report UTR transaction number to freeze suspect bank accounts."
            }
        ]
    else:
        category = "consumer_deficiency"
        category_name = "Consumer Protection & E-Commerce"
        sections = [
            {
                "id": "cpa_35",
                "act": "Consumer Protection Act, 2019",
                "section": "Section 2(11) & Section 35",
                "title": "Deficiency in Goods / Service & Consumer Complaint",
                "description": "Failure of manufacturer/e-commerce seller to replace defective product.",
                "relevanceScore": 0.92,
                "punishment": "Order of full refund + compensation for harassment",
                "cognizable": False,
                "bailable": True
            }
        ]
        limitation = "2 Years from date of cause of action under CPA 2019."
        steps = [
            {
                "id": "step_1",
                "stepNumber": 1,
                "title": "Register Grievance on National Consumer Helpline 1915",
                "timeline": "Within 3 Days",
                "urgency": "within_7_days",
                "authorityName": "National Consumer Helpline (DoCA)",
                "description": "Log ticket with tax invoice and defective photos."
            }
        ]

    return {
        "success": True,
        "data": {
            "queryId": f"bns_{datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
            "originalQuery": req.query,
            "redactedQuery": scrubbed_query,
            "category": category,
            "categoryDisplayName": category_name,
            "summary": f"Dispute prima facie classified under {category_name}. Actionable under {sections[0]['act']} {sections[0]['section']}.",
            "intent": category,
            "riskLevel": "high" if category == "online_financial_fraud" else "moderate",
            "riskReason": "Statutory timelines apply.",
            "limitationPeriod": limitation,
            "statutoryTimeframeNotice": "15 Days Formal Demand Notice",
            "legalSections": sections,
            "actionSteps": steps,
            "authorities": [
                {
                    "name": "National Cybercrime Helpline / NALSA",
                    "type": "cyber_cell",
                    "phone": "1930",
                    "portalUrl": "https://cybercrime.gov.in",
                    "description": "24x7 Government Nodal Portal",
                    "procedure": "File online ticket with transaction UTR"
                }
            ],
            "precedents": [],
            "noticeTemplate": {
                "senderName": "[Complainant Name]",
                "senderAddress": "[Complainant Address]",
                "senderPhone": "[Phone / Email]",
                "receiverName": "[Opposite Party / Landlord / Company]",
                "receiverAddress": "[Opposite Party Address]",
                "subject": f"FORMAL LEGAL DEMAND NOTICE: {category_name.upper()}",
                "facts": ["That the Complainant suffered injury and financial breach."],
                "demands": ["Resolve and compensate within 15 days of this notice."],
                "statutoryNoticeDays": 15,
                "draftedDate": datetime.date.today().strftime("%d %B %Y")
            },
            "piiItemsFound": [],
            "generatedAt": datetime.datetime.utcnow().isoformat()
        },
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
