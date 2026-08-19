import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, Award, Code, Cpu, ShieldCheck, Globe, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import LegalDisclaimer from '../components/common/LegalDisclaimer';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About & SIH 2026 Architecture | NyayaSetu</title>
        <meta
          name="description"
          content="Learn about NyayaSetu - Citizen Legal Triage & Automated Rights Navigator built for Smart India Hackathon (SIH 2026)."
        />
      </Helmet>

      <div className="min-h-screen py-12 bg-gradient-to-b from-[#f8f9fe] to-white dark:from-judiciary-950 dark:to-judiciary-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold-dark dark:text-gold text-xs font-bold uppercase tracking-wider border border-gold/40">
              <Award className="w-4 h-4 text-gold" />
              Smart India Hackathon 2026 Prototype
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-judiciary-900 dark:text-white">
              Democratizing Justice for 1.4 Billion Citizens
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              NyayaSetu is an AI-powered Citizen Legal Triage & Automated Rights Navigator designed to transform legal complexity into actionable, rights-focused clarity under the new Bharatiya Nyaya Sanhita (BNS 2023) framework.
            </p>
          </div>

          {/* Problem Statement Card */}
          <div className="glass-card rounded-3xl p-8 border border-gray-200 dark:border-judiciary-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-judiciary-900 dark:text-white">
                The Problem Statement
              </h2>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              When regular citizens encounter everyday legal problems—such as unlawful landlord security deposit retention, online UPI phishing scams, or e-commerce refund denials—they rarely know their exact legal standing or the applicable sections under new frameworks like the Bharatiya Nyaya Sanhita (BNS) and the IT Act. Searching online often leads to complex legal jargon, outdated information, or unreliable advice, leaving individuals confused about what steps to take.
            </p>
          </div>

          {/* Solution Architecture */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-judiciary-900 dark:text-white text-center">
              System Architecture & Technical Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-6 border border-gray-200 dark:border-judiciary-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-judiciary-900 dark:text-white">Frontend Layer</h3>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                  <li>• React 18 + TypeScript + Vite</li>
                  <li>• Tailwind CSS + Vanilla Design System</li>
                  <li>• Framer Motion fluid animations</li>
                  <li>• Web Speech API (Indic audio input)</li>
                  <li>• jsPDF automated notice generation</li>
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-gray-200 dark:border-judiciary-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-judiciary-900 dark:text-white">Privacy & PII Layer</h3>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                  <li>• Zero-Knowledge client-side scrubbing</li>
                  <li>• Aadhaar, PAN & Mobile regex matching</li>
                  <li>• UPI ID & Bank Account masking</li>
                  <li>• In-browser OCR document extraction</li>
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-gray-200 dark:border-judiciary-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-judiciary-900 dark:text-white">Backend & AI Pipeline</h3>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                  <li>• Python 3.11+ FastAPI backend architecture</li>
                  <li>• Bhashini Indic translation pipeline</li>
                  <li>• BNS 2023 & IPC Knowledge Graph</li>
                  <li>• Dockerized microservices blueprint</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <LegalDisclaimer />
        </div>
      </div>
    </>
  );
};
export default AboutPage;
