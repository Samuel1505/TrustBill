"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { MOCK_BENEFICIARIES, BILL_CATEGORIES } from "@/lib/mockData";

export default function QuickPay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl p-6"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Zap className="w-4 h-4" style={{ color: "var(--color-tb-teal)" }} />
        <h3 className="font-semibold">Quick Pay</h3>
      </div>
      <p className="text-xs mb-4" style={{ color: "var(--color-tb-muted)" }}>
        One-click repeat payment to saved beneficiaries
      </p>

      <div className="space-y-3">
        {MOCK_BENEFICIARIES.map((ben) => {
          const cat = BILL_CATEGORIES.find((c) => c.id === ben.category)!;
          return (
            <div
              key={ben.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: "var(--color-tb-surface)",
                border: "1px solid var(--color-tb-border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{ben.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                    {ben.recipient}
                  </p>
                </div>
              </div>
              <Link
                href={`/pay?category=${ben.category}&recipient=${encodeURIComponent(ben.recipient)}`}
                className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: "rgba(0,212,170,0.1)",
                  color: "var(--color-tb-teal)",
                  border: "1px solid rgba(0,212,170,0.2)",
                }}
              >
                Pay
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
