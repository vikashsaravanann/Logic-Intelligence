'use client';

import { motion } from 'framer-motion';
import { User, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'admin@logicintel.com',
    action: 'updated project status to In Progress',
    target: 'Project Alpha',
    time: '5 mins ago',
    icon: CheckCircle,
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20'
  },
  {
    id: 2,
    user: 'System',
    action: 'generated weekly report',
    target: 'Revenue Q3',
    time: '1 hour ago',
    icon: FileText,
    color: 'indigo',
    bgClass: 'bg-indigo-500/10',
    textClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/20'
  },
  {
    id: 3,
    user: 'johndoe@example.com',
    action: 'submitted a new lead inquiry',
    target: 'LogicIntel Form',
    time: '3 hours ago',
    icon: User,
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-400',
    borderClass: 'border-blue-500/20'
  },
  {
    id: 4,
    user: 'admin@logicintel.com',
    action: 'flagged invoice as overdue',
    target: 'INV-2026-08',
    time: '5 hours ago',
    icon: AlertTriangle,
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/20'
  }
];

export default function ActivityFeed() {
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <motion.div 
          key={activity.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4 group"
        >
          <div className="relative flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full ${activity.bgClass} flex items-center justify-center ${activity.textClass} border ${activity.borderClass} shadow-sm z-10`}>
              <activity.icon className="w-4 h-4" />
            </div>
            {index !== activities.length - 1 && (
              <div className="w-[1px] h-full bg-white/5 absolute top-8 bottom-[-24px]"></div>
            )}
          </div>
          
          <div className="flex-1 pb-2">
            <p className="text-sm text-zinc-300">
              <span className="font-bold text-white">{activity.user}</span> {activity.action} <span className="font-medium text-indigo-300">{activity.target}</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
