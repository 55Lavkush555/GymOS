"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { cn } from "@/lib/utils";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/members": "Members",
  "/attendance": "Attendance",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "GymOS";

  return (
    <ProtectedRoute>
      <div className="flex h-full min-h-screen bg-[var(--background)]">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* On mobile: no left margin (sidebar is an overlay).
            On desktop: margin matches sidebar width. */}
        <div
          className={cn(
            "flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out",
            collapsed ? "lg:ml-16" : "lg:ml-64"
          )}
        >
          <Navbar pageTitle={pageTitle} onMobileMenuOpen={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-auto p-4 sm:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
