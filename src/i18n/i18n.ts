import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/local-storage-util.js";
import {
  locales,
  dataI18n,
  langString,
  availableLocales,
  defaultLanguage,
} from "../utils/i18n-util";
import { AvailableLocales } from "../model/AvailableLocales.types";
import {NavigatorExtend} from "../model/NavigatorExtend.types"

const fetchLocale = async (
  locale: string
): Promise<{ [key: string]: string }> => {
  try {
    const response = await fetch(`../../src/locales/${locale}.json`);
    const responseContentType = response.headers
      .get("Content-Type")
      ?.split(";")[0];

    if (responseContentType !== "application/json") {
      throw new Error(`Error! Status: ${locale}.json doesn't exist`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const loadLocales = async (): Promise<void> => {
  for (const locale of availableLocales) {
    locales[locale] = await fetchLocale(locale);
  }
};

const updateQueryString = (lang: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(langString, lang);
  window.history.pushState(null, "", url.toString());
};

const isValidLocale = (lang: string | null): lang is AvailableLocales => {
  return lang !== null && availableLocales.includes(lang as AvailableLocales);
};

const detectLanguage = (): AvailableLocales => {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get("lang");
  const langFromLocalStorage = getLocalStorageData("lang");
  const langFromSettings = (
    navigator.language || (navigator as NavigatorExtend).userLanguage
  ).slice(0, 2) as string;

  if (isValidLocale(langFromUrl)) {
    return langFromUrl;
  } else if (isValidLocale(langFromLocalStorage)) {
    return langFromLocalStorage;
  } else if (isValidLocale(langFromSettings)) {
    return langFromSettings;
  } else {
    return defaultLanguage;
  }
};

const getNestedProperty = (obj: any, key: string): string | null => {
  return key
    .split(".")
    .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
};

const updatePageLanguage = (lang: string): void => {
  const pageLanguage = lang;
  const elements = document.querySelectorAll(
    `[${dataI18n}]`
  ) as NodeListOf<HTMLElement>;

  try {
    const json = locales[pageLanguage];

    elements.forEach((element) => {
      const key = element.getAttribute(dataI18n);
      if (!key) return;

      let text = getNestedProperty(json, key);
      if (!text) return;

      const variables = text.match(/{(.*?)}/g);
      if (variables) {
        variables.forEach((variable) => {
          const datasetEntries = Object.keys(element.dataset).map(
            (key) => [key, element.dataset[key]!] as [string, string]
          );
          datasetEntries.forEach(([dataKey, value]) => {
            if (`{${dataKey}}` === variable) {
              try {
                text = text!.replace(
                  variable,
                  new Function(`return (${value})`)()
                );
              } catch (error) {
                text = text!.replace(variable, value);
              }
            }
          });
        });
      }

      element.innerHTML = text;
    });

    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("lang", pageLanguage);
    }
  } catch (error) {
    console.error(`Error updating page language to ${lang}:`, error);
  }
};

const init = async (): Promise<void> => {
  await loadLocales();
  const language = detectLanguage();
  updatePageLanguage(language);

  document.querySelectorAll(".change-language").forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      const newLanguage = target.getAttribute("data-language");

      if (isValidLocale(newLanguage)) {
        setLocalStorageData(langString, newLanguage);
        updateQueryString(newLanguage);
        updatePageLanguage(newLanguage);
      }
    });
  });
};

// Initialize the application
init();
