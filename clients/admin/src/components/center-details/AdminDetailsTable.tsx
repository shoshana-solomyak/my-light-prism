import type { FC } from "react";

import type { GenericColumn } from "@hilma/forms";

import { type AdminDetailsColumns } from "@internal/types";

import { useI18n } from "../../i18n/i18n-object";
import { GenericAdminTable } from "../common/GenericAdminTable";

export const AdminDetailsTable: FC = () => {
    const i18n = useI18n((i) => i.centerDetails);

    const columns: GenericColumn<AdminDetailsColumns>[] = [
        { key: "fullName", label: i18n.fullName },
        { key: "phoneNumber", label: i18n.phoneNumber },
        { key: "username", label: i18n.email },
    ];
    return (
        <GenericAdminTable<AdminDetailsColumns>
            id="center-admins-table"
            rowsUrl="/api/admin/all-by-id"
            rowId="id"
            columns={columns}
            title={i18n.centerAdmins}
        />
    );
};
