import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section32() {
  return (
    <LessonLayout sectionId={32}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            Most of our examples have been commutative rings, but <strong>noncommutative rings</strong>
            are equally important. Matrix rings, quaternions, and group rings provide rich examples
            where <Math>{'ab \\neq ba'}</Math>.
          </p>
        </section>

        {/* Matrix Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Matrix Rings</h3>

          <Definition title="Matrix Ring M_n(R)">
            <p>
              For a ring <Math>R</Math>, the <strong>matrix ring</strong> <Math>{'M_n(R)'}</Math> consists
              of <Math>{'n \\times n'}</Math> matrices with entries in <Math>R</Math>, under matrix
              addition and multiplication.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Properties of <Math>{'M_n(R)'}</Math></h4>
            <ul className="space-y-2 text-dark-300">
              <li>Noncommutative for <Math>{'n \\geq 2'}</Math></li>
              <li>Has unity (identity matrix <Math>{'I_n'}</Math>)</li>
              <li>Has zero divisors (singular matrices)</li>
              <li>Units = invertible matrices = <Math>{'GL_n(R)'}</Math></li>
            </ul>
          </div>

          <Example title="Zero Divisors in M₂(R)">
            <div className="bg-dark-900 p-4 rounded">
              <MathBlock>{`\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}`}</MathBlock>
              <p className="text-dark-400 text-sm mt-2">
                Neither factor is zero, but the product is!
              </p>
            </div>
          </Example>

          <Example title="Non-commutativity in M₂(R)">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <MathBlock>{`AB = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}`}</MathBlock>
              <MathBlock>{`BA = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}`}</MathBlock>
              <p className="text-primary-400"><Math>{'AB \\neq BA'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Quaternions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Quaternions</h3>

          <Definition title="Quaternions H">
            <p>
              The <strong>quaternions</strong> <Math>{'\\mathbb{H}'}</Math> are:
            </p>
            <MathBlock>{'\\mathbb{H} = \\{a + bi + cj + dk : a, b, c, d \\in \\mathbb{R}\\}'}</MathBlock>
            <p className="mt-2">with multiplication rules:</p>
            <MathBlock>{'i^2 = j^2 = k^2 = ijk = -1'}</MathBlock>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Multiplication Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="p-2">×</th>
                    <th className="p-2">1</th>
                    <th className="p-2">i</th>
                    <th className="p-2">j</th>
                    <th className="p-2">k</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr><td className="p-2 font-semibold">1</td><td className="p-2">1</td><td className="p-2">i</td><td className="p-2">j</td><td className="p-2">k</td></tr>
                  <tr><td className="p-2 font-semibold">i</td><td className="p-2">i</td><td className="p-2">-1</td><td className="p-2">k</td><td className="p-2">-j</td></tr>
                  <tr><td className="p-2 font-semibold">j</td><td className="p-2">j</td><td className="p-2">-k</td><td className="p-2">-1</td><td className="p-2">i</td></tr>
                  <tr><td className="p-2 font-semibold">k</td><td className="p-2">k</td><td className="p-2">j</td><td className="p-2">-i</td><td className="p-2">-1</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <Theorem title="Quaternions are a Division Ring">
            <p>
              <Math>{'\\mathbb{H}'}</Math> is a noncommutative division ring: every nonzero element has
              a multiplicative inverse.
            </p>
          </Theorem>

          <Example title="Quaternion Inverse">
            <div className="bg-dark-900 p-4 rounded">
              <p>For <Math>{'q = a + bi + cj + dk'}</Math>, the conjugate is <Math>{'\\bar{q} = a - bi - cj - dk'}</Math></p>
              <p className="mt-2">Norm: <Math>{'|q|^2 = q\\bar{q} = a^2 + b^2 + c^2 + d^2'}</Math></p>
              <p className="mt-2 text-primary-400">Inverse: <Math>{'q^{-1} = \\bar{q}/|q|^2'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Group Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Group Rings</h3>

          <Definition title="Group Ring R[G]">
            <p>
              For a ring <Math>R</Math> and a group <Math>G</Math>, the <strong>group ring</strong>
              <Math>{'R[G]'}</Math> consists of formal sums:
            </p>
            <MathBlock>{'\\sum_{g \\in G} r_g \\cdot g \\quad (r_g \\in R, \\text{ finitely many nonzero})'}</MathBlock>
            <p className="mt-2">with multiplication extending <Math>{'(r \\cdot g)(s \\cdot h) = rs \\cdot gh'}</Math>.</p>
          </Definition>

          <Example title="Z[Z₂]">
            <div className="bg-dark-900 p-4 rounded">
              <p>Let <Math>{'G = \\mathbb{Z}_2 = \\{1, g\\}'}</Math> with <Math>{'g^2 = 1'}</Math>.</p>
              <p className="mt-2"><Math>{'\\mathbb{Z}[\\mathbb{Z}_2] = \\{a + bg : a, b \\in \\mathbb{Z}\\}'}</Math></p>
              <p className="mt-2 text-dark-300">Multiplication: <Math>{'(a+bg)(c+dg) = (ac+bd) + (ad+bc)g'}</Math></p>
              <p className="mt-2 text-dark-400 text-sm">This is isomorphic to <Math>{'\\mathbb{Z}[x]/(x^2-1)'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Division Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Division Rings (Skew Fields)</h3>

          <Definition title="Division Ring">
            <p>
              A <strong>division ring</strong> (or skew field) is a ring where every nonzero element
              has a multiplicative inverse. Unlike fields, commutativity is not required.
            </p>
          </Definition>

          <Theorem title="Wedderburn's Little Theorem">
            <p>
              Every finite division ring is a field (i.e., commutative).
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Consequence:</strong> Noncommutative division rings must be infinite.
              <Math>{'\\mathbb{H}'}</Math> is the classic example.
            </p>
          </div>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">3D Rotations</h4>
              <p className="text-dark-300 text-sm">
                Unit quaternions represent 3D rotations, avoiding gimbal lock.
                Used in computer graphics and aerospace.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Representation Theory</h4>
              <p className="text-dark-300 text-sm">
                Group rings <Math>{'\\mathbb{C}[G]'}</Math> are central to studying
                how groups act on vector spaces.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Linear Algebra</h4>
              <p className="text-dark-300 text-sm">
                Endomorphism rings of vector spaces are matrix rings,
                fundamental to linear algebra.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Quantum Mechanics</h4>
              <p className="text-dark-300 text-sm">
                Operators on Hilbert spaces form noncommutative algebras;
                <Math>{'[A,B] \\neq 0'}</Math> is the uncertainty principle.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Matrix rings</strong> <Math>{'M_n(R)'}</Math> are noncommutative with zero divisors.
            </li>
            <li>
              <strong>Quaternions</strong> <Math>{'\\mathbb{H}'}</Math> form a noncommutative division ring.
            </li>
            <li>
              <strong>Group rings</strong> <Math>{'R[G]'}</Math> combine ring and group structures.
            </li>
            <li>
              <strong>Wedderburn:</strong> Finite division rings are commutative (fields).
            </li>
            <li>
              These structures appear in geometry, physics, and representation theory.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
