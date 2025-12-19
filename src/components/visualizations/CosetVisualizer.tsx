import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Group } from '../../lib/types/algebra';
import { createZn, generateSubgroup, leftCosets, isNormalSubgroup } from '../../lib/algebra/groups';

interface CosetVisualizerProps<T> {
  group: Group<T>;
  subgroup?: T[];
}

// Color palette for cosets
const cosetColors = [
  '#6366f1', // indigo
  '#f59e0b', // amber
  '#10b981', // emerald
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#f97316', // orange
  '#ec4899', // pink
];

export function CosetVisualizer<T>({ group, subgroup: initialSubgroup }: CosetVisualizerProps<T>) {
  const [selectedGenerator, setSelectedGenerator] = useState<T | null>(null);

  // Get all non-trivial proper subgroups
  const subgroups = useMemo(() => {
    const result: T[][] = [];
    const seen = new Set<string>();

    for (const g of group.elements) {
      const sg = generateSubgroup(group, [g]);
      const key = sg.map(e => group.toString(e)).sort().join(',');
      if (!seen.has(key) && sg.length > 1 && sg.length < group.elements.length) {
        seen.add(key);
        result.push(sg);
      }
    }

    return result.sort((a, b) => a.length - b.length);
  }, [group]);

  // Current subgroup
  const currentSubgroup = useMemo(() => {
    if (selectedGenerator !== null) {
      return generateSubgroup(group, [selectedGenerator as T]);
    }
    if (initialSubgroup) {
      return initialSubgroup;
    }
    return subgroups[0] || [group.identity];
  }, [group, selectedGenerator, initialSubgroup, subgroups]);

  // Calculate cosets
  const cosets = useMemo(() => leftCosets(group, currentSubgroup), [group, currentSubgroup]);

  // Check if subgroup is normal
  const isNormal = useMemo(() => isNormalSubgroup(group, currentSubgroup), [group, currentSubgroup]);

  // Create element to coset mapping
  const elementCosetMap = useMemo(() => {
    const map = new Map<string, number>();
    cosets.forEach((coset, cosetIndex) => {
      coset.forEach(elem => {
        map.set(group.toString(elem), cosetIndex);
      });
    });
    return map;
  }, [cosets, group]);

  // Grid layout dimensions
  const cols = Math.ceil(Math.sqrt(group.elements.length));
  const cellSize = 50;
  const gap = 4;

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">
        Cosets of H in {group.name}
      </h4>

      {/* Subgroup selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-dark-400 self-center">Subgroup H:</span>
        {group.elements.slice(0, 8).map((elem, i) => {
          const sg = generateSubgroup(group, [elem]);
          if (sg.length === 1 || sg.length === group.elements.length) return null;
          return (
            <button
              key={i}
              onClick={() => setSelectedGenerator(elem)}
              className={`px-3 py-1 text-sm rounded transition-colors font-mono ${
                selectedGenerator !== null && group.toString(selectedGenerator) === group.toString(elem)
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
              }`}
            >
              ⟨{group.toString(elem)}⟩
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Visual grid */}
        <div className="bg-dark-950 rounded-lg p-4">
          <svg
            width={cols * (cellSize + gap) + gap}
            height={Math.ceil(group.elements.length / cols) * (cellSize + gap) + gap}
          >
            {group.elements.map((elem, i) => {
              const row = Math.floor(i / cols);
              const col = i % cols;
              const x = col * (cellSize + gap) + gap;
              const y = row * (cellSize + gap) + gap;
              const cosetIndex = elementCosetMap.get(group.toString(elem)) || 0;
              const isInSubgroup = currentSubgroup.some(h => group.equals(h, elem));

              return (
                <motion.g key={i} initial={false}>
                  <motion.rect
                    x={x}
                    y={y}
                    width={cellSize}
                    height={cellSize}
                    rx={6}
                    fill={cosetColors[cosetIndex % cosetColors.length]}
                    fillOpacity={isInSubgroup ? 1 : 0.6}
                    stroke={isInSubgroup ? '#f8fafc' : 'transparent'}
                    strokeWidth={isInSubgroup ? 2 : 0}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.2 }}
                  />
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2}
                    textAnchor="middle"
                    dy="0.35em"
                    fill="white"
                    fontSize="12"
                    fontWeight={isInSubgroup ? 'bold' : 'normal'}
                  >
                    {group.toString(elem)}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 space-y-4">
          {/* Subgroup info */}
          <div className="p-4 bg-dark-800 rounded-lg">
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              Subgroup H
              {isNormal && (
                <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                  Normal
                </span>
              )}
            </h5>
            <p className="font-mono text-sm text-primary-400">
              H = {'{' + currentSubgroup.map(e => group.toString(e)).join(', ') + '}'}
            </p>
            <p className="text-sm text-dark-400 mt-1">
              |H| = {currentSubgroup.length}
            </p>
          </div>

          {/* Cosets list */}
          <div className="p-4 bg-dark-800 rounded-lg">
            <h5 className="font-semibold mb-2">
              Left Cosets ({cosets.length} cosets)
            </h5>
            <div className="space-y-2">
              {cosets.map((coset, i) => {
                const representative = coset[0];
                const isSubgroupCoset = coset.some(e => group.equals(e, group.identity));
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded"
                    style={{ backgroundColor: cosetColors[i % cosetColors.length] + '20' }}
                  >
                    <span
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: cosetColors[i % cosetColors.length] }}
                    />
                    <span className="font-mono text-sm">
                      {group.toString(representative)}H = {'{' + coset.map(e => group.toString(e)).join(', ') + '}'}
                    </span>
                    {isSubgroupCoset && (
                      <span className="text-xs text-dark-500">(= H)</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lagrange's theorem */}
          <div className="p-3 bg-dark-800 rounded-lg text-sm">
            <p className="text-dark-400">
              <strong>Lagrange's Theorem:</strong>
            </p>
            <p className="font-mono text-primary-400 mt-1">
              |G| = [G:H] · |H|
            </p>
            <p className="font-mono text-primary-400">
              {group.elements.length} = {cosets.length} × {currentSubgroup.length}
            </p>
          </div>

          {isNormal && (
            <div className="p-3 bg-green-950/30 border border-green-900/50 rounded-lg text-sm">
              <p className="text-green-400">
                <strong>H is normal!</strong>
              </p>
              <p className="text-dark-400 mt-1">
                The quotient group G/H has {cosets.length} elements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Demo wrapper with group selector
export function CosetVisualizerDemo() {
  const [n, setN] = useState(12);

  const group = useMemo(() => createZn(n), [n]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Group: Z</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.max(2, Math.min(24, parseInt(e.target.value) || 2)))}
            min={2}
            max={24}
            className="input w-20"
          />
        </div>
      </div>

      <CosetVisualizer group={group} />
    </div>
  );
}
