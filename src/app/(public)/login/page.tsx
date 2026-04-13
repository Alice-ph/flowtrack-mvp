"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginTab = "expert" | "participant";

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<LoginTab>("expert");
  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleExpertLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!expertEmail.trim() || !expertPassword.trim()) {
      setError("Заполните email и пароль.");
      return;
    }

    router.push("/expert/streams");
  };

  const handleParticipantLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const normalizedCode = inviteCode.trim().toUpperCase();

    if (!normalizedCode) {
      setError("Введите код приглашения.");
      return;
    }

    router.push(`/onboarding?code=${normalizedCode}`);
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h1 className="text-3xl font-semibold tracking-tight">Вход в FlowTrack</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Выберите сценарий входа в зависимости от вашей роли.
          </p>
        </div>

        <div className="border-b border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("expert");
                setError("");
              }}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "expert"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Эксперт
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("participant");
                setError("");
              }}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "participant"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Участник
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "expert" ? (
            <form onSubmit={handleExpertLogin} className="space-y-5">
              <div>
                <label htmlFor="expert-email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="expert-email"
                  type="email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  value={expertEmail}
                  onChange={(e) => setExpertEmail(e.target.value)}
                  placeholder="expert@flowtrack.ru"
                />
              </div>

              <div>
                <label htmlFor="expert-password" className="mb-2 block text-sm font-medium text-slate-700">
                  Пароль
                </label>
                <input
                  id="expert-password"
                  type="password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  value={expertPassword}
                  onChange={(e) => setExpertPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Войти как эксперт
              </button>
            </form>
          ) : (
            <form onSubmit={handleParticipantLogin} className="space-y-5">
              <div>
                <label htmlFor="invite-code" className="mb-2 block text-sm font-medium text-slate-700">
                  Код приглашения
                </label>
                <input
                  id="invite-code"
                  type="text"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm uppercase outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Введите код потока"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Используйте реальный код, который был создан у потока.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Продолжить
              </button>
            </form>
          )}

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}