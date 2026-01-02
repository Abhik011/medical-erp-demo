"use client";

import { useState } from "react";
import { Edit, Trash2, FileText } from "lucide-react";
import Link from "next/link";

/* ================= DEMO DATA ================= */

const initialDrafts = [
  {
    id: "DRF-001",
    customer: "Rahul Mehta",
    items: 3,
    amount: 420,
    updatedAt: "10 mins ago",
  },
  {
    id: "DRF-002",
    customer: "Walk-in",
    items: 1,
    amount: 95,
    updatedAt: "35 mins ago",
  },
  {
    id: "DRF-003",
    customer: "Anita Pharmacy",
    items: 5,
    amount: 1180,
    updatedAt: "1 hr ago",
  },
];

/* ================= PAGE ================= */

export default function DraftBillsPage() {
  const [drafts, setDrafts] = useState(initialDrafts);

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">
          Draft Bills
        </h1>
        <p className="text-sm text-black/60">
          Saved bills that can be resumed or discarded
        </p>
      </div>

      {/* EMPTY STATE */}
      {drafts.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <FileText className="mx-auto mb-3 text-black/40" size={40} />
          <p className="text-black/60">No draft bills found</p>
        </div>
      )}

      {/* DRAFT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="
              bg-white rounded-2xl p-6
              shadow-[0_20px_60px_rgba(124,108,255,0.25)]
              transition hover:scale-[1.01]
            "
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-black/50">
                  {draft.id}
                </p>
                <p className="font-semibold text-lg text-black">
                  {draft.customer}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                Draft
              </span>
            </div>

            {/* DETAILS */}
            <div className="text-sm text-black/70 space-y-1 mb-4">
              <p>Items: <strong>{draft.items}</strong></p>
              <p>Total: <strong>₹{draft.amount}</strong></p>
              <p className="text-xs text-black/40">
                Last updated {draft.updatedAt}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <Link
                href={`/pos?draft=${draft.id}`}
                className="
                  flex-1 py-2 rounded-xl
                  bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
                  text-white text-sm font-medium
                  flex items-center justify-center gap-2
                "
              >
                <Edit size={16} />
                Resume
              </Link>

              <button
                onClick={() => deleteDraft(draft.id)}
                className="
                  px-4 py-2 rounded-xl
                  bg-red-100 text-red-700
                  hover:bg-red-200 transition
                "
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
