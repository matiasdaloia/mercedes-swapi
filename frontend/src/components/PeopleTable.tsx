import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import SearchInput from "./SearchInput";
import { DataTable } from "./people/data-table";
import { createColumns } from "./people/columns";
import { usePeople } from "@/services/people/hooks";
import type { SortField, SortOrder } from "@/services/people/types";
import Loading from "./Loading";

export default function PeopleTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, refetch, isLoading } = usePeople({
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

  const peopleData = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = data?.total_pages || 1;

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search people..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {data && (
        <div className="text-sm text-muted-foreground">
          Showing {peopleData.length} of {totalCount} result
          {totalCount !== 1 ? "s" : ""}
          {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
        </div>
      )}

      {peopleData === undefined || isLoading ? (
        <Loading message="Loading galactic beings..." />
      ) : (
        <DataTable
          columns={columns}
          data={peopleData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
