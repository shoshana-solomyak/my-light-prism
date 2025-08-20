import swc from "unplugin-swc";
import { defineProject, mergeConfig } from "vitest/config";

import sharedConfig from "../vitest.config.ts";

export default mergeConfig(
    sharedConfig,
    defineProject({
        test: {
            globalSetup: "../setup-tests.ts", // TODO I don't sure it works
        },
        plugins: [
            swc.vite({
                module: { type: "es6" },
            }),
        ],
    }),
);
