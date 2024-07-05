import {
    getLocalStorageData,
    setLocalStorageData,
} from "../utils/local-storage-util";
import {
    locales,
    dataI18n,
    langString,
    defaultLanguage,
} from "../utils/i18n-util";
import { AvailableLocales } from "../model/available-locales.types";
import { NavigatorExtend } from "../model/navigator-extend.types";
import { loadLocales } from "./load-locales";
import { updateQueryString } from "./update-query-string";
import { isValidLocale } from "./is-valid-locale";

const detectLanguage = (): AvailableLocales => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get(langString);
    const langFromLocalStorage = getLocalStorageData(langString);
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
                        (key) =>
                            [key, element.dataset[key]!] as [string, string]
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
            htmlElement.setAttribute(langString, pageLanguage);
        }
    } catch (error) {
        console.error(`Error updating page language to ${lang}:`, error);
    }
};

export const initI18n = async (): Promise<void> => {
    await loadLocales();
    const language = detectLanguage();
    updatePageLanguage(language);
    const currentLangIcon: HTMLElement = document.getElementById(
        "selectedLang"
    ) as HTMLElement;
    currentLangIcon.className = "";
    currentLangIcon.classList.add(language);
    const currentLangLink = document.querySelectorAll(
        `.language-link.${language}`
    )[0] as HTMLElement;
    currentLangLink.classList.add("active");
    document.querySelectorAll(".language-link").forEach((languageLink) => {
        languageLink.addEventListener("click", (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            const newLanguage: string | null =
                target.getAttribute("data-language");
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
