import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { ConstructionsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section41() {
  return (
    <LessonLayout sectionId={41}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Geometric constructions</strong> with compass and straightedge have fascinated
            mathematicians for millennia. Field extensions reveal which constructions are possible
            and prove the impossibility of classic problems.
          </p>
        </section>

        {/* Constructible Numbers */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Constructible Numbers</h3>

          <Definition title="Constructible Number">
            <p>
              A real number <Math>{'\\alpha'}</Math> is <strong>constructible</strong> if a line
              segment of length <Math>{'|\\alpha|'}</Math> can be constructed from a unit segment
              using compass and straightedge.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Basic Constructions</h4>
            <ul className="space-y-2 text-dark-300">
              <li>Given <Math>{'a, b'}</Math>: can construct <Math>{'a + b, a - b, ab, a/b'}</Math></li>
              <li>Given <Math>{'a > 0'}</Math>: can construct <Math>{'\\sqrt{a}'}</Math></li>
            </ul>
          </div>

          <Theorem title="Field of Constructible Numbers">
            <p>
              The constructible numbers form a field closed under square roots.
            </p>
          </Theorem>
        </section>

        {/* Algebraic Criterion */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Algebraic Criterion</h3>

          <Theorem title="Constructibility Criterion">
            <p>
              <Math>{'\\alpha \\in \\mathbb{R}'}</Math> is constructible iff <Math>{'[\\mathbb{Q}(\\alpha):\\mathbb{Q}]'}</Math>
              is a power of 2.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Why powers of 2?</strong> Each compass-straightedge operation solves at most
              a quadratic equation, so extensions have degree 1 or 2. By the tower law, the total
              degree is a product of such factors: <Math>{'2^n'}</Math>.
            </p>
          </div>
        </section>

        {/* Impossible Constructions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Impossible Constructions</h3>

          <div className="space-y-4">
            <div className="card border-l-4 border-red-500">
              <h4 className="font-semibold text-red-400 mb-2">Doubling the Cube</h4>
              <p className="text-dark-300">
                Construct a cube with double the volume of a given cube.
              </p>
              <p className="text-dark-400 text-sm mt-2">
                Requires <Math>{'\\sqrt[3]{2}'}</Math>, which has degree 3 over <Math>{'\\mathbb{Q}'}</Math>.
                Since 3 is not a power of 2, impossible!
              </p>
            </div>

            <div className="card border-l-4 border-red-500">
              <h4 className="font-semibold text-red-400 mb-2">Trisecting an Angle</h4>
              <p className="text-dark-300">
                Trisect an arbitrary angle with compass and straightedge.
              </p>
              <p className="text-dark-400 text-sm mt-2">
                Trisecting 60° requires <Math>{'\\cos(20°)'}</Math>, which satisfies a degree-3
                irreducible polynomial. Impossible!
              </p>
            </div>

            <div className="card border-l-4 border-red-500">
              <h4 className="font-semibold text-red-400 mb-2">Squaring the Circle</h4>
              <p className="text-dark-300">
                Construct a square with area equal to a given circle.
              </p>
              <p className="text-dark-400 text-sm mt-2">
                Requires <Math>{'\\sqrt{\\pi}'}</Math>, but <Math>{'\\pi'}</Math> is transcendental
                (not even algebraic!). Impossible!
              </p>
            </div>
          </div>
        </section>

        {/* Regular Polygons */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Constructible Regular Polygons</h3>

          <Theorem title="Gauss-Wantzel Theorem">
            <p>
              A regular <Math>n</Math>-gon is constructible iff <Math>n</Math> is of the form:
            </p>
            <MathBlock>{'n = 2^k p_1 p_2 \\cdots p_m'}</MathBlock>
            <p className="mt-2">
              where each <Math>{'p_i'}</Math> is a distinct <strong>Fermat prime</strong>: <Math>{'p = 2^{2^j} + 1'}</Math>.
            </p>
          </Theorem>

          <Example title="Fermat Primes">
            <div className="bg-dark-900 p-4 rounded">
              <p>Known Fermat primes: 3, 5, 17, 257, 65537</p>
              <p className="mt-2">Constructible polygons include:</p>
              <ul className="list-disc list-inside text-dark-300 mt-2">
                <li><Math>n</Math> = 3, 4, 5, 6, 8, 10, 12, 15, 16, 17, 20, ...</li>
                <li>NOT: 7, 9, 11, 13, 14, 18, 19, ...</li>
              </ul>
            </div>
          </Example>

          <div className="callout-info">
            <p>
              <strong>Gauss's achievement:</strong> At age 19, Gauss proved the regular 17-gon
              is constructible, the first new result in 2000 years!
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <Math>{'\\alpha'}</Math> is constructible iff <Math>{'[\\mathbb{Q}(\\alpha):\\mathbb{Q}] = 2^n'}</Math>.
            </li>
            <li>
              <strong>Impossible:</strong> doubling cube, trisecting angle, squaring circle.
            </li>
            <li>
              Regular <Math>n</Math>-gon constructible iff <Math>n</Math> involves only powers of 2 and Fermat primes.
            </li>
            <li>
              Only 5 Fermat primes are known.
            </li>
            <li>
              Field theory resolves ancient geometric questions.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <ConstructionsQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
