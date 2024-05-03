import React from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { enJSON } from '/@/locales/en'
import { deJSON } from '/@/locales/de'
import { Router } from '/@/router'

import '/@/styles/global.css'

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    de: { ...deJSON },
  },
  lng: 'en', // Set the initial language of the App
})

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  )
}
