import React, { useState } from 'react';
import { Scale, ShieldAlert, Clock, Calendar, Volume2, VolumeX, Download, Share2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TriageResult } from '../../types/legal.types';
import { TTSService } from '../../services/tts.service';
import { PDFGeneratorService } from '../../services/pdfGenerator';
import { getRiskColorClass, formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';

interface ResultsDashboardProps {
  result: TriageResult;
  onNavigateToTab: (tabId: string) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onNavigateToTab }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const riskClass = getRiskColorClass(result.riskLevel);

  const handleToggleTTS = () => {
    if (isPlayingAudio) {
      TTSService.stop();
      setIsPlayingAudio(false);
      toast('Audio readout stopped', { icon: '🔇' });
    } else {
      const speechSummary = `Legal Triage Assessment for ${result.categoryDisplayName}. ${result.summary}. Risk level is evaluated as ${result.riskLevel}. Primary statutory section applies under ${result.legalSections[0]?.act} ${result.legalSections[0]?.section}.`;
      setIsPlayingAudio(true);
      TTSService.speak(speechSummary, 'en-IN', () => {
        setIsPlayingAudio(false);
      });
      toast('Playing AI voice summary...', { icon: '🔊' });
    }
  };

  const handleDownloadFullReport = () => {
    PDFGeneratorService.downloadTriageReportPDF(result);
    toast.success('Downloaded complete legal triage report!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-judiciary-800 shadow-xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-judiciary-700/10 dark:bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-judiciary-100 text-judiciary-800 dark:bg-judiciary-900 dark:text-gold border border-gold/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                {result.categoryDisplayName}
              </span>

              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${riskClass.bg} ${riskClass.text} ${riskClass.border}`}>
                {riskClass.label}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                Generated {formatDate(result.generatedAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-judiciary-900 dark:text-white font-sans">
              Legal Rights Triage Assessment
            </h1>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed pt-1">
              {result.summary}
            </p>
          </div>

          {/* Top Actions: Audio Readout & Download Full Report */}
          <div className="flex flex-wrap sm:flex-col items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={handleToggleTTS}
              className={`w-full sm:w-48 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                isPlayingAudio
                  ? 'bg-secondary text-white border-secondary animate-pulse'
                  : 'bg-white dark:bg-judiciary-900 border-gray-300 dark:border-judiciary-700 text-judiciary-900 dark:text-gold hover:border-gold'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
              <span>{isPlayingAudio ? 'Stop Readout' : 'Listen Summary'}</span>
            </button>

            <button
              onClick={handleDownloadFullReport}
              className="w-full sm:w-48 py-3 px-4 rounded-xl text-xs font-bold bg-judiciary-800 hover:bg-judiciary-900 text-white flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-gold" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards in Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-judiciary-800">
          {/* Metric 1: Applicable Section */}
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-judiciary-900/50 border border-gray-200 dark:border-judiciary-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-gold" />
              Primary Statute
            </div>
            <div className="text-base font-extrabold text-judiciary-900 dark:text-white">
              {result.legalSections[0]?.section || 'BNS 2023'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {result.legalSections[0]?.act || 'Bharatiya Nyaya Sanhita'}
            </div>
          </div>

          {/* Metric 2: Statutory Limitation */}
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-judiciary-900/50 border border-gray-200 dark:border-judiciary-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              Limitation Period
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
              {result.limitationPeriod}
            </div>
          </div>

          {/* Metric 3: Notice Timeframe */}
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-judiciary-900/50 border border-gray-200 dark:border-judiciary-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              Notice Window
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {result.statutoryTimeframeNotice}
            </div>
          </div>

          {/* Metric 4: PII Privacy Status */}
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-judiciary-900/50 border border-gray-200 dark:border-judiciary-800">
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
              Zero-Knowledge PII
            </div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sanitized Client-Side</span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              {result.piiItemsFound.length} Identifiers Scrubbed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultsDashboard;
