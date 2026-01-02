"use client";

import { RotateCcw } from "lucide-react";

export default function PurchaseReturnPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Purchase Return</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input className="input" placeholder="Supplier" />
        <input className="input" placeholder="Medicine" />
        <input className="input" placeholder="Batch" />
        <input type="number" className="input" placeholder="Return Quantity" />
        <textarea className="input" placeholder="Reason" />

        <button className="w-full py-3 bg-red-600 text-white rounded-xl flex justify-center gap-2">
          <RotateCcw /> Confirm Return
        </button>
      </div>
    </div>
  );
}
