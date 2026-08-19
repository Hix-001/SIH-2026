import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Mic, FileText, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import TriageForm from '../components/triage/TriageForm';
import VoiceInput from '../components/triage/VoiceInput';
import FileUpload from '../components/triage/FileUpload';
import AnalysisProgress from '../components/triage/AnalysisProgress';
import LegalDisclaimer from '../components/common/LegalDisclaimer';
import { useTriage } from '../context/TriageContext';

export const TriagePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isAnalyzing } = useTriage();
  const [activeTab, setActiveTab] = useState<'form' | 'voice' | 'upload'>('form');

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'voice') {
      setActiveTab('voice');
    } else if (mode === 'upload') {
      setActiveTab('upload');
    }
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>Legal Triage Studio | NyayaSetu</title>
        <meta
          name="description"
          content="Describe your dispute in plain text, voice recording, or document upload for automated BNS 2023 legal triage."
        />
      </Helmet>

      {/* Animated Analysis Modal when submitting */}
      {isAnalyzing && <AnalysisProgress />}

      <div className="min-h-screen py-12 bg-gradient-to-b from-[#f8f9fe] to-white dark:from-judiciary-950 dark:to-judiciary-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-judiciary-100 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
              <Scale className="w-4 h-4 text-gold" />
              Interactive Legal Triage Studio
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-judiciary-900 dark:text-white font-sans">
              Describe Your Legal Dispute
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Speak or write what happened in your own words. Our AI engine strips personal identity data client-side and maps applicable Bharatiya Nyaya Sanhita (BNS 2023) provisions.
            </p>
          </div>

          {/* Top Multi-Modal Input Mode Switcher */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-1.5 bg-gray-200/80 dark:bg-judiciary-900 rounded-2xl flex items-center gap-1 border border-gray-300 dark:border-judiciary-800 shadow-inner">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'form'
                    ? 'bg-white dark:bg-judiciary-800 text-judiciary-900 dark:text-gold shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text Triage Form</span>
              </button>

              <button
                onClick={() => setActiveTab('voice')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'voice'
                    ? 'bg-white dark:bg-judiciary-800 text-judiciary-900 dark:text-gold shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4 text-gold" />
                <span>Voice Input (Indic)</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-judiciary-800 text-judiciary-900 dark:text-gold shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Document Evidence</span>
              </button>
            </div>
          </div>

          {/* Main Grid: Left Side Helpers / Voice, Right Side Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Assistant Column */}
            <div className="lg:col-span-4 space-y-6">
              {activeTab === 'voice' ? (
                <VoiceInput />
              ) : activeTab === 'upload' ? (
                <FileUpload />
              ) : (
                <div className="space-y-6">
                  <VoiceInput />
                  <FileUpload />
                </div>
              )}
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-8">
              <TriageForm />
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12">
            <LegalDisclaimer />
          </div>
        </div>
      </div>
    </>
  );
};
export default TriagePage;
