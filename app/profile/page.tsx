"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  Key,
  Save,
} from "lucide-react";

/* ================= TYPES ================= */

type Profile = {
  name: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
};

type InputProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

type ReadonlyRowProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "Abhijeet Kulkarni",
    email: "admin@creonox.com",
    phone: "99999 88888",
    role: "Super Admin",
    branch: "Main Branch",
  });

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <User className="text-[#6d5dfc]" />
          My Profile
        </h1>
        <p className="text-sm text-black/60">
          Manage your account, role & security settings
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_25px_80px_rgba(124,108,255,0.25)]">
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            icon={<User size={16} />}
            label="Full Name"
            value={profile.name}
            onChange={(v: string) =>
              setProfile({ ...profile, name: v })
            }
          />

          <Input
            icon={<Mail size={16} />}
            label="Email Address"
            value={profile.email}
            disabled
          />

          <Input
            icon={<Phone size={16} />}
            label="Phone Number"
            value={profile.phone}
            onChange={(v: string) =>
              setProfile({ ...profile, phone: v })
            }
          />
        </Section>

        {/* ROLE INFO */}
        <Section title="Access & Role">
          <ReadonlyRow
            icon={<Shield size={16} />}
            label="Role"
            value={profile.role}
          />

          <ReadonlyRow
            icon={<Building2 size={16} />}
            label="Default Branch"
            value={profile.branch}
          />
        </Section>

        {/* SECURITY */}
        <Section title="Security">
          <button className="w-full px-4 py-3 rounded-xl bg-black/5 hover:bg-black/10 flex items-center gap-3">
            <Key size={16} />
            Change Password
          </button>
        </Section>

        {/* SAVE */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 rounded-xl bg-[#6d5dfc] text-white flex items-center gap-2">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-black/70 mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  icon,
  disabled,
}: InputProps) {
  return (
    <div>
      <label className="text-xs text-black/60 mb-1 block">
        {label}
      </label>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/5">
        {icon}
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="bg-transparent outline-none text-sm flex-1 disabled:text-black/50"
        />
      </div>
    </div>
  );
}

function ReadonlyRow({
  label,
  value,
  icon,
}: ReadonlyRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/5 text-sm">
      {icon}
      <span className="text-black/60">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
