import { LessonLayout } from '../../components/layout';
import { Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section16() {
  return (
    <LessonLayout sectionId={16}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            The <strong>isomorphism theorems</strong> describe fundamental relationships between
            subgroups, normal subgroups, and quotient groups. These theorems are central tools
            in understanding group structure.
          </p>
        </section>

        {/* First Isomorphism Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">First Isomorphism Theorem (Review)</h3>

          <Theorem title="First Isomorphism Theorem">
            <p>
              If <Math>{'\\phi: G \\to H'}</Math> is a group homomorphism, then:
            </p>
            <MathBlock>{'G/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</MathBlock>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">The Diamond Diagram</h4>
            <div className="flex justify-center my-4">
              <svg viewBox="0 0 200 150" className="w-64 h-48">
                <text x="100" y="20" textAnchor="middle" fill="white" fontSize="14">G</text>
                <text x="30" y="90" textAnchor="middle" fill="white" fontSize="14">ker(φ)</text>
                <text x="170" y="90" textAnchor="middle" fill="white" fontSize="14">im(φ)</text>
                <text x="100" y="140" textAnchor="middle" fill="white" fontSize="14">G/ker(φ)</text>
                <line x1="90" y1="25" x2="45" y2="75" stroke="#6366f1" strokeWidth="2" />
                <line x1="110" y1="25" x2="155" y2="75" stroke="#6366f1" strokeWidth="2" />
                <line x1="45" y1="100" x2="90" y2="125" stroke="#6366f1" strokeWidth="2" />
                <line x1="155" y1="100" x2="110" y2="125" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
                <text x="145" y="115" fill="#f59e0b" fontSize="10">≅</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Second Isomorphism Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Second Isomorphism Theorem</h3>

          <Theorem title="Second Isomorphism Theorem (Diamond Theorem)">
            <p>
              Let <Math>H</Math> be a subgroup and <Math>N</Math> a normal subgroup of <Math>G</Math>. Then:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><Math>HN</Math> is a subgroup of <Math>G</Math></li>
              <li><Math>{'H \\cap N \\trianglelefteq H'}</Math></li>
              <li><Math>{'HN/N \\cong H/(H \\cap N)'}</Math></li>
            </ol>
          </Theorem>

          <div className="card mt-4">
            <h4 className="font-semibold mb-3">The Diamond</h4>
            <div className="flex justify-center my-4">
              <svg viewBox="0 0 200 180" className="w-64 h-56">
                <text x="100" y="20" textAnchor="middle" fill="white" fontSize="12">HN</text>
                <text x="30" y="90" textAnchor="middle" fill="white" fontSize="12">H</text>
                <text x="170" y="90" textAnchor="middle" fill="white" fontSize="12">N</text>
                <text x="100" y="160" textAnchor="middle" fill="white" fontSize="12">H ∩ N</text>
                <line x1="90" y1="25" x2="45" y2="75" stroke="#6366f1" strokeWidth="2" />
                <line x1="110" y1="25" x2="155" y2="75" stroke="#6366f1" strokeWidth="2" />
                <line x1="45" y1="100" x2="90" y2="145" stroke="#6366f1" strokeWidth="2" />
                <line x1="155" y1="100" x2="110" y2="145" stroke="#6366f1" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-dark-400 text-sm text-center">
              <Math>{'H/(H \\cap N) \\cong HN/N'}</Math>
            </p>
          </div>

          <Example title="Applying the Second Isomorphism Theorem">
            <p className="mb-3">
              In <Math>{'S_4'}</Math>, let <Math>{'H = \\langle (1234) \\rangle'}</Math> and <Math>{'N = V_4'}</Math>
              (the Klein four-group):
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'|H| = 4'}</Math>, <Math>{'|N| = 4'}</Math></p>
              <p><Math>{'H \\cap N = \\{e, (12)(34)\\}'}</Math> has order 2</p>
              <p><Math>{'|HN| = |H||N|/|H \\cap N| = 4 \\cdot 4/2 = 8'}</Math></p>
              <p className="text-primary-400 mt-2">
                <Math>{'H/(H \\cap N) \\cong \\mathbb{Z}_2 \\cong HN/N'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Third Isomorphism Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Third Isomorphism Theorem</h3>

          <Theorem title="Third Isomorphism Theorem">
            <p>
              Let <Math>{'N \\trianglelefteq G'}</Math> and <Math>{'K \\trianglelefteq G'}</Math> with
              <Math>{'N \\subseteq K'}</Math>. Then:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><Math>{'K/N \\trianglelefteq G/N'}</Math></li>
              <li><Math>{'(G/N)/(K/N) \\cong G/K'}</Math></li>
            </ol>
          </Theorem>

          <div className="callout-info">
            <p>
              <strong>Intuition:</strong> "Quotient of quotients equals quotient."
              You can collapse in two steps or one.
            </p>
          </div>

          <Example title="Z / 12Z">
            <p className="mb-3">
              Let <Math>{'G = \\mathbb{Z}'}</Math>, <Math>{'N = 12\\mathbb{Z}'}</Math>, <Math>{'K = 4\\mathbb{Z}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded space-y-2">
              <p><Math>{'G/N = \\mathbb{Z}/12\\mathbb{Z} = \\mathbb{Z}_{12}'}</Math></p>
              <p><Math>{'K/N = 4\\mathbb{Z}/12\\mathbb{Z} = \\{0, 4, 8\\} \\cong \\mathbb{Z}_3'}</Math></p>
              <p><Math>{'G/K = \\mathbb{Z}/4\\mathbb{Z} = \\mathbb{Z}_4'}</Math></p>
              <p className="text-primary-400 mt-2">
                <Math>{'\\mathbb{Z}_{12}/\\mathbb{Z}_3 \\cong \\mathbb{Z}_4'}</Math> ✓
              </p>
            </div>
          </Example>
        </section>

        {/* Correspondence Theorem */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Fourth Isomorphism Theorem (Correspondence)</h3>

          <Theorem title="Correspondence Theorem">
            <p>
              Let <Math>{'N \\trianglelefteq G'}</Math>. There is a bijection between:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Subgroups of <Math>{'G/N'}</Math></li>
              <li>Subgroups of <Math>G</Math> containing <Math>N</Math></li>
            </ul>
            <p className="mt-3">
              This bijection preserves normality, indices, and containment.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">The Correspondence</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400 mb-2">Forward:</p>
                <p className="text-dark-300 text-sm">
                  <Math>{'H \\supseteq N \\mapsto H/N'}</Math>
                </p>
              </div>
              <div className="bg-dark-900 p-3 rounded">
                <p className="font-semibold text-primary-400 mb-2">Backward:</p>
                <p className="text-dark-300 text-sm">
                  <Math>{'\\bar{H} \\leq G/N \\mapsto \\pi^{-1}(\\bar{H})'}</Math>
                </p>
              </div>
            </div>
          </div>

          <Example title="Subgroups of Z₁₂">
            <p className="mb-3">
              <Math>{'\\mathbb{Z}_{12} = \\mathbb{Z}/12\\mathbb{Z}'}</Math>:
            </p>
            <div className="bg-dark-900 p-4 rounded">
              <p className="mb-2">Subgroups of <Math>{'\\mathbb{Z}'}</Math> containing <Math>{'12\\mathbb{Z}'}</Math>:</p>
              <p className="text-dark-300 text-sm">
                <Math>{'12\\mathbb{Z} \\subset 6\\mathbb{Z} \\subset 3\\mathbb{Z} \\subset \\mathbb{Z}'}</Math>
              </p>
              <p className="text-dark-300 text-sm">
                <Math>{'12\\mathbb{Z} \\subset 6\\mathbb{Z} \\subset 2\\mathbb{Z} \\subset \\mathbb{Z}'}</Math>
              </p>
              <p className="text-dark-300 text-sm">
                <Math>{'12\\mathbb{Z} \\subset 4\\mathbb{Z} \\subset 2\\mathbb{Z} \\subset \\mathbb{Z}'}</Math>
              </p>
              <p className="mt-2 text-dark-400 text-sm">
                These correspond to subgroups <Math>{'\\{0\\}, \\langle 6 \\rangle, \\langle 4 \\rangle, \\langle 3 \\rangle, \\langle 2 \\rangle, \\mathbb{Z}_{12}'}</Math>
              </p>
            </div>
          </Example>
        </section>

        {/* Summary Diagram */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Summary of Isomorphism Theorems</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-3">Theorem</th>
                  <th className="text-left p-3">Setup</th>
                  <th className="text-left p-3">Result</th>
                </tr>
              </thead>
              <tbody className="text-dark-300">
                <tr className="border-b border-dark-800">
                  <td className="p-3 font-semibold">First</td>
                  <td className="p-3"><Math>{'\\phi: G \\to H'}</Math> homomorphism</td>
                  <td className="p-3"><Math>{'G/\\ker(\\phi) \\cong \\text{im}(\\phi)'}</Math></td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="p-3 font-semibold">Second</td>
                  <td className="p-3"><Math>{'H \\leq G'}</Math>, <Math>{'N \\trianglelefteq G'}</Math></td>
                  <td className="p-3"><Math>{'H/(H \\cap N) \\cong HN/N'}</Math></td>
                </tr>
                <tr className="border-b border-dark-800">
                  <td className="p-3 font-semibold">Third</td>
                  <td className="p-3"><Math>{'N \\subseteq K'}</Math>, both normal in <Math>G</Math></td>
                  <td className="p-3"><Math>{'(G/N)/(K/N) \\cong G/K'}</Math></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Fourth</td>
                  <td className="p-3"><Math>{'N \\trianglelefteq G'}</Math></td>
                  <td className="p-3">Subgroups ↔ Subgroups containing <Math>N</Math></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              The isomorphism theorems relate quotients, subgroups, and normal subgroups.
            </li>
            <li>
              <strong>First:</strong> <Math>{'G/\\ker \\cong \\text{im}'}</Math>
            </li>
            <li>
              <strong>Second:</strong> <Math>{'H/(H \\cap N) \\cong HN/N'}</Math> (Diamond)
            </li>
            <li>
              <strong>Third:</strong> <Math>{'(G/N)/(K/N) \\cong G/K'}</Math> (Quotient of quotients)
            </li>
            <li>
              <strong>Fourth:</strong> Subgroups of <Math>{'G/N'}</Math> correspond to subgroups of <Math>G</Math> containing <Math>N</Math>.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
