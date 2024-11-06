import { AvailableLocales } from "../model/available-locales.types";
import { availableLocales } from "../utils/i18n-util";

export const isValidLocale = (
    lang: string | null
): lang is AvailableLocales => {
    return lang !== null && availableLocales.includes(lang as AvailableLocales);
};
