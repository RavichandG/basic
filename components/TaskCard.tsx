"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

export default function TaskCard({ task, reload }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const remove = async () => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id: task.id }),
    });
    reload();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 shadow-lg hover:shadow-xl transition flex justify-between items-center"
    >
      <p className="font-medium">{task.title}</p>

      <button
        onClick={remove}
        className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}