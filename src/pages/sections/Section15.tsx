import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section15() {
  return (
    <LessonLayout sectionId={15}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            Group actions provide powerful counting techniques. <strong>Burnside's lemma</strong> and
            the <strong>orbit-counting theorem</strong> solve problems in combinatorics, chemistry
            (molecular symmetry), and computer science (pattern enumeration).
          </p>
        </section>

        {/* Burnside's Lemma Review */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Burnside's Counting Lemma</h3>

          <Theorem title="Burnside's Lemma (The Cauchy-Frobenius Lemma)">
            <p>
              If <Math>G</Math> acts on a finite set <Math>X</Math>, the number of orbits is:
            </p>
            <MathBlock>{'|X/G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g|'}</MathBlock>
            <p className="mt-2">
              where <Math>{'X^g = \\{x \\in X : g \\cdot x = x\\}'}</Math> is the fixed point set of <Math>g</Math>.
            </p>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Intuition:</strong> The number of distinct configurations (up to symmetry)
              equals the average number of configurations fixed by each symmetry operation.
            </p>
          </div>
        </section>

        {/* Counting Colorings */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Counting Colorings</h3>

          <Example title="Coloring a Square with 2 Colors">
            <p className="mb-3">
              How many distinct ways to color the vertices of a square with 2 colors?
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p className="font-semibold mb-2">Setup:</p>
              <ul className="list-disc list-inside text-dark-300 space-y-1">
                <li><Math>X</Math> = all <Math>{'2^4 = 16'}</Math> colorings</li>
                <li><Math>{'G = D_4'}</Math> (8 symmetries)</li>
              </ul>

              <p className="font-semibold mt-4 mb-2">Fixed points by element:</p>
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left p-2">Element</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">|Xᵍ|</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>e</Math></td>
                    <td className="p-2">Identity</td>
                    <td className="p-2">16</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>r</Math></td>
                    <td className="p-2">90° rotation</td>
                    <td className="p-2">2</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'r^2'}</Math></td>
                    <td className="p-2">180° rotation</td>
                    <td className="p-2">4</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'r^3'}</Math></td>
                    <td className="p-2">270° rotation</td>
                    <td className="p-2">2</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'s, sr^2'}</Math></td>
                    <td className="p-2">Diagonal reflections</td>
                    <td className="p-2">4 each</td>
                  </tr>
                  <tr>
                    <td className="p-2"><Math>{'sr, sr^3'}</Math></td>
                    <td className="p-2">Edge reflections</td>
                    <td className="p-2">8 each</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-primary-400 mt-4">
                Orbits: <Math>{'\\frac{1}{8}(16 + 2 + 4 + 2 + 4 + 4 + 8 + 8) = \\frac{48}{8} = 6'}</Math>
              </p>
            </div>
          </Example>

          <Example title="Coloring Cube Faces">
            <p className="mb-3">
              How many ways to color a cube's 6 faces with <Math>n</Math> colors?
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p className="mb-2">The rotation group of a cube has 24 elements:</p>
              <ul className="list-disc list-inside text-dark-400 text-sm space-y-1">
                <li>1 identity: fixes all <Math>{'n^6'}</Math> colorings</li>
                <li>6 face rotations (90°, 270°): fix <Math>{'n^3'}</Math> colorings each</li>
                <li>3 face rotations (180°): fix <Math>{'n^4'}</Math> colorings each</li>
                <li>8 vertex rotations (120°, 240°): fix <Math>{'n^2'}</Math> colorings each</li>
                <li>6 edge rotations (180°): fix <Math>{'n^3'}</Math> colorings each</li>
              </ul>
              <p className="text-primary-400 mt-4">
                <Math>{'\\frac{1}{24}(n^6 + 6n^3 + 3n^4 + 8n^2 + 6n^3)'}</Math>
              </p>
              <p className="text-dark-400 text-sm mt-2">
                For <Math>{'n=2'}</Math>: <Math>{'\\frac{1}{24}(64 + 48 + 48 + 32 + 48) = 10'}</Math> colorings
              </p>
            </div>
          </Example>
        </section>

        {/* Necklaces and Bracelets */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Necklaces and Bracelets</h3>

          <Definition title="Necklace vs Bracelet">
            <p>
              <strong>Necklace:</strong> Circular arrangement where rotations are equivalent
              (group <Math>{'\\mathbb{Z}_n'}</Math>).
            </p>
            <p className="mt-2">
              <strong>Bracelet:</strong> Circular arrangement where rotations AND reflections
              are equivalent (group <Math>D_n</Math>).
            </p>
          </Definition>

          <Example title="4-Bead Necklaces with 3 Colors">
            <p className="mb-3">
              Count necklaces (rotations only) with <Math>{'\\mathbb{Z}_4'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left p-2">Rotation</th>
                    <th className="text-left p-2">Cycle type</th>
                    <th className="text-left p-2">Fixed colorings</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'r^0'}</Math></td>
                    <td className="p-2">(1)(2)(3)(4)</td>
                    <td className="p-2"><Math>{'3^4 = 81'}</Math></td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'r^1'}</Math></td>
                    <td className="p-2">(1234)</td>
                    <td className="p-2"><Math>{'3^1 = 3'}</Math></td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-2"><Math>{'r^2'}</Math></td>
                    <td className="p-2">(13)(24)</td>
                    <td className="p-2"><Math>{'3^2 = 9'}</Math></td>
                  </tr>
                  <tr>
                    <td className="p-2"><Math>{'r^3'}</Math></td>
                    <td className="p-2">(1432)</td>
                    <td className="p-2"><Math>{'3^1 = 3'}</Math></td>
                  </tr>
                </tbody>
              </table>
              <p className="text-primary-400 mt-4">
                Necklaces: <Math>{'\\frac{1}{4}(81 + 3 + 9 + 3) = 24'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Pólya Enumeration */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Pólya Enumeration Theorem</h3>

          <Definition title="Cycle Index">
            <p>
              For a permutation group <Math>G</Math> acting on <Math>{'\\{1, ..., n\\}'}</Math>,
              the <strong>cycle index</strong> is:
            </p>
            <MathBlock>{'Z_G(x_1, ..., x_n) = \\frac{1}{|G|} \\sum_{g \\in G} x_1^{c_1(g)} x_2^{c_2(g)} \\cdots x_n^{c_n(g)}'}</MathBlock>
            <p className="mt-2">
              where <Math>{'c_k(g)'}</Math> = number of <Math>k</Math>-cycles in <Math>g</Math>.
            </p>
          </Definition>

          <Theorem title="Pólya Enumeration">
            <p>
              The number of distinct colorings with <Math>m</Math> colors is:
            </p>
            <MathBlock>{'Z_G(m, m, ..., m)'}</MathBlock>
            <p className="mt-2">
              (Substitute <Math>{'x_k = m'}</Math> for all <Math>k</Math>.)
            </p>
          </Theorem>

          <Example title="Cycle Index for Z₄">
            <div className="bg-dark-900 p-4 rounded">
              <p className="mb-2">Cycle structures:</p>
              <ul className="text-dark-300 space-y-1 text-sm">
                <li><Math>{'r^0'}</Math>: four 1-cycles → <Math>{'x_1^4'}</Math></li>
                <li><Math>{'r^1'}</Math>: one 4-cycle → <Math>{'x_4'}</Math></li>
                <li><Math>{'r^2'}</Math>: two 2-cycles → <Math>{'x_2^2'}</Math></li>
                <li><Math>{'r^3'}</Math>: one 4-cycle → <Math>{'x_4'}</Math></li>
              </ul>
              <MathBlock>{'Z_{\\mathbb{Z}_4} = \\frac{1}{4}(x_1^4 + x_2^2 + 2x_4)'}</MathBlock>
              <p className="text-dark-400 mt-2">
                With <Math>{'m'}</Math> colors: <Math>{'\\frac{1}{4}(m^4 + m^2 + 2m)'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Applications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Applications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Chemistry</h4>
              <p className="text-dark-300 text-sm">
                Counting isomers of molecules. Substituted benzene rings use <Math>D_6</Math>;
                methane derivatives use tetrahedral symmetry.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Computer Graphics</h4>
              <p className="text-dark-300 text-sm">
                Efficient storage of symmetric textures and patterns by storing one
                representative per orbit.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Combinatorics</h4>
              <p className="text-dark-300 text-sm">
                Counting equivalence classes of graphs, matrices, and other structures
                under permutation.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Music Theory</h4>
              <p className="text-dark-300 text-sm">
                Counting pitch class sets and rhythmic patterns up to transposition
                and inversion.
              </p>
            </div>
          </div>
        </section>

        {/* Weighted Enumeration */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Weighted Enumeration</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Generating Functions</h4>
            <p className="text-dark-300 mb-3">
              Pólya's theorem extends to generating functions that track color usage.
              Substitute <Math>{'x_k = r^k + b^k + ...'}</Math> where <Math>{'r, b, ...'}</Math>
              represent different colors.
            </p>
            <p className="text-dark-400 text-sm">
              The coefficient of <Math>{'r^a b^c ...'}</Math> counts colorings with
              exactly <Math>a</Math> red, <Math>c</Math> blue, etc.
            </p>
          </div>

          <Example title="Weighted Count for Square Colorings">
            <p className="mb-3">
              Using <Math>{'Z_{D_4} = \\frac{1}{8}(x_1^4 + 2x_4 + 3x_2^2 + 2x_1^2 x_2)'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p>Substitute <Math>{'x_k = r^k + b^k'}</Math>:</p>
              <MathBlock>{'\\frac{1}{8}((r+b)^4 + 2(r^4+b^4) + 3(r^2+b^2)^2 + 2(r+b)^2(r^2+b^2))'}</MathBlock>
              <p className="text-dark-400 text-sm mt-2">
                Expanding gives: <Math>{'r^4 + r^3b + 2r^2b^2 + rb^3 + b^4'}</Math>
              </p>
              <p className="text-dark-400 text-sm">
                So there's 1 all-red, 1 with 3 red + 1 blue, 2 with 2 red + 2 blue, etc.
              </p>
            </div>
          </Example>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              <strong>Burnside's lemma:</strong> <Math>{'|\\text{orbits}| = \\frac{1}{|G|}\\sum|X^g|'}</Math>
            </li>
            <li>
              Fixed points of a rotation depend on its cycle structure.
            </li>
            <li>
              The <strong>cycle index</strong> packages all counting information.
            </li>
            <li>
              Substitute <Math>{'x_k = m'}</Math> for <Math>m</Math>-colorings;
              use generating functions for weighted counts.
            </li>
            <li>
              Applications span chemistry, combinatorics, computer science, and music theory.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
