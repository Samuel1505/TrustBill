"use client";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SPENDING_CHART_DATA } from "@/lib/mockData";

const SERIES = [
  { key: "electricity", color: "#F59E0B", label: "Electricity" },
  { key: "data", color: "#7C3AED", label: "Data" },
  { key: "airtime", color: "#00D4AA", label: "Airtime" },
  { key: "other", color: "#10B981", label: "Other" },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="p-3 rounded-xl shadow-xl"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
        minWidth: "150px",
      }}
    >
      <p className="text-xs font-medium mb-2" style={{ color: "var(--color-tb-muted)" }}>
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-sm">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-medium">{entry.value} STX</span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Spending Analytics</h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-tb-muted)" }}>
            STX spent by category — last 30 days
          </p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(0,212,170,0.1)",
            color: "var(--color-tb-teal)",
            border: "1px solid rgba(0,212,170,0.2)",
          }}
        >
          30D
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SPENDING_CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              {SERIES.map((s) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#4A5568" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#4A5568" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
              formatter={(value) => (
                <span style={{ color: "var(--color-tb-muted)" }}>{value}</span>
              )}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#grad-${s.key})`}
                dot={false}
                activeDot={{ r: 4, fill: s.color }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
