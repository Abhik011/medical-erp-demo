interface StatCardProps {
  title: string;
  value: string;
  status?: "normal" | "warning" | "danger";
}

export default function StatCard({
  title,
  value,
  status = "normal",
}: StatCardProps) {
  const statusColor =
    status === "danger"
      ? "text-red-600"
      : status === "warning"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <p className={`mt-2 text-2xl font-semibold ${statusColor}`}>
        {value}
      </p>
    </div>
  );
}
