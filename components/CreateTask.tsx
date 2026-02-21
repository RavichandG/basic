"use client";

import { useState } from "react";

export default function CreateTask({ reload }: any) {
  const [title, setTitle] = useState("");

  const create = async () => {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    reload();
  };

  return (
    <div className="bg-[#0f172a]/80 border border-slate-700 rounded-2xl p-5 shadow-xl flex gap-4">
      <input
        className="flex-1 bg-[#020617] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none text-lg"
        placeholder="Create a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={create}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
      >
        Add
      </button>
    </div>
  );
}