import { type FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Box, Divider, Tab, Tabs } from "@mui/material";

import type { NavigationItem } from "../../common/types/navigation-item.interface";

interface TabsNavBarProps {
    tabs: NavigationItem[];
}

export const TabsNavBar: FC<TabsNavBarProps> = ({ tabs }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const selectedTabIndex = tabs.findIndex((tab) =>
        pathname.includes(tab.navigateTo),
    );

    if (selectedTabIndex === -1) return <Navigate to={tabs[0].navigateTo} />;

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        void navigate(tabs[newValue].navigateTo);
    };

    return (
        <Box marginBottom="1rem">
            <Tabs value={selectedTabIndex} onChange={handleChange}>
                {tabs.map((tab, i) => (
                    <Tab label={tab.label} key={tab.label} value={i} />
                ))}
            </Tabs>
            <Divider />
        </Box>
    );
};
