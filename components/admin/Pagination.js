"use client";

import { Button } from "@/components/ui/Button";

export function Pagination({ currentPage, totalPages, onPrevious, onNext, totalItems, pageSize }) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {totalItems} gyms
      </p>

      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={onPrevious} disabled={currentPage <= 1}>
          Previous
        </Button>
        <span className="text-sm font-medium text-foreground">
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>
        <Button type="button" variant="outline" size="sm" onClick={onNext} disabled={currentPage >= totalPages || totalPages === 0}>
          Next
        </Button>
      </div>
    </div>
  );
}