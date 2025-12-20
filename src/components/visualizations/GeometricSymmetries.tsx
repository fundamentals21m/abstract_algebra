import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ShapeType = 'triangle' | 'rectangle' | 'square';

interface SymmetryInfo {
  name: string;
  group: string;
  order: number;
  rotations: { angle: number; label: string }[];
  reflectionAxes: { x1: number; y1: number; x2: number; y2: number; label: string }[];
  description: string;
}

const shapeInfo: Record<ShapeType, SymmetryInfo> = {
  triangle: {
    name: 'Equilateral Triangle',
    group: 'D₃',
    order: 6,
    rotations: [
      { angle: 0, label: 'e (0°)' },
      { angle: 120, label: 'r (120°)' },
      { angle: 240, label: 'r² (240°)' },
    ],
    reflectionAxes: [
      { x1: 150, y1: 50, x2: 150, y2: 250, label: 's₁' },
      { x1: 63, y1: 200, x2: 237, y2: 100, label: 's₂' },
      { x1: 237, y1: 200, x2: 63, y2: 100, label: 's₃' },
    ],
    description: 'The equilateral triangle has 3 rotational symmetries (by 0°, 120°, 240°) and 3 reflection symmetries (through each vertex to the opposite side midpoint).',
  },
  rectangle: {
    name: 'Rectangle',
    group: 'D₂ ≅ V₄',
    order: 4,
    rotations: [
      { angle: 0, label: 'e (0°)' },
      { angle: 180, label: 'r (180°)' },
    ],
    reflectionAxes: [
      { x1: 150, y1: 50, x2: 150, y2: 250, label: 's₁ (vertical)' },
      { x1: 50, y1: 150, x2: 250, y2: 150, label: 's₂ (horizontal)' },
    ],
    description: 'A non-square rectangle has only 2 rotational symmetries (0° and 180°) and 2 reflection symmetries (horizontal and vertical axes). This gives D₂, which is isomorphic to the Klein 4-group V₄.',
  },
  square: {
    name: 'Square',
    group: 'D₄',
    order: 8,
    rotations: [
      { angle: 0, label: 'e (0°)' },
      { angle: 90, label: 'r (90°)' },
      { angle: 180, label: 'r² (180°)' },
      { angle: 270, label: 'r³ (270°)' },
    ],
    reflectionAxes: [
      { x1: 150, y1: 50, x2: 150, y2: 250, label: 's₁' },
      { x1: 50, y1: 150, x2: 250, y2: 150, label: 's₂' },
      { x1: 65, y1: 65, x2: 235, y2: 235, label: 's₃' },
      { x1: 235, y1: 65, x2: 65, y2: 235, label: 's₄' },
    ],
    description: 'The square has 4 rotational symmetries (by 0°, 90°, 180°, 270°) and 4 reflection symmetries (2 through midpoints of opposite sides, 2 through opposite corners).',
  },
};

interface ShapeProps {
  rotation: number;
  reflectionAxisIndex: number | null; // null = no reflection, 0-3 = which axis
  showAxes: boolean;
  shape: ShapeType;
}

// Reflect a point across a line through origin at given angle
function reflectPoint(x: number, y: number, axisAngle: number): [number, number] {
  const cos2 = Math.cos(2 * axisAngle);
  const sin2 = Math.sin(2 * axisAngle);
  return [
    x * cos2 + y * sin2,
    x * sin2 - y * cos2
  ];
}

