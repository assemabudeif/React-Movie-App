import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Movie, Star} from "@mui/icons-material";
import {Link as RouterLink} from 'react-router-dom';
import {Drawer} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";


const pages = [
    {
        title: 'Home',
        path: "/"
    },
    {
        title: 'Search',
        path: "/search"
    },
    {
        title: 'Login',
        path: '/login'
    },
    {
        title: 'Register',
        path: '/register',
    },
    {
        title: 'Favorites',
        path: '/favorites',
    }
];

function ResponsiveAppBar() {
    const state = useSelector(state => state);
    const favLength = state.favorites.favorites.length;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [open, setOpen] = useState(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const toggleDrawer = (state) => {
        setOpen(state);
    }

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'black',
            color: 'white',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Movie sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Movie App
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => toggleDrawer(true)}
                            color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            open={open}
                            onClose={() => toggleDrawer(false)}
                            anchor="left"
                        >
                            <Box sx={{
                                width: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'top',
                                alignItems: 'center',
                                height: '100vh',
                                backgroundColor: 'white',
                                marginTop: '2vh',
                            }}>
                                {pages.map((page) => (
                                    <Button
                                        textAlign="center"
                                        component={RouterLink}
                                        to={page.path}
                                        onClick={() => toggleDrawer(false)}
                                        sx={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            marginBottom: '1vh',
                                        }}>
                                        {page.title}
                                    </Button>
                                ))}
                            </Box>
                        </Drawer>

                    </Box>
                    <Movie sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Movie App
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                onClick={handleCloseNavMenu}
                                component={RouterLink}
                                to={page.path}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.title}
                            </Button>
                        ))}
                        &nbsp;
                        &nbsp;
                        <Box sx={{
                            padding: '0.5vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Star sx={{color: 'yellow', fontSize: '1.5rem'}}/>
                            &nbsp;
                            <Typography variant="h6" sx={{color: 'white', display: 'inline'}}>
                                {favLength}
                            </Typography>
                        </Box>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
