import { html, TemplateResult } from "../lib";

export const footerTemplate = (): TemplateResult =>
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
