import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { IdealsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section31() {
  return (
    <LessonLayout sectionId={31}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Prime</strong> and <strong>maximal ideals</strong> are special ideals that reveal
            deep properties of rings. Maximal ideals correspond to fields, and prime ideals correspond
            to integral domains—key for algebraic geometry.
          </p>
        </section>

        {/* Prime Ideals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Prime Ideals</h3>

          <Definition title="Prime Ideal">
            <p>
              A proper ideal <Math>P</Math> of a commutative ring <Math>R</Math> is <strong>prime</strong> if:
            </p>
            <MathBlock>{'ab \\in P \\implies a \\in P \\text{ or } b \\in P'}</MathBlock>
          </Definition>

          <Theorem title="Characterization of Prime Ideals">
            <p>
              An ideal <Math>P</Math> is prime if and only if <Math>{'R/P'}</Math> is an integral domain.
            </p>
          </Theorem>

          <Example title="Prime Ideals">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'p\\mathbb{Z}'}</Math> for prime <Math>p</Math></p>
                <p className="text-dark-300"><Math>{'\\mathbb{Z}/p\\mathbb{Z} = \\mathbb{Z}_p'}</Math> is an integral domain (field)</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'(x)'}</Math> in <Math>{'F[x]'}</Math></p>
                <p className="text-dark-300"><Math>{'F[x]/(x) \\cong F'}</Math> is a field</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'(x, y)'}</Math> in <Math>{'\\mathbb{R}[x,y]'}</Math></p>
                <p className="text-dark-300"><Math>{'\\mathbb{R}[x,y]/(x,y) \\cong \\mathbb{R}'}</Math></p>
              </div>
            </div>
          </Example>
        </section>

        {/* Maximal Ideals */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Maximal Ideals</h3>

          <Definition title="Maximal Ideal">
            <p>
              A proper ideal <Math>M</Math> of <Math>R</Math> is <strong>maximal</strong> if
              the only ideals containing <Math>M</Math> are <Math>M</Math> and <Math>R</Math> itself.
            </p>
          </Definition>

          <Theorem title="Characterization of Maximal Ideals">
            <p>
              An ideal <Math>M</Math> is maximal if and only if <Math>{'R/M'}</Math> is a field.
            </p>
          </Theorem>

          <Example title="Maximal Ideals">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'p\\mathbb{Z}'}</Math> in <Math>{'\\mathbb{Z}'}</Math></p>
                <p className="text-dark-300"><Math>{'\\mathbb{Z}/p\\mathbb{Z}'}</Math> is a field, so <Math>{'p\\mathbb{Z}'}</Math> is maximal</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'(x^2 + 1)'}</Math> in <Math>{'\\mathbb{R}[x]'}</Math></p>
                <p className="text-dark-300"><Math>{'\\mathbb{R}[x]/(x^2+1) \\cong \\mathbb{C}'}</Math> is a field</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-red-400"><Math>{'(x)'}</Math> in <Math>{'\\mathbb{Z}[x]'}</Math> is NOT maximal</p>
                <p className="text-dark-300"><Math>{'\\mathbb{Z}[x]/(x) \\cong \\mathbb{Z}'}</Math> is not a field</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Relationship */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Prime vs Maximal</h3>

          <Theorem title="Maximal implies Prime">
            <p>
              Every maximal ideal is prime. (Because every field is an integral domain.)
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Converse fails:</strong> Not every prime ideal is maximal.
              In <Math>{'\\mathbb{Z}'}</Math>, <Math>{'(0)'}</Math> is prime but not maximal.
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold mb-3">In PIDs</h4>
            <p className="text-dark-300">
              In a principal ideal domain, a nonzero ideal <Math>{'(p)'}</Math> is prime iff it is maximal
              iff <Math>p</Math> is irreducible.
            </p>
          </div>
        </section>

        {/* Algebraic Geometry Connection */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Algebraic Geometry Preview</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Varieties and Ideals</h4>
            <p className="text-dark-300 mb-3">
              In algebraic geometry, there's a correspondence:
            </p>
            <ul className="space-y-2 text-dark-300">
              <li><strong>Points</strong> ↔ Maximal ideals</li>
              <li><strong>Irreducible varieties</strong> ↔ Prime ideals</li>
              <li><strong>All varieties</strong> ↔ Radical ideals</li>
            </ul>
          </div>

          <Example title="Points as Maximal Ideals">
            <div className="bg-dark-900 p-4 rounded">
              <p>The point <Math>{'(a, b) \\in \\mathbb{R}^2'}</Math> corresponds to:</p>
              <p className="mt-2 text-primary-400"><Math>{'\\mathfrak{m} = (x - a, y - b) \\subset \\mathbb{R}[x, y]'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                This is maximal: <Math>{'\\mathbb{R}[x,y]/(x-a, y-b) \\cong \\mathbb{R}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Spectrum */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Spectrum of a Ring</h3>

          <Definition title="Spec(R)">
            <p>
              The <strong>prime spectrum</strong> <Math>{'\\text{Spec}(R)'}</Math> is the set of all
              prime ideals of <Math>R</Math>, equipped with the Zariski topology.
            </p>
          </Definition>

          <Example title="Spec(Z)">
            <div className="bg-dark-900 p-4 rounded">
              <p><Math>{'\\text{Spec}(\\mathbb{Z}) = \\{(0), (2), (3), (5), (7), (11), ...\\}'}</Math></p>
              <p className="text-dark-400 text-sm mt-2">
                One point for each prime, plus the "generic point" (0)
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Prime ideal:</strong> <Math>{'R/P'}</Math> is an integral domain.
            </li>
            <li>
              <strong>Maximal ideal:</strong> <Math>{'R/M'}</Math> is a field.
            </li>
            <li>
              Maximal ⟹ Prime (field ⟹ integral domain).
            </li>
            <li>
              In a PID: nonzero prime ⟺ maximal ⟺ generated by irreducible.
            </li>
            <li>
              Prime ideals form the "spectrum" of a ring (algebraic geometry).
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
