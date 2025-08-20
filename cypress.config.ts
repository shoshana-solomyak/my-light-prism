import { defineConfig } from "cypress";

export default defineConfig({
    env: {},
    e2e: {
        baseUrl: "http://localhost:5174", //? If testing multiple clients, we'll have to set up tests for configurable port
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
