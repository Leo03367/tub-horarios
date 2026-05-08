import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  language: localStorage.getItem('language') || 'pt',
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  }
}));

export { useLanguageStore };
