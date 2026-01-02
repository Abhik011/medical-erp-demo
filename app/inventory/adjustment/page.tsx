"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Plus, Minus } from "lucide-react";

/* ================= DEMO INVENTORY ================= */

const INVENTORY = [
  {
    id: 1,
    medicine: "Paracetamol 500",
    batch: "PCM0923",
    stock: 120,
    expiry: "2026-08",
    rate: 30,
  },
  {
    id: 2,
    medicine: "Azithromycin",
    batch: "AZT1123",
    stock: 6,
    expiry: "2025-02",
    rate: 220,
  },
  {
    id: 3,
    medicine: "Insulin Injection",
    batch: "INS0424",
    stock: 18,
    expiry: "2024-12",
    rate: 480,
  },
];

/* ================= PAGE ================= */

export default function InventoryAdjustmentPage() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [mode, setMode] = useState<"increase" | "decrease">("decrease");
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const maxQty = selectedBatch ? selectedBatch.stock : 0;

  const canSubmit =
    selectedBatch &&
    qty > 0 &&
    (mode === "increase" || qty <= maxQty) &&
    reason.length >= 3;

  const valueImpact =
    selectedBatch ? qty * selectedBatch.rate : 0;

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Stock Adjustment
        </h1>
        <p className="text-sm text-black/60">
          Correct inventory mismatches with audit tracking
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.25)]">

        {/* BATCH */}
        <div className="mb-6">
          <label className="text-sm text-black/60 block mb-2">
            Select Batch
          </label>
          <select
            value={selectedBatch?.id || ""}
            onChange={(e) =>
              setSelectedBatch(
                INVENTORY.find(
                  (b) => b.id === Number(e.target.value)
                )
              )
            }
            className="w-full px-4 py-2 rounded-xl bg-black/5"
          >
            <option value="">Select batch</option>
            {INVENTORY.map((b) => (
              <option key={b.id} value={b.id}>
                {b.medicine} • {b.batch} • {b.stock} units
              </option>
            ))}
          </select>
        </div>

        {/* MODE */}
        {selectedBatch && (
          <div className="mb-6">
            <label className="text-sm text-black/60 block mb-2">
              Adjustment Type
            </label>

            <div className="flex gap-4">
              <button
                onClick={() => setMode("increase")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
                  mode === "increase"
                    ? "bg-green-600 text-white"
                    : "bg-black/5"
                }`}
              >
                <Plus size={16} /> Increase Stock
              </button>

              <button
                onClick={() => setMode("decrease")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
                  mode === "decrease"
                    ? "bg-red-600 text-white"
                    : "bg-black/5"
                }`}
              >
                <Minus size={16} /> Decrease Stock
              </button>
            </div>
          </div>
        )}

        {/* QTY */}
        {selectedBatch && (
          <div className="mb-6">
            <label className="text-sm text-black/60 block mb-2">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={mode === "decrease" ? maxQty : undefined}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl bg-black/5"
            />
            {mode === "decrease" && (
              <p className="text-xs text-black/50 mt-1">
                Available stock: {maxQty}
              </p>
            )}
          </div>
        )}

        {/* REASON */}
        {selectedBatch && (
          <div className="mb-8">
            <label className="text-sm text-black/60 block mb-2">
              Adjustment Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-xl bg-black/5"
              placeholder="Physical count mismatch / Damage / Audit correction"
            />
          </div>
        )}

        {/* SUMMARY */}
        {selectedBatch && (
          <div className="mb-6 rounded-xl bg-black/5 p-4 text-sm space-y-1">
            <p><strong>Medicine:</strong> {selectedBatch.medicine}</p>
            <p><strong>Batch:</strong> {selectedBatch.batch}</p>
            <p><strong>Action:</strong> {mode === "increase" ? "Increase" : "Decrease"}</p>
            <p>
              <strong>Value Impact:</strong>{" "}
              <span
                className={
                  mode === "increase"
                    ? "text-green-700"
                    : "text-red-700"
                }
              >
                ₹{valueImpact}
              </span>
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
            canSubmit
              ? mode === "increase"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <ClipboardList size={18} />
          Confirm Adjustment
        </button>
      </div>

      {/* SUCCESS */}
      {submitted && (
        <div className="mt-6 bg-white rounded-2xl p-6 shadow flex gap-4 items-center">
          <ClipboardList className="text-[#6d5dfc]" size={28} />
          <div>
            <p className="font-medium">Stock Adjustment Recorded</p>
            <p className="text-sm text-black/60">
              Inventory updated with audit trail
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
