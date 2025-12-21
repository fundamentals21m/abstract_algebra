import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { FreeAbelianQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section19() {
  return (
    <LessonLayout sectionId={19}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Free abelian groups</strong> generalize the integers <Math>{'\\mathbb{Z}'}</Math> to higher
            dimensions. They are foundational for understanding finitely generated abelian groups
            and appear throughout algebra, topology, and number theory.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Free Abelian Groups</h3>

          <Definition title="Free Abelian Group">
            <p>
              A <strong>free abelian group</strong> on a set <Math>S</Math> is an abelian group <Math>F</Math>
              with a function <Math>{'i: S \\to F'}</Math> such that: for any abelian group <Math>A</Math>
              and any function <Math>{'f: S \\to A'}</Math>, there exists a unique homomorphism
              <Math>{'\\phi: F \\to A'}</Math> with <Math>{'\\phi \\circ i = f'}</Math>.
            </p>
          </Definition>

          <Theorem title="Concrete Description">
            <p>
              The free abelian group on a set <Math>S</Math> is isomorphic to:
            </p>
            <MathBlock>{'\\bigoplus_{s \\in S} \\mathbb{Z} = \\{\\text{formal sums } \\sum_{s \\in S} n_s \\cdot s : n_s \\in \\mathbb{Z}, \\text{ finitely many nonzero}\\}'}</MathBlock>
          </Theorem>

          <Example title="Free Abelian Groups">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">Free abelian group on one generator</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}^n'}</Math></p>
                <p className="text-dark-300">Free abelian group on <Math>n</Math> generators</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}^{\\infty}'}</Math></p>
                <p className="text-dark-300">Free abelian on countably many generators (not <Math>{'\\prod \\mathbb{Z}'}</Math>!)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Basis */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Basis of a Free Abelian Group</h3>

          <Definition title="Basis">
            <p>
              A <strong>basis</strong> for a free abelian group <Math>F</Math> is a subset <Math>{'B \\subseteq F'}</Math>
              such that every element of <Math>F</Math> can be written uniquely as a finite
              <Math>{'\\mathbb{Z}'}</Math>-linear combination of elements of <Math>B</Math>.
            </p>
          </Definition>

          <Theorem title="Basis Properties">
            <p>
              Let <Math>F</Math> be a free abelian group. Then:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Every two bases have the same cardinality (the <strong>rank</strong>)</li>
              <li>A free abelian group of rank <Math>n</Math> is isomorphic to <Math>{'\\mathbb{Z}^n'}</Math></li>
              <li>Every subgroup of a free abelian group is free abelian</li>
            </ul>
          </Theorem>

          <Example title="Standard Basis of Z³">
            <div className="bg-dark-900 p-4 rounded">
              <p>The standard basis of <Math>{'\\mathbb{Z}^3'}</Math>:</p>
              <MathBlock>{'e_1 = (1,0,0), \\quad e_2 = (0,1,0), \\quad e_3 = (0,0,1)'}</MathBlock>
              <p className="mt-2 text-dark-300">
                Every element: <Math>{'(a,b,c) = ae_1 + be_2 + ce_3'}</Math> uniquely.
              </p>
            </div>
          </Example>
        </section>

        {/* Subgroups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Subgroups of Free Abelian Groups</h3>

          <Theorem title="Subgroups are Free">
            <p>
              Every subgroup of a free abelian group of rank <Math>n</Math> is free abelian
              of rank at most <Math>n</Math>.
            </p>
          </Theorem>

          <Example title="Subgroup of Z²">
            <p className="mb-3">
              The subgroup <Math>{'H = \\{(a,b) \\in \\mathbb{Z}^2 : a + b \\equiv 0 \\pmod 2\\}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>A basis for <Math>H</Math>: <Math>{'\\{(1,1), (2,0)\\}'}</Math></p>
              <p className="mt-2">or equivalently: <Math>{'\\{(1,1), (0,2)\\}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                <Math>H</Math> is free abelian of rank 2, index 2 in <Math>{'\\mathbb{Z}^2'}</Math>
              </p>
            </div>
          </Example>

          <Theorem title="Smith Normal Form">
            <p>
              If <Math>H</Math> is a subgroup of <Math>{'\\mathbb{Z}^n'}</Math> of rank <Math>m</Math>,
              there exist bases such that <Math>H</Math> is generated by
              <Math>{'d_1 e_1, d_2 e_2, ..., d_m e_m'}</Math> where <Math>{'d_1 | d_2 | \\cdots | d_m'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Quotients */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Quotients of Free Abelian Groups</h3>

          <Theorem title="Structure of Quotients">
            <p>
              If <Math>H</Math> is a subgroup of <Math>{'\\mathbb{Z}^n'}</Math> with Smith normal form
              <Math>{'d_1 | d_2 | \\cdots | d_m'}</Math>, then:
            </p>
            <MathBlock>{'\\mathbb{Z}^n / H \\cong \\mathbb{Z}_{d_1} \\times \\mathbb{Z}_{d_2} \\times \\cdots \\times \\mathbb{Z}_{d_m} \\times \\mathbb{Z}^{n-m}'}</MathBlock>
          </Theorem>

          <Example title="Computing a Quotient">
            <p className="mb-3">
              Let <Math>{'H = \\langle (2,0), (0,6) \\rangle \\subseteq \\mathbb{Z}^2'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>Matrix: <Math>{'\\begin{pmatrix} 2 & 0 \\\\ 0 & 6 \\end{pmatrix}'}</Math></p>
              <p className="mt-2">Already diagonal with <Math>{'d_1 = 2, d_2 = 6'}</Math></p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{Z}^2 / H \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_6'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Non-Diagonal Example">
            <p className="mb-3">
              Let <Math>{'H = \\langle (2,4), (6,0) \\rangle \\subseteq \\mathbb{Z}^2'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Matrix: <Math>{'\\begin{pmatrix} 2 & 4 \\\\ 6 & 0 \\end{pmatrix}'}</Math></p>
              <p className="mt-2">Row reduce to Smith form:</p>
              <p className="text-dark-400 text-sm">
                <Math>{'\\begin{pmatrix} 2 & 0 \\\\ 0 & 12 \\end{pmatrix}'}</Math> (after row/column operations)
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{Z}^2 / H \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_{12}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Algebraic Topology</h4>
              <p className="text-dark-300 text-sm">
                Homology groups of spaces are often free abelian. The rank counts
                "holes" of various dimensions.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Number Theory</h4>
              <p className="text-dark-300 text-sm">
                The group of units in a number field has a free abelian part
                (Dirichlet's unit theorem).
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Linear Algebra</h4>
              <p className="text-dark-300 text-sm">
                Integer matrices and lattices use free abelian group theory.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Cryptography</h4>
              <p className="text-dark-300 text-sm">
                Lattice-based cryptography relies on properties of
                <Math>{'\\mathbb{Z}^n'}</Math> and its subgroups.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Free abelian groups are direct sums of copies of <Math>{'\\mathbb{Z}'}</Math>.
            </li>
            <li>
              The rank (number of basis elements) is well-defined.
            </li>
            <li>
              Every subgroup of a free abelian group is free abelian.
            </li>
            <li>
              Smith normal form computes the structure of quotients.
            </li>
            <li>
              <Math>{'\\mathbb{Z}^n/H \\cong'}</Math> (torsion) × (free part) by the structure theorem.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <FreeAbelianQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
