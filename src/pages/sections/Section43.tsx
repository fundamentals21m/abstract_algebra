import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { GaloisQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section43() {
  return (
    <LessonLayout sectionId={43}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Galois theory</strong> connects field extensions with group theory through
            automorphisms. This beautiful correspondence reveals when polynomial equations can
            be solved by radicals and provides deep insights into algebraic structures.
          </p>
        </section>

        {/* Field Automorphisms */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Field Automorphisms</h3>

          <Definition title="Automorphism">
            <p>
              An <strong>automorphism</strong> of a field <Math>E</Math> is an isomorphism
              <Math>{'\\sigma: E \\to E'}</Math>. The set of all automorphisms forms a group
              under composition.
            </p>
          </Definition>

          <Definition title="Fixing a Subfield">
            <p>
              An automorphism <Math>{'\\sigma'}</Math> of <Math>{'E/F'}</Math> <strong>fixes</strong>
              <Math>F</Math> if <Math>{'\\sigma(a) = a'}</Math> for all <Math>{'a \\in F'}</Math>.
            </p>
          </Definition>

          <Example title="Automorphisms of C">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\sigma: \\mathbb{C} \\to \\mathbb{C}'}</Math> by <Math>{'\\sigma(a + bi) = a - bi'}</Math></p>
              <p className="text-dark-300">Complex conjugation is an automorphism fixing <Math>{'\\mathbb{R}'}</Math>.</p>
              <p className="text-dark-400 text-sm mt-2">
                <Math>{'\\text{Aut}(\\mathbb{C}/\\mathbb{R}) = \\{id, \\sigma\\} \\cong \\mathbb{Z}_2'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Galois Group */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Galois Group</h3>

          <Definition title="Galois Group">
            <p>
              The <strong>Galois group</strong> of <Math>{'E/F'}</Math> is:
            </p>
            <MathBlock>{'\\text{Gal}(E/F) = \\{\\sigma \\in \\text{Aut}(E) : \\sigma|_F = id_F\\}'}</MathBlock>
          </Definition>

          <Example title="Galois Group Examples">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\text{Gal}(\\mathbb{Q}(\\sqrt{2})/\\mathbb{Q})'}</Math></p>
                <p className="text-dark-300">
                  Two automorphisms: <Math>{'id'}</Math> and <Math>{'\\sqrt{2} \\mapsto -\\sqrt{2}'}</Math>
                </p>
                <p className="text-dark-400 text-sm"><Math>{'\\cong \\mathbb{Z}_2'}</Math></p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'\\text{Gal}(\\mathbb{Q}(\\sqrt{2}, \\sqrt{3})/\\mathbb{Q})'}</Math></p>
                <p className="text-dark-300">
                  Four automorphisms: can independently map <Math>{'\\sqrt{2} \\mapsto \\pm\\sqrt{2}'}</Math>
                  and <Math>{'\\sqrt{3} \\mapsto \\pm\\sqrt{3}'}</Math>
                </p>
                <p className="text-dark-400 text-sm"><Math>{'\\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math></p>
              </div>
            </div>
          </Example>

          <Theorem title="Automorphisms Permute Roots">
            <p>
              If <Math>{'\\sigma \\in \\text{Gal}(E/F)'}</Math> and <Math>{'\\alpha \\in E'}</Math> is a root of
              <Math>{'f(x) \\in F[x]'}</Math>, then <Math>{'\\sigma(\\alpha)'}</Math> is also a root of <Math>{'f(x)'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Fixed Fields */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Fixed Fields</h3>

          <Definition title="Fixed Field">
            <p>
              For a subgroup <Math>{'H \\leq \\text{Gal}(E/F)'}</Math>, the <strong>fixed field</strong> is:
            </p>
            <MathBlock>{'E^H = \\{\\alpha \\in E : \\sigma(\\alpha) = \\alpha \\text{ for all } \\sigma \\in H\\}'}</MathBlock>
          </Definition>

          <Example title="Fixed Field Computation">
            <div className="bg-dark-900 p-4 rounded">
              <p>Let <Math>{'E = \\mathbb{Q}(\\sqrt{2}, \\sqrt{3})'}</Math> over <Math>{'\\mathbb{Q}'}</Math>.</p>
              <p className="mt-2">
                <Math>{'H = \\langle \\sigma \\rangle'}</Math> where <Math>{'\\sigma: \\sqrt{2} \\mapsto -\\sqrt{2}, \\sqrt{3} \\mapsto \\sqrt{3}'}</Math>
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'E^H = \\mathbb{Q}(\\sqrt{3})'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Galois Extension */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Galois Extensions</h3>

          <Definition title="Galois Extension">
            <p>
              An extension <Math>{'E/F'}</Math> is <strong>Galois</strong> if <Math>{'E^{\\text{Gal}(E/F)} = F'}</Math>,
              equivalently, if <Math>{'|\\text{Gal}(E/F)| = [E:F]'}</Math>.
            </p>
          </Definition>

          <Theorem title="Characterization of Galois Extensions">
            <p>
              <Math>{'E/F'}</Math> is Galois iff <Math>E</Math> is a splitting field of a separable polynomial over <Math>F</Math>.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Not all extensions are Galois!</strong> For example, <Math>{'\\mathbb{Q}(\\sqrt[3]{2})/\\mathbb{Q}'}</Math>
              is not Galois because complex conjugates of <Math>{'\\sqrt[3]{2}'}</Math> are not in
              <Math>{'\\mathbb{Q}(\\sqrt[3]{2})'}</Math>.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Galois group:</strong> automorphisms fixing the base field.
            </li>
            <li>
              Automorphisms permute roots of polynomials.
            </li>
            <li>
              <strong>Fixed field:</strong> elements unchanged by a subgroup of automorphisms.
            </li>
            <li>
              Galois extensions satisfy <Math>{'|\\text{Gal}(E/F)| = [E:F]'}</Math>.
            </li>
            <li>
              Galois = splitting field of separable polynomial.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <GaloisQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
