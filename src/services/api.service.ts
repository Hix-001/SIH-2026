import axios from 'axios';
import { LegalAnalysisRequest, LegalAnalysisResponse } from '../types/api.types';
import { TriageResult } from '../types/legal.types';
import { LegalTriageService } from './legal.service';
import { GeminiLegalService } from './gemini.service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export class ApiService {
  /**
   * Submit legal triage query:
   * 1. If Gemini API key is configured -> Uses live Google Gemini 1.5/2.0 Flash
   * 2. If Backend is configured -> Uses FastAPI backend
   * 3. Default fallback -> Uses built-in Smart Indian Judiciary Inference Engine
   */
  public static async analyzeLegalIssue(request: LegalAnalysisRequest): Promise<TriageResult> {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // 1. Check Gemini Live API
    if (geminiKey && geminiKey !== 'your_gemini_api_key_here' && geminiKey.trim().length > 0) {
      try {
        return await GeminiLegalService.analyzeWithGemini(request);
      } catch (geminiError) {
        console.warn('Gemini API call failed or timed out, falling back to local legal engine:', geminiError);
      }
    }

    // 2. Check Backend Server (if mock engine not forced)
    if (import.meta.env.VITE_USE_MOCK_ENGINE === 'false') {
      try {
        const response = await axios.post<LegalAnalysisResponse>(
          `${API_BASE_URL}/legal/analyze`,
          request,
          { timeout: 8000 }
        );
        if (response.data && response.data.data) {
          return response.data.data;
        }
      } catch (backendError) {
        console.warn('Backend server not reachable, using local legal inference engine:', backendError);
      }
    }

    // 3. High-fidelity built-in smart inference engine
    await new Promise(resolve => setTimeout(resolve, 1400));
    return await LegalTriageService.analyzeDispute(request);
  }

  /**
   * Check backend health status
   */
  public static async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, { timeout: 2000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
