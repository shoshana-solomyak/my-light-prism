import { useSearchParams } from "react-router-dom";

import { type AdminTableProps, type GenericRow } from "@hilma/forms";

import { StyledAdminTable } from "./StyledAdminTable";

export const GenericAdminTable = <
    TRow extends GenericRow,
    TResultsKey extends PropertyKey = "results",
    TCountKey extends PropertyKey = "count",
>(
    props: AdminTableProps<TRow, TResultsKey, TCountKey>,
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <StyledAdminTable
            {...props}
            searchbar
            setQueryParams={setSearchParams}
            queryParams={searchParams}
        />
    );
};
