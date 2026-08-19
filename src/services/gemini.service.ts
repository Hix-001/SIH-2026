import axios from 'axios';
import { TriageFormData, TriageResult, LegalCategory } from '../types/legal.types';
import { redactPII } from '../utils/piiRedactor';
import { generateRandomId } from '../utils/helpers';
import { CATEGORY_METADATA } from '../utils/constants';

export class GeminiLegalService {
  private static getApiKey(): string | null {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key || key === 'your_gemini_api_key_here' || key.trim().length === 0) {
      return null;
    }
    return key.trim();
  }

  private static getModelName(): string {
    return import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';
  }

  /**
   * Analyze dispute using Google Gemini 1.5/2.0 Flash with structured JSON output
   */
  public static async analyzeWithGemini(data: TriageFormData): Promise<TriageResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No Gemini API key provided. Please set VITE_GEMINI_API_KEY in .env');
    }

    // 1. Scrub PII on client before sending to LLM
    const piiRedacted = redactPII(data.query);
    const model = this.getModelName();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt = `
You are NyayaSetu, an expert AI Legal Triage Engine specialized in the Indian Legal System, specifically the newly enacted Bharatiya Nyaya Sanhita (BNS 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), Bharatiya Sakshya Adhiniyam (BSA 2023), Information Technology Act 2000, Consumer Protection Act 2019, Section 138 Negotiable Instruments Act 1881, and State Tenancy/RERA laws.

Analyze the citizen's dispute and output a strictly valid JSON object conforming to the following structure:
{
  "category": "property_landlord_dispute" | "online_financial_fraud" | "consumer_deficiency" | "cyber_stalking_harassment" | "cheque_bounce_financial" | "employment_workplace" | "motor_accident_insurance" | "general_civil_criminal",
  "categoryDisplayName": string,
  "summary": string (clear 2-3 sentence executive summary of the dispute facts and legal posture),
  "intent": string,
  "riskLevel": "low" | "moderate" | "high" | "critical",
  "riskReason": string,
  "limitationPeriod": string (exact statutory period under Limitation Act 1963 or specific act),
  "statutoryTimeframeNotice": string (e.g. "15 Days Formal Demand Notice"),
  "legalSections": [
    {
      "id": string,
      "act": string (e.g. "Bharatiya Nyaya Sanhita (BNS), 2023" or "Information Technology Act, 2000"),
      "section": string (e.g. "Section 303 / 316"),
      "oldIpcSection": string (e.g. "IPC Section 405 & 406 (Criminal Breach of Trust)"),
      "title": string,
      "description": string,
      "keyElements": string[] (3-4 bullet points of essential legal ingredients to prove),
      "relevanceScore": number (between 0.80 and 0.99),
      "punishment": string,
      "cognizable": boolean,
      "bailable": boolean
    }
  ],
  "actionSteps": [
    {
      "id": string,
      "stepNumber": number,
      "title": string,
      "description": string,
      "timeline": string (e.g. "Immediate", "Day 1-3", "Within 15 Days"),
      "urgency": "immediate" | "within_24h" | "within_7_days" | "within_30_days",
      "authorityName": string,
      "authorityUrl": string,
      "evidenceRequired": string[],
      "tips": string[]
    }
  ],
  "authorities": [
    {
      "name": string,
      "type": "police" | "consumer_forum" | "cyber_cell" | "rera" | "legal_aid",
      "phone": string,
      "portalUrl": string,
      "description": string,
      "procedure": string
    }
  ],
  "precedents": [
    {
      "caseTitle": string,
      "citation": string,
      "court": string,
      "year": number,
      "keyTakeaway": string,
      "ratioDecidendi": string
    }
  ],
  "noticeTemplate": {
    "senderName": string,
    "senderAddress": string,
    "senderPhone": string,
    "receiverName": string,
    "receiverAddress": string,
    "subject": string,
    "facts": string[],
    "demands": string[],
    "statutoryNoticeDays": number
  }
}

Dispute Metadata:
- Dispute Amount: ${data.disputeAmount || 'Not specified'}
- Incident Date: ${data.incidentDate || 'Recent'}
- State/City Jurisdiction: ${data.stateOrCity || 'India'}
- User Preferred Language: ${data.language || 'English'}
`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemPrompt}\n\nCitizen's Grievance (PII Sanitized):\n"${piiRedacted.redactedText}"` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 2500
      }
    };

    const response = await axios.post(url, requestBody, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });

    const rawJsonText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJsonText) {
      throw new Error('Empty response received from Gemini AI');
    }

    const parsedData = JSON.parse(rawJsonText);
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    // Fill in required frontend fields
    const result: TriageResult = {
      queryId: generateRandomId('gemini_triage'),
      originalQuery: data.query,
      redactedQuery: piiRedacted.redactedText,
      category: parsedData.category || data.categoryHint || 'general_civil_criminal',
      categoryDisplayName: parsedData.categoryDisplayName || CATEGORY_METADATA[parsedData.category as LegalCategory]?.title || 'Legal Dispute',
      summary: parsedData.summary,
      intent: parsedData.intent || parsedData.category,
      riskLevel: parsedData.riskLevel || 'moderate',
      riskReason: parsedData.riskReason || 'Statutory notice timeline applies.',
      limitationPeriod: parsedData.limitationPeriod || '3 Years under Limitation Act 1963.',
      statutoryTimeframeNotice: parsedData.statutoryTimeframeNotice || '15 Days Demand Notice',
      legalSections: parsedData.legalSections || [],
      actionSteps: parsedData.actionSteps || [],
      authorities: parsedData.authorities || [],
      precedents: parsedData.precedents || [],
      noticeTemplate: {
        senderName: parsedData.noticeTemplate?.senderName || '[Your Name / Complainant]',
        senderAddress: parsedData.noticeTemplate?.senderAddress || (data.stateOrCity ? `[Resident of ${data.stateOrCity}]` : '[Your Address]'),
        senderPhone: parsedData.noticeTemplate?.senderPhone || '[Your Contact Details]',
        receiverName: parsedData.noticeTemplate?.receiverName || '[Opposite Party / Landlord / Company]',
        receiverAddress: parsedData.noticeTemplate?.receiverAddress || '[Opposite Party Address]',
        subject: parsedData.noticeTemplate?.subject || 'FORMAL STATUTORY DEMAND NOTICE',
        facts: parsedData.noticeTemplate?.facts || ['That the Complainant suffered breach of agreement and injury.'],
        demands: parsedData.noticeTemplate?.demands || ['Comply and refund the outstanding sum within 15 days.'],
        statutoryNoticeDays: parsedData.noticeTemplate?.statutoryNoticeDays || 15,
        draftedDate: today
      },
      piiItemsFound: piiRedacted.entities.map(e => ({
        type: e.type === 'upi' ? 'bank_account' : e.type,
        originalMasked: e.masked
      })),
      generatedAt: new Date().toISOString()
    };

    return result;
  }
}
