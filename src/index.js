import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider,} from '@mui/material/styles';
import {createTheme} from "@mui/material";
import {} from "@mui/material/colors";
import {Provider} from "react-redux";
import AppStore from "./Store/Store";
import {LangContext} from "./Context/LangContext";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
    },
});
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={AppStore}>
            <ThemeProvider
                theme={theme}>
                <App/>

            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

