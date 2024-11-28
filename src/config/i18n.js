import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translate/en/global.json";
import es from "../translate/es/global.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: window.location.pathname.substring(1, 2) === "es" ? "es" : "en", // language to use
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
});

export default i18next;
