// This file is imported in main.tsx, before any other imports.
// You can use it to load plugins/extensions for libraries, set global configuration,
// and the like.
import axios from "axios";

import { isCapacitor } from "@hilma/tools";

if (isCapacitor()) {
    // This block will only run in a (non-web) Capacitor build.
    // You can use it to do app-specific configuration.

    // Since we're running in an app, we can't count on Vite's proxy,
    // so we send each request to our server's domain.
    axios.interceptors.request.use((config) => {
        config.baseURL = import.meta.env.VITE_DOMAIN;
        return config;
    });
}
