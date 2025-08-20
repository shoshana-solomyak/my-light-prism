import { type FC } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { withAuth } from "@hilma/auth-client";
import { useAlert } from "@hilma/forms";

import { PATIENT_TABS } from "../../common/constants/tabs";
import { type UserData } from "../../common/types/user-data.interface";
import { useI18n } from "../../i18n/i18n-object";
import { BreadcrumbsComponent } from "../BreadcrumbsComponent";
import { TabsNavBar } from "../common/TabsNavBar";

const InternalPatientPage: FC = () => {
    const i18n = useI18n((i) => ({ ...i.patientPageText, ...i.general }));
    const { id } = useParams();
    const showAlert = useAlert();
    const { data, isLoading } = useQuery({
        queryKey: ["patient", id],
        queryFn: async () => {
            try {
                const res = await axios.get<UserData>(`/api/patient/${id}`);
                return res.data;
            } catch (err) {
                showAlert(`error:${err}`, "error", "ltr");
            }
        },
    });

    const tabs = Object.entries(PATIENT_TABS).map(([key, value]) => ({
        label: i18n.tabs[key as keyof typeof i18n.tabs],
        navigateTo: value,
    }));

    if (isLoading) return <h1>loading....</h1>;
    if (!data) return <h1>patient not found</h1>;

    return (
        <>
            <BreadcrumbsComponent
                currentPage={`${data.firstName} ${data.lastName}`}
                parentPages={[{ text: i18n.patients, link: "/patients" }]}
            />
            <TabsNavBar tabs={tabs} />
            <Box height="70vh" overflow="visible auto">
                <Outlet />
            </Box>
        </>
    );
};

export const PatientPage = withAuth(InternalPatientPage, { access: "private" });
