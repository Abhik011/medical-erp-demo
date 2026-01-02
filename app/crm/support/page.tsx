"use client";

import { useMemo, useState } from "react";
import {
  User,
  Phone,
  FileText,
  Wallet,
  Eye,
  Plus,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Rahul Mehta",
    phone: "9876543210",
    gstin: "",
    visits: 12,
    totalSpent: 18450,
    credit: 0,
    lastVisit: "02 Jan 2026",
    type: "Regular",
  },
  {
    id: "CUST-002",
    name: "Anita Pharmacy",
    phone: "9898989898",
    gstin: "27ABCDE1234F1Z5",
    visits: 22,
    totalSpent: 124500,
    credit: 3500,
    lastVisit: "01 Jan 2026",
    type: "B2B",
  },
  {
    id: "CUST-003",
    name: "Walk-in Customer",
    phone: "",
    gstin: "",
    visits: 1,
    totalSpent: 120,
    credit: 0,
    lastVisit: "02 Jan 2026",
    type: "Walk-in",
  },
];

/* ================= PAGE ================= */

export default function CustomersPage() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    if (!query) return CUSTOMERS;
    return CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query)
    );
  }, [query]);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black">
            Customers
          </h1>
          <p className="text-sm text-black/60">
            CRM customer master linked with POS & prescriptions
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex gap-2 items-center">
          <Plus size={16} /> Add Customer
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or phone"
          className="px-4 py-2 rounded-xl bg-black/5 w-80"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Visits</th>
              <th>Total Spent</th>
              <th>Credit</th>
              <th>Last Visit</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-[#6d5dfc]/5 transition"
              >
                <td className="p-4">
                  <div className="font-medium">{c.name}</div>
                  {c.gstin && (
                    <div className="text-xs text-black/60">
                      GSTIN: {c.gstin}
                    </div>
                  )}
                </td>

                <td>
                  {c.phone ? (
                    <span className="flex items-center gap-1">
                      <Phone size={14} /> {c.phone}
                    </span>
                  ) : (
                    <span className="text-black/40">—</span>
                  )}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.type === "B2B"
                        ? "bg-purple-100 text-purple-700"
                        : c.type === "Regular"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {c.type}
                  </span>
                </td>

                <td>{c.visits}</td>

                <td className="font-medium">
                  ₹{c.totalSpent.toLocaleString()}
                </td>

                <td>
                  {c.credit > 0 ? (
                    <span className="text-orange-600 font-medium">
                      ₹{c.credit}
                    </span>
                  ) : (
                    <span className="text-black/40">₹0</span>
                  )}
                </td>

                <td>{c.lastVisit}</td>

                <td className="p-4 text-right space-x-2">
                  <IconBtn title="View Profile">
                    <Eye size={16} />
                  </IconBtn>

                  <IconBtn title="Prescriptions">
                    <FileText size={16} />
                  </IconBtn>

                  <IconBtn title="Wallet / Credit">
                    <Wallet size={16} />
                  </IconBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-6 text-sm text-black/60 space-y-1">
        <p>• Customers are auto-created from POS billing</p>
        <p>• Phone number is primary identifier</p>
        <p>• Credit balance shown here reflects ledger</p>
      </div>
    </div>
  );
}

/* ================= UI ================= */

function IconBtn({ children, title }: any) {
  return (
    <button
      title={title}
      className="px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition"
    >
      {children}
    </button>
  );
}
