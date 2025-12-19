import { useState, useMemo } from 'react';
import { LessonLayout } from '../../components/layout/LessonLayout';
import { Callout } from '../../components/common/Callout';
import { Math as MathInline, MathBlock } from '../../components/common/MathBlock';
import { Card, CardGrid } from '../../components/common/Card';

// Interactive Operation Table Builder
function OperationTableBuilder() {
  const [size, setSize] = useState(3);
  const [table, setTable] = useState<number[][]>(() => {
    // Default to addition mod 3
    return Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => (i + j) % 3)
    );
  });

  const elements = Array.from({ length: size }, (_, i) => i);

  const handleSizeChange = (newSize: number) => {
    const clampedSize = Math.max(2, Math.min(5, newSize));
    setSize(clampedSize);
    // Initialize with addition mod n
    setTable(
      Array.from({ length: clampedSize }, (_, i) =>
        Array.from({ length: clampedSize }, (_, j) => (i + j) % clampedSize)
      )
    );
  };

  const handleCellChange = (i: number, j: number, value: string) => {
    const val = parseInt(value);
    if (isNaN(val) || val < 0 || val >= size) return;
    const newTable = table.map((row) => [...row]);
    newTable[i][j] = val;
    setTable(newTable);
  };

  // Check closure
  const isClosed = useMemo(() => {
    return table.every((row) => row.every((val) => val >= 0 && val < size));
  }, [table, size]);

  // Check associativity (expensive check)
  const isAssociative = useMemo(() => {
    for (let a = 0; a < size; a++) {
      for (let b = 0; b < size; b++) {
        for (let c = 0; c < size; c++) {
          const ab_c = table[table[a][b]][c];
          const a_bc = table[a][table[b][c]];
          if (ab_c !== a_bc) return false;
        }
      }
    }
    return true;
  }, [table, size]);

  // Check commutativity
  const isCommutative = useMemo(() => {
    for (let a = 0; a < size; a++) {
      for (let b = 0; b < size; b++) {
        if (table[a][b] !== table[b][a]) return false;
      }
    }
    return true;
  }, [table, size]);

  // Check for identity
  const identityElement = useMemo(() => {
    for (let e = 0; e < size; e++) {
      let isIdentity = true;
      for (let a = 0; a < size; a++) {
        if (table[e][a] !== a || table[a][e] !== a) {
          isIdentity = false;
          break;
        }
      }
      if (isIdentity) return e;
    }
    return null;
  }, [table, size]);

  // Check for inverses (only if identity exists)
  const hasInverses = useMemo(() => {
    if (identityElement === null) return false;
    for (let a = 0; a < size; a++) {
      let hasInverse = false;
      for (let b = 0; b < size; b++) {
        if (table[a][b] === identityElement && table[b][a] === identityElement) {
          hasInverse = true;
          break;
        }
      }
      if (!hasInverse) return false;
    }
    return true;
  }, [table, size, identityElement]);

  const presetOperations = [
    { name: 'Addition mod n', fn: (i: number, j: number) => (i + j) % size },
    { name: 'Multiplication mod n', fn: (i: number, j: number) => (i * j) % size },
    { name: 'Max', fn: (i: number, j: number) => Math.max(i, j) },
    { name: 'Min', fn: (i: number, j: number) => Math.min(i, j) },
  ];

  const applyPreset = (fn: (i: number, j: number) => number) => {
    setTable(
      Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => fn(i, j))
      )
    );
  };

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Binary Operation Explorer</h4>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Set size:</label>
          <input
            type="number"
            min={2}
            max={5}
            value={size}
            onChange={(e) => handleSizeChange(parseInt(e.target.value) || 2)}
            className="input w-16"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Preset:</label>
          <select
            onChange={(e) => {
              const preset = presetOperations[parseInt(e.target.value)];
              if (preset) applyPreset(preset.fn);
            }}
            className="input"
          >
            {presetOperations.map((op, i) => (
              <option key={i} value={i}>{op.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div>
          <p className="text-sm text-dark-400 mb-2">
            Set: {'{' + elements.join(', ') + '}'}. Click cells to edit.
          </p>
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
                    <td key={j}>
                      <input
                        type="number"
                        min={0}
                        max={size - 1}
                        value={table[i][j]}
                        onChange={(e) => handleCellChange(i, j, e.target.value)}
                        className="w-8 h-8 text-center bg-transparent border-none focus:ring-1 focus:ring-primary-500 rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 space-y-3">
          <h5 className="font-semibold text-dark-200">Properties</h5>
          <div className="space-y-2">
            <p className="text-sm flex items-center gap-2">
              <span className={isClosed ? 'text-green-400' : 'text-red-400'}>
                {isClosed ? '✓' : '✗'}
              </span>
              <span>Closure</span>
              <span className="text-dark-500 text-xs">
                (all results in set)
              </span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className={isAssociative ? 'text-green-400' : 'text-red-400'}>
                {isAssociative ? '✓' : '✗'}
              </span>
              <span>Associative</span>
              <span className="text-dark-500 text-xs">
                ((a∗b)∗c = a∗(b∗c))
              </span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className={isCommutative ? 'text-green-400' : 'text-orange-400'}>
                {isCommutative ? '✓' : '✗'}
              </span>
              <span>Commutative</span>
              <span className="text-dark-500 text-xs">
                (a∗b = b∗a)
              </span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className={identityElement !== null ? 'text-green-400' : 'text-orange-400'}>
                {identityElement !== null ? '✓' : '✗'}
              </span>
              <span>Identity element</span>
              {identityElement !== null && (
                <span className="text-primary-400 font-mono">e = {identityElement}</span>
              )}
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className={hasInverses ? 'text-green-400' : 'text-orange-400'}>
                {hasInverses ? '✓' : '✗'}
              </span>
              <span>Inverses exist</span>
            </p>
          </div>

          <div className="pt-3 border-t border-dark-700">
            <p className="text-sm">
              <span className="text-dark-400">Structure type: </span>
              <span className="font-semibold text-primary-400">
                {hasInverses && isAssociative && identityElement !== null
                  ? isCommutative
                    ? 'Abelian Group'
                    : 'Group'
                  : isAssociative && identityElement !== null
                  ? 'Monoid'
                  : isAssociative
                  ? 'Semigroup'
                  : 'Magma'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Closure demonstration
function ClosureDemo() {
  const examples = [
    {
      set: 'ℕ (Natural numbers)',
      op: 'Addition',
      closed: true,
      reason: 'Sum of natural numbers is natural',
    },
    {
      set: 'ℕ (Natural numbers)',
      op: 'Subtraction',
      closed: false,
      reason: '2 - 5 = -3 ∉ ℕ',
    },
    {
      set: 'ℤ (Integers)',
      op: 'Multiplication',
      closed: true,
      reason: 'Product of integers is an integer',
    },
    {
      set: 'ℤ (Integers)',
      op: 'Division',
      closed: false,
      reason: '1 ÷ 2 = 0.5 ∉ ℤ',
    },
    {
      set: '{0, 1}',
      op: 'Addition mod 2',
      closed: true,
      reason: '0+0=0, 0+1=1, 1+0=1, 1+1=0',
    },
    {
      set: 'Even integers',
      op: 'Multiplication',
      closed: true,
      reason: 'Product of even numbers is even',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {examples.map((ex, i) => (
        <div
          key={i}
          className={`p-3 rounded-lg border ${
            ex.closed
              ? 'border-green-900/50 bg-green-950/20'
              : 'border-red-900/50 bg-red-950/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={ex.closed ? 'text-green-400' : 'text-red-400'}>
              {ex.closed ? '✓' : '✗'}
            </span>
            <span className="font-medium text-sm">
              {ex.set} under {ex.op}
            </span>
          </div>
          <p className="text-xs text-dark-400 ml-6">{ex.reason}</p>
        </div>
      ))}
    </div>
  );
}

export default function Section01() {
  return (
    <LessonLayout sectionId={1}>
      {/* Introduction */}
      <p className="text-lg text-dark-300 mb-6">
        A binary operation is a way of combining two elements of a set to produce another element.
        Understanding binary operations is essential because groups, rings, and fields are all built on them.
      </p>

      {/* Definition */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Binary Operations</h2>

      <Callout type="definition">
        <p>
          A <strong>binary operation</strong> on a set S is a function <MathInline>{'\\ast: S \\times S \\to S'}</MathInline>.
        </p>
        <p className="mt-2">
          For elements <MathInline>{'a, b \\in S'}</MathInline>, we write <MathInline>{'a \\ast b'}</MathInline> instead of <MathInline>{'\\ast(a, b)'}</MathInline>.
        </p>
      </Callout>

      <p className="my-4">
        The definition has a crucial requirement: the result must be <em>in the same set</em> S.
        This property is called <strong>closure</strong>.
      </p>

      <Callout type="example">
        <ul className="space-y-2">
          <li>
            <strong>Addition on ℤ:</strong> <MathInline>{'3 + 5 = 8 \\in \\mathbb{Z}'}</MathInline> ✓
          </li>
          <li>
            <strong>Matrix multiplication:</strong> The product of two n×n matrices is an n×n matrix ✓
          </li>
          <li>
            <strong>Division on ℤ:</strong> <MathInline>{'1 \\div 2 = 0.5 \\notin \\mathbb{Z}'}</MathInline> ✗ (not a binary operation!)
          </li>
        </ul>
      </Callout>

      <h3 className="text-xl font-semibold mt-8 mb-4">Closure Examples</h3>
      <ClosureDemo />

      {/* Operation Tables */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Operation Tables</h2>

      <p className="mb-4">
        For finite sets, we can completely describe a binary operation using an <strong>operation table</strong>
        (also called a <strong>Cayley table</strong>). The entry in row a and column b gives <MathInline>{'a \\ast b'}</MathInline>.
      </p>

      <Callout type="example">
        <p className="mb-4">The operation table for addition mod 3 on <MathInline>{'\\{0, 1, 2\\}'}</MathInline>:</p>
        <div className="flex justify-center">
          <table className="cayley-table text-center">
            <thead>
              <tr>
                <th>+</th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>0</th>
                <td>0</td>
                <td>1</td>
                <td>2</td>
              </tr>
              <tr>
                <th>1</th>
                <td>1</td>
                <td>2</td>
                <td>0</td>
              </tr>
              <tr>
                <th>2</th>
                <td>2</td>
                <td>0</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-dark-400">
          For example, <MathInline>{'2 + 2 = 4 \\equiv 1 \\pmod{3}'}</MathInline>, so the entry at row 2, column 2 is 1.
        </p>
      </Callout>

      <OperationTableBuilder />

      {/* Properties */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Properties of Binary Operations</h2>

      <p className="mb-6">
        Binary operations can have various properties that determine the algebraic structure they define.
      </p>

      <div className="space-y-6">
        <Callout type="definition">
          <p>
            <strong>Commutative:</strong> An operation ∗ is commutative if
          </p>
          <MathBlock>{'a \\ast b = b \\ast a \\quad \\text{for all } a, b \\in S'}</MathBlock>
          <p className="mt-2 text-sm text-dark-400">
            Visually: the operation table is symmetric across the main diagonal.
          </p>
        </Callout>

        <Callout type="definition">
          <p>
            <strong>Associative:</strong> An operation ∗ is associative if
          </p>
          <MathBlock>{'(a \\ast b) \\ast c = a \\ast (b \\ast c) \\quad \\text{for all } a, b, c \\in S'}</MathBlock>
          <p className="mt-2 text-sm text-dark-400">
            This means parentheses don't matter, so we can write <MathInline>{'a \\ast b \\ast c'}</MathInline> unambiguously.
          </p>
        </Callout>

        <Callout type="definition">
          <p>
            <strong>Identity element:</strong> An element <MathInline>{'e \\in S'}</MathInline> is an identity for ∗ if
          </p>
          <MathBlock>{'e \\ast a = a \\ast e = a \\quad \\text{for all } a \\in S'}</MathBlock>
        </Callout>

        <Callout type="definition">
          <p>
            <strong>Inverse:</strong> If ∗ has identity e, then <MathInline>{'b \\in S'}</MathInline> is an inverse of <MathInline>{'a \\in S'}</MathInline> if
          </p>
          <MathBlock>{'a \\ast b = b \\ast a = e'}</MathBlock>
          <p className="mt-2 text-sm text-dark-400">
            We typically write the inverse of a as <MathInline>{'a^{-1}'}</MathInline> (multiplicative) or <MathInline>{'-a'}</MathInline> (additive).
          </p>
        </Callout>
      </div>

      {/* Common Examples */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Common Examples</h2>

      <CardGrid>
        <Card title="(ℤ, +)">
          <ul className="text-sm space-y-1">
            <li className="text-green-400">✓ Commutative</li>
            <li className="text-green-400">✓ Associative</li>
            <li className="text-green-400">✓ Identity: 0</li>
            <li className="text-green-400">✓ Inverses: -a for each a</li>
          </ul>
          <p className="text-xs text-dark-500 mt-2">This is an abelian group!</p>
        </Card>

        <Card title="(ℤ, ×)">
          <ul className="text-sm space-y-1">
            <li className="text-green-400">✓ Commutative</li>
            <li className="text-green-400">✓ Associative</li>
            <li className="text-green-400">✓ Identity: 1</li>
            <li className="text-red-400">✗ Inverses: only ±1 have integer inverses</li>
          </ul>
          <p className="text-xs text-dark-500 mt-2">This is a monoid, not a group.</p>
        </Card>

        <Card title="(ℝ*, ×)">
          <ul className="text-sm space-y-1">
            <li className="text-green-400">✓ Commutative</li>
            <li className="text-green-400">✓ Associative</li>
            <li className="text-green-400">✓ Identity: 1</li>
            <li className="text-green-400">✓ Inverses: 1/a for each a ≠ 0</li>
          </ul>
          <p className="text-xs text-dark-500 mt-2">Nonzero reals under multiplication form a group!</p>
        </Card>

        <Card title="Matrix Multiplication">
          <ul className="text-sm space-y-1">
            <li className="text-red-400">✗ Not commutative (in general)</li>
            <li className="text-green-400">✓ Associative</li>
            <li className="text-green-400">✓ Identity: I (identity matrix)</li>
            <li className="text-orange-400">~ Inverses: only for invertible matrices</li>
          </ul>
          <p className="text-xs text-dark-500 mt-2">GL(n) = invertible matrices form a nonabelian group.</p>
        </Card>
      </CardGrid>

      {/* Noncommutative Warning */}
      <Callout type="warning">
        <p>
          <strong>Order matters for noncommutative operations!</strong>
        </p>
        <p className="mt-2">
          For matrix multiplication, <MathInline>{'AB \\neq BA'}</MathInline> in general. For example:
        </p>
        <MathBlock>
          {'\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} \\neq \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}'}
        </MathBlock>
      </Callout>

      {/* Algebraic Structures */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Algebraic Structures</h2>

      <p className="mb-4">
        Different combinations of properties define different algebraic structures:
      </p>

      <div className="overflow-x-auto">
        <table className="cayley-table w-full">
          <thead>
            <tr>
              <th>Structure</th>
              <th>Closure</th>
              <th>Associative</th>
              <th>Identity</th>
              <th>Inverses</th>
              <th>Commutative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Magma</th>
              <td className="text-green-400">✓</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
            </tr>
            <tr>
              <th>Semigroup</th>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
            </tr>
            <tr>
              <th>Monoid</th>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-dark-500">—</td>
              <td className="text-dark-500">—</td>
            </tr>
            <tr>
              <th>Group</th>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-dark-500">—</td>
            </tr>
            <tr>
              <th>Abelian Group</th>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
              <td className="text-green-400">✓</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info">
        <p>
          <strong>Preview:</strong> In the next section, we'll formally define groups and explore their properties in detail.
          A group is exactly a set with an associative binary operation that has an identity element and
          where every element has an inverse.
        </p>
      </Callout>

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Takeaways</h2>

      <div className="bg-dark-800 rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>A binary operation <MathInline>{'\\ast'}</MathInline> on S maps <MathInline>{'S \\times S \\to S'}</MathInline>. The key requirement is closure: results stay in S.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Operation tables (Cayley tables) completely describe finite binary operations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Key properties: commutative (ab = ba), associative ((ab)c = a(bc)), identity (ea = ae = a), inverses (ab = e).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Different combinations of properties define different structures: magma → semigroup → monoid → group.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
