import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/local-storage-util.js";
import {
  locales,
  dataI18n,
  langString,
  defaultLanguage,
} from "../utils/i18n-util.js";
import { loadLocales } from "./load-locales.js";
import { updateQueryString } from "./update-query-string.js";
import { isValidLocale } from "./is-valid-locale.js";
const detectLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get(langString);
  const langFromLocalStorage = getLocalStorageData(langString);
  const langFromSettings = (navigator.language || navigator.userLanguage).slice(
    0,
    2,
  );
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
const getNestedProperty = (obj, key) => {
  return key
    .split(".")
    .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
};
const updatePageLanguage = (lang) => {
  const pageLanguage = lang;
  const elements = document.querySelectorAll(`[${dataI18n}]`);
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
          const datasetEntries = Object.keys(element.dataset).map((key) => [
            key,
            element.dataset[key],
          ]);
          datasetEntries.forEach(([dataKey, value]) => {
            if (`{${dataKey}}` === variable) {
              try {
                text = text.replace(
                  variable,
                  new Function(`return (${value})`)(),
                );
              } catch (error) {
                text = text.replace(variable, value);
              }
            }
          });
        });
      }
      element.innerHTML = text;
    });
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute(langString, pageLanguage);
    }
  } catch (error) {
    console.error(`Error updating page language to ${lang}:`, error);
  }
};
export const initI18n = async () => {
  await loadLocales();
  const language = detectLanguage();
  updatePageLanguage(language);
  const currentLangIcon = document.getElementById("selectedLang");
  currentLangIcon.className = "";
  currentLangIcon.classList.add(language);
  const currentLangLink = document.querySelectorAll(
    `.language-link.${language}`,
  )[0];
  currentLangLink.classList.add("active");
  document.querySelectorAll(".language-link").forEach((languageLink) => {
    languageLink.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      const newLanguage = target.getAttribute("data-language");
      currentLangIcon.className = "";
      if (typeof newLanguage === "string") {
        currentLangIcon.classList.add(newLanguage);
      }
      if (isValidLocale(newLanguage)) {
        setLocalStorageData(langString, newLanguage);
        updateQueryString(newLanguage);
        updatePageLanguage(newLanguage);
      }
    });
  });
};
