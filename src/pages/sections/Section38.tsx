import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section38() {
  return (
    <LessonLayout sectionId={38}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Gröbner bases</strong> are a computational tool for solving systems of polynomial
            equations. They generalize the Euclidean algorithm to multiple variables and are
            fundamental to computational algebraic geometry.
          </p>
        </section>

        {/* Monomial Orders */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Monomial Orders</h3>

          <Definition title="Monomial Order">
            <p>
              A <strong>monomial order</strong> is a total order on monomials <Math>{'x^\\alpha = x_1^{a_1} \\cdots x_n^{a_n}'}</Math>
              that is:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Well-ordered (every nonempty set has a minimum)</li>
              <li>Multiplicative: <Math>{'x^\\alpha > x^\\beta \\implies x^\\gamma x^\\alpha > x^\\gamma x^\\beta'}</Math></li>
            </ul>
          </Definition>

          <Example title="Common Monomial Orders">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Lexicographic (lex)</p>
                <p className="text-dark-300 text-sm">Compare exponents left to right: <Math>{'x^3 > x^2y^5 > xy > y^{10}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Graded Lex (grlex)</p>
                <p className="text-dark-300 text-sm">Total degree first, then lex: <Math>{'xy^2 > x^2 > xy > y^2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Graded Reverse Lex (grevlex)</p>
                <p className="text-dark-300 text-sm">Most efficient for computation in practice</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Leading Terms */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Leading Terms and Division</h3>

          <Definition title="Leading Term">
            <p>
              For a polynomial <Math>f</Math> and monomial order <Math>{'\\prec'}</Math>, the
              <strong> leading term</strong> <Math>{'\\text{LT}(f)'}</Math> is the largest monomial
              (with coefficient) in <Math>f</Math>.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Division Algorithm</h4>
            <p className="text-dark-300 mb-2">
              Given <Math>f</Math> and <Math>{'f_1, ..., f_s'}</Math>, compute:
            </p>
            <MathBlock>{'f = q_1 f_1 + \\cdots + q_s f_s + r'}</MathBlock>
            <p className="text-dark-300 mt-2">
              where no term of <Math>r</Math> is divisible by any <Math>{'\\text{LT}(f_i)'}</Math>.
            </p>
            <p className="text-dark-400 text-sm mt-2">
              Unlike single-variable division, the result depends on the order of divisors!
            </p>
          </div>
        </section>

        {/* Gröbner Bases */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Gröbner Bases</h3>

          <Definition title="Gröbner Basis">
            <p>
              A set <Math>{'G = \\{g_1, ..., g_t\\}'}</Math> is a <strong>Gröbner basis</strong> for ideal
              <Math>I</Math> if:
            </p>
            <MathBlock>{'\\langle \\text{LT}(g_1), ..., \\text{LT}(g_t) \\rangle = \\langle \\text{LT}(I) \\rangle'}</MathBlock>
            <p className="mt-2">
              where <Math>{'\\text{LT}(I) = \\{\\text{LT}(f) : f \\in I\\}'}</Math>.
            </p>
          </Definition>

          <Theorem title="Gröbner Basis Properties">
            <ul className="list-disc list-inside space-y-1">
              <li>Every ideal has a Gröbner basis</li>
              <li>Division by a Gröbner basis gives unique remainder</li>
              <li><Math>{'f \\in I'}</Math> iff remainder is 0</li>
            </ul>
          </Theorem>
        </section>

        {/* Buchberger's Algorithm */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Buchberger's Algorithm</h3>

          <Definition title="S-Polynomial">
            <p>
              The <strong>S-polynomial</strong> of <Math>f</Math> and <Math>g</Math> is:
            </p>
            <MathBlock>{'S(f, g) = \\frac{\\text{lcm}(\\text{LM}(f), \\text{LM}(g))}{\\text{LT}(f)} \\cdot f - \\frac{\\text{lcm}(\\text{LM}(f), \\text{LM}(g))}{\\text{LT}(g)} \\cdot g'}</MathBlock>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Buchberger's Algorithm</h4>
            <ol className="list-decimal list-inside space-y-1 text-dark-300">
              <li>Start with generating set <Math>G</Math></li>
              <li>For each pair <Math>{'f, g \\in G'}</Math>, compute <Math>{'S(f, g)'}</Math></li>
              <li>Divide <Math>{'S(f, g)'}</Math> by <Math>G</Math> to get remainder <Math>r</Math></li>
              <li>If <Math>{'r \\neq 0'}</Math>, add <Math>r</Math> to <Math>G</Math></li>
              <li>Repeat until no new elements added</li>
            </ol>
          </div>

          <Theorem title="Buchberger's Criterion">
            <p>
              <Math>G</Math> is a Gröbner basis iff <Math>{'S(f, g)'}</Math> reduces to 0 for all pairs.
            </p>
          </Theorem>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Solving Polynomial Systems</h4>
              <p className="text-dark-300 text-sm">
                Gröbner bases in lex order can solve systems by back-substitution.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Ideal Membership</h4>
              <p className="text-dark-300 text-sm">
                Is <Math>f</Math> in <Math>{'\\langle f_1, ..., f_s \\rangle'}</Math>? Divide by Gröbner basis.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Implicitization</h4>
              <p className="text-dark-300 text-sm">
                Convert parametric equations to implicit form.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Robotics</h4>
              <p className="text-dark-300 text-sm">
                Solve inverse kinematics problems.
              </p>
            </div>
          </div>

          <Example title="Solving a System">
            <div className="bg-dark-900 p-4 rounded">
              <p>Solve: <Math>{'x^2 + y - 1 = 0, x + y^2 - 1 = 0'}</Math></p>
              <p className="mt-2">Gröbner basis (lex, <Math>{'x > y'}</Math>):</p>
              <p className="text-dark-300 mt-1"><Math>{'\\{y^4 - 2y^2 + y, x + y^2 - 1\\}'}</Math></p>
              <p className="mt-2 text-dark-400 text-sm">
                Solve <Math>{'y^4 - 2y^2 + y = 0'}</Math> first, then back-substitute for <Math>x</Math>.
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Monomial orders</strong> determine leading terms.
            </li>
            <li>
              <strong>Gröbner bases</strong> make division well-defined and unique.
            </li>
            <li>
              <strong>Buchberger's algorithm</strong> computes Gröbner bases.
            </li>
            <li>
              Applications: solving systems, ideal membership, implicitization.
            </li>
            <li>
              Implemented in Mathematica, Maple, Sage, Macaulay2, etc.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
