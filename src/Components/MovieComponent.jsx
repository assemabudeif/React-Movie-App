import Container from "@mui/material/Container";
import {Link as RoutLink} from "react-router-dom";
import Box from "@mui/material/Box";
import {Delete, Favorite, FavoriteBorder, Image, Star} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";

function MovieComponent(props) {

    const [isFavorite, setIsFavorite] = useState(false);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const CheckFavorite = () => {
        state.favorites.favorites.map((movie) => {
            if (movie.id === props.movie.id) {
                setIsFavorite(true);
                return true;

            }
            return false;
        });
    }
    const ToggleFavorites = (e) => {
        e.preventDefault();
        if (isFavorite) {
            setIsFavorite(false);
            const index = favorites.indexOf(props.movie);
            favorites.splice(index, 1);

            localStorage.setItem("favorites", JSON.stringify(favorites));
            dispatch({type: "SET_FAVORITE", payload: favorites});
        } else {
            setIsFavorite(true);
            favorites.push(props.movie);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            dispatch({type: "SET_FAVORITE", payload: favorites});
        }
        setIsFavorite(!isFavorite);
    }

    const DeleteFavorite = (e) => {
        e.preventDefault();
        favorites.splice(props.index, 1);

        localStorage.setItem("favorites", JSON.stringify(favorites));
        dispatch({type: "SET_FAVORITE", payload: favorites});

    }

    useEffect(() => {
        CheckFavorite();
    }, []);


    return (
        <Container component={RoutLink} to={"/movie/" + props.movie.id} sx={{
            padding: "1vh",
            paddingTop: "2vh",
            paddingBottom: "2vh",
            color: "black",
            ":link": {
                textDecoration: "none",
                color: "black"
            },
            textAlign: "center",
            borderRadius: "1vh",
            "& h1": {
                fontSize: "1.5rem"
            },
            "& img": {
                borderRadius: "1vh",
                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"
            },
            "&:hover img": {
                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)",
            },
            "&:hover h1": {
                color: "blue",
            },
            "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)"
            },
            transition: "all 0.5s",
            height: "55vh",
            width: "100%",

        }}>
            <div style={{
                width: "auto",
                height: "90%",
                position: "relative",
            }}>
                {/*
                Add Rate Component Here above the image as a Circular Progress
                */}
                <Box sx={{
                    position: "absolute",
                    top: "1vh",
                    right: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    borderRadius: "1vh",
                    padding: "0.5vh",
                    fontSize: "1.5rem",
                }}>
                    <Star sx={{
                        color: "yellow",
                        fontSize: "1.5rem",
                        marginRight: "0.5vh"
                    }}/>
                    {props.movie.vote_average}
                </Box>
                {
                    props.movie.poster_path !== null ? (
                        <img src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path} style={{
                            width: "auto",
                            height: "100%"
                        }} alt={props.movie.title}/>) : (<Image style={{
                        width: "auto",
                        height: "100%"
                    }}/>)
                }
            </div>

            <h2>{props.movie.title}</h2>
            <span>{props.movie.release_date}</span>
            {
                props.favPage ? (
                        <IconButton
                            onClick={DeleteFavorite}
                            sx={{
                                color: "red",
                                marginLeft: "2vw",
                                width: "auto",
                                height: "auto",

                            }}>
                            <Delete sx={{
                                fontSize: "2rem"
                            }}/>
                        </IconButton>
                    ) :
                    (<IconButton onClick={ToggleFavorites}
                                 sx={{
                                     color: isFavorite ? "red" : "gray",
                                     marginLeft: "2vw",
                                     width: "auto",
                                     height: "auto",
                                 }}>
                        {isFavorite ? <Favorite
                            sx={{
                                fontSize: "2rem"
                            }}/> : <FavoriteBorder
                            sx={{
                                fontSize: "2rem"
                            }}/>}
                    </IconButton>)
            }
        </Container>
    )
}

export default MovieComponent;