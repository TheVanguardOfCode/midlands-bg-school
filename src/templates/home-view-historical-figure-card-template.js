import { html } from "../lib.js";
export const homeViewHistoricalFigureCardTemplate = (
  historicalFigureData,
  lang,
) =>
  html` <a
    href="${historicalFigureData.hrefInfo}"
    target="_blank"
    class="historical-figure ${historicalFigureData.row}-row-${historicalFigureData.side}"
    side="${historicalFigureData.side}"
    row="${historicalFigureData.row}"
  >
    <div class="historical-figure-img">
      <img
        src="${historicalFigureData.hrefImg}"
        alt="${historicalFigureData.name}"
      />
    </div>
    <div class="historical-figure-data">
      <h1
        class="name"
        data-i18n="home.parallax-historical-figures.parallax-historical-figure-${historicalFigureData.objectId}"
      >
        ${historicalFigureData[`name_${lang}`]}
      </h1>
    </div>
  </a>`;
