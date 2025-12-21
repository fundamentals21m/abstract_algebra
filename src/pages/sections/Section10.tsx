import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { CosetVisualizerDemo } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section10() {
  return (
    <LessonLayout sectionId={10}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Cosets</strong> partition a group into equal-sized pieces determined by a subgroup.
            This leads to <strong>Lagrange's theorem</strong>, one of the most fundamental results in
            finite group theory, which tells us that the order of a subgroup must divide the order of the group.
          </p>
        </section>

        {/* Why Cosets Matter */}
        <section className="card border-l-4 border-primary-500">
          <h3 className="text-xl font-semibold mb-4">Why Cosets Matter: Division Without Dividing</h3>
          <div className="space-y-4 text-dark-300">
            <p>
              Groups have an operation, but they don't have "division" in the usual sense. Yet we often want
              to understand a group by breaking it into smaller, manageable pieces. <strong>Cosets</strong> give us
              exactly this—a way to partition any group using a subgroup as a template.
            </p>

            <div className="bg-dark-900 p-4 rounded-lg my-4">
              <p className="font-semibold text-dark-100 mb-2">A Familiar Example: Modular Arithmetic</p>
              <p>
                You already know cosets! When we write <Math>{'a \\equiv b \\pmod{n}'}</Math>, we're saying
                that <Math>a</Math> and <Math>b</Math> are in the same coset of <Math>{'n\\mathbb{Z}'}</Math> in{' '}
                <Math>{'\\mathbb{Z}'}</Math>. The integers split into <Math>n</Math> cosets:{' '}
                <Math>{'\\{...,-n,0,n,2n,...\\}'}</Math>, <Math>{'\\{...,-n+1,1,n+1,...\\}'}</Math>, etc.
              </p>
            </div>

            <p className="font-semibold text-dark-100">Cosets unlock powerful tools:</p>

            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-dark-800 p-4 rounded-lg">
                <p className="font-semibold text-primary-400 mb-2">Lagrange's Theorem</p>
                <p className="text-sm">
                  Since cosets partition a group into equal pieces, the subgroup order must divide the group order.
                  This instantly tells us: a group of order 15 cannot have a subgroup of order 4.
                </p>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <p className="font-semibold text-primary-400 mb-2">Element Orders</p>
                <p className="text-sm">
                  Every element's order divides <Math>|G|</Math>. So in a group of order 12, element orders
                  can only be 1, 2, 3, 4, 6, or 12—never 5, 7, 8, etc.
                </p>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <p className="font-semibold text-primary-400 mb-2">Quotient Groups</p>
                <p className="text-sm">
                  When left and right cosets coincide (normal subgroups), we can treat cosets themselves
                  as elements of a new, smaller group—the quotient group <Math>G/H</Math>.
                </p>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg">
                <p className="font-semibold text-primary-400 mb-2">Counting Arguments</p>
                <p className="text-sm">
                  Cosets give precise counting: the number of elements of order <Math>d</Math>,
                  the size of conjugacy classes, the structure of group actions.
                </p>
              </div>
            </div>

            <p className="mt-4 text-dark-400 italic">
              The simple idea of "translating" a subgroup through a group leads to some of the deepest
              results in algebra. Lagrange's theorem alone constrains every finite group's structure.
            </p>
          </div>
        </section>

        {/* Definition of Cosets */}
        <Definition title="Left and Right Cosets">
          <p>
            Let <Math>H</Math> be a subgroup of <Math>G</Math> and let{' '}
            <Math>{'a \\in G'}</Math>.
          </p>
          <p className="mt-2">
            The <strong>left coset</strong> of <Math>H</Math> containing <Math>a</Math> is:
          </p>
          <MathBlock>{'aH = \\{ah : h \\in H\\}'}</MathBlock>
          <p className="mt-2">
            The <strong>right coset</strong> of <Math>H</Math> containing <Math>a</Math> is:
          </p>
          <MathBlock>{'Ha = \\{ha : h \\in H\\}'}</MathBlock>
        </Definition>

        <div className="callout-info">
          <p>
            <strong>Notation:</strong> For additive groups, we write <Math>{'a + H = \\{a + h : h \\in H\\}'}</Math>.
          </p>
        </div>

        {/* Interactive Coset Visualizer */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Interactive: Coset Partition</h3>
          <p className="text-dark-300 mb-4">
            Select different subgroups to see how they partition the group into cosets.
            Each color represents a different coset. Notice that cosets are disjoint and have equal size.
          </p>
          <CosetVisualizerDemo />
        </section>

        {/* Coset Properties */}
        <Theorem title="Properties of Cosets">
          <p>Let <Math>{'H \\leq G'}</Math> and <Math>{'a, b \\in G'}</Math>. Then:</p>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            <li><Math>{'a \\in aH'}</Math></li>
            <li><Math>aH = H</Math> if and only if <Math>{'a \\in H'}</Math></li>
            <li><Math>aH = bH</Math> if and only if <Math>{'a^{-1}b \\in H'}</Math></li>
            <li>Either <Math>aH = bH</Math> or <Math>{'aH \\cap bH = \\emptyset'}</Math></li>
            <li><Math>|aH| = |H|</Math></li>
          </ol>
        </Theorem>

        <div className="card">
          <h4 className="font-semibold mb-3">Why Cosets Partition G</h4>
          <p className="text-dark-300 mb-3">
            Properties 4 and 5 together show that the left cosets of <Math>H</Math> form a{' '}
            <strong>partition</strong> of <Math>G</Math>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-dark-300">
            <li>Every element belongs to exactly one coset</li>
            <li>All cosets have the same size as <Math>H</Math></li>
            <li>Cosets are either identical or completely disjoint</li>
          </ul>
        </div>

        {/* Lagrange's Theorem */}
        <Theorem title="Lagrange's Theorem">
          <p>
            If <Math>G</Math> is a finite group and <Math>H</Math> is a subgroup of{' '}
            <Math>G</Math>, then <Math>|H|</Math> divides <Math>|G|</Math>.
          </p>
          <p className="mt-2">Moreover:</p>
          <MathBlock>{'|G| = [G:H] \\cdot |H|'}</MathBlock>
          <p className="mt-2">
            where <Math>{'[G:H]'}</Math> is the number of distinct cosets (the <strong>index</strong>{' '}
            of <Math>H</Math> in <Math>G</Math>).
          </p>
        </Theorem>

        <div className="callout-warning">
          <p>
            <strong>Converse is FALSE:</strong> If <Math>d</Math> divides <Math>|G|</Math>,
            there need not exist a subgroup of order <Math>d</Math>.
          </p>
          <p className="mt-2">
            For example, <Math>A_4</Math> has order 12, but no subgroup of order 6.
          </p>
        </div>

        {/* Example */}
        <Example title="Cosets in Z₁₂">
          <p className="mb-3">
            Let <Math>{'H = \\{0, 3, 6, 9\\} = \\langle 3 \\rangle'}</Math> be a subgroup of{' '}
            <Math>{'\\mathbb{Z}_{12}'}</Math>.
          </p>
          <p className="mb-3">The left cosets of <Math>H</Math> are:</p>
          <div className="space-y-2 font-mono text-sm">
            <p><Math>{'0 + H = \\{0, 3, 6, 9\\}'}</Math> (= H itself)</p>
            <p><Math>{'1 + H = \\{1, 4, 7, 10\\}'}</Math></p>
            <p><Math>{'2 + H = \\{2, 5, 8, 11\\}'}</Math></p>
          </div>
          <p className="mt-3 text-dark-400">
            We have 3 cosets, each of size 4, and <Math>{'12 = 3 \\times 4'}</Math>.
          </p>
        </Example>

        {/* Corollaries */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Corollaries of Lagrange's Theorem</h3>

          <Theorem title="Order of Elements Divides Group Order">
            <p>
              If <Math>G</Math> is a finite group and <Math>{'a \\in G'}</Math>, then the
              order of <Math>a</Math> divides <Math>|G|</Math>.
            </p>
          </Theorem>

          <Theorem title="Groups of Prime Order are Cyclic">
            <p>
              If <Math>|G| = p</Math> is prime, then <Math>G</Math> is cyclic,
              and every non-identity element is a generator.
            </p>
          </Theorem>

          <Theorem title="Fermat's Little Theorem">
            <p>
              If <Math>p</Math> is prime and <Math>a</Math> is not divisible by{' '}
              <Math>p</Math>, then:
            </p>
            <MathBlock>{'a^{p-1} \\equiv 1 \\pmod{p}'}</MathBlock>
          </Theorem>
        </section>

        {/* Left vs Right Cosets */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Left vs Right Cosets</h3>
          <p className="text-dark-300 mb-3">
            In general, left cosets and right cosets are different partitions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-dark-300">
            <li>
              <Math>{'aH \\neq Ha'}</Math> in general (unless <Math>G</Math> is abelian)
            </li>
            <li>
              However, the number of left cosets equals the number of right cosets
            </li>
            <li>
              If <Math>aH = Ha</Math> for all <Math>{'a \\in G'}</Math>,
              then <Math>H</Math> is called a <strong>normal subgroup</strong>
            </li>
          </ul>
        </section>

        {/* Normal Subgroups */}
        <Definition title="Normal Subgroup">
          <p>
            A subgroup <Math>N</Math> of <Math>G</Math> is <strong>normal</strong>,
            written <Math>{'N \\trianglelefteq G'}</Math>, if for all <Math>{'a \\in G'}</Math>:
          </p>
          <MathBlock>aN = Na</MathBlock>
          <p className="mt-2">
            Equivalently, <Math>{'aNa^{-1} = N'}</Math> for all <Math>{'a \\in G'}</Math>.
          </p>
        </Definition>

        <div className="callout-info">
          <p>
            <strong>Abelian groups:</strong> In an abelian group, every subgroup is normal because{' '}
            <Math>aH = Ha</Math> always holds when the operation is commutative.
          </p>
        </div>

        {/* Index */}
        <Definition title="Index">
          <p>
            The <strong>index</strong> of <Math>H</Math> in <Math>G</Math>, denoted{' '}
            <Math>{'[G:H]'}</Math>, is the number of distinct left (or right) cosets of{' '}
            <Math>H</Math> in <Math>G</Math>.
          </p>
        </Definition>

        <Example title="Computing Index">
          <div className="space-y-3">
            <p>In <Math>{'\\mathbb{Z}_{12}'}</Math>:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <Math>{'[\\mathbb{Z}_{12} : \\{0\\}] = 12'}</Math> (12 cosets of size 1)
              </li>
              <li>
                <Math>{'[\\mathbb{Z}_{12} : \\langle 6 \\rangle] = 6'}</Math> (6 cosets of size 2)
              </li>
              <li>
                <Math>{'[\\mathbb{Z}_{12} : \\langle 4 \\rangle] = 4'}</Math> (4 cosets of size 3)
              </li>
              <li>
                <Math>{'[\\mathbb{Z}_{12} : \\langle 3 \\rangle] = 3'}</Math> (3 cosets of size 4)
              </li>
              <li>
                <Math>{'[\\mathbb{Z}_{12} : \\langle 2 \\rangle] = 2'}</Math> (2 cosets of size 6)
              </li>
            </ul>
          </div>
        </Example>

        {/* Coset Representatives */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Coset Representatives</h3>
          <p className="text-dark-300 mb-3">
            A <strong>complete set of coset representatives</strong> is a set containing exactly one
            element from each coset.
          </p>
          <Example title="Representatives in Z₁₂ / ⟨3⟩">
            <p className="mb-2">
              The cosets of <Math>{'\\langle 3 \\rangle'}</Math> in <Math>{'\\mathbb{Z}_{12}'}</Math>{' '}
              are <Math>{'{0,3,6,9}'}</Math>, <Math>{'{1,4,7,10}'}</Math>,
              and <Math>{'{2,5,8,11}'}</Math>.
            </p>
            <p>
              A set of coset representatives is <Math>{'{0, 1, 2}'}</Math>.
            </p>
          </Example>
        </section>

        {/* Tower Law */}
        <Theorem title="Tower Law">
          <p>
            If <Math>{'K \\leq H \\leq G'}</Math> are finite groups, then:
          </p>
          <MathBlock>{'[G:K] = [G:H] \\cdot [H:K]'}</MathBlock>
        </Theorem>

        {/* Applications */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Applications of Lagrange's Theorem</h3>
          <div className="space-y-4 text-dark-300">
            <div>
              <h4 className="font-semibold text-dark-200">Counting Arguments</h4>
              <p>
                Restrict which subgroups can exist. For example, a group of order 6 can only have
                subgroups of orders 1, 2, 3, or 6.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-dark-200">Prime Order Groups</h4>
              <p>
                Groups of prime order have no proper non-trivial subgroups and are therefore simple.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-dark-200">Number Theory</h4>
              <p>
                Fermat's Little Theorem and Euler's Theorem follow directly from Lagrange's theorem
                applied to <Math>{'\\mathbb{Z}_p^*'}</Math> and <Math>{'\\mathbb{Z}_n^*'}</Math>.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Cosets partition a group into equal-sized pieces.
            </li>
            <li>
              <strong>Lagrange's Theorem:</strong> <Math>|H|</Math> divides{' '}
              <Math>|G|</Math> for any subgroup <Math>H</Math>.
            </li>
            <li>
              The index <Math>{'[G:H] = |G|/|H|'}</Math> counts the number of cosets.
            </li>
            <li>
              A subgroup is normal if its left and right cosets coincide.
            </li>
            <li>
              Element orders divide group order.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
