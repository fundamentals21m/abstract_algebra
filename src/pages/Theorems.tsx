import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';

interface TheoremEntry {
  sectionId: number;
  title: string;
  statement: string;
  hasProof?: boolean;
}

// Comprehensive list of theorems from the course
const theorems: TheoremEntry[] = [
  // Part I: Groups and Subgroups
  // Section 6: Cyclic Groups
  { sectionId: 6, title: 'Order and Subgroup Size', statement: 'If G = ⟨a⟩, then |G| = |a| (order of a).', hasProof: true },
  { sectionId: 6, title: 'Generators of Z_n', statement: 'k generates Z_n iff gcd(k, n) = 1.', hasProof: true },
  { sectionId: 6, title: 'Order of Elements in Z_n', statement: 'The order of k in Z_n is n/gcd(k, n).', hasProof: true },
  { sectionId: 6, title: 'Subgroups of Cyclic Groups', statement: 'Every subgroup of a cyclic group is cyclic.', hasProof: true },
  { sectionId: 6, title: 'Subgroups of Z_n', statement: 'For each divisor d of n, Z_n has exactly one subgroup of order d.', hasProof: true },
  { sectionId: 6, title: 'Classification of Cyclic Groups', statement: 'A cyclic group is isomorphic to Z or Z_n.', hasProof: true },

  // Section 7: Generating Sets and Cayley Digraphs
  { sectionId: 7, title: "Cayley's Theorem Revisited", statement: 'Every group is isomorphic to a group of permutations.', hasProof: true },

  // Part II: Structure of Groups
  // Section 8: Permutations
  { sectionId: 8, title: 'Disjoint Cycle Decomposition', statement: 'Every permutation is a product of disjoint cycles.', hasProof: true },
  { sectionId: 8, title: 'Order of a Permutation', statement: 'The order of a permutation is the lcm of its cycle lengths.', hasProof: true },
  { sectionId: 8, title: 'Generating S_n with Transpositions', statement: 'Every permutation is a product of transpositions.', hasProof: true },
  { sectionId: 8, title: 'Parity is Well-Defined', statement: 'A permutation cannot be both even and odd.', hasProof: true },
  { sectionId: 8, title: 'A_n is Normal in S_n', statement: 'The alternating group A_n is a normal subgroup of S_n with index 2.', hasProof: true },
  { sectionId: 8, title: "Cayley's Theorem", statement: 'Every group is isomorphic to a subgroup of a symmetric group.', hasProof: true },
  { sectionId: 8, title: 'Conjugacy in S_n', statement: 'Permutations are conjugate iff they have the same cycle type.', hasProof: true },

  // Section 9: Finitely Generated Abelian Groups
  { sectionId: 9, title: 'Fundamental Theorem of Finitely Generated Abelian Groups', statement: 'Every finitely generated abelian group is a direct product of cyclic groups.', hasProof: true },
  { sectionId: 9, title: 'Primary Decomposition', statement: 'The torsion part decomposes into p-primary components.', hasProof: true },

  // Part III: Homomorphisms and Factor Groups
  // Section 12: Factor Groups
  { sectionId: 12, title: 'Well-Definedness', statement: 'Coset multiplication in G/N is well-defined iff N is normal.', hasProof: true },
  { sectionId: 12, title: 'Order of Factor Group', statement: '|G/N| = |G|/|N| (Lagrange).', hasProof: true },
  { sectionId: 12, title: 'Properties of Canonical Projection', statement: 'π: G → G/N is a surjective homomorphism with kernel N.', hasProof: true },
  { sectionId: 12, title: 'First Isomorphism Theorem', statement: 'If φ: G → H is a homomorphism, then G/ker(φ) ≅ im(φ).', hasProof: true },

  // Section 13: Factor-Group Computations
  { sectionId: 13, title: 'Quotient of Direct Products', statement: '(G × H)/(K × L) ≅ (G/K) × (H/L).', hasProof: true },
  { sectionId: 13, title: 'Index 2 Subgroups are Normal', statement: 'Every subgroup of index 2 is normal.', hasProof: true },
  { sectionId: 13, title: "Properties of G'", statement: "The commutator subgroup G' is the smallest normal subgroup with abelian quotient.", hasProof: true },

  // Part IV: Advanced Group Theory
  // Section 16: Isomorphism Theorems
  { sectionId: 16, title: 'Second Isomorphism Theorem', statement: 'If H ≤ G and N ◁ G, then HN/N ≅ H/(H ∩ N).', hasProof: true },
  { sectionId: 16, title: 'Third Isomorphism Theorem', statement: 'If N ⊆ K are normal in G, then (G/N)/(K/N) ≅ G/K.', hasProof: true },

  // Section 17: Sylow Theorems
  { sectionId: 17, title: 'First Sylow Theorem', statement: 'If p^k divides |G|, then G has a subgroup of order p^k.', hasProof: true },
  { sectionId: 17, title: 'Second Sylow Theorem', statement: 'All Sylow p-subgroups are conjugate.', hasProof: true },
  { sectionId: 17, title: 'Third Sylow Theorem', statement: 'n_p ≡ 1 (mod p) and n_p divides |G|.', hasProof: true },

  // Section 18: Series of Groups
  { sectionId: 18, title: 'Jordan-Hölder Theorem', statement: 'Any two composition series have the same factors (up to order and isomorphism).', hasProof: true },
  { sectionId: 18, title: 'Solvability Criterion', statement: 'A group is solvable iff it has a subnormal series with abelian factors.', hasProof: true },
  { sectionId: 18, title: 'Solvability via Derived Series', statement: 'G is solvable iff some derived subgroup G^(n) = {e}.', hasProof: true },

  // Section 19: Free Abelian Groups
  { sectionId: 19, title: 'Concrete Description', statement: 'A free abelian group of rank n is isomorphic to Z^n.', hasProof: true },
  { sectionId: 19, title: 'Basis Properties', statement: 'Any two bases of a free abelian group have the same cardinality.', hasProof: true },
  { sectionId: 19, title: 'Subgroups are Free', statement: 'Every subgroup of a free abelian group is free.', hasProof: true },
  { sectionId: 19, title: 'Smith Normal Form', statement: 'Every matrix over Z can be reduced to Smith normal form.', hasProof: true },
  { sectionId: 19, title: 'Structure of Quotients', statement: 'Quotients of Z^n are direct sums of cyclic groups.', hasProof: true },

  // Section 20: Free Groups
  { sectionId: 20, title: 'Unique Reduced Representative', statement: 'Every element of F(S) has a unique reduced word representative.', hasProof: true },
  { sectionId: 20, title: 'Universal Property', statement: 'Every function S → G extends uniquely to a homomorphism F(S) → G.', hasProof: true },
  { sectionId: 20, title: 'Nielsen-Schreier Theorem', statement: 'Every subgroup of a free group is free.', hasProof: true },
  { sectionId: 20, title: 'Schreier Index Formula', statement: 'rank(H) - 1 = [G:H](rank(F) - 1) for H ≤ F.', hasProof: true },

  // Section 21: Group Presentations
  { sectionId: 21, title: "Tietze's Theorem", statement: 'Finite presentations of isomorphic groups can be transformed into each other.', hasProof: true },
  { sectionId: 21, title: 'Undecidability (Novikov-Boone)', statement: 'There is no algorithm to decide if two presentations define isomorphic groups.', hasProof: false },

  // Part V: Rings and Fields
  // Section 22: Rings and Fields
  { sectionId: 22, title: 'Ring Properties', statement: '0·a = a·0 = 0 and (-a)b = a(-b) = -(ab).', hasProof: true },
  { sectionId: 22, title: 'Z_n is a Field iff n is Prime', statement: 'Z_n is a field if and only if n is prime.', hasProof: true },
  { sectionId: 22, title: 'Subring Test', statement: 'S is a subring iff a - b ∈ S and ab ∈ S for all a,b ∈ S.', hasProof: true },
  { sectionId: 22, title: 'Characteristic of an Integral Domain', statement: 'The characteristic of an integral domain is 0 or prime.', hasProof: true },

  // Section 23: Integral Domains
  { sectionId: 23, title: 'Cancellation in Integral Domains', statement: 'If ab = ac and a ≠ 0, then b = c.', hasProof: true },
  { sectionId: 23, title: 'Finite Integral Domain is a Field', statement: 'Every finite integral domain is a field.', hasProof: true },
  { sectionId: 23, title: 'Prime implies Irreducible', statement: 'In an integral domain, every prime element is irreducible.', hasProof: true },

  // Section 24: Fermat and Euler
  { sectionId: 24, title: "Fermat's Little Theorem", statement: 'If p is prime and p ∤ a, then a^(p-1) ≡ 1 (mod p).', hasProof: true },
  { sectionId: 24, title: "Euler's Theorem", statement: 'If gcd(a, n) = 1, then a^φ(n) ≡ 1 (mod n).', hasProof: true },
  { sectionId: 24, title: 'Formula for φ(n)', statement: 'φ(n) = n ∏(1 - 1/p) over primes p dividing n.', hasProof: true },
  { sectionId: 24, title: 'Multiplicativity', statement: 'φ(mn) = φ(m)φ(n) when gcd(m,n) = 1.', hasProof: true },

  // Section 25: Encryption
  { sectionId: 25, title: 'RSA Correctness', statement: 'If ed ≡ 1 (mod φ(n)), then (m^e)^d ≡ m (mod n).', hasProof: true },

  // Part VI: Constructing Rings and Fields
  // Section 26: Field of Quotients
  { sectionId: 26, title: 'Q(D) is a Field', statement: 'The field of quotients of an integral domain is a field.', hasProof: true },
  { sectionId: 26, title: 'Canonical Embedding', statement: 'D embeds into Q(D) via a ↦ [(a, 1)].', hasProof: true },
  { sectionId: 26, title: 'Universal Property of Q(D)', statement: 'Every homomorphism from D to a field extends uniquely to Q(D).', hasProof: true },

  // Section 27: Polynomial Rings
  { sectionId: 27, title: 'Degree Properties', statement: 'deg(fg) = deg(f) + deg(g) in an integral domain.', hasProof: true },
  { sectionId: 27, title: 'R[x] Inherits Properties', statement: 'If R is an integral domain, so is R[x].', hasProof: true },
  { sectionId: 27, title: 'Division Algorithm for Polynomials', statement: 'Over a field: f = qg + r with deg(r) < deg(g).', hasProof: true },
  { sectionId: 27, title: 'Evaluation Homomorphism', statement: 'φ_a: R[x] → R defined by f(x) ↦ f(a) is a ring homomorphism.', hasProof: true },

  // Section 30: Ring Homomorphisms
  { sectionId: 30, title: 'Kernel is an Ideal', statement: 'The kernel of a ring homomorphism is an ideal.', hasProof: true },
  { sectionId: 30, title: 'First Isomorphism Theorem', statement: 'If φ: R → S is a homomorphism, then R/ker(φ) ≅ im(φ).', hasProof: true },

  // Section 31: Prime and Maximal Ideals
  { sectionId: 31, title: 'Characterization of Prime Ideals', statement: 'P is prime iff R/P is an integral domain.', hasProof: true },
  { sectionId: 31, title: 'Characterization of Maximal Ideals', statement: 'M is maximal iff R/M is a field.', hasProof: true },
  { sectionId: 31, title: 'Maximal implies Prime', statement: 'Every maximal ideal is prime.', hasProof: true },

  // Section 32: Noncommutative Rings
  { sectionId: 32, title: 'Quaternions are a Division Ring', statement: 'The quaternions H form a noncommutative division ring.', hasProof: true },
  { sectionId: 32, title: "Wedderburn's Little Theorem", statement: 'Every finite division ring is a field.', hasProof: true },

  // Part VII: Commutative Algebra
  // Section 33: Vector Spaces
  { sectionId: 33, title: 'Subspace Test', statement: 'W is a subspace iff it is closed under addition and scalar multiplication.', hasProof: true },
  { sectionId: 33, title: 'Dimension Theorem', statement: 'Every basis of a vector space has the same cardinality.', hasProof: true },
  { sectionId: 33, title: 'Dimension Formula', statement: 'dim(V) = dim(ker T) + dim(im T).', hasProof: true },

  // Section 34: Unique Factorization Domains
  { sectionId: 34, title: 'Equivalence in UFDs', statement: 'In a UFD, irreducible elements are prime.', hasProof: true },
  { sectionId: 34, title: 'PID implies UFD', statement: 'Every principal ideal domain is a unique factorization domain.', hasProof: true },
  { sectionId: 34, title: 'GCD Existence', statement: 'In a UFD, any two nonzero elements have a gcd.', hasProof: true },

  // Section 35: Euclidean Domains
  { sectionId: 35, title: "Bézout's Identity", statement: 'In a Euclidean domain, gcd(a,b) = sa + tb for some s, t.', hasProof: true },
  { sectionId: 35, title: 'Euclidean implies PID', statement: 'Every Euclidean domain is a principal ideal domain.', hasProof: true },

  // Section 36: Number Theory
  { sectionId: 36, title: 'Ring of Algebraic Integers', statement: 'The algebraic integers in a number field form a ring.', hasProof: true },
  { sectionId: 36, title: 'Ideal Factorization', statement: 'In the ring of integers, ideals factor uniquely into prime ideals.', hasProof: true },

  // Section 37: Algebraic Geometry
  { sectionId: 37, title: "Hilbert's Nullstellensatz", statement: 'I(V(I)) = √I, the radical of I.', hasProof: true },
  { sectionId: 37, title: 'Irreducibility and Prime Ideals', statement: 'V is irreducible iff I(V) is a prime ideal.', hasProof: true },

  // Part VIII: Extension Fields
  // Section 39: Introduction to Extension Fields
  { sectionId: 39, title: 'Simple Extension Structure', statement: 'F(α) ≅ F[x]/(p(x)) where p is the minimal polynomial of α.', hasProof: true },

  // Section 40: Algebraic Extensions
  { sectionId: 40, title: 'Minimal Polynomial Properties', statement: 'The minimal polynomial is unique, monic, and irreducible.', hasProof: true },
  { sectionId: 40, title: 'Finite implies Algebraic', statement: 'Every element of a finite extension is algebraic.', hasProof: true },
  { sectionId: 40, title: 'Existence and Uniqueness', statement: 'Every polynomial has a splitting field, unique up to isomorphism.', hasProof: true },

  // Section 41: Geometric Constructions
  { sectionId: 41, title: 'Field of Constructible Numbers', statement: 'The constructible numbers form a field.', hasProof: true },
  { sectionId: 41, title: 'Constructibility Criterion', statement: 'α is constructible iff [Q(α):Q] is a power of 2.', hasProof: true },
  { sectionId: 41, title: 'Gauss-Wantzel Theorem', statement: 'A regular n-gon is constructible iff n = 2^k · p_1 · ... · p_m with distinct Fermat primes p_i.', hasProof: true },

  // Section 42: Finite Fields
  { sectionId: 42, title: 'Existence and Uniqueness', statement: 'For every prime power p^n, there exists a unique finite field F_{p^n}.', hasProof: true },
  { sectionId: 42, title: 'Construction via Irreducible Polynomials', statement: 'F_{p^n} ≅ F_p[x]/(f) for any irreducible f of degree n.', hasProof: true },
  { sectionId: 42, title: 'Cyclic Multiplicative Group', statement: 'The multiplicative group of a finite field is cyclic.', hasProof: true },
  { sectionId: 42, title: 'Frobenius Automorphism', statement: 'φ: x ↦ x^p generates Gal(F_{p^n}/F_p) ≅ Z_n.', hasProof: true },
  { sectionId: 42, title: 'Subfield Criterion', statement: 'F_{p^m} ⊆ F_{p^n} iff m divides n.', hasProof: true },

  // Part IX: Galois Theory
  // Section 43: Introduction to Galois Theory
  { sectionId: 43, title: 'Automorphisms Permute Roots', statement: 'If σ ∈ Gal(E/F) and α is a root of f ∈ F[x], so is σ(α).', hasProof: true },
  { sectionId: 43, title: 'Characterization of Galois Extensions', statement: 'E/F is Galois iff |Gal(E/F)| = [E:F].', hasProof: true },

  // Section 44: Splitting Fields
  { sectionId: 44, title: 'Existence of Splitting Fields', statement: 'Every polynomial has a splitting field.', hasProof: true },
  { sectionId: 44, title: 'Uniqueness', statement: 'Any two splitting fields are isomorphic.', hasProof: true },
  { sectionId: 44, title: 'Degree Bound', statement: 'The splitting field of f has degree at most n!.', hasProof: true },
  { sectionId: 44, title: 'Galois Group as Permutation Group', statement: 'Gal(f) acts on roots of f, giving Gal(f) ≤ S_n.', hasProof: true },
  { sectionId: 44, title: 'Normal = Splitting Field', statement: 'E/F is normal iff E is a splitting field over F.', hasProof: true },

  // Section 45: Separable Extensions
  { sectionId: 45, title: 'Derivative Test', statement: 'f is separable iff gcd(f, f\') = 1.', hasProof: true },
  { sectionId: 45, title: 'Irreducible Separability', statement: 'Over characteristic 0, every irreducible polynomial is separable.', hasProof: true },
  { sectionId: 45, title: 'Characteristic Zero', statement: 'Every algebraic extension in characteristic 0 is separable.', hasProof: true },
  { sectionId: 45, title: 'Separable Closure is a Field', statement: 'The separable closure of F in E is a subfield.', hasProof: true },
  { sectionId: 45, title: 'Separable + Normal = Galois', statement: 'E/F is Galois iff it is both separable and normal.', hasProof: true },

  // Section 46: Galois Theory
  { sectionId: 46, title: 'Fundamental Theorem of Galois Theory', statement: 'There is an order-reversing bijection between subgroups of Gal(E/F) and intermediate fields.', hasProof: true },
  { sectionId: 46, title: 'Normality Correspondence', statement: 'K is normal over F iff Gal(E/K) is normal in Gal(E/F).', hasProof: true },

  // Section 49: Insolvability of the Quintic
  { sectionId: 49, title: 'Abel-Ruffini Theorem', statement: 'The general quintic is not solvable by radicals.', hasProof: true },
  { sectionId: 49, title: 'Solvability Criterion', statement: 'f is solvable by radicals iff Gal(f) is a solvable group.', hasProof: true },
  { sectionId: 49, title: 'A_5 is Simple', statement: 'The alternating group A_5 is simple (has no nontrivial normal subgroups).', hasProof: true },
];

