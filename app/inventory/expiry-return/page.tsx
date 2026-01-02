"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

/* ================= DEMO DATA ================= */

const INVENTORY = [
  {
    id: 1,
    medicine: "Azithromycin",
    batch: "AZT1123",
    supplier: "XYZ Distributors",
    stock: 6,
    expiry: "2025-02",
    rate: 220,
  },
  {
    id: 2,
    medicine: "Insulin Injection",
    batch: "INS0424",
    supplier: "ColdCare Ltd",
    stock: 18,
    expiry: "2024-12",
    rate: 480,
  },
  {
    id: 3,
    medicine: "Vitamin C",
    batch: "VTC0623",
    supplier: "ABC Pharma",
    stock: 40,
    expiry: "2023-11",
    rate: 60,
  },
];

/* ================= HELPERS ================= */

function isExpired(expiry: string) {
  const today = new Date();
  const exp = new Date(expiry + "-01");
  return exp < today;
}

/* ================= PAGE ================= */

export default function ExpiryReturnPage() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"return" | "destroy">("return");
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const expiredBatches = useMemo(() => {
    return INVENTORY.filter((i) => isExpired(i.expiry));
  }, []);

  const maxQty = selectedBatch ? selectedBatch.stock : 0;

  const canSubmit =
    selectedBatch &&
    qty > 0 &&
    qty <= maxQty &&
    remarks.length >= 3;

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Expiry Return / Write-off
        </h1>
        <p className="text-sm text-black/60">
          Manage expired medicines as per compliance rules
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.25)]">

        {/* BATCH SELECT */}
        <div className="mb-6">
          <label className="text-sm text-black/60 block mb-2">
            Expired Batch
          </label>
          <select
            value={selectedBatch?.id || ""}
            onChange={(e) =>
              setSelectedBatch(
                expiredBatches.find(
                  (b) => b.id === Number(e.target.value)
                )
              )
            }
            className="w-full px-4 py-2 rounded-xl bg-black/5"
          >
            <option value="">Select expired batch</option>
            {expiredBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.medicine} • {b.batch} • {b.expiry}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        {selectedBatch && (
          <div className="mb-6">
            <label className="text-sm text-black/60 block mb-2">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={maxQty}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl bg-black/5"
            />
            <p className="text-xs text-black/50 mt-1">
              Available expired stock: {maxQty}
            </p>
          </div>
        )}

        {/* MODE */}
        {selectedBatch && (
          <div className="mb-6">
            <label className="text-sm text-black/60 block mb-2">
              Action
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setMode("return")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium ${
                  mode === "return"
                    ? "bg-[#6d5dfc] text-white"
                    : "bg-black/5"
                }`}
              >
                Return to Supplier
              </button>

              <button
                onClick={() => setMode("destroy")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium ${
                  mode === "destroy"
                    ? "bg-red-600 text-white"
                    : "bg-black/5"
                }`}
              >
                Destroy / Write-off
              </button>
            </div>
          </div>
        )}

        {/* REMARKS */}
        {selectedBatch && (
          <div className="mb-8">
            <label className="text-sm text-black/60 block mb-2">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-xl bg-black/5"
              placeholder="Expiry handling remarks"
            />
          </div>
        )}

        {/* SUMMARY */}
        {selectedBatch && (
          <div className="mb-6 rounded-xl bg-black/5 p-4 text-sm space-y-1">
            <p><strong>Medicine:</strong> {selectedBatch.medicine}</p>
            <p><strong>Batch:</strong> {selectedBatch.batch}</p>
            <p><strong>Expiry:</strong> {selectedBatch.expiry}</p>
            <p><strong>Action:</strong> {mode === "return" ? "Supplier Return" : "Destroyed"}</p>
            <p>
              <strong>Loss Value:</strong> ₹{qty * selectedBatch.rate}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
            canSubmit
              ? mode === "destroy"
                ? "bg-red-600 text-white"
                : "bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <Trash2 size={18} />
          Confirm Expiry Action
        </button>
      </div>

      {/* SUCCESS */}
      {submitted && (
        <div className="mt-6 bg-white rounded-2xl p-6 flex gap-4 items-center shadow">
          <AlertTriangle className="text-red-600" size={28} />
          <div>
            <p className="font-medium">Expiry Action Recorded</p>
            <p className="text-sm text-black/60">
              Stock updated & compliance log generated
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
