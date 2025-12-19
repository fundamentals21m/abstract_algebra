import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Permutation } from '../../lib/types/algebra';
import {
  identityPermutation,
  permutationFromMapping,
  composePermutations,
  inversePermutation,
  cycleNotation,
  permutationOrder,
  isEvenPermutation,
} from '../../lib/algebra/permutations';

interface PermutationWorkbenchProps {
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

// Single permutation editor component
function PermutationEditor({
  permutation,
  onChange,
  label,
  n,
  color,
}: {
  permutation: Permutation;
  onChange: (p: Permutation) => void;
  label: string;
  n: number;
  color: string;
}) {
  const setMapping = (from: number, to: number) => {
    const newMapping = [...permutation.mapping];
    const currentPos = newMapping.indexOf(to);
    if (currentPos !== -1 && currentPos !== from) {
      newMapping[currentPos] = newMapping[from];
    }
    newMapping[from] = to;
    onChange(permutationFromMapping(newMapping));
  };

  return (
    <div className="p-4 bg-dark-800 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-semibold">{label}</span>
        <span className="text-primary-400 font-mono ml-auto">
          {cycleNotation(permutation)}
        </span>
      </div>

      {/* Two-row notation editor */}
      <div className="flex items-center gap-1">
        <span className="text-dark-500 text-lg">(</span>
        <div className="flex flex-col">
          <div className="flex">
            {Array.from({ length: n }, (_, i) => (
              <div
                key={`top-${i}`}
                className="w-8 h-8 flex items-center justify-center font-mono text-sm"
                style={{ color: elementColors[i % elementColors.length] }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex">
            {Array.from({ length: n }, (_, i) => (
              <select
                key={`bottom-${i}`}
                value={permutation.mapping[i]}
                onChange={(e) => setMapping(i, parseInt(e.target.value))}
                className="w-8 h-8 bg-dark-700 text-center font-mono text-sm cursor-pointer rounded border-none focus:ring-1 focus:ring-primary-500"
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
        <span className="text-dark-500 text-lg">)</span>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onChange(identityPermutation(n))}
          className="text-xs px-2 py-1 bg-dark-700 text-dark-300 rounded hover:bg-dark-600"
        >
          Reset
        </button>
        <button
          onClick={() => onChange(inversePermutation(permutation))}
          className="text-xs px-2 py-1 bg-dark-700 text-dark-300 rounded hover:bg-dark-600"
        >
          Invert
        </button>
      </div>
    </div>
  );
}

// Visual representation of permutation as arrows
function PermutationArrows({
  permutation,
  color,
  yOffset = 0,
}: {
  permutation: Permutation;
  color: string;
  yOffset?: number;
}) {
  const n = permutation.n;
  const width = n * 60;
  const height = 80;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Source nodes */}
      {Array.from({ length: n }, (_, i) => {
        const x = 30 + i * 60;
        const y = 20 + yOffset;
        const target = permutation.mapping[i];
        const targetX = 30 + target * 60;
        const targetY = height - 20 + yOffset;

        return (
          <g key={i}>
            {/* Arrow */}
            {target !== i && (
              <motion.path
                d={`M ${x} ${y + 12} Q ${(x + targetX) / 2} ${(y + targetY) / 2} ${targetX} ${targetY - 12}`}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeOpacity={0.6}
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {/* Fixed point indicator */}
            {target === i && (
              <circle
                cx={x}
                cy={(y + targetY) / 2}
                r={4}
                fill={color}
                opacity={0.5}
              />
            )}
            {/* Source circle */}
            <circle
              cx={x}
              cy={y}
              r={12}
              fill={elementColors[i % elementColors.length]}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize="11"
              fontWeight="bold"
            >
              {i + 1}
            </text>
            {/* Target circle */}
            <circle
              cx={targetX}
              cy={targetY}
              r={12}
              fill={elementColors[target % elementColors.length]}
              opacity={0.3}
              stroke={elementColors[target % elementColors.length]}
              strokeWidth={2}
            />
            <text
              x={targetX}
              y={targetY}
              textAnchor="middle"
              dy="0.35em"
              fill={elementColors[target % elementColors.length]}
              fontSize="11"
              fontWeight="bold"
            >
              {target + 1}
            </text>
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
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
    </svg>
  );
}

export function PermutationWorkbench({ n: initialN = 4, maxN = 6 }: PermutationWorkbenchProps) {
  const [n, setN] = useState(initialN);
  const [sigma, setSigma] = useState<Permutation>(() =>
    permutationFromMapping([1, 2, 0, 3].slice(0, initialN))
  );
  const [tau, setTau] = useState<Permutation>(() =>
    permutationFromMapping([0, 2, 1, 3].slice(0, initialN))
  );

  // Reset when n changes
  const handleNChange = (newN: number) => {
    setN(newN);
    setSigma(identityPermutation(newN));
    setTau(identityPermutation(newN));
  };

  // Compute compositions
  const sigmaTau = useMemo(() => composePermutations(sigma, tau), [sigma, tau]);
  const tauSigma = useMemo(() => composePermutations(tau, sigma), [sigma, tau]);

  // Properties
  const isCommutative = cycleNotation(sigmaTau) === cycleNotation(tauSigma);

  // Example: trace an element through composition
  const [tracedElement, setTracedElement] = useState(0);
  const traceResult = useMemo(() => {
    const afterTau = tau.mapping[tracedElement];
    const afterSigmaTau = sigma.mapping[afterTau];
    return { afterTau, afterSigmaTau };
  }, [sigma, tau, tracedElement]);

  return (
    <div className="demo-container">
      <h3 className="text-xl font-semibold mb-4">Permutation Composition Workbench</h3>

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
      </div>

      {/* Permutation editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PermutationEditor
          permutation={sigma}
          onChange={setSigma}
          label="σ"
          n={n}
          color="#6366f1"
        />
        <PermutationEditor
          permutation={tau}
          onChange={setTau}
          label="τ"
          n={n}
          color="#f59e0b"
        />
      </div>

      {/* Composition results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-400 mb-1">σ ∘ τ (apply τ first, then σ):</p>
          <p className="text-2xl font-mono text-primary-400">
            {cycleNotation(sigmaTau)}
          </p>
          <p className="text-xs text-dark-500 mt-1">
            Order: {permutationOrder(sigmaTau)} | {isEvenPermutation(sigmaTau) ? 'Even' : 'Odd'}
          </p>
        </div>
        <div className="p-4 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-400 mb-1">τ ∘ σ (apply σ first, then τ):</p>
          <p className="text-2xl font-mono text-amber-400">
            {cycleNotation(tauSigma)}
          </p>
          <p className="text-xs text-dark-500 mt-1">
            Order: {permutationOrder(tauSigma)} | {isEvenPermutation(tauSigma) ? 'Even' : 'Odd'}
          </p>
        </div>
      </div>

      {/* Commutativity check */}
      <div className={`p-3 rounded-lg mb-6 ${isCommutative ? 'bg-green-950/30 border border-green-900/50' : 'bg-amber-950/30 border border-amber-900/50'}`}>
        <p className={isCommutative ? 'text-green-400' : 'text-amber-400'}>
          {isCommutative
            ? '✓ σ ∘ τ = τ ∘ σ — These permutations commute!'
            : '✗ σ ∘ τ ≠ τ ∘ σ — These permutations do NOT commute'}
        </p>
      </div>

      {/* Element tracer */}
      <div className="p-4 bg-dark-800 rounded-lg mb-6">
        <h4 className="font-semibold mb-3">Trace an Element Through σ ∘ τ</h4>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-400">Start with:</label>
            <select
              value={tracedElement}
              onChange={(e) => setTracedElement(parseInt(e.target.value))}
              className="input w-20"
            >
              {Array.from({ length: n }, (_, i) => (
                <option key={i} value={i}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: elementColors[tracedElement % elementColors.length] }}
            >
              {tracedElement + 1}
            </span>
            <span className="text-amber-400">—τ→</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: elementColors[traceResult.afterTau % elementColors.length] }}
            >
              {traceResult.afterTau + 1}
            </span>
            <span className="text-primary-400">—σ→</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: elementColors[traceResult.afterSigmaTau % elementColors.length] }}
            >
              {traceResult.afterSigmaTau + 1}
            </span>
          </div>
        </div>
        <p className="text-xs text-dark-500 mt-2">
          (σ ∘ τ)({tracedElement + 1}) = σ(τ({tracedElement + 1})) = σ({traceResult.afterTau + 1}) = {traceResult.afterSigmaTau + 1}
        </p>
      </div>

      {/* Visual arrows */}
      <div className="p-4 bg-dark-950 rounded-lg overflow-x-auto">
        <h4 className="font-semibold mb-3 text-dark-300">Visual Composition (σ ∘ τ)</h4>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-amber-400 mb-1">τ (applied first)</div>
          <PermutationArrows permutation={tau} color="#f59e0b" />
          <div className="text-xs text-primary-400 my-1">↓ then σ</div>
          <PermutationArrows permutation={sigma} color="#6366f1" />
          <div className="h-px w-full bg-dark-700 my-2" />
          <div className="text-xs text-green-400 mb-1">= σ ∘ τ (result)</div>
          <PermutationArrows permutation={sigmaTau} color="#22c55e" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 text-sm text-dark-400">
        <p>
          <strong>Note:</strong> Composition is read right-to-left: (σ ∘ τ)(x) = σ(τ(x)).
          First apply τ, then apply σ to the result.
        </p>
      </div>
    </div>
  );
}

export function PermutationWorkbenchDemo() {
  return <PermutationWorkbench n={4} maxN={6} />;
}
