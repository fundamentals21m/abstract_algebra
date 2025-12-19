import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section28() {
  return (
    <LessonLayout sectionId={28}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Factorization of polynomials</strong> extends the ideas of prime factorization
            from integers. Irreducible polynomials play the role of primes, and unique factorization
            holds over fields and many other rings.
          </p>
        </section>

        {/* Irreducible Polynomials */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Irreducible Polynomials</h3>

          <Definition title="Irreducible Polynomial">
            <p>
              A nonconstant polynomial <Math>{'f \\in F[x]'}</Math> is <strong>irreducible</strong>
              over field <Math>F</Math> if whenever <Math>{'f = gh'}</Math>, either <Math>g</Math> or
              <Math>h</Math> is constant (a unit).
            </p>
          </Definition>

          <Example title="Irreducibility Depends on Field">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'x^2 + 1'}</Math></p>
                <p className="text-dark-300">Irreducible over <Math>{'\\mathbb{R}'}</Math></p>
                <p className="text-dark-300">Reducible over <Math>{'\\mathbb{C}'}</Math>: <Math>{'(x+i)(x-i)'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'x^2 - 2'}</Math></p>
                <p className="text-dark-300">Irreducible over <Math>{'\\mathbb{Q}'}</Math></p>
                <p className="text-dark-300">Reducible over <Math>{'\\mathbb{R}'}</Math>: <Math>{'(x-\\sqrt{2})(x+\\sqrt{2})'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'x^2 + x + 1'}</Math></p>
                <p className="text-dark-300">Irreducible over <Math>{'\\mathbb{Z}_2'}</Math></p>
                <p className="text-dark-300">(Check: 0²+0+1=1, 1²+1+1=1≠0)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Unique Factorization */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Unique Factorization</h3>

          <Theorem title="Unique Factorization in F[x]">
            <p>
              Every nonconstant polynomial in <Math>{'F[x]'}</Math> (F a field) factors uniquely as:
            </p>
            <MathBlock>{'f = c \\cdot p_1 \\cdots p_k'}</MathBlock>
            <p className="mt-2">
              where <Math>c</Math> is a nonzero constant and each <Math>{'p_i'}</Math> is a monic
              irreducible polynomial. The factorization is unique up to order.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Key insight:</strong> <Math>{'F[x]'}</Math> is a Euclidean domain (with the
              division algorithm), hence a UFD.
            </p>
          </div>
        </section>

        {/* Testing Irreducibility */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Testing Irreducibility</h3>

          <Theorem title="Root Test for Low Degree">
            <p>
              A polynomial of degree 2 or 3 over a field <Math>F</Math> is irreducible iff it has no roots in <Math>F</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">For Higher Degrees</h4>
            <p className="text-dark-300">
              Degree ≥ 4 can be irreducible without roots (e.g., <Math>{'(x^2+1)(x^2+2)'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              has no rational roots but is reducible).
            </p>
          </div>

          <Theorem title="Eisenstein's Criterion">
            <p>
              Let <Math>{'f(x) = a_nx^n + \\cdots + a_0 \\in \\mathbb{Z}[x]'}</Math>. If there exists a prime <Math>p</Math> such that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'p | a_i'}</Math> for <Math>{'i < n'}</Math></li>
              <li><Math>{'p \\nmid a_n'}</Math></li>
              <li><Math>{'p^2 \\nmid a_0'}</Math></li>
            </ul>
            <p className="mt-2">then <Math>f</Math> is irreducible over <Math>{'\\mathbb{Q}'}</Math>.</p>
          </Theorem>

          <Example title="Eisenstein's Criterion">
            <div className="bg-dark-900 p-4 rounded space-y-3">
              <div>
                <p><Math>{'x^4 + 2x^3 + 2x^2 + 2x + 2'}</Math></p>
                <p className="text-dark-400">Use <Math>{'p = 2'}</Math>: irreducible over <Math>{'\\mathbb{Q}'}</Math></p>
              </div>
              <div>
                <p><Math>{'x^{p-1} + x^{p-2} + \\cdots + 1 = \\frac{x^p - 1}{x - 1}'}</Math></p>
                <p className="text-dark-400">Substitute <Math>{'x \\to x+1'}</Math>, apply Eisenstein</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Reduction mod p */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Reduction Modulo p</h3>

          <Theorem title="Reduction Criterion">
            <p>
              Let <Math>{'f \\in \\mathbb{Z}[x]'}</Math> be monic. If <Math>{'\\bar{f} \\in \\mathbb{Z}_p[x]'}</Math>
              is irreducible and has the same degree as <Math>f</Math>, then <Math>f</Math> is irreducible over <Math>{'\\mathbb{Q}'}</Math>.
            </p>
          </Theorem>

          <Example title="Using Reduction">
            <div className="bg-dark-900 p-4 rounded">
              <p>Is <Math>{'x^4 + x + 1'}</Math> irreducible over <Math>{'\\mathbb{Q}'}</Math>?</p>
              <p className="mt-2 text-dark-300">Reduce mod 2:</p>
              <p className="text-dark-400">Check it has no roots in <Math>{'\\mathbb{Z}_2'}</Math> and doesn't factor as two quadratics</p>
              <p className="text-primary-400 mt-2">Yes, irreducible!</p>
            </div>
          </Example>
        </section>

        {/* Factoring over Finite Fields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factoring over Finite Fields</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">For Z_p</h4>
            <ul className="space-y-2 text-dark-300">
              <li>Test all roots (only <Math>p</Math> possibilities)</li>
              <li>For degree 4+: test all monic polynomials of lower degree</li>
              <li>Algorithms: Berlekamp, Cantor-Zassenhaus</li>
            </ul>
          </div>

          <Example title="Factor x⁴ + x + 1 over Z₂">
            <div className="bg-dark-900 p-4 rounded">
              <p>No roots: f(0) = 1, f(1) = 1</p>
              <p className="mt-2">Check quadratic factors over <Math>{'\\mathbb{Z}_2'}</Math>:</p>
              <p className="text-dark-400">Only irreducible quadratic is <Math>{'x^2 + x + 1'}</Math></p>
              <p className="text-dark-400"><Math>{'(x^2 + x + 1)^2 = x^4 + x^2 + 1 \\neq x^4 + x + 1'}</Math></p>
              <p className="text-primary-400 mt-2">So <Math>{'x^4 + x + 1'}</Math> is irreducible over <Math>{'\\mathbb{Z}_2'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Irreducible polynomials can't be factored (over a given field).
            </li>
            <li>
              <Math>{'F[x]'}</Math> has unique factorization into irreducibles.
            </li>
            <li>
              Degree 2-3: irreducible iff no roots.
            </li>
            <li>
              <strong>Eisenstein:</strong> useful criterion for irreducibility over <Math>{'\\mathbb{Q}'}</Math>.
            </li>
            <li>
              <strong>Reduction mod p:</strong> another way to prove irreducibility.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
