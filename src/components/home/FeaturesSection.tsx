import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Languages, FileText, Search, ArrowRight, CheckCircle2, Lock, Sparkles, BookOpen } from 'lucide-react';
import { STATUTE_KNOWLEDGE_BASE } from '../../utils/constants';
import { redactPII } from '../../utils/piiRedactor';

export const FeaturesSection: React.FC = () => {
  // 1. State for BNS vs IPC Lookup Tool
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. State for Live PII Sandbox
  const [sandboxText, setSandboxText] = useState(
    'My landlord Ramesh (Phone: 9876543210, Aadhaar: 4321-5678-9012) refuses to refund my security deposit of ₹60,000 sent via UPI ramesh@okhdfcbank.'
  );

  const sandboxRedaction = redactPII(sandboxText);

  const bnsItems = Object.values(STATUTE_KNOWLEDGE_BASE);
  const filteredBns = bnsItems.filter(item => 
    item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.oldIpcSection && item.oldIpcSection.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-white dark:bg-judiciary-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-judiciary-50 dark:bg-judiciary-900/60 border border-judiciary-200 dark:border-judiciary-800 text-judiciary-800 dark:text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Core Innovation & Technical Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiciary-900 dark:text-white font-sans tracking-tight">
            Intelligent Legal Rights Architecture
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 mt-3">
            Built from first principles for Indian citizens navigating new legal frameworks, digital evidence, and multilingual accessibility.
          </p>
        </div>

        {/* 3 Major Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-judiciary-800 hover:shadow-glass-hover transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-judiciary-100 dark:bg-judiciary-900 border border-judiciary-300 dark:border-gold/30 flex items-center justify-center text-judiciary-800 dark:text-gold mb-6 group-hover:scale-110 transition-transform">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-judiciary-900 dark:text-white mb-2">
              BNS 2023 Statutory Mapping
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Auto-maps plain English, Hindi, or regional queries to exact Bharatiya Nyaya Sanhita (BNS 2023) sections, comparing them with legacy IPC sections for crystal clear clarity.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-judiciary-800 hover:shadow-glass-hover transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-secondary-light/10 border border-secondary/30 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-judiciary-900 dark:text-white mb-2">
              Zero-Knowledge PII Redaction
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Client-side scrubbing for Indian identifiers (Aadhaar 12-digit, PAN, mobile numbers, UPI handles, and bank accounts) before transmission, ensuring complete privacy compliance.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-judiciary-800 hover:shadow-glass-hover transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-gold mb-6 group-hover:scale-110 transition-transform">
              <Languages className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-judiciary-900 dark:text-white mb-2">
              22 Indic Languages via Bhashini
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Break language barriers with voice-to-text and automated legal translation across Hindi, Tamil, Telugu, Bengali, Marathi, and Gujarati with native legal terminology preservation.
            </p>
          </div>
        </div>

        {/* Interactive Feature 1: Live BNS vs IPC Converter Tool */}
        <div className="bg-gradient-to-br from-judiciary-900 to-judiciary-950 rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-2xl mb-16 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                Interactive Legal Directory
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                BNS (2023) vs IPC Conversion Matrix
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Search any old IPC section (e.g. 420, 406, 506) or criminal act to discover its newly codified BNS equivalent and penalties.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-80 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search IPC (e.g. 420), BNS, or topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBns.slice(0, 4).map((sec) => (
              <div
                key={sec.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gold/20 text-gold border border-gold/30">
                      {sec.act}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{sec.section}</h4>
                  </div>
                  {sec.oldIpcSection && (
                    <span className="text-[11px] font-semibold text-secondary-light bg-secondary/20 px-2 py-0.5 rounded border border-secondary/30">
                      {sec.oldIpcSection.split('(')[0]}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-300 line-clamp-2">
                  {sec.description}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Punishment: <strong className="text-gray-200">{sec.punishment.split(',')[0]}</strong></span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sec.cognizable ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {sec.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Feature 2: Client-Side PII Redaction Live Sandbox */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-judiciary-800 shadow-xl">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4" />
              Real-Time Security Test
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-judiciary-900 dark:text-white">
              Live Client-Side PII Redactor Demonstration
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
              Type or edit real-world Indian details below (Aadhaar, Phone, PAN, Bank A/C) to verify how sensitive identity data is sanitized in the browser before legal inference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Box */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Raw Citizen Input (Simulated)
              </label>
              <textarea
                value={sandboxText}
                onChange={(e) => setSandboxText(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:outline-none focus:border-judiciary-700 dark:focus:border-gold transition-colors font-mono"
              />
            </div>

            {/* Scrubbed Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Scrubbed Output (Safe for AI Processing)
                </label>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {sandboxRedaction.piiCount} PII Entities Masked
                </span>
              </div>
              <div className="w-full p-4 rounded-2xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-mono min-h-[120px] whitespace-pre-wrap leading-relaxed">
                {sandboxRedaction.redactedText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
