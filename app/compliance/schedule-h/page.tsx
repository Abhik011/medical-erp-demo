"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Eye,
  Printer,
  FileText,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const RECORDS = [
  {
    id: 1,
    date: "2026-01-02",
    medicine: "Azithromycin 500",
    batch: "AZT1123",
    qty: 4,
    patient: "Rahul Mehta",
    doctor: "Dr. S. Kulkarni",
    prescriptionId: "RX-9021",
  },
  {
    id: 2,
    date: "2026-01-02",
    medicine: "Amoxiclav 625",
    batch: "AMX8821",
    qty: 2,
    patient: "Anita Verma",
    doctor: "Dr. P. Shah",
    prescriptionId: "RX-9033",
  },
];

/* ================= PAGE ================= */

export default function ScheduleHPage() {
  const [active, setActive] = useState<any>(null);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <ShieldCheck className="text-[#6d5dfc]" />
            Schedule H Register
          </h1>
          <p className="text-sm text-black/60">
            Mandatory record of Schedule H medicine sales
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <Printer size={16} /> Print Register
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Qty</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Prescription</th>
              <th className="p-4 text-right">View</th>
            </tr>
          </thead>

          <tbody>
            {RECORDS.map((r) => (
              <tr
                key={r.id}
                className="border-t hover:bg-[#6d5dfc]/5 transition"
              >
                <td className="p-4">{r.date}</td>
                <td className="font-medium">{r.medicine}</td>
                <td>{r.batch}</td>
                <td>{r.qty}</td>
                <td>{r.patient}</td>
                <td>{r.doctor}</td>
                <td>
                  <span className="px-2 py-1 rounded-lg text-xs bg-purple-100 text-purple-700">
                    {r.prescriptionId}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setActive(r)}
                    className="px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[480px] p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={18} /> Prescription Record
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Date:</strong> {active.date}</p>
              <p><strong>Medicine:</strong> {active.medicine}</p>
              <p><strong>Batch:</strong> {active.batch}</p>
              <p><strong>Quantity:</strong> {active.qty}</p>
              <p><strong>Patient:</strong> {active.patient}</p>
              <p><strong>Doctor:</strong> {active.doctor}</p>
              <p><strong>Prescription ID:</strong> {active.prescriptionId}</p>
            </div>

            <button
              onClick={() => setActive(null)}
              className="mt-5 w-full py-3 rounded-xl bg-black/5 hover:bg-black/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
