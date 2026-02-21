"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks, reload }: any) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-[#0f172a]/80 border border-slate-700 rounded-2xl p-5 shadow-xl min-h-[400px]"
    >
      <h2 className="font-semibold text-lg mb-4 text-sky-400">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.map((t: any) => (
          <TaskCard key={t.id} task={t} reload={reload} />
        ))}
      </div>
    </div>
  );
}