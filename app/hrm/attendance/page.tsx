"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";

/* ================= DEMO DATA ================= */

const ATTENDANCE = [
  {
    empId: "EMP-001",
    name: "Rohit Sharma",
    role: "Pharmacist",
    inTime: "09:05 AM",
    outTime: "06:10 PM",
    status: "Present",
  },
  {
    empId: "EMP-002",
    name: "Anjali Verma",
    role: "Sales Executive",
    inTime: "09:30 AM",
    outTime: "—",
    status: "Late",
  },
  {
    empId: "EMP-003",
    name: "Suresh Patil",
    role: "Admin",
    inTime: "—",
    outTime: "—",
    status: "Absent",
  },
];

const STATUS_STYLE: any = {
  Present: "bg-green-100 text-green-700",
  Late: "bg-orange-100 text-orange-700",
  Absent: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function AttendancePage() {
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [showPunch, setShowPunch] = useState(false);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Attendance</h1>
          <p className="text-sm text-black/60">
            Daily attendance register for employees
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <CalendarDays className="text-black/50" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-xl bg-black/5 text-sm"
          />

          <button
            onClick={() => setShowPunch(true)}
            className="px-5 py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
          >
            <Clock size={16} /> Manual Punch
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th>Role</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {ATTENDANCE.map((a) => (
              <tr
                key={a.empId}
                className="border-t hover:bg-[#6d5dfc]/5"
              >
                <td className="p-4">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-black/60">
                    {a.empId}
                  </div>
                </td>
                <td>{a.role}</td>
                <td>{a.inTime}</td>
                <td>{a.outTime}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${STATUS_STYLE[a.status]}`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MANUAL PUNCH MODAL */}
      {showPunch && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[420px] p-6 relative shadow-xl">
            <button
              onClick={() => setShowPunch(false)}
              className="absolute right-4 top-4 text-black/50 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Manual Attendance Punch
            </h3>

            <div className="space-y-3 text-sm">
              <select className="w-full px-4 py-2 rounded-xl bg-black/5">
                <option>Select Employee</option>
                {ATTENDANCE.map((a) => (
                  <option key={a.empId}>
                    {a.name}
                  </option>
                ))}
              </select>

              <select className="w-full px-4 py-2 rounded-xl bg-black/5">
                <option>IN Punch</option>
                <option>OUT Punch</option>
              </select>

              <input
                type="time"
                className="w-full px-4 py-2 rounded-xl bg-black/5"
              />
            </div>

            <button className="mt-5 w-full py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center justify-center gap-2">
              <CheckCircle size={16} /> Save Punch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
