import type { FC } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

import type { SuggestedTherapistsColumns } from "@internal/types";
import type {
    CompatibilityReasons,
    CompatibilityScore,
} from "@internal/types/src/compatibility-reasons";

import { useI18n } from "../../i18n/i18n-object";

import "./compatibility-reasons-popup.scss";

interface PopupProps {
    row: SuggestedTherapistsColumns | undefined;
    open: boolean;
    handleClosePopup: () => void;
}

export const CompatibilityReasonsPopup: FC<PopupProps> = ({
    row,
    open,
    handleClosePopup,
}) => {
    const i18n = useI18n((i) => i.compatibilityReasonsPopupText);

    const renderIcon = (value: CompatibilityScore) => {
        let icon;

        if (value === "-1") {
            icon = <CloseIcon sx={{ fontSize: 17 }} />;
        } else if (value === "1") {
            icon = <CheckIcon sx={{ fontSize: 17 }} />;
        } else if (value === "0") {
            icon = <QuestionMarkIcon sx={{ fontSize: 18 }} />;
        }

        return icon;
    };

    const compatibilityReasons = row?.compatibilityReasons;
    return (
        <Dialog open={open} onClose={handleClosePopup} dir="rtl">
            <DialogTitle color="secondary" variant="h5" className="dialog-title">
                {i18n.compatibilityReasons}
            </DialogTitle>
            <DialogContent
                sx={{ backgroundColor: "background.default" }}
                className="dialog-content"
            >
                {compatibilityReasons &&
                    Object.keys(compatibilityReasons).length > 0 && (
                        <DialogContent>
                            {Object.keys(compatibilityReasons).map((key) => {
                                const reasonKey = key as keyof CompatibilityReasons;

                                return (
                                    <div className="reason-div" key={reasonKey}>
                                        <Typography color="secondary">
                                            {renderIcon(
                                                compatibilityReasons[reasonKey],
                                            )}
                                        </Typography>
                                        <Typography variant="h6">
                                            {i18n[reasonKey]}
                                        </Typography>
                                    </div>
                                );
                            })}
                        </DialogContent>
                    )}
            </DialogContent>
            <DialogActions className="close-button">
                <Button onClick={handleClosePopup}>{i18n.close}</Button>
            </DialogActions>
        </Dialog>
    );
};
