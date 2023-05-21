import { BrowserRouter, Routes, Route } from "react-router-dom";
import { red } from "@mui/material/colors";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import List from "./container/List";
import Detail from "./container/Detail";

let theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
      fab: {
        main: "#FFFDC4",
      },
    },
    secondary: {
      main: "#D8D8D8",
    },
    text: {
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: "8px",
          color: "#FFFFFF",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFDC4",
        },
      },
    },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 1000,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  // },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<List />} path="/" />
          <Route element={<Detail />} path="/launch/:id" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
