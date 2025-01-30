import axios, { AxiosRequestConfig, CancelToken } from "axios";

export const urlBackend = import.meta.env.VITE_API_URL;

export const bearer_json = (token: string, cancelToken?: CancelToken) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        },
        cancelToken: cancelToken
    };
    return axios.create(config);
}

export const bearer_form = (token: string, cancelToken?: CancelToken) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        },
        cancelToken: cancelToken
    };
    return axios.create(config);
}

export const http_json = (cancelToken?: CancelToken) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        cancelToken: cancelToken
    };
    return axios.create(config);
};

export const http_form = (cancelToken?: CancelToken) => {
    const config: AxiosRequestConfig = {
        baseURL: urlBackend,
        headers: {
            "Content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        },
        cancelToken: cancelToken
    };
    return axios.create(config);
}