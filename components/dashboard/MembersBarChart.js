"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-lg">
        <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">{label}</p>
        <p className="text-sm font-bold text-[var(--foreground)]">
          {payload[0].value} members
        </p>
      </div>
    );
  }
  return null;
};

export function MembersBarChart() {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">New Members</h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Monthly membership growth</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--accent)", radius: 4 }} />
          <Bar
            dataKey="members"
            fill="#818cf8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
