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
        className={`h-11 flex items-center gap-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all shadow-sm ${
          isOpen
            ? 'bg-judiciary-800 text-white border-gold/60 shadow-gold/10'
            : 'bg-judiciary-900/90 border-judiciary-700/80 text-gray-200 hover:border-gold/50 hover:bg-judiciary-800/80'
        }`}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gold shrink-0" />
        <span className="font-semibold">{selectedLang.nativeName}</span>
        {!compact && (
          <span className="text-xs text-gray-400 font-normal">({selectedLang.name})</span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-gold' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-judiciary-900 border border-judiciary-700 shadow-2xl z-50 overflow-hidden py-1 max-h-80 overflow-y-auto">
          <div className="px-4 py-2.5 bg-judiciary-950 border-b border-judiciary-800 text-[11px] font-bold text-gold uppercase tracking-wider">
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
                    ? 'bg-judiciary-800 text-gold font-bold'
                    : 'text-gray-300 hover:bg-judiciary-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-400">({lang.name})</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
