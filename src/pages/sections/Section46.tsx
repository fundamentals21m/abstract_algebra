import { LessonLayout } from '../../components/layout';
import { Theorem, Example, Math, MathBlock } from '../../components/common';
import { GaloisQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section46() {
  return (
    <LessonLayout sectionId={46}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            The <strong>Fundamental Theorem of Galois Theory</strong> establishes a beautiful
            correspondence between intermediate fields and subgroups of the Galois group. This
            correspondence reverses inclusion and converts field-theoretic properties to group-theoretic ones.
          </p>
        </section>

        {/* The Correspondence */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Galois Correspondence</h3>

          <Theorem title="Fundamental Theorem of Galois Theory">
            <p>
              Let <Math>{'E/F'}</Math> be a finite Galois extension with <Math>{'G = \\text{Gal}(E/F)'}</Math>.
              There is a bijection:
            </p>
            <MathBlock>{'\\{\\text{intermediate fields } F \\subseteq K \\subseteq E\\} \\longleftrightarrow \\{\\text{subgroups } H \\leq G\\}'}</MathBlock>
            <p className="mt-2">given by:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'K \\mapsto \\text{Gal}(E/K)'}</Math></li>
              <li><Math>{'H \\mapsto E^H'}</Math> (fixed field)</li>
            </ul>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Properties of the Correspondence</h4>
            <ul className="space-y-2 text-dark-300">
              <li><strong>Inclusion-reversing:</strong> <Math>{'K_1 \\subseteq K_2 \\iff \\text{Gal}(E/K_1) \\supseteq \\text{Gal}(E/K_2)'}</Math></li>
              <li><strong>Degree-index:</strong> <Math>{'[K:F] = [G : \\text{Gal}(E/K)]'}</Math></li>
              <li><strong>Normal subfields:</strong> <Math>{'K/F'}</Math> is Galois iff <Math>{'\\text{Gal}(E/K) \\trianglelefteq G'}</Math></li>
              <li><strong>Quotient:</strong> If <Math>{'K/F'}</Math> is Galois, then <Math>{'\\text{Gal}(K/F) \\cong G/\\text{Gal}(E/K)'}</Math></li>
            </ul>
          </div>
        </section>

        {/* Example */}
        <section>
          <h3 className="text-xl font-semibold mb-4">A Complete Example</h3>

          <Example title="Galois Correspondence for Q(√2, √3)/Q">
            <div className="bg-dark-900 p-4 rounded space-y-4">
              <p className="font-semibold">Setup:</p>
              <p className="text-dark-300">
                <Math>{'E = \\mathbb{Q}(\\sqrt{2}, \\sqrt{3})'}</Math>, <Math>{'F = \\mathbb{Q}'}</Math>,
                <Math>{'[E:F] = 4'}</Math>
              </p>

              <p className="font-semibold mt-4">Galois Group:</p>
              <p className="text-dark-300">
                <Math>{'G = \\{e, \\sigma, \\tau, \\sigma\\tau\\} \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math>
              </p>
              <ul className="list-disc list-inside text-dark-400 text-sm mt-2">
                <li><Math>{'\\sigma: \\sqrt{2} \\mapsto -\\sqrt{2}, \\sqrt{3} \\mapsto \\sqrt{3}'}</Math></li>
                <li><Math>{'\\tau: \\sqrt{2} \\mapsto \\sqrt{2}, \\sqrt{3} \\mapsto -\\sqrt{3}'}</Math></li>
              </ul>

              <p className="font-semibold mt-4">Correspondence:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-primary-400 mb-2">Subgroups</p>
                  <ul className="text-dark-300 text-sm space-y-1">
                    <li><Math>{'\\{e\\}'}</Math></li>
                    <li><Math>{'\\langle\\sigma\\rangle = \\{e, \\sigma\\}'}</Math></li>
                    <li><Math>{'\\langle\\tau\\rangle = \\{e, \\tau\\}'}</Math></li>
                    <li><Math>{'\\langle\\sigma\\tau\\rangle = \\{e, \\sigma\\tau\\}'}</Math></li>
                    <li><Math>{'G'}</Math></li>
                  </ul>
                </div>
                <div>
                  <p className="text-primary-400 mb-2">Fixed Fields</p>
                  <ul className="text-dark-300 text-sm space-y-1">
                    <li><Math>{'E = \\mathbb{Q}(\\sqrt{2}, \\sqrt{3})'}</Math></li>
                    <li><Math>{'\\mathbb{Q}(\\sqrt{3})'}</Math></li>
                    <li><Math>{'\\mathbb{Q}(\\sqrt{2})'}</Math></li>
                    <li><Math>{'\\mathbb{Q}(\\sqrt{6})'}</Math></li>
                    <li><Math>{'F = \\mathbb{Q}'}</Math></li>
                  </ul>
                </div>
              </div>
            </div>
          </Example>
        </section>

        {/* Lattice Diagram */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Lattice Visualization</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Field Lattice vs Group Lattice</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-primary-400 mb-4">Intermediate Fields</p>
                <div className="text-dark-300 font-mono text-sm">
                  <p><Math>{'\\mathbb{Q}(\\sqrt{2}, \\sqrt{3})'}</Math></p>
                  <p className="text-dark-500">↗ ↑ ↖</p>
                  <p><Math>{'\\mathbb{Q}(\\sqrt{2}) \\quad \\mathbb{Q}(\\sqrt{6}) \\quad \\mathbb{Q}(\\sqrt{3})'}</Math></p>
                  <p className="text-dark-500">↖ ↑ ↗</p>
                  <p><Math>{'\\mathbb{Q}'}</Math></p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-primary-400 mb-4">Subgroups (reversed!)</p>
                <div className="text-dark-300 font-mono text-sm">
                  <p><Math>{'\\{e\\}'}</Math></p>
                  <p className="text-dark-500">↖ ↑ ↗</p>
                  <p><Math>{'\\langle\\tau\\rangle \\quad \\langle\\sigma\\tau\\rangle \\quad \\langle\\sigma\\rangle'}</Math></p>
                  <p className="text-dark-500">↗ ↑ ↖</p>
                  <p><Math>{'G'}</Math></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Normal Subgroups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Normal Extensions and Normal Subgroups</h3>

          <Theorem title="Normality Correspondence">
            <p>
              An intermediate field <Math>K</Math> is Galois over <Math>F</Math> iff the corresponding
              subgroup <Math>{'\\text{Gal}(E/K)'}</Math> is normal in <Math>G</Math>.
            </p>
            <p className="mt-2">In this case:</p>
            <MathBlock>{'\\text{Gal}(K/F) \\cong \\text{Gal}(E/F) / \\text{Gal}(E/K)'}</MathBlock>
          </Theorem>

          <Example title="All Intermediate Fields are Galois">
            <div className="bg-dark-900 p-4 rounded">
              <p>
                In <Math>{'\\mathbb{Q}(\\sqrt{2}, \\sqrt{3})/\\mathbb{Q}'}</Math>, all subgroups are normal
                (since <Math>{'G \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math> is abelian).
              </p>
              <p className="text-dark-300 mt-2">
                Therefore all intermediate fields are Galois over <Math>{'\\mathbb{Q}'}</Math>.
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Galois correspondence:</strong> bijection between intermediate fields and subgroups.
            </li>
            <li>
              Larger fields ↔ smaller subgroups (inclusion reversed).
            </li>
            <li>
              <Math>{'[K:F] = [G : \\text{Gal}(E/K)]'}</Math> (degree = index).
            </li>
            <li>
              <strong>Normal extension ↔ normal subgroup.</strong>
            </li>
            <li>
              <Math>{'\\text{Gal}(K/F) \\cong G/H'}</Math> when <Math>{'H = \\text{Gal}(E/K) \\trianglelefteq G'}</Math>.
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
