"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Pill,
  ShoppingCart,
  FileText,
  BarChart3,
  Activity,
  CornerDownRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Users,
  UserCog,
  User,
} from "lucide-react";

/* ================= SIDEBAR ================= */

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /* Auto-open based on route */
  useEffect(() => {
    if (pathname.startsWith("/pos")) setOpenMenu("pos");
    else if (pathname.startsWith("/inventory")) setOpenMenu("inventory");
    else if (pathname.startsWith("/suppliers")) setOpenMenu("suppliers");
    else if (pathname.startsWith("/crm")) setOpenMenu("crm");
    else if (pathname.startsWith("/hrm")) setOpenMenu("hrm");
    else if (pathname.startsWith("/compliance")) setOpenMenu("compliance");
    else setOpenMenu(null);
  }, [pathname]);

  return (
    <aside
      className={`
        m-4 h-[calc(100vh-2rem)]
        ${collapsed ? "w-20" : "w-64"}
        rounded-[28px] bg-white
        shadow-[0_20px_60px_rgba(109,93,252,0.25)]
        flex flex-col transition-all duration-300
      `}
    >
      {/* BRAND */}
      <div className="px-3 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_30px_#7c6cffaa]">
            <Activity className="h-6 w-6 text-white" />
          </div>

          {!collapsed && (
            <div>
              <span className="block text-base font-semibold text-black">
                Creonox
              </span>
              <span className="text-xs text-black/60">Medical ERP</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-black/60 hover:text-black"
        >
          <ChevronLeft
            className={`transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* divider (visual rhythm restore) */}
      <div className="mx-6 mb-2 h-px bg-black/5" />

      {/* NAV */}
      <nav className="px-3 pt-2 space-y-2 flex-1 overflow-y-auto">

        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          href="/dashboard"
          active={pathname === "/dashboard"}
          collapsed={collapsed}
        />

        {/* POS */}
        <MenuGroup
          id="pos"
          icon={ShoppingCart}
          label="POS"
          open={openMenu === "pos"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/pos")}
        >
          <SubNav href="/pos" label="Billing" active={pathname === "/pos"} />
          <SubNav href="/pos/return" label="Return / Refund" />
          <SubNav href="/pos/drafts" label="Draft Bills" />
          <SubNav href="/pos/invoices" label="GST Invoices" />
        </MenuGroup>

        {/* INVENTORY */}
        <MenuGroup
          id="inventory"
          icon={Pill}
          label="Inventory"
          open={openMenu === "inventory"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/inventory")}
        >
          <SubNav href="/inventory" label="Stock" />
          <SubNav href="/inventory/batches" label="Batch View" />
          <SubNav href="/inventory/transfer" label="Transfers" />
          <SubNav href="/inventory/po" label="Purchase Order" />
          <SubNav href="/inventory/grn" label="GRN" />
          <SubNav href="/inventory/purchase-return" label="Purchase Return" />
          <SubNav href="/inventory/expiry-return" label="Expiry Return" />
          <SubNav href="/inventory/adjustment" label="Stock Adjustment" />
        </MenuGroup>

        {/* SUPPLIERS */}
        <MenuGroup
          id="suppliers"
          icon={Truck}
          label="Suppliers"
          open={openMenu === "suppliers"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/suppliers")}
        >
          <SubNav href="/suppliers" label="Supplier Master" />
          <SubNav href="/suppliers/ledger" label="Supplier Ledger" />
          <SubNav href="/suppliers/returns" label="Supplier Returns" />
        </MenuGroup>

        {/* CRM */}
        <MenuGroup
          id="crm"
          icon={Users}
          label="CRM"
          open={openMenu === "crm"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/crm")}
        >
          <SubNav href="/crm/customers" label="Customers" />
          <SubNav href="/crm/leads" label="Leads" />
          <SubNav href="/crm/followups" label="Follow-ups" />
          <SubNav href="/crm/support" label="Support Tickets" />
        </MenuGroup>

        {/* HRM */}
        <MenuGroup
          id="hrm"
          icon={UserCog}
          label="HRM"
          open={openMenu === "hrm"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/hrm")}
        >
          <SubNav href="/hrm/employees" label="Employees" />
          <SubNav href="/hrm/attendance" label="Attendance" />
          <SubNav href="/hrm/payroll" label="Payroll" />
          <SubNav href="/hrm/leave" label="Leave Management" />
        </MenuGroup>

        {/* COMPLIANCE */}
        <MenuGroup
          id="compliance"
          icon={ShieldCheck}
          label="Compliance"
          open={openMenu === "compliance"}
          onToggle={setOpenMenu}
          collapsed={collapsed}
          active={pathname.startsWith("/compliance")}
        >
          <SubNav href="/compliance/schedule-h" label="Schedule H Register" />
          <SubNav href="/compliance/prescriptions" label="Prescription Audit" />
          <SubNav href="/compliance/expiry-log" label="Expiry Log" />
        </MenuGroup>

        <NavItem
          icon={BarChart3}
          label="Reports"
          href="/reports"
          active={pathname === "/reports"}
          collapsed={collapsed}
        />
      </nav>
      <Link
        href="/profile"
        className={`
    flex items-center gap-4 px-4 py-3 rounded-2xl transition
    ${pathname === "/profile"
            ? "bg-[#6d5dfc]/10 shadow-[inset_-4px_0_0_#6d5dfc]"
            : "hover:bg-black/10"}
  `}
      >
        {/* AVATAR */}
        <div
          className={`
      h-9 w-9 rounded-full
      flex items-center justify-center
      font-semibold text-sm
      ${pathname === "/profile"
              ? "bg-[#6d5dfc] text-white"
              : "bg-[#6d5dfc]/15 text-[#6d5dfc]"
            }
    `}
        >
          AK
        </div>

        {!collapsed && (
          <div className="leading-tight">
            <span className="block text-sm font-medium text-black">
              Profile
            </span>
            <span className="text-xs text-black/50">
              Super Admin
            </span>
          </div>
        )}
      </Link>



      {!collapsed && (
        <div className="px-5 py-4 text-xs text-black/50">
          v1.0 • Creonox Technologies
        </div>
      )}
    </aside>

  );
}

/* ================= UI PARTS ================= */

function NavItem({ icon: Icon, label, href, active, collapsed }: any) {
  return (
    <Link
      href={href}
      className={`
        relative
        flex items-center
        ${collapsed ? "justify-center px-0 py-3" : "gap-4 px-4 py-3"}
        rounded-2xl
        transition-all
        ${
          active
            ? collapsed
              ? "bg-[#6d5dfc]/15"
              : "bg-[#6d5dfc]/10 shadow-[0_8px_30px_rgba(124,108,255,0.35)]"
            : "hover:bg-black/5"
        }
      `}
    >
      {/* Active glow bar (ONLY expanded) */}
      {!collapsed && active && (
        <span className="absolute left-0 top-2 bottom-2 w-[4px] rounded-full bg-[#6d5dfc]" />
      )}

      <Icon
        className={`h-5 w-5 ${
          active ? "text-[#6d5dfc]" : "text-black/70"
        }`}
      />

      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  );
}


function MenuGroup({
  id,
  icon: Icon,
  label,
  open,
  onToggle,
  active,
  collapsed,
  children,
}: any) {
  return (
    <div>
      <button
        onClick={() => onToggle(open ? null : id)}
        className={`
          relative w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition
         ${active ? "bg-white/30 shadow-[0_8px_24px_rgba(124,108,255,0.25)]" : "hover:bg-black/10"}

        `}
      >
        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#7c6cff]" />
        )}

        <Icon className={`h-5 w-5 ${active ? "text-[#7c6cff]" : "text-black/70"}`} />
        {!collapsed && <span className="text-sm font-medium">{label}</span>}
      </button>

      {/* SMOOTH ACCORDION */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open && !collapsed ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="ml-8 mt-2 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function SubNav({ href, label, active }: any) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition
        ${active ? "bg-[#6d5dfc]/10 text-[#6d5dfc]" : "hover:bg-black/5 text-black/70"}
      `}
    >
      <CornerDownRight size={14} />
      {label}
    </Link>
  );
}
