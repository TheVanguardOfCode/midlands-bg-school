import { html, render, TemplateResult, page } from "./lib";
import { initI18n } from "./i18n/i18n";
import { locales } from "./utils/i18n-util";
import { homeView } from "./views/homeView";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const headerRoot = document.getElementById("header") as HTMLElement;
const mainRoot = document.getElementById("main") as HTMLElement;
const footerRoot = document.getElementById("footer") as HTMLElement;

// Media Queries
const mqlTouchDevice = window.matchMedia("(pointer: coarse)");
const mqlNoneTouchDevice = window.matchMedia("(pointer: fine)");
const mqlMobileNavScreenSize = window.matchMedia(
    "screen and (max-width: 1094px)"
);
let touchDevice: boolean = mqlTouchDevice.matches;
let mobileNav: boolean = mqlMobileNavScreenSize.matches;
let currentNavUl: HTMLUListElement | undefined;

const headerTemplate = (
    switchThemeHandler: (e: Event) => void,
    toggleMobileNavHandler: (e: Event) => void,
    onClickNavLinkHandler: (e: Event) => void,
    onClickDropdownLinkHandler: (e: Event) => void,
    onMouseEenterDropdownItemHandler: (e: Event) => void,
    onMouseLeaveDropdownItemHandler: (e: Event) => void
): TemplateResult => html`
    <div class="header-wrapper">
        <nav class="nav-container" id="nav">
            <div class="nav-data">
                <div class="nav-logo">
                    <a href="#" class="logo">
                        <img
                            src="https://res.cloudinary.com/diebeaf02/image/upload/v1720105381/Repos/bg-school/logo_zkqftu.png"
                            alt="Logo" />
                    </a>
                </div>
                <div class="nav-title">
                    <h1>
                        <span data-i18n="header.title-1"></span>
                        <span data-i18n="header.title-2"></span>
                    </h1>
                </div>
            </div>
            <div
                class="nav-toggle"
                id="navToggle"
                @click=${toggleMobileNavHandler}>
                <img
                    class="nav-burger"
                    src="https://res.cloudinary.com/diebeaf02/image/upload/v1720105376/Repos/bg-school/Menu-icon_glt7ex.webp" />
                <img
                    class="nav-close"
                    src="https://res.cloudinary.com/diebeaf02/image/upload/v1720105370/Repos/bg-school/Close-icon_rskhug.webp" />
            </div>
            <div class="nav-menu" id="navMenu">
                <ul class="nav-list">
                    <li class="noSelect">
                        <a
                            href="javascript:void(0)"
                            class="nav-link"
                            data-i18n="header.nav-link-1"
                            @click=${onClickNavLinkHandler}></a>
                    </li>
                    <!-- Dropdown 1 -->
                    <li
                        class="dropdown-item noSelect"
                        @mouseenter=${onMouseEenterDropdownItemHandler}
                        @mouseleave=${onMouseLeaveDropdownItemHandler}>
                        <div class="nav-link" @click=${onClickNavLinkHandler}>
                            <span data-i18n="header.nav-link-2"></span>
                            <i
                                class="fa-solid fa-caret-down dropdown-arrow"></i>
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-1"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-2"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-3"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-4"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-5"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-6"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-2-7"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                        </ul>
                    </li>
                    <!-- Dropdown 2 -->
                    <li
                        class="dropdown-item noSelect"
                        @mouseenter=${onMouseEenterDropdownItemHandler}
                        @mouseleave=${onMouseLeaveDropdownItemHandler}>
                        <div class="nav-link" @click=${onClickNavLinkHandler}>
                            <span data-i18n="header.nav-link-3"></span>
                            <i
                                class="fa-solid fa-caret-down dropdown-arrow"></i>
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-3-1"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-3-2"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                        </ul>
                    </li>
                    <!-- Dropdown 3 -->
                    <li
                        class="dropdown-item noSelect"
                        @mouseenter=${onMouseEenterDropdownItemHandler}
                        @mouseleave=${onMouseLeaveDropdownItemHandler}>
                        <div class="nav-link" @click=${onClickNavLinkHandler}>
                            <span data-i18n="header.nav-link-4"></span>
                            <i
                                class="fa-solid fa-caret-down dropdown-arrow"></i>
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-4-1"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    class="dropdown-link"
                                    data-i18n="header.dropdown-link-4-2"
                                    @click=${onClickDropdownLinkHandler}></a>
                            </li>
                        </ul>
                    </li>
                    <li class="noSelect">
                        <a
                            href="javascript:void(0)"
                            class="nav-link"
                            data-i18n="header.nav-link-5"
                            @click=${onClickNavLinkHandler}></a>
                    </li>
                </ul>
            </div>
            <div class="nav-settings" id="navSettings">
                <!-- Dark Mode Switch -->
                <div class="theme-switch">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        class="darkmode-toggle"
                        @change=${switchThemeHandler} />
                    <label for="darkModeToggle" class="darkmode-toggle-label">
                        <i class="fa-regular fa-sun"></i>
                        <i class="fa-regular fa-moon"></i>
                    </label>
                </div>
                <!-- Language Menu -->
                <div
                    class="lang-menu noSelect"
                    @mouseenter=${onMouseEenterDropdownItemHandler}
                    @mouseleave=${onMouseLeaveDropdownItemHandler}>
                    <div
                        class="selected-lang nav-link"
                        @click=${onClickNavLinkHandler}>
                        <div id="selectedLang" class="bg"></div>
                        <i class="fa-solid fa-caret-down dropdown-arrow"></i>
                    </div>
                    <ul class="dropdown-menu">
                        <li>
                            <a
                                href="javascript:void(0)"
                                class="dropdown-link bg language-link"
                                data-language="bg"
                                data-i18n="header.language-link-1"
                                @click=${onClickDropdownLinkHandler}>
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                class="dropdown-link en language-link"
                                data-language="en"
                                data-i18n="header.language-link-2"
                                @click=${onClickDropdownLinkHandler}>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="custom-shape-wave">
        <svg
            class="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            version="1.1"
            preserveAspectRatio="none">
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                class="shape-fill"></path>
        </svg>
    </div>
    <div class="custom-shape-flag">
        <svg
            class="flag"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none">
            <path
                d="M0 106L21.5 111.2C43 116.3 86 126.7 128.8 127C171.7 127.3 214.3 117.7 257.2 117.5C300 117.3 343 126.7 385.8 131.5C428.7 136.3 471.3 136.7 514.2 132.5C557 128.3 600 119.7 642.8 118.8C685.7 118 728.3 125 771.2 126.3C814 127.7 857 123.3 878.5 121.2L900 119L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
                class="shape-fill-red"></path>
            <path
                d="M0 71L21.5 72.7C43 74.3 86 77.7 128.8 80.3C171.7 83 214.3 85 257.2 82.8C300 80.7 343 74.3 385.8 75.8C428.7 77.3 471.3 86.7 514.2 87.7C557 88.7 600 81.3 642.8 78.3C685.7 75.3 728.3 76.7 771.2 80C814 83.3 857 88.7 878.5 91.3L900 94L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
                class="shape-fill-green"></path>
            <path
                d="M0 57L21.5 53C43 49 86 41 128.8 39C171.7 37 214.3 41 257.2 42.5C300 44 343 43 385.8 44.5C428.7 46 471.3 50 514.2 49.2C557 48.3 600 42.7 642.8 42.7C685.7 42.7 728.3 48.3 771.2 51.2C814 54 857 54 878.5 54L900 54L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
                class="shape-fill-white"></path>
        </svg>
    </div>
`;

