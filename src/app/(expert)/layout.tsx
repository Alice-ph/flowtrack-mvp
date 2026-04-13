import Link from "next/link";

export default function ExpertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            FlowTrack
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Кабинет эксперта</span>
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Выйти
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <nav className="space-y-2">
            <Link
              href="/expert/streams"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Мои потоки
            </Link>
            <button
              type="button"
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-400"
            >
              Участники
            </button>
            <button
              type="button"
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-400"
            >
              Аналитика
            </button>
            <button
              type="button"
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-400"
            >
              Настройки
            </button>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}