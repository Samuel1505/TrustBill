"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import QuickPay from "@/components/dashboard/QuickPay";
import { useWalletStore } from "@/store/walletStore";
import { truncateAddress } from "@/lib/utils";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function NotConnectedBanner() {
  const { connect, connecting } = useWalletStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        background: "rgba(245, 158, 11, 0.05)",
        border: "1px solid rgba(245, 158, 11, 0.2)",
      }}
    >
      <div className="flex items-center gap-3">
        <Wallet className="w-5 h-5 shrink-0" style={{ color: "var(--color-tb-warning)" }} />
        <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
          Connect your wallet to see your personalised dashboard and transaction history.
        </p>
      </div>
      <button
        onClick={connect}
        disabled={connecting}
        className="px-5 py-2 rounded-xl text-sm font-semibold btn-teal shrink-0 disabled:opacity-60"
      >
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { connected, address } = useWalletStore();

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
                {getGreeting()},{" "}
                {connected && address
                  ? truncateAddress(address)
                  : "Explorer"}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold"
              >
                Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Dashboard
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

          {/* Wallet banner */}
          {!connected && <NotConnectedBanner />}

          {/* Summary cards */}
          <div className="mb-8">
            <SummaryCards />
          </div>

          {/* Chart + Quick Pay */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
            <div>
              <QuickPay />
            </div>
          </div>

          {/* Recent transactions */}
          <RecentTransactions />
        </div>
      </main>
      <Footer />
    </>
  );
}
