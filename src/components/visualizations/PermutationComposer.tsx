import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Permutation } from '../../lib/types/algebra';
import {
  identityPermutation,
  permutationFromMapping,
  inversePermutation,
  cycleNotation,
  twoRowNotation,
  toCycles,
  permutationOrder,
  isEvenPermutation,
  toTranspositions,
} from '../../lib/algebra/permutations';

interface PermutationComposerProps {
  n?: number;
  maxN?: number;
}

// Color palette for elements
const elementColors = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
];

export function PermutationComposer({ n: initialN = 4, maxN = 6 }: PermutationComposerProps) {
  const [n, setN] = useState(initialN);
  const [permutation, setPermutation] = useState<Permutation>(() => identityPermutation(initialN));
  const [notation, setNotation] = useState<'cycle' | 'tworow'>('cycle');

  // Reset permutation when n changes
  const handleNChange = (newN: number) => {
    setN(newN);
    setPermutation(identityPermutation(newN));
  };

  // Swap two elements in the permutation
  const swapElements = (i: number, j: number) => {
    const newMapping = [...permutation.mapping];
    [newMapping[i], newMapping[j]] = [newMapping[j], newMapping[i]];
    setPermutation(permutationFromMapping(newMapping));
  };

  // Set a specific mapping
  const setMapping = (from: number, to: number) => {
    const newMapping = [...permutation.mapping];
    // Find current position of 'to' and swap
    const currentPos = newMapping.indexOf(to);
    if (currentPos !== -1 && currentPos !== from) {
      newMapping[currentPos] = newMapping[from];
    }
    newMapping[from] = to;
    setPermutation(permutationFromMapping(newMapping));
  };

  // Compute derived values
  const cycles = useMemo(() => toCycles(permutation), [permutation]);
  const order = useMemo(() => permutationOrder(permutation), [permutation]);
  const isEven = useMemo(() => isEvenPermutation(permutation), [permutation]);
  const transpositions = useMemo(() => toTranspositions(permutation), [permutation]);
  const inverse = useMemo(() => inversePermutation(permutation), [permutation]);
  const twoRow = useMemo(() => twoRowNotation(permutation), [permutation]);

  return (
    <div className="demo-container">
      <h3 className="text-xl font-semibold mb-4">Permutation Composer</h3>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">n:</label>
          <input
            type="number"
            min={2}
            max={maxN}
            value={n}
            onChange={(e) => handleNChange(Math.min(maxN, Math.max(2, parseInt(e.target.value) || 2)))}
            className="input w-20"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Notation:</label>
          <select
            value={notation}
            onChange={(e) => setNotation(e.target.value as 'cycle' | 'tworow')}
            className="input w-32"
          >
            <option value="cycle">Cycle</option>
            <option value="tworow">Two-row</option>
          </select>
        </div>

        <button onClick={() => setPermutation(identityPermutation(n))} className="btn-ghost">
          Reset
        </button>

        <button onClick={() => setPermutation(inverse)} className="btn-secondary">
          Invert
        </button>
      </div>

      {/* Visual permutation editor */}
      <div className="bg-dark-800 rounded-lg p-6 mb-6">
        {notation === 'tworow' ? (
          // Two-row notation visualization
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-dark-500 mr-2">σ = </span>
              <div className="flex">
                <span className="text-dark-500 text-2xl">(</span>
                <div className="flex flex-col">
                  <div className="flex">
                    {twoRow.top.map((val, i) => (
                      <div
                        key={`top-${i}`}
                        className="w-10 h-10 flex items-center justify-center font-mono"
                        style={{ color: elementColors[i % elementColors.length] }}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    {twoRow.bottom.map((_, i) => (
                      <select
                        key={`bottom-${i}`}
                        value={permutation.mapping[i]}
                        onChange={(e) => setMapping(i, parseInt(e.target.value))}
                        className="w-10 h-10 bg-transparent text-center font-mono cursor-pointer hover:bg-dark-700 rounded"
                        style={{ color: elementColors[permutation.mapping[i] % elementColors.length] }}
                      >
                        {Array.from({ length: n }, (_, j) => (
                          <option key={j} value={j}>
                            {j + 1}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
                <span className="text-dark-500 text-2xl">)</span>
              </div>
            </div>
          </div>
        ) : (
          // Cycle notation visualization with arrows
          <div className="space-y-4">
            <div className="text-2xl font-mono text-primary-400">
              {cycleNotation(permutation)}
            </div>

            {/* Visual arrow representation */}
            <div className="relative h-32">
              <svg className="w-full h-full" viewBox={`0 0 ${n * 80} 120`}>
                {/* Elements */}
                {Array.from({ length: n }, (_, i) => {
                  const x = 40 + i * 80;
                  const y = 60;
                  const targetIndex = permutation.mapping[i];
                  const targetX = 40 + targetIndex * 80;

                  return (
                    <g key={i}>
                      {/* Circle for element */}
                      <circle
                        cx={x}
                        cy={y}
                        r={20}
                        fill={elementColors[i % elementColors.length]}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => {
                          // Cycle through possible targets
                          const nextTarget = (permutation.mapping[i] + 1) % n;
                          setMapping(i, nextTarget);
                        }}
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dy="0.35em"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {i + 1}
                      </text>

                      {/* Arrow to target (if not identity) */}
                      {targetIndex !== i && (
                        <motion.path
                          d={`M ${x} ${y + 25} Q ${(x + targetX) / 2} ${y + 60} ${targetX} ${y + 25}`}
                          fill="none"
                          stroke={elementColors[i % elementColors.length]}
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-dark-400" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Quick operations */}
      <div className="mb-6">
        <p className="text-sm text-dark-400 mb-2">Quick transpositions (click to apply):</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: n }, (_, i) =>
            Array.from({ length: n - i - 1 }, (_, j) => {
              const a = i;
              const b = i + j + 1;
              return (
                <button
                  key={`${a}-${b}`}
                  onClick={() => swapElements(a, b)}
                  className="px-3 py-1 text-sm bg-dark-700 text-dark-300 rounded hover:bg-dark-600 font-mono"
                >
                  ({a + 1} {b + 1})
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-dark-800 rounded-lg">
          <h4 className="text-sm text-dark-400 mb-2">Properties</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-dark-400">Order:</span>{' '}
              <span className="text-primary-400 font-mono">{order}</span>
            </li>
            <li>
              <span className="text-dark-400">Parity:</span>{' '}
              <span className={isEven ? 'text-green-400' : 'text-orange-400'}>
                {isEven ? 'Even (+1)' : 'Odd (-1)'}
              </span>
            </li>
            <li>
              <span className="text-dark-400">Cycle type:</span>{' '}
              <span className="text-primary-400 font-mono">
                {cycles.length === 0
                  ? '(identity)'
                  : cycles.map((c) => c.length).sort((a, b) => b - a).join(', ')}
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-dark-800 rounded-lg">
          <h4 className="text-sm text-dark-400 mb-2">Inverse</h4>
          <p className="text-primary-400 font-mono text-lg">
            {cycleNotation(inverse)}
          </p>
        </div>

        <div className="p-4 bg-dark-800 rounded-lg md:col-span-2">
          <h4 className="text-sm text-dark-400 mb-2">
            Transposition decomposition ({transpositions.length} transposition{transpositions.length !== 1 ? 's' : ''})
          </h4>
          <p className="text-primary-400 font-mono">
            {transpositions.length === 0
              ? 'e (identity)'
              : transpositions.map((t) => cycleNotation(t)).join(' ')}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 text-sm text-dark-400">
        <p>
          Click on elements in the visualization to cycle through their targets.
          Use the transposition buttons for quick swaps.
        </p>
      </div>
    </div>
  );
}

// Demo component
export function PermutationComposerDemo() {
  return <PermutationComposer n={4} maxN={6} />;
}
