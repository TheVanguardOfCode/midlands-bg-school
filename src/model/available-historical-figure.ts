export type HistoricalFigure = {
  objectId: string;
  name_bg: string;
  hrefInfo: string;
  hrefImg: string;
  row?: string;
  side?: string;
  name?: string;
  [key: string]: string | undefined;
};

export type HistoricalFigureData = {
  results: HistoricalFigure[];
};
