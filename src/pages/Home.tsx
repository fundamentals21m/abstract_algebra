import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { Card, CardGrid } from '../components/common';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-dark-950 bg-mesh" />
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[150px]" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/60 backdrop-blur border border-dark-700/50 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-dark-300">50 Interactive Sections</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">Abstract Algebra</span>
          </h1>

          <p className="text-xl md:text-2xl text-dark-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
            An interactive journey through <span className="text-primary-400">groups</span>, <span className="text-cyan-400">rings</span>, <span className="text-purple-400">fields</span>, and <span className="text-pink-400">Galois theory</span>.
            Master the foundations of modern algebra.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/section/0"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/part/groups-and-subgroups"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-dark-100 bg-dark-800/60 backdrop-blur border border-dark-600/50 rounded-2xl hover:bg-dark-700/60 hover:border-dark-500/50 hover:scale-[1.02] transition-all duration-300"
            >
              Browse Topics
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {[
              { value: '50', label: 'Sections' },
              { value: '9', label: 'Parts' },
              { value: '∞', label: 'Examples' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-dark-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-6 border-t border-dark-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn by Doing</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Interactive visualizations and hands-on examples make abstract concepts concrete.
            </p>
          </div>

          <CardGrid columns={3}>
            <Card>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Interactive Visualizations</h3>
              <p className="text-dark-400 leading-relaxed">
                See symmetry groups in action, compose permutations visually, and explore subgroup lattices interactively.
              </p>
            </Card>

            <Card>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Deep Understanding</h3>
              <p className="text-dark-400 leading-relaxed">
                Clear definitions, theorems, and worked examples help you build intuition and mastery.
              </p>
            </Card>

            <Card>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Complete Coverage</h3>
              <p className="text-dark-400 leading-relaxed">
                From basic group theory to Galois theory. 50 sections covering a full undergraduate course.
              </p>
            </Card>
          </CardGrid>
        </div>
      </section>

      {/* Course Outline */}
      <section className="relative py-20 px-6 border-t border-dark-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Outline</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Based on Fraleigh & Brand's "A First Course in Abstract Algebra" (8th Edition)
            </p>
          </div>

          <div className="grid gap-4">
            {curriculum.map((part, index) => (
              <Link
                key={part.id}
                to={`/section/${part.sections[0]?.id || 0}`}
                className="group relative bg-dark-900/40 backdrop-blur border border-dark-700/40 rounded-2xl p-6 hover:bg-dark-800/50 hover:border-dark-600/50 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                    <span className="text-xl font-bold text-gradient">{part.id}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-dark-100 group-hover:text-primary-400 transition-colors mb-1">
                      Part {part.id}: {part.title}
                    </h3>
                    <p className="text-sm text-dark-500 mb-3">
                      {part.sections.length} sections
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {part.sections.slice(0, 4).map((section) => (
                        <span
                          key={section.id}
                          className="px-3 py-1 text-xs bg-dark-800/60 text-dark-400 rounded-lg border border-dark-700/30"
                        >
                          {section.title}
                        </span>
                      ))}
                      {part.sections.length > 4 && (
                        <span className="px-3 py-1 text-xs bg-dark-800/40 text-dark-500 rounded-lg">
                          +{part.sections.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800/50 group-hover:bg-primary-500/20 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 border-t border-dark-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-dark-400 mb-10 text-lg">
            Start with the fundamentals of sets and relations, or jump to any topic you'd like to explore.
          </p>
          <Link
            to="/section/0"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Start with Section 0: Sets and Relations
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500">
            Built for learning abstract algebra interactively
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
