import { LessonLayout } from '../../components/layout';
import { Definition, Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section11() {
  return (
    <LessonLayout sectionId={11}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>Plane isometries</strong> are transformations of the Euclidean plane that preserve
            distances. They form a group under composition and provide geometric intuition for
            abstract group concepts. Every plane isometry is a rotation, reflection, translation,
            or glide reflection.
          </p>
        </section>

        {/* Definition */}
        <Definition title="Isometry">
          <p>
            An <strong>isometry</strong> of the Euclidean plane <Math>{'\\mathbb{R}^2'}</Math> is a
            function <Math>{'\\phi: \\mathbb{R}^2 \\to \\mathbb{R}^2'}</Math> that preserves distances:
          </p>
          <MathBlock>{'d(\\phi(P), \\phi(Q)) = d(P, Q) \\quad \\text{for all points } P, Q'}</MathBlock>
          <p className="mt-2">
            Isometries are also called <strong>rigid motions</strong> or <strong>Euclidean transformations</strong>.
          </p>
        </Definition>

        <div className="card">
          <h4 className="font-semibold mb-3">Properties of Isometries</h4>
          <ul className="space-y-2 text-dark-300">
            <li>Every isometry is a bijection</li>
            <li>Isometries preserve angles and areas</li>
            <li>The composition of isometries is an isometry</li>
            <li>The inverse of an isometry is an isometry</li>
            <li>The identity map is an isometry</li>
          </ul>
        </div>

        {/* Four Types */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Four Types of Plane Isometries</h3>

          <div className="space-y-4">
            {/* Translations */}
            <div className="card border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-400 mb-2">1. Translations</h4>
              <p className="text-dark-300 mb-2">
                Shift every point by a fixed vector <Math>{'\\vec{v}'}</Math>:
              </p>
              <MathBlock>{'T_{\\vec{v}}(P) = P + \\vec{v}'}</MathBlock>
              <ul className="list-disc list-inside mt-2 space-y-1 text-dark-400 text-sm">
                <li>No fixed points (unless <Math>{'\\vec{v} = \\vec{0}'}</Math>)</li>
                <li>Preserves orientation</li>
                <li>Translations commute: <Math>{'T_{\\vec{u}} \\circ T_{\\vec{v}} = T_{\\vec{v}} \\circ T_{\\vec{u}}'}</Math></li>
              </ul>
            </div>

            {/* Rotations */}
            <div className="card border-l-4 border-green-500">
              <h4 className="font-semibold text-green-400 mb-2">2. Rotations</h4>
              <p className="text-dark-300 mb-2">
                Rotate by angle <Math>{'\\theta'}</Math> about a center point <Math>C</Math>:
              </p>
              <MathBlock>{'R_{C,\\theta}(P) = C + R_\\theta(P - C)'}</MathBlock>
              <p className="text-dark-400 text-sm mt-2">
                where <Math>{'R_\\theta'}</Math> is rotation about the origin by <Math>{'\\theta'}</Math>.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-dark-400 text-sm">
                <li>One fixed point: the center <Math>C</Math></li>
                <li>Preserves orientation</li>
                <li>Order depends on whether <Math>{'\\theta/2\\pi'}</Math> is rational</li>
              </ul>
            </div>

            {/* Reflections */}
            <div className="card border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-2">3. Reflections</h4>
              <p className="text-dark-300 mb-2">
                Reflect across a line <Math>L</Math>:
              </p>
              <MathBlock>{'\\sigma_L(P) = \\text{mirror image of } P \\text{ across } L'}</MathBlock>
              <ul className="list-disc list-inside mt-2 space-y-1 text-dark-400 text-sm">
                <li>Fixed points: all points on line <Math>L</Math></li>
                <li>Reverses orientation</li>
                <li>Order 2: <Math>{'\\sigma_L^2 = \\text{id}'}</Math></li>
              </ul>
            </div>

            {/* Glide Reflections */}
            <div className="card border-l-4 border-amber-500">
              <h4 className="font-semibold text-amber-400 mb-2">4. Glide Reflections</h4>
              <p className="text-dark-300 mb-2">
                Reflect across a line, then translate along that line:
              </p>
              <MathBlock>{'G_{L,\\vec{v}} = T_{\\vec{v}} \\circ \\sigma_L'}</MathBlock>
              <p className="text-dark-400 text-sm mt-2">
                where <Math>{'\\vec{v}'}</Math> is parallel to <Math>L</Math>.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-dark-400 text-sm">
                <li>No fixed points</li>
                <li>Reverses orientation</li>
                <li>Example: footprints in sand</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Classification Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Classification Theorem</h3>

          <Theorem title="Classification of Plane Isometries">
            <p>
              Every isometry of the Euclidean plane is exactly one of:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>A translation</li>
              <li>A rotation</li>
              <li>A reflection</li>
              <li>A glide reflection</li>
            </ul>
          </Theorem>

          <div className="card mt-4">
            <h4 className="font-semibold mb-3">Identifying Isometries</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Fixed Points</th>
                  <th className="text-left p-2">Orientation</th>
                </tr>
              </thead>
              <tbody className="text-dark-300">
                <tr className="border-b border-dark-800">
                  <td className="p-2">Translation (≠ id)</td>
                  <td className="p-2">None</td>
                  <td className="p-2">Preserved</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="p-2">Rotation (≠ id)</td>
                  <td className="p-2">One point</td>
                  <td className="p-2">Preserved</td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="p-2">Reflection</td>
                  <td className="p-2">A line</td>
                  <td className="p-2">Reversed</td>
                </tr>
                <tr>
                  <td className="p-2">Glide reflection</td>
                  <td className="p-2">None</td>
                  <td className="p-2">Reversed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Group Structure */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The Isometry Group</h3>

          <Definition title="Euclidean Group E(2)">
            <p>
              The <strong>Euclidean group</strong> <Math>{'E(2)'}</Math> is the group of all
              isometries of <Math>{'\\mathbb{R}^2'}</Math> under composition.
            </p>
          </Definition>

          <div className="card">
            <h4 className="font-semibold mb-3">Important Subgroups</h4>
            <ul className="space-y-3 text-dark-300">
              <li>
                <strong><Math>{'E^+(2)'}</Math></strong> — orientation-preserving isometries
                (translations and rotations)
              </li>
              <li>
                <strong><Math>{'T(2)'}</Math></strong> — all translations (normal in <Math>{'E(2)'}</Math>)
              </li>
              <li>
                <strong><Math>{'O(2)'}</Math></strong> — isometries fixing the origin (rotations and reflections through origin)
              </li>
              <li>
                <strong><Math>{'SO(2)'}</Math></strong> — rotations about the origin
              </li>
            </ul>
          </div>

          <Theorem title="Structure of E(2)">
            <p>
              The Euclidean group is a semidirect product:
            </p>
            <MathBlock>{'E(2) \\cong \\mathbb{R}^2 \\rtimes O(2)'}</MathBlock>
            <p className="mt-2">
              Every isometry can be written as a translation followed by an orthogonal transformation.
            </p>
          </Theorem>
        </section>

        {/* Composition Rules */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Composition of Isometries</h3>

          <Example title="Two Reflections">
            <p className="mb-3">
              The composition of two reflections depends on whether the lines intersect:
            </p>
            <div className="space-y-2 bg-dark-900 p-4 rounded">
              <p>
                <strong>Parallel lines:</strong> <Math>{'\\sigma_{L_2} \\circ \\sigma_{L_1}'}</Math> = translation
                (perpendicular to lines, distance = 2 × gap)
              </p>
              <p>
                <strong>Intersecting lines:</strong> <Math>{'\\sigma_{L_2} \\circ \\sigma_{L_1}'}</Math> = rotation
                (about intersection, angle = 2 × angle between lines)
              </p>
            </div>
          </Example>

          <Theorem title="Reflections Generate All Isometries">
            <p>
              Every plane isometry can be written as a composition of at most three reflections:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Translation = 2 reflections (parallel lines)</li>
              <li>Rotation = 2 reflections (intersecting lines)</li>
              <li>Reflection = 1 reflection</li>
              <li>Glide reflection = 3 reflections</li>
            </ul>
          </Theorem>
        </section>

        {/* Matrix Representation */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Matrix Representation</h3>

          <div className="card">
            <p className="text-dark-300 mb-3">
              Using homogeneous coordinates, every isometry can be represented as a 3×3 matrix:
            </p>
            <MathBlock>{`\\begin{pmatrix} x' \\\\ y' \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} a & -b & t_x \\\\ b & a & t_y \\\\ 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ 1 \\end{pmatrix}`}</MathBlock>
            <p className="text-dark-400 text-sm mt-2">
              where <Math>{'a^2 + b^2 = 1'}</Math> for orientation-preserving isometries.
            </p>
          </div>

          <Example title="Rotation Matrix">
            <p className="mb-2">
              Rotation by <Math>{'\\theta'}</Math> about the origin:
            </p>
            <MathBlock>{`R_\\theta = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}`}</MathBlock>
          </Example>

          <Example title="Reflection Matrix">
            <p className="mb-2">
              Reflection across the <Math>x</Math>-axis:
            </p>
            <MathBlock>{`\\sigma_x = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}`}</MathBlock>
          </Example>
        </section>

        {/* Finite Subgroups */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Finite Subgroups of E(2)</h3>

          <Theorem title="Classification of Finite Subgroups">
            <p>
              Every finite subgroup of <Math>{'E(2)'}</Math> is isomorphic to either:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><Math>{'\\mathbb{Z}_n'}</Math> — cyclic group (rotations only)</li>
              <li><Math>D_n</Math> — dihedral group (rotations and reflections)</li>
            </ul>
          </Theorem>

          <div className="callout-info">
            <p>
              This is why the symmetry group of any finite figure in the plane is either cyclic
              (rotations only) or dihedral (with reflections). There are no other possibilities!
            </p>
          </div>
        </section>

        {/* Wallpaper Groups Preview */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Preview: Wallpaper Groups</h3>

          <div className="card">
            <p className="text-dark-300 mb-3">
              Discrete subgroups of <Math>{'E(2)'}</Math> with translations in two independent
              directions are called <strong>wallpaper groups</strong> or <strong>plane crystallographic groups</strong>.
            </p>
            <p className="text-dark-400">
              There are exactly <strong>17</strong> distinct wallpaper groups, classifying all
              possible periodic tilings of the plane.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              Plane isometries are distance-preserving transformations.
            </li>
            <li>
              The four types are: translations, rotations, reflections, and glide reflections.
            </li>
            <li>
              All isometries can be generated by reflections (at most 3).
            </li>
            <li>
              The Euclidean group <Math>{'E(2)'}</Math> is a semidirect product of translations and orthogonal transformations.
            </li>
            <li>
              Finite symmetry groups in the plane are either cyclic or dihedral.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
