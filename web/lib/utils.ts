import type { BillCategory, TxStatus } from "@/types";

export function truncateAddress(address: string, chars = 6): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-4)}`;
}

export function formatSTX(amount: number): string {
  return amount.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " STX";
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function shortHash(hash: string): string {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`;
}

export function categoryLabel(category: BillCategory): string {
  const labels: Record<BillCategory, string> = {
    airtime: "Airtime",
    data: "Data Bundle",
    electricity: "Electricity",
    tv: "TV Subscription",
    water: "Water Bill",
    rent: "Rent",
    internet: "Internet",
    healthcare: "Healthcare",
  };
  return labels[category] ?? category;
}

export function statusLabel(status: TxStatus): string {
  const map: Record<TxStatus, string> = {
    confirmed: "Confirmed",
    pending: "Pending",
    failed: "Failed",
  };
  return map[status];
}

export function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
