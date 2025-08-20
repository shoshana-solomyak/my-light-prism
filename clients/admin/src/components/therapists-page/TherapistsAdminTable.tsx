import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { type GenericColumn } from "@hilma/forms";

import { type TherapistsColumns } from "@internal/types";

import formatDate from "../../common/functions/format-date";
import { useI18n } from "../../i18n/i18n-object";
import { GenericAdminTable } from "../common/GenericAdminTable";

export const TherapistsAdminTable: FC<{}> = () => {
    const navigate = useNavigate();
    const i18n = useI18n((i) => i.adminTableText);

    const columns: GenericColumn<TherapistsColumns>[] = [
        { key: "firstName", label: i18n.firstName },
        { key: "lastName", label: i18n.lastName },
        {
            key: "createdAt",
            label: i18n.createdAt,
            renderColumn: ({ createdAt }) => formatDate(createdAt),
        },
        {
            key: "updatedAt",
            label: i18n.updatedAt,
            renderColumn: ({ updatedAt }) => formatDate(updatedAt),
        },
    ];
    return (
        <GenericAdminTable<TherapistsColumns>
            id="therapists-admin-table"
            rowsUrl="/api/therapist/all"
            rowId="id"
            columns={columns}
            arrowColumn
            navigationFunction={(id) => void navigate(`/therapist/${id}`)}
        />
    );
};
