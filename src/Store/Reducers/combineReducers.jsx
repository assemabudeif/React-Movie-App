import {combineReducers} from "redux";
import FavoritesReducer from "./FavoriteReducer";

export default combineReducers({
    favorites: FavoritesReducer,
})