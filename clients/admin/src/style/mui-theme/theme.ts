import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#225296",
        },
        secondary: {
            main: "#6d9ad9",
            contrastText: "white",
        },
        error: {
            main: "#DF5858",
        },
        text: {
            primary: "#334C5C",
            disabled: "#babfc2",
        },

        background: { paper: "#FFF", default: "#F5F5F5" },
    },
    typography: (palette) => ({
        fontFamily: ["Assistant", "sans-serif"].join(", "),
        h1: {
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            color: palette.primary.main,
        },
        h2: {
            fontSize: "2.1rem",
            color: palette.secondary.main,
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: palette.secondary.main,
        },
        h4: {
            fontSize: "1.2rem",
            color: palette.primary.main,
        },
        h5: {
            fontSize: "1.2rem",
            fontWeight: "750",
        },
        h6: {
            fontSize: "1rem",
        },
        button: {
            fontSize: "1rem",
            fontWeight: "600",
            color: palette.primary.main,
        },
    }),

    /**
     * @see file: `./mui-theme.d.ts` for TS
     */
    breakpoints: {
        values: {
            comp: 1024,
        },
    },
});
