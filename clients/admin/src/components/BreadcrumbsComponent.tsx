import type { FC } from "react";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Breadcrumbs, Typography } from "@mui/material";

import { InvisibleStyledLink } from "./common/InvisibleStyledLink";

interface ParentPages {
    text: string;
    link: string;
}
interface BreadcrumbsComponentProps {
    currentPage: string;
    parentPages?: ParentPages[];
}

export const BreadcrumbsComponent: FC<BreadcrumbsComponentProps> = ({
    currentPage,
    parentPages,
}) => {
    const parentPagesBreadcrumbs = parentPages?.map((parentPage) => (
        <InvisibleStyledLink key={parentPage.text} to={parentPage.link}>
            <Typography variant="h3" color="text.disabled">
                {parentPage.text}
            </Typography>
        </InvisibleStyledLink>
    ));
    const breadcrumbs = [
        parentPagesBreadcrumbs,
        <Typography key="3" variant="h3">
            {currentPage}
        </Typography>,
    ];
    return (
        <Breadcrumbs
            sx={{
                margin: "1rem",
            }}
            separator={<ChevronLeftRoundedIcon color="secondary" />}
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
};
