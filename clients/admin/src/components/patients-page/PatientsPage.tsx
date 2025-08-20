import { type FC } from "react";

import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-object";
import { BreadcrumbsComponent } from "../BreadcrumbsComponent";
import { PatientsAdminTable } from "./PatientsAdminTable";

const InternalPatientsPage: FC = () => {
    const i18n = useI18n((i) => i.general);
    return (
        <div className="patients-page">
            <BreadcrumbsComponent currentPage={i18n.patients} />
            <PatientsAdminTable />
        </div>
    );
};

export const PatientsPage = withAuth(InternalPatientsPage, { access: "private" });
