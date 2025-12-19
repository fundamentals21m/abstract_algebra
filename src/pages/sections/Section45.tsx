import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section45() {
  return (
    <LessonLayout sectionId={45}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Separable extensions</strong> ensure that polynomials have distinct roots.
            In characteristic zero, all extensions are separable, but in positive characteristic,
            separability becomes a crucial condition for Galois theory to work smoothly.
          </p>
        </section>

        {/* Separable Polynomials */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Separable Polynomials</h3>

          <Definition title="Separable Polynomial">
            <p>
              A polynomial <Math>{'f(x) \\in F[x]'}</Math> is <strong>separable</strong> if it has
              no repeated roots in its splitting field (equivalently, in <Math>{'\\bar{F}'}</Math>).
            </p>
          </Definition>

          <Theorem title="Derivative Test">
            <p>
              <Math>f(x)</Math> is separable iff <Math>{'\\gcd(f, f\') = 1'}</Math>.
            </p>
          </Theorem>

          <Example title="Separability Check">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'f(x) = x^2 - 2'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'f\' = 2x'}</Math>, <Math>{'\\gcd(x^2-2, 2x) = 1'}</Math> ✓ Separable
                </p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'g(x) = x^2 - 2x + 1 = (x-1)^2'}</Math></p>
                <p className="text-dark-300">
                  <Math>{'g\' = 2x - 2'}</Math>, <Math>{'\\gcd = x - 1'}</Math> ✗ Not separable
                </p>
              </div>
            </div>
          </Example>

          <Theorem title="Irreducible Separability">
            <p>
              An irreducible polynomial <Math>{'f(x) \\in F[x]'}</Math> is separable iff <Math>{'f\' \\neq 0'}</Math>.
            </p>
            <p className="mt-2 text-dark-300">
              In characteristic 0: all irreducible polynomials are separable.
            </p>
          </Theorem>
        </section>

        {/* Separable Elements and Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Separable Extensions</h3>

          <Definition title="Separable Element">
            <p>
              An algebraic element <Math>{'\\alpha'}</Math> over <Math>F</Math> is <strong>separable</strong>
              if its minimal polynomial over <Math>F</Math> is separable.
            </p>
          </Definition>

          <Definition title="Separable Extension">
            <p>
              An algebraic extension <Math>{'E/F'}</Math> is <strong>separable</strong> if every
              element of <Math>E</Math> is separable over <Math>F</Math>.
            </p>
          </Definition>

          <Theorem title="Characteristic Zero">
            <p>
              Every algebraic extension of a field of characteristic 0 is separable.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Perfect fields:</strong> A field <Math>F</Math> is <strong>perfect</strong> if every
              algebraic extension is separable. All fields of characteristic 0 and all finite fields are perfect.
            </p>
          </div>
        </section>

        {/* Inseparable Extensions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Inseparable Extensions</h3>

          <Example title="An Inseparable Extension">
            <div className="bg-dark-900 p-4 rounded">
              <p>Let <Math>{'F = \\mathbb{F}_p(t)'}</Math> (rational functions over <Math>{'\\mathbb{F}_p'}</Math>).</p>
              <p className="mt-2">
                Consider <Math>{'f(x) = x^p - t \\in F[x]'}</Math>.
              </p>
              <p className="mt-2">
                <Math>{'f\'(x) = px^{p-1} = 0'}</Math> in characteristic <Math>p</Math>!
              </p>
              <p className="text-dark-300 mt-2">
                If <Math>{'\\alpha^p = t'}</Math>, then <Math>{'f(x) = (x - \\alpha)^p'}</Math> in
                <Math>{'\\bar{F}'}</Math>.
              </p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\alpha'}</Math> is inseparable: minimal polynomial <Math>{'x^p - t'}</Math> has repeated root.
              </p>
            </div>
          </Example>

          <Definition title="Separable Degree">
            <p>
              The <strong>separable degree</strong> <Math>{'[E:F]_s'}</Math> is the number of distinct
              embeddings of <Math>E</Math> into <Math>{'\\bar{F}'}</Math> fixing <Math>F</Math>.
            </p>
            <MathBlock>{'[E:F] = [E:F]_s \\cdot [E:F]_i'}</MathBlock>
            <p className="mt-2">where <Math>{'[E:F]_i'}</Math> is the <strong>inseparable degree</strong>.</p>
          </Definition>
        </section>

        {/* The Separable Closure */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Separable Closure</h3>

          <Definition title="Separable Closure">
            <p>
              The <strong>separable closure</strong> of <Math>F</Math> in <Math>E</Math> is:
            </p>
            <MathBlock>{'F^{sep} = \\{\\alpha \\in E : \\alpha \\text{ is separable over } F\\}'}</MathBlock>
          </Definition>

          <Theorem title="Separable Closure is a Field">
            <p>
              <Math>{'F^{sep}'}</Math> is a subfield of <Math>E</Math> containing <Math>F</Math>,
              and <Math>{'F^{sep}/F'}</Math> is the largest separable subextension of <Math>{'E/F'}</Math>.
            </p>
          </Theorem>
        </section>

        {/* Galois Connection */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Connection to Galois Theory</h3>

          <Theorem title="Separable + Normal = Galois">
            <p>
              A finite extension <Math>{'E/F'}</Math> is Galois iff it is both separable and normal.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Components of Galois</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-3 rounded">
                <p className="text-primary-400 font-semibold">Normal</p>
                <p className="text-dark-300 text-sm">Splitting field condition: all conjugates present</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="text-primary-400 font-semibold">Separable</p>
                <p className="text-dark-300 text-sm">Distinct roots condition: no repeated roots</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Separable:</strong> no repeated roots (<Math>{'\\gcd(f, f\') = 1'}</Math>).
            </li>
            <li>
              All characteristic 0 extensions are separable.
            </li>
            <li>
              Inseparability only occurs in positive characteristic.
            </li>
            <li>
              <Math>{'[E:F] = [E:F]_s \\cdot [E:F]_i'}</Math> (separable × inseparable degrees).
            </li>
            <li>
              <strong>Galois = separable + normal.</strong>
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
