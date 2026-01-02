"use client";

import { Bell, ChevronDown, User, GitBranch } from "lucide-react";
import { useState } from "react";

const branches = ["Main Branch", "Andheri Branch", "Pune Branch"];

export default function Topbar() {
  const [branch, setBranch] = useState(branches[0]);

  return (
    <header
      className="
        sticky top-4 z-40
        mx-4
        h-16
        rounded-[26px]
        bg-white/15
        backdrop-blur-2xl
        shadow-[0_0_80px_#6d5dfc66]
        ring-1 ring-white/10
        px-6
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div className="leading-tight">
        <h1 className="text-lg font-semibold text-black">
          Dashboard
        </h1>
        <p className="text-xs text-black/60">
          {branch}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Branch Selector */}
        <div
          className="
            flex items-center gap-2
            rounded-2xl
            bg-white/30
            backdrop-blur
            px-4 py-2
            shadow-[0_0_30px_#7c6cff55]
          "
        >
          <GitBranch className="h-4 w-4 text-[#7c6cff]" />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="
              bg-transparent
              text-sm
              text-black
              outline-none
              cursor-pointer
            "
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 text-black/60" />
        </div>

        {/* Notifications */}
        <button
          className="
            h-10 w-10
            rounded-2xl
            bg-white/30
            backdrop-blur
            shadow-[0_0_30px_#7c6cff55]
            flex items-center justify-center
            hover:scale-105
            transition
          "
        >
          <Bell className="h-5 w-5 text-black/80" />
        </button>

        {/* User */}
        <button
          className="
            h-10 w-10
            rounded-2xl
            bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
            shadow-[0_0_40px_#7c6cff99]
            flex items-center justify-center
          "
        >
          <User className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
}
