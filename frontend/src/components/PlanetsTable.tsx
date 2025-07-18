import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import SearchInput from "./SearchInput";
import { createColumns } from "./planets/columns";
import type { SortField, SortOrder } from "@/services/planets/types";
import Loading from "./Loading";
import { usePlanets } from "@/services/planets/hooks";
import { DataTable } from "./DataTable";

export default function PlanetsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, refetch, isLoading } = usePlanets({
    page: currentPage,
    search: debouncedSearchTerm || undefined,
    sort_by: sortBy,
    order: sortOrder,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSortChange = useCallback(
    (field: SortField) => {
      if (sortBy === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(field);
        setSortOrder("asc");
      }
      setCurrentPage(1);
    },
    [sortBy, sortOrder]
  );

  const columns = useMemo(
    () =>
      createColumns({
        onSortChange: handleSortChange,
        sortBy,
        sortOrder,
      }),
    [handleSortChange, sortBy, sortOrder]
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">
          ⚠️ The Force is not strong with this one...
        </div>
        <p className="text-slate-400 mb-4">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const planetsData = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = data?.total_pages || 1;

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search planets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {data && (
        <div className="text-sm text-muted-foreground">
          Showing {planetsData.length} of {totalCount} result
          {totalCount !== 1 ? "s" : ""}
          {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
        </div>
      )}

      {planetsData === undefined || isLoading ? (
        <Loading message="Loading galactic data..." />
      ) : (
        <DataTable
          columns={columns}
          data={planetsData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
