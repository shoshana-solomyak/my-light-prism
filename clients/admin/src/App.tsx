import { type ComponentProps, type FC } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import { AuthProvider, type RequestUserType } from "@hilma/auth-client";
import { RTL } from "@hilma/forms";
import { AlertProvider } from "@hilma/forms";
import { provide } from "@hilma/tools";

import type { AuthToken } from "@internal/types";
import { NotFoundPage } from "@internal/ui";

import { CenterDetailsPage } from "./components/center-details/CenterDetailsPage";
import { LoginPage } from "./components/login-page/LoginPage";
import { ApplicationDashboard } from "./components/patient-page/ApplicationDashboard";
import { PatientPage } from "./components/patient-page/PatientPage";
import { PatientPersonalDetails } from "./components/patient-page/PatientPersonalDetails";
import { TraumaDashboard } from "./components/patient-page/TraumaDashboard";
import { PatientsPage } from "./components/patients-page/PatientsPage";
import { Patients } from "./components/therapist-page/Patients";
import { TherapistPage } from "./components/therapist-page/TherapistPage";
import { TherapistPersonalDetails } from "./components/therapist-page/TherapistPersonalDetails";
import { TherapistsPage } from "./components/therapists-page/TherapistsPage";
import "./components/therapists-page/TherapistsPage";
import { TopbarLayout } from "./components/top-bar/Topbar";
import { I18nProvider } from "./i18n/i18n-object";
import { theme } from "./style/mui-theme/theme";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <LoginPage /> },
    {
        element: <TopbarLayout />,
        children: [
            {
                path: "/therapists",
                element: <TherapistsPage />,
            },
            {
                path: "/therapist/:id",
                element: <TherapistPage />,
                children: [
                    { path: "patients", element: <Patients /> },
                    {
                        path: "personal-details",
                        element: <TherapistPersonalDetails />,
                    },
                ],
            },
            {
                path: "/patients",
                element: <PatientsPage />,
            },
            {
                path: "/patient/:id",
                element: <PatientPage />,
                children: [
                    {
                        path: "application-dashboard",
                        element: <ApplicationDashboard />,
                    },
                    {
                        path: "personal-details",
                        element: <PatientPersonalDetails />,
                    },
                    { path: "trauma-dashboard", element: <TraumaDashboard /> },
                ],
            },
            {
                path: "/center-details",
                element: <CenterDetailsPage />,
            },
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);

/**
 * Extracting the props type from `AuthProvider` since it is not exported from `@hilma/forms`
 */
type AuthProviderProps = Omit<ComponentProps<typeof AuthProvider>, "children">;

const authProviderProps: AuthProviderProps = {
    fetchToken: async () => {
        const { data } = await axios.get<AuthToken>("api/auth/refresh-token");
        if (!data) return null;
        return data.token;
    },
    fetchAuthData: async () => {
        const { data } = await axios.get<RequestUserType>(
            "/api/auth/authenticate/admin",
        );
        return data;
    },
    redirectOnPrivate: (user: RequestUserType | null) => {
        if (!user) return "/login";
        return "/patients";
    },
    redirectOnPublic: () => {
        return "/patients";
    },
    fetchRefresh: async () => {
        const { data } = await axios.get("/api/auth/refresh");
        return data.accessToken;
    },
};

const InternalApp: FC = () => {
    return <RouterProvider router={router} />;
};

export const App = provide(
    [I18nProvider, { router: false }],
    [QueryClientProvider, { client: queryClient }],
    [RTL, { active: true }],
    [ThemeProvider, { theme }],
    [AuthProvider, authProviderProps],
    AlertProvider,
)(InternalApp);
