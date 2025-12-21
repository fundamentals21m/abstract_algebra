import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math } from '../../components/common';
import { UFDQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section34() {
  return (
    <LessonLayout sectionId={34}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Unique factorization domains</strong> (UFDs) generalize the fundamental theorem
            of arithmetic: every nonzero non-unit factors uniquely (up to order and units) into
            irreducibles.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Unique Factorization Domains</h3>

          <Definition title="Unique Factorization Domain">
            <p>
              An integral domain <Math>D</Math> is a <strong>UFD</strong> if:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Every nonzero non-unit factors into irreducibles</li>
              <li>This factorization is unique up to order and associates</li>
            </ol>
          </Definition>

          <Example title="UFDs">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">Fundamental theorem of arithmetic</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'F[x]'}</Math> for field <Math>F</Math></p>
                <p className="text-dark-300">Unique factorization into irreducible polynomials</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}[i]'}</Math></p>
                <p className="text-dark-300">Gaussian integers</p>
              </div>
            </div>
          </Example>

          <Example title="Non-UFDs">
            <div className="bg-dark-900 p-4 rounded">
              <p className="font-semibold text-red-400"><Math>{'\\mathbb{Z}[\\sqrt{-5}]'}</Math></p>
              <p className="mt-2"><Math>{'6 = 2 \\cdot 3 = (1+\\sqrt{-5})(1-\\sqrt{-5})'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                Two genuinely different factorizations—not associates!
              </p>
            </div>
          </Example>
        </section>

        {/* Prime vs Irreducible */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Prime vs Irreducible in UFDs</h3>

          <Theorem title="Equivalence in UFDs">
            <p>
              In a UFD, an element is prime if and only if it is irreducible.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Why This Matters</h4>
            <p className="text-dark-300">
              In general integral domains, prime ⟹ irreducible, but not conversely.
              UFDs are precisely where these notions coincide.
            </p>
          </div>
        </section>

        {/* Hierarchy */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Hierarchy of Domains</h3>

          <div className="card">
            <p className="text-center text-dark-300">
              Fields ⊂ Euclidean Domains ⊂ PIDs ⊂ UFDs ⊂ Integral Domains
            </p>
          </div>

          <Theorem title="PID implies UFD">
            <p>
              Every principal ideal domain is a unique factorization domain.
            </p>
          </Theorem>

          <Example title="UFD but not PID">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{Z}[x]'}</Math> is a UFD but not a PID.</p>
              <p className="mt-2 text-dark-300">
                The ideal <Math>{'(2, x) = \\{2f + xg : f, g \\in \\mathbb{Z}[x]\\}'}</Math>
                is not principal.
              </p>
            </div>
          </Example>
        </section>

        {/* GCD in UFDs */}
        <section>
          <h3 className="text-xl font-semibold mb-4">GCD in UFDs</h3>

          <Theorem title="GCD Existence">
            <p>
              In a UFD, any two nonzero elements have a greatest common divisor.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Computing GCD</h4>
            <p className="text-dark-300">
              Factor both elements, then take the product of common prime factors
              with minimum exponents.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              UFDs have unique factorization into irreducibles.
            </li>
            <li>
              In UFDs: prime ⟺ irreducible.
            </li>
            <li>
              PID ⟹ UFD, but not conversely (<Math>{'\\mathbb{Z}[x]'}</Math>).
            </li>
            <li>
              GCDs exist in UFDs.
            </li>
            <li>
              Not all integral domains are UFDs (<Math>{'\\mathbb{Z}[\\sqrt{-5}]'}</Math>).
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
