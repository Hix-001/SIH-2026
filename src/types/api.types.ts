import { TriageFormData, TriageResult } from './legal.types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface BhashiniTranslateRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface BhashiniTranslateResponse {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  confidenceScore: number;
}

export interface PIIRedactRequest {
  text: string;
}

export interface PIIRedactResponse {
  redactedText: string;
  entitiesRedacted: {
    type: string;
    text: string;
    start: number;
    end: number;
  }[];
}

export interface LegalAnalysisRequest extends TriageFormData {
  includePrecedents?: boolean;
  generateNoticeDraft?: boolean;
}

export type LegalAnalysisResponse = ApiResponse<TriageResult>;
