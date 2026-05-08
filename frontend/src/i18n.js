import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptMessages from './locales/pt.json';
import enMessages from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: ptMessages },
    en: { translation: enMessages }
  },
  lng: localStorage.getItem('language') || 'pt',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
