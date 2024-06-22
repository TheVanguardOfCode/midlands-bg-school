export const fetchLocale = async (locale) => {
    try {
        const response = await fetch(`../../src/locales/${locale}.json`);
        const responseContentType = response.headers
            .get("Content-Type")
            ?.split(";")[0];
        if (responseContentType !== "application/json") {
            throw new Error(`Error! Status: ${locale}.json doesn't exist`);
        }
        return await response.json();
    }
    catch (error) {
        throw error;
    }
};
