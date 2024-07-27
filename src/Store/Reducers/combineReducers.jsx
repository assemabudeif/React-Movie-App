import { combineReducers } from "redux";
import FavoritesReducer from "./FavoriteReducer";
import MoviesReducer from "./MoviesReducer";
import LoaderReducer from "./LoaderReducer";

export default combineReducers({
    favorites: FavoritesReducer,
    movies: MoviesReducer,
    loader: LoaderReducer,
})