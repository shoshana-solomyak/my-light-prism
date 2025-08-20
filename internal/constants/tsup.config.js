import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    format: ["cjs", "esm"],
    sourcemap: !!options.watch,
    minify: !options.watch,
    clean: !options.watch,
}));
