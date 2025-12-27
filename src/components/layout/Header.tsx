import { Link } from 'react-router-dom';
import { XPDisplay } from '../gamification/XPDisplay';
import { StreakBadge } from '../gamification/StreakBadge';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-dark-950/80 backdrop-blur-xl border-b border-dark-700/50">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-dark-800/60 transition-all duration-200 lg:hidden group"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg
              className="w-6 h-6 text-dark-400 group-hover:text-dark-100 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">∑</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-dark-100 group-hover:text-white transition-colors">
                Abstract Algebra
              </h1>
              <p className="text-xs text-dark-500 group-hover:text-dark-400 transition-colors">
                Interactive Learning
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {/* Gamification stats */}
          <div className="hidden md:flex items-center gap-3 mr-4">
            <StreakBadge />
            <XPDisplay compact />
          </div>

          <a
            href="https://mathacademy-cyan.vercel.app"
            className="px-4 py-2 text-sm font-medium text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 rounded-xl transition-all duration-200"
          >
            Hub
          </a>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 rounded-xl transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 rounded-xl transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Leaderboard
          </Link>
          <Link
            to="/section/0"
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-200"
          >
            Start Learning
          </Link>
        </nav>
      </div>
    </header>
  );
}
