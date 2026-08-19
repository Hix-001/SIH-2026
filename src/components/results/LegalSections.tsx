import React, { useState } from 'react';
import { Scale, BookOpen, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { LegalSectionItem } from '../../types/legal.types';

interface LegalSectionsProps {
  sections: LegalSectionItem[];
}

export const LegalSections: React.FC<LegalSectionsProps> = ({ sections }) => {
  const [expandedId, setExpandedId] = useState<string | null>(sections[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-judiciary-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-gold" />
            Applicable Sections & Legal Provisions
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Cross-referenced with Bharatiya Nyaya Sanhita (BNS 2023) and Special Enactments
          </p>
        </div>
        <span className="text-xs font-bold text-judiciary-800 dark:text-gold px-2.5 py-1 rounded-full bg-judiciary-100 dark:bg-judiciary-900">
          {sections.length} Relevant Statutes Found
        </span>
      </div>

      <div className="space-y-4">
        {sections.map((sec) => {
          const isExpanded = expandedId === sec.id;
          const matchPercent = Math.round(sec.relevanceScore * 100);

          return (
            <div
              key={sec.id}
              className={`glass-card rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-gold shadow-lg dark:border-gold/60'
                  : 'border-gray-200 dark:border-judiciary-800 hover:border-gray-300 dark:hover:border-judiciary-700'
              }`}
            >
              {/* Header Row */}
              <div
                onClick={() => toggleExpand(sec.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-judiciary-800 text-white dark:bg-judiciary-800 dark:text-gold">
                      {sec.act}
                    </span>

                    {sec.oldIpcSection && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                        {sec.oldIpcSection}
                      </span>
                    )}

                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {matchPercent}% Relevance Match
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-judiciary-900 dark:text-white">
                    {sec.section}: {sec.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      sec.cognizable ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    }`}>
                      {sec.cognizable ? 'Cognizable (Police Arrest)' : 'Non-Cognizable'}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      sec.bailable ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                    }`}>
                      {sec.bailable ? 'Bailable' : 'Non-Bailable'}
                    </span>
                  </div>

                  <div className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-judiciary-800">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-gray-100 dark:border-judiciary-800 space-y-4 bg-gray-50/40 dark:bg-judiciary-950/40">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                      Statutory Definition & Provision
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-sans">
                      {sec.description}
                    </p>
                  </div>

                  {/* Key Legal Ingredients Required to Prove */}
                  {sec.keyElements && sec.keyElements.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-judiciary-800 dark:text-gold mb-2">
                        Essential Ingredients to Establish in Court / Notice:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                        {sec.keyElements.map((el, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0"></span>
                            <span>{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Statutory Punishment */}
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900 dark:text-amber-200">
                      Prescribed Statutory Punishment:
                    </span>
                    <span className="font-extrabold text-amber-800 dark:text-gold">
                      {sec.punishment}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LegalSections;
