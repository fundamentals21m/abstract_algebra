import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { RingBasicsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section22() {
  return (
    <LessonLayout sectionId={22}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Rings</strong> generalize the integers by combining addition and multiplication.
            <strong> Fields</strong> are rings where every nonzero element has a multiplicative inverse.
            These structures are fundamental throughout mathematics.
          </p>
        </section>

        {/* Ring Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Rings</h3>

          <Definition title="Ring">
            <p>
              A <strong>ring</strong> <Math>{'(R, +, \\cdot)'}</Math> is a set <Math>R</Math> with two
              binary operations satisfying:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><Math>{'(R, +)'}</Math> is an abelian group (identity 0)</li>
              <li>Multiplication is associative: <Math>{'(ab)c = a(bc)'}</Math></li>
              <li>Distributive laws: <Math>{'a(b+c) = ab + ac'}</Math> and <Math>{'(a+b)c = ac + bc'}</Math></li>
            </ol>
          </Definition>

          <Definition title="Ring with Unity">
            <p>
              A ring has <strong>unity</strong> (or is <strong>unital</strong>) if there exists
              <Math>{'1 \\in R'}</Math> with <Math>{'1 \\cdot a = a \\cdot 1 = a'}</Math> for all <Math>a</Math>.
            </p>
          </Definition>

          <Definition title="Commutative Ring">
            <p>
              A ring is <strong>commutative</strong> if <Math>{'ab = ba'}</Math> for all <Math>{'a, b \\in R'}</Math>.
            </p>
          </Definition>

          <Example title="Basic Ring Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">Integers: commutative ring with unity</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}_n'}</Math></p>
                <p className="text-dark-300">Integers mod <Math>n</Math>: commutative ring with unity</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'M_n(\\mathbb{R})'}</Math></p>
                <p className="text-dark-300"><Math>{'n \\times n'}</Math> matrices: noncommutative ring with unity</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'2\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300">Even integers: commutative ring without unity</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Basic Properties */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Basic Ring Properties</h3>

          <Theorem title="Ring Properties">
            <p>For any ring <Math>R</Math>:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'0 \\cdot a = a \\cdot 0 = 0'}</Math> for all <Math>a</Math></li>
              <li><Math>{'(-a)b = a(-b) = -(ab)'}</Math></li>
              <li><Math>{'(-a)(-b) = ab'}</Math></li>
              <li>If <Math>R</Math> has unity, it is unique</li>
            </ul>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Warning:</strong> In a general ring, <Math>{'ab = 0'}</Math> does NOT imply
              <Math>{'a = 0'}</Math> or <Math>{'b = 0'}</Math>. Elements with this property are
              called <strong>zero divisors</strong>.
            </p>
          </div>
        </section>

        {/* Units and Zero Divisors */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Units and Zero Divisors</h3>

          <Definition title="Unit">
            <p>
              In a ring with unity, a <strong>unit</strong> is an element <Math>u</Math> with a
              multiplicative inverse: <Math>{'uv = vu = 1'}</Math> for some <Math>{'v \\in R'}</Math>.
            </p>
            <p className="mt-2">
              The set of units <Math>{'R^\\times'}</Math> forms a group under multiplication.
            </p>
          </Definition>

          <Definition title="Zero Divisor">
            <p>
              A <strong>zero divisor</strong> is a nonzero element <Math>a</Math> such that
              <Math>{'ab = 0'}</Math> or <Math>{'ba = 0'}</Math> for some nonzero <Math>b</Math>.
            </p>
          </Definition>

          <Example title="Units in Z₁₂">
            <div className="bg-dark-900 p-4 rounded">
              <p className="mb-2">Units: elements coprime to 12</p>
              <p><Math>{'\\mathbb{Z}_{12}^\\times = \\{1, 5, 7, 11\\}'}</Math></p>
              <p className="mt-3 mb-2">Zero divisors:</p>
              <p><Math>{'\\{2, 3, 4, 6, 8, 9, 10\\}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                Example: <Math>{'3 \\cdot 4 = 12 \\equiv 0'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Fields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Fields</h3>

          <Definition title="Field">
            <p>
              A <strong>field</strong> is a commutative ring with unity where every nonzero
              element is a unit. Equivalently:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'(F, +)'}</Math> is an abelian group</li>
              <li><Math>{'(F \\setminus \\{0\\}, \\cdot)'}</Math> is an abelian group</li>
              <li>Distributive laws hold</li>
            </ul>
          </Definition>

          <Example title="Field Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}'}</Math></p>
                <p className="text-dark-300">Rational numbers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{R}'}</Math></p>
                <p className="text-dark-300">Real numbers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{C}'}</Math></p>
                <p className="text-dark-300">Complex numbers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}_p'}</Math> (<Math>p</Math> prime)</p>
                <p className="text-dark-300">Integers mod a prime</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}(\\sqrt{2})'}</Math></p>
                <p className="text-dark-300"><Math>{'\\{a + b\\sqrt{2} : a, b \\in \\mathbb{Q}\\}'}</Math></p>
              </div>
            </div>
          </Example>

          <Theorem title="Z_n is a Field iff n is Prime">
            <p>
              <Math>{'\\mathbb{Z}_n'}</Math> is a field if and only if <Math>n</Math> is prime.
            </p>
          </Theorem>
        </section>

        {/* Subrings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Subrings</h3>

          <Definition title="Subring">
            <p>
              A <strong>subring</strong> of a ring <Math>R</Math> is a subset <Math>S</Math> that is
              itself a ring under the same operations.
            </p>
          </Definition>

          <Theorem title="Subring Test">
            <p>
              A nonempty subset <Math>{'S \\subseteq R'}</Math> is a subring iff for all <Math>{'a, b \\in S'}</Math>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'a - b \\in S'}</Math></li>
              <li><Math>{'ab \\in S'}</Math></li>
            </ul>
          </Theorem>

          <Example title="Subrings">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\mathbb{Z} \\subseteq \\mathbb{Q} \\subseteq \\mathbb{R} \\subseteq \\mathbb{C}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\mathbb{Z}[i] = \\{a + bi : a, b \\in \\mathbb{Z}\\} \\subseteq \\mathbb{C}'}</Math></p>
                <p className="text-dark-400 text-sm">Gaussian integers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'2\\mathbb{Z} \\subseteq \\mathbb{Z}'}</Math></p>
                <p className="text-dark-400 text-sm">Note: <Math>{'2\\mathbb{Z}'}</Math> has no unity</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Characteristic */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Characteristic</h3>

          <Definition title="Characteristic">
            <p>
              The <strong>characteristic</strong> of a ring <Math>R</Math> with unity is the smallest
              positive integer <Math>n</Math> such that <Math>{'n \\cdot 1 = 0'}</Math>, or 0 if no such <Math>n</Math> exists.
            </p>
            <MathBlock>{'\\text{char}(R) = \\min\\{n > 0 : \\underbrace{1 + 1 + \\cdots + 1}_{n} = 0\\}'}</MathBlock>
          </Definition>

          <Example title="Characteristics">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\text{char}(\\mathbb{Z}) = 0'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\text{char}(\\mathbb{Q}) = 0'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\text{char}(\\mathbb{Z}_n) = n'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\text{char}(\\mathbb{Z}_p) = p'}</Math></p>
              </div>
            </div>
          </Example>

          <Theorem title="Characteristic of an Integral Domain">
            <p>
              The characteristic of an integral domain is either 0 or a prime.
            </p>
          </Theorem>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              A <strong>ring</strong> has addition (abelian group) and multiplication (associative, distributive).
            </li>
            <li>
              <strong>Units</strong> have multiplicative inverses; <strong>zero divisors</strong> satisfy <Math>{'ab = 0'}</Math>.
            </li>
            <li>
              A <strong>field</strong> is a commutative ring where all nonzero elements are units.
            </li>
            <li>
              <Math>{'\\mathbb{Z}_n'}</Math> is a field iff <Math>n</Math> is prime.
            </li>
            <li>
              <strong>Characteristic</strong> measures when <Math>{'1 + 1 + \\cdots + 1 = 0'}</Math>.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <RingBasicsQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
