"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, CheckCircle } from "lucide-react";

/* ================= DATA ================= */

const BRANCHES = ["Main Branch", "Pune Branch", "Mumbai Branch"];

const INVENTORY = [
  {
    id: 1,
    medicine: "Paracetamol 500",
    batch: "PCM0923",
    stock: 120,
    expiry: "2026-08",
    branch: "Main Branch",
  },
  {
    id: 2,
    medicine: "Azithromycin",
    batch: "AZT1123",
    stock: 6,
    expiry: "2025-02",
    branch: "Main Branch",
  },
];

/* ================= PAGE ================= */

export default function StockTransferPage() {
  const [fromBranch, setFromBranch] = useState("Main Branch");
  const [toBranch, setToBranch] = useState("Pune Branch");
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const availableBatches = useMemo(() => {
    return INVENTORY.filter((i) => i.branch === fromBranch);
  }, [fromBranch]);

  const maxQty = selectedBatch ? selectedBatch.stock : 0;

  const canSubmit =
    selectedBatch &&
    qty > 0 &&
    qty <= maxQty &&
    fromBranch !== toBranch &&
    reason.length > 2;

  /* ================= UI ================= */

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Stock Transfer
        </h1>
        <p className="text-sm text-black/60">
          Transfer stock between branches with batch control
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.35)]">

        {/* BRANCH SELECT */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            value={fromBranch}
            onChange={(e) => setFromBranch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={toBranch}
            onChange={(e) => setToBranch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5"
          >
            {BRANCHES.filter((b) => b !== fromBranch).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* BATCH SELECT */}
        <div className="mb-6">
          <label className="text-sm text-black/60 block mb-2">
            Select Batch
          </label>

          <select
            value={selectedBatch?.id || ""}
            onChange={(e) =>
              setSelectedBatch(
                availableBatches.find(
                  (b) => b.id === Number(e.target.value)
                )
              )
            }
            className="w-full px-4 py-2 rounded-xl bg-black/5"
          >
            <option value="">Select batch</option>
            {availableBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.medicine} • {b.batch} • {b.stock} units
              </option>
            ))}
          </select>
        </div>

        {/* QTY */}
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
          {selectedBatch && (
            <p className="text-xs text-black/50 mt-1">
              Available: {maxQty}
            </p>
          )}
        </div>

        {/* REASON */}
        <div className="mb-8">
          <label className="text-sm text-black/60 block mb-2">
            Reason for Transfer
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-black/5"
            rows={3}
          />
        </div>

        {/* CONFIRM */}
        <button
          disabled={!canSubmit}
          onClick={() => setConfirmed(true)}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
            canSubmit
              ? "bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <ArrowRightLeft size={18} />
          Confirm Transfer
        </button>
      </div>

      {/* SUCCESS */}
      {confirmed && (
        <div className="mt-6 bg-white rounded-2xl p-6 flex gap-4 items-center shadow">
          <CheckCircle className="text-green-600" size={28} />
          <div>
            <p className="font-medium">Transfer Successful</p>
            <p className="text-sm text-black/60">
              {qty} units transferred from {fromBranch} to {toBranch}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
