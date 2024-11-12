import { html, TemplateResult } from "../lib";
import { fetchLocale } from "../i18n/fetch-locale";
import { availableLocales } from "../utils/i18n-util";
import { Context } from "../model/page-ctx.types";
import { ParallaxThemesData } from "../model/available-parallax-themes";
import {
    HistoricalFiguresData,
    HistoricalFigureElement,
} from "../model/available-historical-figure";
import { getHistoricalFiguresData } from "../services/historical-figures-service";
import { homeViewTemplate } from "../templates/home-view-template";
import { homeViewParallaxSectionTemplate } from "../templates/home-view-parallax-section-template";
import { homeViewHistoricalFigureCardTemplate } from "../templates/home-view-historical-figure-card-template";
import { homeViewInfoSectionTemplate } from "../templates/home-view-info-section-template";
const targetElement = document.querySelector("html") as HTMLElement;

const initParallax = async () => {
    // Parallax Script
    const parallaxOverlay = document.getElementById(
        "parallaxOverlay"
    ) as HTMLElement;
    const parallaxBackground = document.getElementById(
        "parallax"
    ) as HTMLElement;
    const scrollDownSign = document.getElementById(
        "scroll-down"
    ) as HTMLElement;
    const parallaxOverlayTitle = document.getElementById(
        "parallaxOverlayTitle"
    ) as HTMLElement;
    const map = document.getElementById("map") as HTMLImageElement;

    const sun = document.getElementById("sun") as HTMLImageElement;
    const cloud1 = document.getElementById("cloud1") as HTMLImageElement;
    const cloud2 = document.getElementById("cloud2") as HTMLImageElement;

    const parallaxThemesData: ParallaxThemesData = await fetchLocale(
        "parallax-themes-data"
    );

    const setParallaxImgLinks = () => {
        const currentTheme: string | null = targetElement.getAttribute("theme");
        if (currentTheme) {
            const elements: NodeListOf<HTMLImageElement> =
                document.querySelectorAll("[dynamic-img]");
            elements.forEach(
                (el: HTMLImageElement) =>
                    (el.src = parallaxThemesData[currentTheme][el.id])
            );
        }
    };
    setParallaxImgLinks();

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === "theme") {
                setParallaxImgLinks();
            }
        }
    });

    observer.observe(targetElement, {
        attributes: true,
        attributeFilter: ["theme"],
    });

    const mountainRight = document.getElementById(
        "mountain-right"
    ) as HTMLElement;
    const mountainLeft = document.getElementById(
        "mountain-left"
    ) as HTMLElement;
    const mountainCenter = document.getElementById(
        "mountain-center"
    ) as HTMLElement;
    const landscape = document.getElementById("landscape") as HTMLElement;

    let hideScrollSign = false;
    const speed = {
        first: 0.8,
        second: 1.2,
        third: 1.4,
    };

    const historicalFiguresElements = Array.from(
        parallaxOverlay.getElementsByClassName("historical-figure")
    ) as HTMLElement[];

    const historicalFiguresMapper: HistoricalFigureElement[] =
        historicalFiguresElements.map((el) => ({
            el: el,
            elStartingOffsetTop: el.offsetTop,
            elStartingOffsetLeft: el.offsetLeft,
            elStartingOffsetWidth: el.offsetWidth,
            elPerantWidth: parallaxOverlay.offsetWidth,
            side: el.getAttribute("side"),
            row: el.getAttribute("row"),
        }));

    const currentBottomSun =
        parallaxBackground.offsetHeight - sun.offsetTop - sun.offsetHeight;
    const currentLefCloud1 = cloud1.offsetLeft;
    const currentLeftCloud2 = cloud2.offsetLeft;

    const currentBottomMap =
        parallaxOverlay.offsetHeight - map.offsetTop - map.offsetHeight;

    window.addEventListener("scroll", () => {
        let value = window.scrollY;
        hideScrollSign = value > 0 ? true : false;

        if (hideScrollSign) {
            scrollDownSign.style.display = "none";
            parallaxOverlayTitle.style.opacity = "0";
        } else {
            scrollDownSign.style.display = "block";
            parallaxOverlayTitle.style.opacity = "1";
        }

        sun.style.bottom = (value * 0.1 + currentBottomSun).toString() + "px";
        cloud1.style.left = (-value * 0.5 + currentLefCloud1).toString() + "px";
        cloud2.style.left = (value * 0.5 + currentLeftCloud2).toString() + "px";

        mountainRight.style.left = (value * 0.05).toString() + "px";
        mountainRight.style.bottom = (-value * 0.2).toString() + "px";
        mountainLeft.style.left = (-value * 0.04).toString() + "px";
        mountainLeft.style.bottom = (-value * 0.28).toString() + "px";
        mountainCenter.style.bottom = (-value * 0.25).toString() + "px";
        landscape.style.bottom = (-value * 0.2).toString() + "px";

        map.style.bottom = (value * 0.5 + currentBottomMap).toString() + "px";

        for (const historicalFigure of historicalFiguresMapper) {
            const currentSpeed =
                speed[historicalFigure.row as keyof typeof speed];
            if (historicalFigure.side === "left") {
                historicalFigure.el.style.top =
                    (
                        -value * currentSpeed +
                        historicalFigure.elStartingOffsetTop
                    ).toString() + "px";
                historicalFigure.el.style.left =
                    (
                        -value * currentSpeed +
                        historicalFigure.elStartingOffsetLeft
                    ).toString() + "px";
            } else if (historicalFigure.side === "right") {
                const elStartingOffsetRight =
                    historicalFigure.elPerantWidth -
                    historicalFigure.elStartingOffsetLeft -
                    historicalFigure.elStartingOffsetWidth;
                historicalFigure.el.style.top =
                    (
                        -value * currentSpeed +
                        historicalFigure.elStartingOffsetTop
                    ).toString() + "px";
                historicalFigure.el.style.right =
                    (-value * currentSpeed + elStartingOffsetRight).toString() +
                    "px";
            } else {
                historicalFigure.el.style.top =
                    (
                        -value * currentSpeed +
                        historicalFigure.elStartingOffsetTop
                    ).toString() + "px";
            }
        }
    });
    // End Parallax Script
    // Info Script
    const startTime = (): void => {
        const checkTime = (i: number): string => {
            return i < 10 ? "0" + i : i.toString();
        };
        const today: Date = new Date();
        let hr: string = checkTime(today.getHours());
        let min: string = checkTime(today.getMinutes());
        let sec: string = checkTime(today.getSeconds());
        const ap: string =
            today.getHours() < 12 ? "<span>AM</span>" : "<span>PM</span>";

        // Convert 24-hour time to 12-hour format
        let hourNum = today.getHours();
        hr = hourNum === 0 ? "12" : hourNum > 12 ? checkTime(hourNum - 12) : hr;

        (document.getElementById("clock") as HTMLElement).innerHTML =
            `${hr}:${min}:${sec} ${ap}`;

        const months: string[] = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const days: string[] = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
        ];
        const curWeekDay: string = days[today.getDay()];
        const curDay: number = today.getDate();
        const curMonth: string = months[today.getMonth()];
        const curYear: number = today.getFullYear();
        const date: string = `${curWeekDay}, ${curDay} ${curMonth} ${curYear}`;

        (document.getElementById("date") as HTMLElement).innerHTML = date;

        setTimeout(startTime, 500);
    };

    startTime();

    // End Info Scriipt
};
const loadHomeViewParallaxSection = (
    ctx: Context,
    historicalFiguresData: HistoricalFiguresData
) => {
    const currentLang: string | null = targetElement.getAttribute("lang");
    const data = historicalFiguresData.results;
    const totalHistoricalFigures = 5;
    let currentTemplate = null;
    if (data.length < totalHistoricalFigures) {
        currentTemplate = html`<p>No Historical Figures Data!</p>`;
    } else {
        const shuffled = data.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const historicalFiguresData = shuffled.slice(0, totalHistoricalFigures);
        const historicalFiguresPositions = [
            { side: "left", row: "first" },
            { side: "right", row: "first" },
            { side: "left", row: "second" },
            { side: "right", row: "second" },
            { side: "center", row: "third" },
        ];

        for (const locale of availableLocales) {
            ctx.i18nText[locale]["home"]["parallax-historical-figures"] = {};
        }

        const cards = historicalFiguresData.map(
            (historicalFigureData, index) => {
                for (const locale of availableLocales) {
                    ctx.i18nText[locale]["home"]["parallax-historical-figures"][
                        `parallax-historical-figure-${historicalFigureData.objectId}`
                    ] = `${historicalFigureData[`name_${locale}`]}`;
                }
                historicalFigureData.side =
                    historicalFiguresPositions[index].side;
                historicalFigureData.row =
                    historicalFiguresPositions[index].row;
                return homeViewHistoricalFigureCardTemplate(
                    historicalFigureData,
                    currentLang
                );
            }
        );
        currentTemplate = html` ${cards} `;
    }

    return homeViewParallaxSectionTemplate(
        currentTemplate,
        ctx.i18nText,
        currentLang
    );
};

const loadHomeViewInfoSection = (ctx: Context) => {
    //To be done
    return homeViewInfoSectionTemplate();
};
export const homeView = async (ctx: Context) => {
    const historicalFiguresData: HistoricalFiguresData =
        await getHistoricalFiguresData();
    const homeViewParallaxSection: TemplateResult = loadHomeViewParallaxSection(
        ctx,
        historicalFiguresData
    );
    const homeViewInfoSection: TemplateResult = loadHomeViewInfoSection(ctx);

    ctx.render(homeViewTemplate(homeViewParallaxSection, homeViewInfoSection));
    await initParallax();
    console.log(ctx.i18nText);
};
