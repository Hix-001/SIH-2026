import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#060a24] text-white relative overflow-hidden">
      {/* Radiant Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-judiciary-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 sm:p-14 text-white shadow-2xl border border-gold/40"
        >
          {/* Subtle Decorative Scales Background Watermark */}
          <div className="absolute right-6 -bottom-8 opacity-10 pointer-events-none hidden md:block">
            <Scale className="w-80 h-80 text-gold" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-gold/40 shadow-inner">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Empowering 1.4 Billion Citizens</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-sans tracking-tight">
              Facing an Unresolved Legal Dispute? Get Instant Clarity.
            </h2>

            <p className="text-base text-gray-200 leading-relaxed max-w-2xl font-normal">
              Don’t let legal jargon or fear of expenses stop you from claiming what is rightfully yours. Experience instant AI legal triage under Bharatiya Nyaya Sanhita (BNS 2023).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/triage">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0px 0px 25px rgba(212, 175, 55, 0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-accent to-gold text-judiciary-950 font-bold text-base shadow-gold-glow flex items-center gap-3"
                >
                  <Scale className="w-5 h-5 text-judiciary-950" />
                  <span>Start Legal Triage Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <a
                href="tel:15100"
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 backdrop-blur-md transition-all flex items-center gap-2.5 hover:scale-[1.02]"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call NALSA Free Legal Aid (15100)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default CTASection;