// Helper to get section info
const getSectionTitle = (sectionId: number): string => {
  for (const part of curriculum) {
    const section = part.sections.find(s => s.id === sectionId);
    if (section) return section.title;
  }
  return `Section ${sectionId}`;
};

// Group theorems by part
const groupedTheorems = curriculum.map(part => ({
  part,
  theorems: theorems.filter(t =>
    part.sections.some(s => s.id === t.sectionId)
  )
})).filter(group => group.theorems.length > 0);

export default function Theorems() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark-100 mb-4">Table of Theorems</h1>
      <p className="text-dark-400 mb-8">
        A comprehensive reference of all mathematical theorems in Abstract Algebra, organized by part.
        Click any theorem to go to its section.
      </p>

      <div className="bg-gradient-to-br from-amber-500/10 to-dark-800/50 border border-amber-500/20 rounded-2xl p-4 mb-8">
        <p className="text-amber-300 text-sm">
          <span className="font-semibold">Tip:</span> Many theorems include clickable "View Proof" buttons on their section pages.
        </p>
      </div>

      <div className="space-y-8">
        {groupedTheorems.map(({ part, theorems: partTheorems }) => (
          <div key={part.id} className="space-y-3">
            <h2 className="text-xl font-bold text-dark-200 border-b border-dark-700/50 pb-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-sm font-bold text-amber-400">
                {part.id}
              </span>
              {part.title}
            </h2>

            <div className="space-y-2">
              {partTheorems.map((theorem, idx) => (
                <Link
                  key={`${theorem.sectionId}-${idx}`}
                  to={`/section/${theorem.sectionId}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-dark-800/40 border border-dark-700/50 p-4 transition-all duration-200 hover:border-amber-500/30 hover:bg-dark-800/60">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-600 opacity-40 group-hover:opacity-100 transition-opacity" />

                    <div className="pl-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-dark-500">
                          §{theorem.sectionId}
                        </span>
                        <span className="text-[10px] text-dark-600">•</span>
                        <span className="text-[10px] text-dark-500">
                          {getSectionTitle(theorem.sectionId)}
                        </span>
                        {theorem.hasProof && (
                          <span className="ml-auto text-[10px] text-amber-500/70 font-medium">
                            Has Proof
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                        {theorem.title}
                      </h3>

                      <p className="text-sm text-dark-400 mt-1">
                        {theorem.statement}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-dark-700/50 flex justify-between items-center">
        <Link
          to="/interactive"
          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Interactive Modules
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
