"use client";

import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationRoot
} from "@/components/ui/pagination"
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { cn } from "@/lib/utils";

interface PaginationProps {
    baseUrl: string;
    totalPages: number;
    maxVisiblePages: number | undefined;
    styles: {
        paginationRoot: string;
        paginationPrevious: string;
        paginationNext: string;
        paginationLink: string;
        paginationLinkActive: string;
    }
}

export const CustomPagination = (props: PaginationProps) => {
    const {baseUrl, totalPages, maxVisiblePages = 5, styles } = props;
    const [currentPage, setPage] = useQueryState("page", {
        defaultValue: 1,
        parse: (value) => {
            const parsed = Number.parseInt(value, 10);
            return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
        },
        serialize: (value) => value.toString(),
        shallow: false,
    });

    const [visibleRange, setVisibleRange] = useState({
        start: 1,
        end: Math.min(maxVisiblePages, totalPages)
    });

    useEffect(() => {
        const halfVisible = Math.floor(maxVisiblePages / 2);
        const newStart = Math.max(1, Math.min(currentPage - halfVisible, totalPages - maxVisiblePages));
        const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
        setVisibleRange({start: newStart, end: newEnd})
    }, [currentPage, totalPages, maxVisiblePages])

    const createPageUrl = (pageNumber: number) => {
        const url = new URL(baseUrl, env.NEXT_PUBLIC_APP_URL);
        url.searchParams.set("page", pageNumber.toString());
        return url.toString();
    }

    const handleEllipsisClick = (direction: "left" | "right") => {
        const newPage =
            direction === "left"
                ? Math.max(1, visibleRange.start - maxVisiblePages)
                : Math.min(totalPages, visibleRange.end + maxVisiblePages)

        setPage(newPage);
    };

    return (
        <PaginationRoot className={styles.paginationRoot}>
            <PaginationContent className="lg:gap-4">
                <PaginationItem>
                    <PaginationPrevious 
                        className={cn(
                            currentPage <= 1 && "hidden",
                            styles.paginationPrevious,
                        )}
                        href={createPageUrl(currentPage - 1)}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setPage(currentPage - 1);
                        }}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink>...</PaginationLink>
                </PaginationItem>

                {/* Pages go here */}

                <PaginationItem>
                    <PaginationLink>...</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </PaginationRoot>
    )
}