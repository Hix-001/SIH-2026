import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Languages, Search, ArrowRight, CheckCircle2, Lock, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
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
    <section className="py-24 bg-gradient-to-b from-[#060a24] via-[#080d30] to-[#060a24] text-white relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-judiciary-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-18"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-judiciary-900/90 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-4 shadow-sm shadow-gold/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Innovation & Technical Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            Intelligent Legal Rights Architecture
          </h2>
          <p className="text-base text-gray-300 mt-4 leading-relaxed">
            Built from first principles for Indian citizens navigating new legal frameworks, digital evidence, and multilingual accessibility.
          </p>
        </motion.div>

        {/* 3 Major Pillars with Staggered Entrance & Hover Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-[#0d1442]/80 backdrop-blur-xl border border-gold/25 hover:border-gold/60 shadow-xl hover:shadow-2xl hover:shadow-gold/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-judiciary-900 border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md">
                <Scale className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                BNS 2023 Statutory Mapping
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Auto-maps plain English, Hindi, or regional queries to exact Bharatiya Nyaya Sanhita (BNS 2023) sections, comparing them with legacy IPC sections for crystal clear clarity.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-bold text-gold group-hover:translate-x-1 transition-transform">
              <span>Explore BNS directory</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-[#0d1442]/80 backdrop-blur-xl border border-gold/25 hover:border-gold/60 shadow-xl hover:shadow-2xl hover:shadow-gold/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary-light/10 border border-secondary/40 flex items-center justify-center text-secondary-light mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                Zero-Knowledge PII Redaction
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Client-side scrubbing for Indian identifiers (Aadhaar 12-digit, PAN, mobile numbers, UPI handles, and bank accounts) before transmission, ensuring complete privacy compliance.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-bold text-gold group-hover:translate-x-1 transition-transform">
              <span>Client-side security</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-[#0d1442]/80 backdrop-blur-xl border border-gold/25 hover:border-gold/60 shadow-xl hover:shadow-2xl hover:shadow-gold/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md">
                <Languages className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                22 Indic Languages via Bhashini
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Break language barriers with voice-to-text and automated legal translation across Hindi, Tamil, Telugu, Bengali, Marathi, and Gujarati with native legal terminology preservation.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1 text-xs font-bold text-gold group-hover:translate-x-1 transition-transform">
              <span>Multilingual Voice AI</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* Interactive Feature 1: Live BNS vs IPC Converter Tool */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-judiciary-900 to-judiciary-950 rounded-3xl p-6 sm:p-10 border border-gold/35 shadow-2xl mb-18 text-white relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Interactive Legal Directory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                BNS (2023) vs IPC Conversion Matrix
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Search any old IPC section (e.g. 420, 406, 506) or criminal act to discover its newly codified BNS equivalent and penalties.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search IPC 420, Cheating, Theft, BNS 316..."
                className="w-full pl-11 pr-4 py-3 bg-judiciary-950/80 rounded-2xl border border-judiciary-800 focus:border-gold focus:outline-none text-sm text-white placeholder-gray-500 shadow-inner"
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-judiciary-950/90 text-gray-400 text-xs uppercase tracking-wider border-b border-judiciary-800">
                <tr>
                  <th className="py-3 px-4 font-bold">New BNS (2023)</th>
                  <th className="py-3 px-4 font-bold">Old IPC Equivalent</th>
                  <th className="py-3 px-4 font-bold">Legal Offence</th>
                  <th className="py-3 px-4 font-bold">Punishment & Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-judiciary-800/60">
                {filteredBns.slice(0, 4).map((item) => (
                  <tr key={item.section} className="hover:bg-judiciary-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-gold">
                      {item.section}
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-300">
                      {item.oldIpcSection || 'N/A'}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white">
                      {item.title}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-300 leading-relaxed max-w-xs">
                      {item.punishment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interactive Feature 2: Live Client-Side PII Redactor Sandbox */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#090e2e]/90 rounded-3xl p-6 sm:p-10 border border-judiciary-800 shadow-2xl relative overflow-hidden"
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary-light uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4" />
              <span>Real-Time Security Test</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Live Client-Side PII Redactor Demonstration
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Type or edit real-world Indian details below to verify how sensitive identity data is sanitized in the browser before legal inference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Raw Citizen Input (Simulated)
              </label>
              <textarea
                value={sandboxText}
                onChange={(e) => setSandboxText(e.target.value)}
                rows={4}
                className="w-full p-4 bg-judiciary-950/90 rounded-2xl border border-judiciary-800 focus:border-gold focus:outline-none text-sm text-white font-mono leading-relaxed resize-none shadow-inner"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Scrubbed Output (Safe for AI Processing)</span>
                </label>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {sandboxRedaction.entities.length} PII Entities Masked
                </span>
              </div>
              <div className="p-4 bg-judiciary-950/90 rounded-2xl border border-emerald-500/30 text-sm text-gray-200 font-mono leading-relaxed min-h-[110px] break-words shadow-inner">
                {sandboxRedaction.redactedText}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default FeaturesSection;
