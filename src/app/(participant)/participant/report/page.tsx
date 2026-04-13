"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { LOCAL_STORAGE_KEYS } from "@/constants";

export default function ParticipantReportPage() {
  const today = new Date().toISOString().split("T")[0];

  const [streamParticipationId, setStreamParticipationId] = useState("");
  const [reportDate, setReportDate] = useState(today);
  const [weight, setWeight] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [wellbeing, setWellbeing] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedParticipationId = localStorage.getItem(
      LOCAL_STORAGE_KEYS.streamParticipationId
    );

    if (savedParticipationId) {
      setStreamParticipationId(savedParticipationId);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoName(file ? file.name : "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!streamParticipationId) {
      setError("Не найдено участие в потоке. Сначала пройдите онбординг.");
      return;
    }

    if (!reportDate) {
      setError("Укажите дату отчёта.");
      return;
    }

    if (!wellbeing) {
      setError("Выберите самочувствие.");
      return;
    }

    try {
      setLoading(true);

      const { error: insertError } = await supabase.from("daily_reports").insert({
        stream_participation_id: streamParticipationId,
        report_date: reportDate,
        weight: weight ? Number(weight) : null,
        measurements: measurements || null,
        wellbeing,
        task_completed: taskCompleted,
        notes: notes || null,
        photo_url: null,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setSuccess(true);
      setWeight("");
      setMeasurements("");
      setWellbeing("");
      setTaskCompleted(false);
      setNotes("");
      setPhotoName("");
    } catch {
      setError("Не удалось сохранить отчёт.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Ежедневный отчёт
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Отчёт за сегодня
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Зафиксируйте параметры, самочувствие и при необходимости добавьте фото.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="report-date" className="mb-2 block text-sm font-medium text-slate-700">
              Дата отчёта
            </label>
            <input
              id="report-date"
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="weight" className="mb-2 block text-sm font-medium text-slate-700">
              Вес
            </label>
            <input
              id="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Например, 65.4"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="measurements" className="mb-2 block text-sm font-medium text-slate-700">
              Замеры
            </label>
            <input
              id="measurements"
              type="text"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              placeholder="Например, 90-68-96"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="wellbeing" className="mb-2 block text-sm font-medium text-slate-700">
              Самочувствие
            </label>
            <select
              id="wellbeing"
              value={wellbeing}
              onChange={(e) => setWellbeing(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Выберите вариант</option>
              <option value="good">Хорошее</option>
              <option value="normal">Нормальное</option>
              <option value="bad">Плохое</option>
            </select>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={taskCompleted}
              onChange={(e) => setTaskCompleted(e.target.checked)}
            />
            <span>Сегодняшнее задание выполнено</span>
          </label>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
              Заметки
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Например, как прошёл день и что хочется отметить"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="photo" className="mb-2 block text-sm font-medium text-slate-700">
              Фото прогресса
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
            />
            {photoName ? (
              <p className="mt-2 text-xs text-slate-500">
                Пока фото не загружается в storage. Выбран файл: {photoName}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Сохранение..." : "Сохранить отчёт"}
            </button>

            <Link
              href="/participant/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Назад
            </Link>
          </div>
        </form>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Отчёт успешно сохранён в базу.
          </div>
        ) : null}
      </div>
    </section>
  );
}