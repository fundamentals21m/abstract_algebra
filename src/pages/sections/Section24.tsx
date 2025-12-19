import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section24() {
  return (
    <LessonLayout sectionId={24}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Fermat's Little Theorem</strong> and <strong>Euler's Theorem</strong> are
            fundamental results connecting number theory to group theory. They have crucial
            applications in cryptography, primality testing, and modular arithmetic.
          </p>
        </section>

        {/* Fermat's Little Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Fermat's Little Theorem</h3>

          <Theorem title="Fermat's Little Theorem">
            <p>
              If <Math>p</Math> is prime and <Math>{'a \\not\\equiv 0 \\pmod p'}</Math>, then:
            </p>
            <MathBlock>{'a^{p-1} \\equiv 1 \\pmod p'}</MathBlock>
            <p className="mt-2">Equivalently, for any integer <Math>a</Math>:</p>
            <MathBlock>{'a^p \\equiv a \\pmod p'}</MathBlock>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Proof (Group Theory)</h4>
            <p className="text-dark-300">
              The multiplicative group <Math>{'\\mathbb{Z}_p^*'}</Math> has order <Math>{'p-1'}</Math>.
              By Lagrange's theorem, every element's order divides <Math>{'p-1'}</Math>.
              Thus <Math>{'a^{p-1} = 1'}</Math> in <Math>{'\\mathbb{Z}_p^*'}</Math>.
            </p>
          </div>

          <Example title="Computing with Fermat">
            <p className="mb-3">
              Calculate <Math>{'7^{222} \\mod 11'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>By Fermat: <Math>{'7^{10} \\equiv 1 \\pmod{11}'}</Math></p>
              <p><Math>{'222 = 10 \\cdot 22 + 2'}</Math></p>
              <p><Math>{'7^{222} = (7^{10})^{22} \\cdot 7^2 \\equiv 1^{22} \\cdot 49 \\equiv 49 \\mod 11'}</Math></p>
              <p className="text-primary-400"><Math>{'7^{222} \\equiv 5 \\pmod{11}'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Euler's Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Euler's Theorem</h3>

          <Definition title="Euler's Totient Function">
            <p>
              <strong>Euler's totient function</strong> <Math>{'\\phi(n)'}</Math> counts integers
              from 1 to <Math>n</Math> that are coprime to <Math>n</Math>:
            </p>
            <MathBlock>{'\\phi(n) = |\\{k : 1 \\leq k \\leq n, \\gcd(k, n) = 1\\}| = |\\mathbb{Z}_n^*|'}</MathBlock>
          </Definition>

          <Example title="Computing φ(n)">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { n: 1, phi: 1 },
                { n: 2, phi: 1 },
                { n: 6, phi: 2 },
                { n: 8, phi: 4 },
                { n: 9, phi: 6 },
                { n: 10, phi: 4 },
                { n: 12, phi: 4 },
                { n: 'p', phi: 'p-1' },
              ].map(({ n, phi }) => (
                <div key={n} className="bg-dark-900 p-2 rounded text-center text-sm">
                  <Math>{`\\phi(${n}) = ${phi}`}</Math>
                </div>
              ))}
            </div>
          </Example>

          <Theorem title="Euler's Theorem">
            <p>
              If <Math>{'\\gcd(a, n) = 1'}</Math>, then:
            </p>
            <MathBlock>{'a^{\\phi(n)} \\equiv 1 \\pmod n'}</MathBlock>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Note:</strong> Fermat's Little Theorem is a special case since <Math>{'\\phi(p) = p - 1'}</Math>
              for prime <Math>p</Math>.
            </p>
          </div>
        </section>

        {/* Computing φ */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Computing Euler's Totient</h3>

          <Theorem title="Formula for φ(n)">
            <p>
              If <Math>{'n = p_1^{e_1} p_2^{e_2} \\cdots p_k^{e_k}'}</Math>, then:
            </p>
            <MathBlock>{'\\phi(n) = n \\prod_{p | n} \\left(1 - \\frac{1}{p}\\right) = \\prod_{i=1}^k p_i^{e_i - 1}(p_i - 1)'}</MathBlock>
          </Theorem>

          <Example title="Computing φ(360)">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'360 = 2^3 \\cdot 3^2 \\cdot 5'}</Math></p>
              <p><Math>{'\\phi(360) = 360 \\cdot (1 - \\frac{1}{2})(1 - \\frac{1}{3})(1 - \\frac{1}{5})'}</Math></p>
              <p><Math>{'= 360 \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{4}{5}'}</Math></p>
              <p className="text-primary-400"><Math>{'= 96'}</Math></p>
            </div>
          </Example>

          <Theorem title="Multiplicativity">
            <p>
              If <Math>{'\\gcd(m, n) = 1'}</Math>, then <Math>{'\\phi(mn) = \\phi(m)\\phi(n)'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="card mb-4">
            <h4 className="font-semibold text-primary-400 mb-2">Modular Inverse</h4>
            <p className="text-dark-300 mb-2">
              If <Math>{'\\gcd(a, n) = 1'}</Math>, the modular inverse of <Math>a</Math> is:
            </p>
            <MathBlock>{'a^{-1} \\equiv a^{\\phi(n) - 1} \\pmod n'}</MathBlock>
            <p className="text-dark-400 text-sm">
              For prime <Math>n = p</Math>: <Math>{'a^{-1} \\equiv a^{p-2} \\pmod p'}</Math>
            </p>
          </div>

          <Example title="Finding Inverse">
            <p className="mb-3">
              Find <Math>{'7^{-1} \\mod 13'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>By Fermat: <Math>{'7^{-1} \\equiv 7^{11} \\pmod{13}'}</Math></p>
              <p><Math>{'7^2 = 49 \\equiv 10'}</Math></p>
              <p><Math>{'7^4 \\equiv 100 \\equiv 9'}</Math></p>
              <p><Math>{'7^8 \\equiv 81 \\equiv 3'}</Math></p>
              <p><Math>{'7^{11} = 7^8 \\cdot 7^2 \\cdot 7 \\equiv 3 \\cdot 10 \\cdot 7 = 210 \\equiv 2'}</Math></p>
              <p className="text-primary-400">Check: <Math>{'7 \\cdot 2 = 14 \\equiv 1 \\pmod{13}'}</Math> ✓</p>
            </div>
          </Example>

          <div className="card">
            <h4 className="font-semibold text-primary-400 mb-2">Primality Testing</h4>
            <p className="text-dark-300">
              If <Math>{'a^{n-1} \\not\\equiv 1 \\pmod n'}</Math> for some <Math>a</Math> coprime to <Math>n</Math>,
              then <Math>n</Math> is <strong>definitely composite</strong>.
            </p>
            <p className="text-dark-400 text-sm mt-2">
              This is the basis for probabilistic primality tests like Miller-Rabin.
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold text-primary-400 mb-2">Computing Large Powers</h4>
            <p className="text-dark-300">
              To compute <Math>{'a^k \\mod n'}</Math>, reduce the exponent:
              <Math>{'a^k \\equiv a^{k \\mod \\phi(n)} \\pmod n'}</Math> (when <Math>{'\\gcd(a,n)=1'}</Math>).
            </p>
          </div>
        </section>

        {/* Pseudoprimes */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Pseudoprimes and Carmichael Numbers</h3>

          <Definition title="Fermat Pseudoprime">
            <p>
              A composite number <Math>n</Math> is a <strong>Fermat pseudoprime</strong> to base <Math>a</Math>
              if <Math>{'a^{n-1} \\equiv 1 \\pmod n'}</Math>.
            </p>
          </Definition>

          <Definition title="Carmichael Number">
            <p>
              A <strong>Carmichael number</strong> is a composite <Math>n</Math> that is a pseudoprime
              to every base <Math>a</Math> coprime to <Math>n</Math>.
            </p>
          </Definition>

          <Example title="Carmichael Numbers">
            <div className="bg-dark-900 p-4 rounded">
              <p>First few Carmichael numbers:</p>
              <p className="text-primary-400 mt-2">561, 1105, 1729, 2465, 2821, ...</p>
              <p className="text-dark-400 text-sm mt-2">
                <Math>{'561 = 3 \\cdot 11 \\cdot 17'}</Math> satisfies <Math>{'a^{560} \\equiv 1 \\pmod{561}'}</Math>
                for all <Math>{'\\gcd(a, 561) = 1'}</Math>.
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Fermat:</strong> <Math>{'a^{p-1} \\equiv 1 \\pmod p'}</Math> for prime <Math>p</Math>.
            </li>
            <li>
              <strong>Euler:</strong> <Math>{'a^{\\phi(n)} \\equiv 1 \\pmod n'}</Math> when <Math>{'\\gcd(a,n) = 1'}</Math>.
            </li>
            <li>
              <Math>{'\\phi(n) = n \\prod_{p|n}(1 - 1/p)'}</Math>; multiplicative for coprime arguments.
            </li>
            <li>
              These theorems enable fast modular exponentiation and inverses.
            </li>
            <li>
              Carmichael numbers fool Fermat-based primality tests.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
