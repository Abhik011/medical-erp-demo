export default function CreonoxGlassCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-white/65
        backdrop-blur-xl
        p-6
        shadow-[0_18px_50px_rgba(91,61,245,0.28)]
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
