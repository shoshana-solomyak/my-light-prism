import swc from "unplugin-swc";
import { defineProject } from "vitest/config";

export default defineProject({
    test: {
        globals: true,
        environment: "node",
        globalSetup: "../setup-tests.ts", // TODO I don't sure it works
    },
    plugins: [
        swc.vite({
            module: { type: "es6" },
        }),
    ],
});
