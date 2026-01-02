"use client";

import { X, RotateCcw } from "lucide-react";

export default function RefundModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="w-[420px] rounded-[28px] bg-white p-6 shadow-[0_0_80px_#7c6cffaa]">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Return / Refund</h3>
          <button onClick={onClose}><X /></button>
        </div>

        <select className="w-full mb-4 px-4 py-2 rounded-xl bg-white/40">
          <option>Select Invoice</option>
          <option>INV-10234</option>
        </select>

        <select className="w-full mb-4 px-4 py-2 rounded-xl bg-white/40">
          <option>Select Item</option>
          <option>Paracetamol 500</option>
        </select>

        <textarea
          placeholder="Reason for return"
          className="w-full mb-4 px-4 py-2 rounded-xl bg-white/40"
        />

        <button className="w-full py-3 rounded-xl bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white flex items-center justify-center gap-2">
          <RotateCcw /> Process Refund
        </button>
      </div>
    </div>
  );
}
