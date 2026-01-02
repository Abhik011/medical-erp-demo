"use client";

import { useMemo, useState } from "react";
import { RotateCcw, FileText } from "lucide-react";

/* ================= DEMO DATA ================= */

const SUPPLIERS = [
  { id: 1, name: "ABC Pharma" },
  { id: 2, name: "XYZ Distributors" },
];

const PURCHASE_RETURNS = [
  {
    id: "PR-1001",
    date: "07 Jan 2026",
    supplierId: 1,
    supplier: "ABC Pharma",
    medicine: "Paracetamol 500",
    batch: "PCM0923",
    expiry: "2026-08",
    qty: 10,
    rate: 120,
    gstRate: 5,
    reason: "Near Expiry",
    status: "POSTED",
  },
  {
    id: "PR-1002",
    date: "09 Jan 2026",
    supplierId: 2,
    supplier: "XYZ Distributors",
    medicine: "Azithromycin",
    batch: "AZT1123",
    expiry: "2025-02",
    qty: 4,
    rate: 250,
    gstRate: 5,
    reason: "Damaged",
    status: "POSTED",
  },
];

/* ================= PAGE ================= */

export default function SupplierReturnsPage() {
  const [supplierId, setSupplierId] = useState<number | "all">("all");

  const rows = useMemo(() => {
    return supplierId === "all"
      ? PURCHASE_RETURNS
      : PURCHASE_RETURNS.filter((r) => r.supplierId === supplierId);
  }, [supplierId]);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black">
            Supplier Returns
          </h1>
          <p className="text-sm text-black/60">
            Purchase returns & supplier credit notes
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex gap-4">
        <select
          value={supplierId}
          onChange={(e) =>
            setSupplierId(
              e.target.value === "all"
                ? "all"
                : Number(e.target.value)
            )
          }
          className="px-4 py-2 rounded-xl bg-black/5"
        >
          <option value="all">All Suppliers</option>
          {SUPPLIERS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Return ID</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Qty</th>
              <th>Value</th>
              <th>GST</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const base = r.qty * r.rate;
              const gst = (base * r.gstRate) / 100;
              const total = base + gst;

              return (
                <tr
                  key={r.id}
                  className="border-t hover:bg-[#6d5dfc]/5 transition"
                >
                  <td className="p-4 font-medium">{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.supplier}</td>
                  <td>{r.medicine}</td>
                  <td>{r.batch}</td>
                  <td>{r.qty}</td>
                  <td>₹{base}</td>
                  <td>₹{gst}</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* INFO */}
      <div className="mt-6 text-sm text-black/60 space-y-1">
        <p>• Returns automatically reduce stock quantity</p>
        <p>• Credit amount is adjusted in supplier ledger</p>
        <p>• GST credit note generated for accounting</p>
      </div>
    </div>
  );
}
