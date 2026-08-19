import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileCheck, FileText, Landmark, LayoutDashboard, RotateCcw, Download, ArrowRight } from 'lucide-react';
import { useTriage } from '../context/TriageContext';
import { LegalTriageService } from '../services/legal.service';
import ResultsDashboard from '../components/results/ResultsDashboard';
import LegalSections from '../components/results/LegalSections';
import ActionableSteps from '../components/results/ActionableSteps';
import LegalNoticeGenerator from '../components/results/LegalNoticeGenerator';
import Resources from '../components/results/Resources';
import LegalDisclaimer from '../components/common/LegalDisclaimer';
import { TriageResult } from '../types/legal.types';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { result, setResult, resetForm } = useTriage();
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'steps' | 'notice' | 'resources'>('overview');

  // Fallback: If accessed directly without form submission, initialize default presentation scenario
  useEffect(() => {
    if (!result) {
      LegalTriageService.analyzeDispute({
        query: 'I vacated my rented apartment in Indiranagar, Bengaluru 45 days ago with zero damage and proper 1-month advance notice. The landlord K. N. Murthy is unlawfully refusing to refund my security deposit of ₹75,000.',
        categoryHint: 'property_landlord_dispute',
        language: 'en'
      }).then((res: TriageResult) => {
        setResult(res);
      });
    }
  }, [result, setResult]);

  const handleStartNewTriage = () => {
    resetForm();
    navigate('/triage');
  };

  if (!result) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-judiciary-700 border-t-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-judiciary-800 dark:text-gold">
            Loading Legal Triage Assessment...
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Triage Overview', icon: LayoutDashboard },
    { id: 'sections', label: `Statutory Sections (${result.legalSections.length})`, icon: Scale },
    { id: 'steps', label: `Action Steps (${result.actionSteps.length})`, icon: FileCheck },
    { id: 'notice', label: 'Legal Notice Drafter', icon: FileText },
    { id: 'resources', label: 'Authorities & Case Law', icon: Landmark },
  ];

  return (
    <>
      <Helmet>
        <title>Legal Assessment Results | NyayaSetu</title>
        <meta
          name="description"
          content="Comprehensive AI rights navigator assessment with BNS 2023 provisions, actionable timelines, and formal legal notice draft."
        />
      </Helmet>

      <div className="min-h-screen py-10 bg-gradient-to-b from-[#f8f9fe] to-white dark:from-judiciary-950 dark:to-judiciary-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
          {/* Top Bar Navigation & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-judiciary-800 dark:hover:text-gold">Home</Link>
              <span>/</span>
              <Link to="/triage" className="hover:text-judiciary-800 dark:hover:text-gold">Triage</Link>
              <span>/</span>
              <span className="text-judiciary-900 dark:text-white font-bold">Results Dossier</span>
            </div>

            <button
              onClick={handleStartNewTriage}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-judiciary-900 border border-gray-300 dark:border-judiciary-700 text-judiciary-900 dark:text-gray-100 hover:border-gold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start New Triage</span>
            </button>
          </div>

          {/* Sub-Header Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-judiciary-800 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-judiciary-800 text-white shadow-md dark:bg-gold dark:text-judiciary-950'
                      : 'bg-white/80 dark:bg-judiciary-900/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-judiciary-800 border border-gray-200 dark:border-judiciary-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Views */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <ResultsDashboard result={result} onNavigateToTab={(t: string) => setActiveTab(t as any)} />
                  <LegalSections sections={result.legalSections} />
                  <ActionableSteps steps={result.actionSteps} />
                </motion.div>
              )}

              {activeTab === 'sections' && (
                <motion.div
                  key="sections"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <LegalSections sections={result.legalSections} />
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ActionableSteps steps={result.actionSteps} />
                </motion.div>
              )}

              {activeTab === 'notice' && (
                <motion.div
                  key="notice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <LegalNoticeGenerator initialNotice={result.noticeTemplate} />
                </motion.div>
              )}

              {activeTab === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Resources authorities={result.authorities} precedents={result.precedents} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Statutory Disclaimer */}
          <LegalDisclaimer />
        </div>
      </div>
    </>
  );
};
export default ResultsPage;
