import { type SxProps, type Theme } from "@mui/material";
import { alpha } from "@mui/material";

import { AdminTable, type AdminTableProps, type GenericRow } from "@hilma/forms";

/**
 * Did type assertion because hilma forms doesn't support the type with the theme
 */

const containerSx = ((theme: Theme) => ({
    ".MuiTableContainer-root.AdminTable-container": {
        backgroundColor: theme.palette.background.paper,
        padding: "1rem",
        borderRadius: "10px",
    },
    ".MuiTableRow-root.MuiTableRow-head.AdminTable-row": {
        borderBottom: "none",
        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
        fontWeight: 600,

        "& .MuiTableCell-root": {
            textAlign: "center",
            borderBottom: "none",
        },
    },
    ".MuiTableCell-root": {
        textAlign: "center",
    },
    ".MuiStack-root.AdminTable-header": {
        height: "fit-content",
        padding: 0,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    ".MuiStack-root.AdminTable-headers-container": {
        flexDirection: "row",
        alignItems: "center",
        mb: "0.5rem",
    },
    ".MuiFormControl-root.MuiTextField-root.AdminTable-searchbar": {
        borderRadius: "10px",
        padding: "0.5rem",
        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
        alignSelf: "center",
        justifySelf: "flex-end",
        ".MuiInputBase-root::before,.MuiInputBase-root::after": {
            borderBottom: "none",
        },
        ".MuiInputBase-input": {
            color: theme.palette.primary.main,
            fontSize: "1.15em",
        },
    },
    ".AdminTable-paginationFooter-root": {
        color: theme.palette.primary.main,
        margin: "0.5rem 0",
    },
    ".AdminTable-title": {
        textDecoration: "none",
    },
})) as SxProps<Theme>;

export const StyledAdminTable = <
    TRow extends GenericRow,
    TResultsKey extends PropertyKey = "results",
    TCountKey extends PropertyKey = "count",
>(
    props: AdminTableProps<TRow, TResultsKey, TCountKey>,
) => {
    return (
        <AdminTable
            {...props}
            resultAmountText={() => {
                return "";
            }}
            styled
            containerSx={containerSx as SxProps}
        />
    );
};
