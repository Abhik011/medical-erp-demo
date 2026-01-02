"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function GRNPage() {
  const [received, setReceived] = useState(false);

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Goods Receipt Note (GRN)</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input className="input" placeholder="PO Number" />
        <input className="input" placeholder="Medicine Name" />
        <input className="input" placeholder="Batch No" />
        <input type="month" className="input" />
        <input type="number" className="input" placeholder="Received Quantity" />
        <input type="number" className="input" placeholder="MRP" />

        <button
          onClick={() => setReceived(true)}
          className="w-full py-3 bg-[#6d5dfc] text-white rounded-xl"
        >
          Save GRN & Update Stock
        </button>
      </div>

      {received && (
        <div className="mt-6 flex gap-3 items-center bg-white p-4 rounded-xl">
          <CheckCircle className="text-green-600" />
          <span>Stock updated successfully</span>
        </div>
      )}
    </div>
  );
}
