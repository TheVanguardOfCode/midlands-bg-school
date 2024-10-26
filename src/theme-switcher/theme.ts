import {
    getLocalStorageData,
    setLocalStorageData,
} from "../utils/local-storage-util";
import { Theme } from "../model/available-themes.types";

const DARK_THEME: Theme = "dark";
const LIGHT_THEME: Theme = "light";
const DEFAULT_THEME: Theme = LIGHT_THEME;

// Init Theme
export const initTheme = () => {
    const themeSwitchBtn = document.getElementById(
        "darkModeToggle"
    ) as HTMLInputElement;
    themeSwitchBtn.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
            document.documentElement.setAttribute("theme", DARK_THEME);
            setLocalStorageData("theme", DARK_THEME);
        } else {
            document.documentElement.setAttribute("theme", LIGHT_THEME);
            setLocalStorageData("theme", LIGHT_THEME);
        }
    });
    const currentTheme = getLocalStorageData("theme");
    const htmlElement = document.querySelector("html");
    if (currentTheme) {
        if (htmlElement) {
            htmlElement.setAttribute("theme", currentTheme);
        }
        if (currentTheme === DARK_THEME) {
            themeSwitchBtn.checked = true;
        }
    } else {
        if (htmlElement) {
            htmlElement.setAttribute("theme", DEFAULT_THEME);
        }
        themeSwitchBtn.checked = false;
    }
};
