# NyayaSetu API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Endpoints

### 1. Health Check
`GET /health`

**Response:**
```json
{
  "status": "healthy",
  "service": "NyayaSetu Legal Triage Engine",
  "bns_codified_version": "2023.1",
  "timestamp": "2026-08-20T03:45:00Z"
}
```

---

### 2. Legal Dispute Triage & Analysis
`POST /legal/analyze`

**Request Body:**
```json
{
  "query": "My landlord in Bengaluru is withholding my security deposit of Rs 75,000 for 45 days after I vacated with zero damages.",
  "categoryHint": "property_landlord_dispute",
  "disputeAmount": "₹75,000",
  "incidentDate": "2026-07-01",
  "stateOrCity": "Bengaluru, Karnataka",
  "language": "en"
}
```

**Response Body:**
```json
{
  "success": true,
  "data": {
    "queryId": "triage_abc123",
    "category": "property_landlord_dispute",
    "categoryDisplayName": "Landlord & Tenant Disputes",
    "summary": "Landlord-tenant dispute involving unlawful withholding of tenancy security deposit.",
    "riskLevel": "moderate",
    "limitationPeriod": "3 Years under Limitation Act 1963; 15-day demand notice required.",
    "statutoryTimeframeNotice": "15 Days Formal Demand Notice under BNS Section 303",
    "legalSections": [
      {
        "id": "bns_303",
        "act": "Bharatiya Nyaya Sanhita (BNS), 2023",
        "section": "Section 303",
        "oldIpcSection": "IPC Section 405 & 406 (Criminal Breach of Trust)",
        "title": "Criminal Breach of Trust",
        "relevanceScore": 0.94,
        "punishment": "Imprisonment up to 3 years or fine",
        "cognizable": true,
        "bailable": false
      }
    ],
    "actionSteps": [
      {
        "id": "step_1",
        "stepNumber": 1,
        "title": "Collate Tenancy Agreement & Handover Inspection",
        "timeline": "Day 1 - 2",
        "urgency": "within_7_days"
      }
    ],
    "noticeTemplate": {
      "senderName": "Rahul Sharma",
      "receiverName": "K. N. Murthy",
      "subject": "FINAL LEGAL NOTICE: DEMAND FOR SECURITY DEPOSIT REFUND",
      "facts": ["That the Complainant vacated the premises with zero damages..."],
      "demands": ["Refund ₹75,000 with 18% p.a. interest within 15 days..."],
      "statutoryNoticeDays": 15
    }
  }
}
```

---

### 3. PII Redaction
`POST /pii/redact`

**Request Body:**
```json
{
  "text": "My phone is 9876543210 and Aadhaar is 5432-9876-1234. UPI id: user@okhdfcbank"
}
```

**Response Body:**
```json
{
  "success": true,
  "originalLength": 76,
  "redactedText": "My phone is [PHONE: +91 98****3210] and Aadhaar is [AADHAAR: XXXX-XXXX-1234]. UPI id: [UPI: u***@upi]"
}
```
