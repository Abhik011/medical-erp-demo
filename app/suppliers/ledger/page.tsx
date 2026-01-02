"use client";

import { useMemo, useState } from "react";
import { FileText, Download } from "lucide-react";

/* ================= DEMO DATA ================= */

const SUPPLIERS = [
  {
    id: 1,
    name: "ABC Pharma",
    openingBalance: 15000,
  },
  {
    id: 2,
    name: "XYZ Distributors",
    openingBalance: -2500, // advance paid
  },
];

const LEDGER = [
  {
    supplierId: 1,
    date: "02 Jan 2026",
    ref: "PO-1023",
    type: "Purchase",
    debit: 12000,
    credit: 0,
  },
  {
    supplierId: 1,
    date: "05 Jan 2026",
    ref: "PAY-778",
    type: "Payment",
    debit: 0,
    credit: 8000,
  },
  {
    supplierId: 1,
    date: "07 Jan 2026",
    ref: "PR-221",
    type: "Purchase Return",
    debit: 0,
    credit: 2000,
  },
  {
    supplierId: 2,
    date: "01 Jan 2026",
    ref: "PAY-654",
    type: "Advance Payment",
    debit: 0,
    credit: 2500,
  },
];

/* ================= PAGE ================= */

export default function SupplierLedgerPage() {
  const [supplierId, setSupplierId] = useState<number>(SUPPLIERS[0].id);

  const supplier = SUPPLIERS.find((s) => s.id === supplierId)!;

  const rows = useMemo(() => {
    let balance = supplier.openingBalance;

    return LEDGER.filter((l) => l.supplierId === supplierId).map((l) => {
      balance += l.debit;
      balance -= l.credit;

      return {
        ...l,
        balance,
      };
    });
  }, [supplierId, supplier.openingBalance]);

  const closingBalance =
    rows.length > 0
      ? rows[rows.length - 1].balance
      : supplier.openingBalance;

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black">
            Supplier Ledger
          </h1>
          <p className="text-sm text-black/60">
            Supplier-wise payable & transaction history
          </p>
        </div>

        <button
          onClick={() => alert("Ledger Exported (Demo)")}
          className="px-4 py-2 rounded-xl bg-black/5 flex items-center gap-2"
        >
          <Download size={16} /> Export
        </button>
      </div>

      {/* SUPPLIER SELECT */}
      <div className="mb-6">
        <label className="text-sm text-black/60 block mb-2">
          Select Supplier
        </label>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(Number(e.target.value))}
          className="px-4 py-2 rounded-xl bg-black/5"
        >
          {SUPPLIERS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard label="Opening Balance" value={supplier.openingBalance} />
        <SummaryCard label="Closing Balance" value={closingBalance} />
        <SummaryCard
          label="Status"
          value={
            closingBalance > 0
              ? "Payable"
              : closingBalance < 0
              ? "Advance"
              : "Settled"
          }
          text
        />
      </div>

      {/* LEDGER TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th>Reference</th>
              <th>Type</th>
              <th className="text-right">Debit</th>
              <th className="text-right">Credit</th>
              <th className="text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-[#6d5dfc]/5">
                <td className="p-4">{r.date}</td>
                <td>{r.ref}</td>
                <td>{r.type}</td>
                <td className="text-right">
                  {r.debit ? `₹${r.debit}` : "-"}
                </td>
                <td className="text-right">
                  {r.credit ? `₹${r.credit}` : "-"}
                </td>
                <td
                  className={`text-right font-medium ${
                    r.balance > 0
                      ? "text-red-600"
                      : r.balance < 0
                      ? "text-green-600"
                      : "text-black"
                  }`}
                >
                  ₹{r.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= UI ================= */

function SummaryCard({ label, value, text }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <p className="text-xs text-black/60">{label}</p>
      <p className="text-lg font-semibold">
        {text ? value : `₹${value}`}
      </p>
    </div>
  );
}
