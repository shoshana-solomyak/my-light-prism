import { type FC } from "react";

import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-object";
import { BreadcrumbsComponent } from "../BreadcrumbsComponent";
import { TherapistsAdminTable } from "./TherapistsAdminTable";

const InternalTherapistsPage: FC<{}> = () => {
    const i18n = useI18n((i) => i.general);
    return (
        <div className="therapists-page">
            <BreadcrumbsComponent currentPage={i18n.therapists} />
            <TherapistsAdminTable />
        </div>
    );
};

export const TherapistsPage = withAuth(InternalTherapistsPage, {
    access: "private",
});
