import { availableLocales } from "../utils/i18n-util.js";
export const isValidLocale = (lang) => {
    return lang !== null && availableLocales.includes(lang);
};
