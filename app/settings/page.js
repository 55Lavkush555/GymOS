"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon, CreditCard } from "lucide-react";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function PlanLoadingSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-secondary p-4 sm:p-5 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="h-4 w-36 rounded bg-muted"></div>
          <div className="mt-2 h-3 w-52 rounded bg-muted"></div>
        </div>

        <div className="h-7 w-20 rounded-full bg-muted"></div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="h-3 w-32 rounded bg-muted"></div>
          <div className="mt-2 h-4 w-40 rounded bg-muted"></div>
        </div>

        <div>
          <div className="h-3 w-28 rounded bg-muted"></div>
          <div className="mt-2 h-4 w-36 rounded bg-muted"></div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary border border-border px-4 py-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground text-right">{value}</p>
    </div>
  );
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const planStatus = "Active";
  const [expiryDate, setExpiryDate] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/subscription/status');
        const data = await response.json();
        const date = new Date(data.planEndDate);
        setExpiryDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [])
  

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-5 lg:space-y-6">
        <SectionCard title="Appearance" icon={theme === "dark" ? Moon : Sun}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Currently using {theme === "dark" ? "dark" : "light"} mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2 focus:ring-offset-card"
              style={{ backgroundColor: theme === "dark" ? "var(--primary)" : "var(--border)" }}
              aria-label="Toggle theme"
            >
              <span
                className="absolute left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center"
                style={{ transform: theme === "dark" ? "translateX(28px)" : "translateX(0px)" }}
              >
                {theme === "dark" ? (
                  <Moon size={12} className="text-indigo-600" />
                ) : (
                  <Sun size={12} className="text-amber-500" />
                )}
              </span>
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Subscription / Membership" icon={CreditCard}>
          <div className="space-y-4">
            {loading ? <PlanLoadingSkeleton />
              : (
                <div className="rounded-xl border border-border bg-secondary p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Current Plan Status</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your GymOS membership is currently active.
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      {planStatus}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <InfoRow label="Membership expiry date" value={expiryDate} />
                    <InfoRow label="Renewal contact" value="+91 62691 21509" />
                  </div>
                </div>
              )}

            <div className="rounded-xl border border-border bg-card px-4 py-4 sm:px-5">
              <p className="text-sm text-foreground leading-6">
                To renew your GymOS membership, contact us at <a href="https://wa.me/916269121509?text=Hello%20GymOS,%20I%20want%20to%20subscribe%20to%20the%207%20Days%20Free%20Trial." className="font-semibold">+91 62691 21509</a>.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
