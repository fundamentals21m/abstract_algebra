import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { SubgroupLatticeDemo } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section05() {
  return (
    <LessonLayout sectionId={5}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            A <strong>subgroup</strong> is a subset of a group that is itself a group under the same operation.
            Understanding subgroups is fundamental to group theory—they reveal the internal structure of groups
            and lead to important concepts like cosets, normal subgroups, and quotient groups.
          </p>
        </section>

        {/* Definition of Subgroup */}
        <Definition title="Subgroup">
          <p>
            Let <Math>(G, *)</Math> be a group. A subset <Math>H \subseteq G</Math> is a{' '}
            <strong>subgroup</strong> of <Math>G</Math>, written <Math>H \leq G</Math>, if{' '}
            <Math>H</Math> is itself a group under the operation <Math>*</Math>.
          </p>
        </Definition>

        <div className="callout-info">
          <p>
            Every group <Math>G</Math> has at least two subgroups:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>The <strong>trivial subgroup</strong> <Math>{'{e}'}</Math> containing only the identity</li>
            <li>The group <Math>G</Math> itself (every group is a subgroup of itself)</li>
          </ul>
          <p className="mt-2">
            All other subgroups are called <strong>proper subgroups</strong>.
          </p>
        </div>

        {/* Subgroup Test */}
        <Theorem title="Subgroup Test (One-Step)">
          <p>
            A non-empty subset <Math>H</Math> of a group <Math>G</Math> is a subgroup if and only if
            for all <Math>{'a, b \\in H'}</Math>:
          </p>
          <MathBlock>{'ab^{-1} \\in H'}</MathBlock>
        </Theorem>

        <div className="card">
          <h4 className="font-semibold mb-3">Why This Works</h4>
          <p className="text-dark-300 mb-3">
            The one-step subgroup test combines closure under the operation and closure under inverses
            into a single condition. Here's why it's sufficient:
          </p>
          <ul className="list-disc list-inside space-y-2 text-dark-300">
            <li>
              <strong>Identity:</strong> If <Math>{'a \\in H'}</Math>, then <Math>{'aa^{-1} = e \\in H'}</Math>
            </li>
            <li>
              <strong>Inverses:</strong> If <Math>{'a \\in H'}</Math>, then <Math>{'ea^{-1} = a^{-1} \\in H'}</Math>
            </li>
            <li>
              <strong>Closure:</strong> If <Math>{'a, b \\in H'}</Math>, then <Math>{'a(b^{-1})^{-1} = ab \\in H'}</Math>
            </li>
          </ul>
        </div>

        {/* Two-Step Test */}
        <Theorem title="Subgroup Test (Two-Step)">
          <p>
            A non-empty subset <Math>H</Math> of a group <Math>G</Math> is a subgroup if and only if:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li><Math>H</Math> is <strong>closed</strong>: for all <Math>{'a, b \\in H'}</Math>, we have <Math>{'ab \\in H'}</Math></li>
            <li><Math>H</Math> is <strong>closed under inverses</strong>: for all <Math>{'a \\in H'}</Math>, we have <Math>{'a^{-1} \\in H'}</Math></li>
          </ol>
        </Theorem>

        {/* Examples */}
        <Example title="Subgroups of Z₁₂">
          <p className="mb-3">
            The group <Math>{'\\mathbb{Z}_{12}'}</Math> under addition has several subgroups,
            corresponding to the divisors of 12:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><Math>{'{0}'}</Math> — order 1 (trivial)</li>
            <li><Math>{'{0, 6}'}</Math> — order 2</li>
            <li><Math>{'{0, 4, 8}'}</Math> — order 3</li>
            <li><Math>{'{0, 3, 6, 9}'}</Math> — order 4</li>
            <li><Math>{'{0, 2, 4, 6, 8, 10}'}</Math> — order 6</li>
            <li><Math>{'\\mathbb{Z}_{12}'}</Math> — order 12 (the whole group)</li>
          </ul>
          <p className="mt-3 text-dark-400">
            Notice that the order of each subgroup divides 12 — this is Lagrange's theorem!
          </p>
        </Example>

        {/* Interactive Subgroup Lattice */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Interactive: Subgroup Lattice</h3>
          <p className="text-dark-300 mb-4">
            A <strong>subgroup lattice</strong> (or Hasse diagram) visualizes the containment relationships
            between subgroups. An edge from <Math>H</Math> to <Math>K</Math> means{' '}
            <Math>{'H \\leq K'}</Math> with no subgroup in between.
          </p>
          <SubgroupLatticeDemo />
        </section>

        {/* Generated Subgroups */}
        <Definition title="Generated Subgroup">
          <p>
            Let <Math>S</Math> be a subset of a group <Math>G</Math>. The{' '}
            <strong>subgroup generated by</strong> <Math>S</Math>, denoted{' '}
            <Math>{'\\langle S \\rangle'}</Math>, is the smallest subgroup of <Math>G</Math>{' '}
            containing <Math>S</Math>.
          </p>
          <p className="mt-2">
            Equivalently, <Math>{'\\langle S \\rangle'}</Math> is the intersection of all subgroups
            containing <Math>S</Math>.
          </p>
        </Definition>

        <div className="card">
          <h4 className="font-semibold mb-3">Computing <Math>{'\\langle S \\rangle'}</Math></h4>
          <p className="text-dark-300 mb-3">
            In practice, <Math>{'\\langle S \\rangle'}</Math> consists of all finite products of elements
            of <Math>S</Math> and their inverses:
          </p>
          <MathBlock>{'\\langle S \\rangle = \\{s_1^{\\epsilon_1} s_2^{\\epsilon_2} \\cdots s_n^{\\epsilon_n} : s_i \\in S, \\epsilon_i = \\pm 1, n \\geq 0\\}'}</MathBlock>
        </div>

        {/* Cyclic Subgroups */}
        <Definition title="Cyclic Subgroup">
          <p>
            If <Math>{'S = \\{a\\}'}</Math> is a single element, we write{' '}
            <Math>{'\\langle a \\rangle'}</Math> for the subgroup generated by <Math>a</Math>.
            This is a <strong>cyclic subgroup</strong>.
          </p>
          <MathBlock>{'\\langle a \\rangle = \\{a^n : n \\in \\mathbb{Z}\\} = \\{..., a^{-2}, a^{-1}, e, a, a^2, ...\\}'}</MathBlock>
        </Definition>

        <Example title="Cyclic Subgroups in Z₁₂">
          <div className="space-y-3">
            <p>In <Math>{'\\mathbb{Z}_{12}'}</Math> (using additive notation):</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Math>{'\\langle 1 \\rangle = \\mathbb{Z}_{12}'}</Math> — generates the whole group
              </li>
              <li>
                <Math>{'\\langle 2 \\rangle = \\{0, 2, 4, 6, 8, 10\\}'}</Math> — order 6
              </li>
              <li>
                <Math>{'\\langle 3 \\rangle = \\{0, 3, 6, 9\\}'}</Math> — order 4
              </li>
              <li>
                <Math>{'\\langle 4 \\rangle = \\{0, 4, 8\\}'}</Math> — order 3
              </li>
              <li>
                <Math>{'\\langle 6 \\rangle = \\{0, 6\\}'}</Math> — order 2
              </li>
            </ul>
          </div>
        </Example>

        {/* Order and Index */}
        <Definition title="Index of a Subgroup">
          <p>
            The <strong>index</strong> of a subgroup <Math>H</Math> in <Math>G</Math>,
            denoted <Math>{'[G:H]'}</Math>, is the number of distinct left (or right) cosets of{' '}
            <Math>H</Math> in <Math>G</Math>.
          </p>
          <p className="mt-2">
            For finite groups:
          </p>
          <MathBlock>{'[G:H] = \\frac{|G|}{|H|}'}</MathBlock>
        </Definition>

        {/* Lattice Properties */}
        <div className="card">
          <h4 className="font-semibold mb-3">Reading the Subgroup Lattice</h4>
          <ul className="space-y-3 text-dark-300">
            <li>
              <strong>Nodes:</strong> Each node represents a subgroup. The number inside shows the order.
            </li>
            <li>
              <strong>Edges:</strong> An edge from <Math>H</Math> to <Math>K</Math> means{' '}
              <Math>{'H \\leq K'}</Math> is a maximal proper subgroup (no subgroup between them).
            </li>
            <li>
              <strong>Edge labels:</strong> The number on an edge is the index <Math>{'[K:H]'}</Math>.
            </li>
            <li>
              <strong>Green nodes:</strong> These are <em>normal subgroups</em> (more on this later).
            </li>
          </ul>
        </div>

        {/* Key Theorems */}
        <Theorem title="Intersection of Subgroups">
          <p>
            If <Math>H</Math> and <Math>K</Math> are subgroups of <Math>G</Math>,
            then <Math>{'H \\cap K'}</Math> is also a subgroup of <Math>G</Math>.
          </p>
        </Theorem>

        <div className="callout-warning">
          <p>
            <strong>Caution:</strong> The union of two subgroups is generally <em>not</em> a subgroup.
            For example, in <Math>{'\\mathbb{Z}_{12}'}</Math>, the union of <Math>{'{0, 4, 8}'}</Math>{' '}
            and <Math>{'{0, 3, 6, 9}'}</Math> is <Math>{'{0, 3, 4, 6, 8, 9}'}</Math>, which is
            not closed under addition (since <Math>{'3 + 4 = 7'}</Math> is not in the set).
          </p>
        </div>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              A subgroup is a subset that is itself a group under the same operation.
            </li>
            <li>
              Use the one-step or two-step test to verify subgroups.
            </li>
            <li>
              Every element generates a cyclic subgroup <Math>{'\\langle a \\rangle'}</Math>.
            </li>
            <li>
              The subgroup lattice shows containment relationships between all subgroups.
            </li>
            <li>
              For cyclic groups <Math>{'\\mathbb{Z}_n'}</Math>, subgroups correspond to divisors of <Math>n</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