function Shape({ rotation, reflectionAxisIndex, showAxes, shape }: ShapeProps) {
  const size = 300;
  const center = size / 2;

  // Vertex colors for tracking
  const colors = ['#ef4444', '#22c55e', '#3b82f6', '#eab308'];

  // Get reflection axis angle based on shape and axis index
  const getReflectionAxisAngle = (axisIndex: number): number => {
    if (shape === 'triangle') {
      // Triangle: axes through each vertex (at -90°, 30°, 150° from horizontal)
      // Axis 0: vertical (through top vertex) = 90° = π/2
      // Axis 1: through bottom-right vertex = -30° = -π/6
      // Axis 2: through bottom-left vertex = 210° = 7π/6 or -150° = -5π/6
      const angles = [Math.PI / 2, -Math.PI / 6, -5 * Math.PI / 6];
      return angles[axisIndex];
    } else if (shape === 'rectangle') {
      // Rectangle: vertical and horizontal axes
      // Axis 0: vertical = 90° = π/2
      // Axis 1: horizontal = 0°
      const angles = [Math.PI / 2, 0];
      return angles[axisIndex];
    } else {
      // Square: vertical, horizontal, and two diagonals
      // Axis 0: vertical = π/2
      // Axis 1: horizontal = 0
      // Axis 2: diagonal (top-left to bottom-right) = π/4 in SVG coords (y down)
      // Axis 3: diagonal (top-right to bottom-left) = -π/4 in SVG coords
      const angles = [Math.PI / 2, 0, Math.PI / 4, -Math.PI / 4];
      return angles[axisIndex];
    }
  };

  const getTriangleVertices = (rot: number, reflAxisIdx: number | null): [number, number][] => {
    const radius = 80;
    const points: [number, number][] = [];

    for (let i = 0; i < 3; i++) {
      const angle = (-90 + rot + i * 120) * (Math.PI / 180);
      let x = radius * Math.cos(angle);
      let y = radius * Math.sin(angle);

      if (reflAxisIdx !== null) {
        const axisAngle = getReflectionAxisAngle(reflAxisIdx);
        [x, y] = reflectPoint(x, y, axisAngle);
      }

      points.push([center + x, center + y]);
    }
    return points;
  };

  const getRectangleVertices = (rot: number, reflAxisIdx: number | null): [number, number][] => {
    const width = 100;
    const height = 60;
    const corners: [number, number][] = [
      [-width, -height],
      [width, -height],
      [width, height],
      [-width, height],
    ];

    const rotRad = rot * (Math.PI / 180);
    return corners.map(([cx, cy]) => {
      // Apply rotation first
      let x = cx * Math.cos(rotRad) - cy * Math.sin(rotRad);
      let y = cx * Math.sin(rotRad) + cy * Math.cos(rotRad);

      // Then apply reflection if needed
      if (reflAxisIdx !== null) {
        const axisAngle = getReflectionAxisAngle(reflAxisIdx);
        [x, y] = reflectPoint(x, y, axisAngle);
      }

      return [center + x, center + y] as [number, number];
    });
  };

  const getSquareVertices = (rot: number, reflAxisIdx: number | null): [number, number][] => {
    const side = 70;
    const corners: [number, number][] = [
      [-side, -side],
      [side, -side],
      [side, side],
      [-side, side],
    ];

    const rotRad = rot * (Math.PI / 180);
    return corners.map(([cx, cy]) => {
      // Apply rotation first
      let x = cx * Math.cos(rotRad) - cy * Math.sin(rotRad);
      let y = cx * Math.sin(rotRad) + cy * Math.cos(rotRad);

      // Then apply reflection if needed
      if (reflAxisIdx !== null) {
        const axisAngle = getReflectionAxisAngle(reflAxisIdx);
        [x, y] = reflectPoint(x, y, axisAngle);
      }

      return [center + x, center + y] as [number, number];
    });
  };

  const info = shapeInfo[shape];

  let vertices: [number, number][];

  if (shape === 'triangle') {
    vertices = getTriangleVertices(rotation, reflectionAxisIndex);
  } else if (shape === 'rectangle') {
    vertices = getRectangleVertices(rotation, reflectionAxisIndex);
  } else {
    vertices = getSquareVertices(rotation, reflectionAxisIndex);
  }

  const points = vertices.map(p => p.join(',')).join(' ');

  return (
    <svg width={size} height={size} className="bg-dark-950 rounded-xl">
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={120}
        fill="none"
        stroke="rgba(99, 102, 241, 0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Symmetry axes */}
      {showAxes && info.reflectionAxes.map((axis, i) => {
        const isActive = reflectionAxisIndex === i;
        return (
          <g key={i}>
            <line
              x1={axis.x1}
              y1={axis.y1}
              x2={axis.x2}
              y2={axis.y2}
              stroke={isActive ? "#22d3ee" : "rgba(34, 211, 238, 0.3)"}
              strokeWidth={isActive ? 3 : 2}
              strokeDasharray={isActive ? "none" : "6 4"}
            />
            <text
              x={(axis.x1 + axis.x2) / 2 + 15}
              y={(axis.y1 + axis.y2) / 2}
              fill={isActive ? "#22d3ee" : "rgba(34, 211, 238, 0.6)"}
              fontSize="11"
              fontWeight={isActive ? "700" : "500"}
            >
              {axis.label.split(' ')[0]}
            </text>
          </g>
        );
      })}

      {/* Center point */}
      <circle cx={center} cy={center} r={4} fill="#6366f1" />

      {/* Rotation indicator arc */}
      {rotation > 0 && (
        <path
          d={`M ${center + 30} ${center} A 30 30 0 ${rotation > 180 ? 1 : 0} 1 ${center + 30 * Math.cos(-rotation * Math.PI / 180)} ${center - 30 * Math.sin(-rotation * Math.PI / 180)}`}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      )}

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
          <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
        </marker>
      </defs>

      {/* The shape */}
      <motion.polygon
        points={points}
        fill="rgba(99, 102, 241, 0.15)"
        stroke="#6366f1"
        strokeWidth="2.5"
        initial={false}
        animate={{ points }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />

      {/* Vertices with number labels */}
      {vertices.map(([x, y], i) => (
        <g key={i}>
          {/* Outer dark background circle */}
          <motion.circle
            r={20}
            fill="#0f172a"
            stroke={colors[i % colors.length]}
            strokeWidth="3"
            initial={false}
            animate={{ cx: x, cy: y }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          {/* Inner colored circle */}
          <motion.circle
            r={16}
            fill={colors[i % colors.length]}
            initial={false}
            animate={{ cx: x, cy: y }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          {/* Vertex number label */}
          <motion.text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize="16"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            initial={false}
            animate={{ x, y }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {i + 1}
          </motion.text>
        </g>
      ))}

      {/* Reflection indicator */}
      {reflectionAxisIndex !== null && (
        <text x={center} y={280} textAnchor="middle" fill="#22d3ee" fontSize="12">
          Reflected across {info.reflectionAxes[reflectionAxisIndex]?.label.split(' ')[0]}
        </text>
      )}
    </svg>
  );
}

interface GeometricSymmetriesProps {
  initialShape?: ShapeType;
}

// Compute the permutation for a given rotation and reflection
function computePermutation(
  shape: ShapeType,
  rotation: number,
  reflectionAxisIndex: number | null
): number[] {
  const n = shape === 'triangle' ? 3 : 4;
  const rotationStep = shape === 'triangle' ? 120 : 90;

  // Start with identity permutation [1, 2, 3, ...] (1-indexed for display)
  const perm = Array.from({ length: n }, (_, i) => i + 1);

  // Apply rotation: rotate by (rotation / rotationStep) positions
  const rotSteps = Math.round(rotation / rotationStep) % n;
  const rotated = perm.map((_, i) => perm[(i - rotSteps + n) % n]);

  if (reflectionAxisIndex === null) {
    return rotated;
  }

  // Apply reflection based on shape and axis
  if (shape === 'triangle') {
    // Triangle reflections: axis i fixes vertex i+1, swaps the other two
    // Axis 0 (vertical): fixes 1, swaps 2↔3
    // Axis 1: fixes 2, swaps 1↔3
    // Axis 2: fixes 3, swaps 1↔2
    const result = [...rotated];
    if (reflectionAxisIndex === 0) {
      // Swap positions that end up at 2 and 3
      [result[1], result[2]] = [result[2], result[1]];
    } else if (reflectionAxisIndex === 1) {
      // Swap positions 0 and 2
      [result[0], result[2]] = [result[2], result[0]];
    } else {
      // Swap positions 0 and 1
      [result[0], result[1]] = [result[1], result[0]];
    }
    return result;
  } else if (shape === 'rectangle') {
    // Rectangle reflections:
    // Axis 0 (vertical): swaps 1↔2, 3↔4
    // Axis 1 (horizontal): swaps 1↔4, 2↔3
    const result = [...rotated];
    if (reflectionAxisIndex === 0) {
      [result[0], result[1]] = [result[1], result[0]];
      [result[2], result[3]] = [result[3], result[2]];
    } else {
      [result[0], result[3]] = [result[3], result[0]];
      [result[1], result[2]] = [result[2], result[1]];
    }
    return result;
  } else {
    // Square reflections:
    // Axis 0 (vertical): swaps 1↔2, 4↔3
    // Axis 1 (horizontal): swaps 1↔4, 2↔3
    // Axis 2 (diagonal TL-BR, y=x): swaps 2↔4, fixes 1,3
    // Axis 3 (diagonal TR-BL, y=-x): swaps 1↔3, fixes 2,4
    const result = [...rotated];
    if (reflectionAxisIndex === 0) {
      // Vertical axis: left↔right
      [result[0], result[1]] = [result[1], result[0]];
      [result[2], result[3]] = [result[3], result[2]];
    } else if (reflectionAxisIndex === 1) {
      // Horizontal axis: top↔bottom
      [result[0], result[3]] = [result[3], result[0]];
      [result[1], result[2]] = [result[2], result[1]];
    } else if (reflectionAxisIndex === 2) {
      // Main diagonal (TL-BR): swaps 2↔4
      [result[1], result[3]] = [result[3], result[1]];
    } else {
      // Anti-diagonal (TR-BL): swaps 1↔3
      [result[0], result[2]] = [result[2], result[0]];
    }
    return result;
  }
}

// Convert permutation array to cycle notation string
function toCycleNotation(perm: number[]): string {
  const n = perm.length;
  const visited = new Array(n).fill(false);
  const cycles: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    const cycle: number[] = [];
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      cycle.push(j + 1); // 1-indexed
      // Find where j+1 went: perm[j] is what's now at position j
      // We need: where did original position j+1 go?
      j = perm.indexOf(j + 1);
    }

    if (cycle.length > 1) {
      cycles.push(cycle);
    }
  }

  if (cycles.length === 0) {
    return 'e (identity)';
  }

  return cycles.map(c => `(${c.join(' ')})`).join('');
}

// Get two-line notation for permutation
function toTwoLineNotation(perm: number[]): { top: number[]; bottom: number[] } {
  const n = perm.length;
  return {
    top: Array.from({ length: n }, (_, i) => i + 1),
    bottom: perm
  };
}

export function GeometricSymmetries({ initialShape = 'triangle' }: GeometricSymmetriesProps) {
  const [selectedShape, setSelectedShape] = useState<ShapeType>(initialShape);
  const [rotation, setRotation] = useState(0);
  const [reflectionAxisIndex, setReflectionAxisIndex] = useState<number | null>(null);
  const [showAxes, setShowAxes] = useState(true);

  const info = shapeInfo[selectedShape];

  // Compute current permutation
  const currentPerm = computePermutation(selectedShape, rotation, reflectionAxisIndex);
  const cycleNotation = toCycleNotation(currentPerm);
  const twoLine = toTwoLineNotation(currentPerm);

  const handleShapeChange = useCallback((shape: ShapeType) => {
    setSelectedShape(shape);
    setRotation(0);
    setReflectionAxisIndex(null);
  }, []);

  const applyRotation = useCallback((angle: number) => {
    setRotation(angle);
    setReflectionAxisIndex(null);
  }, []);

  const applyReflection = useCallback((axisIndex: number) => {
    setRotation(0); // Reset rotation when applying reflection
    setReflectionAxisIndex(axisIndex);
  }, []);

  const reset = useCallback(() => {
    setRotation(0);
    setReflectionAxisIndex(null);
  }, []);

  return (
    <div className="demo-container">
      <h3 className="text-xl font-semibold mb-2">Symmetries of Common Shapes</h3>
      <p className="text-dark-400 text-sm mb-6">
        Explore how different shapes have different symmetry groups based on their geometry.
      </p>

      {/* Shape selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['triangle', 'rectangle', 'square'] as ShapeType[]).map((shape) => (
          <button
            key={shape}
            onClick={() => handleShapeChange(shape)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              selectedShape === shape
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
            }`}
          >
            {shapeInfo[shape].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="flex flex-col items-center">
          <Shape
            rotation={rotation}
            reflectionAxisIndex={reflectionAxisIndex}
            showAxes={showAxes}
            shape={selectedShape}
          />

          {/* Permutation Display */}
          <div className="mt-4 p-4 bg-dark-900/70 rounded-xl border border-dark-700/50 w-full max-w-[300px]">
            <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wide mb-3">
              Permutation
            </h4>

            {/* Two-line notation */}
            <div className="font-mono text-center mb-3">
              <div className="inline-block border border-dark-600 rounded-lg overflow-hidden">
                <div className="flex border-b border-dark-600 bg-dark-800/50">
                  {twoLine.top.map((v, i) => (
                    <div key={i} className="w-8 py-1.5 text-dark-300 border-r border-dark-600 last:border-r-0">
                      {v}
                    </div>
                  ))}
                </div>
                <div className="flex bg-dark-900/50">
                  {twoLine.bottom.map((v, i) => (
                    <div key={i} className="w-8 py-1.5 text-primary-400 font-semibold border-r border-dark-600 last:border-r-0">
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cycle notation */}
            <div className="text-center">
              <span className="text-xs text-dark-500 mr-2">Cycle:</span>
              <span className="font-mono text-lg text-emerald-400 font-semibold">
                {cycleNotation}
              </span>
            </div>
          </div>

          {/* Toggle axes */}
          <label className="flex items-center gap-2 mt-4 text-sm text-dark-400 cursor-pointer">
            <input
              type="checkbox"
              checked={showAxes}
              onChange={(e) => setShowAxes(e.target.checked)}
              className="rounded bg-dark-800 border-dark-600 text-primary-500 focus:ring-primary-500"
            />
            Show symmetry axes
          </label>
        </div>

        {/* Controls and info */}
        <div className="space-y-5">
          {/* Shape info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedShape}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-gradient-to-br from-primary-500/10 to-dark-800 rounded-xl border border-primary-500/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-gradient">{info.group}</span>
                <span className="text-dark-400">|</span>
                <span className="text-dark-300">Order: <strong className="text-primary-400">{info.order}</strong></span>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed">{info.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Rotations */}
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500"></span>
              Rotations ({info.rotations.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {info.rotations.map((rot) => (
                <button
                  key={rot.angle}
                  onClick={() => applyRotation(rot.angle)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    rotation === rot.angle && reflectionAxisIndex === null
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-dark-200 border border-dark-700'
                  }`}
                >
                  {rot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reflections */}
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500/30 border border-cyan-500"></span>
              Reflections ({info.reflectionAxes.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {info.reflectionAxes.map((axis, i) => (
                <button
                  key={i}
                  onClick={() => applyReflection(i)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    reflectionAxisIndex === i
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-dark-200 border border-dark-700'
                  }`}
                >
                  {axis.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="btn-ghost text-sm"
          >
            Reset to identity
          </button>

          {/* Group structure summary */}
          <div className="p-4 bg-dark-900/50 rounded-xl text-sm">
            <h4 className="font-semibold text-dark-200 mb-2">Group Structure</h4>
            <div className="space-y-1 text-dark-400">
              <p><span className="text-dark-300">Elements:</span> {info.order}</p>
              <p><span className="text-dark-300">Rotations:</span> {info.rotations.length}</p>
              <p><span className="text-dark-300">Reflections:</span> {info.reflectionAxes.length}</p>
              {selectedShape === 'rectangle' && (
                <p className="text-amber-400/80 mt-2 text-xs">
                  Note: D₂ is abelian! All elements commute.
                </p>
              )}
              {selectedShape === 'triangle' && (
                <p className="text-amber-400/80 mt-2 text-xs">
                  D₃ ≅ S₃ (isomorphic to the symmetric group on 3 elements)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-8 overflow-x-auto">
        <h4 className="font-semibold text-dark-200 mb-3">Quick Comparison</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left py-2 px-3 text-dark-400 font-medium">Shape</th>
              <th className="text-center py-2 px-3 text-dark-400 font-medium">Group</th>
              <th className="text-center py-2 px-3 text-dark-400 font-medium">Order</th>
              <th className="text-center py-2 px-3 text-dark-400 font-medium">Rotations</th>
              <th className="text-center py-2 px-3 text-dark-400 font-medium">Reflections</th>
              <th className="text-center py-2 px-3 text-dark-400 font-medium">Abelian?</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b border-dark-800 ${selectedShape === 'triangle' ? 'bg-primary-500/5' : ''}`}>
              <td className="py-2 px-3 text-dark-200">Equilateral Triangle</td>
              <td className="text-center py-2 px-3 font-mono text-primary-400">D₃</td>
              <td className="text-center py-2 px-3">6</td>
              <td className="text-center py-2 px-3">3</td>
              <td className="text-center py-2 px-3">3</td>
              <td className="text-center py-2 px-3 text-red-400">No</td>
            </tr>
            <tr className={`border-b border-dark-800 ${selectedShape === 'rectangle' ? 'bg-primary-500/5' : ''}`}>
              <td className="py-2 px-3 text-dark-200">Rectangle</td>
              <td className="text-center py-2 px-3 font-mono text-primary-400">D₂ ≅ V₄</td>
              <td className="text-center py-2 px-3">4</td>
              <td className="text-center py-2 px-3">2</td>
              <td className="text-center py-2 px-3">2</td>
              <td className="text-center py-2 px-3 text-emerald-400">Yes</td>
            </tr>
            <tr className={`border-b border-dark-800 ${selectedShape === 'square' ? 'bg-primary-500/5' : ''}`}>
              <td className="py-2 px-3 text-dark-200">Square</td>
              <td className="text-center py-2 px-3 font-mono text-primary-400">D₄</td>
              <td className="text-center py-2 px-3">8</td>
              <td className="text-center py-2 px-3">4</td>
              <td className="text-center py-2 px-3">4</td>
              <td className="text-center py-2 px-3 text-red-400">No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GeometricSymmetries;
