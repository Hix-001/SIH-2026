import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Clock, FileCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';

export const AnalysisProgress: React.FC = () => {
  const { analysisStage, analysisStageText } = useTriage();

  const stages = [
    {
      id: 1,
      title: 'Zero-Knowledge PII Redaction',
      desc: 'Sanitizing Aadhaar, phone, PAN, and banking identifiers client-side',
      icon: ShieldCheck
    },
    {
      id: 2,
      title: 'BNS 2023 & Acts Semantic Match',
      desc: 'Mapping dispute facts to Bharatiya Nyaya Sanhita, IT Act & CPA 2019',
      icon: Scale
    },
    {
      id: 3,
      title: 'Limitation Clock & Statutory Deadlines',
      desc: 'Checking statutory notice timelines and procedural prerequisites',
      icon: Clock
    },
    {
      id: 4,
      title: 'Legal Notice & Strategy Synthesis',
      desc: 'Drafting formal demand notice and compiling evidence checklist',
      icon: FileCheck
    }
  ];

  return (
    <div className="fixed inset-0 bg-judiciary-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white dark:bg-judiciary-900 rounded-3xl p-8 border border-gold/40 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-judiciary-800 border border-gold/40 flex items-center justify-center mx-auto text-gold shadow-lg">
            <Scale className="w-7 h-7 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-judiciary-900 dark:text-white">
            Analyzing Legal Standing
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Smart Automation Engine • SIH 2026
          </p>
        </div>

        {/* Stage List */}
        <div className="space-y-4">
          {stages.map((stage) => {
            const isCompleted = analysisStage > stage.id;
            const isCurrent = analysisStage === stage.id;

            return (
              <div
                key={stage.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                    : isCurrent
                    ? 'bg-judiciary-50 dark:bg-judiciary-800/80 border-gold shadow-md text-judiciary-900 dark:text-white'
                    : 'bg-gray-50/40 dark:bg-judiciary-950/40 border-gray-200 dark:border-judiciary-800 text-gray-400 dark:text-gray-500'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-gold animate-spin" />
                  ) : (
                    <stage.icon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold">{stage.title}</div>
                  <div className="text-[11px] opacity-80 leading-snug">{stage.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current status text */}
        <div className="pt-2 text-center text-xs font-semibold text-gold">
          {analysisStageText || 'Processing legal intelligence...'}
        </div>
      </motion.div>
    </div>
  );
};
export default AnalysisProgress;
