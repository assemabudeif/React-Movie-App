import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, } from '@mui/material/styles';
import {createTheme} from "@mui/material";
import {} from "@mui/material/colors";

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
      <ThemeProvider theme={theme}>
          <App/>
      </ThemeProvider>
  </React.StrictMode>
);

