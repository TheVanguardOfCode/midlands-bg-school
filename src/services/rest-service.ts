import * as keys from "./api-keys";
const host: string = keys.host;
const applicationId = keys.applicationId;
const restApiKey = keys.restApiKey;

const request = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const response = await fetch(host + url, options);
        if (response.ok === false) {
            const error = await response.json();
            throw error;
        }
        const result = await response.json();
        return result as T;
    } catch (err) {
        throw err;
    }
};

const createOption = (
    method: string = "GET",
    data?: Record<string, any>
): RequestInit => {
    const headers: { [key: string]: string } = {
        "X-Parse-Application-Id": applicationId,
        "X-Parse-REST-API-Key": restApiKey,
    };

    if (data !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
        method,
        headers,
    };

    if (data !== undefined) {
        options.body = JSON.stringify(data);
    }
    return options;
};

// GET request
export const get = async <T>(
    url: string,
    data?: Record<string, any>
): Promise<T> => {
    return request(url, createOption("GET", data));
};
