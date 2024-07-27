import axios from "axios";
import AppStore from "../Store/Store";
import { setLoader } from "../Store/Actions/LoaderAction ";
export const AxiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});



AxiosInstance.interceptors.request.use(function (config) {

    AppStore.dispatch(setLoader(true))
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {

    AppStore.dispatch(setLoader(false));

    return response;
}, function (error) {
    return Promise.reject(error);
});
