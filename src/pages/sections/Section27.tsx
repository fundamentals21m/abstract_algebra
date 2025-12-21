import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { PolynomialQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section27() {
  return (
    <LessonLayout sectionId={27}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Polynomial rings</strong> are fundamental structures in algebra. Given any ring
            <Math>R</Math>, we can form the ring <Math>{'R[x]'}</Math> of polynomials with coefficients
            in <Math>R</Math>. This construction is essential for field extensions and algebraic geometry.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Polynomial Rings</h3>

          <Definition title="Polynomial Ring R[x]">
            <p>
              For a ring <Math>R</Math>, the <strong>polynomial ring</strong> <Math>{'R[x]'}</Math> consists
              of formal expressions:
            </p>
            <MathBlock>{'f(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0'}</MathBlock>
            <p className="mt-2">
              where <Math>{'a_i \\in R'}</Math>. Operations are defined in the usual way.
            </p>
          </Definition>

          <Definition title="Degree">
            <p>
              The <strong>degree</strong> of a nonzero polynomial <Math>f</Math> is the highest power
              of <Math>x</Math> with nonzero coefficient. We write <Math>{'\\deg(f)'}</Math>.
            </p>
            <p className="mt-2">
              The <strong>leading coefficient</strong> is the coefficient of the highest degree term.
            </p>
          </Definition>
        </section>

        {/* Operations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Polynomial Arithmetic</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Addition</h4>
            <MathBlock>{'(\\sum a_i x^i) + (\\sum b_i x^i) = \\sum (a_i + b_i) x^i'}</MathBlock>
          </div>

          <div className="card">
            <h4 className="font-semibold mb-3">Multiplication</h4>
            <MathBlock>{'(\\sum a_i x^i)(\\sum b_j x^j) = \\sum_k (\\sum_{i+j=k} a_i b_j) x^k'}</MathBlock>
          </div>

          <Example title="Polynomial Multiplication">
            <div className="bg-dark-900 p-4 rounded">
              <p className="mb-2">In <Math>{'\\mathbb{Z}[x]'}</Math>:</p>
              <p><Math>{'(2x + 3)(x^2 - x + 1)'}</Math></p>
              <p className="text-dark-400"><Math>{'= 2x^3 - 2x^2 + 2x + 3x^2 - 3x + 3'}</Math></p>
              <p className="text-primary-400"><Math>{'= 2x^3 + x^2 - x + 3'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Properties */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Properties of Polynomial Rings</h3>

          <Theorem title="Degree Properties">
            <p>For polynomials <Math>f</Math> and <Math>g</Math> over an integral domain:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'\\deg(fg) = \\deg(f) + \\deg(g)'}</Math></li>
              <li><Math>{'\\deg(f + g) \\leq \\max(\\deg f, \\deg g)'}</Math></li>
            </ul>
          </Theorem>

          <Theorem title="R[x] Inherits Properties">
            <ul className="list-disc list-inside space-y-1">
              <li>If <Math>R</Math> is commutative, so is <Math>{'R[x]'}</Math></li>
              <li>If <Math>R</Math> has unity, so does <Math>{'R[x]'}</Math> (same 1)</li>
              <li>If <Math>R</Math> is an integral domain, so is <Math>{'R[x]'}</Math></li>
              <li>Units of <Math>{'R[x]'}</Math> are exactly units of <Math>R</Math> (constant polynomials)</li>
            </ul>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Warning:</strong> If <Math>R</Math> has zero divisors, degree can decrease under
              multiplication. In <Math>{'\\mathbb{Z}_6[x]'}</Math>: <Math>{'(2x)(3x) = 6x^2 = 0'}</Math>.
            </p>
          </div>
        </section>

        {/* Division Algorithm */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Division Algorithm</h3>

          <Theorem title="Division Algorithm for Polynomials">
            <p>
              Let <Math>F</Math> be a field and <Math>{'f, g \\in F[x]'}</Math> with <Math>{'g \\neq 0'}</Math>.
              There exist unique <Math>{'q, r \\in F[x]'}</Math> such that:
            </p>
            <MathBlock>{'f = gq + r \\quad \\text{with } r = 0 \\text{ or } \\deg(r) < \\deg(g)'}</MathBlock>
          </Theorem>

          <Example title="Polynomial Division">
            <p className="mb-3">Divide <Math>{'x^3 + 2x + 1'}</Math> by <Math>{'x + 1'}</Math> in <Math>{'\\mathbb{Q}[x]'}</Math>:</p>
            <div className="bg-dark-900 p-4 rounded font-mono text-sm">
              <p>x³ + 0x² + 2x + 1 ÷ (x + 1)</p>
              <p className="mt-2">x³ + 2x + 1 = (x + 1)(x² - x + 3) + (-2)</p>
              <p className="text-primary-400 mt-2">q = x² - x + 3, r = -2</p>
            </div>
          </Example>
        </section>

        {/* Multiple Variables */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Polynomials in Several Variables</h3>

          <Definition title="R[x,y,...] = R[x₁, x₂, ..., xₙ]">
            <p>
              Polynomials in multiple variables can be defined iteratively:
            </p>
            <MathBlock>{'R[x, y] = (R[x])[y] = (R[y])[x]'}</MathBlock>
            <p className="mt-2">
              Elements are sums <Math>{'\\sum a_{ij} x^i y^j'}</Math>.
            </p>
          </Definition>

          <Example title="Z[x,y]">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'f(x,y) = 3x^2y + 2xy^2 - 5y + 7'}</Math></p>
              <p className="text-dark-400 mt-2">
                Total degree: 3 (from <Math>{'x^2y'}</Math> or <Math>{'xy^2'}</Math>)
              </p>
            </div>
          </Example>
        </section>

        {/* Evaluation */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Evaluation Homomorphism</h3>

          <Theorem title="Evaluation Homomorphism">
            <p>
              For any ring <Math>R</Math> and <Math>{'a \\in R'}</Math>, the evaluation map:
            </p>
            <MathBlock>{'\\phi_a: R[x] \\to R, \\quad \\phi_a(f) = f(a)'}</MathBlock>
            <p className="mt-2">is a ring homomorphism.</p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Kernel of Evaluation</h4>
            <p className="text-dark-300">
              <Math>{'\\ker(\\phi_a) = \\{f \\in R[x] : f(a) = 0\\}'}</Math> — polynomials with <Math>a</Math> as a root.
            </p>
            <p className="text-dark-300 mt-2">
              When <Math>R</Math> is an integral domain: <Math>{'\\ker(\\phi_a) = (x - a)'}</Math>.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <Math>{'R[x]'}</Math> consists of polynomials with coefficients from <Math>R</Math>.
            </li>
            <li>
              If <Math>R</Math> is an integral domain, so is <Math>{'R[x]'}</Math>.
            </li>
            <li>
              Over a field, the division algorithm applies.
            </li>
            <li>
              Units of <Math>{'R[x]'}</Math> are constant polynomials that are units in <Math>R</Math>.
            </li>
            <li>
              Evaluation is a ring homomorphism.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <PolynomialQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
