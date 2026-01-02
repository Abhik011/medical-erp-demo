"use client";

import {
  BarChart3,
  FileText,
  AlertTriangle,
  Pill,
  Users,
  Wallet,
  Printer,
  ChevronRight,
} from "lucide-react";

/* ================= REPORT GROUPS ================= */

const REPORTS = [
  {
    title: "Sales & Finance",
    icon: Wallet,
    items: [
      { label: "Daily Sales Report", path: "/reports/sales/daily" },
      { label: "Monthly Sales Report", path: "/reports/sales/monthly" },
      { label: "GST Summary (CGST / SGST / IGST)", path: "/reports/gst" },
      { label: "Profit & Margin Report", path: "/reports/profit" },
    ],
  },
  {
    title: "Inventory Reports",
    icon: Pill,
    items: [
      { label: "Low Stock Report", path: "/reports/low-stock" },
      { label: "Expiry Report", path: "/reports/expiry" },
      { label: "Stock Valuation", path: "/reports/stock-valuation" },
    ],
  },
  {
    title: "Compliance",
    icon: AlertTriangle,
    items: [
      { label: "Schedule H Register", path: "/compliance/schedule-h" },
      { label: "Expiry Log Register", path: "/compliance/expiry-log" },
      { label: "Prescription Audit Report", path: "/compliance/prescriptions" },
    ],
  },
  {
    title: "CRM Reports",
    icon: Users,
    items: [
      { label: "Customer Purchase Report", path: "/reports/customers" },
      { label: "Lead Conversion Report", path: "/reports/leads" },
    ],
  },
  {
    title: "HRM Reports",
    icon: FileText,
    items: [
      { label: "Attendance Report", path: "/reports/attendance" },
      { label: "Payroll Summary", path: "/reports/payroll" },
    ],
  },
];

/* ================= PAGE ================= */

export default function ReportsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-[#6d5dfc]" />
            Reports
          </h1>
          <p className="text-sm text-black/60">
            Business, compliance & performance analytics
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <Printer size={16} /> Print Dashboard
        </button>
      </div>

      {/* REPORT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORTS.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.25)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-[#6d5dfc]/10 flex items-center justify-center">
                  <Icon className="text-[#6d5dfc]" />
                </div>
                <h2 className="text-lg font-semibold">{group.title}</h2>
              </div>

              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#6d5dfc]/5 cursor-pointer transition"
                    onClick={() => (window.location.href = item.path)}
                  >
                    <span className="text-sm">{item.label}</span>
                    <ChevronRight className="text-black/40" size={18} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
