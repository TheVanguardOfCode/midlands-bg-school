export const getLocalStorageData = (dataKey) => {
  const dataJson = localStorage.getItem(dataKey);
  if (dataJson) {
    return dataJson;
  }
  return null;
};
export const setLocalStorageData = (dataKey, dataValue) => {
  localStorage.setItem(dataKey, JSON.stringify(dataValue));
};
export const removeLocalStorageData = (dataKey) => {
  sessionStorage.removeItem(dataKey);
};
