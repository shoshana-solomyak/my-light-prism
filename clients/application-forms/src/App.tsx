import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import { AuthProvider, type RequestUserType } from "@hilma/auth-client";
import { AlertProvider } from "@hilma/forms";
import { provide } from "@hilma/tools";

import { type AuthToken } from "@internal/types";

import Details from "./components/Details";
import PatientHistory from "./components/History";
import { LandingPage } from "./components/LandingPage";
import NotFoundPage from "./components/NotFoundPage";
import RegisterForTherapist from "./components/RegisterForTherapist";
import { TraumaPage } from "./components/TraumaPage";
import { PatientLoginPage } from "./components/patient/PatientLoginPage";
import { I18nProvider } from "./i18n/i18n-object";
import { theme } from "./style/mui-theme/theme";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/landing-page" replace />,
    },

    {
        path: "/patient",
        children: [
            { path: "login", element: <PatientLoginPage /> },
            { path: "personal-details", element: <Details /> },
            { path: "trauma", element: <TraumaPage /> },
            { path: "personal-history", element: <PatientHistory /> },
        ],
    },
    {
        path: "/therapist",
        children: [{ path: "register", element: <RegisterForTherapist /> }],
    },

    { path: "/landing-page", element: <LandingPage /> },
    { path: "*", element: <NotFoundPage /> },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

const authProviderProps = {
    fetchToken: async () => {
        const { data } = await axios.get<AuthToken>("/api/auth/jwt-token");
        if (!data) return null;
        return data.token;
    },
    fetchAuthData: async () => {
        const { data } = await axios.get<RequestUserType>(
            "/api/auth/authenticate/patient",
        );
        return data;
    },
    redirectOnPrivate: (user: RequestUserType | null) => {
        if (!user) return "/patient/login";
        return "/patient/trauma";
    },
    redirectOnPublic: () => {
        return "/patient/trauma";
    },
};

const AppWithProviders = provide(
    [ThemeProvider, { theme }],
    [I18nProvider, { router: false }],
    [LocalizationProvider, { dateAdapter: AdapterDayjs, adapterLocale: "he" }],
    [QueryClientProvider, { client: queryClient }],
    [AuthProvider, authProviderProps],
    AlertProvider,
)(App);

export default AppWithProviders;
