import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section17() {
  return (
    <LessonLayout sectionId={17}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            The <strong>Sylow theorems</strong> are among the most powerful results in finite group theory.
            They guarantee the existence of subgroups of prime-power order and constrain how many such
            subgroups can exist.
          </p>
        </section>

        {/* p-Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">p-Groups and Sylow Subgroups</h3>

          <Definition title="p-Group">
            <p>
              A <strong>p-group</strong> is a group whose order is a power of a prime <Math>p</Math>:
            </p>
            <MathBlock>{'|G| = p^n \\text{ for some } n \\geq 0'}</MathBlock>
          </Definition>

          <Definition title="Sylow p-Subgroup">
            <p>
              Let <Math>{'|G| = p^n m'}</Math> where <Math>{'\\gcd(p, m) = 1'}</Math>.
              A <strong>Sylow p-subgroup</strong> is a subgroup of order <Math>{'p^n'}</Math>
              (the highest power of <Math>p</Math> dividing <Math>{'|G|'}</Math>).
            </p>
          </Definition>

          <Example title="Sylow Subgroups of S₄">
            <p className="mb-3">
              <Math>{'|S_4| = 24 = 2^3 \\cdot 3'}</Math>
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><strong>Sylow 2-subgroups:</strong> Order 8 (isomorphic to <Math>D_4</Math>)</p>
              <p><strong>Sylow 3-subgroups:</strong> Order 3 (isomorphic to <Math>{'\\mathbb{Z}_3'}</Math>)</p>
            </div>
          </Example>
        </section>

        {/* The Sylow Theorems */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Sylow Theorems</h3>

          <Theorem title="First Sylow Theorem (Existence)">
            <p>
              Let <Math>G</Math> be a finite group and <Math>p</Math> a prime. If <Math>{'p^k'}</Math>
              divides <Math>{'|G|'}</Math>, then <Math>G</Math> has a subgroup of order <Math>{'p^k'}</Math>.
            </p>
            <p className="mt-2">
              In particular, Sylow p-subgroups always exist.
            </p>
          </Theorem>

          <Theorem title="Second Sylow Theorem (Conjugacy)">
            <p>
              All Sylow p-subgroups of <Math>G</Math> are conjugate to each other.
            </p>
            <p className="mt-2">
              That is, if <Math>P</Math> and <Math>Q</Math> are Sylow p-subgroups, then
              <Math>{'Q = gPg^{-1}'}</Math> for some <Math>{'g \\in G'}</Math>.
            </p>
          </Theorem>

          <Theorem title="Third Sylow Theorem (Counting)">
            <p>
              Let <Math>{'n_p'}</Math> denote the number of Sylow p-subgroups. Then:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><Math>{'n_p \\equiv 1 \\pmod{p}'}</Math></li>
              <li><Math>{'n_p'}</Math> divides <Math>{'|G|/p^n'}</Math> (where <Math>{'p^n'}</Math> is the Sylow order)</li>
            </ol>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Key consequence:</strong> If <Math>{'n_p = 1'}</Math>, the unique Sylow p-subgroup
              is normal (since conjugates are equal to itself).
            </p>
          </div>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications: Proving Groups Are Not Simple</h3>

          <Example title="Groups of Order 15">
            <p className="mb-3">
              Show that every group of order 15 is cyclic.
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|G| = 15 = 3 \\cdot 5'}</Math></p>
              <p><strong>Sylow 5-subgroups:</strong> <Math>{'n_5 | 3'}</Math> and <Math>{'n_5 \\equiv 1 \\pmod 5'}</Math></p>
              <p className="ml-4">Possibilities: <Math>{'n_5 \\in \\{1, 3\\}'}</Math>, but <Math>{'3 \\not\\equiv 1 \\pmod 5'}</Math></p>
              <p className="ml-4">So <Math>{'n_5 = 1'}</Math> → unique normal Sylow 5-subgroup <Math>P</Math></p>
              <p><strong>Sylow 3-subgroups:</strong> <Math>{'n_3 | 5'}</Math> and <Math>{'n_3 \\equiv 1 \\pmod 3'}</Math></p>
              <p className="ml-4">Possibilities: <Math>{'n_3 \\in \\{1, 5\\}'}</Math>, but <Math>{'5 \\not\\equiv 1 \\pmod 3'}</Math></p>
              <p className="ml-4">So <Math>{'n_3 = 1'}</Math> → unique normal Sylow 3-subgroup <Math>Q</Math></p>
              <p className="text-primary-400 mt-2">
                <Math>{'G = P \\times Q \\cong \\mathbb{Z}_5 \\times \\mathbb{Z}_3 \\cong \\mathbb{Z}_{15}'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Groups of Order 12">
            <p className="mb-3">
              Analyze groups of order 12.
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|G| = 12 = 2^2 \\cdot 3'}</Math></p>
              <p><strong>Sylow 3-subgroups:</strong> <Math>{'n_3 | 4'}</Math> and <Math>{'n_3 \\equiv 1 \\pmod 3'}</Math></p>
              <p className="ml-4"><Math>{'n_3 \\in \\{1, 4\\}'}</Math></p>
              <p><strong>Sylow 2-subgroups:</strong> <Math>{'n_2 | 3'}</Math> and <Math>{'n_2 \\equiv 1 \\pmod 2'}</Math></p>
              <p className="ml-4"><Math>{'n_2 \\in \\{1, 3\\}'}</Math></p>
              <p className="text-dark-400 mt-2 text-sm">
                Groups of order 12: <Math>{'\\mathbb{Z}_{12}'}</Math>, <Math>{'\\mathbb{Z}_2 \\times \\mathbb{Z}_6'}</Math>,
                <Math>A_4</Math>, <Math>D_6</Math>, <Math>{'\\mathbb{Z}_3 \\rtimes \\mathbb{Z}_4'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Groups of Order 200">
            <p className="mb-3">
              Show groups of order 200 are not simple.
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|G| = 200 = 2^3 \\cdot 5^2'}</Math></p>
              <p><strong>Sylow 5-subgroups:</strong> <Math>{'n_5 | 8'}</Math> and <Math>{'n_5 \\equiv 1 \\pmod 5'}</Math></p>
              <p className="ml-4"><Math>{'n_5 \\in \\{1\\}'}</Math> (since 2, 4, 8 are not ≡ 1 mod 5)</p>
              <p className="text-primary-400 mt-2">
                The unique Sylow 5-subgroup is normal, so <Math>G</Math> is not simple.
              </p>
            </div>
          </Example>
        </section>

        {/* Counting Arguments */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Counting Arguments</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Element Counting Strategy</h4>
            <p className="text-dark-300 mb-3">
              If Sylow subgroups intersect trivially, count elements:
            </p>
            <ul className="list-disc list-inside text-dark-400 space-y-1">
              <li>Each Sylow p-subgroup of order <Math>{'p^n'}</Math> contributes <Math>{'p^n - 1'}</Math> non-identity elements</li>
              <li>If subgroups intersect only at identity, elements are distinct</li>
              <li>Total elements must not exceed <Math>{'|G|'}</Math></li>
            </ul>
          </div>

          <Example title="Groups of Order 30">
            <p className="mb-3">
              Analyze using element counting.
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|G| = 30 = 2 \\cdot 3 \\cdot 5'}</Math></p>
              <p>Sylow counts: <Math>{'n_5 \\in \\{1, 6\\}'}</Math>, <Math>{'n_3 \\in \\{1, 10\\}'}</Math>, <Math>{'n_2 \\in \\{1, 3, 5, 15\\}'}</Math></p>
              <p className="mt-2">If <Math>{'n_5 = 6'}</Math>: contributes <Math>{'6 \\cdot 4 = 24'}</Math> elements of order 5</p>
              <p>If <Math>{'n_3 = 10'}</Math>: contributes <Math>{'10 \\cdot 2 = 20'}</Math> elements of order 3</p>
              <p className="text-primary-400 mt-2">
                Can't have both: <Math>{'24 + 20 > 29'}</Math>, so <Math>{'n_5 = 1'}</Math> or <Math>{'n_3 = 1'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* p-Group Properties */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Properties of p-Groups</h3>

          <Theorem title="Center of p-Groups">
            <p>
              If <Math>G</Math> is a p-group with <Math>{'|G| > 1'}</Math>, then <Math>{'Z(G) \\neq \\{e\\}'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Consequences for p-Groups</h4>
            <ul className="space-y-2 text-dark-300">
              <li>Every group of order <Math>{'p^2'}</Math> is abelian</li>
              <li>Every group of order <Math>p</Math> is cyclic (<Math>{'\\cong \\mathbb{Z}_p'}</Math>)</li>
              <li>p-groups are nilpotent (have a central series)</li>
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>First Sylow:</strong> Sylow p-subgroups exist.
            </li>
            <li>
              <strong>Second Sylow:</strong> All Sylow p-subgroups are conjugate.
            </li>
            <li>
              <strong>Third Sylow:</strong> <Math>{'n_p \\equiv 1 \\pmod p'}</Math> and <Math>{'n_p | [G:P]'}</Math>.
            </li>
            <li>
              <Math>{'n_p = 1'}</Math> implies the Sylow p-subgroup is normal.
            </li>
            <li>
              The Sylow theorems are essential for proving groups are not simple.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
