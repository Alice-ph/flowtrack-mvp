"use client";

import { useState } from "react";

export default function CopyInviteCodeButton({
  code,
}: {
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
    >
      {copied ? "Скопировано" : "Скопировать"}
    </button>
  );
}