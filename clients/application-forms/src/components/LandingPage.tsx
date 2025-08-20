import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography, styled } from "@mui/material";

import { useI18n } from "../i18n/i18n-object";
import { theme } from "../style/mui-theme/theme";
import { StaticInformationPage } from "./StaticInformationPage";

const StyledButton = styled(Button)(() => ({
    borderRadius: "4rem",
    border: `3px solid ${theme.palette.primary.main}`,
    minWidth: "23rem",
    fontSize: "2rem",
}));

const StyledHeader = styled(Typography)(() => ({
    color: theme.palette.primary.main,
}));

export const LandingPage: FC = () => {
    const navigate = useNavigate();
    const i18n = useI18n((i) => i.landingPageText);

    return (
        <>
            <StaticInformationPage
                imageSrc="/images/women-talking-on-couch.svg"
                imageAlt="women talking on couch"
            >
                <Stack>
                    <StyledHeader variant="h1"> {i18n.raysOfLight}</StyledHeader>
                </Stack>
                <Stack direction="row" useFlexGap gap="2vh">
                    <StyledButton
                        onClick={() => void navigate("/patient/personal-details")}
                        variant="contained"
                    >
                        {i18n.startTreatment}
                    </StyledButton>
                    <StyledButton
                        onClick={() => void navigate("/therapist/register")}
                        variant="outlined"
                        data-cy="therapist-register"
                    >
                        {i18n.registerForTherapist}
                    </StyledButton>
                </Stack>
            </StaticInformationPage>
        </>
    );
};
