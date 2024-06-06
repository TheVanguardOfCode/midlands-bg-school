export const getLocalStorageData = (dataKey: string): string | null => {
    const dataJson: string | null = localStorage.getItem(dataKey);
    if (dataJson) {
        return dataJson;
    }
    return null;
};

export const setLocalStorageData = (dataKey: string, dataValue: any): void => {
    localStorage.setItem(dataKey, JSON.stringify(dataValue));
};

export const removeLocalStorageData = (dataKey: string): void => {
    sessionStorage.removeItem(dataKey);
};
