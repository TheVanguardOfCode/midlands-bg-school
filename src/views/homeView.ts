import { TemplateResult } from "../lib.js";
import { homeViewTemplate } from "../templates/homeViewTemplate";

const initParallax = () => {
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
    const map = document.getElementById("map") as HTMLElement;

    const sun = document.getElementById("sun") as HTMLElement;
    const cloud1 = document.getElementById("cloud1") as HTMLElement;
    const cloud2 = document.getElementById("cloud2") as HTMLElement;

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

    const historicalFigures = Array.from(
        parallaxOverlay.getElementsByClassName("historical-figure")
    ) as HTMLElement[];

    interface HistoricalFigure {
        el: HTMLElement;
        elStartingOffsetTop: number;
        elStartingOffsetLeft: number;
        elStartingOffsetWidth: number;
        elPerantWidth: number;
        position: string | null;
        row: string | null;
    }

    const historicalFiguresMapper: HistoricalFigure[] = historicalFigures.map(
        (el) => ({
            el: el,
            elStartingOffsetTop: el.offsetTop,
            elStartingOffsetLeft: el.offsetLeft,
            elStartingOffsetWidth: el.offsetWidth,
            elPerantWidth: parallaxOverlay.offsetWidth,
            position: el.getAttribute("position"),
            row: el.getAttribute("current-row"),
        })
    );

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
            if (historicalFigure.position === "left") {
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
            } else if (historicalFigure.position === "right") {
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
};
interface Context {
    render: (template: TemplateResult) => void;
}

export function homeView(ctx: Context) {
    ctx.render(homeViewTemplate());
    initParallax();
}
