"use client";

import { useMemo, useState } from "react";
import {
  Phone,
  Mail,
  Calendar,
  UserPlus,
  ArrowRight,
} from "lucide-react";

/* ================= DATA ================= */

const LEADS = [
  {
    id: "LEAD-001",
    name: "Dr. Suresh Patil",
    organization: "Patil Clinic",
    phone: "9823012345",
    email: "drpatil@gmail.com",
    source: "Field Sales",
    status: "New",
    nextFollowUp: "05 Jan 2026",
  },
  {
    id: "LEAD-002",
    name: "Anita Pharmacy",
    organization: "Retail Pharmacy",
    phone: "9898989898",
    email: "",
    source: "Referral",
    status: "Contacted",
    nextFollowUp: "04 Jan 2026",
  },
  {
    id: "LEAD-003",
    name: "City Hospital",
    organization: "Hospital",
    phone: "9123456789",
    email: "purchase@cityhospital.com",
    source: "Inbound",
    status: "Converted",
    nextFollowUp: "",
  },
  {
    id: "LEAD-004",
    name: "Dr. Amit Shah",
    organization: "Private Practice",
    phone: "9012345678",
    email: "",
    source: "Walk-in",
    status: "Lost",
    nextFollowUp: "",
  },
];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-orange-100 text-orange-700",
  Converted: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function CRMLeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const rows = useMemo(() => {
    return LEADS.filter((l) => {
      if (status !== "All" && l.status !== status) return false;
      if (
        query &&
        !(
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.organization.toLowerCase().includes(query.toLowerCase()) ||
          l.phone.includes(query)
        )
      ) {
        return false;
      }
      return true;
    });
  }, [query, status]);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black">
            CRM Leads
          </h1>
          <p className="text-sm text-black/60">
            Doctors, hospitals & pharmacy business leads
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#6d5dfc] text-white flex gap-2 items-center">
          <UserPlus size={16} /> Add Lead
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, clinic, phone"
          className="px-4 py-2 rounded-xl bg-black/5 w-72"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/5"
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
          <option>Lost</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(124,108,255,0.25)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 text-left">Lead</th>
              <th>Contact</th>
              <th>Source</th>
              <th>Status</th>
              <th>Next Follow-up</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((l) => (
              <tr
                key={l.id}
                className="border-t hover:bg-[#6d5dfc]/5 transition"
              >
                <td className="p-4">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-black/60">
                    {l.organization}
                  </div>
                </td>

                <td>
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {l.phone}
                    </span>
                    {l.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {l.email}
                      </span>
                    )}
                  </div>
                </td>

                <td>{l.source}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${STATUS_COLORS[l.status]}`}
                  >
                    {l.status}
                  </span>
                </td>

                <td>
                  {l.nextFollowUp ? (
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {l.nextFollowUp}
                    </span>
                  ) : (
                    <span className="text-black/40">—</span>
                  )}
                </td>

                <td className="p-4 text-right space-x-2">
                  <ActionBtn label="Follow-up" />
                  {l.status !== "Converted" && (
                    <ActionBtn
                      label="Convert"
                      primary
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER NOTES */}
      <div className="mt-6 text-sm text-black/60 space-y-1">
        <p>• Converted leads become customers automatically</p>
        <p>• Follow-up dates help sales reminders</p>
        <p>• Ideal for doctor & hospital onboarding</p>
      </div>
    </div>
  );
}

/* ================= UI ================= */

function ActionBtn({ label, primary }: any) {
  return (
    <button
      className={`px-3 py-2 rounded-xl text-xs transition ${
        primary
          ? "bg-[#6d5dfc] text-white"
          : "bg-black/5 hover:bg-black/10"
      }`}
    >
      <ArrowRight size={14} className="inline mr-1" />
      {label}
    </button>
  );
}
