import { fetchLocale } from "../i18n/fetch-locale";
import { NavData } from "../model/nav-data.types";

// Type guard to validate the structure of navData
function isNavData(data: unknown): data is NavData {
    return (
        typeof data === "object" &&
        data !== null &&
        Array.isArray((data as NavData).links) &&
        (data as NavData).links.every(
            (item: any) =>
                typeof item.isDropdown === "boolean" &&
                typeof item.dataI18n === "string" &&
                (item.isDropdown ? Array.isArray(item.dropdownLinks) : true) &&
                (item.dropdownLinks
                    ? item.dropdownLinks.every(
                          (link: any) => typeof link.dataI18n === "string"
                      )
                    : true)
        )
    );
}

export const getNavData: () => Promise<NavData> = async () => {
    const data = (await fetchLocale("nav-data")) as unknown;
    if (isNavData(data)) {
        return data;
    } else {
        throw new Error("Invalid nav data structure");
    }
};
