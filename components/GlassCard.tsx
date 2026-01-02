export default function GlassCard({
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
        rounded-2xl
        bg-white/55
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_60px_rgba(91,61,245,0.28)]
        ring-1 ring-white/50
      "
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-black">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
