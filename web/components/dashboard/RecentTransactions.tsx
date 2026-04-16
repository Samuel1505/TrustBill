"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { MOCK_TRANSACTIONS, BILL_CATEGORIES } from "@/lib/mockData";
import { formatSTX, formatUSD, formatDateShort, shortHash } from "@/lib/utils";
import type { TxStatus } from "@/types";

function StatusBadge({ status }: { status: TxStatus }) {
  const map: Record<TxStatus, { label: string; cls: string }> = {
    confirmed: { label: "✓ Confirmed", cls: "status-confirmed" },
    pending: { label: "⏳ Pending", cls: "status-pending" },
    failed: { label: "✗ Failed", cls: "status-failed" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default function RecentTransactions() {
  const recent = MOCK_TRANSACTIONS.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--color-tb-border)" }}
      >
        <h3 className="font-semibold">Recent Transactions</h3>
        <Link
          href="/history"
          className="flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: "var(--color-tb-teal)" }}
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-tb-border)" }}>
              {["Date", "Service", "Recipient", "Amount", "Status", "TX Hash"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--color-tb-faint)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((tx, i) => {
              const cat = BILL_CATEGORIES.find((c) => c.id === tx.category);
              return (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b transition-colors"
                  style={{ borderColor: "var(--color-tb-border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <td className="px-6 py-4" style={{ color: "var(--color-tb-muted)" }}>
                    {formatDateShort(tx.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{cat?.icon}</span>
                      <span className="font-medium">{tx.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: "var(--color-tb-muted)" }}>
                    {tx.recipient}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{formatSTX(tx.amountSTX)}</p>
                      <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                        {formatUSD(tx.amountUSD)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://explorer.stacks.co/txid/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs transition-colors"
                      style={{ color: "var(--color-tb-teal)" }}
                    >
                      {shortHash(tx.txHash)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden divide-y" style={{ borderColor: "var(--color-tb-border)" }}>
        {recent.map((tx) => {
          const cat = BILL_CATEGORIES.find((c) => c.id === tx.category);
          return (
            <div key={tx.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{cat?.icon}</span>
                  <span className="font-medium text-sm">{tx.service}</span>
                </div>
                <StatusBadge status={tx.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--color-tb-muted)" }}>{formatDateShort(tx.date)}</span>
                <span className="font-medium" style={{ color: "var(--color-tb-teal)" }}>
                  {formatSTX(tx.amountSTX)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
