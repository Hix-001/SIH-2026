import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Search, Scale, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { STATUTE_KNOWLEDGE_BASE } from '../utils/constants';

export const LegalPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const statutes = Object.values(STATUTE_KNOWLEDGE_BASE);

  const filtered = statutes.filter(item => {
    const matchesSearch = 
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.oldIpcSection && item.oldIpcSection.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'bns') return matchesSearch && item.act.includes('BNS');
    if (selectedCategory === 'it') return matchesSearch && item.act.includes('Information Technology');
    if (selectedCategory === 'consumer') return matchesSearch && item.act.includes('Consumer');
    if (selectedCategory === 'ni') return matchesSearch && item.act.includes('Negotiable');
    return matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>BNS 2023 Acts Directory & IPC Mapping | NyayaSetu</title>
        <meta
          name="description"
          content="Explore codified sections under Bharatiya Nyaya Sanhita (BNS 2023), IT Act 2000, and Consumer Protection Act 2019 with IPC cross-references."
        />
      </Helmet>

      <div className="min-h-screen py-12 bg-gradient-to-b from-[#f8f9fe] to-white dark:from-judiciary-950 dark:to-judiciary-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-judiciary-100 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
              <BookOpen className="w-4 h-4 text-gold" />
              Statutory Knowledge Repository
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-judiciary-900 dark:text-white">
              Bharatiya Nyaya Sanhita (BNS 2023) Directory
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Complete index mapping new criminal enactments (BNS 2023, BNSS 2023, BSA 2023) to their erstwhile Indian Penal Code (IPC) equivalents.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl glass-card border border-gray-200 dark:border-judiciary-800 shadow-md">
            <div className="w-full sm:w-80 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Section, IPC 420, Cheating..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: 'all', label: 'All Statutes' },
                { id: 'bns', label: 'BNS 2023' },
                { id: 'it', label: 'IT Act 2000' },
                { id: 'consumer', label: 'Consumer Law' },
                { id: 'ni', label: 'NI Act 138' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-judiciary-800 text-white dark:bg-gold dark:text-judiciary-950 shadow-sm'
                      : 'bg-white dark:bg-judiciary-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-judiciary-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Statutes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((sec) => (
              <div
                key={sec.id}
                className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-judiciary-800 space-y-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-judiciary-100 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold border border-gold/30">
                      {sec.act}
                    </span>
                    <h3 className="text-lg font-bold text-judiciary-900 dark:text-white mt-1.5">
                      {sec.section}: {sec.title}
                    </h3>
                  </div>

                  {sec.oldIpcSection && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 flex-shrink-0">
                      {sec.oldIpcSection.split('(')[0]}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {sec.description}
                </p>

                {sec.keyElements && (
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-judiciary-950 text-xs space-y-1">
                    <span className="font-bold text-judiciary-800 dark:text-gold block">
                      Legal Ingredients:
                    </span>
                    {sec.keyElements.map((el, i) => (
                      <div key={i} className="text-gray-600 dark:text-gray-400">
                        • {el}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 dark:border-judiciary-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-gray-500 dark:text-gray-400">
                    Punishment: <strong className="text-gray-800 dark:text-gray-200">{sec.punishment}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sec.cognizable ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {sec.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sec.bailable ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {sec.bailable ? 'Bailable' : 'Non-Bailable'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LegalPage;
