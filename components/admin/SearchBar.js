"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SearchBar({ value, onChange, onSearch, onClear }) {
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search gym name, owner name, or email"
          className="h-11 w-full rounded-xl border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="min-w-24">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={onClear} disabled={!value}>
          <X size={14} className="mr-1" />
          Clear
        </Button>
      </div>
    </form>
  );
}