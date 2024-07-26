import Container from "@mui/material/Container";
import {
    Grid,
    Pagination,
    Skeleton,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import MovieComponent from "../../Components/MovieComponent";
import Box from "@mui/material/Box";
import {red} from "@mui/material/colors";

function HomePage() {
    const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    const moviesLists = [
        {
            title: "Popular",
            value: "popular",
        },
        {
            title: "Now Playing",
            value: "now_playing",
        },
        {
            title: "Top Rated",
            value: "top_rated",
        },
        {
            title: "Upcoming",
            value: "upcoming",
        },
    ];

    const [moviesType, setMoviesType] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSelectChange = (event) => {
        setPage(1);
        setTotalPages(1);
        setMoviesType(event.target.value);
    }

    const GetMovies = () => {
        setLoading(true);
        setError("");
        axios.get(
            `https://api.themoviedb.org/3/movie/${moviesType}`,
            {
                params: {
                    "api_key": apiKey,
                    "page": page,
                }
            })
            .then(response => {
                setLoading(false);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
                console.log(response.data);

            })
            .catch(error => {
                setLoading(false);
                console.error(error);
                setError(error.message);
                console.log(error);
            });
    }

    const ChangePage = (event, value) => {
        setPage(value);

    }

    useEffect(() => {
        GetMovies();
    }, [moviesType, page]);

    return (
        <>
            <Container sx={{
                paddingTop: "2vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ToggleButtonGroup
                    color="primary"
                    value={moviesType}
                    exclusive
                    onChange={handleSelectChange}
                    aria-label="movies type">
                    {
                        moviesLists.map((list, index) => (
                            <ToggleButton value={list.value}>{list.title}</ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>

            </Container>
            <Box sx={{
                padding: "2vh"
            }}>
                <br/>
                <br/>

                {
                    loading ? (
                            (<Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                                   alignContent={"center"}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                                        <Grid item lg={3}>
                                            <Skeleton variant="rectangular" width="100%" height={"40vh"} sx={{
                                                borderRadius: "1vh",
                                                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"
                                            }}/>
                                            <Skeleton variant="text" width="80%" height={"10vh"} sx={{
                                                borderRadius: "0.5vh",
                                            }}/>
                                            <Skeleton variant="text" width="60%" height={"5vh"} sx={{
                                                borderRadius: "0.5vh",
                                            }}/>

                                        </Grid>
                                    ))
                                }
                            </Grid>)
                        ) :
                        (<Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                               alignContent={"center"}>
                            {
                                movies.map((movie, index) => (
                                    <Grid item lg={3} md={6} sm={12}>
                                        <MovieComponent movie={movie}/>
                                    </Grid>
                                ))
                            }
                        </Grid>)
                }
                {
                    error !== "" && (
                        <Box>
                            <h1 style={{
                                color: red[500],
                                textAlign: "center",
                                fontSize: "2rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                height: "80vh",
                                textShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"
                            }}>{error}</h1>
                        </Box>)
                }

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Pagination count={totalPages} page={page} onChange={ChangePage} showFirstButton showLastButton sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginBottom: "2vh"
                }}/>
            </Box>
        </>

    );
}

export default HomePage;