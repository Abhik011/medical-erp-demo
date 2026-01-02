"use client";

import { useState } from "react";
import CreonoxGlassCard from "@/components/CreonoxGlassCard";

const SUPPLIERS = [
  {
    name: "ABC Pharma",
    gstin: "27ABCDE1234F1Z5",
    phone: "9876543210",
    balance: 12500,
  },
  {
    name: "ColdCare Ltd",
    gstin: "27XYZDE6789F1Z9",
    phone: "9988776655",
    balance: 4200,
  },
];

export default function SupplierPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-6">
        Supplier Management
      </h1>

      <CreonoxGlassCard>
        {SUPPLIERS.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-black/50">
                GSTIN: {s.gstin}
              </p>
              <p className="text-xs text-black/50">
                Phone: {s.phone}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm">Outstanding</p>
              <p className="font-semibold text-[#6d5dfc]">
                ₹{s.balance}
              </p>
            </div>
          </div>
        ))}
      </CreonoxGlassCard>
    </div>
  );
}
