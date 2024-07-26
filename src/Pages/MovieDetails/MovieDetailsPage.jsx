import React, {useEffect, useState} from 'react';
import {Box, Typography, CircularProgress, Paper, Grid, Chip, Skeleton} from '@mui/material';
import axios from "axios";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import {Favorite, FavoriteBorder, Star} from "@mui/icons-material";
import Button from "@mui/material/Button";

function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const GetMovieDetails = () => {
        axios.get('https://api.themoviedb.org/3/movie/' + params.id,
            {
                params: {
                    api_key: process.env.REACT_APP_MOVIEDB_API_KEY
                }
            })
            .then((data) => {
                setLoading(false);
                console.log(data)
                setMovie(data.data);
            })
            .catch((error) => {
                setLoading(false);

                setError(error.message);
            });
    }
    useEffect(() => {
        // Replace with your actual API endpoint
        GetMovieDetails();
    }, [movie]);

    if (loading) {
        return <Container>
            <br/>
            <Skeleton variant="rectangular" width="100%" height="70vh"/>
            <br/>
            <br/>

        </Container>;
    }

    if (!movie || error) {
        return <Typography variant="h6">No movie details available</Typography>;
    }


    return (
        <Container sx={{padding: 2}}>
            <Paper elevation={3} sx={{padding: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <br/>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            style={{width: '100%', borderRadius: '8px'}}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                        <Typography variant="h6" gutterBottom>{movie.tagline}</Typography>
                        <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
                        <Typography variant="h6" gutterBottom>Release Date: {movie.release_date}</Typography>
                        <Typography variant="h6" gutterBottom>Genres:</Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                            {movie.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name}/>
                            ))}
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Rating: {movie.vote_average}
                            &nbsp;
                            <Star sx={{color: 'yellow', fontSize: '1.2rem'}}/>
                        </Typography>
                        <Typography variant="h6" gutterBottom>Vote Count: {movie.vote_count}</Typography>
                        <Typography variant="h6" gutterBottom>Popularity: {movie.popularity}</Typography>
                        <Typography variant="h6" gutterBottom>Budget: ${movie.budget.toLocaleString()}</Typography>
                        <Typography variant="h6" gutterBottom>Revenue: ${movie.revenue.toLocaleString()}</Typography>
                        <Typography variant="h6" gutterBottom>Runtime: {movie.runtime} minutes</Typography>
                        <Typography variant="h6" gutterBottom>Homepage: <a href={movie.homepage} target="_blank"
                                                                           rel="noopener noreferrer">{movie.homepage}</a></Typography>
                        <Button
                            variant="contained"
                            color={isFavorite ? "secondary" : "primary"}
                            startIcon={isFavorite ? <Favorite/> : <FavoriteBorder/>}
                            onClick={toggleFavorite}
                            sx={{
                                marginTop: 2,
                                borderRadius: 0,
                                height: "5vh",
                            }}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
            <br/>
        </Container>
    );
}

export default MovieDetailsPage;