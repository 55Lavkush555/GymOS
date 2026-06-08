"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Dumbbell, Users, BarChart3, CreditCard, Shield, Zap, Moon, Sun,
  ArrowRight, CheckCircle, TrendingUp, Clock
} from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const features = [
  {
    icon: Users,
    title: "Member Management",
    desc: "Track every member's profile, membership status, and contact details in one place.",
    color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: CreditCard,
    title: "Membership Plans",
    desc: "Create and manage flexible plans — daily passes, monthly, quarterly, or annual.",
    color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    desc: "Monitor revenue trends, membership growth, and key business metrics at a glance.",
    color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Clock,
    title: "Expiry Tracking",
    desc: "Instantly see who's expiring soon and take action before losing a member.",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  },
  {
    icon: TrendingUp,
    title: "Growth Insights",
    desc: "Visual dashboards showing your gym's growth over time with detailed charts.",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data stays yours. Role-based access keeps sensitive info protected.",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  },
];

const highlights = [
  "25+ member records in one view",
  "Real-time expiry alerts",
  "Revenue & growth charts",
  "Mobile-friendly design",
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);


  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0">
              <Dumbbell size={16} className="text-white" />
            </div>
            <span className="font-bold text-[var(--foreground)] text-lg">GymOS</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <SignInButton mode="modal"
              className="hidden sm:flex items-center px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
            >
              Login
            </SignInButton>
            <SignUpButton mode="modal"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Get Started
            </SignUpButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
          {/* Background gradient blob */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-6">
              <Zap size={11} />
              Professional Gym Management
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight tracking-tight mb-6">
              The smarter way to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                run your gym
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed mb-8">
              Manage members, track memberships, monitor revenue, and grow your fitness business — all from one beautiful dashboard.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {highlights.map((h) => (
                <span key={h} className="flex items-center gap-1.5 text-sm text-[var(--secondary-foreground)]">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  {h}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SignUpButton mode="modal"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                Get Started Free
                {/* <ArrowRight size={16} /> */}
              </SignUpButton>
              <SignInButton mode="modal"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold hover:bg-[var(--accent)] transition-all"
              >
                Login to Dashboard
              </SignInButton>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-y border-[var(--border)] bg-[var(--card)] py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "25+", label: "Members Tracked" },
                { value: "5", label: "Plan Types" },
                { value: "$20k+", label: "Monthly Revenue" },
                { value: "100%", label: "Free to Use" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">{s.value}</p>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
                Everything you need to run a gym
              </h2>
              <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
                One platform covers the full operational stack — from onboarding new members to tracking your annual revenue.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(({ icon: Icon, title, desc, color }) => (
                <div
                  key={title}
                  className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <Dumbbell size={24} className="text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Ready to modernize your gym?
                </h2>
                <p className="text-indigo-200 mb-8 max-w-md mx-auto">
                  Join gym owners who use GymOS to streamline operations and grow their business.
                </p>
                <SignInButton
                  mode="modal"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  <div>
                    Start Managing Your Gym
                    <ArrowRight size={16} />
                  </div>
                </SignInButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[var(--primary)] flex items-center justify-center">
              <Dumbbell size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">GymOS</span>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} GymOS. Built for fitness businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
