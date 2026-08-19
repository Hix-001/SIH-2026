import React from 'react';
import { Landmark, ExternalLink, PhoneCall, BookOpen, ShieldCheck, MapPin, Scale, ArrowUpRight } from 'lucide-react';
import { LegalAuthorityContact, PrecedentSummary } from '../../types/legal.types';
import { OFFICIAL_HELPLINES } from '../../utils/constants';

interface ResourcesProps {
  authorities: LegalAuthorityContact[];
  precedents: PrecedentSummary[];
}

export const Resources: React.FC<ResourcesProps> = ({ authorities, precedents }) => {
  return (
    <div className="space-y-8">
      {/* 1. Official Nodal Authorities */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-judiciary-900 dark:text-white flex items-center gap-2">
            <Landmark className="w-5 h-5 text-gold" />
            Competent Authorities & Redressal Portals
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Official government bodies having statutory jurisdiction over this dispute
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorities.map((auth, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 border border-gray-200 dark:border-judiciary-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-judiciary-100 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold uppercase">
                    {auth.type.replace('_', ' ')}
                  </span>
                  {auth.phone && (
                    <a
                      href={`tel:${auth.phone}`}
                      className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{auth.phone}</span>
                    </a>
                  )}
                </div>

                <h3 className="text-sm font-bold text-judiciary-900 dark:text-white">
                  {auth.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {auth.description}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-gray-50 dark:bg-judiciary-950 text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-judiciary-800 dark:text-gold">Filing Protocol: </span>
                  {auth.procedure}
                </div>
              </div>

              {auth.portalUrl && (
                <div className="pt-2 border-t border-gray-100 dark:border-judiciary-800">
                  <a
                    href={auth.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-judiciary-800 dark:text-gold flex items-center justify-between group hover:underline"
                  >
                    <span>Visit Official Grievance Portal</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Key Judicial Precedents & High Court Citations */}
      {precedents && precedents.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-judiciary-800">
          <div>
            <h2 className="text-xl font-extrabold text-judiciary-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Judicial Precedents & Supreme / High Court Case Laws
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Binding legal principles (Ratio Decidendi) supporting your legal standing
            </p>
          </div>

          <div className="space-y-3">
            {precedents.map((prec, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-gray-200 dark:border-judiciary-800 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-judiciary-900 dark:text-white">
                    {prec.caseTitle}
                  </h3>
                  <span className="text-xs font-mono font-bold text-gold px-2 py-0.5 rounded bg-judiciary-900">
                    {prec.citation} ({prec.year})
                  </span>
                </div>

                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Bench: {prec.court}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-serif pt-1">
                  <strong>Key Holding:</strong> "{prec.keyTakeaway}"
                </p>

                <div className="p-3 rounded-xl bg-judiciary-50/70 dark:bg-judiciary-950/70 border border-judiciary-100 dark:border-judiciary-800 text-xs text-gray-600 dark:text-gray-300 italic">
                  <strong>Legal Principle:</strong> {prec.ratioDecidendi}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Constitutional Free Legal Aid Banner (NALSA) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-judiciary-900 to-judiciary-950 border border-gold/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Article 39A Constitution of India
          </div>
          <h3 className="text-lg font-bold text-white">
            Need an Empanelled Advocate for Court Representation?
          </h3>
          <p className="text-xs text-gray-300 max-w-xl">
            Eligible citizens (Women, SC/ST, low-income groups, and senior citizens) are entitled to 100% free legal defense counsel via the National Legal Services Authority (NALSA).
          </p>
        </div>

        <a
          href="https://nalsa.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-gold text-judiciary-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-105 transition-all flex-shrink-0"
        >
          <span>Apply on NALSA Portal</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
export default Resources;
