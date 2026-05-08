import { useLanguageStore } from '../stores/languageStore';
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return { t, language, changeLanguage };
};
