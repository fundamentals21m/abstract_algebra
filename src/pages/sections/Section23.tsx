import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section23() {
  return (
    <LessonLayout sectionId={23}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Integral domains</strong> are rings that behave like the integers: no zero divisors.
            This property enables cancellation and unique factorization, which are essential for
            polynomial arithmetic and number theory.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Integral Domains</h3>

          <Definition title="Integral Domain">
            <p>
              An <strong>integral domain</strong> is a commutative ring with unity <Math>{'1 \\neq 0'}</Math>
              that has no zero divisors:
            </p>
            <MathBlock>{'ab = 0 \\implies a = 0 \\text{ or } b = 0'}</MathBlock>
          </Definition>

          <Example title="Integral Domains">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">The prototypical integral domain</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}[x]'}</Math></p>
                <p className="text-dark-300">Polynomials with integer coefficients</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}[i]'}</Math></p>
                <p className="text-dark-300">Gaussian integers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Any field</p>
                <p className="text-dark-300">Fields have no zero divisors</p>
              </div>
            </div>
          </Example>

          <Example title="Non-Integral Domains">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-red-400"><Math>{'\\mathbb{Z}_6'}</Math></p>
                <p className="text-dark-300"><Math>{'2 \\cdot 3 = 0'}</Math> but <Math>{'2 \\neq 0'}</Math> and <Math>{'3 \\neq 0'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-red-400"><Math>{'\\mathbb{Z} \\times \\mathbb{Z}'}</Math></p>
                <p className="text-dark-300"><Math>{'(1,0)(0,1) = (0,0)'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-red-400"><Math>{'M_2(\\mathbb{R})'}</Math></p>
                <p className="text-dark-300">Has zero divisors (and noncommutative)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Cancellation */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cancellation Property</h3>

          <Theorem title="Cancellation in Integral Domains">
            <p>
              In an integral domain, if <Math>{'a \\neq 0'}</Math> and <Math>{'ab = ac'}</Math>, then <Math>{'b = c'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Proof</h4>
            <p className="text-dark-300">
              <Math>{'ab = ac \\implies ab - ac = 0 \\implies a(b - c) = 0'}</Math>.
            </p>
            <p className="text-dark-300 mt-2">
              Since <Math>{'a \\neq 0'}</Math> and no zero divisors, <Math>{'b - c = 0'}</Math>, so <Math>{'b = c'}</Math>.
            </p>
          </div>

          <div className="callout-info">
            <p>
              <strong>Warning:</strong> In <Math>{'\\mathbb{Z}_{12}'}</Math>, <Math>{'3 \\cdot 2 = 3 \\cdot 6 = 6'}</Math>
              but <Math>{'2 \\neq 6'}</Math>. Cancellation fails because 3 is a zero divisor.
            </p>
          </div>
        </section>

        {/* Finite Integral Domains */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Finite Integral Domains</h3>

          <Theorem title="Finite Integral Domain is a Field">
            <p>
              Every finite integral domain is a field.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Proof Idea</h4>
            <p className="text-dark-300">
              For <Math>{'a \\neq 0'}</Math>, the map <Math>{'x \\mapsto ax'}</Math> is injective (cancellation).
              On a finite set, injective implies surjective.
              So <Math>{'ax = 1'}</Math> for some <Math>x</Math>, meaning <Math>a</Math> is a unit.
            </p>
          </div>

          <Example title="Z_p is a Field">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{Z}_p'}</Math> for prime <Math>p</Math> is an integral domain:</p>
              <ul className="list-disc list-inside text-dark-300 mt-2">
                <li>Commutative ring with unity</li>
                <li>No zero divisors (if <Math>{'ab \\equiv 0 \\pmod p'}</Math>, then <Math>{'p | ab'}</Math>,
                  so <Math>{'p | a'}</Math> or <Math>{'p | b'}</Math>)</li>
                <li>Finite, so it's a field!</li>
              </ul>
            </div>
          </Example>
        </section>

        {/* Divisibility */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Divisibility</h3>

          <Definition title="Divides">
            <p>
              In an integral domain <Math>D</Math>, we say <Math>a</Math> <strong>divides</strong> <Math>b</Math>
              (written <Math>{'a | b'}</Math>) if <Math>{'b = ac'}</Math> for some <Math>{'c \\in D'}</Math>.
            </p>
          </Definition>

          <Definition title="Associates">
            <p>
              Elements <Math>a</Math> and <Math>b</Math> are <strong>associates</strong> if
              <Math>{'a = ub'}</Math> for some unit <Math>u</Math>. Equivalently, <Math>{'a | b'}</Math> and <Math>{'b | a'}</Math>.
            </p>
          </Definition>

          <Example title="Associates in Z[i]">
            <div className="bg-dark-900 p-4 rounded">
              <p>Units in <Math>{'\\mathbb{Z}[i]'}</Math>: <Math>{'\\{1, -1, i, -i\\}'}</Math></p>
              <p className="mt-2">Associates of <Math>{'2 + i'}</Math>:</p>
              <p className="text-dark-300 mt-1">
                <Math>{'2+i, -(2+i) = -2-i, i(2+i) = -1+2i, -i(2+i) = 1-2i'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Irreducibles and Primes */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Irreducibles and Primes</h3>

          <Definition title="Irreducible">
            <p>
              A nonzero nonunit <Math>p</Math> is <strong>irreducible</strong> if whenever <Math>{'p = ab'}</Math>,
              either <Math>a</Math> or <Math>b</Math> is a unit.
            </p>
          </Definition>

          <Definition title="Prime">
            <p>
              A nonzero nonunit <Math>p</Math> is <strong>prime</strong> if whenever <Math>{'p | ab'}</Math>,
              either <Math>{'p | a'}</Math> or <Math>{'p | b'}</Math>.
            </p>
          </Definition>

          <Theorem title="Prime implies Irreducible">
            <p>
              In an integral domain, every prime element is irreducible.
            </p>
            <p className="mt-2">
              The converse holds in UFDs but not in general integral domains.
            </p>
          </Theorem>

          <Example title="Irreducible but Not Prime">
            <div className="bg-dark-900 p-4 rounded">
              <p>In <Math>{'\\mathbb{Z}[\\sqrt{-5}]'}</Math>:</p>
              <p className="mt-2"><Math>{'6 = 2 \\cdot 3 = (1 + \\sqrt{-5})(1 - \\sqrt{-5})'}</Math></p>
              <p className="mt-2 text-dark-300">
                2 is irreducible (can't factor further) but not prime
                (divides <Math>{'(1+\\sqrt{-5})(1-\\sqrt{-5})'}</Math> but neither factor).
              </p>
            </div>
          </Example>
        </section>

        {/* Principal Ideals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Principal Ideals</h3>

          <Definition title="Principal Ideal">
            <p>
              In a commutative ring <Math>R</Math>, the <strong>principal ideal</strong> generated by <Math>a</Math> is:
            </p>
            <MathBlock>{'(a) = \\langle a \\rangle = \\{ra : r \\in R\\} = aR'}</MathBlock>
          </Definition>

          <Example title="Principal Ideals in Z">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'(6) = 6\\mathbb{Z} = \\{..., -12, -6, 0, 6, 12, ...\\}'}</Math></p>
              <p><Math>{'(0) = \\{0\\}'}</Math></p>
              <p><Math>{'(1) = \\mathbb{Z}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                In <Math>{'\\mathbb{Z}'}</Math>, every ideal is principal (PID).
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Integral domains</strong> have no zero divisors, enabling cancellation.
            </li>
            <li>
              Every finite integral domain is a field.
            </li>
            <li>
              <strong>Prime</strong> implies <strong>irreducible</strong> (but not always vice versa).
            </li>
            <li>
              <strong>Associates</strong> differ by a unit.
            </li>
            <li>
              Principal ideals <Math>{'(a)'}</Math> are all multiples of <Math>a</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
