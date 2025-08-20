import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useI18n } from "../../i18n/i18n-object";
import { AdminDetailsTable } from "./AdminDetailsTable";

export const InfoItem: React.FC<{ title: string; value: string }> = ({
    title,
    value,
}) => {
    return (
        <Typography>
            <Typography
                component="span"
                sx={{ color: "secondary.main", fontWeight: "bold" }}
            >
                {title}:{" "}
            </Typography>
            {value}
        </Typography>
    );
};
export function CenterDetailsPage() {
    const i18n = useI18n((i) => i.centerDetails);

    const { data } = useQuery({
        queryKey: ["center details"],
        queryFn: async () => {
            try {
                const res = await axios.get(`/api/healthcare-center/details`);
                return res.data;
            } catch (err) {
                alert(`error:${err}`);
            }
        },
    });

    return (
        <Stack spacing={5}>
            <Typography
                variant="h1"
                sx={{ paddingLeft: "2rem", paddingTop: "2rem" }}
                color="secondary"
            >
                {i18n.centerDetails}
            </Typography>
            <Stack
                component="div"
                direction="row"
                justifyContent="space-around"
                sx={{ backgroundColor: "white", padding: "2rem" }}
            >
                <InfoItem title={i18n.centerName} value={data?.name} />
                <InfoItem title={i18n.address} value={data?.address} />
                <InfoItem title={i18n.phoneNumber} value={data?.phoneNumber} />
            </Stack>

            <AdminDetailsTable />
        </Stack>
    );
}
