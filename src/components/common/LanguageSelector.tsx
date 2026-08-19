import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = supportedLanguages.find(l => l.code === currentLanguage) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all ${
          isOpen
            ? 'bg-judiciary-800 text-white border-judiciary-800 shadow-md'
            : 'bg-white/80 dark:bg-judiciary-900/80 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gold'
        }`}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gold" />
        <span className="font-semibold">{selectedLang.nativeName}</span>
        {!compact && (
          <span className="text-xs text-gray-500 dark:text-gray-400">({selectedLang.name})</span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-judiciary-900 border border-gray-200 dark:border-judiciary-800 shadow-2xl z-50 overflow-hidden py-1 max-h-80 overflow-y-auto">
          <div className="px-4 py-2 bg-judiciary-50 dark:bg-judiciary-950/70 border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-judiciary-800 dark:text-gold uppercase tracking-wider">
            Select Language (Bhashini AI)
          </div>
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as LanguageCode);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-judiciary-100 dark:bg-judiciary-800 text-judiciary-900 dark:text-gold font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-judiciary-800/50'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{lang.nativeName}</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {lang.name} • {lang.region}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
