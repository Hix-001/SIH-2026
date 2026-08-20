import React from 'react';
import { Mic, ShieldCheck, Scale, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Describe or Speak Dispute',
      description: 'Input your issue in plain words in English, Hindi, or 20+ regional Indic languages via text, voice, or evidence upload.',
      icon: Mic,
      color: 'from-amber-500 to-red-500'
    },
    {
      number: '02',
      title: 'Client-Side PII Scrubbing',
      description: 'Sensitive personal data including Aadhaar, phone numbers, and bank details are scrubbed locally in your browser before analysis.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      number: '03',
      title: 'AI Statutory Mapping',
      description: 'The engine queries Bharatiya Nyaya Sanhita 2023, IT Act, and Consumer Protection Act, checking statutory limitation periods.',
      icon: Scale,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      number: '04',
      title: 'Notice & Action Plan',
      description: 'Receive step-by-step resolution steps, appropriate authority links, and a pre-drafted formal legal notice ready to download as PDF.',
      icon: FileText,
      color: 'from-gold to-accent'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#05081c] via-[#080e32] to-[#060a24] text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-judiciary-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-18"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold px-3.5 py-1.5 bg-judiciary-900/80 rounded-full border border-gold/35 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Citizen Journey Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            How NyayaSetu Navigates Your Rights
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            A 4-step transparent, privacy-first pipeline from dispute description to instant legal notice drafting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-7 rounded-3xl bg-[#0d1442]/80 backdrop-blur-xl border border-gold/25 hover:border-gold/60 shadow-xl hover:shadow-2xl hover:shadow-gold/10 relative flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-gray-400/40 group-hover:text-gold font-mono transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-judiciary-900 text-gold flex items-center justify-center border border-gold/40 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-500/40 z-20 pointer-events-none">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
