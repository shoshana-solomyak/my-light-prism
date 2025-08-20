import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#225296",
        },
        secondary: {
            main: "#6d9ad9",
        },
        error: {
            main: "#DF5858",
        },
        text: {
            primary: "#334C5C",
            disabled: "#babfc2",
        },

        background: { default: "#F5F5F5", paper: "#FFF" },
    },
    typography: {
        fontFamily: ["Assistant", "sans-serif"].join(", "),
        h1: {
            fontSize: "7rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "2.1rem",
        },
        h4: {
            fontSize: "1.2rem",
        },
    },

    /**
     * @see file: `./mui-theme.d.ts` for TS
     */
    breakpoints: {
        values: {
            comp: 1024,
        },
    },
});
