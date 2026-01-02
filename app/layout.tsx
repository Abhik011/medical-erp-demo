import "./globals.css";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

/* ================= META ================= */

export const metadata: Metadata = {
  title: {
    default: "Creonox Medical ERP",
    template: "%s • Creonox Medical ERP",
  },
  description:
    "Creonox Medical ERP – Complete pharmacy management system with POS billing, GST invoices, inventory, batch & expiry control, CRM, HRM and compliance.",
  keywords: [
    "Medical ERP",
    "Pharmacy ERP",
    "POS Billing",
    "GST Invoice",
    "Inventory Management",
    "Batch & Expiry",
    "Schedule H",
    "Pharmacy Software India",
    "Creonox",
  ],
  authors: [{ name: "Creonox Technologies" }],
  creator: "Creonox Technologies",
  publisher: "Creonox Technologies",

  applicationName: "Creonox Medical ERP",

  metadataBase: new URL("https://creonox.com"),

  openGraph: {
    title: "Creonox Medical ERP",
    description:
      "Smart Medical ERP for modern pharmacies. POS, GST, inventory, compliance & multi-branch control.",
    url: "https://creonox.com",
    siteName: "Creonox Medical ERP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creonox Medical ERP Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Creonox Medical ERP",
    description:
      "Modern pharmacy ERP with POS billing, GST invoices, inventory & compliance.",
    images: ["/clogo.svg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/clogo.svg",
    shortcut: "/clogo.svg",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

/* ================= LAYOUT ================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-[radial-gradient(900px_circle_at_10%_10%,#7c6cff22,transparent_40%),radial-gradient(900px_circle_at_90%_80%,#a78bfa22,transparent_40%),linear-gradient(180deg,#f7f6ff,#fbfbff)]
          text-black
          antialiased
        "
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
