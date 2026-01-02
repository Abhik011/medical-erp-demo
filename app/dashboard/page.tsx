import DonutChart from "@/components/DonutChart";
import KPI from "@/components/KPI";
import CreonoxGlassCard from "@/components/CreonoxGlassCard";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="relative p-10 min-h-screen space-y-10">

      {/* ================= HEADER ================= */}
      <header className="space-y-1">
        <h2 className="text-3xl font-semibold tracking-tight text-black">
          Pharmacy Dashboard
        </h2>
        <p className="text-sm text-textMuted max-w-xl">
          Real-time operational intelligence — sales, stock, compliance &
          performance insights.
        </p>
      </header>

      {/* ================= ANALYTICS ================= */}
      <section className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-5">
          <CreonoxGlassCard title="Monthly Sales">
            <div className="flex justify-center py-4">
              <DonutChart value={72} label="Target Achieved" />
            </div>
          </CreonoxGlassCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Stock Utilization">
            <div className="flex justify-center py-4">
              <DonutChart
                value={58}
                label="Used Stock"
                color="#f59e0b"
              />
            </div>
          </CreonoxGlassCard>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <CreonoxGlassCard title="KPI Overview">
            <div className="space-y-3 pt-1">
              <KPI label="Sales Growth" value="↑ 12%" />
              <KPI label="Inventory Turnover" value="6.2x" />
              <KPI label="Expiry Loss" value="↓ 1.8%" />
            </div>
          </CreonoxGlassCard>
        </div>

      </section>

      {/* ================= OPERATIONS ================= */}
      <section className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Critical Alerts">
            <ul className="space-y-3 text-sm pt-1">
              <li className="flex justify-between">
                <span className="text-red-500 font-medium">
                  Crocin 500
                </span>
                <span className="text-textMuted">
                  Expiry in 12 days
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-orange-500 font-medium">
                  Azithromycin
                </span>
                <span className="text-textMuted">
                  Low stock (6 units)
                </span>
              </li>
            </ul>
          </CreonoxGlassCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-4 pt-3">

              <Link href="/pos">
                <PrimaryBtn className="w-full h-[50px]">
                  New Sale
                </PrimaryBtn>
              </Link>

              <Link href="/inventory">
                <SoftBtn className="w-full h-[50px]">
                  Add Stock
                </SoftBtn>
              </Link>

              <Link href="/inventory/po">
                <SoftBtn className="w-full h-[50px]">
                  Purchase Entry
                </SoftBtn>
              </Link>

              <Link href="/reports">
                <SoftBtn className="w-full h-[50px]">
                  View Reports
                </SoftBtn>
              </Link>

            </div>
          </CreonoxGlassCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Compliance Status">
            <div className="space-y-3 pt-1">
              <KPI label="Prescription Required" value="Enabled" />
              <KPI label="Schedule H Medicines" value="Monitored" />
              <KPI label="Audit Logs" value="Active" />
            </div>
          </CreonoxGlassCard>
        </div>

      </section>

      {/* ================= BUSINESS INSIGHTS ================= */}
      <section className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Top Products">
            <List label="Paracetamol 500" value="₹18,200" />
            <List label="Azithromycin" value="₹11,450" />
            <List label="Vitamin D3" value="₹9,800" />
          </CreonoxGlassCard>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CreonoxGlassCard title="Top Customers">
            <List label="Rahul Mehta" value="₹6,400" muted />
            <List label="Anita Pharmacy" value="₹5,980" muted />
            <List label="Clinic OPD" value="₹5,200" muted />
          </CreonoxGlassCard>
        </div>

      </section>

    </div>
  );
}

/* ================= UI ELEMENTS ================= */

function PrimaryBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`
        rounded-2xl
        bg-gradient-to-br from-[#6d5dfc] to-[#8b5cf6]
        text-white font-medium
        shadow-[0_10px_30px_rgba(124,108,255,0.45)]
        hover:shadow-[0_14px_40px_rgba(124,108,255,0.55)]
        hover:scale-[1.03]
        transition-all
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function SoftBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`
        rounded-2xl
        bg-white/60 backdrop-blur
        text-primary font-medium
        shadow-[0_8px_25px_rgba(124,108,255,0.25)]
        hover:bg-white/80
        hover:scale-[1.03]
        transition-all
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function List({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-black">{label}</span>
      <span
        className={
          muted
            ? "text-textMuted"
            : "text-primary font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}
