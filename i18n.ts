import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import chTranslation from './locales/ch/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ch: {
        translation: chTranslation,
      },
    },
    lng: 'ch',
    fallbackLng: 'ch',
    supportedLngs: ['en', 'ch'],
    interpolation: {
      escapeValue: false,
    },
    cleanCode: true,
    ns: ['translation'],
    defaultNS: 'translation',
    compatibilityJSON: 'v4',
  })
  .then();

export default i18n;
