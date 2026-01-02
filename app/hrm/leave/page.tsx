"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Plus,
  X,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const LEAVES = [
  {
    id: 1,
    empId: "EMP-001",
    name: "Rohit Sharma",
    type: "Casual Leave",
    from: "2026-01-10",
    to: "2026-01-11",
    days: 2,
    status: "Pending",
  },
  {
    id: 2,
    empId: "EMP-002",
    name: "Anjali Verma",
    type: "Sick Leave",
    from: "2026-01-05",
    to: "2026-01-05",
    days: 1,
    status: "Approved",
  },
];

/* ================= PAGE ================= */

export default function LeavePage() {
  const [requests, setRequests] = useState(LEAVES);
  const [showApply, setShowApply] = useState(false);

  const updateStatus = (id: number, status: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Leave Management</h1>
          <p className="text-sm text-black/60">
            Employee leave requests & approvals
          </p>
        </div>

        <button
          onClick={() => setShowApply(true)}
          className="px-5 py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <Plus size={16} /> Apply Leave
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((l) => (
              <tr
                key={l.id}
                className="border-t hover:bg-[#6d5dfc]/5"
              >
                <td className="p-4">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-black/60">
                    {l.empId}
                  </div>
                </td>

                <td>{l.type}</td>
                <td>{l.from}</td>
                <td>{l.to}</td>
                <td>{l.days}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      l.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : l.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {l.status}
                  </span>
                </td>

                <td className="p-4 text-right space-x-2">
                  {l.status === "Pending" && (
                    <>
                      <ActionBtn
                        onClick={() => updateStatus(l.id, "Approved")}
                        color="green"
                        icon={<CheckCircle size={16} />}
                      />
                      <ActionBtn
                        onClick={() => updateStatus(l.id, "Rejected")}
                        color="red"
                        icon={<XCircle size={16} />}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPLY LEAVE MODAL */}
      {showApply && (
        <Modal onClose={() => setShowApply(false)}>
          <h3 className="text-lg font-semibold mb-4">
            Apply Leave
          </h3>

          <div className="space-y-3 text-sm">
            <select className="w-full px-4 py-2 rounded-xl bg-black/5">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Paid Leave</option>
            </select>

            <input type="date" className="input" />
            <input type="date" className="input" />

            <textarea
              placeholder="Reason"
              className="w-full px-4 py-2 rounded-xl bg-black/5"
            />
          </div>

          <button className="mt-4 w-full py-3 rounded-xl bg-[#6d5dfc] text-white">
            Submit Leave
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

function ActionBtn({ onClick, color, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-xl ${
        color === "green"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {icon}
    </button>
  );
}

function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[420px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-black/50"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
