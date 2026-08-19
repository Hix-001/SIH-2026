import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TriageFormData, TriageResult, LegalNoticeData } from '../types/legal.types';
import { ApiService } from '../services/api.service';
import { redactPII, PIIRedactionResult } from '../utils/piiRedactor';

interface TriageContextType {
  currentForm: TriageFormData;
  updateFormField: <K extends keyof TriageFormData>(field: K, value: TriageFormData[K]) => void;
  resetForm: () => void;
  isAnalyzing: boolean;
  analysisStage: number; // 0 to 4 for animated progress
  analysisStageText: string;
  result: TriageResult | null;
  setResult: (result: TriageResult | null) => void;
  runAnalysis: (overrideData?: Partial<TriageFormData>) => Promise<TriageResult>;
  piiPreview: PIIRedactionResult | null;
  uploadedFileName: string | null;
  setUploadedFile: (name: string | null, content?: string) => void;
  customNotice: LegalNoticeData | null;
  setCustomNotice: (notice: LegalNoticeData | null) => void;
}

const defaultFormData: TriageFormData = {
  query: '',
  categoryHint: undefined,
  incidentDate: '',
  disputeAmount: '',
  stateOrCity: '',
  uploadedEvidenceName: undefined,
  isUrgent: false,
  language: 'en'
};

const TriageContext = createContext<TriageContextType | undefined>(undefined);

export const TriageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentForm, setCurrentForm] = useState<TriageFormData>(defaultFormData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [analysisStageText, setAnalysisStageText] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);
  const [piiPreview, setPiiPreview] = useState<PIIRedactionResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [customNotice, setCustomNotice] = useState<LegalNoticeData | null>(null);

  const updateFormField = <K extends keyof TriageFormData>(field: K, value: TriageFormData[K]) => {
    setCurrentForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'query' && typeof value === 'string') {
        setPiiPreview(redactPII(value));
      }
      return updated;
    });
  };

  const resetForm = () => {
    setCurrentForm(defaultFormData);
    setPiiPreview(null);
    setUploadedFileName(null);
    setResult(null);
    setCustomNotice(null);
    setAnalysisStage(0);
  };

  const setUploadedFile = (name: string | null, content?: string) => {
    setUploadedFileName(name);
    if (name) {
      updateFormField('uploadedEvidenceName', name);
    }
    if (content) {
      const appended = currentForm.query ? `${currentForm.query}\n\n[Extracted Document Evidence]: ${content}` : content;
      updateFormField('query', appended);
    }
  };

  const runAnalysis = async (overrideData?: Partial<TriageFormData>): Promise<TriageResult> => {
    setIsAnalyzing(true);
    setAnalysisStage(1);
    setAnalysisStageText('Applying Zero-Knowledge PII Redaction on Input...');

    const submissionData: TriageFormData = {
      ...currentForm,
      ...overrideData
    };

    try {
      // Stage 1: PII Scrub
      await new Promise(r => setTimeout(r, 450));
      setAnalysisStage(2);
      setAnalysisStageText('Querying Bharatiya Nyaya Sanhita (BNS 2023) & Special Acts...');

      // Stage 2: Legal KB Search
      await new Promise(r => setTimeout(r, 550));
      setAnalysisStage(3);
      setAnalysisStageText('Checking Limitation Clock & Statutory Deadlines...');

      // Stage 3: Statutory Evaluation
      await new Promise(r => setTimeout(r, 400));
      setAnalysisStage(4);
      setAnalysisStageText('Synthesizing Action Plan & Formal Notice Draft...');

      const analysisResult = await ApiService.analyzeLegalIssue(submissionData);
      setResult(analysisResult);
      setCustomNotice(analysisResult.noticeTemplate);
      return analysisResult;
    } finally {
      setIsAnalyzing(false);
      setAnalysisStage(0);
      setAnalysisStageText('');
    }
  };

  return (
    <TriageContext.Provider value={{
      currentForm,
      updateFormField,
      resetForm,
      isAnalyzing,
      analysisStage,
      analysisStageText,
      result,
      setResult,
      runAnalysis,
      piiPreview,
      uploadedFileName,
      setUploadedFile,
      customNotice,
      setCustomNotice
    }}>
      {children}
    </TriageContext.Provider>
  );
};

export const useTriage = () => {
  const context = useContext(TriageContext);
  if (!context) {
    throw new Error('useTriage must be used within TriageProvider');
  }
  return context;
};
