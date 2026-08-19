export type LegalCategory = 
  | 'property_landlord_dispute'
  | 'online_financial_fraud'
  | 'consumer_deficiency'
  | 'cyber_stalking_harassment'
  | 'cheque_bounce_financial'
  | 'employment_workplace'
  | 'motor_accident_insurance'
  | 'general_civil_criminal';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface LegalSectionItem {
  id: string;
  act: string;
  section: string;
  oldIpcSection?: string;
  title: string;
  description: string;
  keyElements: string[];
  relevanceScore: number;
  punishment: string;
  cognizable: boolean;
  bailable: boolean;
  compoundable?: boolean;
}

export interface ActionStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  timeline: string;
  urgency: 'immediate' | 'within_24h' | 'within_7_days' | 'within_30_days';
  authorityName: string;
  authorityUrl?: string;
  evidenceRequired: string[];
  tips: string[];
  completed?: boolean;
}

export interface LegalAuthorityContact {
  name: string;
  type: 'police' | 'consumer_forum' | 'cyber_cell' | 'rera' | 'legal_aid';
  portalUrl?: string;
  phone?: string;
  description: string;
  procedure: string;
}

export interface PrecedentSummary {
  caseTitle: string;
  citation: string;
  court: string;
  year: number;
  keyTakeaway: string;
  ratioDecidendi: string;
}

export interface LegalNoticeData {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  subject: string;
  facts: string[];
  demands: string[];
  statutoryNoticeDays: number;
  draftedDate: string;
  customText?: string;
}

export interface TriageResult {
  queryId: string;
  originalQuery: string;
  redactedQuery: string;
  category: LegalCategory;
  categoryDisplayName: string;
  summary: string;
  intent: string;
  riskLevel: RiskLevel;
  riskReason: string;
  limitationPeriod: string;
  statutoryTimeframeNotice: string;
  legalSections: LegalSectionItem[];
  actionSteps: ActionStep[];
  authorities: LegalAuthorityContact[];
  precedents: PrecedentSummary[];
  noticeTemplate: LegalNoticeData;
  piiItemsFound: {
    type: 'phone' | 'aadhaar' | 'pan' | 'email' | 'bank_account' | 'name';
    originalMasked: string;
  }[];
  generatedAt: string;
}

export interface TriageFormData {
  query: string;
  categoryHint?: LegalCategory;
  incidentDate?: string;
  disputeAmount?: string;
  stateOrCity?: string;
  uploadedEvidenceName?: string;
  isUrgent?: boolean;
  language: string;
}
