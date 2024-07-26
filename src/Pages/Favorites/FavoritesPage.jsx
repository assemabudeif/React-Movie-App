import {useSelector} from "react-redux";
import {Grid} from "@mui/material";
import MovieComponent from "../../Components/MovieComponent";
import Box from "@mui/material/Box";

function FavoritesPage() {
    const state = useSelector(state => state);
    const favoriteMovies = state.favorites.favorites;

    return (
        <Box sx={{
            margin: "auto",
            marginTop: "2nh",
            padding: "10px",
        }}>
            {
                favoriteMovies.length === 0 &&
                (
                    <Box sx={
                        {
                            textAlign: "center",
                            color: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            height: "68vh",
                        }
                    }>
                        <h1>No Favorite Movies</h1>
                    </Box>
                )

            }
            <Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                  alignContent={"center"}>
                {
                    favoriteMovies.map((movie, index) => (
                        <Grid item lg={3} md={6} sm={12}>
                            <MovieComponent movie={movie} favPage={true} index={index}/>
                        </Grid>
                    ))
                }
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        </Box>
    );
}

export default FavoritesPage;