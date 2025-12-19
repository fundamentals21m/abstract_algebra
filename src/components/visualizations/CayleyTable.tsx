import { useState, useMemo } from 'react';
import type { Group } from '../../lib/types/algebra';
import { cayleyTable, elementOrder } from '../../lib/algebra/groups';

interface CayleyTableProps<T> {
  group: Group<T>;
  showOrders?: boolean;
  highlightIdentity?: boolean;
  colorByOrder?: boolean;
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

export function CayleyTable<T>({
  group,
  showOrders = false,
  highlightIdentity = true,
  colorByOrder = false,
}: CayleyTableProps<T>) {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [highlightedCol, setHighlightedCol] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Compute Cayley table
  const table = useMemo(() => cayleyTable(group), [group]);

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

  const isIdentity = (element: T): boolean => {
    return group.equals(element, group.identity);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="cayley-table text-sm">
        <thead>
          <tr>
            <th className="bg-dark-900 text-primary-400">∗</th>
            {group.elements.map((elem, j) => (
              <th
                key={j}
                className={`cursor-pointer transition-colors ${
                  highlightedCol === j ? 'bg-primary-900/40' : ''
                } ${getOrderColor(elem)}`}
                onMouseEnter={() => setHighlightedCol(j)}
                onMouseLeave={() => setHighlightedCol(null)}
              >
                {group.toString(elem)}
                {showOrders && orders && (
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
                className={`cursor-pointer transition-colors ${
                  highlightedRow === i ? 'bg-primary-900/40' : ''
                } ${getOrderColor(group.elements[i])}`}
                onMouseEnter={() => setHighlightedRow(i)}
                onMouseLeave={() => setHighlightedRow(null)}
              >
                {group.toString(group.elements[i])}
                {showOrders && orders && (
                  <span className="text-xs text-dark-500 ml-1">
                    ({orders.get(group.toString(group.elements[i]))})
                  </span>
                )}
              </th>
              {row.map((cell, j) => {
                const isHighlighted = highlightedRow === i || highlightedCol === j;
                const isSelected = selectedCell?.row === i && selectedCell?.col === j;
                const isIdentityCell = highlightIdentity && isIdentity(cell.result);

                return (
                  <td
                    key={j}
                    className={`cursor-pointer transition-all ${
                      isHighlighted ? 'bg-primary-900/30' : ''
                    } ${isSelected ? 'bg-primary-700/50 ring-2 ring-primary-500' : ''} ${
                      isIdentityCell ? 'text-green-400 font-semibold' : getOrderColor(cell.result)
                    }`}
                    onMouseEnter={() => {
                      setHighlightedRow(i);
                      setHighlightedCol(j);
                    }}
                    onMouseLeave={() => {
                      setHighlightedRow(null);
                      setHighlightedCol(null);
                    }}
                    onClick={() => handleCellClick(i, j)}
                  >
                    {group.toString(cell.result)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected cell info */}
      {selectedCell && (
        <div className="mt-4 p-4 bg-dark-800 rounded-lg">
          <p className="text-dark-200">
            <span className="text-primary-400 font-mono">
              {group.toString(group.elements[selectedCell.row])}
            </span>
            <span className="text-dark-400 mx-2">∗</span>
            <span className="text-primary-400 font-mono">
              {group.toString(group.elements[selectedCell.col])}
            </span>
            <span className="text-dark-400 mx-2">=</span>
            <span className="text-green-400 font-mono font-semibold">
              {group.toString(table[selectedCell.row][selectedCell.col].result)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// Preset components for common groups
interface PresetCayleyTableProps {
  showOrders?: boolean;
  colorByOrder?: boolean;
}

import { createZn, createDn } from '../../lib/algebra/groups';
import { createSn } from '../../lib/algebra/permutations';

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

// Interactive demo wrapper
interface CayleyTableDemoProps {
  defaultGroup?: 'Zn' | 'Dn' | 'Sn';
  defaultN?: number;
}

export function CayleyTableDemo({ defaultGroup = 'Zn', defaultN = 4 }: CayleyTableDemoProps) {
  const [groupType, setGroupType] = useState<'Zn' | 'Dn' | 'Sn'>(defaultGroup);
  const [n, setN] = useState(defaultN);
  const [showOrders, setShowOrders] = useState(false);
  const [colorByOrder, setColorByOrder] = useState(true);

  // Limit n based on group type to prevent huge tables
  const maxN = groupType === 'Sn' ? 4 : groupType === 'Dn' ? 6 : 12;
  const minN = groupType === 'Dn' ? 3 : 1;

  const handleNChange = (newN: number) => {
    setN(Math.max(minN, Math.min(maxN, newN)));
  };

  return (
    <div className="demo-container">
      <h3 className="text-xl font-semibold mb-4">Cayley Table Explorer</h3>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Group:</label>
          <select
            value={groupType}
            onChange={(e) => {
              const newType = e.target.value as 'Zn' | 'Dn' | 'Sn';
              setGroupType(newType);
              // Adjust n if needed
              if (newType === 'Dn' && n < 3) setN(3);
              if (newType === 'Sn' && n > 4) setN(4);
            }}
            className="input w-24"
          >
            <option value="Zn">Zₙ</option>
            <option value="Dn">Dₙ</option>
            <option value="Sn">Sₙ</option>
          </select>
        </div>

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
          <ZnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} />
        )}
        {groupType === 'Dn' && (
          <DnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} />
        )}
        {groupType === 'Sn' && (
          <SnCayleyTable n={n} showOrders={showOrders} colorByOrder={colorByOrder} />
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-sm text-dark-400">
        <p>
          Click on any cell to see the operation. Hover over rows/columns to highlight.
          {groupType === 'Zn' && ` This is the cyclic group of order ${n} under addition mod ${n}.`}
          {groupType === 'Dn' && ` This is the dihedral group of order ${2 * n} (symmetries of a regular ${n}-gon).`}
          {groupType === 'Sn' && ` This is the symmetric group of order ${factorial(n)} (all permutations of ${n} elements).`}
        </p>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
