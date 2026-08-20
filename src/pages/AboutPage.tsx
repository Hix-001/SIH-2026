import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  Award,
  Code,
  Cpu,
  ShieldCheck,
  Globe,
  Database,
  Sparkles,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Zap,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import LegalDisclaimer from '../components/common/LegalDisclaimer';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'cloud' | 'tech'>('pipeline');

  const pipelineStages = [
    {
      id: 'step1',
      number: '01',
      title: 'Citizen Input & Audio',
      tech: 'Web Speech API / Bhashini',
      desc: 'Citizen inputs grievance via voice, text, or document in English, Hindi, or 20+ Indic languages.',
      icon: Globe,
      color: 'border-amber-500/40 bg-amber-500/10 text-gold'
    },
    {
      id: 'step2',
      number: '02',
      title: 'Zero-Knowledge PII Scrub',
      tech: 'Client-Side Regex / Entropy',
      desc: 'Aadhaar (12-digit), PAN, Phone, UPI IDs, and Bank numbers are sanitized in the browser memory before transit.',
      icon: ShieldCheck,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
    },
    {
      id: 'step3',
      number: '03',
      title: 'Frontend Edge Delivery',
      tech: 'Vercel Edge Global CDN',
      desc: 'Serves React 18 + TypeScript SPA with sub-50ms latency across India via custom domain nyayasetu.harshjha.me.',
      icon: Cloud,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-400'
    },
    {
      id: 'step4',
      number: '04',
      title: 'Dual-Engine Intelligence',
      tech: 'Google Gemini 2.0 + Local BNS Engine',
      desc: 'Maps disputes to BNS 2023, IT Act, and CPA sections with fallback deterministic rule engine for 100% uptime.',
      icon: Cpu,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-400'
    },
    {
      id: 'step5',
      number: '05',
      title: 'Backend API Microservice',
      tech: 'Render Docker + Python 3.11 FastAPI',
      desc: 'Microservice hosting REST endpoints (/api/triage, /api/bns, /api/health) with high concurrency.',
      icon: Server,
      color: 'border-teal-500/40 bg-teal-500/10 text-teal-400'
    },
    {
      id: 'step6',
      number: '06',
      title: 'Persistent Storage & RLS',
      tech: 'Supabase PostgreSQL',
      desc: 'Encrypted audit logging and statutory knowledge indices enforced with strict Row-Level Security policies.',
      icon: Database,
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
    },
    {
      id: 'step7',
      number: '07',
      title: 'Court Notice & PDF Engine',
      tech: 'Pure Client jsPDF Vectorizer',
      desc: 'Renders formal 15-day statutory demand notices with advocate stamps directly in browser without server upload.',
      icon: FileText,
      color: 'border-gold/50 bg-gold/10 text-gold'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Live System Architecture & SIH 2026 | NyayaSetu</title>
        <meta
          name="description"
          content="Explore the live system architecture, cloud deployment blueprints (Vercel, Render, Supabase), and tech stack powering NyayaSetu."
        />
      </Helmet>

      <div className="min-h-screen py-16 bg-gradient-to-b from-[#060a24] via-[#080d32] to-[#060a24] text-white transition-colors relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-judiciary-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16 relative z-10">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-judiciary-900/90 text-gold text-xs font-bold uppercase tracking-wider border border-gold/40 shadow-sm shadow-gold/10">
              <Award className="w-4 h-4 text-gold" />
              <span>Smart India Hackathon 2026 • Live Technical Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight leading-tight">
              NyayaSetu System Blueprint & Cloud Architecture
            </h1>
            <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A high-availability, privacy-first legal technology platform fulfilling <strong>Article 39A of the Constitution of India</strong> (Equal Justice & Free Legal Aid).
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0d1442]/80 backdrop-blur-xl border border-gold/30 shadow-xl">
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'pipeline'
                    ? 'bg-gradient-to-r from-judiciary-800 to-judiciary-700 text-gold border border-gold/40 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-judiciary-900/50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>End-to-End Pipeline Flow</span>
              </button>

              <button
                onClick={() => setActiveTab('cloud')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'cloud'
                    ? 'bg-gradient-to-r from-judiciary-800 to-judiciary-700 text-gold border border-gold/40 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-judiciary-900/50'
                }`}
              >
                <Cloud className="w-4 h-4" />
                <span>Vercel • Render • Supabase</span>
              </button>

              <button
                onClick={() => setActiveTab('tech')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'tech'
                    ? 'bg-gradient-to-r from-judiciary-800 to-judiciary-700 text-gold border border-gold/40 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-judiciary-900/50'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Languages & Frameworks Matrix</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Visual Pipeline Flow */}
          {activeTab === 'pipeline' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white">
                  7-Stage End-to-End Data & Reasoning Flow
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  How natural language grievances flow through zero-knowledge security, edge delivery, legal AI, and client-side document export.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pipelineStages.map((stage, idx) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="p-6 rounded-3xl bg-[#0a1033]/80 backdrop-blur-xl border border-judiciary-800 hover:border-gold/50 shadow-xl hover:shadow-2xl hover:shadow-gold/10 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-extrabold text-gray-500/40 group-hover:text-gold font-mono transition-colors">
                          {stage.number}
                        </span>
                        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${stage.color} group-hover:scale-110 transition-transform shadow-md`}>
                          <stage.icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-gold transition-colors">
                        {stage.title}
                      </h3>
                      <div className="inline-block px-2 py-0.5 rounded-md bg-judiciary-950 text-[11px] font-mono text-gold border border-gold/20 mb-3">
                        {stage.tech}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Cloud Infrastructure (Vercel, Render, Supabase) */}
          {activeTab === 'cloud' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white">
                  Multi-Cloud Infrastructure Ecosystem
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  High-availability cloud topology leveraging edge CDNs, containerized microservices, and row-secured databases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Vercel Card */}
                <div className="p-8 rounded-3xl bg-[#0a1033]/90 backdrop-blur-xl border border-blue-500/40 hover:border-blue-400 shadow-xl space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Cloud className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Frontend Edge
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      Vercel Edge Global CDN
                    </h3>
                    <p className="text-xs font-mono text-gold mt-1 break-all">
                      https://nyayasetu.harshjha.me/
                    </p>
                    <ul className="text-xs text-gray-300 space-y-2 mt-4 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>Sub-50ms latency across Indian edge regions (BOM1 / DEL1).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>Automated CI/CD deployment pipeline synced with GitHub <code>main</code> branch.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>Brotli compression, HTTP/3, and automatic TLS 1.3 encryption.</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://nyayasetu.harshjha.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold border border-blue-500/40 transition-colors"
                  >
                    <span>View Live Edge Domain</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Render Card */}
                <div className="p-8 rounded-3xl bg-[#0a1033]/90 backdrop-blur-xl border border-teal-500/40 hover:border-teal-400 shadow-xl space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        <Server className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        Backend Docker
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      Render Cloud Microservice
                    </h3>
                    <p className="text-xs font-mono text-gold mt-1 break-all">
                      https://nyayasetu-api.onrender.com
                    </p>
                    <ul className="text-xs text-gray-300 space-y-2 mt-4 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>Containerized Python 3.11+ FastAPI runtime on Linux Docker.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>Uvicorn ASGI server with Pydantic v2 data validation schemas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>CORS security headers, automated health monitoring (/api/health).</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="https://nyayasetu-api.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 text-xs font-bold border border-teal-500/40 transition-colors"
                  >
                    <span>Inspect Backend API</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 3. Supabase Card */}
                <div className="p-8 rounded-3xl bg-[#0a1033]/90 backdrop-blur-xl border border-emerald-500/40 hover:border-emerald-400 shadow-xl space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Database className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        PostgreSQL DB
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      Supabase Managed Database
                    </h3>
                    <p className="text-xs font-mono text-gold mt-1 break-all">
                      PostgreSQL Engine (RLS Active)
                    </p>
                    <ul className="text-xs text-gray-300 space-y-2 mt-4 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Enforces strict Row-Level Security (RLS) policies for complete privacy.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Relational tables for BNS 2023 codified statutes vs legacy IPC index.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Anonymous dispute telemetry and aggregate analytics.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="py-2.5 px-3 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/30 text-center">
                    🔒 Zero PII Ingestion Guarantee
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Tech Stack & Languages Matrix */}
          {activeTab === 'tech' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white">
                  Programming Languages & Frameworks Matrix
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Full stack breakdown of programming paradigms and libraries implemented in NyayaSetu.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-judiciary-800 bg-[#0a1033]/80 backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-judiciary-950/90 text-gray-400 text-xs uppercase tracking-wider border-b border-judiciary-800">
                    <tr>
                      <th className="py-4 px-5 font-bold">Technology / Language</th>
                      <th className="py-4 px-5 font-bold">Stack Layer</th>
                      <th className="py-4 px-5 font-bold">Key Architectural Responsibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-judiciary-800/60 text-xs sm:text-sm">
                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                        TypeScript / React 18
                      </td>
                      <td className="py-4 px-5 text-gray-300">Frontend SPA & Logic</td>
                      <td className="py-4 px-5 text-gray-300">Type-safe components, state management, PII regex redactor, and offline statutory fallback engine.</td>
                    </tr>

                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                        Python 3.11+ / FastAPI
                      </td>
                      <td className="py-4 px-5 text-gray-300">Backend Microservice</td>
                      <td className="py-4 px-5 text-gray-300">High-performance ASGI server, Pydantic v2 data validation schemas, and legal citation endpoints.</td>
                    </tr>

                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        PostgreSQL / SQL
                      </td>
                      <td className="py-4 px-5 text-gray-300">Database Layer</td>
                      <td className="py-4 px-5 text-gray-300">Relational schemas, indexed queries, and Row-Level Security policies inside Supabase.</td>
                    </tr>

                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        TailwindCSS / CSS3
                      </td>
                      <td className="py-4 px-5 text-gray-300">Design System</td>
                      <td className="py-4 px-5 text-gray-300">Translucent glassmorphism, judiciary dark theme tokens (`#060a24` & Gold), and responsive layout rules.</td>
                    </tr>

                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        Google Gemini 2.0 Flash
                      </td>
                      <td className="py-4 px-5 text-gray-300">AI Legal Reasoning</td>
                      <td className="py-4 px-5 text-gray-300">Multi-turn structured legal triage, BNS 2023 classification, and procedural limitation computation.</td>
                    </tr>

                    <tr className="hover:bg-judiciary-900/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-gold font-mono flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        jsPDF & html2canvas
                      </td>
                      <td className="py-4 px-5 text-gray-300">Document Generation</td>
                      <td className="py-4 px-5 text-gray-300">Pure client-side vectorized PDF compilation for formal 15-day statutory demand notices with wax stamps.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Legal Disclaimer */}
          <LegalDisclaimer />
        </div>
      </div>
    </>
  );
};
export default AboutPage;
