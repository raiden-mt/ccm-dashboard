"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

export interface TablePaginationProps {
  /** The name of the URL search param to use for the page number */
  pageParamName: string;
  /** Total number of items across all pages */
  totalItems: number;
  /** Number of items per page */
  pageSize: number;
  /** Maximum number of page buttons to show (default: 5) */
  maxVisiblePages?: number;
  /** Whether to show the page size selector (default: false) */
  showPageSizeSelector?: boolean;
  /** Available page sizes when selector is shown */
  pageSizeOptions?: number[];
  /** The name of the URL search param for page size (required if showPageSizeSelector is true) */
  pageSizeParamName?: string;
  /** Additional className for the container */
  className?: string;
}

/**
 * A reusable pagination component that syncs with URL search params via nuqs.
 * Uses shadcn's Pagination components for consistent styling.
 */
export function TablePagination({
  pageParamName,
  totalItems,
  pageSize,
  maxVisiblePages = 5,
  showPageSizeSelector = false,
  pageSizeOptions = [10, 15, 25, 50, 100],
  pageSizeParamName,
  className,
}: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useQueryState(
    pageParamName,
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const [currentPageSize, setCurrentPageSize] = useQueryState(
    pageSizeParamName ?? "pageSize",
    parseAsInteger.withDefault(pageSize).withOptions({ shallow: false })
  );

  const effectivePageSize = showPageSizeSelector ? currentPageSize : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalItems / effectivePageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  // Calculate which page numbers to display
  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    // Calculate start and end of the visible range
    let start = Math.max(2, safePage - half + 1);
    let end = Math.min(totalPages - 1, safePage + half - 1);

    // Adjust if we're near the beginning
    if (safePage <= half + 1) {
      end = maxVisiblePages - 1;
    }

    // Adjust if we're near the end
    if (safePage >= totalPages - half) {
      start = totalPages - maxVisiblePages + 2;
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("ellipsis");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      void setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size: string) => {
    void setCurrentPageSize(parseInt(size, 10));
    // Reset to page 1 when page size changes
    void setCurrentPage(1);
  };

  const visiblePages = getVisiblePages();
  const startItem = (safePage - 1) * effectivePageSize + 1;
  const endItem = Math.min(safePage * effectivePageSize, totalItems);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 sm:flex-row",
        className
      )}
    >
      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <span>
          Showing {startItem} - {endItem} of {totalItems.toLocaleString()}
        </span>
        {showPageSizeSelector && pageSizeParamName && (
          <div className="flex items-center gap-2">
            <span>per page:</span>
            <Select
              value={currentPageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(safePage - 1);
              }}
              aria-disabled={safePage <= 1}
              className={cn(
                safePage <= 1 &&
                  "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {visiblePages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={page === safePage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(safePage + 1);
              }}
              aria-disabled={safePage >= totalPages}
              className={cn(
                safePage >= totalPages &&
                  "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

