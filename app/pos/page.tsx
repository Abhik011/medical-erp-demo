"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ScanLine,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle,
  X,
} from "lucide-react";
import CreonoxGlassCard from "@/components/CreonoxGlassCard";

/* ================= TYPES ================= */

type Medicine = {
  id: string;
  name: string;
  loosePrice: number;
  packPrice: number;
  requiresRx: boolean;
  stock: number;
  alternatives?: string[]; // medicine ids
};

/* ================= MEDICINE MASTER ================= */

const MEDICINES: Medicine[] = [
  {
    id: "para-500",
    name: "Paracetamol 500",
    loosePrice: 30,
    packPrice: 300,
    requiresRx: false,
    stock: 120,
  },
  {
    id: "para-650",
    name: "Paracetamol 650",
    loosePrice: 35,
    packPrice: 350,
    requiresRx: false,
    stock: 0,
    alternatives: ["para-500"],
  },
  {
    id: "azithro-500",
    name: "Azithromycin 500 (Schedule H)",
    loosePrice: 120,
    packPrice: 1200,
    requiresRx: true,
    stock: 0,
    alternatives: ["amoxiclav-625"],
  },
  {
    id: "amoxiclav-625",
    name: "Amoxiclav 625 (Schedule H)",
    loosePrice: 95,
    packPrice: 950,
    requiresRx: true,
    stock: 45,
  },
  {
    id: "crocin-cold",
    name: "Crocin Cold & Flu",
    loosePrice: 55,
    packPrice: 550,
    requiresRx: false,
    stock: 18,
  },
];

/* ================= PAGE ================= */

