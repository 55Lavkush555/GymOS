"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Dumbbell, Users, BarChart3, CreditCard, Shield, Zap, Moon, Sun,
  ArrowRight, CheckCircle, TrendingUp, Clock, Sparkles
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
    title: "Attendance Management",
    desc: "Track daily member attendance, view attendance history, and know who is active at your gym.",
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

const pricingPlans = [
  {
    name: "Monthly",
    price: "₹350",
    period: "/ month",
    description: "Flexible access for growing gyms.",
    features: [
      "Member Management",
      "Attendance Tracking",
      "Analytics Dashboard",
      "Revenue Insights",
      "Search and Filters",
      "Email Reminders",
    ],
    cta: "Start Monthly",
  },
  {
    name: "6 Months Plan",
    price: "₹1800",
    period: "/ 6 months",
    description: "A practical mid-term option for steady operations.",
    features: [
      "Member Management",
      "Attendance Tracking",
      "Analytics Dashboard",
      "Revenue Insights",
      "Search and Filters",
      "Email Reminders",
    ],
    cta: "Choose 6 Months",
  },
  {
    name: "12 Months Plan",
    price: "₹3000",
    period: "/ year",
    description: "Best value for long-term savings and stability.",
    features: [
      "Member Management",
      "Attendance Tracking",
      "Analytics Dashboard",
      "Revenue Insights",
      "Search and Filters",
      "Email Reminders",
    ],
    cta: "Best Value",
    recommended: true,
  },
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const whatsappUrl = "https://wa.me/916269121509?text=Hello%20GymOS,%20I%20want%20to%20subscribe%20to%20the%207%20Days%20Free%20Trial.";
  const callUrl = "tel:+916269121509";

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);


  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-(--card)/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Dumbbell size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground text-lg">GymOS</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <SignInButton mode="modal"
              className="hidden sm:flex items-center px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Login
            </SignInButton>
            <SignUpButton mode="modal"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Signup
            </SignUpButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
          {/* Background gradient blob */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-6">
              <Zap size={11} />
              Professional Gym Management
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
              The smarter way to{" "}
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                run your gym
              </span>
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles size={14} />
              Start your 7 Days Free Trial today
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Manage members, track memberships, monitor revenue, and grow your fitness business — all from one beautiful dashboard.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {highlights.map((h) => (
                <span key={h} className="flex items-center gap-1.5 text-sm text-secondary-foreground">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  {h}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SignUpButton mode="modal"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                Get Started Free
                {/* <ArrowRight size={16} /> */}
              </SignUpButton>
              <SignInButton mode="modal"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition-all"
              >
                Login to Dashboard
              </SignInButton>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything you need to run a gym
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                One platform covers the full operational stack — from onboarding new members to tracking your annual revenue.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(({ icon: Icon, title, desc, color }) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 sm:py-24 border-y border-border bg-(--card)/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-4">
                <Sparkles size={11} />
                Simple pricing for gym owners
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Choose the plan that fits your gym
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Start with the plan that matches your current scale and upgrade when your gym grows.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl border p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${plan.recommended
                      ? "border-primary bg-linear-to-b from-card to-indigo-50/60 dark:to-indigo-950/20"
                      : "border-border bg-card"
                    }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                      <Sparkles size={10} />
                      Best Value
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-base font-semibold text-foreground">{plan.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a href={"#contact"}>
                    <button
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${plan.recommended
                          ? "bg-primary text-white hover:bg-primary-dark"
                          : "border border-border text-foreground hover:bg-accent"
                        }`}
                    >
                      {plan.cta}
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Contact */}
        <section className="pt-8 sm:pt-10 pb-20 sm:pb-24" id="contact">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-4">
                    <CreditCard size={11} />
                    Subscription Contact
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Want to subscribe to GymOS?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Contact us to activate your plan and get started with GymOS membership support.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">WhatsApp</p>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        +91 62691 21509
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={callUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent transition-colors"
                  >
                    Call us for subscription
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-center">
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
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Dumbbell size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">GymOS</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GymOS. Built for fitness businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
