import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section39() {
  return (
    <LessonLayout sectionId={39}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Extension fields</strong> are larger fields containing a base field. They arise
            naturally when we adjoin roots of polynomials, leading to the rich theory connecting
            algebra and geometry.
          </p>
        </section>

        {/* Basic Definitions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Field Extensions</h3>

          <Definition title="Field Extension">
            <p>
              A field <Math>E</Math> is an <strong>extension</strong> of <Math>F</Math>
              (written <Math>{'E/F'}</Math>) if <Math>F</Math> is a subfield of <Math>E</Math>.
            </p>
          </Definition>

          <Definition title="Degree of Extension">
            <p>
              The <strong>degree</strong> <Math>{'[E:F]'}</Math> is the dimension of <Math>E</Math>
              as a vector space over <Math>F</Math>.
            </p>
          </Definition>

          <Example title="Field Extensions">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{C}/\\mathbb{R}'}</Math></p>
                <p className="text-dark-300">Degree 2: basis <Math>{'\\{1, i\\}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{R}/\\mathbb{Q}'}</Math></p>
                <p className="text-dark-300">Infinite degree (uncountable basis)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\mathbb{Q}(\\sqrt{2})/\\mathbb{Q}'}</Math></p>
                <p className="text-dark-300">Degree 2: basis <Math>{'\\{1, \\sqrt{2}\\}'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Tower Law */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Tower Law</h3>

          <Theorem title="Tower Law">
            <p>
              If <Math>{'F \\subseteq E \\subseteq K'}</Math> are fields:
            </p>
            <MathBlock>{'[K:F] = [K:E] \\cdot [E:F]'}</MathBlock>
          </Theorem>

          <Example title="Tower Law Example">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\mathbb{Q} \\subseteq \\mathbb{Q}(\\sqrt{2}) \\subseteq \\mathbb{Q}(\\sqrt{2}, i)'}</Math></p>
              <p className="mt-2">
                <Math>{'[\\mathbb{Q}(\\sqrt{2}):Q] = 2'}</Math>
              </p>
              <p>
                <Math>{'[\\mathbb{Q}(\\sqrt{2}, i):\\mathbb{Q}(\\sqrt{2})] = 2'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'[\\mathbb{Q}(\\sqrt{2}, i):\\mathbb{Q}] = 2 \\cdot 2 = 4'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Adjoining Elements */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Adjoining Elements</h3>

          <Definition title="Simple Extension">
            <p>
              <Math>{'F(\\alpha)'}</Math> is the smallest field containing <Math>F</Math> and <Math>{'\\alpha'}</Math>.
            </p>
            <MathBlock>{'F(\\alpha) = \\{\\frac{f(\\alpha)}{g(\\alpha)} : f, g \\in F[x], g(\\alpha) \\neq 0\\}'}</MathBlock>
          </Definition>

          <Theorem title="Structure of F(α)">
            <p>
              If <Math>{'\\alpha'}</Math> is a root of irreducible <Math>{'p(x) \\in F[x]'}</Math> of degree <Math>n</Math>:
            </p>
            <MathBlock>{'F(\\alpha) \\cong F[x]/(p(x))'}</MathBlock>
            <p className="mt-2">
              with basis <Math>{'\\{1, \\alpha, \\alpha^2, ..., \\alpha^{n-1}\\}'}</Math> over <Math>F</Math>.
            </p>
          </Theorem>

          <Example title="Q(√2)">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\sqrt{2}'}</Math> is a root of <Math>{'x^2 - 2'}</Math> (irreducible over <Math>{'\\mathbb{Q}'}</Math>)</p>
              <p className="mt-2"><Math>{'\\mathbb{Q}(\\sqrt{2}) = \\{a + b\\sqrt{2} : a, b \\in \\mathbb{Q}\\}'}</Math></p>
              <p className="mt-2 text-dark-300">
                Basis: <Math>{'\\{1, \\sqrt{2}\\}'}</Math>, so <Math>{'[\\mathbb{Q}(\\sqrt{2}):\\mathbb{Q}] = 2'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Algebraic vs Transcendental */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Algebraic vs Transcendental</h3>

          <Definition title="Algebraic Element">
            <p>
              <Math>{'\\alpha \\in E'}</Math> is <strong>algebraic</strong> over <Math>F</Math> if it
              is a root of some nonzero polynomial in <Math>{'F[x]'}</Math>.
            </p>
          </Definition>

          <Definition title="Transcendental Element">
            <p>
              <Math>{'\\alpha'}</Math> is <strong>transcendental</strong> over <Math>F</Math> if it
              is not algebraic (no polynomial relation).
            </p>
          </Definition>

          <Example title="Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\sqrt{2}, i, \\sqrt[3]{5}'}</Math></p>
                <p className="text-dark-300">Algebraic over <Math>{'\\mathbb{Q}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\pi, e'}</Math></p>
                <p className="text-dark-300">Transcendental over <Math>{'\\mathbb{Q}'}</Math></p>
              </div>
            </div>
          </Example>

          <Theorem title="Finite Extension ⟺ Algebraic">
            <p>
              <Math>{'[E:F] < \\infty'}</Math> iff every element of <Math>E</Math> is algebraic over <Math>F</Math>.
            </p>
          </Theorem>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Extension degree</strong> = dimension as vector space.
            </li>
            <li>
              <strong>Tower law:</strong> <Math>{'[K:F] = [K:E][E:F]'}</Math>.
            </li>
            <li>
              <Math>{'F(\\alpha) \\cong F[x]/(p(x))'}</Math> for minimal polynomial <Math>p</Math>.
            </li>
            <li>
              Algebraic: root of polynomial; Transcendental: not.
            </li>
            <li>
              Finite extensions are algebraic.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
