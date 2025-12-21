import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { IdealsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section37() {
  return (
    <LessonLayout sectionId={37}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Algebraic geometry</strong> studies geometric objects (varieties) defined by
            polynomial equations. The fundamental correspondence between geometry and algebra
            connects varieties to ideals in polynomial rings.
          </p>
        </section>

        {/* Affine Varieties */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Affine Varieties</h3>

          <Definition title="Affine Variety">
            <p>
              An <strong>affine algebraic variety</strong> over a field <Math>k</Math> is the set
              of common zeros of polynomials <Math>{'f_1, ..., f_m \\in k[x_1, ..., x_n]'}</Math>:
            </p>
            <MathBlock>{'V(f_1, ..., f_m) = \\{(a_1, ..., a_n) \\in k^n : f_i(a_1, ..., a_n) = 0 \\text{ for all } i\\}'}</MathBlock>
          </Definition>

          <Example title="Examples of Varieties">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'V(x^2 + y^2 - 1)'}</Math></p>
                <p className="text-dark-300">Circle in <Math>{'\\mathbb{R}^2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'V(y^2 - x^3 - x)'}</Math></p>
                <p className="text-dark-300">Elliptic curve</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'V(xy)'}</Math></p>
                <p className="text-dark-300">Union of x-axis and y-axis</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'V(x^2 + y^2 + z^2 - 1)'}</Math></p>
                <p className="text-dark-300">Sphere in <Math>{'\\mathbb{R}^3'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* The Ideal-Variety Correspondence */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Ideals and Varieties</h3>

          <Definition title="Vanishing Ideal">
            <p>
              The <strong>vanishing ideal</strong> of a variety <Math>V</Math> is:
            </p>
            <MathBlock>{'I(V) = \\{f \\in k[x_1, ..., x_n] : f(P) = 0 \\text{ for all } P \\in V\\}'}</MathBlock>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">The Correspondence</h4>
            <ul className="space-y-2 text-dark-300">
              <li>Varieties → Ideals: <Math>{'V \\mapsto I(V)'}</Math></li>
              <li>Ideals → Varieties: <Math>{'J \\mapsto V(J)'}</Math></li>
              <li>These are order-reversing: <Math>{'V_1 \\subseteq V_2 \\iff I(V_1) \\supseteq I(V_2)'}</Math></li>
            </ul>
          </div>

          <Theorem title="Hilbert's Nullstellensatz">
            <p>
              Over an algebraically closed field <Math>k</Math>:
            </p>
            <MathBlock>{'I(V(J)) = \\sqrt{J}'}</MathBlock>
            <p className="mt-2">
              where <Math>{'\\sqrt{J} = \\{f : f^n \\in J \\text{ for some } n\\}'}</Math> is the radical.
            </p>
          </Theorem>
        </section>

        {/* Coordinate Rings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Coordinate Rings</h3>

          <Definition title="Coordinate Ring">
            <p>
              The <strong>coordinate ring</strong> of a variety <Math>V</Math> is:
            </p>
            <MathBlock>{'k[V] = k[x_1, ..., x_n]/I(V)'}</MathBlock>
            <p className="mt-2">
              This is the ring of polynomial functions on <Math>V</Math>.
            </p>
          </Definition>

          <Example title="Coordinate Ring of a Circle">
            <div className="bg-dark-900 p-4 rounded">
              <p>For <Math>{'V = V(x^2 + y^2 - 1)'}</Math>:</p>
              <p className="mt-2"><Math>{'\\mathbb{R}[V] = \\mathbb{R}[x,y]/(x^2+y^2-1)'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                In this ring, <Math>{'x^2 + y^2 = 1'}</Math> as functions on the circle.
              </p>
            </div>
          </Example>
        </section>

        {/* Irreducibility */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Irreducible Varieties</h3>

          <Definition title="Irreducible Variety">
            <p>
              A variety is <strong>irreducible</strong> if it cannot be written as a union of
              two proper subvarieties.
            </p>
          </Definition>

          <Theorem title="Irreducibility and Prime Ideals">
            <p>
              <Math>V</Math> is irreducible iff <Math>{'I(V)'}</Math> is prime iff <Math>{'k[V]'}</Math>
              is an integral domain.
            </p>
          </Theorem>

          <Example title="Reducible vs Irreducible">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="text-primary-400"><Math>{'V(xy)'}</Math> is reducible</p>
                <p className="text-dark-300">= x-axis ∪ y-axis</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="text-primary-400"><Math>{'V(x^2+y^2-1)'}</Math> is irreducible</p>
                <p className="text-dark-300">(over <Math>{'\\mathbb{R}'}</Math>)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Dimension */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Dimension</h3>

          <Definition title="Dimension of a Variety">
            <p>
              The <strong>dimension</strong> of an irreducible variety is the transcendence degree
              of its function field over <Math>k</Math>.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Examples</h4>
            <ul className="space-y-1 text-dark-300">
              <li>Point: dimension 0</li>
              <li>Curve: dimension 1</li>
              <li>Surface: dimension 2</li>
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Varieties</strong> are zero sets of polynomial systems.
            </li>
            <li>
              Varieties ↔ Radical ideals (Nullstellensatz).
            </li>
            <li>
              <strong>Coordinate ring</strong> = polynomial functions on the variety.
            </li>
            <li>
              Irreducible varieties ↔ Prime ideals.
            </li>
            <li>
              This correspondence is the foundation of algebraic geometry.
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
