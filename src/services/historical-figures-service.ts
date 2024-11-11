import { get } from "./rest-service.js";
import { HistoricalFiguresData } from "../model/available-historical-figure";

const endPoints: { [key: string]: string } = {
    allHistoricalFigures: "/classes/HistoricalFigures",
};

export const getHistoricalFiguresData =
    async (): Promise<HistoricalFiguresData> => {
        const url = endPoints.allHistoricalFigures;
        return get<HistoricalFiguresData>(url);
    };
