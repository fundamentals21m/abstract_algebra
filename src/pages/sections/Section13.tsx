import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section13() {
  return (
    <LessonLayout sectionId={13}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            This section focuses on <strong>computing factor groups</strong> in practice. We'll develop
            techniques for identifying factor groups and work through important examples that appear
            frequently in algebra.
          </p>
        </section>

        {/* Identifying Factor Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Strategies for Identifying Factor Groups</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">General Approach</h4>
            <ol className="list-decimal list-inside space-y-2 text-dark-300">
              <li>Count elements: <Math>{'|G/N| = |G|/|N|'}</Math></li>
              <li>Check if abelian (inherited from <Math>G</Math> or forced by size)</li>
              <li>Look for known groups of that order</li>
              <li>Use the First Isomorphism Theorem when possible</li>
            </ol>
          </div>
        </section>

        {/* Computing Examples */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Detailed Computations</h3>

          <Example title="Z₁₂ / ⟨4⟩">
            <p className="mb-3">
              In <Math>{'\\mathbb{Z}_{12}'}</Math>, let <Math>{'N = \\langle 4 \\rangle = \\{0, 4, 8\\}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|N| = 3'}</Math>, so <Math>{'|\\mathbb{Z}_{12}/N| = 12/3 = 4'}</Math></p>
              <p className="mt-2">Cosets:</p>
              <ul className="list-disc list-inside ml-4 text-dark-400">
                <li><Math>{'0 + N = \\{0, 4, 8\\}'}</Math></li>
                <li><Math>{'1 + N = \\{1, 5, 9\\}'}</Math></li>
                <li><Math>{'2 + N = \\{2, 6, 10\\}'}</Math></li>
                <li><Math>{'3 + N = \\{3, 7, 11\\}'}</Math></li>
              </ul>
              <p className="mt-2">
                Since <Math>{'\\mathbb{Z}_{12}'}</Math> is cyclic, so is <Math>{'\\mathbb{Z}_{12}/N'}</Math>.
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{Z}_{12}/\\langle 4 \\rangle \\cong \\mathbb{Z}_4'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Z × Z / ⟨(1,1)⟩">
            <p className="mb-3">
              Consider <Math>{'N = \\{(n,n) : n \\in \\mathbb{Z}\\}'}</Math> in <Math>{'\\mathbb{Z} \\times \\mathbb{Z}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Coset representatives: <Math>{'(a, 0) + N'}</Math> for <Math>{'a \\in \\mathbb{Z}'}</Math></p>
              <p className="mt-2">
                Any <Math>{'(a, b)'}</Math> is in coset <Math>{'(a-b, 0) + N'}</Math> since <Math>{'(a,b) - (a-b, 0) = (b, b) \\in N'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'(\\mathbb{Z} \\times \\mathbb{Z})/\\langle (1,1) \\rangle \\cong \\mathbb{Z}'}</Math>
              </p>
            </div>
          </Example>

          <Example title="(Z × Z × Z) / ⟨(1,1,1)⟩">
            <p className="mb-3">
              Similarly in <Math>{'\\mathbb{Z}^3'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>
                Representatives: <Math>{'(a, b, 0)'}</Math> for <Math>{'a, b \\in \\mathbb{Z}'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{Z}^3/\\langle (1,1,1) \\rangle \\cong \\mathbb{Z} \\times \\mathbb{Z}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Using Homomorphisms */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Using Homomorphisms</h3>

          <div className="callout-info">
            <p>
              <strong>Key technique:</strong> To identify <Math>{'G/N'}</Math>, find a surjective
              homomorphism <Math>{'\\phi: G \\to H'}</Math> with <Math>{'\\ker(\\phi) = N'}</Math>.
              Then <Math>{'G/N \\cong H'}</Math> by the First Isomorphism Theorem.
            </p>
          </div>

          <Example title="GL₂(R) / SL₂(R)">
            <p className="mb-3">
              Consider the determinant map <Math>{'\\det: GL_2(\\mathbb{R}) \\to \\mathbb{R}^*'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\ker(\\det) = SL_2(\\mathbb{R})'}</Math> (matrices with determinant 1)</p>
              <p><Math>{'\\det'}</Math> is surjective (any nonzero real is a determinant)</p>
              <p className="text-primary-400 mt-2">
                <Math>{'GL_2(\\mathbb{R})/SL_2(\\mathbb{R}) \\cong \\mathbb{R}^*'}</Math>
              </p>
            </div>
          </Example>

          <Example title="R / Z">
            <p className="mb-3">
              Define <Math>{'\\phi: \\mathbb{R} \\to \\mathbb{T}'}</Math> (circle group) by
              <Math>{'\\phi(x) = e^{2\\pi ix}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\ker(\\phi) = \\mathbb{Z}'}</Math></p>
              <p><Math>{'\\phi'}</Math> is surjective onto the unit circle</p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{R}/\\mathbb{Z} \\cong \\mathbb{T}'}</Math> (the circle group)
              </p>
            </div>
          </Example>
        </section>

        {/* Factor Groups of Direct Products */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factor Groups of Direct Products</h3>

          <Theorem title="Quotient of Direct Products">
            <p>
              If <Math>{'N_1 \\trianglelefteq G_1'}</Math> and <Math>{'N_2 \\trianglelefteq G_2'}</Math>, then:
            </p>
            <MathBlock>{'(G_1 \\times G_2)/(N_1 \\times N_2) \\cong (G_1/N_1) \\times (G_2/N_2)'}</MathBlock>
          </Theorem>

          <Example title="(Z₄ × Z₆) / (⟨2⟩ × ⟨3⟩)">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\langle 2 \\rangle = \\{0, 2\\}'}</Math> in <Math>{'\\mathbb{Z}_4'}</Math></p>
              <p><Math>{'\\langle 3 \\rangle = \\{0, 3\\}'}</Math> in <Math>{'\\mathbb{Z}_6'}</Math></p>
              <p className="mt-2">
                <Math>{'\\mathbb{Z}_4/\\langle 2 \\rangle \\cong \\mathbb{Z}_2'}</Math>
              </p>
              <p>
                <Math>{'\\mathbb{Z}_6/\\langle 3 \\rangle \\cong \\mathbb{Z}_3'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'(\\mathbb{Z}_4 \\times \\mathbb{Z}_6)/(\\langle 2 \\rangle \\times \\langle 3 \\rangle) \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_3 \\cong \\mathbb{Z}_6'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Index 2 Subgroups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Index 2 Subgroups</h3>

          <Theorem title="Index 2 Subgroups are Normal">
            <p>
              If <Math>{'[G:N] = 2'}</Math>, then <Math>{'N \\trianglelefteq G'}</Math> and <Math>{'G/N \\cong \\mathbb{Z}_2'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Why Index 2 Works</h4>
            <p className="text-dark-300">
              With only two cosets (<Math>N</Math> and <Math>gN</Math> for some <Math>{'g \\notin N'}</Math>):
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-dark-400">
              <li>Left coset <Math>gN</Math> = elements not in <Math>N</Math> = right coset <Math>Ng</Math></li>
              <li>So <Math>{'gN = Ng'}</Math> automatically</li>
              <li>The two cosets form <Math>{'\\mathbb{Z}_2'}</Math></li>
            </ul>
          </div>

          <Example title="Common Index 2 Subgroups">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'A_n'}</Math> in <Math>{'S_n'}</Math>: <Math>{'S_n/A_n \\cong \\mathbb{Z}_2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'SO(n)'}</Math> in <Math>{'O(n)'}</Math>: <Math>{'O(n)/SO(n) \\cong \\mathbb{Z}_2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'2\\mathbb{Z}'}</Math> in <Math>{'\\mathbb{Z}'}</Math>: <Math>{'\\mathbb{Z}/2\\mathbb{Z} \\cong \\mathbb{Z}_2'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Commutator Subgroup */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Commutator Subgroup</h3>

          <Definition title="Commutator">
            <p>
              The <strong>commutator</strong> of <Math>a</Math> and <Math>b</Math> is:
            </p>
            <MathBlock>{'[a, b] = aba^{-1}b^{-1}'}</MathBlock>
            <p className="mt-2">
              Note: <Math>{'[a,b] = e'}</Math> if and only if <Math>{'ab = ba'}</Math>.
            </p>
          </Definition>

          <Definition title="Commutator Subgroup">
            <p>
              The <strong>commutator subgroup</strong> (or derived subgroup) <Math>{'G\''}</Math> is
              generated by all commutators:
            </p>
            <MathBlock>{'G\' = \\langle [a,b] : a, b \\in G \\rangle'}</MathBlock>
          </Definition>

          <Theorem title="Properties of G'">
            <p>
              For any group <Math>G</Math>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'G\' \\trianglelefteq G'}</Math></li>
              <li><Math>{'G/G\''}</Math> is abelian</li>
              <li><Math>{'G/G\''}</Math> is the largest abelian quotient of <Math>G</Math></li>
              <li><Math>{'G\' = \\{e\\}'}</Math> if and only if <Math>G</Math> is abelian</li>
            </ul>
          </Theorem>

          <Example title="S₃' = A₃">
            <p className="mb-3">
              In <Math>S_3</Math>, all commutators are 3-cycles:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'[(12), (13)] = (12)(13)(12)(13) = (123)'}</Math></p>
              <p className="mt-2"><Math>{'S_3\' = A_3 = \\{e, (123), (132)\\}'}</Math></p>
              <p className="text-primary-400 mt-2">
                <Math>{'S_3/S_3\' = S_3/A_3 \\cong \\mathbb{Z}_2'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              To identify <Math>{'G/N'}</Math>: count elements, check structure, use known groups.
            </li>
            <li>
              The First Isomorphism Theorem is the main tool: find <Math>{'\\phi'}</Math> with <Math>{'\\ker(\\phi) = N'}</Math>.
            </li>
            <li>
              <Math>{'(G_1 \\times G_2)/(N_1 \\times N_2) \\cong (G_1/N_1) \\times (G_2/N_2)'}</Math>.
            </li>
            <li>
              Index 2 subgroups are always normal with quotient <Math>{'\\mathbb{Z}_2'}</Math>.
            </li>
            <li>
              <Math>{'G/G\''}</Math> is the abelianization of <Math>G</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
