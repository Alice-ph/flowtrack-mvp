"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { generateInviteCode } from "@/lib/utils";

export default function CreateStreamPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [createdCode, setCreatedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setCreatedCode("");

    if (!title.trim()) {
      setError("Укажите название потока.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Укажите даты начала и окончания.");
      return;
    }

    const inviteCode = generateInviteCode();

    try {
      setLoading(true);

      const { error: insertError } = await supabase.from("streams").insert({
        title,
        description: description || null,
        start_date: startDate,
        end_date: endDate,
        invite_code: inviteCode,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setCreatedCode(inviteCode);
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    } catch {
      setError("Не удалось создать поток.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
          Новый поток
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Создание потока</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Заполните базовые параметры программы для запуска нового потока.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="stream-title" className="mb-2 block text-sm font-medium text-slate-700">
              Название потока
            </label>
            <input
              id="stream-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например, Перезагрузка тела"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="stream-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Описание
            </label>
            <textarea
              id="stream-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Кратко опишите программу"
              rows={4}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="start-date" className="mb-2 block text-sm font-medium text-slate-700">
                Дата начала
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label htmlFor="end-date" className="mb-2 block text-sm font-medium text-slate-700">
                Дата окончания
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Создание..." : "Создать поток"}
            </button>

            <Link
              href="/expert/streams"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Назад к потокам
            </Link>
          </div>
        </form>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {createdCode ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">Поток создан</p>
            <p className="mt-2 text-sm text-emerald-700">
              Код приглашения: <span className="font-semibold">{createdCode}</span>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}