"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LOCAL_STORAGE_KEYS } from "@/constants";

type StreamRow = {
  id: string;
  title: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code") ?? "";

  const [stream, setStream] = useState<StreamRow | null>(null);
  const [loadingStream, setLoadingStream] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStream() {
      if (!code) {
        setLoadingStream(false);
        return;
      }

      const { data, error } = await supabase
        .from("streams")
        .select("id, title")
        .eq("invite_code", code)
        .single();

      if (error || !data) {
        setError("Поток по этому коду не найден.");
        setLoadingStream(false);
        return;
      }

      setStream(data);
      setLoadingStream(false);
    }

    loadStream();
  }, [code]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!stream) {
      setError("Поток не найден.");
      return;
    }

    if (!fullName.trim()) {
      setError("Укажите имя.");
      return;
    }

    if (!phone.trim()) {
      setError("Укажите телефон.");
      return;
    }

    if (!consentGiven) {
      setError("Нужно согласие на обработку данных.");
      return;
    }

    try {
      setLoading(true);

      const { data: participant, error: participantError } = await supabase
        .from("participants")
        .insert({
          full_name: fullName.trim(),
          phone: phone.trim(),
          consent_given: true,
          consent_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (participantError || !participant) {
        setError(participantError?.message || "Не удалось создать участника.");
        return;
      }

      const { data: participation, error: participationError } = await supabase
        .from("stream_participations")
        .insert({
          stream_id: stream.id,
          participant_id: participant.id,
          participation_status: "active",
        })
        .select("id")
        .single();

      if (participationError || !participation) {
        setError(
          participationError?.message || "Не удалось подключить участника к потоку."
        );
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_KEYS.inviteCode, code);
      localStorage.setItem(LOCAL_STORAGE_KEYS.participantId, participant.id);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.streamParticipationId,
        participation.id
      );
      localStorage.setItem(LOCAL_STORAGE_KEYS.streamId, stream.id);

      router.push("/participant/dashboard");
    } catch {
      setError("Произошла ошибка при подключении к потоку.");
    } finally {
      setLoading(false);
    }
  };

  if (!code) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">
            Код приглашения не найден
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Сначала перейдите через экран входа участника.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Перейти ко входу
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
          Подключение к программе
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">
          Быстрый онбординг участника
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {loadingStream
            ? "Проверяем код приглашения..."
            : stream
            ? <>Вы подключаетесь к программе: <span className="font-medium text-slate-900">{stream.title}</span></>
            : "Не удалось определить поток."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="full-name" className="mb-2 block text-sm font-medium text-slate-700">
              Имя
            </label>
            <input
              id="full-name"
              type="text"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Например, Ольга"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
            />
            <span>
              Я соглашаюсь на обработку персональных данных для участия в программе.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || loadingStream || !stream}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Подключаем..." : "Продолжить"}
          </button>
        </form>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>
    </section>
  );
}