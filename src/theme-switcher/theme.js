import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/local-storage-util.js";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const DEFAULT_THEME = LIGHT_THEME;
// Init Theme
export const initTheme = () => {
  const themeSwitchBtn = document.getElementById("darkModeToggle");
  themeSwitchBtn.addEventListener("click", (event) => {
    const target = event.target;
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
