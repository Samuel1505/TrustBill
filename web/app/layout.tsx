import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustBill — Decentralized Bill Payments on Stacks",
  description:
    "Pay airtime, data, utilities and more using STX tokens on the Stacks blockchain. Transparent, immutable, and non-custodial.",
  keywords: ["TrustBill", "Stacks", "STX", "blockchain", "bill payment", "DeFi", "Africa"],
  other: {
    "talentapp:project_verification":
      "661b7309bb3b19b0aafa96fc8ebc91ba9a04a7501da64d23e18092dec0971fde917884b13bc70819267f915120fc0bba5956ea3858f4ec6c9a8eaae03c335aae",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "var(--color-tb-bg)", color: "var(--color-tb-text)" }}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0D1421",
              color: "#fff",
              border: "1px solid #1A2333",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#00D4AA", secondary: "#000" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
