import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { createZn, elementOrder } from '../../lib/algebra/groups';
import { gcd } from '../../lib/utils/math';

interface CyclicGroupWheelProps {
  n?: number;
  maxN?: number;
}

export function CyclicGroupWheel({ n: initialN = 8, maxN = 16 }: CyclicGroupWheelProps) {
  const [n, setN] = useState(initialN);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [highlightedPowers, setHighlightedPowers] = useState<Set<number>>(new Set());
  const [showConnections, setShowConnections] = useState(true);

  const group = useMemo(() => createZn(n), [n]);

  // Calculate positions on the circle
  const getPosition = (index: number, radius: number = 120) => {
    const angle = (index / n) * 2 * Math.PI - Math.PI / 2; // Start from top
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
    };
  };

  // Generate powers of an element
  const generatePowers = (element: number): number[] => {
    const powers: number[] = [];
    let current = 0;
    for (let i = 0; i < n; i++) {
      powers.push(current);
      current = (current + element) % n;
      if (current === 0 && i > 0) break;
    }
    return powers;
  };

  // Get all generators (elements with order n)
  const generators = useMemo(() => {
    return Array.from({ length: n }, (_, i) => i).filter(i => gcd(i, n) === 1 && i > 0);
  }, [n]);

  // Handle element selection
  const handleElementClick = (element: number) => {
    if (selectedElement === element) {
      setSelectedElement(null);
      setHighlightedPowers(new Set());
    } else {
      setSelectedElement(element);
      setHighlightedPowers(new Set(generatePowers(element)));
    }
  };

  // Get color for element based on its order
  const getElementColor = (element: number) => {
    if (element === 0) return '#22c55e'; // Identity - green
    const order = elementOrder(group, element);
    if (order === n) return '#f59e0b'; // Generator - amber
    return '#6366f1'; // Regular element - primary
  };

  // Calculate order of selected element
  const selectedOrder = selectedElement !== null ? elementOrder(group, selectedElement) : null;

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Cyclic Group Z<sub>{n}</sub></h4>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">n:</label>
          <input
            type="number"
            min={2}
            max={maxN}
            value={n}
            onChange={(e) => {
              const newN = Math.min(maxN, Math.max(2, parseInt(e.target.value) || 2));
              setN(newN);
              setSelectedElement(null);
              setHighlightedPowers(new Set());
            }}
            className="input w-20"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-dark-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showConnections}
            onChange={(e) => setShowConnections(e.target.checked)}
            className="rounded border-dark-600"
          />
          Show connections
        </label>

        <div className="flex gap-2">
          {[1, ...generators.slice(0, 3)].map(gen => (
            <button
              key={gen}
              onClick={() => handleElementClick(gen)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedElement === gen
                  ? 'bg-amber-600 text-white'
                  : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
              }`}
            >
              ⟨{gen}⟩
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Wheel visualization */}
        <div className="bg-dark-950 rounded-lg p-4">
          <svg width={300} height={300} viewBox="0 0 300 300">
            {/* Center point */}
            <circle cx={150} cy={150} r={4} fill="#475569" />

            {/* Background circle */}
            <circle
              cx={150}
              cy={150}
              r={120}
              fill="none"
              stroke="#334155"
              strokeWidth={1}
              strokeDasharray="4 4"
            />

            {/* Connection lines for selected element */}
            {showConnections && selectedElement !== null && highlightedPowers.size > 1 && (
              <g>
                {Array.from(highlightedPowers).map((power, i, arr) => {
                  const nextPower = arr[(i + 1) % arr.length];
                  const from = getPosition(power);
                  const to = getPosition(nextPower);
                  return (
                    <motion.line
                      key={`conn-${power}-${nextPower}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeOpacity={0.5}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    />
                  );
                })}
              </g>
            )}

            {/* Element nodes */}
            {Array.from({ length: n }, (_, i) => {
              const pos = getPosition(i);
              const isHighlighted = highlightedPowers.has(i);
              const isSelected = selectedElement === i;
              const color = getElementColor(i);

              return (
                <motion.g
                  key={i}
                  onClick={() => handleElementClick(i)}
                  style={{ cursor: 'pointer' }}
                  initial={false}
                  animate={{
                    scale: isHighlighted ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 18 : isHighlighted ? 16 : 14}
                    fill={isHighlighted ? color : '#1e293b'}
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dy="0.35em"
                    fill={isHighlighted ? 'white' : color}
                    fontSize={n > 12 ? '10' : '12'}
                    fontWeight="bold"
                  >
                    {i}
                  </text>
                </motion.g>
              );
            })}

            {/* Center label */}
            <text
              x={150}
              y={150}
              textAnchor="middle"
              dy="0.35em"
              fill="#64748b"
              fontSize="10"
            >
              Z<tspan baselineShift="sub" fontSize="8">{n}</tspan>
            </text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 space-y-4">
          {/* Legend */}
          <div className="p-3 bg-dark-800 rounded-lg space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 inline-block" />
              <span className="text-dark-300">Identity (0)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500 inline-block" />
              <span className="text-dark-300">Generator (order = n)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-500 inline-block" />
              <span className="text-dark-300">Other elements</span>
            </p>
          </div>

          {/* Generators list */}
          <div className="p-3 bg-dark-800 rounded-lg">
            <p className="text-sm text-dark-400 mb-1">Generators of Z<sub>{n}</sub>:</p>
            <p className="font-mono text-primary-400">
              {generators.length > 0 ? generators.join(', ') : '(none for n=1)'}
            </p>
            <p className="text-xs text-dark-500 mt-1">
              φ({n}) = {generators.length} generators
            </p>
          </div>

          {/* Selected element info */}
          {selectedElement !== null && (
            <div className="p-4 bg-dark-800 rounded-lg">
              <h5 className="font-semibold mb-2">Element {selectedElement}</h5>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="text-dark-400">Order:</span>{' '}
                  <span className="text-primary-400 font-mono">{selectedOrder}</span>
                </li>
                <li>
                  <span className="text-dark-400">Inverse:</span>{' '}
                  <span className="text-primary-400 font-mono">{(n - selectedElement) % n}</span>
                </li>
                <li>
                  <span className="text-dark-400">Generated subgroup:</span>{' '}
                  <span className="text-primary-400 font-mono text-xs">
                    {'⟨' + selectedElement + '⟩ = {' + Array.from(highlightedPowers).sort((a,b) => a-b).join(', ') + '}'}
                  </span>
                </li>
                {selectedOrder === n && (
                  <li className="text-amber-400 font-medium">
                    ✓ This is a generator!
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Powers sequence */}
          {selectedElement !== null && selectedElement !== 0 && (
            <div className="p-3 bg-dark-800 rounded-lg">
              <p className="text-sm text-dark-400 mb-2">Powers of {selectedElement}:</p>
              <div className="flex flex-wrap gap-1 font-mono text-xs">
                {generatePowers(selectedElement).map((power, i) => (
                  <span key={i} className="px-2 py-1 bg-dark-700 rounded">
                    {selectedElement}<sup>{i}</sup> = {power}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-dark-500">
            Click on elements to see the subgroup they generate.
          </p>
        </div>
      </div>
    </div>
  );
}

// Compact version for embedding
export function CyclicGroupWheelCompact({ n = 6 }: { n?: number }) {
  const generators = useMemo(() => {
    return Array.from({ length: n }, (_, i) => i).filter(i => gcd(i, n) === 1 && i > 0);
  }, [n]);

  const getPosition = (index: number, radius: number = 60) => {
    const angle = (index / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 75 + radius * Math.cos(angle),
      y: 75 + radius * Math.sin(angle),
    };
  };

  return (
    <svg width={150} height={150} viewBox="0 0 150 150">
      <circle cx={75} cy={75} r={60} fill="none" stroke="#334155" strokeWidth={1} />
      {Array.from({ length: n }, (_, i) => {
        const pos = getPosition(i);
        const isGenerator = generators.includes(i);
        return (
          <g key={i}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={10}
              fill={i === 0 ? '#22c55e' : isGenerator ? '#f59e0b' : '#6366f1'}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              {i}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
