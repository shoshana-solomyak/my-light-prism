import { Link } from "react-router-dom";

import { styled } from "@mui/material";

export const InvisibleStyledLink = styled(Link)(() => ({
    color: "inherit",
    textDecoration: "none",
}));
