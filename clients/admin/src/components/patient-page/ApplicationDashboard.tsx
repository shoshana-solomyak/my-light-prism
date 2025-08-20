import { type FC, useState } from "react";

import { Button } from "@mui/material";

import { type GenericColumn } from "@hilma/forms";

import type { SuggestedTherapistsColumns } from "@internal/types";

import { useI18n } from "../../i18n/i18n-object";
import { GenericAdminTable } from "../common/GenericAdminTable";
import { StyledPaper } from "../common/StyledPaper";
import { CompatibilityReasonsPopup } from "./CompatibilityReasonsPopup";

export const ApplicationDashboard: FC = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const i18n = useI18n((i) => ({
        ...i.patientPageText,
    }));
    const [rowInfo, setRowInfo] = useState<SuggestedTherapistsColumns>();
    const handleSetOpenPopup = (row: SuggestedTherapistsColumns) => {
        setOpenPopup(true);
        setRowInfo(row);
    };
    const onClosePopup = () => setOpenPopup(false);

    const columns: GenericColumn<SuggestedTherapistsColumns>[] = [
        { key: "therapistName", label: i18n.applicationDashboard.therapistName },
        {
            key: "compatibilityPercentage",
            label: i18n.applicationDashboard.compatibilityPercentage,
        },
        {
            key: "compatibilityReasons",
            label: "",
            renderColumn: (row) => {
                return (
                    <Button
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.main,
                        }}
                        className="compatibility-reasons-button"
                        variant="contained"
                        onClick={() => handleSetOpenPopup(row)}
                    >
                        {i18n.applicationDashboard.compatibilityReasons}
                    </Button>
                );
            },
        },
    ];

    return (
        <StyledPaper>
            <GenericAdminTable<SuggestedTherapistsColumns>
                id="therapist-suggestion-table"
                rowsUrl="/api/patient/therapist-suggestions"
                rowId="id"
                columns={columns}
                title={i18n.applicationDashboard.assignmentSuggestions}
            />
            <CompatibilityReasonsPopup
                row={rowInfo}
                open={openPopup}
                handleClosePopup={onClosePopup}
            />
        </StyledPaper>
    );
};
