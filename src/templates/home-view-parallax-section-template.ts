import { Locales } from "../model/locales-query.types";
import { html, until, TemplateResult } from "../lib";

export const homeViewParallaxSectionTemplate = (
    homeViewHistoricalFigureCards: TemplateResult,
    i18nText: Locales,
    lang: string | null
): TemplateResult => html`
    <div class="parallax-container" id="parallax-container">
        <div class="parallax-overlay" id="parallaxOverlay">
            <div id="parallaxOverlayTitle" class="parallax-overlay-title">
                <h2 data-i18n="home.parallax-title">
                    ${lang ? i18nText[lang]["home"]["parallax-title"] : null}
                </h2>
            </div>

            <img
                src="https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729017441/First-Class-Bg-School/home/parallax/bulgaria-map_xe5opl.png"
                id="map"
                alt="Bulgarian Map" />
            ${until(homeViewHistoricalFigureCards, html`<p>Loading...</p>`)}
            <svg class="arrows" id="scroll-down">
                <path class="a1" d="M0 0 L30 32 L60 0"></path>
                <path class="a2" d="M0 20 L30 52 L60 20"></path>
                <path class="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
        </div>
    </div>
    <img
        id="cloud1"
        class="parallax-landscape"
        dynamic-img
        src=""
        alt="Cloud" />
    <img id="sun" class="parallax-landscape" dynamic-img src="" alt="Sun" />
    <img
        id="cloud2"
        class="parallax-landscape"
        dynamic-img
        src=""
        alt="Cloud" />
    <img
        class="parallax-landscape"
        id="mountain-left"
        src="https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729017439/First-Class-Bg-School/home/parallax/mountain-left_k5ojug.png"
        alt="Mountain" />
    <img
        class="parallax-landscape"
        id="mountain-center"
        src="https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729017439/First-Class-Bg-School/home/parallax/mountain-center_y85yqh.png"
        alt="Mountain" />
    <img
        class="parallax-landscape"
        id="mountain-right"
        src="https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729017440/First-Class-Bg-School/home/parallax/mountain-right_jitdv1.png"
        alt="Mountain" />
    <img
        class="parallax-landscape"
        id="landscape"
        src="https://res.cloudinary.com/dmm0gmxdr/image/upload/v1729017443/First-Class-Bg-School/home/parallax/landscape_gvzrxz.png"
        alt="Landscape" />
    <img class="parallax-landscape" dynamic-img id="trees" src="" alt="Trees" />
`;
