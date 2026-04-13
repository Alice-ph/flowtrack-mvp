
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import CopyInviteCodeButton from "@/components/expert/CopyInviteCodeButton";

export default async function ExpertStreamsPage() {
  const supabase = await getSupabaseServerClient();

  const { data: streams, error } = await supabase
    .from("streams")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
            Кабинет эксперта
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Мои потоки</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Управляйте активными и завершёнными программами.
          </p>
        </div>

        <Link
          href="/expert/streams/new"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <span className="text-white">Создать поток</span>
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Ошибка загрузки потоков: {error.message}
        </div>
      ) : null}

      {!streams || streams.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Потоков пока нет</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Создайте первый поток, чтобы начать работу с участниками.
          </p>
          <Link
            href="/expert/streams/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <span className="text-white">Создать первый поток</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {streams.map((stream) => (
            <article
              key={stream.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-xl font-semibold">{stream.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {formatDate(stream.start_date)} — {formatDate(stream.end_date)}
                  </p>

                  {stream.description ? (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {stream.description}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
  <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">
    Код: {stream.invite_code}
  </span>

  <CopyInviteCodeButton code={stream.invite_code} />
</div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    Открыть
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}