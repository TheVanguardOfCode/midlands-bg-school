export type HistoricalFigure = {
    objectId: string;
    name_en: string;
    name_bg: string;
    hrefInfo: string;
    hrefImg: string;
    createdAt: string;
    updatedAt: string;
    row?: string;
    side?: string;
    name?: string;
    [key: string]: string | undefined;
};

export type HistoricalFiguresData = {
    results: HistoricalFigure[];
};

export type HistoricalFigureElement = {
    el: HTMLElement;
    elStartingOffsetTop: number;
    elStartingOffsetLeft: number;
    elStartingOffsetWidth: number;
    elPerantWidth: number;
    side: string | null;
    row: string | null;
};
