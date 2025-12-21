import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { SeriesQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section18() {
  return (
    <LessonLayout sectionId={18}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Series of groups</strong> provide a way to decompose groups into simpler pieces.
            The <strong>composition series</strong> breaks a group down to simple groups, while
            <strong> normal series</strong> and <strong>subnormal series</strong> give intermediate decompositions.
          </p>
        </section>

        {/* Normal Series */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Normal and Subnormal Series</h3>

          <Definition title="Subnormal Series">
            <p>
              A <strong>subnormal series</strong> of a group <Math>G</Math> is a chain:
            </p>
            <MathBlock>{'\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq G_2 \\trianglelefteq \\cdots \\trianglelefteq G_n = G'}</MathBlock>
            <p className="mt-2">
              Each <Math>{'G_i'}</Math> is normal in <Math>{'G_{i+1}'}</Math>.
            </p>
          </Definition>

          <Definition title="Normal Series">
            <p>
              A <strong>normal series</strong> is a subnormal series where each <Math>{'G_i \\trianglelefteq G'}</Math>
              (normal in the whole group, not just the next term).
            </p>
          </Definition>

          <Definition title="Factor Groups of a Series">
            <p>
              The <strong>factor groups</strong> (or quotient groups) of a series are:
            </p>
            <MathBlock>{'G_1/G_0, \\, G_2/G_1, \\, \\ldots, \\, G_n/G_{n-1}'}</MathBlock>
          </Definition>
        </section>

        {/* Composition Series */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Composition Series</h3>

          <Definition title="Composition Series">
            <p>
              A <strong>composition series</strong> is a subnormal series where each factor
              <Math>{'G_{i+1}/G_i'}</Math> is <strong>simple</strong> (has no proper normal subgroups).
            </p>
            <p className="mt-2">
              Equivalently: no subgroup can be inserted between consecutive terms.
            </p>
          </Definition>

          <Example title="Composition Series of Z₁₂">
            <p className="mb-3">
              <Math>{'\\mathbb{Z}_{12}'}</Math> has composition series:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <MathBlock>{'\\{0\\} \\trianglelefteq \\langle 6 \\rangle \\trianglelefteq \\langle 2 \\rangle \\trianglelefteq \\mathbb{Z}_{12}'}</MathBlock>
              <p className="mt-3">Factor groups:</p>
              <ul className="list-disc list-inside text-dark-300 ml-4">
                <li><Math>{'\\langle 6 \\rangle / \\{0\\} \\cong \\mathbb{Z}_2'}</Math></li>
                <li><Math>{'\\langle 2 \\rangle / \\langle 6 \\rangle \\cong \\mathbb{Z}_3'}</Math></li>
                <li><Math>{'\\mathbb{Z}_{12} / \\langle 2 \\rangle \\cong \\mathbb{Z}_2'}</Math></li>
              </ul>
              <p className="text-dark-400 text-sm mt-2">
                Composition factors: <Math>{'\\mathbb{Z}_2, \\mathbb{Z}_3, \\mathbb{Z}_2'}</Math> (all simple!)
              </p>
            </div>
          </Example>

          <Example title="Composition Series of S₄">
            <div className="bg-dark-900 p-4 rounded">
              <MathBlock>{'\\{e\\} \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4'}</MathBlock>
              <p className="mt-3">Composition factors:</p>
              <ul className="list-disc list-inside text-dark-300 ml-4">
                <li><Math>{'V_4 / \\{e\\} \\cong V_4 \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math> — NOT simple!</li>
              </ul>
              <p className="text-dark-400 text-sm mt-2">
                Need to refine: <Math>{'\\{e\\} \\trianglelefteq \\mathbb{Z}_2 \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                Composition factors: <Math>{'\\mathbb{Z}_2, \\mathbb{Z}_2, \\mathbb{Z}_3, \\mathbb{Z}_2'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Jordan-Hölder Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Jordan-Hölder Theorem</h3>

          <Theorem title="Jordan-Hölder Theorem">
            <p>
              Any two composition series of a group have the same length and the same composition
              factors (up to permutation and isomorphism).
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Significance:</strong> The composition factors are uniquely determined by the group.
              This is analogous to the unique prime factorization of integers.
            </p>
          </div>

          <Example title="Two Composition Series of Z₆">
            <div className="bg-dark-900 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold">Series 1:</p>
                <p><Math>{'\\{0\\} \\trianglelefteq \\langle 3 \\rangle \\trianglelefteq \\mathbb{Z}_6'}</Math></p>
                <p className="text-dark-400 text-sm">Factors: <Math>{'\\mathbb{Z}_2, \\mathbb{Z}_3'}</Math></p>
              </div>
              <div>
                <p className="font-semibold">Series 2:</p>
                <p><Math>{'\\{0\\} \\trianglelefteq \\langle 2 \\rangle \\trianglelefteq \\mathbb{Z}_6'}</Math></p>
                <p className="text-dark-400 text-sm">Factors: <Math>{'\\mathbb{Z}_3, \\mathbb{Z}_2'}</Math></p>
              </div>
              <p className="text-primary-400">
                Same factors (in different order): <Math>{'\\{\\mathbb{Z}_2, \\mathbb{Z}_3\\}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Solvable Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Solvable Groups</h3>

          <Definition title="Solvable Group">
            <p>
              A group <Math>G</Math> is <strong>solvable</strong> if it has a subnormal series with
              abelian factor groups:
            </p>
            <MathBlock>{'\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq \\cdots \\trianglelefteq G_n = G'}</MathBlock>
            <p className="mt-2">
              where each <Math>{'G_{i+1}/G_i'}</Math> is abelian.
            </p>
          </Definition>

          <Example title="Solvable Groups">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">All abelian groups</p>
                <p className="text-dark-300">Series: <Math>{'\\{e\\} \\trianglelefteq G'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>S_3</Math></p>
                <p className="text-dark-300"><Math>{'\\{e\\} \\trianglelefteq A_3 \\trianglelefteq S_3'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>S_4</Math></p>
                <p className="text-dark-300"><Math>{'\\{e\\} \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-red-400"><Math>A_5</Math> is NOT solvable</p>
                <p className="text-dark-300"><Math>A_5</Math> is simple (no proper normal subgroups)</p>
              </div>
            </div>
          </Example>

          <Theorem title="Solvability Criterion">
            <p>
              A group <Math>G</Math> is solvable if and only if all its composition factors are
              cyclic of prime order.
            </p>
          </Theorem>
        </section>

        {/* Derived Series */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Derived Series</h3>

          <Definition title="Derived Series">
            <p>
              The <strong>derived series</strong> of <Math>G</Math> is:
            </p>
            <MathBlock>{'G = G^{(0)} \\supseteq G^{(1)} \\supseteq G^{(2)} \\supseteq \\cdots'}</MathBlock>
            <p className="mt-2">
              where <Math>{'G^{(i+1)} = [G^{(i)}, G^{(i)}]'}</Math> (the commutator subgroup).
            </p>
          </Definition>

          <Theorem title="Solvability via Derived Series">
            <p>
              <Math>G</Math> is solvable if and only if <Math>{'G^{(n)} = \\{e\\}'}</Math> for some <Math>n</Math>.
            </p>
          </Theorem>

          <Example title="Derived Series of S₃">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'S_3^{(0)} = S_3'}</Math></p>
              <p><Math>{'S_3^{(1)} = [S_3, S_3] = A_3'}</Math></p>
              <p><Math>{'S_3^{(2)} = [A_3, A_3] = \\{e\\}'}</Math></p>
              <p className="text-primary-400 mt-2">
                Series terminates at <Math>{'\\{e\\}'}</Math>, so <Math>S_3</Math> is solvable.
              </p>
            </div>
          </Example>
        </section>

        {/* Nilpotent Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Nilpotent Groups</h3>

          <Definition title="Central Series">
            <p>
              A <strong>central series</strong> is a normal series where each <Math>{'G_{i+1}/G_i'}</Math>
              lies in the center of <Math>{'G/G_i'}</Math>.
            </p>
          </Definition>

          <Definition title="Nilpotent Group">
            <p>
              A group is <strong>nilpotent</strong> if it has a central series terminating at <Math>G</Math>.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Hierarchy</h4>
            <p className="text-dark-300">
              Abelian ⊂ Nilpotent ⊂ Solvable ⊂ All Groups
            </p>
            <ul className="list-disc list-inside mt-2 text-dark-400 text-sm">
              <li>All abelian groups are nilpotent</li>
              <li>All nilpotent groups are solvable</li>
              <li>Not all solvable groups are nilpotent (e.g., <Math>S_3</Math>)</li>
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Composition series</strong> break groups into simple factors.
            </li>
            <li>
              <strong>Jordan-Hölder:</strong> Composition factors are unique (up to order).
            </li>
            <li>
              <strong>Solvable:</strong> Has series with abelian factors (composition factors are <Math>{'\\mathbb{Z}_p'}</Math>).
            </li>
            <li>
              <Math>S_n</Math> is solvable for <Math>{'n \\leq 4'}</Math>, not for <Math>{'n \\geq 5'}</Math>.
            </li>
            <li>
              Nilpotent ⊂ Solvable, and all p-groups are nilpotent.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <SeriesQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
