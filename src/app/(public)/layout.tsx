import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            FlowTrack
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-slate-600 transition hover:text-slate-900"
            >
              О продукте
            </Link>

<Link
  href="/login"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    borderRadius: "12px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
  }}
>
  Войти
</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}