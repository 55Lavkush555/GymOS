"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { members } from "@/lib/mockData";

const STATUS_COLORS = { active: "#10b981", expiring_soon: "#f59e0b", expired: "#ef4444" };
const STATUS_LABELS = { active: "Active", expiring_soon: "Expiring Soon", expired: "Expired" };

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-lg">
        <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">
          {STATUS_LABELS[payload[0].name] || payload[0].name}
        </p>
        <p className="text-sm font-bold text-[var(--foreground)]">{payload[0].value} members</p>
      </div>
    );
  }
  return null;
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ActiveVsExpiredChart() {
  const counts = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">Active vs Expired</h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Current membership distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="48%" outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{STATUS_LABELS[v] || v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ExpiringBarChart() {
  const planCounts = members
    .filter((m) => m.status === "expiring_soon")
    .reduce((acc, m) => {
      acc[m.plan] = (acc[m.plan] || 0) + 1;
      return acc;
    }, {});

  const data = Object.entries(planCounts).map(([plan, count]) => ({ plan, count }));

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">Expiring by Plan</h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Members expiring soon per plan</p>
      </div>
      {data.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-[var(--muted-foreground)] text-sm">
          No expiring members
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="plan" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-lg">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">{label}</p>
                    <p className="text-sm font-bold text-[var(--foreground)]">{payload[0].value} members</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="count" name="Expiring" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
