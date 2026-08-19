import React from 'react';
import { Mic, ShieldCheck, Scale, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Describe or Speak Dispute',
      description: 'Input your issue in plain words in English, Hindi, or 20+ regional Indic languages via text, voice, or evidence upload.',
      icon: Mic
    },
    {
      number: '02',
      title: 'Client-Side PII Scrubbing',
      description: 'Sensitive personal data including Aadhaar, phone numbers, and bank details are scrubbed locally in your browser before analysis.',
      icon: ShieldCheck
    },
    {
      number: '03',
      title: 'AI Statutory Mapping',
      description: 'The engine queries Bharatiya Nyaya Sanhita 2023, IT Act, and Consumer Protection Act, checking statutory limitation periods.',
      icon: Scale
    },
    {
      number: '04',
      title: 'Notice & Action Plan',
      description: 'Receive step-by-step resolution steps, appropriate authority links, and a pre-drafted formal legal notice ready to download as PDF.',
      icon: FileText
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-judiciary-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-judiciary-800 dark:text-gold px-3 py-1 bg-judiciary-50 dark:bg-judiciary-900 rounded-full border border-judiciary-200 dark:border-judiciary-800">
            Citizen Journey Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiciary-900 dark:text-white mt-3">
            How NyayaSetu Navigates Your Rights
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            A 4-step transparent, privacy-first process from dispute description to legal notice generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-judiciary-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-gray-200 dark:text-judiciary-800 font-mono">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-judiciary-50 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold flex items-center justify-center border border-gold/30">
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-judiciary-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
