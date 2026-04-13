import Link from "next/link";

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            FlowTrack
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Выйти
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}