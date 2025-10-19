"use client";

import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Header } from '@/components/layout/Header';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Design new landing page', completed: true },
  { id: 2, title: 'Implement authentication', completed: false },
  { id: 3, title: 'Write documentation', completed: false },
  { id: 4, title: 'Deploy to production', completed: true },
  { id: 5, title: 'Code review', completed: false },
];

/**
 * Tasks page - Task management with interactive checklist
 */
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <PageContainer>
      <Header />
      
      {/* Tasks Content - Center */}
      <main className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
        <div className="max-w-3xl w-full text-center space-y-8 py-8">
          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Tasks
          </h1>
          
          {/* Progress */}
          <p className="text-lg text-gray-400">
            {completedCount} of {totalCount} tasks completed
          </p>
          
          {/* Task List */}
          <div className="space-y-3 text-left">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`
                  w-full p-4 rounded-lg border transition-all duration-300
                  flex items-center gap-4 group hover:scale-[1.02]
                  ${task.completed 
                    ? 'bg-white/5 border-white/20 text-gray-400' 
                    : 'bg-white/10 border-white/30 text-white hover:bg-white/15'
                  }
                `}
              >
                {/* Checkbox */}
                <div className={`
                  w-6 h-6 rounded border-2 flex items-center justify-center
                  transition-all duration-300
                  ${task.completed 
                    ? 'bg-white border-white' 
                    : 'border-white/50 group-hover:border-white'
                  }
                `}>
                  {task.completed && (
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                {/* Task Text */}
                <span className={task.completed ? 'line-through' : ''}>
                  {task.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
      
      {/* Navigation Dock - Bottom */}
      <nav className="pb-8 flex justify-center">
        <NavigationDock items={NAVIGATION_ITEMS} />
      </nav>
    </PageContainer>
  );
}
