"use client";

import { useRef, useState } from "react";
import { Eye, Printer, RotateCcw, X } from "lucide-react";

/* ================= DEMO DATA ================= */

const SHOP_STATE = "MH"; // Maharashtra

const INVOICES = [
  {
    id: "INV-1001",
    date: "02 Jan 2026",
    customer: "Rahul Mehta",
    customerState: "MH",
    items: [
      { name: "Paracetamol 500", qty: 2, rate: 150 },
      { name: "Crocin Cold", qty: 1, rate: 100 },
    ],
    status: "PAID",
  },
  {
    id: "INV-1002",
    date: "02 Jan 2026",
    customer: "Walk-in",
    customerState: "MH",
    items: [{ name: "Amoxiclav 625", qty: 1, rate: 95 }],
    status: "PAID",
  },
  {
    id: "INV-1003",
    date: "01 Jan 2026",
    customer: "Anita Pharmacy",
    customerState: "GJ",
    items: [
      { name: "Azithromycin", qty: 4, rate: 250 },
      { name: "Vitamin C", qty: 1, rate: 120 },
    ],
    status: "REFUNDED",
  },
];

/* ================= GST HELPERS ================= */

function calculateTotals(items: any[], isIGST: boolean) {
  const subtotal = items.reduce(
    (sum, i) => sum + i.qty * i.rate,
    0
  );

  const gstRate = 0.05;
  const gstAmount = subtotal * gstRate;

  if (isIGST) {
    return {
      subtotal,
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      total: subtotal + gstAmount,
    };
  }

  return {
    subtotal,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    igst: 0,
    total: subtotal + gstAmount,
  };
}

/* ================= PAGE ================= */

export default function POSInvoicesPage() {
  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;

    const printWindow = window.open("", "", "width=900,height=650");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>GST Invoice</title>
          <style>
            body { font-family: Arial; padding: 24px; }
            h1,h2 { margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
            th { background: #f5f5f5; text-align: left; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">GST Invoices</h1>
        <p className="text-sm text-black/60">
          POS billing with GST compliance
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => {
              const isIGST = inv.customerState !== SHOP_STATE;
              const totals = calculateTotals(inv.items, isIGST);

              return (
                <tr key={inv.id} className="border-t hover:bg-black/5">
                  <td className="p-4 font-medium">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.customer}</td>
                  <td>{inv.items.length}</td>
                  <td className="font-semibold">₹{totals.total.toFixed(2)}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        inv.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <IconBtn onClick={() => setActiveInvoice(inv)}>
                      <Eye size={16} />
                    </IconBtn>
                    <IconBtn
                      onClick={() => {
                        setActiveInvoice(inv);
                        setTimeout(handlePrint, 100);
                      }}
                    >
                      <Printer size={16} />
                    </IconBtn>
                    {inv.status === "PAID" && (
                      <IconBtn className="bg-orange-100 text-orange-700">
                        <RotateCcw size={16} />
                      </IconBtn>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* INVOICE MODAL */}
      {activeInvoice && (() => {
        const isIGST = activeInvoice.customerState !== SHOP_STATE;
        const totals = calculateTotals(activeInvoice.items, isIGST);

        return (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-[620px] p-6 relative shadow-xl">
              <button
                onClick={() => setActiveInvoice(null)}
                className="absolute right-4 top-4 text-black/50 hover:text-black"
              >
                <X />
              </button>

              {/* PRINTABLE INVOICE */}
              <div ref={printRef} className="text-sm text-black">

                <h1 className="text-xl font-semibold">Creonox Medical Store</h1>
                <p>GSTIN: 27ABCDE1234F1Z5</p>
                <p>Pune, Maharashtra</p>

                <hr className="my-3" />

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p><strong>Invoice:</strong> {activeInvoice.id}</p>
                    <p><strong>Date:</strong> {activeInvoice.date}</p>
                  </div>
                  <div>
                    <p><strong>Customer:</strong> {activeInvoice.customer}</p>
                    <p><strong>State:</strong> {activeInvoice.customerState}</p>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="right">Qty</th>
                      <th className="right">Rate</th>
                      <th className="right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeInvoice.items.map((i: any, idx: number) => (
                      <tr key={idx}>
                        <td>{i.name}</td>
                        <td className="right">{i.qty}</td>
                        <td className="right">₹{i.rate}</td>
                        <td className="right">₹{i.qty * i.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-3 space-y-1">
                  <p>Subtotal: ₹{totals.subtotal.toFixed(2)}</p>
                  {isIGST ? (
                    <p>IGST (5%): ₹{totals.igst.toFixed(2)}</p>
                  ) : (
                    <>
                      <p>CGST (2.5%): ₹{totals.cgst.toFixed(2)}</p>
                      <p>SGST (2.5%): ₹{totals.sgst.toFixed(2)}</p>
                    </>
                  )}
                  <p className="text-lg font-semibold">
                    Grand Total: ₹{totals.total.toFixed(2)}
                  </p>
                </div>

                <p className="mt-4 text-xs text-black/60">
                  * Computer generated GST invoice
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="mt-6 w-full py-3 rounded-xl bg-[#6d5dfc] text-white font-medium"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ================= UI ================= */

function IconBtn({ children, className = "", onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition ${className}`}
    >
      {children}
    </button>
  );
}
