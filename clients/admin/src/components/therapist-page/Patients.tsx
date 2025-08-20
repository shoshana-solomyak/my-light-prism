import { type FC } from "react";

import { Typography } from "@mui/material";

import { useI18n } from "../../i18n/i18n-object";
import { StyledPaper } from "../common/StyledPaper";

export const Patients: FC = () => {
    const i18n = useI18n((i) => i.therapistPageText.tabs);
    return (
        <StyledPaper>
            <Typography variant="h2">{i18n.patients}</Typography>
        </StyledPaper>
    );
};