const footerTemplate = (): TemplateResult =>
    html`<div class="footer-wrapper">
            <div class="footer-container">
                <section class="footer-top">
                    <div class="footer-nav">
                        <div class="footer-nav-col">
                            <h3
                                class="footer-nav-col-title"
                                data-i18n="footer.links-group-title-1"></h3>
                            <ul class="footer-list">
                                <li class="noSelect">
                                    <a
                                        href="/"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-1-1">
                                    </a>
                                </li>
                                <li class="noSelect">
                                    <a
                                        href="/"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-1-2">
                                    </a>
                                </li>
                                <li class="noSelect">
                                    <a
                                        href="/"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-1-3">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-nav-col">
                            <h3
                                class="footer-nav-col-title"
                                data-i18n="footer.links-group-title-2"></h3>
                            <ul class="footer-list">
                                <li class="noSelect">
                                    <a
                                        href="http://bulgarianembassy-london.org/"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-2-1">
                                    </a>
                                </li>
                                <li class="noSelect">
                                    <a
                                        href="https://www.mon.bg/ "
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-2-2">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-nav-col">
                            <h3
                                class="footer-nav-col-title"
                                data-i18n="footer.links-group-title-3"></h3>
                            <ul class="footer-list">
                                <li class="noSelect">
                                    <a
                                        href="https://stepbystep.bgezik.online/login/index.php"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-3-1">
                                    </a>
                                </li>
                                <li class="noSelect">
                                    <a
                                        href="https://bg.e-prosveta.bg/resources/books"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-3-2">
                                    </a>
                                </li>
                                <li class="noSelect">
                                    <a
                                        href="https://www.bing.com/videos/search?q=%d0%bf%d1%80%d0%b8%d0%ba%d0%b0%d0%b7%d0%ba%d0%b8+%d0%b7%d0%b0+%d1%81%d0%bb%d1%83%d1%88%d0%b0%d0%bd%d0%b5&qpvt=%d0%bf%d1%80%d0%b8%d0%ba%d0%b0%d0%b7%d0%ba%d0%b8+%d0%b7%d0%b0+%d1%81%d0%bb%d1%83%d1%88%d0%b0%d0%bd%d0%b5&FORM=VDRE"
                                        target="_blank"
                                        class="footer-nav-link"
                                        data-i18n="footer.footer-link-3-3">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-info">
                        <div class="footer-info-col">
                            <address class="footer-info-address">
                                <div class="footer-info-col">
                                    <div class="footer-info-social">
                                        <h2>
                                            <a
                                                href="https://www.facebook.com/Mentalisimo"
                                                target="_blank">
                                                <span
                                                    data-i18n="footer.footer-social-slogan"></span>
                                                <i
                                                    class="fa-brands fa-facebook"></i>
                                            </a>
                                        </h2>
                                    </div>
                                    <p>
                                        <i class="fa-solid fa-envelope"></i>
                                        <span
                                            data-i18n="footer.footer-contact-1"></span>
                                        <a
                                            href="mailto:pkbgu@outlook.com"
                                            data-i18n="footer.footer-email">
                                        </a>
                                    </p>
                                    <p>
                                        <i class="fa-solid fa-phone-volume"></i>
                                        <span
                                            data-i18n="footer.footer-contact-2"></span>
                                        <a
                                            href="tel:+447305733259"
                                            data-i18n="footer.footer-tel">
                                        </a>
                                    </p>
                                </div>
                                <div class="footer-info-col">
                                    <p>
                                        <a
                                            href="https://maps.app.goo.gl/cTUHJCGbbrhSdKSBA"
                                            target="_blank">
                                            <i
                                                class="fa-solid fa-map-location-dot"></i>
                                            <span
                                                data-i18n="footer.footer-contact-3"></span>
                                        </a>
                                    </p>
                                    <p
                                        class="p-l pb-s"
                                        data-i18n="footer.footer-address-1"></p>
                                    <p
                                        class="p-l pb-s"
                                        data-i18n="footer.footer-address-2"></p>
                                    <p
                                        class="p-l pb-s"
                                        data-i18n="footer.footer-address-3"></p>
                                    <p
                                        class="p-l pb-s"
                                        data-i18n="footer.footer-address-4"></p>
                                    <p></p>
                                </div>
                            </address>
                        </div>
                    </div>
                </section>
                <section class="footer-bottom">
                    <div>
                        <h3>
                            <span class="nowrap"> Copyright &copy; 2024 </span>
                            <span class="nowrap">TheVanguardOfCode</span>
                        </h3>
                    </div>
                </section>
            </div>
        </div>
        <div class="custom-shape-footer-wave">
            <svg
                class="wave"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    class="shape-fill"></path>
            </svg>
        </div>`;
