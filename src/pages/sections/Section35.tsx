import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { UFDQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section35() {
  return (
    <LessonLayout sectionId={35}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Euclidean domains</strong> admit a division algorithm, just like the integers.
            This makes them computationally tractable and guarantees they are PIDs (hence UFDs).
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Euclidean Domains</h3>

          <Definition title="Euclidean Domain">
            <p>
              An integral domain <Math>D</Math> is a <strong>Euclidean domain</strong> if there exists
              a function <Math>{'\\nu: D \\setminus \\{0\\} \\to \\mathbb{Z}_{\\geq 0}'}</Math> (the <strong>norm</strong>)
              such that for all <Math>{'a, b \\in D'}</Math> with <Math>{'b \\neq 0'}</Math>:
            </p>
            <MathBlock>{'a = bq + r \\quad \\text{with } r = 0 \\text{ or } \\nu(r) < \\nu(b)'}</MathBlock>
          </Definition>

          <Example title="Euclidean Domains">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">Norm: <Math>{'\\nu(n) = |n|'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'F[x]'}</Math> for field <Math>F</Math></p>
                <p className="text-dark-300">Norm: <Math>{'\\nu(f) = \\deg(f)'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}[i]'}</Math></p>
                <p className="text-dark-300">Norm: <Math>{'\\nu(a+bi) = a^2 + b^2'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Euclidean Algorithm */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Euclidean Algorithm</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Algorithm</h4>
            <p className="text-dark-300 mb-2">To find <Math>{'\\gcd(a, b)'}</Math>:</p>
            <ol className="list-decimal list-inside space-y-1 text-dark-300">
              <li>If <Math>{'b = 0'}</Math>, return <Math>a</Math></li>
              <li>Divide: <Math>{'a = bq + r'}</Math></li>
              <li>Return <Math>{'\\gcd(b, r)'}</Math></li>
            </ol>
          </div>

          <Example title="Euclidean Algorithm in Z">
            <div className="bg-dark-900 p-4 rounded font-mono text-sm">
              <p>gcd(252, 105):</p>
              <p className="mt-1">252 = 105 × 2 + 42</p>
              <p>105 = 42 × 2 + 21</p>
              <p>42 = 21 × 2 + 0</p>
              <p className="text-primary-400 mt-2">gcd = 21</p>
            </div>
          </Example>

          <Example title="Euclidean Algorithm in Z[i]">
            <div className="bg-dark-900 p-4 rounded">
              <p>Find <Math>{'\\gcd(11 + 3i, 1 + 8i)'}</Math>:</p>
              <p className="mt-2 text-dark-300">
                Divide, round quotient to nearest Gaussian integer, compute remainder...
              </p>
              <p className="text-primary-400 mt-2">Result: <Math>{'1 + 2i'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Extended Euclidean Algorithm */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Extended Euclidean Algorithm</h3>

          <Theorem title="Bézout's Identity">
            <p>
              In a Euclidean domain, for any <Math>a</Math> and <Math>b</Math>:
            </p>
            <MathBlock>{'\\gcd(a, b) = xa + yb'}</MathBlock>
            <p className="mt-2">for some <Math>{'x, y \\in D'}</Math>.</p>
          </Theorem>

          <Example title="Extended Algorithm">
            <div className="bg-dark-900 p-4 rounded font-mono text-sm">
              <p>gcd(252, 105) = 21:</p>
              <p className="mt-2">21 = 105 - 42 × 2</p>
              <p>21 = 105 - (252 - 105 × 2) × 2</p>
              <p>21 = 105 × 5 - 252 × 2</p>
              <p className="text-primary-400 mt-2">21 = 5(105) + (-2)(252)</p>
            </div>
          </Example>
        </section>

        {/* Hierarchy */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Euclidean ⟹ PID ⟹ UFD</h3>

          <Theorem title="Euclidean implies PID">
            <p>
              Every Euclidean domain is a principal ideal domain.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Proof idea:</strong> For ideal <Math>I</Math>, take <Math>{'d \\in I'}</Math> with
              minimal norm. Division algorithm shows <Math>{'I = (d)'}</Math>.
            </p>
          </div>

          <Example title="PID but not Euclidean">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{Z}[(1+\\sqrt{-19})/2]'}</Math> is a PID but not Euclidean.</p>
              <p className="text-dark-400 text-sm mt-2">
                Proving something is NOT Euclidean is subtle—must rule out all possible norms.
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Euclidean domains have a division algorithm with a norm function.
            </li>
            <li>
              The <strong>Euclidean algorithm</strong> computes GCDs efficiently.
            </li>
            <li>
              <strong>Extended algorithm</strong> gives Bézout coefficients.
            </li>
            <li>
              Euclidean ⟹ PID ⟹ UFD.
            </li>
            <li>
              Examples: <Math>{'\\mathbb{Z}'}</Math>, <Math>{'F[x]'}</Math>, <Math>{'\\mathbb{Z}[i]'}</Math>.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <UFDQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
