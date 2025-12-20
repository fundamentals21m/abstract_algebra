import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { PermutationWorkbenchDemo, CyclePermutationQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section08() {
  return (
    <LessonLayout sectionId={8}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            Every group can be viewed as a group of permutations—this is the content of{' '}
            <strong>Cayley's theorem</strong>. In this section, we study permutation groups in detail,
            including cycle notation, parity, and the structure of the symmetric group <Math>S_n</Math>.
          </p>
        </section>

        {/* Symmetric Group */}
        <Definition title="Symmetric Group S_n">
          <p>
            The <strong>symmetric group</strong> <Math>S_n</Math> is the group of all
            permutations of the set <Math>{'{1, 2, ..., n}'}</Math> under composition.
          </p>
          <p className="mt-2">
            <Math>|S_n| = n!</Math> (n factorial)
          </p>
        </Definition>

        {/* Interactive Permutation Workbench */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Interactive: Permutation Composition</h3>
          <p className="text-dark-300 mb-4">
            Experiment with composing permutations. Notice that composition is generally{' '}
            <strong>not commutative</strong>—the order in which you apply permutations matters!
          </p>
          <PermutationWorkbenchDemo />
        </section>

        {/* Cycle Notation */}
        <Definition title="Cycle Notation">
          <p>
            A <strong>cycle</strong> <Math>{'(a_1 \\, a_2 \\, \\cdots \\, a_k)'}</Math> is the permutation
            that sends <Math>{'a_1 \\to a_2 \\to \\cdots \\to a_k \\to a_1'}</Math> and fixes all other elements.
          </p>
          <p className="mt-2">
            The number <Math>k</Math> is the <strong>length</strong> of the cycle.
          </p>
        </Definition>

        <Example title="Cycle Notation Examples">
          <div className="space-y-3">
            <p>In <Math>S_4</Math>:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Math>{'(1 \\, 2 \\, 3)'}</Math>: sends 1→2→3→1, fixes 4
              </li>
              <li>
                <Math>{'(1 \\, 4)(2 \\, 3)'}</Math>: swaps 1↔4 and 2↔3
              </li>
              <li>
                <Math>{'(1 \\, 2 \\, 3 \\, 4)'}</Math>: sends 1→2→3→4→1
              </li>
              <li>
                <Math>(1)</Math> or <Math>e</Math>: the identity
              </li>
            </ul>
          </div>
        </Example>

        {/* Disjoint Cycles */}
        <Theorem title="Disjoint Cycle Decomposition">
          <p>
            Every permutation can be written as a product of <strong>disjoint cycles</strong>
            (cycles with no elements in common). This decomposition is unique up to the order of the cycles.
          </p>
        </Theorem>

        <div className="callout-info">
          <p>
            <strong>Convention:</strong> Disjoint cycles commute with each other:
          </p>
          <MathBlock>{'(1 \\, 2 \\, 3)(4 \\, 5) = (4 \\, 5)(1 \\, 2 \\, 3)'}</MathBlock>
          <p className="mt-2">
            But non-disjoint cycles do <em>not</em> commute in general!
          </p>
        </div>

        {/* Order of a Permutation */}
        <Theorem title="Order of a Permutation">
          <p>
            The order of a permutation equals the <strong>least common multiple</strong> of the lengths
            of its disjoint cycles.
          </p>
          <MathBlock>{'|\\sigma| = \\text{lcm}(\\text{cycle lengths})'}</MathBlock>
        </Theorem>

        <Example title="Computing Order">
          <div className="space-y-2">
            <p>Let <Math>{'\\sigma = (1 \\, 2 \\, 3)(4 \\, 5)'}</Math> in <Math>S_5</Math>.</p>
            <p>Cycle lengths: 3 and 2</p>
            <p><Math>{'|\\sigma| = \\text{lcm}(3, 2) = 6'}</Math></p>
          </div>
        </Example>

        {/* Transpositions */}
        <Definition title="Transposition">
          <p>
            A <strong>transposition</strong> is a 2-cycle <Math>{'(a \\, b)'}</Math> that swaps
            two elements and fixes everything else.
          </p>
        </Definition>

        <Theorem title="Generating S_n with Transpositions">
          <p>Every permutation can be written as a product of transpositions.</p>
        </Theorem>

        <Example title="Decomposing into Transpositions">
          <div className="space-y-2">
            <p>
              <Math>{'(1 \\, 2 \\, 3 \\, 4) = (1 \\, 4)(1 \\, 3)(1 \\, 2)'}</Math>
            </p>
            <p className="text-dark-400 text-sm">
              (Read right-to-left: apply <Math>{'(1 \\, 2)'}</Math> first)
            </p>
          </div>
        </Example>

        {/* Even and Odd Permutations */}
        <Definition title="Even and Odd Permutations">
          <p>
            A permutation is <strong>even</strong> if it can be written as a product of an even number
            of transpositions, and <strong>odd</strong> if it requires an odd number.
          </p>
          <p className="mt-2">
            The <strong>sign</strong> (or <strong>parity</strong>) of a permutation <Math>{'\\sigma'}</Math> is:
          </p>
          <MathBlock>{'\\text{sgn}(\\sigma) = \\begin{cases} +1 & \\text{if } \\sigma \\text{ is even} \\\\ -1 & \\text{if } \\sigma \\text{ is odd} \\end{cases}'}</MathBlock>
        </Definition>

        <Theorem title="Parity is Well-Defined">
          <p>
            A permutation cannot be both even and odd. The number of transpositions may vary,
            but the parity is always the same.
          </p>
        </Theorem>

        <div className="card">
          <h4 className="font-semibold mb-3">Quick Parity Check</h4>
          <p className="text-dark-300 mb-3">
            For a permutation written as disjoint cycles:
          </p>
          <MathBlock>{'\\text{sgn}(\\sigma) = (-1)^{n - (\\text{number of cycles})}'}</MathBlock>
          <p className="text-dark-300 mt-3">
            Or equivalently: a <Math>k</Math>-cycle has sign <Math>{'(-1)^{k-1}'}</Math>.
          </p>
        </div>

        {/* Alternating Group */}
        <Definition title="Alternating Group A_n">
          <p>
            The <strong>alternating group</strong> <Math>A_n</Math> is the subgroup of{' '}
            <Math>S_n</Math> consisting of all even permutations.
          </p>
          <MathBlock>{'A_n = \\{\\sigma \\in S_n : \\text{sgn}(\\sigma) = 1\\}'}</MathBlock>
          <p className="mt-2">
            <Math>{'|A_n| = \\frac{n!}{2}'}</Math> for <Math>{'n \\geq 2'}</Math>.
          </p>
        </Definition>

        <Theorem title="A_n is Normal in S_n">
          <p>
            <Math>{'A_n \\trianglelefteq S_n'}</Math> (the alternating group is a normal subgroup
            of the symmetric group).
          </p>
        </Theorem>

        {/* Cayley's Theorem */}
        <Theorem title="Cayley's Theorem">
          <p>
            Every group <Math>G</Math> is isomorphic to a subgroup of some symmetric group.
            Specifically:
          </p>
          <MathBlock>{'G \\hookrightarrow S_{|G|}'}</MathBlock>
          <p className="mt-2">via the left regular representation.</p>
        </Theorem>

        <div className="card">
          <h4 className="font-semibold mb-3">Significance of Cayley's Theorem</h4>
          <p className="text-dark-300">
            This theorem shows that the study of abstract groups can be reduced to the study
            of permutation groups. Every group "is" a permutation group, in a sense.
          </p>
        </div>

        {/* Cycle Type */}
        <Definition title="Cycle Type">
          <p>
            The <strong>cycle type</strong> of a permutation is the list of lengths of its disjoint
            cycles (including 1-cycles for fixed points), usually written in non-increasing order.
          </p>
        </Definition>

        <Example title="Cycle Types in S_4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-3 py-2 text-left">Cycle Type</th>
                  <th className="px-3 py-2 text-left">Example</th>
                  <th className="px-3 py-2 text-left">Count</th>
                  <th className="px-3 py-2 text-left">Order</th>
                  <th className="px-3 py-2 text-left">Parity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-800">
                  <td className="px-3 py-2">(1,1,1,1)</td>
                  <td className="px-3 py-2 font-mono">e</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">even</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="px-3 py-2">(2,1,1)</td>
                  <td className="px-3 py-2 font-mono">(1 2)</td>
                  <td className="px-3 py-2">6</td>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">odd</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="px-3 py-2">(2,2)</td>
                  <td className="px-3 py-2 font-mono">(1 2)(3 4)</td>
                  <td className="px-3 py-2">3</td>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">even</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="px-3 py-2">(3,1)</td>
                  <td className="px-3 py-2 font-mono">(1 2 3)</td>
                  <td className="px-3 py-2">8</td>
                  <td className="px-3 py-2">3</td>
                  <td className="px-3 py-2">even</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="px-3 py-2">(4)</td>
                  <td className="px-3 py-2 font-mono">(1 2 3 4)</td>
                  <td className="px-3 py-2">6</td>
                  <td className="px-3 py-2">4</td>
                  <td className="px-3 py-2">odd</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-dark-400">
            Total: 1 + 6 + 3 + 8 + 6 = 24 = 4!
          </p>
        </Example>

        {/* Conjugacy Classes */}
        <Theorem title="Conjugacy in S_n">
          <p>
            Two permutations in <Math>S_n</Math> are conjugate if and only if they have
            the same cycle type.
          </p>
        </Theorem>

        {/* Practice Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Practice: Cycle Permutations</h3>
          <p className="text-dark-300 mb-6">
            Test your understanding of cycle notation, composition, order, and parity.
            Each quiz generates 10 random questions.
          </p>
          <CyclePermutationQuiz />
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <Math>S_n</Math> is the group of all permutations on <Math>n</Math> elements
              with <Math>|S_n| = n!</Math>.
            </li>
            <li>
              Every permutation can be written uniquely as a product of disjoint cycles.
            </li>
            <li>
              The order of a permutation is the lcm of its cycle lengths.
            </li>
            <li>
              Every permutation is either even or odd (but not both).
            </li>
            <li>
              <Math>A_n</Math> (even permutations) is a normal subgroup of <Math>S_n</Math>{' '}
              with index 2.
            </li>
            <li>
              <strong>Cayley's Theorem:</strong> Every group is isomorphic to a permutation group.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
