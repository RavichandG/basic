"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

   
        <Link href="/" className="text-2xl font-bold text-sky-400">
          Task management Application
        </Link>

    
        <div className="flex gap-6 text-slate-300 font-medium">
          <Link
            href="/"
            className="hover:text-sky-400 transition"
          >
            Home
          </Link>

          <Link
            href="/plan"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl transition"
          >
            <LayoutDashboard size={16}/> Plan
          </Link>

          <Link href="/flow" className="hover:text-sky-400">
  Flow
</Link>
        </div>

      </div>
    </nav>
  );
}