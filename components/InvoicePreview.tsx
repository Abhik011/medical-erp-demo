"use client";

import { X, Download, Printer } from "lucide-react";

export default function InvoicePreview({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
      <div className="w-[640px] rounded-[28px] bg-white p-8 shadow-[0_0_100px_#7c6cffaa]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Tax Invoice</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Seller / Buyer */}
        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          <div>
            <p className="font-medium">Creonox Medical Store</p>
            <p>GSTIN: 27ABCDE1234F1Z5</p>
            <p>Pune, Maharashtra</p>
          </div>
          <div>
            <p className="font-medium">Customer</p>
            <p>Cash Sale</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full text-sm mb-6">
          <thead className="border-b">
            <tr>
              <th className="text-left py-2">Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>GST</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Paracetamol 500</td>
              <td align="center">2</td>
              <td align="center">30</td>
              <td align="center">5%</td>
              <td align="right">₹60</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹180</span>
          </div>
          <div className="flex justify-between">
            <span>CGST (2.5%)</span>
            <span>₹4.5</span>
          </div>
          <div className="flex justify-between">
            <span>SGST (2.5%)</span>
            <span>₹4.5</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹189</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button className="flex-1 py-3 rounded-xl bg-white/40 backdrop-blur flex items-center justify-center gap-2">
            <Printer /> Print
          </button>
          <button className="flex-1 py-3 rounded-xl bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white flex items-center justify-center gap-2">
            <Download /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
