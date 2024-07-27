import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import SearchPage from "./Pages/Search/SearchPage";
import MovieDetailsPage from "./Pages/MovieDetails/MovieDetailsPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import FooterComponent from "./Components/FooterComponent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import FavoritesPage from "./Pages/Favorites/FavoritesPage";
import { LangContext } from "./Context/LangContext";

function App() {
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    const dispatch = useDispatch();
    const [lang, setLang] = useState("en");

    console.log("Lang: ", lang);


    useEffect(() => {
        dispatch({ type: "SET_FAVORITE", payload: favoriteMovies });
        // dispatch(GetMoviesList({ moviesType: "popular", page: 1 }));

    }, []);


    return (
        <div dir={lang === "en" ? "ltr" : "rtl"}>
            <LangContext.Provider value={{ lang, setLang }}>
                <BrowserRouter>
                    <ResponsiveAppBar />
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/login" component={LoginPage} exact />
                        <Route path="/register" component={RegisterPage} exact />
                        <Route path="/search" component={SearchPage} exact />
                        <Route path={"/movie/:id"} component={MovieDetailsPage} exact />
                        <Route path={"/favorites"} component={FavoritesPage} exact />
                    </Switch>
                    <FooterComponent />
                </BrowserRouter>
            </LangContext.Provider>
        </div>
    );
}

export default App;
