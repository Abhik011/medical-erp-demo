interface DonutChartProps {
  value: number; // 0–100
  label: string;
  color?: string;
}

export default function DonutChart({
  value,
  label,
  color = "#5B3DF5",
}: DonutChartProps) {
  const radius = 42;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#EAE6FF"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="6"
          className="text-lg font-semibold fill-primary"
        >
          {value}%
        </text>
      </svg>

      <p className="mt-2 text-sm text-textMuted">{label}</p>
    </div>
  );
}
