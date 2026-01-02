"use client";

import { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  BadgeCheck,
  X,
} from "lucide-react";

/* ================= DATA ================= */

const EMPLOYEES = [
  {
    id: "EMP-001",
    name: "Rohit Sharma",
    role: "Pharmacist",
    department: "Pharmacy",
    phone: "9876543210",
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Anjali Verma",
    role: "Sales Executive",
    department: "Sales",
    phone: "9988776655",
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Suresh Patil",
    role: "Admin",
    department: "Management",
    phone: "9123456789",
    status: "Inactive",
  },
];

const STATUS_STYLE: any = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function EmployeesPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Employees</h1>
          <p className="text-sm text-black/60">
            HRM employee master & access control
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2"
        >
          <UserPlus size={18} /> Add Employee
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {EMPLOYEES.map((emp) => (
              <tr
                key={emp.id}
                className="border-t hover:bg-[#6d5dfc]/5"
              >
                <td className="p-4">
                  <div className="font-medium">{emp.name}</div>
                  <div className="text-xs text-black/60">
                    {emp.id}
                  </div>
                </td>

                <td className="flex items-center gap-2">
                  <ShieldCheck size={14} />
                  {emp.role}
                </td>

                <td>{emp.department}</td>
                <td>{emp.phone}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${STATUS_STYLE[emp.status]}`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <button className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[420px] p-6 relative shadow-xl">
            <button
              onClick={() => setShowAdd(false)}
              className="absolute right-4 top-4 text-black/50 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Add New Employee
            </h3>

            <div className="space-y-3 text-sm">
              <input
                placeholder="Employee Name"
                className="w-full px-4 py-2 rounded-xl bg-black/5"
              />
              <input
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-xl bg-black/5"
              />
              <select className="w-full px-4 py-2 rounded-xl bg-black/5">
                <option>Pharmacist</option>
                <option>Sales Executive</option>
                <option>Admin</option>
                <option>Support</option>
              </select>
              <select className="w-full px-4 py-2 rounded-xl bg-black/5">
                <option>Pharmacy</option>
                <option>Sales</option>
                <option>Management</option>
              </select>
            </div>

            <button className="mt-5 w-full py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center justify-center gap-2">
              <BadgeCheck size={16} /> Save Employee
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
