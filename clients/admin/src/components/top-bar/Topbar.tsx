import { Outlet } from "react-router-dom";

import { Box, styled } from "@mui/material";

import { Navbar } from "./Navbar";

const StyledPageContainer = styled(Box)({
    padding: "1.5em",
});

export const TopbarLayout = () => {
    return (
        <>
            <Navbar />
            <StyledPageContainer>
                <Outlet />
            </StyledPageContainer>
        </>
    );
};
