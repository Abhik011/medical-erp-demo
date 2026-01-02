"use client";

import { useMemo, useState, useEffect } from "react";
import {
  X,
  ArrowRightLeft,
  FilePlus,
  Download,
  AlertTriangle,
  RotateCcw,
  ClipboardList,
} from "lucide-react";

/* ================= DATA ================= */

const BRANCHES = ["Main Branch", "Pune Branch", "Mumbai Branch"];

const inventory = [
  {
    name: "Paracetamol 500",
    batch: "PCM0923",
    expiry: "2026-08",
    stock: 120,
    schedule: "OTC",
    branch: "Main Branch",
    supplier: "ABC Pharma",
  },
  {
    name: "Azithromycin",
    batch: "AZT1123",
    expiry: "2025-02",
    stock: 6,
    schedule: "Schedule H",
    branch: "Main Branch",
    supplier: "XYZ Distributors",
  },
  {
    name: "Insulin Injection",
    batch: "INS0424",
    expiry: "2024-12",
    stock: 18,
    schedule: "Cold Chain",
    branch: "Pune Branch",
    supplier: "ColdCare Ltd",
  },
];


/* ================= PAGE ================= */

export default function InventoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [threshold, setThreshold] = useState(10);

  const [activeBatch, setActiveBatch] = useState<any>(null);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showPO, setShowPO] = useState(false);
  const [showExpiryReturn, setShowExpiryReturn] = useState(false);
  const [showPurchaseReturn, setShowPurchaseReturn] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);

  const filtered = useMemo(() => {
    return inventory.filter((m) => {
      if (m.branch !== branch) return false;
      if (filter !== "All" && m.schedule !== filter) return false;
      if (query && !m.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [query, filter, branch]);

 const [alerts, setAlerts] = useState({
  expiring: 0,
  expired: 0,
  scheduleH: 0,
});

useEffect(() => {
  const now = new Date();
  const year = 1000 * 60 * 60 * 24 * 365;

  let expiring = 0;
  let expired = 0;

  inventory.forEach((i) => {
    const exp = new Date(i.expiry + "-01");
    const diff = exp.getTime() - now.getTime();
    const progress = (diff / year) * 100;

    if (progress <= 0) expired++;
    else if (progress < 30) expiring++;
  });

  setAlerts({
    expiring,
    expired,
    scheduleH: inventory.filter((i) => i.schedule === "Schedule H").length,
  });
}, []);

function ExpiryProgressBar({ expiry }: { expiry: string }) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const exp = new Date(expiry + "-01");
    const diff = exp.getTime() - now.getTime();
    const year = 1000 * 60 * 60 * 24 * 365;

    const value = Math.max(0, Math.min(100, (diff / year) * 100));
    setProgress(Number(value.toFixed(2)));
  }, [expiry]);

  if (progress === null) {
    // ✅ SAME markup on server + client
    return <div className="h-2 bg-black/10 rounded-full" />;
  }

  return (
    <div className="h-2 bg-black/10 rounded-full">
      <div
        className={`h-2 rounded-full ${
          progress < 25
            ? "bg-red-500"
            : progress < 50
            ? "bg-orange-500"
            : "bg-green-500"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

  return (
    <>
      {/* ALERT DASHBOARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <AlertCard title="Expiring Soon" value={alerts.expiring} color="orange" />
        <AlertCard title="Expired Batches" value={alerts.expired} color="red" />
        <AlertCard title="Schedule H Risk" value={alerts.scheduleH} color="purple" />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_25px_80px_rgba(124,108,255,0.35)]">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-black">Inventory</h2>
            <p className="text-sm text-black/60">
              Batch-wise stock & expiry monitoring
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPO(true)}
              className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex gap-2 items-center"
            >
              <FilePlus size={16} /> Create PO
            </button>

            <button
              onClick={() => alert("CSV Exported (Demo)")}
              className="px-4 py-2 rounded-xl bg-black/5 flex gap-2 items-center"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            placeholder="Search medicine"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5 text-sm"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5 text-sm"
          >
            <option>All</option>
            <option>OTC</option>
            <option>Schedule H</option>
            <option>Cold Chain</option>
          </select>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5 text-sm"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-black/60">Low stock below</span>
            <input
              type="range"
              min={1}
              max={50}
              value={threshold}
              onChange={(e) => setThreshold(+e.target.value)}
            />
            <span className="font-medium text-black">{threshold}</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-black/5">
          <table className="w-full text-sm">
            <thead className="bg-black/5">
              <tr>
                <th className="p-4">Medicine</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Schedule</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
              
                const lowStock = m.stock < threshold;

                return (
                  <tr
                    key={i}
                    onClick={() => setActiveBatch(m)}
                    className="border-t hover:bg-[#6d5dfc]/5 cursor-pointer"
                  >
                    <td className="p-4 font-medium">{m.name}</td>
                    <td className="p-4">{m.batch}</td>
                 <td className="p-4">
  <div className="text-xs mb-1">{m.expiry}</div>
  <ExpiryProgressBar expiry={m.expiry} />
</td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${lowStock ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                        }`}>
                        {m.stock}
                      </span>
                    </td>
                    <td className="p-4">{m.schedule}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BATCH MODAL */}
      {activeBatch && (
        <Overlay>
          <div className="w-[420px] bg-white rounded-2xl p-6">
            <Header title="Batch Details" onClose={() => setActiveBatch(null)} />

            <ul className="text-sm space-y-2 mb-4">
              <li><strong>Medicine:</strong> {activeBatch.name}</li>
              <li><strong>Batch:</strong> {activeBatch.batch}</li>
              <li><strong>Expiry:</strong> {activeBatch.expiry}</li>
              <li><strong>Stock:</strong> {activeBatch.stock}</li>
              <li><strong>Supplier:</strong> {activeBatch.supplier}</li>
            </ul>

            <div className="space-y-2">
              <ActionBtn icon={<ArrowRightLeft size={16} />} label="Transfer Stock" onClick={() => setShowTransfer(true)} />
              <ActionBtn icon={<RotateCcw size={16} />} label="Purchase Return" onClick={() => setShowPurchaseReturn(true)} />
              <ActionBtn icon={<AlertTriangle size={16} />} label="Expired Return" danger onClick={() => setShowExpiryReturn(true)} />
              <ActionBtn icon={<ClipboardList size={16} />} label="Stock Adjustment" onClick={() => setShowAdjustment(true)} />
            </div>
          </div>
        </Overlay>
      )}

      {showTransfer && <SimpleModal title="Stock Transfer" onClose={() => setShowTransfer(false)} />}
      {showExpiryReturn && <SimpleModal title="Expired Return" danger onClose={() => setShowExpiryReturn(false)} />}
      {showPurchaseReturn && <SimpleModal title="Purchase Return" onClose={() => setShowPurchaseReturn(false)} />}
      {showAdjustment && <SimpleModal title="Stock Adjustment" onClose={() => setShowAdjustment(false)} />}
      {showPO && <SimpleModal title="Create Purchase Order" onClose={() => setShowPO(false)} />}
    </>
  );
}

/* ================= HELPERS ================= */



/* ================= UI ================= */

function AlertCard({ title, value, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <p className="text-xs text-black/60">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, danger }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 ${danger ? "bg-red-600 text-white" : "bg-[#6d5dfc] text-white"
        }`}
    >
      {icon} {label}
    </button>
  );
}

function SimpleModal({ title, onClose, danger }: any) {
  return (
    <Overlay>
      <div className="w-[420px] bg-white rounded-2xl p-6">
        <Header title={title} onClose={onClose} />
        <input className="w-full px-3 py-2 rounded-xl bg-black/5 mb-3" placeholder="Quantity" />
        <button className={`w-full py-3 rounded-xl ${danger ? "bg-red-600" : "bg-[#6d5dfc]"} text-white`}>
          Confirm
        </button>
      </div>
    </Overlay>
  );
}

function Overlay({ children }: any) {
  return <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">{children}</div>;
}

function Header({ title, onClose }: any) {
  return (
    <div className="flex justify-between mb-4">
      <h3 className="font-semibold">{title}</h3>
      <button onClick={onClose}><X /></button>
    </div>

    
  );
}
