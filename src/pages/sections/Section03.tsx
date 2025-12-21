import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { AbelianCayleyTableDemo, SubgroupQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section03() {
  return (
    <LessonLayout sectionId={3}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            Now that we've defined groups abstractly, let's explore the most important examples of
            <strong> abelian groups</strong>—groups where the operation is commutative. These include
            the integers under addition, modular arithmetic groups, and the circle group.
          </p>
        </section>

        {/* Abelian Groups */}
        <Definition title="Abelian Group">
          <p>
            A group <Math>G</Math> is called <strong>abelian</strong> (or <strong>commutative</strong>)
            if for all <Math>{'a, b \\in G'}</Math>:
          </p>
          <MathBlock>{'a * b = b * a'}</MathBlock>
          <p className="mt-2">
            Named after Niels Henrik Abel (1802-1829), a Norwegian mathematician.
          </p>
        </Definition>

        <div className="mt-6">
          <AbelianCayleyTableDemo defaultGroup="Zn" defaultN={4} />
        </div>

        {/* The Integers */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Integers <Math>{'(\\mathbb{Z}, +)'}</Math></h3>

          <div className="card">
            <p className="text-dark-300 mb-3">
              The set of integers <Math>{'\\mathbb{Z} = \\{..., -2, -1, 0, 1, 2, ...\\}'}</Math> under
              addition is the most fundamental example of an infinite abelian group.
            </p>
            <ul className="list-disc list-inside space-y-2 text-dark-300">
              <li><strong>Closure:</strong> Sum of integers is an integer</li>
              <li><strong>Associativity:</strong> <Math>{'(a + b) + c = a + (b + c)'}</Math></li>
              <li><strong>Identity:</strong> <Math>0</Math> is the additive identity</li>
              <li><strong>Inverses:</strong> <Math>{'-a'}</Math> is the inverse of <Math>a</Math></li>
              <li><strong>Commutativity:</strong> <Math>{'a + b = b + a'}</Math></li>
            </ul>
          </div>
        </section>

        {/* Modular Arithmetic Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Modular Arithmetic: <Math>{'\\mathbb{Z}_n'}</Math></h3>

          <Definition title="Z_n (Integers Modulo n)">
            <p>
              For a positive integer <Math>n</Math>, the group <Math>{'\\mathbb{Z}_n'}</Math> consists of:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Elements: <Math>{'{0, 1, 2, ..., n-1}'}</Math></li>
              <li>Operation: Addition modulo <Math>n</Math></li>
              <li>Identity: <Math>0</Math></li>
              <li>Inverse of <Math>a</Math>: <Math>{'n - a'}</Math> (or <Math>0</Math> if <Math>{'a = 0'}</Math>)</li>
            </ul>
          </Definition>

          <Example title="Z₆ (Integers Modulo 6)">
            <p className="mb-3">
              In <Math>{'\\mathbb{Z}_6'}</Math>, we compute:
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div className="bg-dark-900 p-3 rounded">
                <p>4 + 3 = 7 ≡ 1 (mod 6)</p>
                <p>5 + 5 = 10 ≡ 4 (mod 6)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p>Inverse of 2: 6 - 2 = 4</p>
                <p>Inverse of 5: 6 - 5 = 1</p>
              </div>
            </div>
          </Example>

        </section>

        {/* Multiplicative Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Multiplicative Groups</h3>

          <Definition title="Z_n^* (Units Modulo n)">
            <p>
              The group <Math>{'\\mathbb{Z}_n^*'}</Math> consists of integers from 1 to <Math>{'n-1'}</Math> that
              are coprime to <Math>n</Math>, under multiplication modulo <Math>n</Math>.
            </p>
            <MathBlock>{'\\mathbb{Z}_n^* = \\{a \\in \\mathbb{Z}_n : \\gcd(a, n) = 1\\}'}</MathBlock>
          </Definition>

          <Example title="Z₁₀^*">
            <p className="mb-2">
              Elements coprime to 10: <Math>{'{1, 3, 7, 9}'}</Math>
            </p>
            <p className="mb-2">
              <Math>{'|\\mathbb{Z}_{10}^*| = \\phi(10) = 4'}</Math>
            </p>
            <div className="bg-dark-900 p-3 rounded font-mono text-sm mt-2">
              <p>3 × 7 = 21 ≡ 1 (mod 10), so 3 and 7 are inverses</p>
              <p>9 × 9 = 81 ≡ 1 (mod 10), so 9 is its own inverse</p>
            </div>
          </Example>

          <Theorem title="Z_n^* is a Group">
            <p>
              <Math>{'\\mathbb{Z}_n^*'}</Math> is a group under multiplication modulo <Math>n</Math>, with
              order <Math>{'\\phi(n)'}</Math> (Euler's totient function).
            </p>
          </Theorem>
        </section>

        {/* Rationals, Reals, Complex */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Other Number Groups</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{Q}, +)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Rational numbers under addition. Infinite abelian group.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{Q}^*, \\cdot)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Non-zero rationals under multiplication.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{R}, +)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Real numbers under addition. Uncountable abelian group.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{R}^+, \\cdot)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Positive reals under multiplication.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{C}, +)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Complex numbers under addition.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold mb-2"><Math>{'(\\mathbb{C}^*, \\cdot)'}</Math></h4>
              <p className="text-dark-300 text-sm">
                Non-zero complex numbers under multiplication.
              </p>
            </div>
          </div>
        </section>

        {/* Circle Group */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Circle Group</h3>

          <Definition title="Circle Group T">
            <p>
              The <strong>circle group</strong> <Math>{'\\mathbb{T}'}</Math> (or <Math>{'U(1)'}</Math> or <Math>{'S^1'}</Math>)
              is the set of complex numbers with absolute value 1:
            </p>
            <MathBlock>{'\\mathbb{T} = \\{z \\in \\mathbb{C} : |z| = 1\\} = \\{e^{i\\theta} : \\theta \\in \\mathbb{R}\\}'}</MathBlock>
            <p className="mt-2">
              Under complex multiplication, this forms an abelian group.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Why It's a Group</h4>
            <ul className="list-disc list-inside space-y-2 text-dark-300">
              <li><strong>Closure:</strong> <Math>{'|z_1 z_2| = |z_1||z_2| = 1 \\cdot 1 = 1'}</Math></li>
              <li><strong>Identity:</strong> <Math>{'1 = e^{i \\cdot 0}'}</Math></li>
              <li><strong>Inverses:</strong> <Math>{'(e^{i\\theta})^{-1} = e^{-i\\theta} = \\overline{e^{i\\theta}}'}</Math></li>
              <li><strong>Commutativity:</strong> Multiplication of complex numbers is commutative</li>
            </ul>
          </div>

          <div className="callout-info">
            <p>
              The circle group is important in physics (quantum mechanics, electromagnetism) and
              connects to Fourier analysis. The <Math>n</Math>th roots of unity form a cyclic
              subgroup of order <Math>n</Math>.
            </p>
          </div>
        </section>

        {/* Direct Products */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Direct Products</h3>

          <Definition title="Direct Product of Groups">
            <p>
              Given groups <Math>{'G_1'}</Math> and <Math>{'G_2'}</Math>, their <strong>direct product</strong>{' '}
              <Math>{'G_1 \\times G_2'}</Math> is:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Elements: ordered pairs <Math>{'(g_1, g_2)'}</Math></li>
              <li>Operation: <Math>{'(a_1, a_2)(b_1, b_2) = (a_1 b_1, a_2 b_2)'}</Math></li>
            </ul>
          </Definition>

          <Theorem title="Direct Product Preserves Abelian Property">
            <p>
              If <Math>{'G_1'}</Math> and <Math>{'G_2'}</Math> are both abelian, then{' '}
              <Math>{'G_1 \\times G_2'}</Math> is abelian.
            </p>
          </Theorem>

          <Example title="Z₂ × Z₃">
            <p className="mb-2">
              <Math>{'\\mathbb{Z}_2 \\times \\mathbb{Z}_3'}</Math> has 6 elements:
            </p>
            <p className="font-mono text-sm bg-dark-900 p-3 rounded">
              (0,0), (0,1), (0,2), (1,0), (1,1), (1,2)
            </p>
            <p className="mt-2 text-dark-400">
              Since <Math>{'\\gcd(2,3) = 1'}</Math>, this is isomorphic to <Math>{'\\mathbb{Z}_6'}</Math>.
            </p>
          </Example>
        </section>

        {/* Practice Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Practice: Abelian Groups & Subgroups</h3>
          <p className="text-dark-300 mb-6">
            Test your understanding of abelian groups, dihedral groups, symmetric groups, and subgroups.
            Each quiz generates 10 random questions.
          </p>
          <SubgroupQuiz />
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Abelian groups have commutative operations: <Math>{'ab = ba'}</Math>.
            </li>
            <li>
              <Math>{'\\mathbb{Z}_n'}</Math> under addition is the fundamental finite cyclic group.
            </li>
            <li>
              <Math>{'\\mathbb{Z}_n^*'}</Math> under multiplication has <Math>{'\\phi(n)'}</Math> elements.
            </li>
            <li>
              The circle group <Math>{'\\mathbb{T}'}</Math> connects algebra to geometry and analysis.
            </li>
            <li>
              Direct products combine groups while preserving the abelian property.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
