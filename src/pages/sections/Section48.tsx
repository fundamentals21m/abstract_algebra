import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { GaloisQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section48() {
  return (
    <LessonLayout sectionId={48}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Cyclotomic extensions</strong> are obtained by adjoining roots of unity.
            Their Galois groups are beautifully described by modular arithmetic, connecting
            number theory with field theory.
          </p>
        </section>

        {/* Roots of Unity */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Roots of Unity</h3>

          <Definition title="n-th Root of Unity">
            <p>
              An <strong>n-th root of unity</strong> is a root of <Math>{'x^n - 1'}</Math>.
              The <strong>primitive</strong> n-th roots are those of order exactly <Math>n</Math>:
            </p>
            <MathBlock>{'\\zeta_n = e^{2\\pi i/n}'}</MathBlock>
          </Definition>

          <Example title="Roots of Unity">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">n = 4</p>
                <p className="text-dark-300">
                  4th roots: <Math>{'1, i, -1, -i'}</Math>
                </p>
                <p className="text-dark-400 text-sm">Primitive: <Math>{'i, -i'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">n = 6</p>
                <p className="text-dark-300">
                  6th roots: <Math>{'1, \\zeta_6, \\zeta_6^2, -1, \\zeta_6^4, \\zeta_6^5'}</Math>
                </p>
                <p className="text-dark-400 text-sm">
                  Primitive: <Math>{'\\zeta_6, \\zeta_6^5'}</Math> where <Math>{'\\zeta_6 = e^{\\pi i/3}'}</Math>
                </p>
              </div>
            </div>
          </Example>
        </section>

        {/* Cyclotomic Polynomials */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cyclotomic Polynomials</h3>

          <Definition title="Cyclotomic Polynomial">
            <p>
              The <strong>n-th cyclotomic polynomial</strong> <Math>{'\\Phi_n(x)'}</Math> is the minimal
              polynomial of primitive n-th roots of unity over <Math>{'\\mathbb{Q}'}</Math>:
            </p>
            <MathBlock>{'\\Phi_n(x) = \\prod_{\\gcd(k,n)=1, 1 \\leq k \\leq n} (x - \\zeta_n^k)'}</MathBlock>
          </Definition>

          <Theorem title="Properties of Φₙ">
            <ul className="list-disc list-inside space-y-1">
              <li><Math>{'\\deg(\\Phi_n) = \\phi(n)'}</Math> (Euler's totient)</li>
              <li><Math>{'\\Phi_n(x) \\in \\mathbb{Z}[x]'}</Math> (integer coefficients)</li>
              <li><Math>{'x^n - 1 = \\prod_{d|n} \\Phi_d(x)'}</Math></li>
              <li><Math>{'\\Phi_n'}</Math> is irreducible over <Math>{'\\mathbb{Q}'}</Math></li>
            </ul>
          </Theorem>

          <Example title="First Cyclotomic Polynomials">
            <div className="bg-dark-900 p-4 rounded">
              <div className="grid md:grid-cols-2 gap-4 text-dark-300">
                <div>
                  <p><Math>{'\\Phi_1(x) = x - 1'}</Math></p>
                  <p><Math>{'\\Phi_2(x) = x + 1'}</Math></p>
                  <p><Math>{'\\Phi_3(x) = x^2 + x + 1'}</Math></p>
                  <p><Math>{'\\Phi_4(x) = x^2 + 1'}</Math></p>
                </div>
                <div>
                  <p><Math>{'\\Phi_5(x) = x^4 + x^3 + x^2 + x + 1'}</Math></p>
                  <p><Math>{'\\Phi_6(x) = x^2 - x + 1'}</Math></p>
                  <p><Math>{'\\Phi_8(x) = x^4 + 1'}</Math></p>
                  <p><Math>{'\\Phi_{12}(x) = x^4 - x^2 + 1'}</Math></p>
                </div>
              </div>
            </div>
          </Example>
        </section>

        {/* Cyclotomic Fields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cyclotomic Fields</h3>

          <Definition title="Cyclotomic Field">
            <p>
              The <strong>n-th cyclotomic field</strong> is <Math>{'\\mathbb{Q}(\\zeta_n)'}</Math>,
              the splitting field of <Math>{'x^n - 1'}</Math> over <Math>{'\\mathbb{Q}'}</Math>.
            </p>
          </Definition>

          <Theorem title="Structure of Cyclotomic Extensions">
            <p>
              <Math>{'\\mathbb{Q}(\\zeta_n)/\\mathbb{Q}'}</Math> is a Galois extension with:
            </p>
            <MathBlock>{'[\\mathbb{Q}(\\zeta_n):\\mathbb{Q}] = \\phi(n)'}</MathBlock>
            <MathBlock>{'\\text{Gal}(\\mathbb{Q}(\\zeta_n)/\\mathbb{Q}) \\cong (\\mathbb{Z}/n\\mathbb{Z})^*'}</MathBlock>
          </Theorem>

          <Example title="Galois Groups of Cyclotomic Fields">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}(\\zeta_5)'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'\\text{Gal} \\cong (\\mathbb{Z}/5\\mathbb{Z})^* \\cong \\mathbb{Z}_4'}</Math>
                </p>
                <p className="text-dark-400 text-sm">Cyclic group generated by <Math>{'\\sigma: \\zeta_5 \\mapsto \\zeta_5^2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}(\\zeta_8)'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'\\text{Gal} \\cong (\\mathbb{Z}/8\\mathbb{Z})^* \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math>
                </p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}(\\zeta_p)'}</Math> (p prime)</p>
                <p className="text-dark-300">
                  <Math>{'\\text{Gal} \\cong \\mathbb{Z}_{p-1}'}</Math> (cyclic)
                </p>
              </div>
            </div>
          </Example>
        </section>

        {/* Automorphism Description */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Galois Automorphisms</h3>

          <Theorem title="Automorphism Formula">
            <p>
              Each <Math>{'k \\in (\\mathbb{Z}/n\\mathbb{Z})^*'}</Math> corresponds to the automorphism:
            </p>
            <MathBlock>{'\\sigma_k: \\zeta_n \\mapsto \\zeta_n^k'}</MathBlock>
            <p className="mt-2">The isomorphism <Math>{'(\\mathbb{Z}/n\\mathbb{Z})^* \\to \\text{Gal}(\\mathbb{Q}(\\zeta_n)/\\mathbb{Q})'}</Math> is given by <Math>{'k \\mapsto \\sigma_k'}</Math>.</p>
          </Theorem>

          <Example title="Automorphisms of Q(ζ₅)">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'(\\mathbb{Z}/5\\mathbb{Z})^* = \\{1, 2, 3, 4\\}'}</Math></p>
              <ul className="list-disc list-inside text-dark-300 mt-2 space-y-1">
                <li><Math>{'\\sigma_1 = id'}</Math></li>
                <li><Math>{'\\sigma_2: \\zeta_5 \\mapsto \\zeta_5^2'}</Math></li>
                <li><Math>{'\\sigma_3: \\zeta_5 \\mapsto \\zeta_5^3'}</Math></li>
                <li><Math>{'\\sigma_4: \\zeta_5 \\mapsto \\zeta_5^4'}</Math> (complex conjugation!)</li>
              </ul>
              <p className="text-dark-400 text-sm mt-2">
                Note: <Math>{'\\sigma_4 = \\sigma_2^2'}</Math>, so <Math>{'\\sigma_2'}</Math> generates the group.
              </p>
            </div>
          </Example>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Regular Polygon Construction</h4>
              <p className="text-dark-300 text-sm">
                Regular n-gon is constructible iff <Math>{'\\phi(n)'}</Math> is a power of 2.
                This happens when <Math>n</Math> is a product of distinct Fermat primes and powers of 2.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Quadratic Subfields</h4>
              <p className="text-dark-300 text-sm">
                <Math>{'\\mathbb{Q}(\\sqrt{p}) \\subseteq \\mathbb{Q}(\\zeta_p)'}</Math> for odd prime <Math>p</Math>.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Cyclotomic polynomial:</strong> <Math>{'\\Phi_n'}</Math> has degree <Math>{'\\phi(n)'}</Math>.
            </li>
            <li>
              <Math>{'[\\mathbb{Q}(\\zeta_n):\\mathbb{Q}] = \\phi(n)'}</Math>.
            </li>
            <li>
              <strong>Galois group:</strong> <Math>{'\\text{Gal}(\\mathbb{Q}(\\zeta_n)/\\mathbb{Q}) \\cong (\\mathbb{Z}/n\\mathbb{Z})^*'}</Math>.
            </li>
            <li>
              Automorphisms: <Math>{'\\sigma_k: \\zeta_n \\mapsto \\zeta_n^k'}</Math> for <Math>{'\\gcd(k, n) = 1'}</Math>.
            </li>
            <li>
              Connects field theory, group theory, and number theory.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <GaloisQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
