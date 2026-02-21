"use client";

import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Column from "./Column";
import { DndContext, closestCorners } from "@dnd-kit/core";

const columns = [
  { id: "todo", title: "Todo" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function Board() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const dragEnd = async ({ active, over }: any) => {
    if (!over) return;

    await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({
        id: active.id,
        column: over.id,
      }),
    });

    load();
  };

  return (
    <div className="space-y-6">

      {/* Create Task */}
      <CreateTask reload={load} />

      {/* Board */}
      <DndContext collisionDetection={closestCorners} onDragEnd={dragEnd}>
        <div className="grid md:grid-cols-3 gap-6">

          {columns.map((c) => (
            <Column
              key={c.id}
              id={c.id}
              title={c.title}
              tasks={tasks.filter((t) => t.column === c.id)}
              reload={load}
            />
          ))}

        </div>
      </DndContext>

    </div>
  );
}