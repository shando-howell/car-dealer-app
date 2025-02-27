"use client";

import type { AwaitedPageProps } from "@/config/types";
import { useState, type ChangeEvent, useEffect } from "react";
import { Select } from "../ui/select";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";

interface TaxonomyFiltersProps extends AwaitedPageProps {
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

type FilterOptions<LType, VType> = Array<{
    label: LType;
    value: VType;
}>;

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
    const { searchParams, handleChange } = props;

    const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
    const [models, setModels] = useState<FilterOptions<string, string>>([]);
    const [modelVariants, setModelVariants] = useState<FilterOptions<string, string>>([]);

    useEffect(() => {
        (async function fetchMakesOptions() {
            const params = new URLSearchParams();
            for (const [k, v] of Object.entries(
                searchParams as Record<string, string>
            )) {
                if (v) params.set(k, v as string);
            }
            const url = new URL(endpoints.taxonomy, window.location.href)

            url.search = params.toString();

            const data = await api.get<{
                makes: FilterOptions<string, string>;
                models: FilterOptions<string, string>;
                modelVariants: FilterOptions<string, string>;
            }>(url.toString());

            setMakes(data.makes);
            setModels(data.models);
            setModelVariants(data.modelVariants);
        })()
    }, [searchParams])

    return (
        <>
            <Select 
                label="Make"
                name="make"
                value={searchParams?.make as string}
                options={makes}
                onChange={handleChange}
            />

            <Select 
                label="Model"
                name="model"
                value={searchParams?.model as string}
                options={models}
                onChange={handleChange}
                disabled={!models.length}
            />

            <Select 
                label="Model Variant"
                name="modelVariant"
                value={searchParams?.modelVariant as string}
                options={modelVariants}
                onChange={handleChange}
                disabled={!modelVariants.length}
            />
        </>
    )
};