// Remove all active classes from elements
const removeNavActiveClass = (elements: NodeListOf<Element> | Element[]) => {
    elements.forEach((el) => {
        el.classList.remove("active");
    });
};

// Hide MobileNav
const hideMobileNav = () => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const navSettings = document.getElementById("navSettings") as HTMLElement;
    const toggleNavBtn = document.getElementById("navToggle") as HTMLElement;
    navClassHandler();
    toggleNavBtn.classList.remove("show-close-icon");
    navMenu.classList.remove("show-nav-menu");
    navSettings.classList.remove("show-nav-settings");
};

// Nav Class handler
const navClassHandler = () => {
    const nav = document.getElementById("nav") as HTMLElement;
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const activeDropdownLink = navMenu.querySelectorAll(
        ".dropdown-link.active"
    )[0] as HTMLElement;

    if (touchDevice && mobileNav) {
        removeNavActiveClass([
            ...nav.querySelectorAll(
                ".dropdown-arrow,.dropdown-menu,div.nav-link,.lang-menu,.dropdown-item"
            ),
        ]);
        if (activeDropdownLink) {
            removeNavActiveClass([...navMenu.querySelectorAll(".nav-link")]);
            const elements = [
                ...activeDropdownLink.parentElement!.parentElement!
                    .parentElement!.children,
            ] as HTMLElement[];
            const currentNavLink = elements[0];
            const currentDropdownMenu = elements[1];
            currentNavLink.classList.toggle("active");
            currentNavLink.parentElement!.classList.toggle("active");
            currentNavLink
                .getElementsByClassName("dropdown-arrow")[0]
                .classList.toggle("active");
            currentDropdownMenu.classList.toggle("active");
        }
    } else {
        removeNavActiveClass([
            ...nav.querySelectorAll(
                ".dropdown-menu,.dropdown-arrow,.dropdown-item,.lang-menu,.selected-lang.nav-link"
            ),
        ]);

        if (!activeDropdownLink) {
            removeNavActiveClass([...navMenu.querySelectorAll("div.nav-link")]);
        } else {
            removeNavActiveClass([...navMenu.querySelectorAll(".nav-link")]);
            const elements = [
                ...activeDropdownLink.parentElement!.parentElement!
                    .parentElement!.children,
            ];
            const currentNavLink = elements[0];
            currentNavLink.classList.toggle("active");
        }
    }
};

