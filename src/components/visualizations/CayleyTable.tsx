import { useState, useMemo } from 'react';
import type { Group, DihedralElement } from '../../lib/types/algebra';
import { cayleyTable, elementOrder } from '../../lib/algebra/groups';
import { motion } from 'framer-motion';

interface CayleyTableProps<T> {
  group: Group<T>;
  showOrders?: boolean;
  highlightIdentity?: boolean;
  colorByOrder?: boolean;
  compact?: boolean; // Force compact mode
  useIndices?: boolean; // Use numeric indices instead of element names
  highlightNonAbelian?: boolean; // Highlight cells where ab ≠ ba
  onCellHover?: (row: number, col: number, result: T) => void;
  onCellSelect?: (row: number, col: number, result: T) => void;
}

// Color palette for different element orders
const orderColors: Record<number, string> = {
  1: 'text-green-400', // Identity
  2: 'text-blue-400',
  3: 'text-purple-400',
  4: 'text-pink-400',
  5: 'text-orange-400',
  6: 'text-yellow-400',
  7: 'text-teal-400',
  8: 'text-red-400',
};

// Background colors for indices mode
const orderBgColors: Record<number, string> = {
  1: 'bg-green-500/20',
  2: 'bg-blue-500/20',
  3: 'bg-purple-500/20',
  4: 'bg-pink-500/20',
  5: 'bg-orange-500/20',
  6: 'bg-yellow-500/20',
  7: 'bg-teal-500/20',
  8: 'bg-red-500/20',
};

// Legend panel for indices mode with collapsible sections
function LegendPanel<T>({
  group,
  orders,
  colorByOrder
}: {
  group: Group<T>;
  orders: Map<string, number> | null;
  colorByOrder: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const groupSize = group.elements.length;
  const showExpandButton = groupSize > 20;
  const displayCount = isExpanded ? groupSize : Math.min(20, groupSize);

  const getOrderColor = (element: T): string => {
    if (!colorByOrder || !orders) return '';
    const order = orders.get(group.toString(element)) || 1;
    return orderColors[order] || 'text-dark-100';
  };

  return (
    <div className="p-3 bg-dark-800/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-dark-400">
          <strong>Legend:</strong> Using indices for compact display. Hover over cells to see full notation.
        </p>
        {showExpandButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary-400 hover:text-primary-300 px-2 py-1 rounded bg-dark-700/50 hover:bg-dark-700"
          >
            {isExpanded ? 'Show less' : `Show all ${groupSize}`}
          </button>
        )}
      </div>
      <div className={`grid gap-1 text-xs ${groupSize <= 24 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8' : 'grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12'}`}>
        {group.elements.slice(0, displayCount).map((elem, i) => (
          <span
            key={i}
            className={`px-1.5 py-0.5 bg-dark-700 rounded font-mono truncate ${getOrderColor(elem)}`}
            title={group.toString(elem)}
          >
            <span className="text-primary-400 font-semibold">{i}</span>
            <span className="text-dark-500 mx-0.5">=</span>
            <span className="text-dark-300">{group.toString(elem)}</span>
          </span>
        ))}
      </div>
      {!isExpanded && groupSize > displayCount && (
        <p className="text-xs text-dark-500 mt-2">
          Showing {displayCount} of {groupSize} elements. Click "Show all" to see complete legend.
        </p>
      )}
    </div>
  );
}

