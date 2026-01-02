"use client";

import { useMemo, useState } from "react";
import {
  FilePlus,
  CheckCircle,
  Truck,
  X,
} from "lucide-react";

/* ================= DATA ================= */

const SUPPLIERS = [
  {
    id: "sup-1",
    name: "ABC Pharma",
    gst: "27ABCDE1234F1Z5",
  },
  {
    id: "sup-2",
    name: "XYZ Distributors",
    gst: "27XYZDE5678A1Z9",
  },
];

const MEDICINES = [
  {
    id: "para-500",
    name: "Paracetamol 500",
    rate: 18,
    gst: 5,
  },
  {
    id: "azithro-500",
    name: "Azithromycin 500",
    rate: 95,
    gst: 12,
  },
  {
    id: "insulin",
    name: "Insulin Injection",
    rate: 160,
    gst: 5,
  },
];

/* ================= TYPES ================= */

type POItem = {
  medicineId: string;
  qty: number;
  rate: number;
  gst: number;
};

/* ================= PAGE ================= */

export default function PurchaseOrderPage() {
  const [supplier, setSupplier] = useState<any>(null);
  const [items, setItems] = useState<POItem[]>([]);
  const [status, setStatus] = useState<"DRAFT" | "APPROVED" | "RECEIVED">("DRAFT");

  /* ADD ITEM */
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        medicineId: "",
        qty: 1,
        rate: 0,
        gst: 0,
      },
    ]);
  };

  /* CALCULATIONS */
  const totals = useMemo(() => {
    let subtotal = 0;
    let gstTotal = 0;

    items.forEach((i) => {
      const line = i.qty * i.rate;
      subtotal += line;
      gstTotal += (line * i.gst) / 100;
    });

    return {
      subtotal,
      gstTotal,
      grandTotal: subtotal + gstTotal,
    };
  }, [items]);

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Purchase Order
        </h1>
        <p className="text-sm text-black/60">
          Supplier procurement & inward tracking
        </p>
      </div>

      {/* STATUS BAR */}
      <div className="flex gap-4 mb-6">
        <StatusBadge label="Draft" active={status === "DRAFT"} />
        <StatusBadge label="Approved" active={status === "APPROVED"} />
        <StatusBadge label="Received" active={status === "RECEIVED"} />
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_25px_80px_rgba(124,108,255,0.35)] space-y-6">

        {/* SUPPLIER */}
        <div>
          <label className="text-sm text-black/60 block mb-2">
            Supplier
          </label>
          <select
            value={supplier?.id || ""}
            onChange={(e) =>
              setSupplier(
                SUPPLIERS.find((s) => s.id === e.target.value)
              )
            }
            className="w-full px-4 py-2 rounded-xl bg-black/5"
          >
            <option value="">Select supplier</option>
            {SUPPLIERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {supplier && (
            <p className="text-xs text-black/50 mt-1">
              GST: {supplier.gst}
            </p>
          )}
        </div>

        {/* ITEMS */}
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Order Items</h3>
            <button
              onClick={addItem}
              className="text-sm text-[#6d5dfc] flex items-center gap-1"
            >
              <FilePlus size={14} /> Add Item
            </button>
          </div>

          {items.length === 0 && (
            <p className="text-sm text-black/50">
              No items added
            </p>
          )}

          {items.map((item, index) => {
            const med = MEDICINES.find((m) => m.id === item.medicineId);

            return (
              <div
                key={index}
                className="grid grid-cols-5 gap-3 mb-3"
              >
                <select
                  value={item.medicineId}
                  onChange={(e) => {
                    const m = MEDICINES.find(
                      (x) => x.id === e.target.value
                    );
                    setItems((prev) =>
                      prev.map((i, idx) =>
                        idx === index
                          ? {
                              ...i,
                              medicineId: e.target.value,
                              rate: m?.rate || 0,
                              gst: m?.gst || 0,
                            }
                          : i
                      )
                    );
                  }}
                  className="px-3 py-2 rounded-xl bg-black/5 col-span-2"
                >
                  <option value="">Medicine</option>
                  {MEDICINES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((i, idx) =>
                        idx === index
                          ? { ...i, qty: Number(e.target.value) }
                          : i
                      )
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-black/5"
                  placeholder="Qty"
                />

                <input
                  type="number"
                  value={item.rate}
                  className="px-3 py-2 rounded-xl bg-black/5"
                  readOnly
                />

                <input
                  type="number"
                  value={item.gst}
                  className="px-3 py-2 rounded-xl bg-black/5"
                  readOnly
                />
              </div>
            );
          })}
        </div>

        {/* TOTALS */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={`₹${totals.subtotal.toFixed(2)}`} />
          <Row label="GST" value={`₹${totals.gstTotal.toFixed(2)}`} />
          <Row
            label="Grand Total"
            value={`₹${totals.grandTotal.toFixed(2)}`}
            strong
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setStatus("APPROVED")}
            className="flex-1 py-3 rounded-xl bg-[#6d5dfc] text-white"
          >
            Approve PO
          </button>

          <button
            onClick={() => setStatus("RECEIVED")}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white flex justify-center gap-2"
          >
            <Truck size={18} /> Mark as Received
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI ================= */

function StatusBadge({ label, active }: any) {
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm ${
        active
          ? "bg-[#6d5dfc] text-white"
          : "bg-black/5 text-black/60"
      }`}
    >
      {label}
    </span>
  );
}

function Row({ label, value, strong }: any) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "font-semibold" : "text-black/60"}>
        {label}
      </span>
      <span className={strong ? "font-semibold" : ""}>
        {value}
      </span>
    </div>
  );
}
