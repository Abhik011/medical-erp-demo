"use client";

import { FileText, X } from "lucide-react";

export default function PrescriptionPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur">
      <div
        className="
          w-[420px]
          rounded-[28px]
          bg-white/80
          backdrop-blur-2xl
          p-6
          shadow-[0_0_80px_#7c6cff88]
        "
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Prescription Required
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-black/60 mb-6">
          This medicine is classified under Schedule H. A valid
          prescription is mandatory.
        </p>

        <button
          className="
            w-full
            flex items-center justify-center gap-2
            py-3
            rounded-2xl
            bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
            text-white
            shadow-[0_0_40px_#7c6cffaa]
          "
        >
          <FileText className="h-5 w-5" />
          Upload Prescription
        </button>
      </div>
    </div>
  );
}
