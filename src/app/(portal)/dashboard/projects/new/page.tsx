export default function NewProjectPage() {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Initialize New Project</h2>
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1 block">Project Name</label>
            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Website Redesign" />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-400 mb-1 block">Client Name</label>
            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Acme Corp" />
          </div>
          <button className="bg-indigo-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl mt-4">Create Project</button>
        </form>
      </div>
    </div>
  );
}
