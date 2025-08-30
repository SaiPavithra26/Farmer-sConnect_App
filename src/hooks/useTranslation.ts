import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { translations } from '@/src/locales';

export function useTranslation() {
  const language = useSelector((state: RootState) => state.app.language);

  const t = (key: string, params?: Record<string, string | number>): string => {
  const keys = key.split('.');
  let value: any = translations[language as keyof typeof translations] || translations.en;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  let result = value;

  if (params) {
    Object.entries(params).forEach(([param, val]) => {
      result = result.replace(`{{${param}}}`, val.toString());
    });
  }

  return result;
};

  const getCurrentLanguage = () => language;

  const isRTL = () => {
    // Add RTL language codes here if needed
    const rtlLanguages = ['ar', 'he', 'fa'];
    return rtlLanguages.includes(language);
  };

  return {
    t,
    getCurrentLanguage,
    isRTL,
    language,
  };
}

export default useTranslation;