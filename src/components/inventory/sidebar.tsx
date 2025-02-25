"use client";

import type { AwaitedPageProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { routes } from "@/config/route";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { SearchInput } from "../shared/search-input";

interface SidebarProps extends AwaitedPageProps {
    minMaxValues: any;
}

export const Sidebar = ({minMaxValues, searchParams}: SidebarProps) => {
    const router = useRouter();
    const [filterCount, setFilterCount] = useState(0);

    const [queryStates, setQueryStates] = useQueryStates({
        make: parseAsString.withDefault(""),
        model: parseAsString.withDefault(""),
        modelVariant: parseAsString.withDefault(""),
        minYear: parseAsString.withDefault(""),
        maxYear: parseAsString.withDefault(""),
        minPrice: parseAsString.withDefault(""),
        maxPrice: parseAsString.withDefault(""),
        minReading: parseAsString.withDefault(""),
        maxReading: parseAsString.withDefault(""),
        currency: parseAsString.withDefault(""),
        odoUnit: parseAsString.withDefault(""),
        transmission: parseAsString.withDefault(""),
        fuelType: parseAsString.withDefault(""),
        bodyType: parseAsString.withDefault(""),
        colour: parseAsString.withDefault(""),
        doors: parseAsString.withDefault(""),
        seats: parseAsString.withDefault(""),
        ulezCompliance: parseAsString.withDefault(""),
    }, {
        shallow: false,
    })

    useEffect(() => {
        const filterCount = Object.entries(searchParams as Record<string, string>).filter(
            ([key, value]) => key !== 'page' && value
        ).length;

        setFilterCount(filterCount);
    }, [searchParams]);

    const clearFilters = () => {
        const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
        window.location.replace(url.toString());
        setFilterCount(0);
    }

    return (
        <div className="py-4 bg-white border-r border-muted block">
            <div>
                <div className="text-lg w-[16.25rem] font-semibold flex justify-between px-4">
                    <span>Filters</span>
                    <button
                        type="button"
                        onClick={clearFilters}
                        aria-disabled={!filterCount}
                        className={cn(
                            "text-sm text-gray-500 py-1",
                            !filterCount
                                ? "disabled opacity-50 pointer-events-none cursor-default"
                                : "hover:underline cursor-pointer",
                        )}
                    >Clear all {filterCount ? `(${filterCount})` : null}</button>
                </div>
                <div className="mt-2" />
            </div>
            <div className="p-4">
                <SearchInput />
            </div>
        </div>
    )
}