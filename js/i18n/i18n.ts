// List of available locales
const availableLocales: string[] = ["en", "bg"];

// Default locale
const defaultLanguage: string = "en";

// Type definition for locales object
interface Locales {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

// Locale translations
const locales: Locales = {
  en: {
    header: {
      title: "English title",
    },
    "p-1":
      "This is some dummy text in order to test the translation files. You can mostly ignore what this says, especially anything from this point forward. Ok thanks, bye",
    "p-2": "It also supports custom variable replacements. Examples;",
    variables:
      "Current date: {date}<br>Unix timestamp: {time}<br>Or static text: {static}",
  },
  bg: {
    header: {
      title: "Българско заглавие",
    },
    "p-1": "Параграф 1",
    "p-2": "Параграф 2;",
    variables:
      "Дата: {date}<br>Unix-Zeitstempel: {time}<br>Или статичен текст: {static}",
  },
};

// Function to detect user's language and set it
const detectLanguage = (): string => {
  let language: string = (
    navigator.language || (navigator as any).userLanguage
  ).substr(0, 2);

  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search
  );
  const langFromUrl: string | null = urlParams.get("lang");
  if (langFromUrl && availableLocales.indexOf(langFromUrl) !== -1) {
    language = langFromUrl;
  }

  return availableLocales.indexOf(language) !== -1 ? language : defaultLanguage;
};

// Function to update the page language
const updatePageLanguage = (lang: string): void => {
  const pageLanguage: string =
    availableLocales.indexOf(lang) !== -1 ? lang : defaultLanguage;
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-i18n]");
  const json: { [key: string]: any } = locales[pageLanguage];

  elements.forEach((element) => {
    const key: string | null = element.getAttribute("data-i18n");
    if (!key) return;

    let text: string | null = key
      .split(".")
      .reduce((obj, i) => (obj ? obj[i] : null), json);
    if (!text) return;

    const variables: RegExpMatchArray | null = text.match(/{(.*?)}/g);
    if (variables) {
      variables.forEach((variable) => {
        const datasetEntries: [string, string][] = Object.keys(
          element.dataset
        ).map((key) => [key, element.dataset[key]]);
        datasetEntries.forEach(([dataKey, value]) => {
          if (`{${dataKey}}` === variable) {
            try {
              text = text.replace(
                `${variable}`,
                new Function(`return (${value})`)()
              );
            } catch (error) {
              text = text.replace(`${variable}`, value);
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
};

// Initial language setup
let language: string = detectLanguage();
updatePageLanguage(language);

// Event listener for language change buttons
document.querySelectorAll(".change-language").forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    const newLanguage: string | null = target.getAttribute("data-language");
    if (newLanguage && availableLocales.indexOf(newLanguage) !== -1) {
      updatePageLanguage(newLanguage);
    }
  });
});
