import { useNavigate } from "react-router-dom";

import { type GenericColumn } from "@hilma/forms";

import { type PatientsColumns } from "@internal/types";

import formatDate from "../../common/functions/format-date";
import { useI18n } from "../../i18n/i18n-object";
import { GenericAdminTable } from "../common/GenericAdminTable";

export const PatientsAdminTable = () => {
    const i18n = useI18n((i) => i.adminTableText);
    const navigate = useNavigate();
    const columns: GenericColumn<PatientsColumns>[] = [
        { key: "firstName", label: i18n.firstName },
        { key: "lastName", label: i18n.lastName },
        {
            key: "createdAt",
            label: i18n.createdAt,
            renderColumn: ({ createdAt }) => {
                return formatDate(createdAt);
            },
        },
        {
            key: "updatedAt",
            label: i18n.updatedAt,
            renderColumn: ({ updatedAt }) => {
                return formatDate(updatedAt);
            },
        },
    ];
    return (
        <>
            <GenericAdminTable<PatientsColumns>
                id="patients-admin-table"
                rowsUrl="/api/patient/all"
                rowId="id"
                columns={columns}
                arrowColumn
                navigationFunction={(id) => void navigate(`/patient/${id}`)}
            />
        </>
    );
};
