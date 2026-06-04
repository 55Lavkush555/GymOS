"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Sun, Moon, Save, Building2, User } from "lucide-react";

const inputCls =
  "w-full h-10 px-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-colors";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--foreground)] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [gymInfo, setGymInfo] = useState({
    name: "GymOS Fitness Center",
    address: "123 Fitness Ave, Los Angeles, CA 90001",
    phone: "555-0100",
    email: "info@gymosfitness.com",
    website: "https://gymos.fitness",
  });

  const [profile, setProfile] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@gymos.com",
  });

  const [gymSaved, setGymSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const handleGymSave = (e) => {
    e.preventDefault();
    setGymSaved(true);
    setTimeout(() => setGymSaved(false), 2000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-5 lg:space-y-6">
        {/* Theme */}
        <SectionCard title="Appearance" icon={theme === "dark" ? Moon : Sun}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Theme</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                Currently using {theme === "dark" ? "dark" : "light"} mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--card)]"
              style={{ backgroundColor: theme === "dark" ? "var(--primary)" : "var(--border)" }}
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

        {/* Gym Info */}
        <SectionCard title="Gym Information" icon={Building2}>
          <form onSubmit={handleGymSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FormField label="Gym Name">
                  <input value={gymInfo.name} onChange={(e) => setGymInfo((p) => ({ ...p, name: e.target.value }))} className={inputCls} />
                </FormField>
              </div>
              <div className="sm:col-span-2">
                <FormField label="Address">
                  <input value={gymInfo.address} onChange={(e) => setGymInfo((p) => ({ ...p, address: e.target.value }))} className={inputCls} />
                </FormField>
              </div>
              <FormField label="Phone">
                <input value={gymInfo.phone} onChange={(e) => setGymInfo((p) => ({ ...p, phone: e.target.value }))} className={inputCls} />
              </FormField>
              <FormField label="Email">
                <input type="email" value={gymInfo.email} onChange={(e) => setGymInfo((p) => ({ ...p, email: e.target.value }))} className={inputCls} />
              </FormField>
              <div className="sm:col-span-2">
                <FormField label="Website">
                  <input value={gymInfo.website} onChange={(e) => setGymInfo((p) => ({ ...p, website: e.target.value }))} className={inputCls} />
                </FormField>
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors">
                <Save size={14} />
                {gymSaved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* Profile */}
        <SectionCard title="Profile Settings" icon={User}>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{profile.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{profile.email}</p>
                <button type="button" className="text-xs text-[var(--primary)] hover:underline mt-1">Change avatar</button>
              </div>
            </div>
            <FormField label="Full Name">
              <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className={inputCls} />
            </FormField>
            <FormField label="Email">
              <input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className={inputCls} />
            </FormField>
            <FormField label="New Password">
              <input type="password" placeholder="Leave blank to keep current" autoComplete="new-password" className={inputCls} />
            </FormField>
            <div className="flex justify-end pt-1">
              <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors">
                <Save size={14} />
                {profileSaved ? "Saved!" : "Update Profile"}
              </button>
            </div>
          </form>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
