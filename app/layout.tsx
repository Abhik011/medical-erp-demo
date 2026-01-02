import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body
  className="
    min-h-screen
    bg-[radial-gradient(900px_circle_at_10%_10%,#7c6cff22,transparent_40%),radial-gradient(900px_circle_at_90%_80%,#a78bfa22,transparent_40%),linear-gradient(180deg,#f7f6ff,#fbfbff)]
    text-black
    antialiased
  "
>

        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