export default function POSPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showRx, setShowRx] = useState(false);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [paid, setPaid] = useState(false);

  const getMaxQty = (item: any) => {
  // demo assumption:
  // 1 pack = 10 loose units
  const PACK_SIZE = 10;

  if (item.mode === "pack") {
    return Math.floor(item.med.stock / PACK_SIZE);
  }

  return item.med.stock;
};


  /* SEARCH */
  const searchMedicine = (value: string) => {
    setQuery(value);
    if (!value) return setResults([]);

    setResults(
      MEDICINES.filter((m) =>
        m.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  type CartItem = {
  med: Medicine;
  qty: number;
  mode: "loose" | "pack";
};

  /* ADD TO CART */
const addMedicine = (med: Medicine) => {
  if (med.stock === 0) return;

  if (med.requiresRx) setShowRx(true);

  setCart((prev) => {
    const existing = prev.find((i) => i.med.id === med.id);
    if (existing) {
      return prev.map((i) =>
        i.med.id === med.id ? { ...i, qty: i.qty + 1 } : i
      );
    }

    return [...prev, { med, qty: 1, mode: "loose" }];
  });

  setTimeout(() => {
    setQuery("");
    setResults([]);
  }, 50);
};


  /* TOTALS */
  const subtotal = useMemo(() => {
  return cart.reduce((sum, i) => {
    const price =
      i.mode === "pack" ? i.med.packPrice : i.med.loosePrice;
    return sum + price * i.qty;
  }, 0);
}, [cart]);


  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const requiresRx = cart.some((i) => i.med.requiresRx);
  const canPay = !requiresRx || rxUploaded;

  return (
    <div className="p-10 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-2">Point of Sale</h1>
      <p className="text-sm text-black/60 mb-8">
        Pharmacy billing with stock & compliance
      </p>

      <div className="grid grid-cols-12 gap-10">

        {/* LEFT */}
        <div className="col-span-12 lg:col-span-7 space-y-6">

          {/* SEARCH */}
          {/* SEARCH */}
<div className="relative">
  <CreonoxGlassCard>
    <div className="flex items-center gap-4">
      <ScanLine className="text-[#7c6cff]" />
      <input
        value={query}
        onChange={(e) => searchMedicine(e.target.value)}
        placeholder="Search medicine"
        className="flex-1 bg-transparent text-lg outline-none"
      />
    </div>
  </CreonoxGlassCard>

  {/* RESULTS */}
  {results.length > 0 && (
    <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-[999]">
      {results.map((m) => (
        <div
          key={m.id}
          className="px-4 py-3 border-b last:border-none"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{m.name}</span>

            {m.stock > 0 ? (
              <span className="text-green-600 text-xs">
                In Stock ({m.stock})
              </span>
            ) : (
              <span className="text-red-600 text-xs">
                Out of Stock
              </span>
            )}
            <div className="text-xs text-black/60 mt-1">
            
  Loose: ₹{m.loosePrice} &nbsp; | &nbsp; Pack: ₹{m.packPrice}
</div>

          </div>

          {m.stock > 0 ? (
            <button
              onClick={() => addMedicine(m)}
              className="text-sm text-[#7c6cff] mt-1"
            >
              Add to bill
            </button>
          ) : (
            m.alternatives && (
              <div className="mt-2 text-xs">
                <p className="text-black/50 mb-1">
                  Alternatives:
                </p>
                {m.alternatives.map((altId) => {
                  const alt = MEDICINES.find(
                    (x) => x.id === altId
                  );
                  if (!alt) return null;

                  return (
                    <button
                      key={alt.id}
                      onClick={() => addMedicine(alt)}
                      className="block text-[#7c6cff]"
                    >
                      {alt.name} (In Stock)
                    </button>
                  );
                })}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )}
</div>

          {/* CART */}
          <CreonoxGlassCard title="Current Bill">
            {cart.length === 0 && (
              <p className="text-sm text-black/50">
                No medicines added
              </p>
            )}

         {cart.map((item) => {
  const unitPrice =
    item.mode === "pack"
      ? item.med.packPrice
      : item.med.loosePrice;

  const totalPrice = unitPrice * item.qty;

  return (
    <div
      key={item.med.id}
      className="
        flex items-center justify-between
        rounded-2xl
        bg-white/30
        backdrop-blur
        px-4 py-3
        mb-3
        shadow
      "
    >
      {/* LEFT */}
      <div className="flex-1">
        <p className="font-medium">{item.med.name}</p>

        <p className="text-xs text-black/60">
          {item.mode === "loose" ? "Loose" : "Pack"} • ₹{unitPrice} / unit
        </p>
      </div>

      {/* MODE */}
      <select
        value={item.mode}
        onChange={(e) =>
          setCart((prev) =>
            prev.map((i) =>
              i.med.id === item.med.id
                ? { ...i, mode: e.target.value as any }
                : i
            )
          )
        }
        className="mx-3 rounded-xl bg-white/40 px-2 py-1 text-sm"
      >
        <option value="loose">Loose</option>
        <option value="pack">Pack</option>
      </select>

      {/* QTY */}
   <input
  type="number"
  min={1}
  max={getMaxQty(item)}
  value={item.qty}
  onChange={(e) => {
    let val = Number(e.target.value);

    const max = getMaxQty(item);
    if (val < 1) val = 1;
    if (val > max) val = max;

    setCart((prev) =>
      prev.map((i) =>
        i.med.id === item.med.id
          ? { ...i, qty: val }
          : i
      )
    );
  }}
  className="w-16 rounded-xl bg-white/40 text-center mr-3"
/>


      {/* TOTAL */}
      <div className="text-right min-w-[80px]">
        <p className="font-semibold text-[#7c6cff]">
          ₹{totalPrice}
        </p>
      </div>
    </div>
  );
})}

          </CreonoxGlassCard>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-5 space-y-6">

          <CreonoxGlassCard>
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="GST" value={`₹${gst}`} />
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span className="text-[#7c6cff]">₹{total}</span>
            </div>
          </CreonoxGlassCard>

          <CreonoxGlassCard title="Payment Method">
            <div className="grid grid-cols-3 gap-4">
              <PayBtn icon={CreditCard} label="Card" />
              <PayBtn icon={Smartphone} label="UPI" />
              <PayBtn icon={Banknote} label="Cash" />
            </div>
          </CreonoxGlassCard>

          <button
            disabled={!canPay}
            onClick={() => setPaid(true)}
            className={`w-full py-4 rounded-2xl font-semibold ${
              canPay
                ? "bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Complete Payment
          </button>
        </div>
      </div>

      {showRx && (
        <Overlay>
          <div className="bg-white p-6 rounded-2xl">
            <h3 className="font-semibold mb-3">
              Prescription Required
            </h3>
            <button
              onClick={() => {
                setRxUploaded(true);
                setShowRx(false);
              }}
              className="w-full py-2 bg-[#6d5dfc] text-white rounded-xl"
            >
              Upload Prescription
            </button>
          </div>
        </Overlay>
      )}

      {paid && (
        <Overlay>
          <div className="bg-white p-8 rounded-3xl text-center">
            <CheckCircle className="mx-auto mb-4 text-[#7c6cff]" size={48} />
            <h2 className="text-xl font-semibold">
              Payment Successful
            </h2>
            <button onClick={() => setPaid(false)} className="mt-4">
              Close
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
}

/* ================= SMALL UI ================= */

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-black/60">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PayBtn({ icon: Icon, label }: any) {
  return (
    <button className="py-4 rounded-2xl bg-white/30 hover:scale-105 transition">
      <Icon className="mx-auto mb-1 text-[#7c6cff]" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function Overlay({ children }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {children}
    </div>
  );
}