// Nav links handlers
const navLinkTouchHandler = (currentEl: HTMLElement) => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const navSettings = document.getElementById("navSettings") as HTMLElement;
    if (currentEl.nodeName === "DIV") {
        currentNavUl = currentEl.parentElement!.getElementsByTagName("ul")[0];
        const isActive = currentNavUl.classList.contains("active");
        const isLangLink = currentEl.classList.contains("selected-lang");
        if (!isActive && !isLangLink) {
            removeNavActiveClass([
                ...navMenu.querySelectorAll(
                    ".dropdown-arrow,.dropdown-menu,.dropdown-item"
                ),
            ]);
        }

        if (touchDevice && !mobileNav) {
            if (isLangLink) {
                removeNavActiveClass([
                    ...navMenu.querySelectorAll(
                        ".dropdown-arrow,.dropdown-menu,.dropdown-item"
                    ),
                ]);
            }
        }
        if (touchDevice) {
            const activeDropdownLink = navMenu.querySelectorAll(
                ".dropdown-link.active"
            )[0] as HTMLElement;
            if (activeDropdownLink) {
                const elements = [
                    ...activeDropdownLink.parentElement!.parentElement!
                        .parentElement!.children,
                ] as HTMLElement[];
                const currentActiveNavLink = elements[0];
                if (currentEl.isEqualNode(currentActiveNavLink)) {
                    currentActiveNavLink.classList.add("active");
                }
            }
        }

        if (isLangLink) {
            currentEl.parentElement!.classList.toggle("active");
        } else {
            removeNavActiveClass([
                ...navSettings.querySelectorAll(
                    ".dropdown-arrow,.dropdown-menu,div.nav-link,.lang-menu"
                ),
            ]);
        }
        currentEl
            .getElementsByClassName("dropdown-arrow")[0]
            .classList.toggle("active");
        currentEl.parentElement!.classList.toggle("active");
        currentNavUl.classList.toggle("active");
    } else {
        removeNavActiveClass([
            ...navMenu.querySelectorAll(
                ".nav-link,.dropdown-link,.dropdown-arrow,.dropdown-item"
            ),
        ]);
        currentEl.classList.toggle("active");
        navClassHandler();
        if (touchDevice && mobileNav) {
            hideMobileNav();
        }
    }
};
const navLinkNoneTouchHandler = (currentEl: HTMLElement) => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
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
const dropdownLinkTouchHandler = (currentEl: HTMLElement) => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const navSettings = document.getElementById("navSettings") as HTMLElement;
    const isLangLink = currentEl.classList.contains("language-link");
    if (isLangLink) {
        removeNavActiveClass([
            ...navSettings.querySelectorAll(
                ".dropdown-menu,.selected-lang,.dropdown-arrow,.dropdown-link,.lang-menu"
            ),
        ]);
        currentEl.classList.toggle("active");
    } else {
        removeNavActiveClass([
            ...navMenu.querySelectorAll(
                ".nav-link,.dropdown-item,.dropdown-menu,.dropdown-link,.dropdown-arrow"
            ),
        ]);
        navClassHandler();
        currentEl.classList.toggle("active");
        if (touchDevice && !mobileNav) {
            currentEl.parentElement!.parentElement!.previousElementSibling!.classList.toggle(
                "active"
            );
        } else {
            hideMobileNav();
        }
    }
};
const dropdownLinkNoneTouchHandler = (currentEl: HTMLElement) => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const navSettings = document.getElementById("navSettings") as HTMLElement;
    const isLangLink = currentEl.classList.contains("language-link");
    if (isLangLink) {
        removeNavActiveClass([
            ...navSettings.querySelectorAll(".dropdown-menu, .dropdown-link"),
        ]);
        currentEl.classList.toggle("active");
        return;
    } else {
        removeNavActiveClass([
            ...navMenu.querySelectorAll(
                ".nav-link, .dropdown-link, .dropdown-menu"
            ),
        ]);
        currentEl.classList.toggle("active");
        currentEl.parentElement!.parentElement!.previousElementSibling!.classList.toggle(
            "active"
        );
    }
    if (mobileNav) {
        hideMobileNav();
    }
};

