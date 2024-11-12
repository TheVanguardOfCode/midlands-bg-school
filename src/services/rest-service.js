import * as keys from "./api-keys.js";
const host = keys.host;
const applicationId = keys.applicationId;
const restApiKey = keys.restApiKey;
const request = async (url, options) => {
  try {
    const response = await fetch(host + url, options);
    if (response.ok === false) {
      const error = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};
const createOption = (method = "GET", data) => {
  const headers = {
    "X-Parse-Application-Id": applicationId,
    "X-Parse-REST-API-Key": restApiKey,
  };
  if (data !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  const options = {
    method,
    headers,
  };
  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }
  return options;
};
// GET request
export const get = async (url, data) => {
  return request(url, createOption("GET", data));
};
