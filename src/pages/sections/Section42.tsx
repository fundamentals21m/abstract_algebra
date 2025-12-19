import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section42() {
  return (
    <LessonLayout sectionId={42}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Finite fields</strong> have finitely many elements and are completely classified.
            For each prime power <Math>{'q = p^n'}</Math>, there is exactly one finite field of order
            <Math>q</Math>, denoted <Math>{'\\mathbb{F}_q'}</Math> or <Math>{'GF(q)'}</Math>.
          </p>
        </section>

        {/* Classification */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Classification of Finite Fields</h3>

          <Theorem title="Existence and Uniqueness">
            <p>
              For every prime <Math>p</Math> and positive integer <Math>n</Math>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>There exists a field of order <Math>{'p^n'}</Math></li>
              <li>Any two fields of order <Math>{'p^n'}</Math> are isomorphic</li>
              <li>Every finite field has order <Math>{'p^n'}</Math> for some prime <Math>p</Math></li>
            </ul>
          </Theorem>

          <Example title="Small Finite Fields">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{F}_2'}</Math></p>
                <p className="text-dark-300"><Math>{'\\{0, 1\\}'}</Math> with mod 2 arithmetic</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{F}_4'}</Math></p>
                <p className="text-dark-300"><Math>{'\\{0, 1, \\alpha, \\alpha+1\\}'}</Math> where <Math>{'\\alpha^2 + \\alpha + 1 = 0'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{F}_8'}</Math></p>
                <p className="text-dark-300"><Math>{'\\mathbb{F}_2[x]/(x^3 + x + 1)'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Construction */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Constructing Finite Fields</h3>

          <Theorem title="Construction via Irreducible Polynomials">
            <p>
              If <Math>{'f(x) \\in \\mathbb{F}_p[x]'}</Math> is irreducible of degree <Math>n</Math>:
            </p>
            <MathBlock>{'\\mathbb{F}_{p^n} \\cong \\mathbb{F}_p[x]/(f(x))'}</MathBlock>
          </Theorem>

          <Example title="Constructing F₈">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'f(x) = x^3 + x + 1'}</Math> is irreducible over <Math>{'\\mathbb{F}_2'}</Math></p>
              <p className="mt-2"><Math>{'\\mathbb{F}_8 = \\mathbb{F}_2[x]/(x^3 + x + 1)'}</Math></p>
              <p className="mt-2 text-dark-300">Elements: <Math>{'\\{0, 1, \\alpha, \\alpha^2, \\alpha+1, \\alpha^2+1, \\alpha^2+\\alpha, \\alpha^2+\\alpha+1\\}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">where <Math>{'\\alpha^3 = \\alpha + 1'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Multiplicative Group */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Multiplicative Structure</h3>

          <Theorem title="Cyclic Multiplicative Group">
            <p>
              The multiplicative group <Math>{'\\mathbb{F}_q^*'}</Math> is cyclic of order <Math>{'q - 1'}</Math>.
            </p>
          </Theorem>

          <Definition title="Primitive Element">
            <p>
              A <strong>primitive element</strong> (or primitive root) is a generator of <Math>{'\\mathbb{F}_q^*'}</Math>.
            </p>
          </Definition>

          <Example title="Primitive Elements in F₇">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{F}_7^* = \\{1, 2, 3, 4, 5, 6\\}'}</Math> has order 6</p>
              <p className="mt-2">Powers of 3: <Math>{'3^1=3, 3^2=2, 3^3=6, 3^4=4, 3^5=5, 3^6=1'}</Math></p>
              <p className="text-primary-400 mt-2">3 is a primitive element!</p>
            </div>
          </Example>
        </section>

        {/* Frobenius */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Frobenius Automorphism</h3>

          <Theorem title="Frobenius Automorphism">
            <p>
              The map <Math>{'\\phi: \\mathbb{F}_{p^n} \\to \\mathbb{F}_{p^n}'}</Math> defined by
              <Math>{'\\phi(x) = x^p'}</Math> is a field automorphism fixing <Math>{'\\mathbb{F}_p'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Properties</h4>
            <ul className="space-y-2 text-dark-300">
              <li><Math>{'\\phi'}</Math> has order <Math>n</Math></li>
              <li><Math>{'\\text{Gal}(\\mathbb{F}_{p^n}/\\mathbb{F}_p) = \\langle \\phi \\rangle \\cong \\mathbb{Z}_n'}</Math></li>
              <li>Fixed field of <Math>{'\\phi^k'}</Math> is <Math>{'\\mathbb{F}_{p^{\\gcd(k,n)}}'}</Math></li>
            </ul>
          </div>
        </section>

        {/* Subfields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Subfield Structure</h3>

          <Theorem title="Subfield Criterion">
            <p>
              <Math>{'\\mathbb{F}_{p^m} \\subseteq \\mathbb{F}_{p^n}'}</Math> iff <Math>{'m | n'}</Math>.
            </p>
          </Theorem>

          <Example title="Subfields of F₆₄">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{F}_{64} = \\mathbb{F}_{2^6}'}</Math></p>
              <p className="mt-2">Subfields: <Math>{'\\mathbb{F}_2 \\subset \\mathbb{F}_4 \\subset \\mathbb{F}_{64}'}</Math></p>
              <p className="mt-2">Also: <Math>{'\\mathbb{F}_2 \\subset \\mathbb{F}_8 \\subset \\mathbb{F}_{64}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                Divisors of 6: 1, 2, 3, 6 → subfields <Math>{'\\mathbb{F}_2, \\mathbb{F}_4, \\mathbb{F}_8, \\mathbb{F}_{64}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Coding Theory</h4>
              <p className="text-dark-300 text-sm">
                Reed-Solomon codes use <Math>{'\\mathbb{F}_{2^8}'}</Math> for CD/DVD error correction.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Cryptography</h4>
              <p className="text-dark-300 text-sm">
                AES operates in <Math>{'\\mathbb{F}_{2^8}'}</Math>; elliptic curve crypto uses large <Math>{'\\mathbb{F}_p'}</Math>.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Combinatorics</h4>
              <p className="text-dark-300 text-sm">
                Finite projective planes, Latin squares from finite field constructions.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Computer Science</h4>
              <p className="text-dark-300 text-sm">
                Hash functions, random number generators, polynomial hashing.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Finite fields exist only for prime power orders: <Math>{'|\\mathbb{F}| = p^n'}</Math>.
            </li>
            <li>
              Unique up to isomorphism: <Math>{'\\mathbb{F}_q \\cong \\mathbb{F}_p[x]/(f)'}</Math>.
            </li>
            <li>
              <Math>{'\\mathbb{F}_q^*'}</Math> is cyclic of order <Math>{'q - 1'}</Math>.
            </li>
            <li>
              <strong>Frobenius:</strong> <Math>{'x \\mapsto x^p'}</Math> generates <Math>{'\\text{Gal}(\\mathbb{F}_{p^n}/\\mathbb{F}_p)'}</Math>.
            </li>
            <li>
              Subfields correspond to divisors: <Math>{'\\mathbb{F}_{p^m} \\subseteq \\mathbb{F}_{p^n}'}</Math> iff <Math>{'m | n'}</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
