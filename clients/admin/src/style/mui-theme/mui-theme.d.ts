declare module "@mui/material/styles" {
    // TypeScript for when using the theme

    // eslint-disable-next-line no-unused-vars -- used in createTheme
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        /**
         * Computer screen breakpoint (=1024)
         */
        comp: true;
    }
}

export {}; // Ensures the file is treated as a module
