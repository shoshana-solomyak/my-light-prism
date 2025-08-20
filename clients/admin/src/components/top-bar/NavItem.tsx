import type { FC } from "react";
import { useLocation } from "react-router-dom";

import { Button, styled } from "@mui/material";
import clsx from "clsx";

import { trimSlashes } from "../../common/functions/trim-slashes.function";
import type { NavigationItem } from "../../common/types/navigation-item.interface";
import { InvisibleStyledLink } from "../common/InvisibleStyledLink";

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "1.2rem",
    marginInline: "0.5rem",

    "&:not(.nav-item-selected)": {
        letterSpacing: 0.75,
        fontWeight: "normal",
    },

    "&.nav-item-selected": {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
    },
}));

export const NavItem: FC<NavigationItem> = ({ label, navigateTo }) => {
    const { pathname } = useLocation();

    const isTabSelected = trimSlashes(pathname)
        .toLowerCase()
        .split("/")[0]
        .includes(trimSlashes(navigateTo).split("/")[0].slice(0, -1));

    return (
        <StyledButton
            tabIndex={isTabSelected ? 1 : undefined}
            className={clsx(isTabSelected && "nav-item-selected")}
        >
            <InvisibleStyledLink to={navigateTo}>{label}</InvisibleStyledLink>
        </StyledButton>
    );
};
