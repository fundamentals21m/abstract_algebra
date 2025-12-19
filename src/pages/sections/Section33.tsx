import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section33() {
  return (
    <LessonLayout sectionId={33}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Vector spaces</strong> are algebraic structures where vectors can be added and
            scaled by elements of a field. They provide the foundation for linear algebra and
            generalize to modules over rings.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Vector Spaces</h3>

          <Definition title="Vector Space">
            <p>
              A <strong>vector space</strong> over a field <Math>F</Math> is an abelian group <Math>V</Math>
              with scalar multiplication <Math>{'F \\times V \\to V'}</Math> satisfying:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'a(\\mathbf{u} + \\mathbf{v}) = a\\mathbf{u} + a\\mathbf{v}'}</Math></li>
              <li><Math>{'(a + b)\\mathbf{v} = a\\mathbf{v} + b\\mathbf{v}'}</Math></li>
              <li><Math>{'(ab)\\mathbf{v} = a(b\\mathbf{v})'}</Math></li>
              <li><Math>{'1\\mathbf{v} = \\mathbf{v}'}</Math></li>
            </ul>
          </Definition>

          <Example title="Vector Spaces">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'F^n'}</Math></p>
                <p className="text-dark-300">n-tuples from <Math>F</Math> with componentwise operations</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'F[x]'}</Math></p>
                <p className="text-dark-300">Polynomials (infinite-dimensional)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'M_{m \\times n}(F)'}</Math></p>
                <p className="text-dark-300"><Math>{'m \\times n'}</Math> matrices</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'C(\\mathbb{R})'}</Math></p>
                <p className="text-dark-300">Continuous functions <Math>{'\\mathbb{R} \\to \\mathbb{R}'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Subspaces */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Subspaces</h3>

          <Definition title="Subspace">
            <p>
              A <strong>subspace</strong> of <Math>V</Math> is a nonempty subset <Math>W</Math> that is
              closed under addition and scalar multiplication.
            </p>
          </Definition>

          <Theorem title="Subspace Test">
            <p>
              <Math>W</Math> is a subspace iff for all <Math>{'\\mathbf{u}, \\mathbf{v} \\in W'}</Math>
              and <Math>{'a \\in F'}</Math>: <Math>{'a\\mathbf{u} + \\mathbf{v} \\in W'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Linear Independence and Span */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Linear Independence and Span</h3>

          <Definition title="Linear Combination">
            <p>
              A <strong>linear combination</strong> of vectors <Math>{'\\mathbf{v}_1, ..., \\mathbf{v}_n'}</Math>
              is a sum <Math>{'a_1\\mathbf{v}_1 + \\cdots + a_n\\mathbf{v}_n'}</Math>.
            </p>
          </Definition>

          <Definition title="Span">
            <p>
              The <strong>span</strong> of <Math>S</Math> is the set of all linear combinations:
            </p>
            <MathBlock>{'\\text{span}(S) = \\{a_1\\mathbf{v}_1 + \\cdots + a_n\\mathbf{v}_n : a_i \\in F, \\mathbf{v}_i \\in S\\}'}</MathBlock>
          </Definition>

          <Definition title="Linear Independence">
            <p>
              Vectors <Math>{'\\mathbf{v}_1, ..., \\mathbf{v}_n'}</Math> are <strong>linearly independent</strong>
              if the only solution to <Math>{'a_1\\mathbf{v}_1 + \\cdots + a_n\\mathbf{v}_n = \\mathbf{0}'}</Math>
              is <Math>{'a_1 = \\cdots = a_n = 0'}</Math>.
            </p>
          </Definition>
        </section>

        {/* Basis and Dimension */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Basis and Dimension</h3>

          <Definition title="Basis">
            <p>
              A <strong>basis</strong> for <Math>V</Math> is a linearly independent spanning set.
              Every vector has a unique representation as a linear combination of basis vectors.
            </p>
          </Definition>

          <Theorem title="Dimension Theorem">
            <p>
              All bases of a finite-dimensional vector space have the same cardinality,
              called the <strong>dimension</strong> <Math>{'\\dim(V)'}</Math>.
            </p>
          </Theorem>

          <Example title="Standard Bases">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\mathbb{R}^n'}</Math>: <Math>{'\\{e_1, ..., e_n\\}'}</Math> where <Math>{'e_i = (0,...,1,...,0)'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'P_n(F)'}</Math>: <Math>{'\\{1, x, x^2, ..., x^n\\}'}</Math> (degree ≤ n)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'M_{2 \\times 2}(F)'}</Math>: Four matrices with one 1, rest 0s (dim = 4)</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Linear Transformations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Linear Transformations</h3>

          <Definition title="Linear Transformation">
            <p>
              A function <Math>{'T: V \\to W'}</Math> is <strong>linear</strong> if:
            </p>
            <MathBlock>{'T(a\\mathbf{u} + b\\mathbf{v}) = aT(\\mathbf{u}) + bT(\\mathbf{v})'}</MathBlock>
          </Definition>

          <Theorem title="Dimension Formula">
            <p>
              For a linear transformation <Math>{'T: V \\to W'}</Math>:
            </p>
            <MathBlock>{'\\dim(V) = \\dim(\\ker T) + \\dim(\\text{im } T)'}</MathBlock>
          </Theorem>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Vector spaces have vector addition and scalar multiplication by a field.
            </li>
            <li>
              <strong>Basis</strong> = linearly independent spanning set.
            </li>
            <li>
              <strong>Dimension</strong> = number of vectors in any basis.
            </li>
            <li>
              Linear transformations preserve linear combinations.
            </li>
            <li>
              <Math>{'\\dim(V) = \\dim(\\ker T) + \\dim(\\text{im } T)'}</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
