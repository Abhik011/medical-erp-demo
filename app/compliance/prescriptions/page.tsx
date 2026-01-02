"use client";

import { useState } from "react";
import {
  FileText,
  Eye,
  Printer,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const PRESCRIPTIONS = [
  {
    id: "RX-9021",
    date: "02 Jan 2026",
    patient: "Rahul Mehta",
    doctor: "Dr. S. Kulkarni",
    medicine: "Azithromycin 500",
    invoice: "INV-1001",
    schedule: "Schedule H",
    status: "VERIFIED",
  },
  {
    id: "RX-9033",
    date: "02 Jan 2026",
    patient: "Anita Verma",
    doctor: "Dr. P. Shah",
    medicine: "Amoxiclav 625",
    invoice: "INV-1002",
    schedule: "Schedule H",
    status: "PENDING",
  },
];

/* ================= PAGE ================= */

export default function PrescriptionAuditPage() {
  const [active, setActive] = useState<any>(null);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <FileText className="text-[#6d5dfc]" />
            Prescription Audit
          </h1>
          <p className="text-sm text-black/60">
            Uploaded prescriptions linked with Schedule H / H1 sales
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <Printer size={16} /> Print Audit
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th>Prescription ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Medicine</th>
              <th>Invoice</th>
              <th>Schedule</th>
              <th>Status</th>
              <th className="p-4 text-right">View</th>
            </tr>
          </thead>

          <tbody>
            {PRESCRIPTIONS.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-[#6d5dfc]/5 transition"
              >
                <td className="p-4">{p.date}</td>
                <td className="font-medium">{p.id}</td>
                <td>{p.patient}</td>
                <td>{p.doctor}</td>
                <td>{p.medicine}</td>
                <td>
                  <span className="px-2 py-1 rounded-lg text-xs bg-blue-100 text-blue-700">
                    {p.invoice}
                  </span>
                </td>
                <td>{p.schedule}</td>
                <td>
                  {p.status === "VERIFIED" ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                      Pending
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setActive(p)}
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

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[500px] p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              Prescription Details
            </h3>

            <div className="space-y-2 text-sm mb-4">
              <p><strong>Prescription ID:</strong> {active.id}</p>
              <p><strong>Date:</strong> {active.date}</p>
              <p><strong>Patient:</strong> {active.patient}</p>
              <p><strong>Doctor:</strong> {active.doctor}</p>
              <p><strong>Medicine:</strong> {active.medicine}</p>
              <p><strong>Invoice:</strong> {active.invoice}</p>
              <p><strong>Schedule:</strong> {active.schedule}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2">
                <CheckCircle size={16} /> Verify
              </button>

              <button className="flex-1 py-3 rounded-xl bg-red-600 text-white flex items-center justify-center gap-2">
                <XCircle size={16} /> Reject
              </button>
            </div>

            <button
              onClick={() => setActive(null)}
              className="mt-4 w-full py-2 rounded-xl bg-black/5 hover:bg-black/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
