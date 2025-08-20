import { useState } from "react";

import { Paper } from "@mui/material";

import { withAuth } from "@hilma/auth-client";

import { ConfirmCodeForm } from "./ConfirmCodeForm";
import { SendCodeForm } from "./SendCodeForm";

const InternalPatientLoginPage = () => {
    const [codeHasBeenSent, setCodeHasBeenSent] = useState(false);

    const handleCodeSent = () => setCodeHasBeenSent(true);

    return (
        <Paper
            sx={{
                width: "fit-content",
                margin: "25vh auto",
                backgroundColor: "background.default",
                padding: "3rem",
            }}
        >
            {!codeHasBeenSent ? (
                <SendCodeForm onCodeSent={handleCodeSent} />
            ) : (
                <ConfirmCodeForm />
            )}
        </Paper>
    );
};

export const PatientLoginPage = withAuth(InternalPatientLoginPage, {
    access: "public-only",
});
