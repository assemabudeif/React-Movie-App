import Box from "@mui/material/Box";
import {Grid, Pagination, Skeleton, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import MovieComponent from "../../Components/MovieComponent";
import {grey, red} from "@mui/material/colors";

function SearchPage() {
    const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    const [searchMovies, setSearchMovies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearchChange = (event, value) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    }

    const GetSearchMovies = () => {
        setPage(1);
        setTotalPages(1);
        setLoading(true);
        setError("");
        axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            {
                params: {
                    "api_key": apiKey,
                    "query": searchText,
                }
            })
            .then(response => {
                setLoading(false);
                setSearchMovies(response.data.results);
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
        GetSearchMovies();
    }, [searchText, page]);

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
                marginTop: "3.5vh",

            }}>
                <TextField title={"Search"} variant={"outlined"} fullWidth={false} placeholder={"Search for a movie"}
                           sx={{
                               width: "30%",
                               height: "5vh",
                               borderRadius: "0.5vh",
                               backgroundColor: "white",
                               color: "black",
                           }} value={searchText}
                           onChange={handleSearchChange}
                />
                <Button title={"Search"} variant={"contained"} fullWidth={false} sx={{
                    width: "7%",
                    height: "6.5vh",
                    borderRadius: "0.5vh",
                    backgroundColor: "black",
                    color: "white",
                    marginLeft: "1vh",
                    marginTop: "1vh",

                }} onClick={GetSearchMovies}
                >Search</Button>
            </Box>

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
                                searchMovies.map((movie, index) => (
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
                {
                    searchMovies.length === 0 && (
                        <Box>
                            <h1 style={{
                                color: grey[500],
                                textAlign: "center",
                                fontSize: "2rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                height: "80vh",
                            }}>Empty</h1>
                        </Box>)
                }

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {searchMovies.length !== 0 && (
                    <Pagination count={totalPages} page={page} onChange={ChangePage} showFirstButton showLastButton
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    marginBottom: "2vh"
                                }}/>)}
            </Box>
        </>
    );
}

export default SearchPage;