import { html, render, page } from "./lib.js";
import { getNavData } from "./utils/nav-data-util.js";
import { initTheme } from "./theme-switcher/theme.js";
import { initI18n } from "./i18n/i18n.js";
import { locales } from "./utils/i18n-util.js";
import { homeView } from "./views/home-view.js";
import { headerTemplate } from "./templates/header-template.js";
import { navMenuTemplate } from "./templates/nav-menu-template.js";
import { navLinkTemplate } from "./templates/nav-link.js";
import { navDropdownTemplate } from "./templates/nav-dropdown.js";
import { navDropdownLinkTemplate } from "./templates/nav-dropdown-link.js";
import { footerTemplate } from "./templates/footer-template.js";
const headerRoot = document.getElementById("header");
const mainRoot = document.getElementById("main");
const footerRoot = document.getElementById("footer");
// Media Queries
const mqlTouchDevice = window.matchMedia("(pointer: coarse)");
const mqlNoneTouchDevice = window.matchMedia("(pointer: fine)");
const mqlMobileNavScreenSize = window.matchMedia(
  "screen and (max-width: 1094px)",
);
let touchDevice = mqlTouchDevice.matches;
let mobileNav = mqlMobileNavScreenSize.matches;
let currentNavUl;
// Remove all active classes from elements
const removeNavActiveClass = (elements) => {
  elements.forEach((el) => {
    el.classList.remove("active");
  });
};
// Hide MobileNav
const hideMobileNav = () => {
  const navMenu = document.getElementById("navMenu");
  const navSettings = document.getElementById("navSettings");
  const toggleNavBtn = document.getElementById("navToggle");
  navClassHandler();
  toggleNavBtn.classList.remove("show-close-icon");
  navMenu.classList.remove("show-nav-menu");
  navSettings.classList.remove("show-nav-settings");
};
// Nav Class handler
const navClassHandler = () => {
  const nav = document.getElementById("nav");
  const navMenu = document.getElementById("navMenu");
  const activeDropdownLink = navMenu.querySelectorAll(
    ".dropdown-link.active",
  )[0];
  if (touchDevice && mobileNav) {
    removeNavActiveClass([
      ...nav.querySelectorAll(
        ".dropdown-arrow,.dropdown-menu,div.nav-link,.lang-menu,.dropdown-item",
      ),
    ]);
    if (activeDropdownLink) {
      removeNavActiveClass([...navMenu.querySelectorAll(".nav-link")]);
      const elements = [
        ...activeDropdownLink.parentElement.parentElement.parentElement
          .children,
      ];
      const currentNavLink = elements[0];
      const currentDropdownMenu = elements[1];
      currentNavLink.classList.toggle("active");
      currentNavLink.parentElement.classList.toggle("active");
      currentNavLink
        .getElementsByClassName("dropdown-arrow")[0]
        .classList.toggle("active");
      currentDropdownMenu.classList.toggle("active");
    }
  } else {
    removeNavActiveClass([
      ...nav.querySelectorAll(
        ".dropdown-menu,.dropdown-arrow,.dropdown-item,.lang-menu,.selected-lang.nav-link",
      ),
    ]);
    if (!activeDropdownLink) {
      removeNavActiveClass([...navMenu.querySelectorAll("div.nav-link")]);
    } else {
      removeNavActiveClass([...navMenu.querySelectorAll(".nav-link")]);
      const elements = [
        ...activeDropdownLink.parentElement.parentElement.parentElement
          .children,
      ];
      const currentNavLink = elements[0];
      currentNavLink.classList.toggle("active");
    }
  }
};
// Nav links handlers
const navLinkTouchHandler = (currentEl) => {
  const navMenu = document.getElementById("navMenu");
  const navSettings = document.getElementById("navSettings");
  if (currentEl.nodeName === "DIV") {
    currentNavUl = currentEl.parentElement.getElementsByTagName("ul")[0];
    const isActive = currentNavUl.classList.contains("active");
    const isLangLink = currentEl.classList.contains("selected-lang");
    if (!isActive && !isLangLink) {
      removeNavActiveClass([
        ...navMenu.querySelectorAll(
          ".dropdown-arrow,.dropdown-menu,.dropdown-item",
        ),
      ]);
    }
    if (touchDevice && !mobileNav) {
      if (isLangLink) {
        removeNavActiveClass([
          ...navMenu.querySelectorAll(
            ".dropdown-arrow,.dropdown-menu,.dropdown-item",
          ),
        ]);
      }
    }
    if (touchDevice) {
      const activeDropdownLink = navMenu.querySelectorAll(
        ".dropdown-link.active",
      )[0];
      if (activeDropdownLink) {
        const elements = [
          ...activeDropdownLink.parentElement.parentElement.parentElement
            .children,
        ];
        const currentActiveNavLink = elements[0];
        if (currentEl.isEqualNode(currentActiveNavLink)) {
          currentActiveNavLink.classList.add("active");
        }
      }
    }
    if (isLangLink) {
      currentEl.parentElement.classList.toggle("active");
    } else {
      removeNavActiveClass([
        ...navSettings.querySelectorAll(
          ".dropdown-arrow,.dropdown-menu,div.nav-link,.lang-menu",
        ),
      ]);
    }
    currentEl
      .getElementsByClassName("dropdown-arrow")[0]
      .classList.toggle("active");
    currentEl.parentElement.classList.toggle("active");
    currentNavUl.classList.toggle("active");
  } else {
    removeNavActiveClass([
      ...navMenu.querySelectorAll(
        ".nav-link,.dropdown-link,.dropdown-arrow,.dropdown-item",
      ),
    ]);
    currentEl.classList.toggle("active");
    navClassHandler();
    if (touchDevice && mobileNav) {
      hideMobileNav();
    }
  }
};
const navLinkNoneTouchHandler = (currentEl) => {
  const navMenu = document.getElementById("navMenu");
  if (currentEl.nodeName !== "DIV") {
    removeNavActiveClass([
      ...navMenu.querySelectorAll(".nav-link, .dropdown-link"),
    ]);
    currentEl.classList.toggle("active");
  } else {
    return;
  }
  if (mobileNav) {
    hideMobileNav();
  }
};
// Dropdown links handlers
const dropdownLinkTouchHandler = (currentEl) => {
  const navMenu = document.getElementById("navMenu");
  const navSettings = document.getElementById("navSettings");
  const isLangLink = currentEl.classList.contains("language-link");
  if (isLangLink) {
    removeNavActiveClass([
      ...navSettings.querySelectorAll(
        ".dropdown-menu,.selected-lang,.dropdown-arrow,.dropdown-link,.lang-menu",
      ),
    ]);
    currentEl.classList.toggle("active");
  } else {
    removeNavActiveClass([
      ...navMenu.querySelectorAll(
        ".nav-link,.dropdown-item,.dropdown-menu,.dropdown-link,.dropdown-arrow",
      ),
    ]);
    navClassHandler();
    currentEl.classList.toggle("active");
    if (touchDevice && !mobileNav) {
      currentEl.parentElement.parentElement.previousElementSibling.classList.toggle(
        "active",
      );
    } else {
      hideMobileNav();
    }
  }
};
const dropdownLinkNoneTouchHandler = (currentEl) => {
  const navMenu = document.getElementById("navMenu");
  const navSettings = document.getElementById("navSettings");
  const isLangLink = currentEl.classList.contains("language-link");
  if (isLangLink) {
    removeNavActiveClass([
      ...navSettings.querySelectorAll(".dropdown-menu, .dropdown-link"),
    ]);
    currentEl.classList.toggle("active");
    return;
  } else {
    removeNavActiveClass([
      ...navMenu.querySelectorAll(".nav-link, .dropdown-link, .dropdown-menu"),
    ]);
    currentEl.classList.toggle("active");
    currentEl.parentElement.parentElement.previousElementSibling.classList.toggle(
      "active",
    );
  }
  if (mobileNav) {
    hideMobileNav();
  }
};
// Nav event listeners handlers
const onClickNavLinkHandler = (e) => {
  const currentEl = e.target;
  if (touchDevice) {
    navLinkTouchHandler(currentEl);
  } else {
    navLinkNoneTouchHandler(currentEl);
  }
};
const onClickDropdownLinkHandler = (e) => {
  const currentEl = e.target;
  if (touchDevice) {
    dropdownLinkTouchHandler(currentEl);
  } else {
    dropdownLinkNoneTouchHandler(currentEl);
  }
};
const onMouseEenterDropdownItemHandler = (e) => {
  if (!touchDevice) {
    const currentEl = e.target;
    currentEl.classList.add("active");
    currentEl.querySelectorAll(".dropdown-menu")[0].classList.add("active");
  }
};
const onMouseLeaveDropdownItemHandler = (e) => {
  if (!touchDevice) {
    const currentEl = e.target;
    currentEl.classList.remove("active");
    currentEl.querySelectorAll(".dropdown-menu")[0].classList.remove("active");
  }
};
const toggleMobileNavHandler = (e) => {
  const navMenu = document.getElementById("navMenu");
  const navSettings = document.getElementById("navSettings");
  const toggleNavBtn = document.getElementById("navToggle");
  navClassHandler();
  toggleNavBtn.classList.toggle("show-close-icon");
  navMenu.classList.toggle("show-nav-menu");
  navSettings.classList.toggle("show-nav-settings");
};
// Init Device
const initDevice = () => {
  mqlTouchDevice.addEventListener("change", (e) => {
    touchDevice = e.matches;
    navClassHandler();
  });
  mqlMobileNavScreenSize.addEventListener("change", (e) => {
    mobileNav = e.matches;
    navClassHandler();
    if (!mobileNav) {
      hideMobileNav();
    }
  });
  if (mqlNoneTouchDevice.matches && mqlTouchDevice.matches) {
    document.addEventListener("mousemove", () => {
      if (touchDevice) {
        touchDevice = false;
        navClassHandler();
      }
    });
    document.addEventListener("touchstart", () => {
      if (!touchDevice) {
        touchDevice = true;
        navClassHandler();
      }
    });
  }
};
// Init Nav
const initNav = async () => {
  // Init Theme
  initTheme();
  // Init Lang
  await initI18n();
  // Init Device
  initDevice();
};
function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, mainRoot);
  ctx.i18nText = locales;
  next();
}
// On Document Load
window.addEventListener("DOMContentLoaded", async () => {
  const navData = await getNavData();
  const links = navData.links.map((link) => {
    if (!link.isDropdown) {
      return navLinkTemplate(onClickNavLinkHandler, link.dataI18n);
    }
    if (link.isDropdown && link.dropdownLinks) {
      const currentDropdownlinks = link.dropdownLinks.map((dropdownLink) => {
        return navDropdownLinkTemplate(
          onClickDropdownLinkHandler,
          dropdownLink.dataI18n,
        );
      });
      const currentDropdownlinksTemplate = html` ${currentDropdownlinks} `;
      return navDropdownTemplate(
        onClickNavLinkHandler,
        onMouseEenterDropdownItemHandler,
        onMouseLeaveDropdownItemHandler,
        link.dataI18n,
        currentDropdownlinksTemplate,
      );
    }
  });
  const navMenuList = html` ${links}`;
  const navMenu = navMenuTemplate(navMenuList);
  render(
    headerTemplate(
      toggleMobileNavHandler,
      onClickNavLinkHandler,
      onClickDropdownLinkHandler,
      onMouseEenterDropdownItemHandler,
      onMouseLeaveDropdownItemHandler,
      navMenu,
    ),
    headerRoot,
  );
  render(footerTemplate(), footerRoot);
  await initNav();
  page(decorateContext);
  page("/", homeView);
  page.start();
});
