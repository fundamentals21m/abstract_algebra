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
    <div className="min-h-screen relative">
      {/* Subtle background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Progress bar */}
      <div className="sticky top-16 z-30 h-1 bg-dark-900/80 backdrop-blur">
        <div
          className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Breadcrumb */}
      <div className="relative py-4 px-6 border-b border-dark-800/50 bg-dark-950/50 backdrop-blur-sm">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-sm">
          <Link to="/" className="text-dark-500 hover:text-dark-300 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <svg className="w-4 h-4 text-dark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link
            to={`/part/${part.slug}`}
            className="text-dark-500 hover:text-dark-300 transition-colors"
          >
            Part {part.id}
          </Link>
          <svg className="w-4 h-4 text-dark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-dark-300 font-medium">Section {section.id}</span>
        </nav>
      </div>

      {/* Main content */}
      <article className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Section header */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-primary-500/20 to-primary-600/10 text-primary-400 rounded-full border border-primary-500/20">
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              Section {section.id}
            </span>
            <span className="text-dark-500 text-sm">
              Part {part.id}: {part.title}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{section.title}</span>
          </h1>

          <p className="text-xl text-dark-400 leading-relaxed max-w-3xl">
            {section.description}
          </p>

          {/* Decorative line */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-700 to-transparent" />
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/10" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-700 to-transparent" />
          </div>
        </header>

        {/* Lesson content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-6">
          {children}
        </div>
      </article>

      {/* Navigation */}
      <nav className="relative max-w-4xl mx-auto px-6 py-12 border-t border-dark-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/section/${prev.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-dark-900/40 backdrop-blur border border-dark-700/40 hover:bg-dark-800/50 hover:border-dark-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-dark-800/60 group-hover:bg-primary-500/20 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-dark-400 group-hover:text-primary-400 group-hover:-translate-x-0.5 transition-all duration-300"
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
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-1">Previous</p>
                <p className="text-dark-200 group-hover:text-primary-400 transition-colors font-medium truncate">
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
              className="group flex items-center gap-4 p-5 rounded-2xl bg-dark-900/40 backdrop-blur border border-dark-700/40 hover:bg-dark-800/50 hover:border-dark-600/50 transition-all duration-300 md:flex-row-reverse md:text-right"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-dark-800/60 group-hover:bg-primary-500/20 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-dark-400 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all duration-300"
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
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-1">Next</p>
                <p className="text-dark-200 group-hover:text-primary-400 transition-colors font-medium truncate">
                  {next.title}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              to="/"
              className="group flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              <span>Course Complete!</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
