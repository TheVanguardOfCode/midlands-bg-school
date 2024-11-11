import { get } from "./rest-service.js";
const endPoints = {
  allHistoricalFigures: "/classes/HistoricalFigures",
};
export const getHistoricalFiguresData = async () => {
  const url = endPoints.allHistoricalFigures;
  return get(url);
};