// Nav event listeners handlers
const onClickNavLinkHandler = (e: Event) => {
    const currentEl = e.target as HTMLElement;
    if (touchDevice) {
        navLinkTouchHandler(currentEl);
    } else {
        navLinkNoneTouchHandler(currentEl);
    }
};
const onClickDropdownLinkHandler = (e: Event) => {
    const currentEl = e.target as HTMLElement;
    if (touchDevice) {
        dropdownLinkTouchHandler(currentEl);
    } else {
        dropdownLinkNoneTouchHandler(currentEl);
    }
};
const onMouseEenterDropdownItemHandler = (e: Event) => {
    if (!touchDevice) {
        const currentEl = e.target as HTMLElement;
        currentEl.classList.add("active");
        currentEl.querySelectorAll(".dropdown-menu")[0].classList.add("active");
    }
};
const onMouseLeaveDropdownItemHandler = (e: Event) => {
    if (!touchDevice) {
        const currentEl = e.target as HTMLElement;
        currentEl.classList.remove("active");
        currentEl
            .querySelectorAll(".dropdown-menu")[0]
            .classList.remove("active");
    }
};
const switchThemeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
        document.documentElement.setAttribute("data-theme", DARK_THEME);
        localStorage.setItem("theme", DARK_THEME);
    } else {
        document.documentElement.setAttribute("data-theme", LIGHT_THEME);
        localStorage.setItem("theme", LIGHT_THEME);
    }
};
const toggleMobileNavHandler = (e: Event) => {
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const navSettings = document.getElementById("navSettings") as HTMLElement;
    const toggleNavBtn = document.getElementById("navToggle") as HTMLElement;
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

// Init Theme
const initTheme = () => {
    const themeSwitchBtn = document.getElementById(
        "darkModeToggle"
    ) as HTMLInputElement;
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === DARK_THEME) {
            themeSwitchBtn.checked = true;
        }
    } else {
        themeSwitchBtn.checked = false;
    }
};

// Init Nav
const initNav = () => {
    // Init Theme
    initTheme();
    // Init Lang
    initI18n();
    // Init Device
    initDevice();
};

interface LanguageTexts {
    [key: string]: any;
}

interface I18nText {
    en: LanguageTexts;
    bg: LanguageTexts;
}

interface Context {
    render: (content: TemplateResult) => void;
    i18nText: Partial<I18nText>;
}

function decorateContext(ctx: Partial<Context>, next: () => void): void {
    ctx.render = (content: TemplateResult) => render(content, mainRoot);
    ctx.i18nText = locales;
    next();
}
// On Document Load
window.addEventListener("DOMContentLoaded", () => {
    render(
        headerTemplate(
            switchThemeHandler,
            toggleMobileNavHandler,
            onClickNavLinkHandler,
            onClickDropdownLinkHandler,
            onMouseEenterDropdownItemHandler,
            onMouseLeaveDropdownItemHandler
        ),
        headerRoot
    );
    render(footerTemplate(), footerRoot);
    initNav();

    page(decorateContext);
    page("/", homeView);
    page.start();
});
