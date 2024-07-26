import Container from "@mui/material/Container";
import {Link as RoutLink} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {Image, Star} from "@mui/icons-material";


/*
*
adult:false
backdrop_path:"/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg"
genre_ids:(4) [16, 10751, 12, 35]
id:1022789
original_language:"en"
original_title:"Inside Out 2"
overview:"Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone."
popularity:4728.541
poster_path:"/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg"
release_date:"2024-06-11"
title:"Inside Out 2"
video:false
vote_average:7.633
vote_count:2076*/
function MovieComponent(props) {

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
        </Container>
    )
}

export default MovieComponent;