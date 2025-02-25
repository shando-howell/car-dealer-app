"use client";

import type { AwaitedPageProps } from "@/config/types";
import type { ChangeEvent } from "react";
import { Select } from "../ui/select";

interface TaxonomyFiltersProps extends AwaitedPageProps {
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
    const { searchParams, ...rest} = props;

    return (
        <Select 
            label="Make"
            name="make"
            value={searchParams?.make as string}
            options={[]}
            onChange={() => null}
        />
    )
};