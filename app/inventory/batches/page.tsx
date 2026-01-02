"use client";

import { useEffect, useMemo, useState } from "react";
import { X, AlertTriangle } from "lucide-react";

/* ================= DEMO DATA ================= */

const BRANCHES = ["Main Branch", "Pune Branch", "Mumbai Branch"];

const BATCHES = [
  {
    medicine: "Paracetamol 500",
    batch: "PCM0923",
    expiry: "2026-08",
    stock: 120,
    mrp: 150,
    branch: "Main Branch",
    supplier: "ABC Pharma",
  },
  {
    medicine: "Azithromycin",
    batch: "AZT1123",
    expiry: "2025-02",
    stock: 6,
    mrp: 250,
    branch: "Main Branch",
    supplier: "XYZ Distributors",
  },
  {
    medicine: "Insulin Injection",
    batch: "INS0424",
    expiry: "2024-12",
    stock: 0,
    mrp: 520,
    branch: "Pune Branch",
    supplier: "ColdCare Ltd",
  },
];

/* ================= PAGE ================= */

export default function InventoryBatchesPage() {
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [activeBatch, setActiveBatch] = useState<any>(null);

  const filtered = useMemo(() => {
    return BATCHES.filter((b) => {
      if (b.branch !== branch) return false;
      if (
        query &&
        !`${b.medicine} ${b.batch}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, branch]);

  return (
    <div className="p-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Batch Inventory
        </h1>
        <p className="text-sm text-black/60">
          Medicine batches with expiry & stock tracking
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search medicine / batch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/5 text-sm outline-none"
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/5 text-sm"
        >
          {BRANCHES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr className="text-left">
              <th className="p-4">Medicine</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Stock</th>
              <th>MRP</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b, i) => {
              const exp = getExpiryProgress(b.expiry);
              const status =
                exp <= 0
                  ? "Expired"
                  : exp < 30
                  ? "Near Expiry"
                  : "Active";

              return (
                <tr
                  key={i}
                  onClick={() => setActiveBatch(b)}
                  className="border-t hover:bg-[#6d5dfc]/5 cursor-pointer"
                >
                  <td className="p-4 font-medium">{b.medicine}</td>
                  <td>{b.batch}</td>

                  {/* EXPIRY */}
                  <td>
                    <div className="text-xs mb-1">{b.expiry}</div>
                    <ExpiryBar expiry={b.expiry} />
                  </td>

                  {/* STOCK */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        b.stock === 0
                          ? "bg-red-100 text-red-700"
                          : b.stock < 10
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.stock} units
                    </span>
                  </td>

                  <td>₹{b.mrp}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : status === "Near Expiry"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* BATCH MODAL */}
      {activeBatch && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[420px] p-6 relative">
            <button
              onClick={() => setActiveBatch(null)}
              className="absolute right-4 top-4 text-black/50"
            >
              <X />
            </button>

            <h3 className="font-semibold text-lg mb-4">
              Batch Details
            </h3>

            <ul className="text-sm space-y-2">
              <li><strong>Medicine:</strong> {activeBatch.medicine}</li>
              <li><strong>Batch:</strong> {activeBatch.batch}</li>
              <li><strong>Expiry:</strong> {activeBatch.expiry}</li>
              <li><strong>Stock:</strong> {activeBatch.stock}</li>
              <li><strong>MRP:</strong> ₹{activeBatch.mrp}</li>
              <li><strong>Supplier:</strong> {activeBatch.supplier}</li>
              <li><strong>Branch:</strong> {activeBatch.branch}</li>
            </ul>

            {getExpiryProgress(activeBatch.expiry) < 30 && (
              <div className="mt-4 flex items-center gap-2 text-orange-700 text-sm">
                <AlertTriangle size={16} />
                Near expiry batch
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function getExpiryProgress(expiry: string) {
  const now = new Date();
  const exp = new Date(expiry + "-01");
  const diff = exp.getTime() - now.getTime();
  const year = 1000 * 60 * 60 * 24 * 365;
  return Math.max(0, Math.min(100, (diff / year) * 100));
}

/* ================= SAFE EXPIRY BAR ================= */

function ExpiryBar({ expiry }: { expiry: string }) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const p = getExpiryProgress(expiry);
    setProgress(Number(p.toFixed(1)));
  }, [expiry]);

  if (progress === null) {
    return <div className="h-2 rounded-full bg-black/10" />;
  }

  return (
    <div className="h-2 rounded-full bg-black/10">
      <div
        className={`h-2 rounded-full ${
          progress < 25
            ? "bg-red-500"
            : progress < 50
            ? "bg-orange-500"
            : "bg-green-500"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
