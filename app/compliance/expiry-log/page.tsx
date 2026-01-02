"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Eye,
  Printer,
  X,
  Trash2,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const EXPIRY_LOG = [
  {
    id: "EXP-001",
    date: "01 Jan 2026",
    medicine: "Azithromycin 500",
    batch: "AZT1123",
    expiry: "12/2025",
    quantity: 12,
    action: "Disposed",
    reference: "INV-RET-1021",
  },
  {
    id: "EXP-002",
    date: "02 Jan 2026",
    medicine: "Insulin Injection",
    batch: "INS0424",
    expiry: "01/2026",
    quantity: 5,
    action: "Returned to Supplier",
    reference: "SUP-RET-553",
  },
];

/* ================= PAGE ================= */

export default function ExpiryLogPage() {
  const [active, setActive] = useState<any>(null);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            Expiry Log Register
          </h1>
          <p className="text-sm text-black/60">
            Expired & near-expiry medicines compliance register
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <Printer size={16} /> Print Register
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>Action Taken</th>
              <th>Reference</th>
              <th className="p-4 text-right">View</th>
            </tr>
          </thead>

          <tbody>
            {EXPIRY_LOG.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-[#6d5dfc]/5 transition"
              >
                <td className="p-4">{e.date}</td>
                <td className="font-medium">{e.medicine}</td>
                <td>{e.batch}</td>
                <td>{e.expiry}</td>
                <td>{e.quantity}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      e.action === "Disposed"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {e.action}
                  </span>
                </td>
                <td className="text-xs text-black/60">{e.reference}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setActive(e)}
                    className="px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[480px] p-6 shadow-xl relative">
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 text-black/40 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Expiry Record Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Date:</strong> {active.date}</p>
              <p><strong>Medicine:</strong> {active.medicine}</p>
              <p><strong>Batch:</strong> {active.batch}</p>
              <p><strong>Expiry:</strong> {active.expiry}</p>
              <p><strong>Quantity:</strong> {active.quantity}</p>
              <p><strong>Action Taken:</strong> {active.action}</p>
              <p><strong>Reference No:</strong> {active.reference}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-red-600 text-white flex items-center justify-center gap-2">
                <Trash2 size={16} /> Mark Disposed
              </button>

              <button className="flex-1 py-3 rounded-xl bg-black/5">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
