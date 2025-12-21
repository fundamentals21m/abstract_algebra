import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { NormalSubgroupQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section12() {
  return (
    <LessonLayout sectionId={12}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Factor groups</strong> (or quotient groups) arise from partitioning a group by a
            normal subgroup. This construction is fundamental to group theory, allowing us to "collapse"
            a group while preserving its essential structure.
          </p>
        </section>

        {/* Normal Subgroups Review */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Normal Subgroups</h3>

          <Definition title="Normal Subgroup">
            <p>
              A subgroup <Math>N</Math> of <Math>G</Math> is <strong>normal</strong> (written <Math>{'N \\trianglelefteq G'}</Math>)
              if for all <Math>{'g \\in G'}</Math>:
            </p>
            <MathBlock>{'gN = Ng'}</MathBlock>
            <p className="mt-2">
              Equivalently, <Math>{'gNg^{-1} = N'}</Math> for all <Math>{'g \\in G'}</Math>.
            </p>
          </Definition>

          <Example title="Normal Subgroup Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Every subgroup of an abelian group</p>
                <p className="text-dark-300">Normal, since <Math>{'gN = Ng'}</Math> automatically</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'A_n \\trianglelefteq S_n'}</Math></p>
                <p className="text-dark-300">Alternating group is normal in symmetric group</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\langle r \\rangle \\trianglelefteq D_n'}</Math></p>
                <p className="text-dark-300">Rotations are normal in dihedral group</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Kernel of any homomorphism</p>
                <p className="text-dark-300"><Math>{'\\ker(\\phi) \\trianglelefteq G'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Factor Group Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factor Groups</h3>

          <Definition title="Factor Group (Quotient Group)">
            <p>
              If <Math>{'N \\trianglelefteq G'}</Math>, the <strong>factor group</strong> <Math>{'G/N'}</Math>
              has:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Elements: cosets <Math>{'\\{gN : g \\in G\\}'}</Math></li>
              <li>Operation: <Math>{'(aN)(bN) = (ab)N'}</Math></li>
              <li>Identity: <Math>{'eN = N'}</Math></li>
              <li>Inverse of <Math>gN</Math>: <Math>{'g^{-1}N'}</Math></li>
            </ul>
          </Definition>

          <div className="callout-info">
            <p>
              <strong>Why normality matters:</strong> For the operation <Math>{'(aN)(bN) = (ab)N'}</Math>
              to be well-defined, we need <Math>N</Math> to be normal. Otherwise, different
              representatives could give different products!
            </p>
          </div>

          <Theorem title="Well-Definedness">
            <p>
              If <Math>{'N \\trianglelefteq G'}</Math>, then coset multiplication is well-defined:
              if <Math>{'aN = a\'N'}</Math> and <Math>{'bN = b\'N'}</Math>, then <Math>{'(ab)N = (a\'b\')N'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Examples */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factor Group Examples</h3>

          <Example title="Z/nZ = Zₙ">
            <p className="mb-3">
              <Math>{'\\mathbb{Z}/n\\mathbb{Z}'}</Math> is the integers modulo <Math>n</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>Normal subgroup: <Math>{'n\\mathbb{Z} = \\{..., -2n, -n, 0, n, 2n, ...\\}'}</Math></p>
              <p className="mt-2">Cosets: <Math>{'0 + n\\mathbb{Z}, 1 + n\\mathbb{Z}, ..., (n-1) + n\\mathbb{Z}'}</Math></p>
              <p className="mt-2">This is exactly <Math>{'\\mathbb{Z}_n'}</Math>!</p>
            </div>
          </Example>

          <Example title="D₃ / ⟨r⟩">
            <p className="mb-3">
              In <Math>D_3</Math>, let <Math>{'N = \\langle r \\rangle = \\{e, r, r^2\\}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Cosets: <Math>N</Math> and <Math>sN</Math></p>
              <p><Math>{'N \\cdot N = N'}</Math></p>
              <p><Math>{'N \\cdot sN = sN'}</Math></p>
              <p><Math>{'sN \\cdot N = sN'}</Math></p>
              <p><Math>{'sN \\cdot sN = s^2N = N'}</Math></p>
              <p className="mt-2 text-primary-400">
                So <Math>{'D_3/\\langle r \\rangle \\cong \\mathbb{Z}_2'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Sₙ / Aₙ">
            <p className="mb-3">
              The alternating group <Math>A_n</Math> has index 2 in <Math>S_n</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>Two cosets: <Math>A_n</Math> (even permutations) and <Math>{'\\tau A_n'}</Math> (odd permutations)</p>
              <p className="mt-2 text-primary-400">
                <Math>{'S_n/A_n \\cong \\mathbb{Z}_2'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Properties */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Properties of Factor Groups</h3>

          <Theorem title="Order of Factor Group">
            <p>
              If <Math>G</Math> is finite and <Math>{'N \\trianglelefteq G'}</Math>:
            </p>
            <MathBlock>{'|G/N| = |G|/|N| = [G:N]'}</MathBlock>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Factor Group Properties</h4>
            <ul className="space-y-2 text-dark-300">
              <li>
                If <Math>G</Math> is abelian, so is <Math>{'G/N'}</Math>
              </li>
              <li>
                If <Math>G</Math> is cyclic, so is <Math>{'G/N'}</Math>
              </li>
              <li>
                <Math>{'G/G = \\{e\\}'}</Math> (trivial group)
              </li>
              <li>
                <Math>{'G/\\{e\\} \\cong G'}</Math>
              </li>
            </ul>
          </div>
        </section>

        {/* Canonical Homomorphism */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Canonical Homomorphism</h3>

          <Definition title="Canonical Projection">
            <p>
              For <Math>{'N \\trianglelefteq G'}</Math>, the <strong>canonical projection</strong> is:
            </p>
            <MathBlock>{'\\pi: G \\to G/N, \\quad \\pi(g) = gN'}</MathBlock>
          </Definition>

          <Theorem title="Properties of Canonical Projection">
            <p>
              The canonical projection <Math>{'\\pi'}</Math> satisfies:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'\\pi'}</Math> is a surjective homomorphism</li>
              <li><Math>{'\\ker(\\pi) = N'}</Math></li>
              <li>Every element of <Math>{'G/N'}</Math> has exactly <Math>{'|N|'}</Math> preimages</li>
            </ul>
          </Theorem>
        </section>

        {/* First Isomorphism Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">First Isomorphism Theorem</h3>

          <Theorem title="First Isomorphism Theorem">
            <p>
              If <Math>{'\\phi: G \\to H'}</Math> is a group homomorphism, then:
            </p>
            <MathBlock>{'G/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</MathBlock>
            <p className="mt-2">
              The isomorphism is given by <Math>{'g \\ker(\\phi) \\mapsto \\phi(g)'}</Math>.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              This is one of the most important theorems in group theory. It says that every
              homomorphism factors through a quotient group.
            </p>
          </div>

          <Example title="Applying the First Isomorphism Theorem">
            <p className="mb-3">
              Let <Math>{'\\phi: \\mathbb{Z} \\to \\mathbb{Z}_n'}</Math> by <Math>{'\\phi(k) = k \\mod n'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\ker(\\phi) = n\\mathbb{Z}'}</Math></p>
              <p><Math>{'\\text{im}(\\phi) = \\mathbb{Z}_n'}</Math></p>
              <p className="text-primary-400 mt-2">
                Therefore <Math>{'\\mathbb{Z}/n\\mathbb{Z} \\cong \\mathbb{Z}_n'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Simple Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Simple Groups</h3>

          <Definition title="Simple Group">
            <p>
              A group <Math>G</Math> is <strong>simple</strong> if its only normal subgroups are
              <Math>{'\\{e\\}'}</Math> and <Math>G</Math> itself.
            </p>
          </Definition>

          <Example title="Simple Group Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}_p'}</Math> for prime <Math>p</Math></p>
                <p className="text-dark-300">Only subgroups are trivial</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'A_n'}</Math> for <Math>{'n \\geq 5'}</Math></p>
                <p className="text-dark-300">The alternating groups are simple</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'A_5'}</Math></p>
                <p className="text-dark-300">The smallest nonabelian simple group (order 60)</p>
              </div>
            </div>
          </Example>

          <div className="callout-info">
            <p>
              Simple groups are the "building blocks" of all finite groups, analogous to prime
              numbers for integers. The classification of finite simple groups is one of the
              greatest achievements of 20th century mathematics.
            </p>
          </div>
        </section>

        {/* Practice Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Practice: Normal Subgroups & Factor Groups</h3>
          <p className="text-dark-300 mb-6">
            Test your understanding of normal subgroups, quotient groups, and the isomorphism theorems.
            Each quiz generates 10 random questions.
          </p>
          <NormalSubgroupQuiz />
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Factor groups <Math>{'G/N'}</Math> require <Math>N</Math> to be normal for well-defined multiplication.
            </li>
            <li>
              Elements of <Math>{'G/N'}</Math> are cosets; the operation is <Math>{'(aN)(bN) = (ab)N'}</Math>.
            </li>
            <li>
              <Math>{'|G/N| = |G|/|N|'}</Math> when <Math>G</Math> is finite.
            </li>
            <li>
              The First Isomorphism Theorem: <Math>{'G/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</Math>.
            </li>
            <li>
              Simple groups have no proper normal subgroups.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
