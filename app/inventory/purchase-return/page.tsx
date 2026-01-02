"use client";

import { useMemo, useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

/* ================= DEMO DATA ================= */

const SUPPLIERS = ["ABC Pharma", "XYZ Distributors", "ColdCare Ltd"];

const INVENTORY = [
  {
    id: 1,
    medicine: "Paracetamol 500",
    batch: "PCM0923",
    supplier: "ABC Pharma",
    stock: 120,
    expiry: "2026-08",
    rate: 120,
  },
  {
    id: 2,
    medicine: "Azithromycin",
    batch: "AZT1123",
    supplier: "XYZ Distributors",
    stock: 6,
    expiry: "2025-02",
    rate: 220,
  },
  {
    id: 3,
    medicine: "Insulin Injection",
    batch: "INS0424",
    supplier: "ColdCare Ltd",
    stock: 18,
    expiry: "2024-12",
    rate: 480,
  },
];

/* ================= PAGE ================= */

export default function PurchaseReturnPage() {
  const [supplier, setSupplier] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const availableBatches = useMemo(() => {
    return INVENTORY.filter((i) => i.supplier === supplier);
  }, [supplier]);

  const maxQty = selectedBatch ? selectedBatch.stock : 0;

  const canSubmit =
    supplier &&
    selectedBatch &&
    qty > 0 &&
    qty <= maxQty &&
    reason.length >= 3;

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Purchase Return
        </h1>
        <p className="text-sm text-black/60">
          Return damaged / expired / excess stock to supplier
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.25)]">

        {/* SUPPLIER */}
        <div className="mb-6">
          <label className="text-sm text-black/60 block mb-2">
            Supplier
          </label>
          <select
            value={supplier}
            onChange={(e) => {
              setSupplier(e.target.value);
              setSelectedBatch(null);
            }}
            className="w-full px-4 py-2 rounded-xl bg-black/5"
          >
            <option value="">Select supplier</option>
            {SUPPLIERS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* BATCH */}
        {supplier && (
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
        )}

        {/* QUANTITY */}
        {selectedBatch && (
          <div className="mb-6">
            <label className="text-sm text-black/60 block mb-2">
              Return Quantity
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
              Available stock: {maxQty}
            </p>
          </div>
        )}

        {/* REASON */}
        {selectedBatch && (
          <div className="mb-8">
            <label className="text-sm text-black/60 block mb-2">
              Reason for Return
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-xl bg-black/5"
              placeholder="Damaged / Expired / Excess stock"
            />
          </div>
        )}

        {/* SUMMARY */}
        {selectedBatch && (
          <div className="mb-6 rounded-xl bg-black/5 p-4 text-sm space-y-1">
            <p><strong>Medicine:</strong> {selectedBatch.medicine}</p>
            <p><strong>Batch:</strong> {selectedBatch.batch}</p>
            <p><strong>Expiry:</strong> {selectedBatch.expiry}</p>
            <p><strong>Return Qty:</strong> {qty}</p>
            <p>
              <strong>Return Value:</strong> ₹{qty * selectedBatch.rate}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
            canSubmit
              ? "bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <RotateCcw size={18} />
          Confirm Purchase Return
        </button>
      </div>

      {/* SUCCESS */}
      {submitted && (
        <div className="mt-6 bg-white rounded-2xl p-6 flex gap-4 items-center shadow">
          <AlertTriangle className="text-orange-600" size={28} />
          <div>
            <p className="font-medium">Purchase Return Created</p>
            <p className="text-sm text-black/60">
              Stock deducted & supplier return logged
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
