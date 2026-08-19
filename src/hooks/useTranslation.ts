import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useTranslation(sourceText: string) {
  const { currentLanguage, translate } = useLanguage();
  const [translated, setTranslated] = useState(sourceText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (currentLanguage === 'en') {
      setTranslated(sourceText);
      return;
    }

    setLoading(true);
    translate(sourceText)
      .then(res => {
        if (isMounted) setTranslated(res);
      })
      .catch(() => {
        if (isMounted) setTranslated(sourceText);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sourceText, currentLanguage, translate]);

  return { translated, loading, currentLanguage };
}
