import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { BhashiniService } from '../services/bhashini.service';

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translate: (text: string) => Promise<string>;
  t: (key: string, fallback?: string) => string;
  isTranslating: boolean;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('nyayasetu_lang') as LanguageCode) || 'en';
  });
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem('nyayasetu_lang', currentLanguage);
  }, [currentLanguage]);

  const translate = async (text: string): Promise<string> => {
    if (currentLanguage === 'en') return text;
    setIsTranslating(true);
    try {
      const res = await BhashiniService.translateText({
        text,
        sourceLang: 'en',
        targetLang: currentLanguage
      });
      return res.translatedText;
    } finally {
      setIsTranslating(false);
    }
  };

  // Synchronous dictionary translator
  const t = (key: string, fallback?: string): string => {
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage: setCurrentLanguage,
      translate,
      t,
      isTranslating,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
