interface KPIProps {
  label: string;
  value: string;
}

export default function KPI({ label, value }: KPIProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-textMuted">
        {label}
      </span>
      <span className="text-sm font-semibold text-primary">
        {value}
      </span>
    </div>
  );
}
