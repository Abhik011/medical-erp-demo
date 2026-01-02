export default function FutureGlassPanel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative
        rounded-[26px]
        bg-white/10
        backdrop-blur-2xl
        p-6
        shadow-[0_0_80px_#6d5dfc55]
        ring-1 ring-white/10
      "
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-white/90">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
