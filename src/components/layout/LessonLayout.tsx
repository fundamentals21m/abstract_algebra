import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getSectionById, getPartBySectionId, getAdjacentSections, getTotalSections } from '../../data/curriculum';

interface LessonLayoutProps {
  sectionId: number;
  children: ReactNode;
}

export function LessonLayout({ sectionId, children }: LessonLayoutProps) {
  const section = getSectionById(sectionId);
  const part = getPartBySectionId(sectionId);
  const { prev, next } = getAdjacentSections(sectionId);
  const totalSections = getTotalSections();

  if (!section || !part) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-dark-400">Section not found</p>
      </div>
    );
  }

  const progressPercent = ((sectionId + 1) / totalSections) * 100;

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="progress-bar sticky top-16 z-30">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Breadcrumb */}
      <div className="py-4 px-6 border-b border-dark-800">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-dark-400 hover:text-dark-100 transition-colors">
            Home
          </Link>
          <span className="text-dark-600">/</span>
          <Link
            to={`/part/${part.slug}`}
            className="text-dark-400 hover:text-dark-100 transition-colors"
          >
            Part {part.id}
          </Link>
          <span className="text-dark-600">/</span>
          <span className="text-dark-200">Section {section.id}</span>
        </nav>
      </div>

      {/* Main content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary-900/30 text-primary-400 rounded-full">
              Section {section.id}
            </span>
            <span className="text-dark-500 text-sm">
              Part {part.id}: {part.title}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {section.title}
          </h1>
          <p className="text-xl text-dark-400">
            {section.description}
          </p>
        </header>

        {/* Lesson content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {children}
        </div>
      </article>

      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-8 border-t border-dark-800">
        <div className="flex justify-between items-center">
          {prev ? (
            <Link
              to={`/section/${prev.id}`}
              className="group flex items-center gap-3 p-4 rounded-xl hover:bg-dark-800 transition-colors"
            >
              <svg
                className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="text-right">
                <p className="text-xs text-dark-500">Previous</p>
                <p className="text-dark-200 group-hover:text-primary-400 transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/section/${next.id}`}
              className="group flex items-center gap-3 p-4 rounded-xl hover:bg-dark-800 transition-colors"
            >
              <div className="text-left">
                <p className="text-xs text-dark-500">Next</p>
                <p className="text-dark-200 group-hover:text-primary-400 transition-colors">
                  {next.title}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <Link
              to="/quiz/1"
              className="btn-primary"
            >
              Take the Quiz
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
