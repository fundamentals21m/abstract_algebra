import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section36() {
  return (
    <LessonLayout sectionId={36}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Algebraic number theory</strong> applies abstract algebra to study integers
            and primes. Ring-theoretic ideas illuminate classical questions about primes, congruences,
            and Diophantine equations.
          </p>
        </section>

        {/* Algebraic Integers */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Algebraic Integers</h3>

          <Definition title="Algebraic Integer">
            <p>
              A complex number <Math>{'\\alpha'}</Math> is an <strong>algebraic integer</strong> if it
              is a root of a monic polynomial with integer coefficients:
            </p>
            <MathBlock>{'\\alpha^n + a_{n-1}\\alpha^{n-1} + \\cdots + a_0 = 0, \\quad a_i \\in \\mathbb{Z}'}</MathBlock>
          </Definition>

          <Example title="Algebraic Integers">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\sqrt{2}'}</Math>: root of <Math>{'x^2 - 2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>i</Math>: root of <Math>{'x^2 + 1'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\zeta_n = e^{2\\pi i/n}'}</Math>: root of <Math>{'x^n - 1'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'(1 + \\sqrt{5})/2'}</Math> (golden ratio): root of <Math>{'x^2 - x - 1'}</Math></p>
              </div>
            </div>
          </Example>

          <Theorem title="Ring of Algebraic Integers">
            <p>
              The algebraic integers form a ring (closed under + and ×).
            </p>
          </Theorem>
        </section>

        {/* Number Fields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Number Fields</h3>

          <Definition title="Number Field">
            <p>
              A <strong>number field</strong> is a finite extension of <Math>{'\\mathbb{Q}'}</Math>.
            </p>
          </Definition>

          <Definition title="Ring of Integers">
            <p>
              For a number field <Math>K</Math>, its <strong>ring of integers</strong> <Math>{'\\mathcal{O}_K'}</Math>
              is the set of algebraic integers in <Math>K</Math>.
            </p>
          </Definition>

          <Example title="Quadratic Fields">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'K = \\mathbb{Q}(\\sqrt{d})'}</Math> for squarefree <Math>d</Math>:</p>
              <MathBlock>{`\\mathcal{O}_K = \\begin{cases} \\mathbb{Z}[\\sqrt{d}] & d \\equiv 2, 3 \\pmod 4 \\\\ \\mathbb{Z}[(1+\\sqrt{d})/2] & d \\equiv 1 \\pmod 4 \\end{cases}`}</MathBlock>
            </div>
          </Example>
        </section>

        {/* Factorization in Number Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factorization in Number Rings</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">The Problem</h4>
            <p className="text-dark-300">
              Many rings of integers are NOT UFDs! The class group measures the failure
              of unique factorization.
            </p>
          </div>

          <Example title="Non-unique Factorization">
            <div className="bg-dark-900 p-4 rounded">
              <p>In <Math>{'\\mathbb{Z}[\\sqrt{-5}]'}</Math>:</p>
              <p className="mt-2"><Math>{'6 = 2 \\cdot 3 = (1+\\sqrt{-5})(1-\\sqrt{-5})'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                All four factors are irreducible but not prime.
              </p>
            </div>
          </Example>

          <Theorem title="Ideal Factorization">
            <p>
              In the ring of integers of a number field, every nonzero ideal factors uniquely
              into prime ideals (even when elements don't factor uniquely).
            </p>
          </Theorem>
        </section>

        {/* Primes in Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Prime Splitting</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">How Primes Behave</h4>
            <p className="text-dark-300 mb-2">
              A prime <Math>{'p \\in \\mathbb{Z}'}</Math> can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-dark-300">
              <li><strong>Split:</strong> Factor into distinct primes</li>
              <li><strong>Remain inert:</strong> Stay prime</li>
              <li><strong>Ramify:</strong> Have a repeated factor</li>
            </ul>
          </div>

          <Example title="Gaussian Integers">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>In <Math>{'\\mathbb{Z}[i]'}</Math>:</p>
              <p>• <Math>{'2 = (1+i)(1-i) = -i(1+i)^2'}</Math> (ramifies)</p>
              <p>• <Math>{'5 = (2+i)(2-i)'}</Math> (splits)</p>
              <p>• <Math>{'3'}</Math> remains prime (inert)</p>
              <p className="text-dark-400 text-sm mt-2">
                Pattern: <Math>{'p'}</Math> splits iff <Math>{'p \\equiv 1 \\pmod 4'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Fermat's Last Theorem</h4>
              <p className="text-dark-300 text-sm">
                Proved using sophisticated algebraic number theory (Wiles, 1995).
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Quadratic Reciprocity</h4>
              <p className="text-dark-300 text-sm">
                Elegant proofs using cyclotomic fields.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Sums of Squares</h4>
              <p className="text-dark-300 text-sm">
                Which primes are sums of two squares? Use <Math>{'\\mathbb{Z}[i]'}</Math>.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Class Field Theory</h4>
              <p className="text-dark-300 text-sm">
                Describes abelian extensions via the class group.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Algebraic integers</strong> are roots of monic integer polynomials.
            </li>
            <li>
              <strong>Number fields</strong> are finite extensions of <Math>{'\\mathbb{Q}'}</Math>.
            </li>
            <li>
              Rings of integers often fail unique factorization.
            </li>
            <li>
              <strong>Ideals</strong> always factor uniquely in Dedekind domains.
            </li>
            <li>
              Primes can split, remain inert, or ramify in extensions.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
