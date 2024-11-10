import { HistoricalFigure } from "../model/available-historical-figure";
import { html, TemplateResult } from "../lib";
export const homeViewHistoricalFigureCardTemplate = (
    historicalFigureData: HistoricalFigure,
    lang: string
): TemplateResult =>
    html` <a
        href="${historicalFigureData.hrefInfo}"
        target="_blank"
        class="historical-figure ${historicalFigureData.row}-row-${historicalFigureData.side}"
        side="${historicalFigureData.side}"
        row="${historicalFigureData.row}">
        <div class="historical-figure-img">
            <img
                src="${historicalFigureData.hrefImg}"
                alt="${historicalFigureData.name}" />
        </div>
        <div class="historical-figure-data">
            <h1 class="name">${historicalFigureData[`name_${lang}`]}</h1>
        </div>
    </a>`;
