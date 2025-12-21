import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import { PresentationsQuiz } from '../../components/visualizations';
import 'katex/dist/katex.min.css';

export default function Section21() {
  return (
    <LessonLayout sectionId={21}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            A <strong>group presentation</strong> defines a group by specifying generators and
            relations. This is a compact, computable way to describe groups and connects
            abstract algebra to topology and geometric group theory.
          </p>
        </section>

        {/* Definition */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Group Presentations</h3>

          <Definition title="Group Presentation">
            <p>
              A <strong>presentation</strong> of a group consists of:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Generators:</strong> A set <Math>S</Math></li>
              <li><strong>Relations:</strong> A set <Math>R</Math> of words in <Math>{'F(S)'}</Math></li>
            </ul>
            <p className="mt-2">The presented group is:</p>
            <MathBlock>{'\\langle S \\mid R \\rangle = F(S) / \\langle\\langle R \\rangle\\rangle'}</MathBlock>
            <p className="mt-2">
              where <Math>{'\\langle\\langle R \\rangle\\rangle'}</Math> is the normal closure of <Math>R</Math>.
            </p>
          </Definition>

          <Example title="Standard Presentations">
            <div className="space-y-3">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Cyclic group <Math>{'\\mathbb{Z}_n'}</Math></p>
                <MathBlock>{'\\langle a \\mid a^n \\rangle'}</MathBlock>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Free abelian <Math>{'\\mathbb{Z}^2'}</Math></p>
                <MathBlock>{'\\langle a, b \\mid aba^{-1}b^{-1} \\rangle = \\langle a, b \\mid [a,b] \\rangle'}</MathBlock>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Dihedral group <Math>D_n</Math></p>
                <MathBlock>{'\\langle r, s \\mid r^n, s^2, (sr)^2 \\rangle'}</MathBlock>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400">Quaternion group <Math>Q_8</Math></p>
                <MathBlock>{'\\langle i, j \\mid i^4, i^2j^{-2}, ijij^{-1} \\rangle'}</MathBlock>
              </div>
            </div>
          </Example>
        </section>

        {/* Normal Closure */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Normal Closure</h3>

          <Definition title="Normal Closure">
            <p>
              The <strong>normal closure</strong> <Math>{'\\langle\\langle R \\rangle\\rangle'}</Math> of
              <Math>R</Math> in <Math>{'F(S)'}</Math> is the smallest normal subgroup containing <Math>R</Math>:
            </p>
            <MathBlock>{'\\langle\\langle R \\rangle\\rangle = \\langle grg^{-1} : g \\in F(S), r \\in R \\cup R^{-1} \\rangle'}</MathBlock>
          </Definition>

          <div className="callout-info">
            <p>
              <strong>Why normal closure?</strong> We quotient by a normal subgroup to get a well-defined
              quotient group. The normal closure ensures that if <Math>{'r = e'}</Math> as a relation,
              then <Math>{'grg^{-1} = e'}</Math> for all <Math>g</Math>.
            </p>
          </div>
        </section>

        {/* Verifying Presentations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Working with Presentations</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Using Relations</h4>
            <p className="text-dark-300 mb-3">
              A relation <Math>{'w = e'}</Math> lets us replace <Math>w</Math> with <Math>e</Math>
              (or any cyclic permutation, or its inverse).
            </p>
            <ul className="list-disc list-inside text-dark-400 space-y-1">
              <li>If <Math>{'s^2 = e'}</Math>, then <Math>{'s = s^{-1}'}</Math></li>
              <li>If <Math>{'srs = r^{-1}'}</Math>, then <Math>{'sr = r^{-1}s'}</Math></li>
              <li>Relations can be applied anywhere in a word</li>
            </ul>
          </div>

          <Example title="Computations in D₃">
            <p className="mb-3">
              In <Math>{'D_3 = \\langle r, s \\mid r^3, s^2, srs^{-1}r \\rangle'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p>Simplify <Math>{'sr^2sr'}</Math>:</p>
              <p className="text-dark-400">Using <Math>{'sr = r^{-1}s = r^2s'}</Math>:</p>
              <p className="text-dark-400"><Math>{'sr^2sr = sr^2 \\cdot r^2s = sr^4s = sr \\cdot s = r^2ss = r^2'}</Math></p>
              <p className="text-primary-400 mt-2">Result: <Math>{'sr^2sr = r^2'}</Math></p>
            </div>
          </Example>
        </section>

        {/* Tietze Transformations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Tietze Transformations</h3>

          <Definition title="Tietze Transformations">
            <p>
              <strong>Tietze transformations</strong> modify presentations without changing the group:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Add a relation that follows from existing ones</li>
              <li>Remove a relation that follows from others</li>
              <li>Add a generator <Math>{'x = w'}</Math> (where <Math>w</Math> is a word in existing generators)</li>
              <li>Remove a generator that equals a word in others</li>
            </ol>
          </Definition>

          <Theorem title="Tietze's Theorem">
            <p>
              Two finite presentations define isomorphic groups if and only if one can be
              transformed into the other by a sequence of Tietze transformations.
            </p>
          </Theorem>

          <Example title="Equivalent Presentations">
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'\\langle a \\mid a^6 \\rangle'}</Math></p>
              <p className="text-dark-400">Add <Math>{'b = a^2'}</Math>:</p>
              <p><Math>{'\\langle a, b \\mid a^6, ba^{-2} \\rangle'}</Math></p>
              <p className="text-dark-400">Note <Math>{'b^3 = a^6 = e'}</Math>, eliminate <Math>a</Math>:</p>
              <p><Math>{'\\langle b \\mid b^3 \\rangle'}</Math></p>
              <p className="text-primary-400 mt-2">
                Wait—this is <Math>{'\\mathbb{Z}_3'}</Math>, not <Math>{'\\mathbb{Z}_6'}</Math>! Need more care.
              </p>
            </div>
          </Example>
        </section>

        {/* Finitely Presented Groups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Finitely Presented Groups</h3>

          <Definition title="Finitely Presented">
            <p>
              A group is <strong>finitely presented</strong> if it has a presentation with
              finitely many generators and finitely many relations.
            </p>
          </Definition>

          <Example title="Not Finitely Presented">
            <div className="bg-dark-900 p-4 rounded">
              <p className="text-dark-300 mb-2">
                The additive group <Math>{'\\mathbb{Q}'}</Math> is not finitely generated
                (hence not finitely presented).
              </p>
              <p className="text-dark-300">
                Some infinitely generated groups can still be finitely presented via
                clever choice of generators.
              </p>
            </div>
          </Example>
        </section>

        {/* Decision Problems */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Decision Problems</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Fundamental Decision Problems</h4>
            <div className="space-y-3 text-dark-300">
              <div>
                <p className="font-semibold text-primary-400">Word Problem</p>
                <p className="text-sm">Given a word <Math>w</Math>, decide if <Math>{'w = e'}</Math> in the group.</p>
              </div>
              <div>
                <p className="font-semibold text-primary-400">Conjugacy Problem</p>
                <p className="text-sm">Given words <Math>{'u, v'}</Math>, decide if they're conjugate.</p>
              </div>
              <div>
                <p className="font-semibold text-primary-400">Isomorphism Problem</p>
                <p className="text-sm">Given two presentations, decide if they define isomorphic groups.</p>
              </div>
            </div>
          </div>

          <Theorem title="Undecidability (Novikov-Boone)">
            <p>
              There exist finitely presented groups for which the word problem is undecidable—no
              algorithm can solve it in all cases.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              However, for many important classes (free groups, finite groups, linear groups),
              the word problem is decidable.
            </p>
          </div>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Topology</h4>
              <p className="text-dark-300 text-sm">
                The fundamental group of a cell complex has a presentation
                from the 1-skeleton and 2-cells.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Knot Theory</h4>
              <p className="text-dark-300 text-sm">
                Knot groups have natural presentations from diagrams
                (Wirtinger presentation).
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Computational Algebra</h4>
              <p className="text-dark-300 text-sm">
                Todd-Coxeter algorithm enumerates cosets; Knuth-Bendix
                completes rewriting systems.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Geometric Group Theory</h4>
              <p className="text-dark-300 text-sm">
                Presentations connect to Cayley graphs, hyperbolicity,
                and growth rates.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Presentations describe groups via generators and relations: <Math>{'\\langle S \\mid R \\rangle'}</Math>.
            </li>
            <li>
              The presented group is <Math>{'F(S) / \\langle\\langle R \\rangle\\rangle'}</Math>.
            </li>
            <li>
              Tietze transformations modify presentations without changing the group.
            </li>
            <li>
              The word problem can be undecidable for some groups.
            </li>
            <li>
              Presentations connect algebra to topology and computation.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
          <PresentationsQuiz />
        </section>
      </div>
    </LessonLayout>
  );
}
