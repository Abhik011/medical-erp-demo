"use client";

import { useRouter } from "next/navigation";
import { Activity, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f6ff] to-[#ecebff]">
      
      {/* Card */}
      <div
        className="
          w-[380px]
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-[0_30px_80px_rgba(124,108,255,0.35)]
        "
      >
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="
              h-14 w-14
              rounded-2xl
              bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
              flex items-center justify-center
              shadow-[0_0_40px_#7c6cffaa]
              mb-3
            "
          >
            <Activity className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-2xl font-semibold text-black">
            Creonox
          </h1>
          <p className="text-sm text-black/60">
            Medical ERP Login
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            placeholder="Username"
            className="
              w-full
              px-4 py-3
              rounded-2xl
              bg-white
              border border-black/10
              focus:outline-none
              focus:ring-2
              focus:ring-[#6d5dfc]/40
            "
          />

          <input
            placeholder="Password"
            type="password"
            className="
              w-full
              px-4 py-3
              rounded-2xl
              bg-white
              border border-black/10
              focus:outline-none
              focus:ring-2
              focus:ring-[#6d5dfc]/40
            "
          />
        </div>

        {/* Login Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="
            w-full
            mt-6
            py-3
            rounded-2xl
            bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
            text-white
            font-medium
            flex items-center justify-center gap-2
            shadow-[0_0_35px_#7c6cff88]
            hover:scale-[1.03]
            transition
          "
        >
          <LogIn size={18} />
          Login
        </button>

        {/* Footer */}
        <p className="text-xs text-black/50 text-center mt-4">
          Demo access • No password required
        </p>
      </div>
    </div>
  );
}
