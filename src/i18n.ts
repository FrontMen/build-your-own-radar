import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import englishTranslation from 'local/en.json';
import dutchTranslation from 'local/nl.json';

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      radar: englishTranslation,
    },
    nl: {
      radar: dutchTranslation,
    },
  },
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['radar'],
  defaultNS: 'radar',

  interpolation: {
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
