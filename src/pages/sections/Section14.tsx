import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section14() {
  return (
    <LessonLayout sectionId={14}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            A <strong>group action</strong> formalizes how a group can "act" on a set by permuting
            its elements. This unifying concept connects group theory to geometry, combinatorics,
            and many other areas of mathematics.
          </p>
        </section>

        {/* Definition */}
        <Definition title="Group Action">
          <p>
            A <strong>group action</strong> of <Math>G</Math> on a set <Math>X</Math> is a function
            <Math>{'G \\times X \\to X'}</Math>, written <Math>{'(g, x) \\mapsto g \\cdot x'}</Math>, satisfying:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            <li><Math>{'e \\cdot x = x'}</Math> for all <Math>{'x \\in X'}</Math> (identity)</li>
            <li><Math>{'(gh) \\cdot x = g \\cdot (h \\cdot x)'}</Math> for all <Math>{'g, h \\in G'}</Math>, <Math>{'x \\in X'}</Math> (compatibility)</li>
          </ol>
          <p className="mt-2">
            We say <Math>G</Math> <strong>acts on</strong> <Math>X</Math>, or <Math>X</Math> is a <strong>G-set</strong>.
          </p>
        </Definition>

        <Example title="Group Actions">
          <div className="space-y-3">
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400"><Math>S_n</Math> on <Math>{'{1, 2, ..., n}'}</Math></p>
              <p className="text-dark-300"><Math>{'\\sigma \\cdot i = \\sigma(i)'}</Math></p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400"><Math>D_n</Math> on vertices of <Math>n</Math>-gon</p>
              <p className="text-dark-300">Rotations and reflections permute vertices</p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400"><Math>GL_n</Math> on <Math>{'\\mathbb{R}^n'}</Math></p>
              <p className="text-dark-300"><Math>{'A \\cdot \\vec{v} = A\\vec{v}'}</Math> (matrix multiplication)</p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400"><Math>G</Math> on itself by conjugation</p>
              <p className="text-dark-300"><Math>{'g \\cdot x = gxg^{-1}'}</Math></p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400"><Math>G</Math> on itself by left multiplication</p>
              <p className="text-dark-300"><Math>{'g \\cdot x = gx'}</Math> (used in Cayley's theorem)</p>
            </div>
          </div>
        </Example>

        {/* Orbits and Stabilizers */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Orbits and Stabilizers</h3>

          <Definition title="Orbit">
            <p>
              The <strong>orbit</strong> of <Math>{'x \\in X'}</Math> under the action of <Math>G</Math> is:
            </p>
            <MathBlock>{'\\text{orb}(x) = G \\cdot x = \\{g \\cdot x : g \\in G\\}'}</MathBlock>
            <p className="mt-2">
              This is the set of all points that <Math>x</Math> can reach under the group action.
            </p>
          </Definition>

          <Definition title="Stabilizer">
            <p>
              The <strong>stabilizer</strong> (or isotropy subgroup) of <Math>{'x \\in X'}</Math> is:
            </p>
            <MathBlock>{'\\text{stab}(x) = G_x = \\{g \\in G : g \\cdot x = x\\}'}</MathBlock>
            <p className="mt-2">
              This is the set of group elements that fix <Math>x</Math>.
            </p>
          </Definition>

          <Theorem title="Stabilizer is a Subgroup">
            <p>
              For any <Math>{'x \\in X'}</Math>, the stabilizer <Math>{'G_x'}</Math> is a subgroup of <Math>G</Math>.
            </p>
          </Theorem>

          <Example title="D₄ Acting on Square Vertices">
            <p className="mb-3">
              Label vertices 1, 2, 3, 4 clockwise:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><strong>Orbit of vertex 1:</strong> <Math>{'{1, 2, 3, 4}'}</Math> (all vertices)</p>
              <p><strong>Stabilizer of vertex 1:</strong> <Math>{'\\{e, s\\}'}</Math> where <Math>s</Math> is reflection through vertex 1</p>
              <p className="text-dark-400 mt-2">
                Note: <Math>{'|\\text{orb}(1)| \\cdot |\\text{stab}(1)| = 4 \\cdot 2 = 8 = |D_4|'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Orbit-Stabilizer Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Orbit-Stabilizer Theorem</h3>

          <Theorem title="Orbit-Stabilizer Theorem">
            <p>
              For a group <Math>G</Math> acting on <Math>X</Math> and any <Math>{'x \\in X'}</Math>:
            </p>
            <MathBlock>{'|G| = |\\text{orb}(x)| \\cdot |\\text{stab}(x)|'}</MathBlock>
            <p className="mt-2">
              Equivalently: <Math>{'|\\text{orb}(x)| = [G : G_x]'}</Math>
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Key insight:</strong> There's a bijection between the orbit of <Math>x</Math>
              and the cosets of its stabilizer. The element <Math>{'g \\cdot x'}</Math> corresponds
              to the coset <Math>{'gG_x'}</Math>.
            </p>
          </div>

          <Example title="Counting Rotations of a Cube">
            <p className="mb-3">
              The rotation group of a cube acts on its 8 vertices:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Pick a vertex <Math>v</Math>:</p>
              <p>• <Math>{'|\\text{orb}(v)| = 8'}</Math> (can rotate to any vertex)</p>
              <p>• <Math>{'|\\text{stab}(v)| = 3'}</Math> (rotations fixing <Math>v</Math> = rotations about diagonal through <Math>v</Math>)</p>
              <p className="text-primary-400 mt-2">
                Total rotations: <Math>{'8 \\times 3 = 24'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Types of Actions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Types of Actions</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Transitive Action</h4>
              <p className="text-dark-300 text-sm">
                An action is <strong>transitive</strong> if there is only one orbit:
                for any <Math>{'x, y \\in X'}</Math>, some <Math>{'g \\in G'}</Math> satisfies <Math>{'g \\cdot x = y'}</Math>.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Faithful Action</h4>
              <p className="text-dark-300 text-sm">
                An action is <strong>faithful</strong> if only the identity fixes everything:
                <Math>{'g \\cdot x = x'}</Math> for all <Math>x</Math> implies <Math>{'g = e'}</Math>.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Free Action</h4>
              <p className="text-dark-300 text-sm">
                An action is <strong>free</strong> if no non-identity element has fixed points:
                <Math>{'g \\cdot x = x'}</Math> implies <Math>{'g = e'}</Math>.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Regular Action</h4>
              <p className="text-dark-300 text-sm">
                An action is <strong>regular</strong> if it is both transitive and free.
                Then <Math>{'|G| = |X|'}</Math>.
              </p>
            </div>
          </div>
        </section>

        {/* Fixed Points */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Fixed Points and the Class Equation</h3>

          <Definition title="Fixed Point Set">
            <p>
              For <Math>{'g \\in G'}</Math>, the <strong>fixed point set</strong> is:
            </p>
            <MathBlock>{'X^g = \\{x \\in X : g \\cdot x = x\\}'}</MathBlock>
          </Definition>

          <Theorem title="Burnside's Lemma (Cauchy-Frobenius)">
            <p>
              The number of orbits equals the average number of fixed points:
            </p>
            <MathBlock>{'|X/G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g|'}</MathBlock>
          </Theorem>

          <Example title="Counting Distinct Necklaces">
            <p className="mb-3">
              How many distinct 4-bead necklaces with 2 colors?
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Group: <Math>D_4</Math> (8 elements) acting on colorings</p>
              <p>Total colorings: <Math>{'2^4 = 16'}</Math></p>
              <p className="mt-2">Fixed points per element:</p>
              <ul className="text-dark-400 text-sm ml-4">
                <li><Math>e</Math>: 16 fixed</li>
                <li><Math>{'r, r^3'}</Math>: 2 fixed each</li>
                <li><Math>{'r^2'}</Math>: 4 fixed</li>
                <li>4 reflections: 4 or 8 fixed each (depends on axis)</li>
              </ul>
              <p className="text-primary-400 mt-2">
                Distinct necklaces: <Math>{'(16+2+4+2+4+8+4+8)/8 = 6'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Conjugation Action */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Conjugation Action</h3>

          <Definition title="Conjugacy Class">
            <p>
              <Math>G</Math> acts on itself by conjugation: <Math>{'g \\cdot x = gxg^{-1}'}</Math>.
              The orbit of <Math>x</Math> is its <strong>conjugacy class</strong>:
            </p>
            <MathBlock>{'\\text{cl}(x) = \\{gxg^{-1} : g \\in G\\}'}</MathBlock>
          </Definition>

          <Definition title="Centralizer">
            <p>
              The stabilizer under conjugation is the <strong>centralizer</strong>:
            </p>
            <MathBlock>{'C_G(x) = \\{g \\in G : gxg^{-1} = x\\} = \\{g \\in G : gx = xg\\}'}</MathBlock>
          </Definition>

          <Theorem title="Class Equation">
            <p>
              For a finite group <Math>G</Math>:
            </p>
            <MathBlock>{'|G| = |Z(G)| + \\sum_{i} [G : C_G(x_i)]'}</MathBlock>
            <p className="mt-2">
              where the sum is over representatives <Math>{'x_i'}</Math> of non-central conjugacy classes.
            </p>
          </Theorem>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              A group action is a homomorphism <Math>{'G \\to \\text{Sym}(X)'}</Math>.
            </li>
            <li>
              Orbits partition <Math>X</Math>; stabilizers are subgroups of <Math>G</Math>.
            </li>
            <li>
              <strong>Orbit-Stabilizer:</strong> <Math>{'|G| = |\\text{orb}(x)| \\cdot |\\text{stab}(x)|'}</Math>
            </li>
            <li>
              <strong>Burnside's Lemma:</strong> counts orbits using fixed points.
            </li>
            <li>
              Conjugation gives conjugacy classes; the Class Equation relates these to <Math>{'|G|'}</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
