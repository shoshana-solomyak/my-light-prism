import { AppBar, Button, Toolbar } from "@mui/material";

import { useLogoutMutation } from "@hilma/auth-client";

import type { NavigationItem } from "../../common/types/navigation-item.interface";
import { useI18n } from "../../i18n/i18n-object";
import { NavItem } from "./NavItem";

export const Navbar = () => {
    const i18n = useI18n((i18n) => i18n.general);
    const logoutMutation = useLogoutMutation("/api/auth/logout");

    const tabs: NavigationItem[] = [
        { label: i18n.patients, navigateTo: "/patients" },
        { label: i18n.therapists, navigateTo: "/therapists" },
        { label: i18n.centerDetails, navigateTo: "/center-details" },
    ];

    return (
        <AppBar
            color="inherit"
            position="sticky"
            sx={{ padding: "0.3rem" }}
            elevation={3}
        >
            <Toolbar>
                {tabs.map((tab) => (
                    <NavItem key={tab.navigateTo} {...tab} />
                ))}
                <Button
                    className="logout-button"
                    variant="outlined"
                    onClick={() => logoutMutation.mutate()}
                    sx={{
                        margin: "auto",
                        marginInlineEnd: "unset",
                    }}
                >
                    {i18n.logout}
                </Button>
            </Toolbar>
        </AppBar>
    );
};
