import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section49() {
  return (
    <LessonLayout sectionId={49}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            The <strong>insolvability of the quintic</strong> is one of the crown jewels of Galois theory.
            It proves that there is no general formula using radicals to solve polynomial equations
            of degree 5 or higher—a question that puzzled mathematicians for centuries.
          </p>
        </section>

        {/* Historical Context */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Historical Background</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">The Quest for Formulas</h4>
            <div className="space-y-3 text-dark-300">
              <p>
                <strong>Degree 2:</strong> Quadratic formula known since antiquity
                (<Math>{'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}'}</Math>)
              </p>
              <p>
                <strong>Degree 3:</strong> Cardano's formula (1545)
              </p>
              <p>
                <strong>Degree 4:</strong> Ferrari's method (1540s)
              </p>
              <p>
                <strong>Degree 5+:</strong> No general formula! (Abel 1824, Galois 1830s)
              </p>
            </div>
          </div>

          <div className="callout-info mt-4">
            <p>
              <strong>Évariste Galois</strong> (1811–1832) developed his revolutionary theory
              before dying in a duel at age 20. His work, written the night before his death,
              wasn't fully understood for decades.
            </p>
          </div>
        </section>

        {/* Solvable Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Solvable Groups</h3>

          <Definition title="Solvable Group">
            <p>
              A group <Math>G</Math> is <strong>solvable</strong> if it has a subnormal series:
            </p>
            <MathBlock>{'\\{e\\} = G_0 \\triangleleft G_1 \\triangleleft \\cdots \\triangleleft G_n = G'}</MathBlock>
            <p className="mt-2">where each quotient <Math>{'G_{i+1}/G_i'}</Math> is abelian.</p>
          </Definition>

          <Example title="Solvable Groups">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">All abelian groups</p>
                <p className="text-dark-300">Series: <Math>{'\\{e\\} \\triangleleft G'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'S_3'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'\\{e\\} \\triangleleft A_3 \\triangleleft S_3'}</Math>
                </p>
                <p className="text-dark-400 text-sm">
                  <Math>{'A_3 \\cong \\mathbb{Z}_3'}</Math> and <Math>{'S_3/A_3 \\cong \\mathbb{Z}_2'}</Math>
                </p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'S_4'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'\\{e\\} \\triangleleft V_4 \\triangleleft A_4 \\triangleleft S_4'}</Math>
                </p>
                <p className="text-dark-400 text-sm">
                  where <Math>{'V_4 \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math>
                </p>
              </div>
            </div>
          </Example>

          <Theorem title="S₅ is Not Solvable">
            <p>
              <Math>{'S_5'}</Math> is not solvable. More generally, <Math>{'S_n'}</Math> is not solvable for <Math>{'n \\geq 5'}</Math>.
            </p>
          </Theorem>

          <div className="card mt-4">
            <h4 className="font-semibold mb-3">Why S₅ is Not Solvable</h4>
            <ul className="space-y-2 text-dark-300">
              <li><Math>{'A_5'}</Math> is the only proper normal subgroup of <Math>{'S_5'}</Math></li>
              <li><Math>{'A_5'}</Math> is simple (no proper normal subgroups)</li>
              <li><Math>{'A_5'}</Math> is not abelian (order 60)</li>
              <li>Therefore no abelian series exists</li>
            </ul>
          </div>
        </section>

        {/* Solvability by Radicals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Solvability by Radicals</h3>

          <Definition title="Radical Extension">
            <p>
              An extension <Math>{'E/F'}</Math> is a <strong>radical extension</strong> if there exists a tower:
            </p>
            <MathBlock>{'F = K_0 \\subseteq K_1 \\subseteq \\cdots \\subseteq K_n = E'}</MathBlock>
            <p className="mt-2">
              where each <Math>{'K_{i+1} = K_i(\\sqrt[n_i]{a_i})'}</Math> for some <Math>{'a_i \\in K_i'}</Math>.
            </p>
          </Definition>

          <Definition title="Solvable by Radicals">
            <p>
              A polynomial <Math>{'f(x) \\in F[x]'}</Math> is <strong>solvable by radicals</strong> if its
              splitting field is contained in some radical extension of <Math>F</Math>.
            </p>
          </Definition>

          <Theorem title="Galois's Theorem">
            <p>
              A polynomial <Math>{'f(x) \\in F[x]'}</Math> (char <Math>F</Math> = 0) is solvable by radicals
              iff its Galois group <Math>{'\\text{Gal}(f)'}</Math> is a solvable group.
            </p>
          </Theorem>
        </section>

        {/* Main Result */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Insolvability Theorem</h3>

          <Theorem title="Insolvability of the General Quintic">
            <p>
              The general polynomial of degree <Math>{'n \\geq 5'}</Math> is not solvable by radicals.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Proof Outline</h4>
            <ol className="list-decimal list-inside space-y-2 text-dark-300">
              <li>Consider a "generic" quintic with Galois group <Math>{'S_5'}</Math></li>
              <li><Math>{'S_5'}</Math> is not solvable (as shown above)</li>
              <li>By Galois's theorem, the polynomial is not solvable by radicals</li>
            </ol>
          </div>

          <Example title="A Specific Insolvable Quintic">
            <div className="bg-dark-900 p-4 rounded">
              <p className="font-semibold">
                <Math>{'f(x) = x^5 - 4x + 2'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              </p>
              <p className="text-dark-300 mt-2">
                This polynomial has Galois group <Math>{'S_5'}</Math>, verified by:
              </p>
              <ul className="list-disc list-inside text-dark-400 text-sm mt-2 space-y-1">
                <li>It is irreducible (Eisenstein at <Math>{'p = 2'}</Math>)</li>
                <li>It has exactly 3 real roots and 2 complex conjugate roots</li>
                <li>This implies the Galois group contains a 5-cycle and a transposition</li>
                <li>Such elements generate <Math>{'S_5'}</Math></li>
              </ul>
              <p className="text-primary-400 mt-3">
                Therefore <Math>{'x^5 - 4x + 2 = 0'}</Math> cannot be solved by radicals!
              </p>
            </div>
          </Example>
        </section>

        {/* What CAN Be Done */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Beyond Radicals</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Some Quintics ARE Solvable</h4>
              <p className="text-dark-300 text-sm">
                <Math>{'x^5 - 1 = 0'}</Math> is solvable (cyclotomic).
                Any quintic with solvable Galois group works.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Numerical Methods</h4>
              <p className="text-dark-300 text-sm">
                Newton's method, companion matrices, and other numerical techniques
                can approximate roots to arbitrary precision.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Elliptic Functions</h4>
              <p className="text-dark-300 text-sm">
                Hermite (1858) showed quintics can be solved using elliptic modular functions.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Bring Radical</h4>
              <p className="text-dark-300 text-sm">
                Any quintic can be reduced to <Math>{'x^5 + x + a = 0'}</Math> (Bring-Jerrard form).
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Solvable group:</strong> has series with abelian quotients.
            </li>
            <li>
              <Math>{'S_n'}</Math> is solvable for <Math>{'n \\leq 4'}</Math>, but not for <Math>{'n \\geq 5'}</Math>.
            </li>
            <li>
              <strong>Galois's Theorem:</strong> solvable by radicals ↔ solvable Galois group.
            </li>
            <li>
              <strong>No general formula</strong> for quintics or higher using +, −, ×, ÷, and roots.
            </li>
            <li>
              This resolved a 300+ year old question and founded modern algebra.
            </li>
          </ul>
        </section>

        {/* Conclusion */}
        <section className="card border-primary-500 border-2">
          <h3 className="text-xl font-semibold mb-4 text-primary-400">Congratulations!</h3>
          <p className="text-dark-300">
            You've completed the journey through abstract algebra—from the basic concepts of
            groups and rings to the profound theorem of Galois. You now understand why the
            quintic cannot be solved by radicals, one of the most beautiful results in all of mathematics.
          </p>
          <p className="text-dark-300 mt-3">
            This connection between the structure of groups and the solvability of equations
            exemplifies the power of abstract algebra: seemingly unrelated problems become
            clear when viewed through the right algebraic lens.
          </p>
        </section>
      </div>
    </LessonLayout>
  );
}
