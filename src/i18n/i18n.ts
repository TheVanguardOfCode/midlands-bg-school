import {
    getLocalStorageData,
    setLocalStorageData,
} from "../utils/local-storage-util.js";
const availableLocales: string[] = ["en", "bg"];
const defaultLanguage: string = "en";
const locales: { [key: string]: { [key: string]: any } } = {};

const fetchLocale = async (locale: string): Promise<{ [key: string]: any }> => {
    try {
        const response: { [key: string]: any } = await fetch(
            `../../src/locales/${locale}.json`
        );
        const responseContentType: any = response["headers"]
            .get("Content-Type")
            .split(";")[0];
        if (responseContentType !== "application/json") {
            throw new Error(`Error! Status: ${locale}.json doesn't exist`);
        }
        return await response.json();
    } catch (error) {
        // ToDo
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
    url.searchParams.set("lang", lang);
    window.history.pushState(null, "", url.toString());
};
const detectLanguage = (): string => {
    let language: string;
    const urlParams: URLSearchParams = new URLSearchParams(
        window.location.search
    );
    const langFromUrl: string | null = urlParams.get("lang");
    const langFromLocalStorag: string | null = getLocalStorageData("lang");
    const langFromSettings: string = (
        navigator.language || (navigator as any).userLanguage
    ).substr(0, 2);
    console.log(getLocalStorageData("lang"));

    if (langFromUrl && availableLocales.indexOf(langFromUrl) !== -1) {
        language = langFromUrl;
        return language;
    } else if (
        langFromLocalStorag &&
        availableLocales.indexOf(JSON.parse(langFromLocalStorag)) !== -1
    ) {
        language = JSON.parse(langFromLocalStorag);
    } else if (
        langFromSettings &&
        availableLocales.indexOf(langFromSettings) !== -1
    ) {
        language = langFromSettings;
    } else {
        language = defaultLanguage;
    }
    updateQueryString(language);
    return language;
};

const getNestedProperty = (obj: any, key: string): string | null => {
    return key
        .split(".")
        .reduce((o, k) => (o && o[k] !== "undefined" ? o[k] : null), obj);
};

const updatePageLanguage = (lang: string): void => {
    const pageLanguage: string = lang;
    const elements: NodeListOf<HTMLElement> =
        document.querySelectorAll("[data-i18n]");

    try {
        const json: { [key: string]: any } = locales[pageLanguage];

        elements.forEach((element) => {
            const key: string | null = element.getAttribute("data-i18n");
            if (!key) return;

            let text: string | null = getNestedProperty(json, key);
            if (!text) return;

            const variables: RegExpMatchArray | null = text.match(/{(.*?)}/g);
            if (variables) {
                variables.forEach((variable) => {
                    const datasetEntries: [string, string][] = Object.keys(
                        element.dataset
                    ).map((key) => [key, element.dataset[key]!]);
                    datasetEntries.forEach(([dataKey, value]) => {
                        if (`{${dataKey}}` === variable) {
                            try {
                                text = text!.replace(
                                    `${variable}`,
                                    new Function(`return (${value})`)()
                                );
                            } catch (error) {
                                text = text!.replace(`${variable}`, value);
                            }
                        }
                    });
                });
            }

            element.innerHTML = text;
        });

        const htmlElement: HTMLElement | null = document.querySelector("html");
        if (htmlElement) {
            htmlElement.setAttribute("lang", pageLanguage);
        }
    } catch (error) {
        console.error(`Error updating page language to ${lang}:`, error);
    }
};

const init = async (): Promise<void> => {
    await loadLocales();
    const language: string = detectLanguage();
    updatePageLanguage(language);

    document.querySelectorAll(".change-language").forEach((button) => {
        button.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement;
            const newLanguage: string | null =
                target.getAttribute("data-language");

            if (newLanguage && availableLocales.indexOf(newLanguage) !== -1) {
                setLocalStorageData("lang", newLanguage);
                updateQueryString(newLanguage);
                updatePageLanguage(newLanguage);
            }
            console.log(getLocalStorageData("lang"));
        });
    });
};

// Initialize the application
init();
