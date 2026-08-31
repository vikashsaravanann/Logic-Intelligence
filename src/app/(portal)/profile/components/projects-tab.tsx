"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, CheckCircle, ArrowRight } from "lucide-react";

export function ProjectsTab({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-2xl border-white/10 bg-white/5">
        <Briefcase className="w-12 h-12 mb-4 text-white/20" />
        <h3 className="text-xl font-medium text-white mb-2">No Active Projects</h3>
        <p className="text-white/60 max-w-md">
          You don't have any active software projects with us yet. When you purchase a package, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project, idx) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-medium text-white mb-1">{project.name}</h3>
              <p className="text-sm text-white/60">Project Code: {project.project_code}</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white flex items-center gap-2">
              {project.status === "Completed" ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Clock className="w-4 h-4 text-orange-400" />}
              {project.status}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Progress</span>
              <span className="text-white">{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
