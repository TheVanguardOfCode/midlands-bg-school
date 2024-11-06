export const getLocalStorageData = (dataKey) => {
  const dataJson = localStorage.getItem(dataKey);
  if (dataJson) {
    return JSON.parse(dataJson);
  }
  return null;
};
export const setLocalStorageData = (dataKey, dataValue) => {
  localStorage.setItem(dataKey, JSON.stringify(dataValue));
};
export const removeLocalStorageData = (dataKey) => {
  localStorage.removeItem(dataKey);
};
