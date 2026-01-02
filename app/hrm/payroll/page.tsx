"use client";

import { useState } from "react";
import {
  IndianRupee,
  FileText,
  Download,
  Eye,
  X,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const PAYROLL = [
  {
    empId: "EMP-001",
    name: "Rohit Sharma",
    role: "Pharmacist",
    daysWorked: 26,
    basic: 18000,
    hra: 6000,
    allowance: 2000,
    pf: 2160,
    esic: 540,
  },
  {
    empId: "EMP-002",
    name: "Anjali Verma",
    role: "Sales Executive",
    daysWorked: 24,
    basic: 15000,
    hra: 5000,
    allowance: 1500,
    pf: 1800,
    esic: 450,
  },
];

/* ================= PAGE ================= */

export default function PayrollPage() {
  const [activeSlip, setActiveSlip] = useState<any>(null);
  const [month, setMonth] = useState("2026-01");

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Payroll</h1>
          <p className="text-sm text-black/60">
            Monthly salary processing & payslips
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5 text-sm"
          />

          <button className="px-5 py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2">
            <Download size={16} /> Bank Export
          </button>
        </div>
      </div>

      {/* PAYROLL TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th>Days</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {PAYROLL.map((p) => {
              const gross = p.basic + p.hra + p.allowance;
              const deductions = p.pf + p.esic;
              const net = gross - deductions;

              return (
                <tr
                  key={p.empId}
                  className="border-t hover:bg-[#6d5dfc]/5"
                >
                  <td className="p-4">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-black/60">
                      {p.empId} • {p.role}
                    </div>
                  </td>

                  <td>{p.daysWorked}</td>

                  <td className="font-medium">
                    ₹{gross.toLocaleString()}
                  </td>

                  <td className="text-red-600">
                    ₹{deductions.toLocaleString()}
                  </td>

                  <td className="font-semibold text-green-600">
                    ₹{net.toLocaleString()}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <IconBtn onClick={() => setActiveSlip({ ...p, gross, deductions, net })}>
                      <Eye size={16} />
                    </IconBtn>

                    <IconBtn>
                      <FileText size={16} />
                    </IconBtn>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAYSLIP MODAL */}
      {activeSlip && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[520px] p-6 relative shadow-xl">
            <button
              onClick={() => setActiveSlip(null)}
              className="absolute right-4 top-4 text-black/50 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Payslip – {month}
            </h3>

            <div className="text-sm space-y-2">
              <p><strong>Employee:</strong> {activeSlip.name}</p>
              <p><strong>Employee ID:</strong> {activeSlip.empId}</p>
              <p><strong>Role:</strong> {activeSlip.role}</p>
              <p><strong>Days Worked:</strong> {activeSlip.daysWorked}</p>

              <hr />

              <p>Basic: ₹{activeSlip.basic}</p>
              <p>HRA: ₹{activeSlip.hra}</p>
              <p>Allowance: ₹{activeSlip.allowance}</p>

              <p className="font-medium">
                Gross: ₹{activeSlip.gross}
              </p>

              <p>PF: ₹{activeSlip.pf}</p>
              <p>ESIC: ₹{activeSlip.esic}</p>

              <p className="font-semibold text-green-600">
                Net Pay: ₹{activeSlip.net}
              </p>
            </div>

            <button className="mt-6 w-full py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center justify-center gap-2">
              <IndianRupee size={16} /> Download Payslip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= UI ================= */

function IconBtn({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition"
    >
      {children}
    </button>
  );
}
