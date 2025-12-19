import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section26() {
  return (
    <LessonLayout sectionId={26}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            The <strong>field of quotients</strong> construction extends an integral domain to a field,
            just as <Math>{'\\mathbb{Q}'}</Math> is built from <Math>{'\\mathbb{Z}'}</Math>. This
            construction shows that every integral domain embeds in a "smallest" field.
          </p>
        </section>

        {/* Motivation */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Motivation: From Z to Q</h3>

          <div className="card">
            <p className="text-dark-300 mb-3">
              The integers <Math>{'\\mathbb{Z}'}</Math> lack multiplicative inverses for most elements.
              We construct <Math>{'\\mathbb{Q}'}</Math> by introducing "fractions" <Math>{'a/b'}</Math>.
            </p>
            <p className="text-dark-300">
              The same idea works for any integral domain!
            </p>
          </div>
        </section>

        {/* Construction */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Construction</h3>

          <Definition title="Field of Quotients">
            <p>
              Let <Math>D</Math> be an integral domain. Consider pairs <Math>{'(a, b)'}</Math> with
              <Math>{'a, b \\in D'}</Math> and <Math>{'b \\neq 0'}</Math>. Define equivalence:
            </p>
            <MathBlock>{'(a, b) \\sim (c, d) \\iff ad = bc'}</MathBlock>
            <p className="mt-2">
              The <strong>field of quotients</strong> <Math>{'Q(D)'}</Math> is the set of equivalence
              classes <Math>{'[a, b] = a/b'}</Math> with operations:
            </p>
            <MathBlock>{'\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\quad \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}'}</MathBlock>
          </Definition>

          <div className="callout-info">
            <p>
              <strong>Why no zero divisors?</strong> We need <Math>{'ad = bc'}</Math> to imply the
              fractions are equal. This requires cancellation, which requires no zero divisors.
            </p>
          </div>
        </section>

        {/* Verification */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Verifying the Construction</h3>

          <Theorem title="Q(D) is a Field">
            <p>
              For any integral domain <Math>D</Math>, the field of quotients <Math>{'Q(D)'}</Math> is
              a field containing an isomorphic copy of <Math>D</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Key Verifications</h4>
            <ul className="space-y-2 text-dark-300">
              <li>
                <strong>Well-defined:</strong> Operations don't depend on representative choice
              </li>
              <li>
                <strong>Additive identity:</strong> <Math>{'0/1'}</Math>
              </li>
              <li>
                <strong>Multiplicative identity:</strong> <Math>{'1/1'}</Math>
              </li>
              <li>
                <strong>Additive inverse:</strong> <Math>{'-a/b = (-a)/b'}</Math>
              </li>
              <li>
                <strong>Multiplicative inverse:</strong> <Math>{'(a/b)^{-1} = b/a'}</Math> for <Math>{'a \\neq 0'}</Math>
              </li>
            </ul>
          </div>
        </section>

        {/* Embedding */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Embedding D in Q(D)</h3>

          <Theorem title="Canonical Embedding">
            <p>
              The map <Math>{'\\iota: D \\to Q(D)'}</Math> given by <Math>{'\\iota(a) = a/1'}</Math> is
              an injective ring homomorphism.
            </p>
          </Theorem>

          <div className="card">
            <p className="text-dark-300">
              We identify <Math>D</Math> with its image <Math>{'\\iota(D)'}</Math> in <Math>{'Q(D)'}</Math>.
              Thus <Math>D</Math> "lives inside" its field of quotients.
            </p>
          </div>
        </section>

        {/* Examples */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Examples</h3>

          <Example title="Fields of Quotients">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'Q(\\mathbb{Z}) = \\mathbb{Q}'}</Math></p>
                <p className="text-dark-300">The rationals are the field of quotients of integers</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'Q(\\mathbb{Z}[x]) = \\mathbb{Q}(x)'}</Math></p>
                <p className="text-dark-300">Rational functions with integer (or rational) coefficients</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'Q(\\mathbb{Z}[i]) = \\mathbb{Q}(i)'}</Math></p>
                <p className="text-dark-300">Gaussian rationals</p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400"><Math>{'Q(F) = F'}</Math> for field <Math>F</Math></p>
                <p className="text-dark-300">A field is its own field of quotients</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Universal Property */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Universal Property</h3>

          <Theorem title="Universal Property of Q(D)">
            <p>
              <Math>{'Q(D)'}</Math> is the "smallest" field containing <Math>D</Math>: if <Math>F</Math>
              is any field with an embedding <Math>{'\\phi: D \\hookrightarrow F'}</Math>, then there
              exists a unique embedding <Math>{'\\bar{\\phi}: Q(D) \\hookrightarrow F'}</Math> extending <Math>{'\\phi'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Diagram</h4>
            <div className="text-center text-dark-300">
              <p>D → Q(D)</p>
              <p>↘ ↙</p>
              <p>F</p>
            </div>
            <p className="text-dark-400 text-sm mt-2 text-center">
              <Math>{'\\bar{\\phi}(a/b) = \\phi(a)/\\phi(b)'}</Math>
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Every integral domain <Math>D</Math> embeds in a field <Math>{'Q(D)'}</Math>.
            </li>
            <li>
              <Math>{'Q(D)'}</Math> consists of "fractions" <Math>{'a/b'}</Math> with equivalence <Math>{'ad = bc'}</Math>.
            </li>
            <li>
              The construction generalizes <Math>{'\\mathbb{Z} \\to \\mathbb{Q}'}</Math>.
            </li>
            <li>
              <Math>{'Q(D)'}</Math> is the smallest field containing <Math>D</Math> (universal property).
            </li>
            <li>
              If <Math>D</Math> is already a field, <Math>{'Q(D) = D'}</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
