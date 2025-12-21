import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { IdealsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section30() {
  return (
    <LessonLayout sectionId={30}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Ring homomorphisms</strong> preserve ring structure, analogous to group homomorphisms.
            <strong> Factor rings</strong> (quotient rings) are constructed by modding out by ideals,
            paralleling factor groups.
          </p>
        </section>

        {/* Ring Homomorphisms */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Ring Homomorphisms</h3>

          <Definition title="Ring Homomorphism">
            <p>
              A function <Math>{'\\phi: R \\to S'}</Math> between rings is a <strong>ring homomorphism</strong> if:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'\\phi(a + b) = \\phi(a) + \\phi(b)'}</Math></li>
              <li><Math>{'\\phi(ab) = \\phi(a)\\phi(b)'}</Math></li>
            </ul>
            <p className="mt-2">
              If <Math>R</Math> and <Math>S</Math> have unity, often require <Math>{'\\phi(1_R) = 1_S'}</Math>.
            </p>
          </Definition>

          <Example title="Ring Homomorphisms">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z} \\to \\mathbb{Z}_n'}</Math></p>
                <p className="text-dark-300"><Math>{'\\phi(a) = a \\mod n'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'R[x] \\to R'}</Math></p>
                <p className="text-dark-300">Evaluation: <Math>{'\\phi_a(f) = f(a)'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{C} \\to \\mathbb{C}'}</Math></p>
                <p className="text-dark-300">Complex conjugation: <Math>{'\\phi(z) = \\bar{z}'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Ideals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Ideals</h3>

          <Definition title="Ideal">
            <p>
              A nonempty subset <Math>I</Math> of a ring <Math>R</Math> is an <strong>ideal</strong> if:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'(I, +)'}</Math> is a subgroup of <Math>{'(R, +)'}</Math></li>
              <li>For all <Math>{'r \\in R'}</Math> and <Math>{'a \\in I'}</Math>: <Math>{'ra \\in I'}</Math> and <Math>{'ar \\in I'}</Math></li>
            </ul>
          </Definition>

          <div className="callout-info">
            <p>
              <strong>Analogy:</strong> Ideals are to rings as normal subgroups are to groups.
            </p>
          </div>

          <Theorem title="Kernel is an Ideal">
            <p>
              If <Math>{'\\phi: R \\to S'}</Math> is a ring homomorphism, then <Math>{'\\ker(\\phi)'}</Math>
              is an ideal of <Math>R</Math>.
            </p>
          </Theorem>

          <Example title="Ideals">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'n\\mathbb{Z}'}</Math> is an ideal in <Math>{'\\mathbb{Z}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'(x)'}</Math> (polynomials divisible by <Math>x</Math>) is an ideal in <Math>{'R[x]'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\{0\\}'}</Math> and <Math>R</Math> are always ideals (trivial ideals)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Factor Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Factor Rings</h3>

          <Definition title="Factor Ring (Quotient Ring)">
            <p>
              If <Math>I</Math> is an ideal of <Math>R</Math>, the <strong>factor ring</strong>
              <Math>{'R/I'}</Math> consists of cosets <Math>{'a + I'}</Math> with operations:
            </p>
            <MathBlock>{'(a + I) + (b + I) = (a + b) + I'}</MathBlock>
            <MathBlock>{'(a + I)(b + I) = ab + I'}</MathBlock>
          </Definition>

          <Example title="Factor Rings">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Z}/n\\mathbb{Z} = \\mathbb{Z}_n'}</Math></p>
                <p className="text-dark-300">Integers mod <Math>n</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{R}[x]/(x^2+1) \\cong \\mathbb{C}'}</Math></p>
                <p className="text-dark-300">Adjoining <Math>i</Math> to <Math>{'\\mathbb{R}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'F[x]/(f(x))'}</Math></p>
                <p className="text-dark-300">Field extension when <Math>f</Math> is irreducible</p>
              </div>
            </div>
          </Example>
        </section>

        {/* First Isomorphism Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">First Isomorphism Theorem for Rings</h3>

          <Theorem title="First Isomorphism Theorem">
            <p>
              If <Math>{'\\phi: R \\to S'}</Math> is a ring homomorphism, then:
            </p>
            <MathBlock>{'R/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</MathBlock>
          </Theorem>

          <Example title="Applying the Theorem">
            <div className="bg-dark-900 p-4 rounded">
              <p>The map <Math>{'\\phi: \\mathbb{Z} \\to \\mathbb{Z}_n'}</Math> with <Math>{'\\phi(a) = a \\mod n'}</Math>:</p>
              <ul className="list-disc list-inside mt-2 text-dark-300">
                <li><Math>{'\\ker(\\phi) = n\\mathbb{Z}'}</Math></li>
                <li><Math>{'\\text{im}(\\phi) = \\mathbb{Z}_n'}</Math></li>
                <li><Math>{'\\mathbb{Z}/n\\mathbb{Z} \\cong \\mathbb{Z}_n'}</Math></li>
              </ul>
            </div>
          </Example>
        </section>

        {/* Generating Ideals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Generating Ideals</h3>

          <Definition title="Ideal Generated by a Set">
            <p>
              The <strong>ideal generated by</strong> elements <Math>{'a_1, ..., a_n'}</Math> is:
            </p>
            <MathBlock>{'(a_1, ..., a_n) = \\{r_1 a_1 + \\cdots + r_n a_n : r_i \\in R\\}'}</MathBlock>
            <p className="mt-2">
              A <strong>principal ideal</strong> is generated by a single element: <Math>{'(a) = Ra'}</Math>.
            </p>
          </Definition>

          <Example title="Principal Ideal Domain">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{Z}'}</Math> is a PID: every ideal has the form <Math>{'(n) = n\\mathbb{Z}'}</Math>.</p>
              <p className="mt-2"><Math>{'F[x]'}</Math> is a PID: every ideal is <Math>{'(f(x))'}</Math>.</p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Ring homomorphisms preserve both addition and multiplication.
            </li>
            <li>
              <strong>Ideals</strong> are the kernel of homomorphisms and enable factor rings.
            </li>
            <li>
              <Math>{'R/I'}</Math> is a ring with cosets as elements.
            </li>
            <li>
              <strong>First Isomorphism Theorem:</strong> <Math>{'R/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</Math>.
            </li>
            <li>
              <Math>{'F[x]/(f)'}</Math> creates field extensions when <Math>f</Math> is irreducible.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <IdealsQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
