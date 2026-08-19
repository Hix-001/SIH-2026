import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lock, EyeOff, ServerOff, CheckCircle2, FileCheck } from 'lucide-react';
import LegalDisclaimer from '../components/common/LegalDisclaimer';

export const PrivacyPage: React.FC = () => {
  const privacyPillars = [
    {
      title: 'Zero-Knowledge Client-Side Scrubbing',
      description: 'Your dispute text is processed locally inside your web browser. Sensitive identifiers such as Aadhaar (12-digit numbers), PAN cards, mobile phone numbers, UPI handles, and bank account numbers are scrubbed prior to any network activity.',
      icon: ShieldCheck
    },
    {
      title: 'Zero Data Retention Policy',
      description: 'NyayaSetu does not maintain any persistent server databases of citizen dispute texts, names, or uploaded documents. Once you leave the triage session, your session memory is completely cleared.',
      icon: ServerOff
    },
    {
      title: 'Digital Personal Data Protection (DPDP) Act, 2023 Alignment',
      description: 'Built to conform to the highest Indian digital privacy regulations under the DPDP Act 2023, minimizing personal data collection to absolute zero while delivering maximum legal utility.',
      icon: Lock
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Guarantee & PII Policy | NyayaSetu</title>
        <meta
          name="description"
          content="NyayaSetu Zero-Knowledge PII Redaction and data privacy guarantees for Indian citizens."
        />
      </Helmet>

      <div className="min-h-screen py-12 bg-gradient-to-b from-[#f8f9fe] to-white dark:from-judiciary-950 dark:to-judiciary-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              100% Confidential & Secure
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-judiciary-900 dark:text-white">
              Citizen Privacy & PII Protection Guarantee
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              How NyayaSetu protects your sensitive identity when seeking automated legal rights triage.
            </p>
          </div>

          <div className="space-y-6">
            {privacyPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-judiciary-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-judiciary-900 dark:text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-13">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Redacted Patterns Table */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-judiciary-800 space-y-4">
            <h3 className="text-base font-bold text-judiciary-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gold" />
              Standard PII Entity Redaction Rules
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-judiciary-800 text-gray-500 dark:text-gray-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Identifier Type</th>
                    <th className="py-2.5 px-3">Example Input</th>
                    <th className="py-2.5 px-3">Scrubbed Output</th>
                    <th className="py-2.5 px-3">Protection Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-judiciary-800/60 text-gray-700 dark:text-gray-300 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-judiciary-900 dark:text-white">Aadhaar Card</td>
                    <td className="py-2.5 px-3 text-red-500">4532 9876 1234</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">[AADHAAR: XXXX-XXXX-1234]</td>
                    <td className="py-2.5 px-3">Client-Side Masking</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-judiciary-900 dark:text-white">PAN Number</td>
                    <td className="py-2.5 px-3 text-red-500">ABCDE1234F</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">[PAN: ABC****F]</td>
                    <td className="py-2.5 px-3">Client-Side Masking</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-judiciary-900 dark:text-white">Mobile Phone</td>
                    <td className="py-2.5 px-3 text-red-500">+91 9876543210</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">[PHONE: +91 98****3210]</td>
                    <td className="py-2.5 px-3">Client-Side Masking</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-judiciary-900 dark:text-white">UPI Virtual Handle</td>
                    <td className="py-2.5 px-3 text-red-500">rahul@okhdfcbank</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">[UPI: ra***@okhdfcbank]</td>
                    <td className="py-2.5 px-3">Client-Side Masking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <LegalDisclaimer />
        </div>
      </div>
    </>
  );
};
export default PrivacyPage;
