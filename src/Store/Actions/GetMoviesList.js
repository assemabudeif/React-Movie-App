import { AxiosInstance } from "../../Network/AxiosInstance";

export const GetMoviesList = (data) => (dispatch) => {
    return AxiosInstance.get("movie/" + data.moviesType, {
        params: {
            api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
            page: data.page,
            language: data.lang || "en"
        }
    }).then(
        (res) => dispatch({
            type: 'GET_MOVIES_LIST',
            payload: res.data
        }),
    ).catch((error) => console.error(error.message));
}