import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { Card, CardGrid } from '../components/common';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Abstract Algebra</span>
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-2xl mx-auto">
            An interactive journey through groups, rings, fields, and Galois theory.
            Master the foundations of modern algebra with visualizations and hands-on examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/section/0" className="btn-primary text-lg px-8 py-3">
              Start Learning
            </Link>
            <Link to="/part/groups-and-subgroups" className="btn-secondary text-lg px-8 py-3">
              Browse Topics
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 border-t border-dark-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Learn by Doing</h2>
          <CardGrid columns={3}>
            <Card>
              <div className="w-12 h-12 rounded-lg bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Visualizations</h3>
              <p className="text-dark-400">
                See symmetry groups in action, compose permutations visually, and explore subgroup lattices interactively.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quizzes & Practice</h3>
              <p className="text-dark-400">
                Test your understanding with quizzes after each part. Get instant feedback and detailed explanations.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Coverage</h3>
              <p className="text-dark-400">
                From basic group theory to Galois theory. 49 sections covering a full undergraduate abstract algebra course.
              </p>
            </Card>
          </CardGrid>
        </div>
      </section>

      {/* Course Outline */}
      <section className="py-16 px-6 border-t border-dark-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Course Outline</h2>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Based on Fraleigh & Brand's "A First Course in Abstract Algebra" (8th Edition)
          </p>

          <div className="space-y-8">
            {curriculum.map((part) => (
              <div key={part.id} className="card">
                <Link
                  to={`/part/${part.slug}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-800/40 transition-colors">
                    <span className="text-primary-400 font-bold">{part.id}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">
                      Part {part.id}: {part.title}
                    </h3>
                    <p className="text-dark-400 mt-1">
                      {part.sections.length} sections
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {part.sections.slice(0, 4).map((section) => (
                        <span
                          key={section.id}
                          className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded"
                        >
                          {section.title}
                        </span>
                      ))}
                      {part.sections.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-dark-800 text-dark-500 rounded">
                          +{part.sections.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-dark-400 mb-8">
            Start with the fundamentals of sets and relations, or jump to any topic you'd like to explore.
          </p>
          <Link to="/section/0" className="btn-primary text-lg px-8 py-3">
            Start with Section 0: Sets and Relations
          </Link>
        </div>
      </section>
    </div>
  );
}
