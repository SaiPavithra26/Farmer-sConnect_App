import en from './en.json';
import hi from './hi.json';
import te from './te.json';
import ta from './ta.json';

export const translations = {
  en,
  hi,
  te,
  ta,
};

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

export const getLanguageName = (code: string): string => {
  const language = supportedLanguages.find(lang => lang.code === code);
  return language?.name || 'English';
};

export const getNativeLanguageName = (code: string): string => {
  const language = supportedLanguages.find(lang => lang.code === code);
  return language?.nativeName || 'English';
};

export default translations;