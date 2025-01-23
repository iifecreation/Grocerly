import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import enTranslation from './locales/en/translation.json';
import chTranslation from './locales/ch/translation.json';

i18n
  .use(getLocales)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ch'],
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: chTranslation,
      },
    },
  });
