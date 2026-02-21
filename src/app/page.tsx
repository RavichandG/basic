export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-3xl text-center space-y-6">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 text-transparent bg-clip-text">
          TaskFlow
        </h1>

        <p className="text-xl text-slate-300">
          A beautiful task management app with drag-and-drop planning
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">

          <Feature title="Create Tasks" desc="Quickly add tasks with a clean UI." />
          <Feature title="Drag & Drop" desc="Move tasks across Todo, Progress, Done." />
          <Feature title="Cloud Saved" desc="Your tasks stored safely in Neon DB." />

        </div>

      </div>

    </main>
  );
}

function Feature({ title, desc }: any) {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 shadow-xl">
      <h3 className="font-semibold text-sky-400 mb-2">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}