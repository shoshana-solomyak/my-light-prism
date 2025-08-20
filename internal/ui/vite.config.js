import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths({ root: "." })],
    build: {
        lib: {
            entry: "src/index.ts",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["@mui/material", "react", "react-dom", "react-router-dom"],
        },
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
});
