import { fetchLocale } from "../i18n/fetch-locale.js";
const isNavData = (data) => {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray(data.links) &&
    data.links.every(
      (item) =>
        typeof item.isDropdown === "boolean" &&
        typeof item.dataI18n === "string" &&
        (item.isDropdown ? Array.isArray(item.dropdownLinks) : true) &&
        (item.dropdownLinks
          ? item.dropdownLinks.every(
              (link) => typeof link.dataI18n === "string",
            )
          : true),
    )
  );
};
export const getNavData = async () => {
  const data = await fetchLocale("nav-data");
  if (isNavData(data)) {
    return data;
  } else {
    throw new Error("Invalid nav data structure");
  }
};
