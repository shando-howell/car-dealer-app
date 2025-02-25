"use client";

import { useQueryState } from "nuqs";
import { ChangeEvent, useRef } from "react";
import { useCallback } from "react";
import debounce from "debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

function debounceFunc<T extends (...args: any) => any>(
    func: T,
    wait: number,
    opts: {immediate: boolean}
) {
    return debounce(func, wait, opts);
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const SearchInput = (props: SearchInputProps) => {
    const {className, ...rest} = props;

    const [q, setSearch] = useQueryState("q", {shallow: false});
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = useCallback(
        debounceFunc(
            (value: string) => {
                setSearch(value || null);
            },
            1000,
            { immediate: false },
        ),
        []
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        handleSearch(newValue);
    }

    return (
        <form className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
                ref={inputRef}
                defaultValue={q || ""}
                className={cn(className, "pl-8")}
                onChange={onChange}
                type="text"
                {...rest}
            />
        </form>
    )
}