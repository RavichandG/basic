"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";

export default function TaskCard({ task, reload }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const remove = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!confirm("Delete this task?")) return;

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
      className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-lg"
    >
      
      <div className="flex items-center gap-3">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-slate-400 hover:text-white"
        >
          <GripVertical size={18} />
        </span>

        <p className="font-medium">{task.title}</p>
      </div>

   
      <button
        onClick={remove}
        onPointerDown={(e) => e.stopPropagation()}  
        className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}