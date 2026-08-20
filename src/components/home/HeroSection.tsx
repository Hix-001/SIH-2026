import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, ShieldCheck, Globe, ArrowRight, Mic, Sparkles, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../../utils/constants';
import { useTriage } from '../../context/TriageContext';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateFormField } = useTriage();

  const handleSelectPreset = (query: string) => {
    updateFormField('query', query);
    navigate('/triage');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero py-16 lg:py-24">
      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-judiciary-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill Tag & Brand Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-gold-light text-xs sm:text-sm font-semibold shadow-inner">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Smart India Hackathon 2026 • Smart Automation</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-judiciary-950/80 border border-gold/30 text-xs text-gray-200">
                <img src="/logo.png" alt="NyayaSetu Logo" className="w-4 h-4 object-contain" />
                <span className="font-bold text-gold">NyayaSetu</span>
                <span className="text-[10px] text-gray-400">Justice Bridge</span>
              </div>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] font-sans tracking-tight">
              Know Your Legal Rights Under{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-accent to-gold-light">
                BNS 2023 & IT Act
              </span>{' '}
              Instantly.
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-lg text-gray-200/90 max-w-2xl leading-relaxed font-normal">
              Empowering everyday citizens against unlawful landlord actions, online UPI scams, and consumer disputes. Get AI legal triage, BNS section mappings, step-by-step guidance, and formal legal notice drafting in seconds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/triage">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-accent to-gold text-judiciary-950 font-bold text-base shadow-gold-glow hover:brightness-105 transition-all flex items-center gap-3"
                >
                  <Scale className="w-5 h-5 text-judiciary-900" />
                  <span>Start Free Legal Triage</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <Link to="/triage?mode=voice">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/25 backdrop-blur-md transition-all flex items-center gap-2.5"
                >
                  <Mic className="w-5 h-5 text-gold" />
                  <span>Voice Triage (Indic)</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-xl">
              <div className="flex items-center gap-2.5 text-white/90">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Zero-Log PII</div>
                  <div className="text-gray-300">Client-side scrub</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/90">
                <Globe className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">22 Languages</div>
                  <div className="text-gray-300">Bhashini AI ready</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/90">
                <FileCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">BNS 2023</div>
                  <div className="text-gray-300">IPC converted</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column - Interactive Live Preview Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative space-y-4">
              {/* Floating Card 1: BNS Section Mapping */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card-dark rounded-2xl p-5 border border-gold/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gold uppercase tracking-wider">Statutory Match</div>
                      <h4 className="text-base font-bold text-white">BNS Section 303 & 316</h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                    95% Match
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-2.5">
                  Criminal Breach of Trust (Replaces IPC 405/406). Up to 3 years imprisonment + recovery.
                </p>
              </motion.div>

              {/* Floating Card 2: Interactive Instant Preset Launcher */}
              <div className="bg-white/95 dark:bg-judiciary-900/90 rounded-2xl p-5 shadow-2xl border border-gray-200 dark:border-judiciary-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-judiciary-800 dark:text-gold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-secondary" />
                    Quick Dispute Presets (Try Now)
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">1-Click Triage</span>
                </div>

                <div className="space-y-2">
                  {SAMPLE_SCENARIOS.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectPreset(item.query)}
                      className="w-full text-left p-2.5 rounded-xl bg-gray-50 dark:bg-judiciary-950/70 hover:bg-judiciary-50 dark:hover:bg-judiciary-800/80 border border-gray-200 dark:border-judiciary-800 transition-all flex items-center justify-between group"
                    >
                      <div className="pr-2">
                        <div className="text-xs font-bold text-judiciary-900 dark:text-gray-100 group-hover:text-judiciary-700 dark:group-hover:text-gold transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[240px]">
                          {item.preview}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Card 3: PII Redaction Live Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="glass-card-dark rounded-2xl p-4 border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-light">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Client-Side PII Scrubbing</div>
                    <div className="text-[11px] text-gray-400">Aadhaar • PAN • Phone • UPI Redacted</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
