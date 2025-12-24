import { Link } from 'react-router-dom';

interface InteractiveModule {
  sectionId: number;
  sectionTitle: string;
  name: string;
  description: string;
  type: 'visualizer' | 'calculator' | 'explorer' | 'quiz';
}

// All interactive modules in the course
const modules: InteractiveModule[] = [
  // Part I: Groups and Subgroups
  { sectionId: 2, sectionTitle: 'Groups', name: 'Cayley Table Builder', description: 'Construct and visualize group operation tables', type: 'visualizer' },
  { sectionId: 2, sectionTitle: 'Groups', name: 'Group Basics Quiz', description: 'Test your understanding of group axioms', type: 'quiz' },

  { sectionId: 4, sectionTitle: 'Nonabelian Examples', name: 'Symmetry Animation', description: 'Watch symmetry transformations of polygons in action', type: 'visualizer' },
  { sectionId: 4, sectionTitle: 'Nonabelian Examples', name: 'Geometric Symmetries', description: 'Explore dihedral groups through geometry', type: 'explorer' },

  { sectionId: 5, sectionTitle: 'Subgroups', name: 'Subgroup Lattice', description: 'Visualize the lattice of subgroups of a group', type: 'visualizer' },
  { sectionId: 5, sectionTitle: 'Subgroups', name: 'Subgroup Quiz', description: 'Practice identifying subgroups', type: 'quiz' },

  { sectionId: 6, sectionTitle: 'Cyclic Groups', name: 'Cyclic Group Wheel', description: 'Interactive wheel visualization of cyclic groups', type: 'visualizer' },
  { sectionId: 6, sectionTitle: 'Cyclic Groups', name: 'Generators Quiz', description: 'Find generators of cyclic groups', type: 'quiz' },
  { sectionId: 6, sectionTitle: 'Cyclic Groups', name: 'Cyclic Group Quiz', description: 'Test cyclic group properties', type: 'quiz' },

  // Part II: Structure of Groups
  { sectionId: 8, sectionTitle: 'Groups of Permutations', name: 'Permutation Composer', description: 'Compose permutations in cycle notation', type: 'calculator' },
  { sectionId: 8, sectionTitle: 'Groups of Permutations', name: 'Permutation Workbench', description: 'Full-featured permutation calculator', type: 'calculator' },
  { sectionId: 8, sectionTitle: 'Groups of Permutations', name: 'Cycle Decomposition', description: 'Break permutations into disjoint cycles', type: 'calculator' },
  { sectionId: 8, sectionTitle: 'Groups of Permutations', name: 'Cycle Permutation Quiz', description: 'Practice with cycle notation', type: 'quiz' },

  { sectionId: 9, sectionTitle: 'Finitely Generated Abelian Groups', name: 'Abelian Structure Quiz', description: 'Classify finitely generated abelian groups', type: 'quiz' },

  { sectionId: 10, sectionTitle: 'Cosets and Lagrange', name: 'Coset Visualizer', description: 'See how cosets partition a group', type: 'visualizer' },
  { sectionId: 10, sectionTitle: 'Cosets and Lagrange', name: 'Cosets Quiz', description: 'Practice computing cosets', type: 'quiz' },

  { sectionId: 11, sectionTitle: 'Plane Isometries', name: 'Isometry Explorer', description: 'Combine translations, rotations, and reflections', type: 'explorer' },
  { sectionId: 11, sectionTitle: 'Plane Isometries', name: 'Isometry Quiz', description: 'Test your understanding of isometries', type: 'quiz' },

  // Part III: Homomorphisms and Factor Groups
  { sectionId: 12, sectionTitle: 'Factor Groups', name: 'Factor Group Builder', description: 'Construct quotient groups step by step', type: 'calculator' },
  { sectionId: 12, sectionTitle: 'Factor Groups', name: 'Normal Subgroup Quiz', description: 'Identify normal subgroups', type: 'quiz' },
  { sectionId: 12, sectionTitle: 'Factor Groups', name: 'Factor Group Quiz', description: 'Work with quotient groups', type: 'quiz' },

  { sectionId: 14, sectionTitle: 'Group Action on a Set', name: 'Group Actions Explorer', description: 'Visualize orbits and stabilizers', type: 'explorer' },
  { sectionId: 14, sectionTitle: 'Group Action on a Set', name: 'Group Actions Quiz', description: 'Practice with group actions', type: 'quiz' },

  { sectionId: 15, sectionTitle: 'Burnside Counting', name: 'Burnside Calculator', description: 'Count orbits using Burnside\'s lemma', type: 'calculator' },
  { sectionId: 15, sectionTitle: 'Burnside Counting', name: 'Burnside Quiz', description: 'Apply counting techniques', type: 'quiz' },

  // Part IV: Advanced Group Theory
  { sectionId: 16, sectionTitle: 'Isomorphism Theorems', name: 'Isomorphism Theorems Quiz', description: 'Apply the isomorphism theorems', type: 'quiz' },

  { sectionId: 17, sectionTitle: 'Sylow Theorems', name: 'Sylow Subgroup Finder', description: 'Find Sylow p-subgroups of a group', type: 'calculator' },
  { sectionId: 17, sectionTitle: 'Sylow Theorems', name: 'Sylow Quiz', description: 'Test Sylow theorem applications', type: 'quiz' },

  { sectionId: 18, sectionTitle: 'Series of Groups', name: 'Series Quiz', description: 'Practice with composition series', type: 'quiz' },

  { sectionId: 19, sectionTitle: 'Free Abelian Groups', name: 'Free Abelian Quiz', description: 'Test free abelian group concepts', type: 'quiz' },

  { sectionId: 20, sectionTitle: 'Free Groups', name: 'Word Reducer', description: 'Reduce words in free groups', type: 'calculator' },
  { sectionId: 20, sectionTitle: 'Free Groups', name: 'Free Groups Quiz', description: 'Practice with free groups', type: 'quiz' },

  { sectionId: 21, sectionTitle: 'Group Presentations', name: 'Presentation Parser', description: 'Work with group presentations', type: 'calculator' },
  { sectionId: 21, sectionTitle: 'Group Presentations', name: 'Presentations Quiz', description: 'Test presentation understanding', type: 'quiz' },

  // Part V: Rings and Fields
  { sectionId: 22, sectionTitle: 'Rings and Fields', name: 'Ring Basics Quiz', description: 'Test ring axioms and properties', type: 'quiz' },

  { sectionId: 24, sectionTitle: 'Fermat and Euler', name: 'Modular Exponentiation', description: 'Compute powers using Euler\'s theorem', type: 'calculator' },
  { sectionId: 24, sectionTitle: 'Fermat and Euler', name: 'Number Theory Quiz', description: 'Practice number theory applications', type: 'quiz' },

  { sectionId: 25, sectionTitle: 'Encryption', name: 'RSA Simulator', description: 'Generate keys and encrypt/decrypt messages', type: 'explorer' },

  // Part VI: Constructing Rings and Fields
  { sectionId: 27, sectionTitle: 'Rings of Polynomials', name: 'Polynomial Arithmetic', description: 'Add, multiply, and divide polynomials', type: 'calculator' },
  { sectionId: 27, sectionTitle: 'Rings of Polynomials', name: 'Polynomial Quiz', description: 'Test polynomial ring concepts', type: 'quiz' },

  { sectionId: 28, sectionTitle: 'Polynomial Factorization', name: 'Irreducibility Checker', description: 'Test polynomials for irreducibility', type: 'calculator' },

  { sectionId: 31, sectionTitle: 'Prime and Maximal Ideals', name: 'Ideals Quiz', description: 'Identify prime and maximal ideals', type: 'quiz' },

  // Part VII: Commutative Algebra
  { sectionId: 33, sectionTitle: 'Vector Spaces', name: 'Basis Finder', description: 'Find bases for vector spaces', type: 'calculator' },
  { sectionId: 33, sectionTitle: 'Vector Spaces', name: 'Vector Space Quiz', description: 'Test vector space concepts', type: 'quiz' },

  { sectionId: 34, sectionTitle: 'Unique Factorization Domains', name: 'UFD Quiz', description: 'Test UFD properties', type: 'quiz' },

  { sectionId: 42, sectionTitle: 'Finite Fields', name: 'Finite Field Calculator', description: 'Perform arithmetic in finite fields', type: 'calculator' },
  { sectionId: 42, sectionTitle: 'Finite Fields', name: 'Finite Fields Quiz', description: 'Test finite field knowledge', type: 'quiz' },

  // Part VIII: Extension Fields
  { sectionId: 40, sectionTitle: 'Algebraic Extensions', name: 'Minimal Polynomial Finder', description: 'Find minimal polynomials of algebraic elements', type: 'calculator' },
  { sectionId: 40, sectionTitle: 'Algebraic Extensions', name: 'Fields Quiz', description: 'Test field extension concepts', type: 'quiz' },

  { sectionId: 41, sectionTitle: 'Geometric Constructions', name: 'Constructions Quiz', description: 'Test constructibility criteria', type: 'quiz' },

  // Part IX: Galois Theory
  { sectionId: 43, sectionTitle: 'Introduction to Galois Theory', name: 'Galois Group Explorer', description: 'Compute Galois groups of polynomials', type: 'explorer' },
  { sectionId: 43, sectionTitle: 'Introduction to Galois Theory', name: 'Galois Quiz', description: 'Test Galois theory basics', type: 'quiz' },

  { sectionId: 46, sectionTitle: 'Galois Theory', name: 'Field Lattice', description: 'Visualize the lattice of intermediate fields', type: 'visualizer' },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  visualizer: { bg: 'from-cyan-500/10 to-cyan-600/5', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  calculator: { bg: 'from-emerald-500/10 to-emerald-600/5', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  explorer: { bg: 'from-violet-500/10 to-violet-600/5', text: 'text-violet-400', border: 'border-violet-500/20' },
  quiz: { bg: 'from-amber-500/10 to-amber-600/5', text: 'text-amber-400', border: 'border-amber-500/20' },
};

const typeIcons: Record<string, string> = {
  visualizer: '📊',
  calculator: '🧮',
  explorer: '🔍',
  quiz: '✓',
};

const typeLabels: Record<string, string> = {
  visualizer: 'Visualization',
  calculator: 'Calculator',
  explorer: 'Explorer',
  quiz: 'Quiz',
};

// Group modules by type
const modulesByType = {
  visualizer: modules.filter(m => m.type === 'visualizer'),
  calculator: modules.filter(m => m.type === 'calculator'),
  explorer: modules.filter(m => m.type === 'explorer'),
  quiz: modules.filter(m => m.type === 'quiz'),
};

export default function InteractiveModules() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark-100 mb-4">Interactive Modules</h1>
      <p className="text-dark-400 mb-8">
        Explore abstract algebra concepts through hands-on visualizations, calculators, and interactive quizzes.
        Each module provides immediate feedback to reinforce your understanding.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {(['visualizer', 'calculator', 'explorer', 'quiz'] as const).map(type => (
          <div key={type} className={`rounded-xl bg-gradient-to-br ${typeColors[type].bg} border ${typeColors[type].border} p-4`}>
            <div className="text-2xl mb-1">{typeIcons[type]}</div>
            <div className={`text-2xl font-bold ${typeColors[type].text}`}>
              {modulesByType[type].length}
            </div>
            <div className="text-xs text-dark-500 uppercase tracking-wider">
              {typeLabels[type]}{type === 'quiz' ? 'zes' : 's'}
            </div>
          </div>
        ))}
      </div>

      {/* Modules by Type */}
      {(['visualizer', 'explorer', 'calculator', 'quiz'] as const).map(type => (
        <div key={type} className="mb-10">
          <h2 className={`text-xl font-bold ${typeColors[type].text} mb-4 flex items-center gap-2`}>
            <span className="text-2xl">{typeIcons[type]}</span>
            {typeLabels[type]}{type === 'quiz' ? 'zes' : 's'}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modulesByType[type].map((module, idx) => (
              <Link
                key={`${module.sectionId}-${idx}`}
                to={`/section/${module.sectionId}`}
                className="group block"
              >
                <div className={`h-full rounded-xl bg-gradient-to-br ${typeColors[type].bg} border ${typeColors[type].border} p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-dark-500">
                      §{module.sectionId}
                    </span>
                    <span className={`text-xs font-medium ${typeColors[type].text} opacity-70`}>
                      {typeLabels[type]}
                    </span>
                  </div>

                  <h3 className={`font-semibold ${typeColors[type].text} mb-1 group-hover:brightness-125 transition-all`}>
                    {module.name}
                  </h3>

                  <p className="text-sm text-dark-400 mb-2">
                    {module.description}
                  </p>

                  <div className="text-xs text-dark-500">
                    {module.sectionTitle}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 pt-8 border-t border-dark-700/50 flex justify-between items-center">
        <Link
          to="/theorems"
          className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Table of Theorems
        </Link>

        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
