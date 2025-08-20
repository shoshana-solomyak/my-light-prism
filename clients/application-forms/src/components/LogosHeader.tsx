import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";

/**
 * This component creating the header with the logos
 */
export const LogosHeader: FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <IconButton onClick={() => void navigate("/")}>
                <img
                    style={{
                        objectFit: "contain",
                        width: "150px",
                    }}
                    src="/images/rays-of-light-logo.svg"
                    alt="rays of light logo"
                />
            </IconButton>
        </div>
    );
};
