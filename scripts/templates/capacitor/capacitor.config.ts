import { CapacitorConfig } from "@capacitor/cli";

// TODO: replace this with your app's actual ID and name!
const config: CapacitorConfig = {
    appId: "com.hilma.appId",
    appName: "App Name",
    webDir: "dist",
    plugins: {
        // Use native app HTTP requests, not from the browser
        CapacitorHttp: {
            enabled: true,
        },
        // Use native app cookies, not from the browser
        CapacitorCookies: {
            enabled: true,
        },
    },
};

export default config;
