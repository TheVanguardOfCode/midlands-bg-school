import { html, TemplateResult, until } from "../lib";

export const headerTemplate = (
    toggleMobileNavHandler: (e: Event) => void,
    onClickNavLinkHandler: (e: Event) => void,
    onClickDropdownLinkHandler: (e: Event) => void,
    onMouseEenterDropdownItemHandler: (e: Event) => void,
    onMouseLeaveDropdownItemHandler: (e: Event) => void,
    navMenu: TemplateResult
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
            ${until(navMenu, html`<p>Loading...</p>`)}
            <div class="nav-settings" id="navSettings">
                <!-- Dark Mode Switch -->
                <div class="theme-switch">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        class="darkmode-toggle" />
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
