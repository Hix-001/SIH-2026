import React from 'react';
import { ShieldCheck, Info, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export const LegalDisclaimer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 rounded-2xl p-6 shadow-sm my-6 backdrop-blur-md"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/60 rounded-xl text-amber-700 dark:text-amber-300 flex-shrink-0">
          <Scale className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-base font-bold text-amber-900 dark:text-amber-200">
              Official Statutory & AI Legal Advisory Notice
            </h4>
            <span className="text-xs px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-semibold rounded-md">
              SIH 2026 Smart Automation
            </span>
          </div>
          <div className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300/90 space-y-1.5 leading-relaxed">
            <p>
              • <strong>Informational & Triage Guidance:</strong> This platform is designed under Smart Automation to provide preliminary rights triage, statutory clause mapping (Bharatiya Nyaya Sanhita 2023, IT Act 2000, CPA 2019), and procedural checklists.
            </p>
            <p>
              • <strong>Not a Substitute for Enrolled Legal Counsel:</strong> This AI navigator does not create an advocate-client relationship. For formal court litigation or dispute representation, citizens are advised to consult an enrolled advocate or reach out to <strong>NALSA Free Legal Aid at 15100</strong>.
            </p>
            <p>
              • <strong>Zero-Log PII Redaction:</strong> All queries, phone numbers, and identity markers are scrubbed client-side before any automated processing.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default LegalDisclaimer;
