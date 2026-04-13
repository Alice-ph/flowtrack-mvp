"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { LOCAL_STORAGE_KEYS } from "@/constants";

type DashboardData = {
  participantName: string;
  streamTitle: string;
  lastReportDate: string | null;
};

export default function ParticipantDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const streamParticipationId = localStorage.getItem(
          LOCAL_STORAGE_KEYS.streamParticipationId
        );

        if (!streamParticipationId) {
          setError("Не найдено участие в потоке. Сначала пройдите вход участника.");
          setLoading(false);
          return;
        }

        const { data: participation, error: participationError } = await supabase
          .from("stream_participations")
          .select(
            `
            id,
            participants(full_name),
            streams(title)
          `
          )
          .eq("id", streamParticipationId)
          .single();

        if (participationError || !participation) {
          setError("Не удалось загрузить данные участника.");
          setLoading(false);
          return;
        }

        const { data: lastReport, error: lastReportError } = await supabase
          .from("daily_reports")
          .select("report_date")
          .eq("stream_participation_id", streamParticipationId)
          .order("report_date", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (lastReportError) {
          setError("Не удалось загрузить историю отчётов.");
          setLoading(false);
          return;
        }

        const participantRelation: any = (participation as any).participants;
const streamRelation: any = (participation as any).streams;

        const participantName = Array.isArray(participantRelation)
          ? participantRelation[0]?.full_name ?? "Участник"
          : participantRelation?.full_name ?? "Участник";

        const streamTitle = Array.isArray(streamRelation)
          ? streamRelation[0]?.title ?? "Без названия"
          : streamRelation?.title ?? "Без названия";

        setData({
          participantName,
          streamTitle,
          lastReportDate: lastReport?.report_date ?? null,
        });
      } catch {
        setError("Произошла ошибка при загрузке dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Загрузка dashboard...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">
            Не удалось открыть dashboard
          </h1>
          <p className="mt-3 text-sm leading-6 text-red-700">
            {error || "Нет данных для отображения."}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <span className="text-white">Перейти ко входу</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Главный экран участника
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Здравствуйте, {data.participantName}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Вы участвуете в программе{" "}
          <span className="font-medium">«{data.streamTitle}»</span>.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Последний отчёт:{" "}
          {data.lastReportDate ? data.lastReportDate : "ещё не отправлялся"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Прогресс программы</p>
          <p className="mt-3 text-3xl font-semibold">35%</p>
          <p className="mt-2 text-xs text-slate-500">
            Пока это заглушка. Позже можно считать автоматически.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Серия дней активности</p>
          <p className="mt-3 text-3xl font-semibold">5</p>
          <p className="mt-2 text-xs text-slate-500">
            Пока это заглушка. Позже можно считать автоматически.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Сегодня нужно сделать</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
          <li>• заполнить самочувствие</li>
          <li>• внести параметры</li>
          <li>• при необходимости добавить фото</li>
          <li>• отметить выполнение задания</li>
        </ul>

<Link
  href="/participant/report"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "24px",
    padding: "12px 20px",
    borderRadius: "12px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
  }}
>
  Отчёт за сегодня
</Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Комментарий эксперта</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Хорошая динамика. Продолжаем фиксировать самочувствие и следить за
          регулярностью.
        </p>
      </div>
    </section>
  );
}