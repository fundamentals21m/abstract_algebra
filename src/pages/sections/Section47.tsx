import { LessonLayout } from '../../components/layout';
import { Example, Math } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section47() {
  return (
    <LessonLayout sectionId={47}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            We illustrate Galois theory with detailed examples, showing how to compute Galois
            groups, identify intermediate fields, and verify the Galois correspondence in action.
          </p>
        </section>

        {/* Quadratic Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Quadratic Extensions</h3>

          <Example title="Single Quadratic">
            <div className="bg-dark-900 p-4 rounded space-y-3">
              <p className="font-semibold">
                <Math>{'E = \\mathbb{Q}(\\sqrt{5})'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              </p>
              <div className="text-dark-300">
                <p>Minimal polynomial: <Math>{'x^2 - 5'}</Math></p>
                <p>Degree: <Math>{'[E:\\mathbb{Q}] = 2'}</Math></p>
                <p>Galois group: <Math>{'\\text{Gal}(E/\\mathbb{Q}) \\cong \\mathbb{Z}_2'}</Math></p>
              </div>
              <p className="text-dark-400 text-sm">
                Automorphisms: <Math>{'id'}</Math> and <Math>{'\\sigma: \\sqrt{5} \\mapsto -\\sqrt{5}'}</Math>
              </p>
              <p className="text-dark-400 text-sm">
                Only intermediate field: <Math>{'\\mathbb{Q}'}</Math> (corresponding to full group)
              </p>
            </div>
          </Example>

          <Example title="Biquadratic Extension">
            <div className="bg-dark-900 p-4 rounded space-y-3">
              <p className="font-semibold">
                <Math>{'E = \\mathbb{Q}(\\sqrt{2}, \\sqrt{5})'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              </p>
              <div className="text-dark-300">
                <p>Degree: <Math>{'[E:\\mathbb{Q}] = 4'}</Math></p>
                <p>Basis: <Math>{'\\{1, \\sqrt{2}, \\sqrt{5}, \\sqrt{10}\\}'}</Math></p>
                <p>Galois group: <Math>{'\\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math></p>
              </div>
              <p className="text-primary-400 mt-2">Three intermediate fields (degree 2):</p>
              <ul className="list-disc list-inside text-dark-400 text-sm">
                <li><Math>{'\\mathbb{Q}(\\sqrt{2})'}</Math></li>
                <li><Math>{'\\mathbb{Q}(\\sqrt{5})'}</Math></li>
                <li><Math>{'\\mathbb{Q}(\\sqrt{10})'}</Math></li>
              </ul>
            </div>
          </Example>
        </section>

        {/* Cubic Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cubic Extensions</h3>

          <Example title="x³ - 2 (Full Example)">
            <div className="bg-dark-900 p-4 rounded space-y-4">
              <p className="font-semibold">
                Splitting field of <Math>{'f(x) = x^3 - 2'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              </p>

              <div>
                <p className="text-primary-400">Roots:</p>
                <p className="text-dark-300">
                  <Math>{'\\alpha = \\sqrt[3]{2}'}</Math>,
                  <Math>{'\\beta = \\sqrt[3]{2}\\omega'}</Math>,
                  <Math>{'\\gamma = \\sqrt[3]{2}\\omega^2'}</Math>
                </p>
                <p className="text-dark-400 text-sm">where <Math>{'\\omega = e^{2\\pi i/3}'}</Math></p>
              </div>

              <div>
                <p className="text-primary-400">Splitting field:</p>
                <p className="text-dark-300">
                  <Math>{'E = \\mathbb{Q}(\\sqrt[3]{2}, \\omega)'}</Math>
                </p>
                <p className="text-dark-400 text-sm">
                  <Math>{'[E:\\mathbb{Q}] = 6'}</Math> (not 3! because need <Math>{'\\omega'}</Math>)
                </p>
              </div>

              <div>
                <p className="text-primary-400">Galois group:</p>
                <p className="text-dark-300"><Math>{'\\text{Gal}(E/\\mathbb{Q}) \\cong S_3'}</Math></p>
                <ul className="text-dark-400 text-sm mt-2 space-y-1">
                  <li><Math>{'\\sigma'}</Math>: permutes the roots cyclically <Math>{'(\\alpha \\beta \\gamma)'}</Math></li>
                  <li><Math>{'\\tau'}</Math>: complex conjugation <Math>{'(\\beta \\gamma)'}</Math></li>
                </ul>
              </div>

              <div>
                <p className="text-primary-400">Intermediate fields:</p>
                <ul className="text-dark-300 text-sm space-y-1">
                  <li><Math>{'\\mathbb{Q}(\\sqrt[3]{2})'}</Math> — fixed by <Math>{'\\langle \\tau \\rangle \\cong \\mathbb{Z}_2'}</Math></li>
                  <li><Math>{'\\mathbb{Q}(\\sqrt[3]{2}\\omega)'}</Math> — fixed by <Math>{'\\langle \\sigma\\tau\\sigma^{-1} \\rangle'}</Math></li>
                  <li><Math>{'\\mathbb{Q}(\\sqrt[3]{2}\\omega^2)'}</Math> — fixed by <Math>{'\\langle \\sigma^2\\tau\\sigma^{-2} \\rangle'}</Math></li>
                  <li><Math>{'\\mathbb{Q}(\\omega)'}</Math> — fixed by <Math>{'\\langle \\sigma \\rangle \\cong \\mathbb{Z}_3'}</Math> (only normal one!)</li>
                </ul>
              </div>
            </div>
          </Example>

          <div className="callout-info">
            <p>
              <strong>Note:</strong> <Math>{'\\mathbb{Q}(\\sqrt[3]{2})/\\mathbb{Q}'}</Math> alone is NOT Galois
              because <Math>{'\\langle \\tau \\rangle'}</Math> is not normal in <Math>{'S_3'}</Math>.
              Only <Math>{'\\mathbb{Q}(\\omega)/\\mathbb{Q}'}</Math> is Galois among the intermediate fields.
            </p>
          </div>
        </section>

        {/* Quartic Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Quartic Extensions</h3>

          <Example title="x⁴ - 2">
            <div className="bg-dark-900 p-4 rounded space-y-4">
              <p className="font-semibold">
                Splitting field of <Math>{'f(x) = x^4 - 2'}</Math> over <Math>{'\\mathbb{Q}'}</Math>
              </p>

              <div>
                <p className="text-primary-400">Roots:</p>
                <p className="text-dark-300">
                  <Math>{'\\pm\\sqrt[4]{2}, \\pm i\\sqrt[4]{2}'}</Math>
                </p>
              </div>

              <div>
                <p className="text-primary-400">Splitting field:</p>
                <p className="text-dark-300">
                  <Math>{'E = \\mathbb{Q}(\\sqrt[4]{2}, i)'}</Math>, degree 8
                </p>
              </div>

              <div>
                <p className="text-primary-400">Galois group:</p>
                <p className="text-dark-300"><Math>{'\\text{Gal}(E/\\mathbb{Q}) \\cong D_4'}</Math></p>
                <p className="text-dark-400 text-sm">
                  Dihedral group of order 8 (symmetries of a square)
                </p>
              </div>
            </div>
          </Example>
        </section>

        {/* Computing Technique */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Computation Strategy</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Steps to Analyze a Galois Extension</h4>
            <ol className="list-decimal list-inside space-y-2 text-dark-300">
              <li>Find the splitting field <Math>E</Math> and compute <Math>{'[E:F]'}</Math></li>
              <li>Identify the roots and their relationships</li>
              <li>Determine automorphisms by where they send roots</li>
              <li>Identify the group structure (cyclic, dihedral, symmetric, etc.)</li>
              <li>List subgroups and their corresponding fixed fields</li>
              <li>Check which correspond to normal/Galois extensions</li>
            </ol>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Quadratic extensions have Galois group <Math>{'\\mathbb{Z}_2'}</Math>.
            </li>
            <li>
              Biquadratic extensions have Galois group <Math>{'\\mathbb{Z}_2 \\times \\mathbb{Z}_2'}</Math>.
            </li>
            <li>
              <Math>{'x^3 - 2'}</Math>: splitting field has Galois group <Math>{'S_3'}</Math>.
            </li>
            <li>
              <Math>{'x^4 - 2'}</Math>: splitting field has Galois group <Math>{'D_4'}</Math>.
            </li>
            <li>
              Normal subgroups ↔ Galois subextensions.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
