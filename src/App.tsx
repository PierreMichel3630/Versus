import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./i18n/config";

import { Colors } from "./style/Colors";

import Routes from "./routes";

import "moment/dist/locale/de";
import "moment/dist/locale/es";
import "moment/dist/locale/fr";
import { Helmet } from "react-helmet-async";
import { useUser } from "./context/UserProvider";

function App() {
  const { mode, language } = useUser();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: Colors.purple,
                },
                secondary: {
                  main: Colors.greyLightMode,
                },
                text: {
                  primary: Colors.black,
                  secondary: Colors.grey2,
                },
                background: {
                  default: Colors.white,
                },
              }
            : {
                primary: {
                  main: Colors.purple,
                },
                secondary: {
                  main: Colors.grey,
                },
                background: {
                  default: "#171c24",
                },
                text: {
                  primary: Colors.white,
                  secondary: Colors.white,
                },
              }),
        },
        typography: {
          fontFamily: ["Dosis Variable", "sans-serif"].join(","),
          h1: {
            fontSize: 60,
            fontWeight: 700,
          },
          caption: {
            fontSize: 15,
            fontWeight: 500,
          },
          body1: {
            fontSize: 14,
            fontWeight: 500,
          },
          body2: {
            fontSize: 11,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 11,
            },
          },
          h2: {
            fontSize: 35,
            fontWeight: 700,
          },
          h3: {
            fontSize: 18,
            fontWeight: 700,
          },
          h4: {
            fontSize: 16,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 14,
            },
          },
          h6: {
            fontSize: 13,
            fontWeight: 600,
            "@media (max-width:600px)": {
              fontSize: 12,
            },
          },
        },
        components: {
          MuiBottomNavigationAction: {
            styleOverrides: {
              label: {
                fontSize: "15px !important",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: language.iso,
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
