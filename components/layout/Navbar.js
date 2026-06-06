"use client";

import { Menu, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function Navbar({ onMobileMenuOpen, pageTitle }) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

  return (
    <header className="h-14 sm:h-16 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--border)] bg-[var(--card)] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors shrink-0"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-[var(--foreground)] truncate">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* User info — hidden on smallest screens */}
        <div className="hidden sm:flex items-center gap-2 ml-1">
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          <div className="hidden md:block">
            <p className="text-xs font-medium text-[var(--foreground)] leading-none">{user?.firstName || "Admin"}</p>
            <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 leading-none">Admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
