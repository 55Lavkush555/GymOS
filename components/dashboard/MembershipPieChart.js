"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

const COLORS = {
  active: "#10b981",
  expiring_soon: "#f59e0b",
  expired: "#ef4444",
};

const LABELS = {
  active: "Active",
  expiring_soon: "Expiring Soon",
  expired: "Expired",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-lg">
        <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">{LABELS[payload[0].name] || payload[0].name}</p>
        <p className="text-sm font-bold text-[var(--foreground)]">{payload[0].value} members</p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function MembershipPieChart() {
  const memberData = useDashboard().data;

  const active = memberData.activeMembers;
  const expired = memberData.expiredMembers;
  const expiringSoon = memberData.expiringSoonMembers;

  const data = [
    {
      name: "active",
      value: active,
    },
    {
      name: "expiring_soon",
      value: expiringSoon,
    },
    {
      name: "expired",
      value: expired,
    },
  ];

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--foreground)]">Membership Status</h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Distribution by status</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={80}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                {LABELS[value] || value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
