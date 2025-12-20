import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { SymmetryAnimationDemo, PermutationComposerDemo, AbelianCayleyTableDemo, GeometricSymmetries } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section04() {
  return (
    <LessonLayout sectionId={4}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            Not all groups are abelian! In this section, we explore the most important examples of
            <strong> nonabelian groups</strong>: the dihedral groups <Math>D_n</Math> (symmetries of regular polygons)
            and the symmetric groups <Math>S_n</Math> (permutations). These groups demonstrate that
            the order of operations can matter.
          </p>
        </section>

        {/* Dihedral Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Dihedral Groups <Math>D_n</Math></h3>

          <Definition title="Dihedral Group D_n">
            <p>
              The <strong>dihedral group</strong> <Math>D_n</Math> is the group of symmetries of a
              regular <Math>n</Math>-gon. It consists of:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>n</Math> rotations: <Math>{'r^0 = e, r, r^2, ..., r^{n-1}'}</Math></li>
              <li><Math>n</Math> reflections: <Math>{'s, sr, sr^2, ..., sr^{n-1}'}</Math></li>
            </ul>
            <p className="mt-2">
              Total: <Math>{'|D_n| = 2n'}</Math> elements.
            </p>
          </Definition>

          <div className="callout-info">
            <p>
              <strong>Notation:</strong> Some texts use <Math>{'D_{2n}'}</Math> instead of <Math>{'D_n'}</Math> to
              emphasize the group has <Math>{'2n'}</Math> elements. We use the convention where the subscript
              indicates the number of vertices of the polygon.
            </p>
          </div>

          {/* Interactive Symmetry Animation */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Interactive: Polygon Symmetries</h4>
            <p className="text-dark-300 mb-4">
              Explore the rotations and reflections of regular polygons. Click buttons to apply transformations
              and watch how they compose.
            </p>
            <SymmetryAnimationDemo />
          </div>
        </section>

        {/* Geometric Shape Symmetries - Focused Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Symmetries of Common Shapes</h3>

          <p className="text-dark-300 mb-4">
            Let's examine three familiar shapes and their symmetry groups in detail. Notice how
            the structure of each shape determines its symmetries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 22,20 2,20" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-dark-100">Equilateral Triangle</h4>
                  <p className="text-xs text-primary-400 font-mono">D₃</p>
                </div>
              </div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>3 rotational symmetries</li>
                <li>3 reflection symmetries</li>
                <li>Order: 6</li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="6" width="18" height="12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-dark-100">Rectangle</h4>
                  <p className="text-xs text-primary-400 font-mono">D₂ ≅ V₄</p>
                </div>
              </div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>2 rotational symmetries</li>
                <li>2 reflection symmetries</li>
                <li>Order: 4 (abelian!)</li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="16" height="16" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-dark-100">Square</h4>
                  <p className="text-xs text-primary-400 font-mono">D₄</p>
                </div>
              </div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>4 rotational symmetries</li>
                <li>4 reflection symmetries</li>
                <li>Order: 8</li>
              </ul>
            </div>
          </div>

          <GeometricSymmetries />

          <div className="callout-info mt-6">
            <p className="font-semibold mb-2">Why is the rectangle special?</p>
            <p className="text-sm">
              Unlike the triangle and square, the rectangle (when not a square) has only 180° rotational
              symmetry. This makes <Math>D_2</Math> isomorphic to the <strong>Klein 4-group</strong> <Math>V_4</Math>,
              which is the unique non-cyclic group of order 4. It's also abelian — one of only two
              dihedral groups that are abelian (the other being <Math>D_1</Math>).
            </p>
          </div>

          <Example title="Vertex Tracking">
            <p className="mb-3">
              Watch how the colored vertices move under each symmetry. Vertex 1 (red) helps you track
              the transformation:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-dark-400">
              <li>
                <strong>Rotations</strong> move all vertices together in a cycle
              </li>
              <li>
                <strong>Reflections</strong> flip the shape across an axis, swapping some vertices
              </li>
              <li>
                Composing a rotation with a reflection gives a different reflection
              </li>
            </ul>
          </Example>
        </section>

        {/* D_n Relations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Structure of <Math>D_n</Math></h3>

          <Theorem title="Presentation of D_n">
            <p>
              The dihedral group <Math>D_n</Math> is generated by a rotation <Math>r</Math> and
              a reflection <Math>s</Math> with relations:
            </p>
            <MathBlock>{'D_n = \\langle r, s \\mid r^n = e, s^2 = e, srs = r^{-1} \\rangle'}</MathBlock>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Key Relations</h4>
            <ul className="space-y-3 text-dark-300">
              <li>
                <Math>{'r^n = e'}</Math> — rotating <Math>n</Math> times returns to start
              </li>
              <li>
                <Math>{'s^2 = e'}</Math> — reflecting twice returns to start
              </li>
              <li>
                <Math>{'sr = r^{-1}s = r^{n-1}s'}</Math> — reflection reverses rotation direction
              </li>
            </ul>
          </div>

          <Example title="Non-commutativity in D₃">
            <p className="mb-3">
              In <Math>D_3</Math> (symmetries of an equilateral triangle):
            </p>
            <div className="bg-dark-900 p-4 rounded font-mono text-sm space-y-2">
              <p>rs = sr<sup>-1</sup> = sr² ≠ sr</p>
              <p className="text-dark-400">Therefore rs ≠ sr, so D₃ is nonabelian!</p>
            </div>
          </Example>

          {/* D_n Cayley Table */}
          <div className="mt-6">
            <AbelianCayleyTableDemo defaultGroup="Dn" defaultN={3} />
          </div>
        </section>

        {/* Symmetric Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Symmetric Groups <Math>S_n</Math></h3>

          <Definition title="Symmetric Group S_n">
            <p>
              The <strong>symmetric group</strong> <Math>S_n</Math> is the group of all bijections
              (permutations) from the set <Math>{'{1, 2, ..., n}'}</Math> to itself, under composition.
            </p>
            <MathBlock>{'|S_n| = n!'}</MathBlock>
          </Definition>

          <Example title="Size of Symmetric Groups">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[2, 3, 4, 5].map(n => {
                const factorial = [1, 1, 2, 6, 24, 120][n];
                return (
                  <div key={n} className="bg-dark-900 p-3 rounded text-center">
                    <div className="text-sm text-dark-400">n = {n}</div>
                    <div className="text-xl font-mono text-primary-400">|S<sub>{n}</sub>| = {factorial}</div>
                  </div>
                );
              })}
            </div>
          </Example>

          {/* Interactive Permutation Composer */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Interactive: Permutation Composer</h4>
            <p className="text-dark-300 mb-4">
              Compose permutations and see how they combine. Note that composition is generally
              not commutative!
            </p>
            <PermutationComposerDemo />
          </div>
        </section>

        {/* Cycle Notation */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cycle Notation</h3>

          <Definition title="Cycle">
            <p>
              A <strong>cycle</strong> <Math>{'(a_1 \\, a_2 \\, ... \\, a_k)'}</Math> is a permutation that sends:
            </p>
            <MathBlock>{'a_1 \\to a_2 \\to a_3 \\to ... \\to a_k \\to a_1'}</MathBlock>
            <p className="mt-2">and fixes all other elements.</p>
          </Definition>

          <Example title="Cycles in S₄">
            <div className="space-y-2 font-mono text-sm">
              <p><Math>{'(1 \\, 2 \\, 3)'}</Math>: 1→2→3→1, fixes 4</p>
              <p><Math>{'(1 \\, 4)'}</Math>: 1↔4 (transposition)</p>
              <p><Math>{'(1 \\, 2 \\, 3 \\, 4)'}</Math>: 1→2→3→4→1</p>
              <p><Math>{'(1 \\, 2)(3 \\, 4)'}</Math>: 1↔2 and 3↔4</p>
            </div>
          </Example>

          <Theorem title="Disjoint Cycle Decomposition">
            <p>
              Every permutation can be written as a product of disjoint cycles, and this
              decomposition is unique (up to the order of the cycles).
            </p>
          </Theorem>
        </section>

        {/* Non-commutativity */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Non-commutativity in <Math>S_n</Math></h3>

          <Example title="S₃ is Nonabelian">
            <p className="mb-3">
              Let <Math>{'\\sigma = (1 \\, 2)'}</Math> and <Math>{'\\tau = (1 \\, 3)'}</Math>.
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p className="font-mono">
                σ ∘ τ = (1 2)(1 3) = (1 3 2)
              </p>
              <p className="font-mono">
                τ ∘ σ = (1 3)(1 2) = (1 2 3)
              </p>
              <p className="text-primary-400 mt-2">
                (1 3 2) ≠ (1 2 3), so σ ∘ τ ≠ τ ∘ σ
              </p>
            </div>
          </Example>

          <Theorem title="S_n is Nonabelian for n ≥ 3">
            <p>
              The symmetric group <Math>S_n</Math> is nonabelian for all <Math>{'n \\geq 3'}</Math>.
            </p>
            <p className="mt-2">
              <Math>S_1</Math> and <Math>S_2</Math> are abelian (trivial and cyclic of order 2).
            </p>
          </Theorem>
        </section>

        {/* Connection between D_n and S_n */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Connection: <Math>{'D_n \\hookrightarrow S_n'}</Math></h3>
          <p className="text-dark-300 mb-3">
            Every dihedral group <Math>D_n</Math> can be viewed as a subgroup of <Math>S_n</Math>
            by labeling the vertices of the polygon 1 through <Math>n</Math>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-dark-300">
            <li>
              A rotation by <Math>{'2\\pi/n'}</Math> corresponds to the cycle <Math>{'(1 \\, 2 \\, ... \\, n)'}</Math>
            </li>
            <li>
              Reflections correspond to products of transpositions
            </li>
          </ul>
        </section>

        {/* Matrix Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Preview: Matrix Groups</h3>

          <div className="card">
            <p className="text-dark-300 mb-3">
              Another important source of nonabelian groups are matrix groups:
            </p>
            <ul className="list-disc list-inside space-y-2 text-dark-300">
              <li>
                <Math>{'GL_n(\\mathbb{R})'}</Math>: invertible <Math>{'n \\times n'}</Math> real matrices
              </li>
              <li>
                <Math>{'SL_n(\\mathbb{R})'}</Math>: matrices with determinant 1
              </li>
              <li>
                <Math>{'O(n)'}</Math>: orthogonal matrices (preserve distances)
              </li>
              <li>
                <Math>{'SO(n)'}</Math>: special orthogonal matrices (rotations)
              </li>
            </ul>
            <p className="text-dark-400 mt-3 text-sm">
              Matrix multiplication is nonabelian for <Math>{'n \\geq 2'}</Math>.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <Math>D_n</Math> is the group of symmetries of a regular <Math>n</Math>-gon with <Math>2n</Math> elements.
            </li>
            <li>
              <strong>Common shapes:</strong> Triangle → <Math>D_3</Math> (order 6), Rectangle → <Math>{'D_2 \\cong V_4'}</Math> (order 4), Square → <Math>D_4</Math> (order 8).
            </li>
            <li>
              <Math>D_2</Math> is special: it's abelian and isomorphic to the Klein 4-group.
            </li>
            <li>
              <Math>S_n</Math> is the group of all permutations on <Math>n</Math> elements with <Math>n!</Math> elements.
            </li>
            <li>
              Both <Math>D_n</Math> (for <Math>{'n \\geq 3'}</Math>) and <Math>S_n</Math> (for <Math>{'n \\geq 3'}</Math>) are nonabelian.
            </li>
            <li>
              Every permutation has a unique disjoint cycle decomposition.
            </li>
            <li>
              <Math>D_n</Math> embeds naturally into <Math>S_n</Math> by labeling vertices.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
