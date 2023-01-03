import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import kr from './kr.json'

export const resources = {
  en: {
    translation: en
  },
  kr: {
    translation: kr
  }
}

i18n.use(initReactI18next).init({
  // eslint-disable-next-line no-undef
  lng: localStorage.getItem('pref-lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources
})

export default i18n
