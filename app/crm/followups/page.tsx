"use client";

import { useMemo, useState } from "react";
import { Phone, CalendarCheck, CheckCircle } from "lucide-react";

/* ================= DATA ================= */

const FOLLOWUPS = [
  {
    id: "FU-001",
    lead: "Dr. Suresh Patil",
    organization: "Patil Clinic",
    phone: "9823012345",
    date: "02 Jan 2026",
    note: "Demo ERP discussion",
    status: "Pending",
  },
  {
    id: "FU-002",
    lead: "Anita Pharmacy",
    organization: "Retail Pharmacy",
    phone: "9898989898",
    date: "02 Jan 2026",
    note: "Price negotiation",
    status: "Pending",
  },
  {
    id: "FU-003",
    lead: "City Hospital",
    organization: "Hospital",
    phone: "9123456789",
    date: "01 Jan 2026",
    note: "Converted – onboarding",
    status: "Done",
  },
];

const STATUS_COLOR: any = {
  Pending: "bg-orange-100 text-orange-700",
  Done: "bg-green-100 text-green-700",
};

/* ================= PAGE ================= */

export default function CRMFollowupsPage() {
  const [filter, setFilter] = useState("Today");

  const rows = useMemo(() => {
    if (filter === "All") return FOLLOWUPS;
    if (filter === "Pending")
      return FOLLOWUPS.filter((f) => f.status === "Pending");
    if (filter === "Done")
      return FOLLOWUPS.filter((f) => f.status === "Done");
    return FOLLOWUPS;
  }, [filter]);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">CRM Follow-ups</h1>
        <p className="text-sm text-black/60">
          Daily sales & onboarding follow-up queue
        </p>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {["Today", "Pending", "Done", "All"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm ${
              filter === f
                ? "bg-[#6d5dfc] text-white"
                : "bg-black/5 hover:bg-black/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Lead</th>
              <th>Follow-up</th>
              <th>Note</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="border-t hover:bg-[#6d5dfc]/5">
                <td className="p-4">
                  <div className="font-medium">{f.lead}</div>
                  <div className="text-xs text-black/60">
                    {f.organization}
                  </div>
                </td>

                <td>
                  <span className="flex items-center gap-2">
                    <CalendarCheck size={14} /> {f.date}
                  </span>
                </td>

                <td>{f.note}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${STATUS_COLOR[f.status]}`}
                  >
                    {f.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                  {f.status === "Pending" && (
                    <button className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs flex items-center gap-1">
                      <CheckCircle size={14} /> Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
