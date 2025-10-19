"use client";

import { PageContainer } from '@/components/layout/PageContainer';
import { Header } from '@/components/layout/Header';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';

const ARCHIVE_ITEMS = [
  { id: 1, title: 'Project Alpha', year: '2024' },
  { id: 2, title: 'Design System', year: '2023' },
  { id: 3, title: 'E-commerce Site', year: '2023' },
  { id: 4, title: 'Mobile App', year: '2022' },
  { id: 5, title: 'Portfolio v2', year: '2022' },
  { id: 6, title: 'Blog Platform', year: '2021' },
] as const;

/**
 * Archive page - Collection of past projects
 */
export default function ArchivePage() {
  return (
    <PageContainer>
      <Header />
      
      {/* Archive Content - Center */}
      <main className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
        <div className="max-w-5xl w-full text-center space-y-8 py-8">
          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Archive
          </h1>
          
          <p className="text-lg text-gray-400">
            A collection of my past projects and work
          </p>
          
          {/* Archive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {ARCHIVE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-sm text-gray-500 mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                  {item.title}
                </h3>
              </div>
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
