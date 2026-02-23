import { prisma } from "./../../../../lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const nodes = await prisma.flowNode.findMany();
  const edges = await prisma.flowEdge.findMany();
  return NextResponse.json({ nodes, edges });
}


export async function POST(req: Request) {
  const { nodes, edges } = await req.json();

  for (const n of nodes) {
    await prisma.flowNode.upsert({
      where: { id: n.id },
      update: {
        label: n.data.label,
        positionX: n.position.x,
        positionY: n.position.y,
      },
      create: {
        id: n.id,
        label: n.data.label,
        positionX: n.position.x,
        positionY: n.position.y,
      },
    });
  }

  for (const e of edges) {
    await prisma.flowEdge.upsert({
      where: { id: e.id },
      update: {
        source: e.source,
        target: e.target,
      },
      create: {
        id: e.id,
        source: e.source,
        target: e.target,
      },
    });
  }

  return NextResponse.json({ ok: true });
}


export async function DELETE(req: Request) {
  const { id, type } = await req.json();

  if (type === "node") {
    await prisma.flowNode.delete({ where: { id } });


    await prisma.flowEdge.deleteMany({
      where: { OR: [{ source: id }, { target: id }] },
    });
  }

  if (type === "edge") {
    await prisma.flowEdge.delete({ where: { id } });
  }

  return NextResponse.json({ ok: true });
}