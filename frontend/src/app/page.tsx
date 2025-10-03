"use client";

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Flame,
  Database,
  GitBranch,
  Monitor
} from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  route: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
  author: string;
}

const categories: CategoryCard[] = [
  {
    id: 'front-back',
    title: 'Frontend vs Backend',
    route: '/frontBack',
    icon: Zap,
    gradient: 'from-blue-500 to-green-500',
    author: 'Vinícius Moraes'
  },
  {
    id: 'js-ts',
    title: 'JavaScript vs TypeScript',
    route: '/jsTs',
    icon: Flame,
    gradient: 'from-yellow-400 to-blue-600',
    author: 'Lucca Fernandes'
  },
  {
    id: 'sql-nosql',
    title: 'SQL vs NoSQL',
    route: '/sqlNosql',
    icon: Database,
    gradient: 'from-indigo-600 to-green-500',
    author: 'Eduardo Tartas'
  },
  {
    id: 'github-gitlab',
    title: 'GitHub vs GitLab',
    route: '/githubGitlab',
    icon: GitBranch,
    gradient: 'from-gray-800 to-orange-500',
    author: 'Arthur Henrike'
  },
  {
    id: 'windows-linux-mac',
    title: 'Windows vs Linux vs Mac',
    route: '/windowsLinuxMac',
    icon: Monitor,
    gradient: 'from-blue-600 via-orange-500 to-black',
    author: 'Yuri Zetoles'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-slate-800 mb-6">
            Tech Choices
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Escolha uma categoria e vote nas tecnologias que você prefere.
            Veja em tempo real a opinião da comunidade!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.route}
              className="group"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-102 overflow-hidden">

                <div className="relative p-8">
                  <div className="mb-6">
                    <category.icon className="w-8 h-8 text-slate-700" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    {category.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500">
                      <div className="w-6 h-6 bg-slate-300 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <span>Por {category.author}</span>
                    </div>

                    <div className="text-slate-400 group-hover:translate-x-1 transition-all duration-200">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