export function CayleyTable<T>({
  group,
  showOrders = false,
  highlightIdentity = true,
  colorByOrder = false,
  compact: forceCompact,
  useIndices: forceUseIndices,
  highlightNonAbelian = false,
  onCellHover,
  onCellSelect,
}: CayleyTableProps<T>) {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [highlightedCol, setHighlightedCol] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Auto-detect if we should use compact/indices mode based on group size
  const groupSize = group.elements.length;
  const isLargeGroup = groupSize >= 12; // A4 has 12 elements
  const isVeryLargeGroup = groupSize > 24;
  const isHugeGroup = groupSize > 60; // S5 (120), A5 (60)

  const compact = forceCompact ?? isLargeGroup;
  const useIndices = forceUseIndices ?? isVeryLargeGroup;

  // Compute Cayley table
  const table = useMemo(() => cayleyTable(group), [group]);

  // Compute non-commutative pairs for highlighting
  const nonAbelianCells = useMemo(() => {
    if (!highlightNonAbelian) return new Set<string>();
    const cells = new Set<string>();
    for (let i = 0; i < groupSize; i++) {
      for (let j = i + 1; j < groupSize; j++) {
        const ab = group.toString(table[i][j].result);
        const ba = group.toString(table[j][i].result);
        if (ab !== ba) {
          cells.add(`${i},${j}`);
          cells.add(`${j},${i}`);
        }
      }
    }
    return cells;
  }, [group, table, groupSize, highlightNonAbelian]);

  // Create element to index mapping
  const elementToIndex = useMemo(() => {
    const map = new Map<string, number>();
    group.elements.forEach((e, i) => map.set(group.toString(e), i));
    return map;
  }, [group]);

  // Compute element orders if needed
  const orders = useMemo(() => {
    if (!showOrders && !colorByOrder) return null;
    return new Map(group.elements.map((e) => [group.toString(e), elementOrder(group, e)]));
  }, [group, showOrders, colorByOrder]);

  const getOrderColor = (element: T): string => {
    if (!colorByOrder || !orders) return '';
    const order = orders.get(group.toString(element)) || 1;
    return orderColors[order] || 'text-dark-100';
  };

  const getOrderBgColor = (element: T): string => {
    if (!colorByOrder || !orders) return '';
    const order = orders.get(group.toString(element)) || 1;
    return orderBgColors[order] || '';
  };

  const isIdentity = (element: T): boolean => {
    return group.equals(element, group.identity);
  };

  const handleCellClick = (rowIndex: number, colIndex: number, result: T) => {
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
      onCellSelect?.(rowIndex, colIndex, result);
    }
  };

  const handleCellHover = (rowIndex: number, colIndex: number, result: T) => {
    setHighlightedRow(rowIndex);
    setHighlightedCol(colIndex);
    onCellHover?.(rowIndex, colIndex, result);
  };

  // Display function - either index or element name
  const display = (element: T): string => {
    if (useIndices) {
      const idx = elementToIndex.get(group.toString(element));
      return idx !== undefined ? String(idx) : group.toString(element);
    }
    return group.toString(element);
  };

  // Compact display for cycle notation - remove spaces
  const compactDisplay = (element: T): string => {
    const str = display(element);
    // Remove spaces from cycle notation like "(1 2 3)" -> "(123)"
    return str.replace(/\((\d+)\s+/g, '($1').replace(/\s+(\d+)\)/g, '$1)').replace(/\s+/g, '');
  };

  const cellDisplay = compact ? compactDisplay : display;

  // Table size classes - more compact for huge groups
  const tableClasses = isHugeGroup
    ? 'text-[10px]'
    : compact
      ? 'text-xs'
      : 'text-sm';

  const cellClasses = isHugeGroup
    ? 'px-0.5 py-0 min-w-[1.2rem] leading-tight'
    : compact
      ? 'px-1 py-0.5 min-w-[1.5rem]'
      : 'px-2 py-1.5 min-w-[2.5rem]';

  return (
    <div className="space-y-4">
      {/* Size warning for huge groups */}
      {isHugeGroup && (
        <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400">
            Large group ({groupSize} elements, {groupSize * groupSize} cells).
            Scroll horizontally and vertically to navigate. Headers stay fixed.
          </p>
        </div>
      )}

      {/* Legend for indices mode */}
      {useIndices && (
        <LegendPanel group={group} orders={orders} colorByOrder={colorByOrder} />
      )}

      <div className={`overflow-auto ${isHugeGroup ? 'max-h-[70vh]' : ''}`}>
        <table className={`cayley-table ${tableClasses} border-collapse`}>
          <thead className={isHugeGroup ? 'sticky top-0 z-20' : ''}>
            <tr>
              <th className={`bg-dark-900 text-primary-400 ${cellClasses} sticky left-0 ${isHugeGroup ? 'z-30' : 'z-10'}`}>∗</th>
              {group.elements.map((elem, j) => (
                <th
                  key={j}
                  className={`cursor-pointer transition-colors ${cellClasses} ${
                    highlightedCol === j ? 'bg-primary-900/40' : 'bg-dark-800/60'
                  } ${getOrderColor(elem)}`}
                  onMouseEnter={() => setHighlightedCol(j)}
                  onMouseLeave={() => setHighlightedCol(null)}
                  title={useIndices ? group.toString(elem) : undefined}
                >
                  {cellDisplay(elem)}
                  {showOrders && orders && !compact && (
                    <span className="text-xs text-dark-500 ml-1">
                      ({orders.get(group.toString(elem))})
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                <th
                  className={`cursor-pointer transition-colors ${cellClasses} sticky left-0 ${isHugeGroup ? 'z-10' : 'z-10'} ${
                    highlightedRow === i ? 'bg-primary-900/40' : 'bg-dark-800/60'
                  } ${getOrderColor(group.elements[i])}`}
                  onMouseEnter={() => setHighlightedRow(i)}
                  onMouseLeave={() => setHighlightedRow(null)}
                  title={useIndices ? group.toString(group.elements[i]) : undefined}
                >
                  {cellDisplay(group.elements[i])}
                  {showOrders && orders && !compact && (
                    <span className="text-xs text-dark-500 ml-1">
                      ({orders.get(group.toString(group.elements[i]))})
                    </span>
                  )}
                </th>
                {row.map((cell, j) => {
                  const isHighlighted = highlightedRow === i || highlightedCol === j;
                  const isSelected = selectedCell?.row === i && selectedCell?.col === j;
                  const isIdentityCell = highlightIdentity && isIdentity(cell.result);
                  const isNonAbelianCell = nonAbelianCells.has(`${i},${j}`);

                  return (
                    <td
                      key={j}
                      className={`cursor-pointer transition-all font-mono ${cellClasses} ${
                        isHighlighted ? 'bg-primary-900/30' : ''
                      } ${isSelected ? 'bg-primary-700/50 ring-1 ring-primary-500' : ''} ${
                        isNonAbelianCell ? 'ring-2 ring-orange-500 bg-orange-500/20' : ''
                      } ${
                        isIdentityCell
                          ? 'text-green-400 font-semibold'
                          : useIndices && colorByOrder
                            ? getOrderBgColor(cell.result) + ' ' + getOrderColor(cell.result)
                            : getOrderColor(cell.result)
                      }`}
                      onMouseEnter={() => handleCellHover(i, j, cell.result)}
                      onMouseLeave={() => {
                        setHighlightedRow(null);
                        setHighlightedCol(null);
                      }}
                      onClick={() => handleCellClick(i, j, cell.result)}
                      title={useIndices ? group.toString(cell.result) : undefined}
                    >
                      {cellDisplay(cell.result)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected cell info */}
      {selectedCell && (
        <div className="p-4 bg-dark-800 rounded-lg">
          <p className="text-dark-200 font-mono">
            <span className="text-primary-400">
              {group.toString(group.elements[selectedCell.row])}
            </span>
            <span className="text-dark-400 mx-2">∗</span>
            <span className="text-primary-400">
              {group.toString(group.elements[selectedCell.col])}
            </span>
            <span className="text-dark-400 mx-2">=</span>
            <span className="text-green-400 font-semibold">
              {group.toString(table[selectedCell.row][selectedCell.col].result)}
            </span>
          </p>
          {useIndices && (
            <p className="text-xs text-dark-500 mt-1">
              Index: {elementToIndex.get(group.toString(group.elements[selectedCell.row]))} ∗ {elementToIndex.get(group.toString(group.elements[selectedCell.col]))} = {elementToIndex.get(group.toString(table[selectedCell.row][selectedCell.col].result))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Preset components for common groups
interface PresetCayleyTableProps {
  showOrders?: boolean;
  colorByOrder?: boolean;
  compact?: boolean;
  useIndices?: boolean;
  highlightNonAbelian?: boolean;
}

import { createZn, createDn, createV4 } from '../../lib/algebra/groups';
import { createSn, createAn } from '../../lib/algebra/permutations';

export function ZnCayleyTable({ n, ...props }: PresetCayleyTableProps & { n: number }) {
  const group = useMemo(() => createZn(n), [n]);
  return <CayleyTable group={group} {...props} />;
}

export function DnCayleyTable({ n, ...props }: PresetCayleyTableProps & { n: number }) {
  const group = useMemo(() => createDn(n), [n]);
  return <CayleyTable group={group} {...props} />;
}

export function SnCayleyTable({ n, ...props }: PresetCayleyTableProps & { n: number }) {
  const group = useMemo(() => createSn(n), [n]);
  return <CayleyTable group={group} {...props} />;
}

export function AnCayleyTable({ n, ...props }: PresetCayleyTableProps & { n: number }) {
  const group = useMemo(() => createAn(n), [n]);
  return <CayleyTable group={group} {...props} />;
}

export function V4CayleyTable(props: PresetCayleyTableProps) {
  const group = useMemo(() => createV4(), []);
  return <CayleyTable group={group} {...props} />;
}

// Interactive demo wrapper
type GroupType = 'Zn' | 'Dn' | 'Sn' | 'An' | 'V4';

interface CayleyTableDemoProps {
  defaultGroup?: GroupType;
  defaultN?: number;
}

type DisplayMode = 'auto' | 'full' | 'compact' | 'indices';

export function CayleyTableDemo({ defaultGroup = 'Zn', defaultN = 4 }: CayleyTableDemoProps) {
  const [groupType, setGroupType] = useState<GroupType>(defaultGroup);
  const [n, setN] = useState(defaultN);
  const [showOrders, setShowOrders] = useState(false);
  const [colorByOrder, setColorByOrder] = useState(true);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('auto');

  // Check if group type needs n parameter
  const needsN = groupType !== 'V4';

  // Limit n based on group type to prevent huge tables
  const getMaxN = () => {
    switch (groupType) {
      case 'Sn': return 5; // S5 has 120 elements
      case 'An': return 5; // A5 has 60 elements
      case 'Dn': return 8;
      default: return 12;
    }
  };

  const getMinN = () => {
    switch (groupType) {
      case 'Dn': return 3;
      case 'An': return 3;
      default: return 1;
    }
  };

  const maxN = getMaxN();
  const minN = getMinN();

  // Calculate group size for display
  const getGroupSize = () => {
    switch (groupType) {
      case 'Zn': return n;
      case 'Dn': return 2 * n;
      case 'Sn': return factorial(n);
      case 'An': return factorial(n) / 2;
      case 'V4': return 4;
    }
  };

  const handleNChange = (newN: number) => {
    setN(Math.max(minN, Math.min(maxN, newN)));
  };

  const handleGroupChange = (newType: GroupType) => {
    setGroupType(newType);
    // Adjust n if needed based on new group type
    const newMinN = newType === 'Dn' || newType === 'An' ? 3 : 1;
    const newMaxN = newType === 'Sn' ? 5 : newType === 'An' ? 5 : newType === 'Dn' ? 8 : 12;
    if (n < newMinN) setN(newMinN);
    if (n > newMaxN) setN(newMaxN);
  };

  const getGroupDescription = () => {
    const size = getGroupSize();
    switch (groupType) {
      case 'Zn':
        return `Cyclic group of order ${size} under addition mod ${n}.`;
      case 'Dn':
        return `Dihedral group of order ${size} (symmetries of a regular ${n}-gon).`;
      case 'Sn':
        return `Symmetric group of order ${size} (all permutations of ${n} elements).`;
      case 'An':
        return `Alternating group of order ${size} (even permutations of ${n} elements).`;
      case 'V4':
        return `Klein four-group, order 4, isomorphic to Z₂ × Z₂.`;
    }
  };

  // Derive compact/useIndices from displayMode
  const compact = displayMode === 'compact' || displayMode === 'indices' ? true : displayMode === 'full' ? false : undefined;
  const useIndices = displayMode === 'indices' ? true : displayMode === 'auto' ? undefined : false;

  return (
    <div className="demo-container">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold">Cayley Table Explorer</h3>
        <span className="text-sm text-dark-400 bg-dark-800 px-2 py-1 rounded">
          Order: <span className="text-primary-400 font-mono">{getGroupSize()}</span>
        </span>
      </div>

      {/* Controls - Row 1: Group selection */}
      <div className="flex flex-wrap gap-4 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Group:</label>
          <select
            value={groupType}
            onChange={(e) => handleGroupChange(e.target.value as GroupType)}
            className="input w-28"
          >
            <optgroup label="Cyclic & Dihedral">
              <option value="Zn">Zₙ</option>
              <option value="Dn">Dₙ</option>
            </optgroup>
            <optgroup label="Permutation Groups">
              <option value="Sn">Sₙ</option>
              <option value="An">Aₙ</option>
            </optgroup>
            <optgroup label="Special Groups">
              <option value="V4">V₄ (Klein)</option>
            </optgroup>
          </select>
        </div>

        {needsN && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-400">n:</label>
            <input
              type="number"
              value={n}
              onChange={(e) => handleNChange(parseInt(e.target.value) || minN)}
              min={minN}
              max={maxN}
              className="input w-20"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Display:</label>
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
            className="input w-28"
          >
            <option value="auto">Auto</option>
            <option value="full">Full</option>
            <option value="compact">Compact</option>
            <option value="indices">Indices</option>
          </select>
        </div>
      </div>

      {/* Controls - Row 2: Options */}
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-dark-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showOrders}
            onChange={(e) => setShowOrders(e.target.checked)}
            className="rounded border-dark-600"
          />
          Show orders
        </label>

        <label className="flex items-center gap-2 text-sm text-dark-400 cursor-pointer">
          <input
            type="checkbox"
            checked={colorByOrder}
            onChange={(e) => setColorByOrder(e.target.checked)}
            className="rounded border-dark-600"
          />
          Color by order
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {groupType === 'Zn' && (
          <ZnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} compact={compact} useIndices={useIndices} />
        )}
        {groupType === 'Dn' && (
          <DnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} compact={compact} useIndices={useIndices} />
        )}
        {groupType === 'Sn' && (
          <SnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} compact={compact} useIndices={useIndices} />
        )}
        {groupType === 'An' && (
          <AnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} compact={compact} useIndices={useIndices} />
        )}
        {groupType === 'V4' && (
          <V4CayleyTable showOrders={showOrders} colorByOrder={colorByOrder} compact={compact} useIndices={useIndices} />
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-sm text-dark-400">
        <p>
          Click on any cell to see the operation. Hover over rows/columns to highlight.
          {' '}{getGroupDescription()}
        </p>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Compact polygon visualization for dihedral groups
interface PolygonSymmetryPreviewProps {
  n: number;
  element?: DihedralElement;
  size?: number;
}

// Vertex colors for tracking
const vertexColors = ['#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];

// Compute the permutation of vertices for a dihedral element
function computeDihedralPermutation(n: number, element: DihedralElement): number[] {
  // Start with identity [1, 2, 3, ..., n]
  const result = Array.from({ length: n }, (_, i) => i + 1);

  // Apply rotation: vertex i goes to position (i + rotation) mod n
  const rotated = result.map((_, i) => result[(i - element.rotation + n) % n]);

  if (!element.isReflection) {
    return rotated;
  }

  // Apply reflection: reverse the order (reflection across axis through vertex 1)
  // After rotation r^k, reflection s gives us: swap positions symmetrically
  const reflected = [...rotated];
  for (let i = 1; i < n; i++) {
    reflected[i] = rotated[n - i];
  }
  return reflected;
}

// Convert permutation to cycle notation
function permToCycleNotation(perm: number[]): string {
  const n = perm.length;
  const visited = new Array(n).fill(false);
  const cycles: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    const cycle: number[] = [];
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      cycle.push(j + 1);
      j = perm.indexOf(j + 1);
    }

    if (cycle.length > 1) {
      cycles.push(cycle);
    }
  }

  if (cycles.length === 0) return 'e';
  return cycles.map(c => `(${c.join(' ')})`).join('');
}

function PolygonSymmetryPreview({ n, element, size = 180 }: PolygonSymmetryPreviewProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const vertexRadius = size * 0.08;

  // Compute vertex positions for identity
  const getVertexPositions = (): [number, number][] => {
    const positions: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      // Start from top (-90 degrees) and go clockwise
      const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
      positions.push([
        center + radius * Math.cos(angle),
        center + radius * Math.sin(angle)
      ]);
    }
    return positions;
  };

  const identityPositions = getVertexPositions();

  // Compute current permutation and vertex labels
  const perm = element ? computeDihedralPermutation(n, element) : Array.from({ length: n }, (_, i) => i + 1);
  const cycleNotation = permToCycleNotation(perm);

  // Polygon points
  const polygonPoints = identityPositions.map(p => p.join(',')).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="bg-dark-950 rounded-lg">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius + 15}
          fill="none"
          stroke="rgba(99, 102, 241, 0.1)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Center point */}
        <circle cx={center} cy={center} r={3} fill="#6366f1" />

        {/* Polygon outline */}
        <polygon
          points={polygonPoints}
          fill="rgba(99, 102, 241, 0.1)"
          stroke="#6366f1"
          strokeWidth="2"
        />

        {/* Vertices with labels showing where each number went */}
        {identityPositions.map(([x, y], i) => {
          const label = perm[i]; // What vertex number is now at position i
          const color = vertexColors[(label - 1) % vertexColors.length];

          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r={vertexRadius}
                fill="#0f172a"
                stroke={color}
                strokeWidth="2"
                initial={false}
                animate={{ cx: x, cy: y }}
                transition={{ duration: 0.3 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={vertexRadius - 3}
                fill={color}
                initial={false}
                animate={{ cx: x, cy: y }}
                transition={{ duration: 0.3 }}
              />
              <motion.text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize={size * 0.07}
                fontWeight="bold"
                fontFamily="system-ui"
                initial={false}
                animate={{ x, y }}
                transition={{ duration: 0.3 }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}

        {/* Rotation indicator */}
        {element && element.rotation > 0 && !element.isReflection && (
          <text
            x={center}
            y={size - 10}
            textAnchor="middle"
            fill="#f97316"
            fontSize="10"
          >
            ↻ {(360 / n) * element.rotation}°
          </text>
        )}

        {/* Reflection indicator */}
        {element && element.isReflection && (
          <text
            x={center}
            y={size - 10}
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="10"
          >
            ↔ reflected
          </text>
        )}
      </svg>

      {/* Permutation display */}
      <div className="mt-2 text-center">
        <span className="font-mono text-sm text-emerald-400 font-semibold">
          {cycleNotation}
        </span>
      </div>
    </div>
  );
}

// Specialized demo for Section 3: Abelian groups
// Restricts to groups of order ≤ 8 and highlights non-commutative cells
type AbelianDemoGroupType = 'Zn' | 'Dn' | 'Sn' | 'V4';

interface AbelianCayleyTableDemoProps {
  defaultGroup?: AbelianDemoGroupType;
  defaultN?: number;
}

// Helper to check if a group is abelian and count non-commutative pairs
function checkAbelian<T>(group: Group<T>): { isAbelian: boolean; nonCommutativePairs: number } {
  let pairs = 0;
  const table = cayleyTable(group);
  for (let i = 0; i < group.elements.length; i++) {
    for (let j = i + 1; j < group.elements.length; j++) {
      const ab = group.toString(table[i][j].result);
      const ba = group.toString(table[j][i].result);
      if (ab !== ba) pairs++;
    }
  }
  return { isAbelian: pairs === 0, nonCommutativePairs: pairs };
}

// Inner component for each group type to avoid type issues
function AbelianZnTable({ n, highlightNonAbelian }: { n: number; highlightNonAbelian: boolean }) {
  const group = useMemo(() => createZn(n), [n]);
  return <CayleyTable group={group} highlightNonAbelian={highlightNonAbelian} colorByOrder={true} />;
}

function AbelianDnTable({
  n,
  highlightNonAbelian,
  onCellHover
}: {
  n: number;
  highlightNonAbelian: boolean;
  onCellHover?: (row: number, col: number, result: DihedralElement) => void;
}) {
  const group = useMemo(() => createDn(n), [n]);
  return (
    <CayleyTable
      group={group}
      highlightNonAbelian={highlightNonAbelian}
      colorByOrder={true}
      onCellHover={onCellHover}
    />
  );
}

function AbelianSnTable({ n, highlightNonAbelian }: { n: number; highlightNonAbelian: boolean }) {
  const group = useMemo(() => createSn(n), [n]);
  return <CayleyTable group={group} highlightNonAbelian={highlightNonAbelian} colorByOrder={true} />;
}

function AbelianV4Table({ highlightNonAbelian }: { highlightNonAbelian: boolean }) {
  const group = useMemo(() => createV4(), []);
  return <CayleyTable group={group} highlightNonAbelian={highlightNonAbelian} colorByOrder={true} />;
}

export function AbelianCayleyTableDemo({
  defaultGroup = 'Zn',
  defaultN = 4
}: AbelianCayleyTableDemoProps) {
  const [groupType, setGroupType] = useState<AbelianDemoGroupType>(defaultGroup);
  const [n, setN] = useState(defaultN);
  const [highlightNonAbelian, setHighlightNonAbelian] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<DihedralElement | null>(null);

  // Restricted limits for 8x8 max
  const getMaxN = () => {
    switch (groupType) {
      case 'Sn': return 3; // S3 has 6 elements
      case 'Dn': return 4; // D4 has 8 elements
      default: return 8;
    }
  };

  const getMinN = () => {
    switch (groupType) {
      case 'Dn': return 3;
      case 'Sn': return 2;
      default: return 2;
    }
  };

  const maxN = getMaxN();
  const minN = getMinN();
  const needsN = groupType !== 'V4';

  // Check if group is abelian and count non-commutative pairs
  const { isAbelian, nonCommutativePairs, groupSize } = useMemo(() => {
    switch (groupType) {
      case 'Zn': {
        const group = createZn(n);
        return { ...checkAbelian(group), groupSize: group.elements.length };
      }
      case 'Dn': {
        const group = createDn(n);
        return { ...checkAbelian(group), groupSize: group.elements.length };
      }
      case 'Sn': {
        const group = createSn(n);
        return { ...checkAbelian(group), groupSize: group.elements.length };
      }
      case 'V4': {
        const group = createV4();
        return { ...checkAbelian(group), groupSize: group.elements.length };
      }
    }
  }, [groupType, n]);

  const handleNChange = (newN: number) => {
    setN(Math.max(minN, Math.min(maxN, newN)));
  };

  const handleGroupChange = (newType: AbelianDemoGroupType) => {
    setGroupType(newType);
    const newMinN = newType === 'Dn' ? 3 : newType === 'Sn' ? 2 : 2;
    const newMaxN = newType === 'Sn' ? 3 : newType === 'Dn' ? 4 : 8;
    if (n < newMinN) setN(newMinN);
    if (n > newMaxN) setN(newMaxN);
  };

  const getGroupName = () => {
    switch (groupType) {
      case 'Zn': return `ℤ${n}`;
      case 'Dn': return `D${n}`;
      case 'Sn': return `S${n}`;
      case 'V4': return 'V₄';
    }
  };

  return (
    <div className="demo-container">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h4 className="text-lg font-semibold">Abelian vs Non-Abelian Groups</h4>
        <div className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
          isAbelian
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
        }`}>
          {isAbelian ? '✓ Abelian' : `✗ Non-Abelian (${nonCommutativePairs} pairs)`}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Group:</label>
          <select
            value={groupType}
            onChange={(e) => handleGroupChange(e.target.value as AbelianDemoGroupType)}
            className="input w-24"
          >
            <option value="Zn">Zₙ</option>
            <option value="Dn">Dₙ</option>
            <option value="Sn">Sₙ</option>
            <option value="V4">V₄</option>
          </select>
        </div>

        {needsN && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-400">n:</label>
            <input
              type="number"
              value={n}
              onChange={(e) => handleNChange(parseInt(e.target.value) || minN)}
              min={minN}
              max={maxN}
              className="input w-16"
            />
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-dark-400 cursor-pointer">
          <input
            type="checkbox"
            checked={highlightNonAbelian}
            onChange={(e) => setHighlightNonAbelian(e.target.checked)}
            className="rounded border-dark-600"
          />
          Highlight ab ≠ ba
        </label>
      </div>

      {/* Legend for non-abelian highlighting */}
      {highlightNonAbelian && !isAbelian && (
        <div className="mb-4 p-3 bg-dark-800/50 rounded-lg flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded ring-2 ring-orange-500 bg-orange-500/20"></span>
            <span className="text-dark-300">Cells where ab ≠ ba</span>
          </span>
          <span className="text-dark-500">
            These pairs prove the group is non-abelian
          </span>
        </div>
      )}

      {/* Main content: Table + optional geometric preview */}
      <div className={`flex flex-col ${groupType === 'Dn' ? 'lg:flex-row' : ''} gap-6`}>
        {/* Table - use separate components to avoid type issues */}
        <div className="flex-1 overflow-x-auto">
          {groupType === 'Zn' && <AbelianZnTable n={n} highlightNonAbelian={highlightNonAbelian} />}
          {groupType === 'Dn' && (
            <AbelianDnTable
              n={n}
              highlightNonAbelian={highlightNonAbelian}
              onCellHover={(_, __, result) => setHoveredElement(result)}
            />
          )}
          {groupType === 'Sn' && <AbelianSnTable n={n} highlightNonAbelian={highlightNonAbelian} />}
          {groupType === 'V4' && <AbelianV4Table highlightNonAbelian={highlightNonAbelian} />}
        </div>

        {/* Geometric preview for Dn */}
        {groupType === 'Dn' && (
          <div className="lg:w-64 flex-shrink-0">
            <div className="p-4 bg-dark-800/50 rounded-lg">
              <h5 className="text-sm font-semibold text-dark-300 mb-3 text-center">
                Symmetry on {n}-gon
              </h5>
              <PolygonSymmetryPreview
                n={n}
                element={hoveredElement ?? { rotation: 0, isReflection: false }}
                size={200}
              />
              <p className="text-xs text-dark-500 mt-3 text-center">
                Hover over table cells to see the transformation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-sm text-dark-400">
        <p>
          <strong>{getGroupName()}</strong> has order {groupSize}.
          {isAbelian
            ? ' The table is symmetric across the diagonal — every pair commutes.'
            : ` The orange cells show ${nonCommutativePairs} pairs where ab ≠ ba.`}
        </p>
      </div>
    </div>
  );
}
