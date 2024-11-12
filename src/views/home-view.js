import { html } from "../lib.js";
import { fetchLocale } from "../i18n/fetch-locale.js";
import { availableLocales } from "../utils/i18n-util.js";
import { getHistoricalFiguresData } from "../services/historical-figures-service.js";
import { homeViewTemplate } from "../templates/home-view-template.js";
import { homeViewParallaxSectionTemplate } from "../templates/home-view-parallax-section-template.js";
import { homeViewHistoricalFigureCardTemplate } from "../templates/home-view-historical-figure-card-template.js";
import { homeViewInfoSectionTemplate } from "../templates/home-view-info-section-template.js";
const targetElement = document.querySelector("html");
const initParallax = async () => {
  // Parallax Script
  const parallaxOverlay = document.getElementById("parallaxOverlay");
  const parallaxBackground = document.getElementById("parallax");
  const scrollDownSign = document.getElementById("scroll-down");
  const parallaxOverlayTitle = document.getElementById("parallaxOverlayTitle");
  const map = document.getElementById("map");
  const sun = document.getElementById("sun");
  const cloud1 = document.getElementById("cloud1");
  const cloud2 = document.getElementById("cloud2");
  const parallaxThemesData = await fetchLocale("parallax-themes-data");
  const setParallaxImgLinks = () => {
    const currentTheme = targetElement.getAttribute("theme");
    if (currentTheme) {
      const elements = document.querySelectorAll("[dynamic-img]");
      elements.forEach(
        (el) => (el.src = parallaxThemesData[currentTheme][el.id]),
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
  const mountainRight = document.getElementById("mountain-right");
  const mountainLeft = document.getElementById("mountain-left");
  const mountainCenter = document.getElementById("mountain-center");
  const landscape = document.getElementById("landscape");
  let hideScrollSign = false;
  const speed = {
    first: 0.8,
    second: 1.2,
    third: 1.4,
  };
  const historicalFiguresElements = Array.from(
    parallaxOverlay.getElementsByClassName("historical-figure"),
  );
  const historicalFiguresMapper = historicalFiguresElements.map((el) => ({
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
      const currentSpeed = speed[historicalFigure.row];
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
          (-value * currentSpeed + elStartingOffsetRight).toString() + "px";
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
  function startTime() {
    const checkTime = (i) => {
      return i < 10 ? "0" + i : i.toString();
    };
    const today = new Date();
    let hr = checkTime(today.getHours());
    let min = checkTime(today.getMinutes());
    let sec = checkTime(today.getSeconds());
    const ap = today.getHours() < 12 ? "<span>AM</span>" : "<span>PM</span>";
    // Convert 24-hour time to 12-hour format
    let hourNum = today.getHours();
    hr = hourNum === 0 ? "12" : hourNum > 12 ? checkTime(hourNum - 12) : hr;
    document.getElementById("clock").innerHTML = `${hr}:${min}:${sec} ${ap}`;
    const months = [
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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const curWeekDay = days[today.getDay()];
    const curDay = today.getDate();
    const curMonth = months[today.getMonth()];
    const curYear = today.getFullYear();
    const date = `${curWeekDay}, ${curDay} ${curMonth} ${curYear}`;
    document.getElementById("date").innerHTML = date;
    setTimeout(startTime, 500);
  }
  startTime();
  // End Info Scriipt
};
const loadHomeViewParallaxSection = (ctx, historicalFiguresData) => {
  const currentLang = targetElement.getAttribute("lang");
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
    const cards = historicalFiguresData.map((historicalFigureData, index) => {
      for (const locale of availableLocales) {
        ctx.i18nText[locale]["home"]["parallax-historical-figures"][
          `parallax-historical-figure-${historicalFigureData.objectId}`
        ] = `${historicalFigureData[`name_${locale}`]}`;
      }
      historicalFigureData.side = historicalFiguresPositions[index].side;
      historicalFigureData.row = historicalFiguresPositions[index].row;
      return homeViewHistoricalFigureCardTemplate(
        historicalFigureData,
        currentLang,
      );
    });
    currentTemplate = html` ${cards} `;
  }
  return homeViewParallaxSectionTemplate(
    currentTemplate,
    ctx.i18nText,
    currentLang,
  );
};
const loadHomeViewInfoSection = (ctx) => {
  //To be done
  return homeViewInfoSectionTemplate();
};
export const homeView = async (ctx) => {
  const historicalFiguresData = await getHistoricalFiguresData();
  const homeViewParallaxSection = loadHomeViewParallaxSection(
    ctx,
    historicalFiguresData,
  );
  const homeViewInfoSection = loadHomeViewInfoSection(ctx);
  ctx.render(homeViewTemplate(homeViewParallaxSection, homeViewInfoSection));
  await initParallax();
  console.log(ctx.i18nText);
};
