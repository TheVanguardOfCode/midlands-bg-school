type HistoricalFigure = {
    objectId: string;
    name_en: string;
    name_bg: string;
    hrefInfo: string;
    hrefImg: string;
};

export type HistoricalFigureData = {
    results: HistoricalFigure[];
};
