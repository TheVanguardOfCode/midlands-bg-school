import { availableLocales, locales } from "../utils/i18n-util";
import { fetchLocale } from "./fetch-locale";

export const loadLocales = async (): Promise<void> => {
    for (const locale of availableLocales) {
      locales[locale] = await fetchLocale(locale);
    }
  };