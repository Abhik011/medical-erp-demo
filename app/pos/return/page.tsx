"use client";

import { useState } from "react";
import { ArrowLeftRight, CheckCircle } from "lucide-react";
import CreonoxGlassCard from "@/components/CreonoxGlassCard";

/* ===== MOCK INVOICE DATA ===== */
const MOCK_INVOICE = {
  invoiceNo: "INV-1023",
  date: "2026-01-02",
  items: [
    { id: 1, name: "Paracetamol 500", qty: 5, price: 30, gst: 5 },
    { id: 2, name: "Crocin Cold", qty: 2, price: 55, gst: 5 },
  ],
};

export default function POSReturnPage() {
  const [invoice, setInvoice] = useState<any>(null);
  const [returnQty, setReturnQty] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const subtotal = invoice
    ? invoice.items.reduce(
        (sum: number, i: any) =>
          sum + (returnQty[i.id] || 0) * i.price,
        0
      )
    : 0;

  const gst = Math.round(subtotal * 0.05);
  const totalRefund = subtotal + gst;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">
        POS Return / Refund
      </h1>

      <CreonoxGlassCard>
        <input
          placeholder="Enter Invoice Number"
          className="w-full bg-transparent text-lg outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") setInvoice(MOCK_INVOICE);
          }}
        />
      </CreonoxGlassCard>

      {invoice && (
        <>
          <CreonoxGlassCard title="Invoice Items">
            {invoice.items.map((i: any) => (
              <div
                key={i.id}
                className="flex justify-between items-center mb-3"
              >
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-black/50">
                    Sold: {i.qty} × ₹{i.price}
                  </p>
                </div>

                <input
                  type="number"
                  min={0}
                  max={i.qty}
                  placeholder="Return Qty"
                  onChange={(e) =>
                    setReturnQty({
                      ...returnQty,
                      [i.id]: Number(e.target.value),
                    })
                  }
                  className="w-20 rounded-xl bg-white/40 text-center"
                />
              </div>
            ))}
          </CreonoxGlassCard>

          <CreonoxGlassCard>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Reversed</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Refund</span>
              <span className="text-[#6d5dfc]">
                ₹{totalRefund}
              </span>
            </div>
          </CreonoxGlassCard>

          <button
            onClick={() => setSuccess(true)}
            className="w-full mt-4 py-4 rounded-2xl bg-[#6d5dfc] text-white font-semibold"
          >
            Process Refund
          </button>
        </>
      )}

      {success && (
        <div className="mt-6 text-center">
          <CheckCircle className="mx-auto text-[#6d5dfc]" size={48} />
          <p className="mt-2 font-semibold">
            Refund Completed Successfully
          </p>
        </div>
      )}
    </div>
  );
}
