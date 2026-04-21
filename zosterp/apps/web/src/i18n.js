import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "@zosterp/locales";

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa la instancia a react-i18next
  .init({
    resources,
    fallbackLng: "en", // Idioma por defecto si no detecta nada
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
  });

export default i18n;
