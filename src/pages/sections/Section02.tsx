import { useState, useMemo } from 'react';
import { LessonLayout } from '../../components/layout/LessonLayout';
import { Callout } from '../../components/common/Callout';
import { Math as MathInline, MathBlock } from '../../components/common/MathBlock';
import { Card, CardGrid } from '../../components/common/Card';
import { CayleyTableDemo } from '../../components/visualizations/CayleyTable';

// Interactive Group Axiom Checker
function GroupAxiomChecker() {
  const [table, setTable] = useState<number[][]>([
    [0, 1, 2, 3],
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
  ]);
  const size = 4;
  const elements = Array.from({ length: size }, (_, i) => i);

  const handleCellChange = (i: number, j: number, value: number) => {
    if (value < 0 || value >= size) return;
    const newTable = table.map((row) => [...row]);
    newTable[i][j] = value;
    setTable(newTable);
  };

  // Axiom checks
  const axiomChecks = useMemo(() => {
    // Closure
    const isClosed = table.every((row) => row.every((val) => val >= 0 && val < size));

    // Associativity
    let isAssociative = true;
    let associativityCounterexample: [number, number, number] | null = null;
    outer: for (let a = 0; a < size; a++) {
      for (let b = 0; b < size; b++) {
        for (let c = 0; c < size; c++) {
          const ab_c = table[table[a][b]][c];
          const a_bc = table[a][table[b][c]];
          if (ab_c !== a_bc) {
            isAssociative = false;
            associativityCounterexample = [a, b, c];
            break outer;
          }
        }
      }
    }

    // Identity
    let identity: number | null = null;
    for (let e = 0; e < size; e++) {
      let isIdentity = true;
      for (let a = 0; a < size; a++) {
        if (table[e][a] !== a || table[a][e] !== a) {
          isIdentity = false;
          break;
        }
      }
      if (isIdentity) {
        identity = e;
        break;
      }
    }

    // Inverses (only if identity exists)
    let hasInverses = identity !== null;
    let missingInverse: number | null = null;
    if (identity !== null) {
      for (let a = 0; a < size; a++) {
        let hasInverse = false;
        for (let b = 0; b < size; b++) {
          if (table[a][b] === identity && table[b][a] === identity) {
            hasInverse = true;
            break;
          }
        }
        if (!hasInverse) {
          hasInverses = false;
          missingInverse = a;
          break;
        }
      }
    }

    const isGroup = isClosed && isAssociative && identity !== null && hasInverses;

    return {
      isClosed,
      isAssociative,
      associativityCounterexample,
      identity,
      hasInverses,
      missingInverse,
      isGroup,
    };
  }, [table, size]);

  const presets = [
    {
      name: 'Klein 4-group (V₄)',
      table: [
        [0, 1, 2, 3],
        [1, 0, 3, 2],
        [2, 3, 0, 1],
        [3, 2, 1, 0],
      ],
    },
    {
      name: 'Z₄ (cyclic)',
      table: [
        [0, 1, 2, 3],
        [1, 2, 3, 0],
        [2, 3, 0, 1],
        [3, 0, 1, 2],
      ],
    },
    {
      name: 'Not a group (no identity)',
      table: [
        [1, 2, 3, 0],
        [2, 3, 0, 1],
        [3, 0, 1, 2],
        [0, 1, 2, 3],
      ],
    },
    {
      name: 'Not associative',
      table: [
        [0, 1, 2, 3],
        [1, 0, 3, 2],
        [2, 3, 1, 0],
        [3, 2, 0, 1],
      ],
    },
  ];

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Group Axiom Checker</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map((preset, i) => (
          <button
            key={i}
            onClick={() => setTable(preset.table)}
            className="btn-ghost text-sm"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div>
          <p className="text-sm text-dark-400 mb-2">Operation table (click to edit):</p>
          <table className="cayley-table">
            <thead>
              <tr>
                <th className="bg-dark-900">∗</th>
                {elements.map((j) => (
                  <th key={j}>{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {elements.map((i) => (
                <tr key={i}>
                  <th>{i}</th>
                  {elements.map((j) => (
                    <td
                      key={j}
                      className={
                        axiomChecks.identity === table[i][j] ? 'text-green-400 font-bold' : ''
                      }
                    >
                      <input
                        type="number"
                        min={0}
                        max={size - 1}
                        value={table[i][j]}
                        onChange={(e) =>
                          handleCellChange(i, j, parseInt(e.target.value) || 0)
                        }
                        className="w-8 h-8 text-center bg-transparent border-none focus:ring-1 focus:ring-primary-500 rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 space-y-4">
          <h5 className="font-semibold text-dark-200">Axiom Verification</h5>

          <div
            className={`p-3 rounded-lg ${
              axiomChecks.isClosed ? 'bg-green-950/30' : 'bg-red-950/30'
            }`}
          >
            <p className="flex items-center gap-2 font-medium">
              <span className={axiomChecks.isClosed ? 'text-green-400' : 'text-red-400'}>
                {axiomChecks.isClosed ? '✓' : '✗'}
              </span>
              G1: Closure
            </p>
            <p className="text-sm text-dark-400 ml-6">All products are in the set</p>
          </div>

          <div
            className={`p-3 rounded-lg ${
              axiomChecks.isAssociative ? 'bg-green-950/30' : 'bg-red-950/30'
            }`}
          >
            <p className="flex items-center gap-2 font-medium">
              <span className={axiomChecks.isAssociative ? 'text-green-400' : 'text-red-400'}>
                {axiomChecks.isAssociative ? '✓' : '✗'}
              </span>
              G2: Associativity
            </p>
            {axiomChecks.associativityCounterexample && (
              <p className="text-sm text-red-400 ml-6">
                Fails: ({axiomChecks.associativityCounterexample[0]} ∗{' '}
                {axiomChecks.associativityCounterexample[1]}) ∗{' '}
                {axiomChecks.associativityCounterexample[2]} ≠{' '}
                {axiomChecks.associativityCounterexample[0]} ∗ (
                {axiomChecks.associativityCounterexample[1]} ∗{' '}
                {axiomChecks.associativityCounterexample[2]})
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              axiomChecks.identity !== null ? 'bg-green-950/30' : 'bg-red-950/30'
            }`}
          >
            <p className="flex items-center gap-2 font-medium">
              <span
                className={axiomChecks.identity !== null ? 'text-green-400' : 'text-red-400'}
              >
                {axiomChecks.identity !== null ? '✓' : '✗'}
              </span>
              G3: Identity element
            </p>
            {axiomChecks.identity !== null ? (
              <p className="text-sm text-green-400 ml-6">e = {axiomChecks.identity}</p>
            ) : (
              <p className="text-sm text-red-400 ml-6">No identity element exists</p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              axiomChecks.hasInverses ? 'bg-green-950/30' : 'bg-red-950/30'
            }`}
          >
            <p className="flex items-center gap-2 font-medium">
              <span className={axiomChecks.hasInverses ? 'text-green-400' : 'text-red-400'}>
                {axiomChecks.hasInverses ? '✓' : '✗'}
              </span>
              G4: Inverses
            </p>
            {axiomChecks.missingInverse !== null && (
              <p className="text-sm text-red-400 ml-6">
                Element {axiomChecks.missingInverse} has no inverse
              </p>
            )}
          </div>

          <div
            className={`p-4 rounded-lg border-2 ${
              axiomChecks.isGroup
                ? 'border-green-500 bg-green-950/20'
                : 'border-red-500 bg-red-950/20'
            }`}
          >
            <p className="font-bold text-lg">
              {axiomChecks.isGroup ? (
                <span className="text-green-400">✓ This is a GROUP!</span>
              ) : (
                <span className="text-red-400">✗ Not a group</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section02() {
  return (
    <LessonLayout sectionId={2}>
      {/* Introduction */}
      <p className="text-lg text-dark-300 mb-6">
        A group is one of the most fundamental structures in all of mathematics. It captures the essence of
        symmetry, solvability, and structure in a remarkably elegant way. In this section, we formally
        define groups and begin to explore their properties.
      </p>

      {/* Definition */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Definition of a Group</h2>

      <Callout type="definition">
        <p>
          A <strong>group</strong> is a set G together with a binary operation ∗ satisfying the following axioms:
        </p>
        <ol className="list-decimal list-inside mt-4 space-y-3">
          <li>
            <strong>Closure:</strong> For all <MathInline>{'a, b \\in G'}</MathInline>, we have{' '}
            <MathInline>{'a \\ast b \\in G'}</MathInline>
          </li>
          <li>
            <strong>Associativity:</strong> For all <MathInline>{'a, b, c \\in G'}</MathInline>:
            <MathBlock>{'(a \\ast b) \\ast c = a \\ast (b \\ast c)'}</MathBlock>
          </li>
          <li>
            <strong>Identity:</strong> There exists an element <MathInline>{'e \\in G'}</MathInline> such that for all{' '}
            <MathInline>{'a \\in G'}</MathInline>:
            <MathBlock>{'e \\ast a = a \\ast e = a'}</MathBlock>
          </li>
          <li>
            <strong>Inverses:</strong> For each <MathInline>{'a \\in G'}</MathInline>, there exists{' '}
            <MathInline>{'a^{-1} \\in G'}</MathInline> such that:
            <MathBlock>{'a \\ast a^{-1} = a^{-1} \\ast a = e'}</MathBlock>
          </li>
        </ol>
        <p className="mt-4">
          We write <MathInline>{'(G, \\ast)'}</MathInline> or just G when the operation is clear from context.
        </p>
      </Callout>

      <Callout type="info">
        <p>
          <strong>Note:</strong> Commutativity is <em>not</em> required! If <MathInline>{'a \\ast b = b \\ast a'}</MathInline>{' '}
          for all elements, we call G an <strong>abelian</strong> (or commutative) group.
        </p>
      </Callout>

      <GroupAxiomChecker />

      {/* Basic Properties */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Basic Properties</h2>

      <Callout type="theorem">
        <p><strong>Uniqueness of Identity:</strong> A group has exactly one identity element.</p>
        <div className="mt-3 p-3 bg-dark-800/50 rounded">
          <p className="text-sm">
            <strong>Proof:</strong> Suppose e and e' are both identities. Then{' '}
            <MathInline>{"e = e \\ast e' = e'"}</MathInline> since e' is an identity (first equality)
            and e is an identity (second equality). ∎
          </p>
        </div>
      </Callout>

      <Callout type="theorem">
        <p><strong>Uniqueness of Inverses:</strong> Each element has exactly one inverse.</p>
        <div className="mt-3 p-3 bg-dark-800/50 rounded">
          <p className="text-sm">
            <strong>Proof:</strong> Suppose b and c are both inverses of a. Then:
          </p>
          <MathBlock>{'b = b \\ast e = b \\ast (a \\ast c) = (b \\ast a) \\ast c = e \\ast c = c'}</MathBlock>
        </div>
      </Callout>

      <Callout type="theorem">
        <p><strong>Cancellation Laws:</strong> In any group:</p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>Left cancellation:</strong> <MathInline>{'a \\ast b = a \\ast c \\Rightarrow b = c'}</MathInline>
          </li>
          <li>
            <strong>Right cancellation:</strong> <MathInline>{'b \\ast a = c \\ast a \\Rightarrow b = c'}</MathInline>
          </li>
        </ul>
      </Callout>

      <Callout type="theorem">
        <p><strong>Inverse Properties:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <MathInline>{'(a^{-1})^{-1} = a'}</MathInline>
          </li>
          <li>
            <MathInline>{'(a \\ast b)^{-1} = b^{-1} \\ast a^{-1}'}</MathInline> (note the order reversal!)
          </li>
        </ul>
      </Callout>

      {/* Group Order */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Order of a Group</h2>

      <Callout type="definition">
        <p>
          The <strong>order</strong> of a group G, written <MathInline>{'|G|'}</MathInline>, is the number of elements in G.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>If <MathInline>{'|G|'}</MathInline> is finite, G is a <strong>finite group</strong></li>
          <li>If <MathInline>{'|G|'}</MathInline> is infinite, G is an <strong>infinite group</strong></li>
        </ul>
      </Callout>

      {/* Examples */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Classic Examples</h2>

      <CardGrid>
        <Card title="(ℤ, +)">
          <p className="text-sm text-dark-300 mb-2">Integers under addition</p>
          <ul className="text-sm space-y-1">
            <li>Identity: 0</li>
            <li>Inverse of n: −n</li>
            <li>Order: ∞</li>
            <li className="text-green-400">Abelian ✓</li>
          </ul>
        </Card>

        <Card title="(ℚ*, ×)">
          <p className="text-sm text-dark-300 mb-2">Nonzero rationals under multiplication</p>
          <ul className="text-sm space-y-1">
            <li>Identity: 1</li>
            <li>Inverse of q: 1/q</li>
            <li>Order: ∞</li>
            <li className="text-green-400">Abelian ✓</li>
          </ul>
        </Card>

        <Card title="(ℤₙ, +)">
          <p className="text-sm text-dark-300 mb-2">Integers mod n under addition</p>
          <ul className="text-sm space-y-1">
            <li>Identity: 0</li>
            <li>Inverse of a: n − a</li>
            <li>Order: n</li>
            <li className="text-green-400">Abelian ✓</li>
          </ul>
        </Card>

        <Card title="GL(n, ℝ)">
          <p className="text-sm text-dark-300 mb-2">Invertible n×n matrices</p>
          <ul className="text-sm space-y-1">
            <li>Identity: I (identity matrix)</li>
            <li>Inverse: matrix inverse</li>
            <li>Order: ∞</li>
            <li className="text-orange-400">Not abelian (n ≥ 2)</li>
          </ul>
        </Card>
      </CardGrid>

      {/* Cayley Table Demo */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Exploring Groups with Cayley Tables</h2>

      <p className="mb-4">
        The Cayley table (or multiplication table) of a finite group shows all products at once.
        It's a powerful tool for understanding group structure.
      </p>

      <CayleyTableDemo defaultGroup="Zn" defaultN={4} />

      <Callout type="info">
        <p><strong>Reading Cayley Tables:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>The identity element appears in every row/column exactly as the row/column header</li>
          <li>Every element appears exactly once in each row and column (Latin square property)</li>
          <li>Symmetric tables indicate abelian groups</li>
          <li>The identity row/column looks like the header row/column</li>
        </ul>
      </Callout>

      {/* Non-examples */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Non-Examples</h2>

      <p className="mb-4">Understanding what is <em>not</em> a group is just as important:</p>

      <div className="space-y-4">
        <Callout type="warning">
          <p><strong>(ℤ, −) is NOT a group</strong></p>
          <p className="mt-2 text-sm">
            Subtraction is not associative: <MathInline>{'(5 - 3) - 2 = 0 \\neq 4 = 5 - (3 - 2)'}</MathInline>
          </p>
        </Callout>

        <Callout type="warning">
          <p><strong>(ℕ, +) is NOT a group</strong></p>
          <p className="mt-2 text-sm">
            No inverses: for <MathInline>{'n > 0'}</MathInline>, there's no natural number m with{' '}
            <MathInline>{'n + m = 0'}</MathInline>
          </p>
        </Callout>

        <Callout type="warning">
          <p><strong>(ℤ, ×) is NOT a group</strong></p>
          <p className="mt-2 text-sm">
            Most elements lack inverses: only ±1 have integer multiplicative inverses
          </p>
        </Callout>
      </div>

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Takeaways</h2>

      <div className="bg-dark-800 rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>
              A group <MathInline>{'(G, \\ast)'}</MathInline> satisfies four axioms: closure, associativity, identity, and inverses.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>
              The identity element and inverses are unique. Groups satisfy cancellation laws.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>
              Commutativity is extra: abelian groups have <MathInline>{'ab = ba'}</MathInline> for all elements.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>
              Cayley tables completely describe finite groups. They're Latin squares with special properties.
            </span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
