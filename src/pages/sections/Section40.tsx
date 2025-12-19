import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section40() {
  return (
    <LessonLayout sectionId={40}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Algebraic extensions</strong> are field extensions where every element satisfies
            a polynomial equation. The <strong>minimal polynomial</strong> captures essential information
            about how an element is algebraic.
          </p>
        </section>

        {/* Minimal Polynomial */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Minimal Polynomials</h3>

          <Definition title="Minimal Polynomial">
            <p>
              The <strong>minimal polynomial</strong> of <Math>{'\\alpha'}</Math> over <Math>F</Math>
              is the monic polynomial of smallest degree in <Math>{'F[x]'}</Math> having <Math>{'\\alpha'}</Math>
              as a root.
            </p>
          </Definition>

          <Theorem title="Minimal Polynomial Properties">
            <ul className="list-disc list-inside space-y-1">
              <li>The minimal polynomial is unique</li>
              <li>It is irreducible over <Math>F</Math></li>
              <li>It divides any polynomial having <Math>{'\\alpha'}</Math> as a root</li>
              <li><Math>{'[F(\\alpha):F] = \\deg(\\min_F(\\alpha))'}</Math></li>
            </ul>
          </Theorem>

          <Example title="Minimal Polynomials">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\min_{\\mathbb{Q}}(\\sqrt{2}) = x^2 - 2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\min_{\\mathbb{Q}}(i) = x^2 + 1'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\min_{\\mathbb{Q}}(\\sqrt[3]{2}) = x^3 - 2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\min_{\\mathbb{R}}(i) = x^2 + 1'}</Math></p>
                <p className="text-dark-400 text-sm">Same as over <Math>{'\\mathbb{Q}'}</Math>!</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Algebraic Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Algebraic Extensions</h3>

          <Definition title="Algebraic Extension">
            <p>
              <Math>{'E/F'}</Math> is an <strong>algebraic extension</strong> if every element of
              <Math>E</Math> is algebraic over <Math>F</Math>.
            </p>
          </Definition>

          <Theorem title="Finite implies Algebraic">
            <p>
              Every finite extension is algebraic. The converse is false.
            </p>
          </Theorem>

          <Example title="Infinite Algebraic Extension">
            <div className="bg-dark-900 p-4 rounded">
              <p>Let <Math>{'\\bar{\\mathbb{Q}}'}</Math> = algebraic closure of <Math>{'\\mathbb{Q}'}</Math>.</p>
              <p className="mt-2 text-dark-300">
                <Math>{'\\bar{\\mathbb{Q}}/\\mathbb{Q}'}</Math> is algebraic but infinite-dimensional
                (contains <Math>{'\\sqrt[n]{2}'}</Math> for all <Math>n</Math>).
              </p>
            </div>
          </Example>
        </section>

        {/* Algebraic Closure */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Algebraic Closure</h3>

          <Definition title="Algebraically Closed">
            <p>
              A field <Math>F</Math> is <strong>algebraically closed</strong> if every nonconstant
              polynomial in <Math>{'F[x]'}</Math> has a root in <Math>F</Math>.
            </p>
          </Definition>

          <Definition title="Algebraic Closure">
            <p>
              An <strong>algebraic closure</strong> <Math>{'\\bar{F}'}</Math> of <Math>F</Math> is an
              algebraically closed field that is algebraic over <Math>F</Math>.
            </p>
          </Definition>

          <Theorem title="Existence and Uniqueness">
            <p>
              Every field has an algebraic closure, unique up to isomorphism over <Math>F</Math>.
            </p>
          </Theorem>

          <Example title="Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\mathbb{C}'}</Math> is algebraically closed (Fundamental Theorem of Algebra)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\bar{\\mathbb{Q}} \\subset \\mathbb{C}'}</Math> is the algebraic closure of <Math>{'\\mathbb{Q}'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p><Math>{'\\bar{\\mathbb{F}_p}'}</Math> is the algebraic closure of <Math>{'\\mathbb{F}_p'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Conjugates */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Conjugates</h3>

          <Definition title="Conjugates">
            <p>
              The <strong>conjugates</strong> of <Math>{'\\alpha'}</Math> over <Math>F</Math> are the
              roots of its minimal polynomial over <Math>F</Math>.
            </p>
          </Definition>

          <Example title="Conjugates">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Conjugates of <Math>{'\\sqrt{2}'}</Math> over <Math>{'\\mathbb{Q}'}</Math>: <Math>{'\\pm\\sqrt{2}'}</Math></p>
              <p>Conjugates of <Math>{'\\sqrt[3]{2}'}</Math> over <Math>{'\\mathbb{Q}'}</Math>: <Math>{'\\sqrt[3]{2}, \\sqrt[3]{2}\\omega, \\sqrt[3]{2}\\omega^2'}</Math></p>
              <p className="text-dark-400 text-sm">where <Math>{'\\omega = e^{2\\pi i/3}'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Minimal polynomial:</strong> unique, monic, irreducible.
            </li>
            <li>
              <Math>{'[F(\\alpha):F] = \\deg(\\text{min poly})'}</Math>.
            </li>
            <li>
              <strong>Algebraic closure:</strong> algebraically closed + algebraic over <Math>F</Math>.
            </li>
            <li>
              <Math>{'\\mathbb{C}'}</Math> is the algebraic closure of <Math>{'\\mathbb{R}'}</Math>.
            </li>
            <li>
              Conjugates are roots of the minimal polynomial.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
