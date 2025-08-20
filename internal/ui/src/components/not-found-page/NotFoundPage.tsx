import notFoundImg from "@assets/images/not-found.svg";

import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "3%",
    padding: "0.5rem 2rem",
    borderRadius: "10px",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
    },
}));
export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <Stack justifyContent="center" alignItems="center" height="100vh">
            <img src={notFoundImg} />
            <StyledButton onClick={() => void navigate(-1)}>
                בחזרה לעמוד הקודם {/*// TODO: use i18n package */}
            </StyledButton>
        </Stack>
    );
};
