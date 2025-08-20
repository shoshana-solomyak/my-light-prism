import type { FC, PropsWithChildren } from "react";

import { Box, Stack, styled } from "@mui/material";

import { LogosHeader } from "./LogosHeader";

const StyledStaticPageContainer = styled(Stack)(() => ({
    padding: "2vh 1vw",
    minHeight: "100vh",
}));

const StyledDescriptionContainer = styled(Stack)(() => ({
    marginBlock: "auto",
    width: "50%",
    padding: "4rem",
}));

const StyledImageContainer = styled(Box)(() => ({
    position: "fixed",
    bottom: 0,
    left: "1vw",
    img: {
        width: "50vw",
    },
}));

interface StaticInformationPageProps extends PropsWithChildren {
    imageSrc: string;
    imageAlt: string;
}

/**
 * This component create a static information page (home page, end page, etc...).
 * @param children - The children of the static information page
 * @param imageSrc - The source image
 * @param imageAlt - The source image alt
 */
export const StaticInformationPage: FC<StaticInformationPageProps> = ({
    children,
    imageSrc,
    imageAlt,
}) => {
    return (
        <StyledStaticPageContainer>
            <LogosHeader />
            <StyledDescriptionContainer useFlexGap rowGap="5vh">
                {children}
            </StyledDescriptionContainer>
            <StyledImageContainer>
                <img src={imageSrc} alt={imageAlt} />
            </StyledImageContainer>
        </StyledStaticPageContainer>
    );
};
