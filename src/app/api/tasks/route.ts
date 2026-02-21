import { prisma } from "./../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const task = await prisma.task.create({ data: { title } });
  return NextResponse.json(task);
}

export async function PUT(req: Request) {
  const { id, column } = await req.json();
  await prisma.task.update({ where: { id }, data: { column } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}