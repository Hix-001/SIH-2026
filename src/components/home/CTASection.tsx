import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-judiciary-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 sm:p-14 text-white shadow-2xl border border-gold/30">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-gold/30">
              <ShieldCheck className="w-4 h-4" />
              Empowering 1.4 Billion Citizens
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-sans">
              Facing an Unresolved Legal Dispute? Get Instant Clarity.
            </h2>

            <p className="text-base text-gray-200 leading-relaxed max-w-2xl">
              Don’t let legal jargon or fear of expenses stop you from claiming what is rightfully yours. Experience instant AI legal triage under Bharatiya Nyaya Sanhita (BNS 2023).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/triage">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-accent to-gold text-judiciary-950 font-bold text-base shadow-gold-glow flex items-center gap-3"
                >
                  <Scale className="w-5 h-5 text-judiciary-950" />
                  <span>Start Legal Triage Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <a
                href="tel:15100"
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 backdrop-blur-md transition-all flex items-center gap-2.5"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call NALSA Free Legal Aid (15100)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
