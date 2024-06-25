import { langString } from "../utils/i18n-util.js";

export const updateQueryString = (lang: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set(langString, lang);
    window.history.pushState(null, "", url.toString());
  };