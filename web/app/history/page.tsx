"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TransactionFilters, {
  type FilterState,
  DEFAULT_FILTERS,
} from "@/components/history/TransactionFilters";
import TransactionTable from "@/components/history/TransactionTable";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";
import type { BillCategory, TxStatus } from "@/types";

export default function HistoryPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      if (filters.category !== "all" && tx.category !== (filters.category as BillCategory))
        return false;
      if (filters.status !== "all" && tx.status !== (filters.status as TxStatus)) return false;
      if (filters.minAmount && tx.amountSTX < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && tx.amountSTX > parseFloat(filters.maxAmount)) return false;
      if (filters.dateFrom && new Date(tx.date) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(tx.date) > new Date(filters.dateTo + "T23:59:59"))
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          tx.recipient.toLowerCase().includes(q) ||
          tx.txHash.toLowerCase().includes(q) ||
          tx.service.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "var(--color-tb-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm mb-1"
                style={{ color: "var(--color-tb-muted)" }}
              >
                On-chain payment records
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold"
              >
                Transaction{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  History
                </span>
              </motion.h1>
            </div>
            <Link
              href="/pay"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-teal shrink-0"
            >
              Pay a Bill
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TransactionFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TransactionTable transactions={filtered} />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
