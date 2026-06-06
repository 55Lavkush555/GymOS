import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput({ value, onChange, placeholder = "Search...", className, handleSearch }) {
  return (
    <div className="flex gap-2 items-center justify-center">

      <div className={cn("relative", className)}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-3 pr-3 h-9 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-colors"
        />
      </div>

      <button onClick={handleSearch}><Search size={20} className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-2 py-2 bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] flex items-center justify-center gap-2 h-9 w-full sm:w-auto shrink-0" /></button>
    </div>
  );
}
