import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
            Платформа сопровождения потоков
          </p>

          <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            FlowTrack помогает эксперту вести программу, а участнику — не
            выпадать из процесса
          </h1>

          <p className="mb-8 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Единое пространство для потоков здоровья: создание программы,
            приглашение участников, ежедневные отчёты, фото прогресса и
            сопровождение внутри одного сервиса.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
  <Link
  href="/login"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
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

            <Link
  href="/login"
  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
>
  Начать
</Link>
          </div>
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center text-slate-500">
            <p className="mb-2 text-sm font-medium">Плейсхолдер интерфейса</p>
            <p className="text-sm">
              Здесь позже можно будет разместить скрин продукта
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Для эксперта</h2>
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              <li>• Создание потоков и приглашение участников</li>
              <li>• Контроль активности и регулярности</li>
              <li>• Единая точка работы с программой</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Для участника</h2>
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              <li>• Быстрый вход по приглашению</li>
              <li>• Ежедневные отчёты и фото прогресса</li>
              <li>• Понятный путь и ощущение поддержки</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Как это работает
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Эксперт создаёт поток",
              "Участник входит по приглашению",
              "Участник отправляет ежедневные отчёты",
              "Эксперт удерживает процесс под контролем",
            ].map((step) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
              >
                {step}
              </div>
            ))}
          </div>

          <div className="mt-8">
<Link
  href="/login"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    borderRadius: "12px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
  }}
>
  Перейти ко входу
</Link>
          </div>
        </div>
      </section>
    </div>
  );
}