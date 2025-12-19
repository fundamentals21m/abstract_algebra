import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { DihedralElement } from '../../lib/types/algebra';
import { createDn } from '../../lib/algebra/groups';

interface SymmetryAnimationProps {
  n: number;
  size?: number;
  showLabels?: boolean;
  showAxes?: boolean;
}

interface Point {
  x: number;
  y: number;
}

export function SymmetryAnimation({
  n,
  size = 300,
  showLabels = true,
  showAxes = true,
}: SymmetryAnimationProps) {
  const [currentElement, setCurrentElement] = useState<DihedralElement>({
    rotation: 0,
    isReflection: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const group = useMemo(() => createDn(n), [n]);

  // Calculate polygon vertices
  const getVertices = (rotation: number, isReflection: boolean): Point[] => {
    const vertices: Point[] = [];
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    const baseAngle = -Math.PI / 2; // Start from top

    for (let i = 0; i < n; i++) {
      let angle = baseAngle + (2 * Math.PI * i) / n;

      // Apply rotation
      angle += (rotation * 2 * Math.PI) / n;

      // Apply reflection if needed (reflect across vertical axis)
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);

      if (isReflection) {
        x = size - x; // Reflect across center vertical
      }

      vertices.push({ x, y });
    }

    return vertices;
  };

  // Draw the polygon and decorations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 0.4, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw axes if enabled
    if (showAxes) {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Vertical axis
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size * 0.45);
      ctx.lineTo(centerX, centerY + size * 0.45);
      ctx.stroke();

      // Horizontal axis
      ctx.beginPath();
      ctx.moveTo(centerX - size * 0.45, centerY);
      ctx.lineTo(centerX + size * 0.45, centerY);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Draw center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#6366f1';
    ctx.fill();

  }, [size, n, showAxes]);

  // Apply a transformation
  const applyTransformation = (element: DihedralElement) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newElement = group.operation(currentElement, element);

    // Animate to new state
    setTimeout(() => {
      setCurrentElement(newElement);
      setIsAnimating(false);
    }, 300);
  };

  const resetToIdentity = () => {
    setCurrentElement({ rotation: 0, isReflection: false });
  };

  const vertices = getVertices(currentElement.rotation, currentElement.isReflection);

  // Vertex colors - first vertex is special
  const vertexColors = [
    '#ef4444', // red - vertex 0
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ];

  return (
    <div className="demo-container">
      <h3 className="text-xl font-semibold mb-4">
        Symmetries of a Regular {n}-gon (D<sub>{n}</sub>)
      </h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Canvas area */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className="bg-dark-950 rounded-lg"
          />

          {/* Animated polygon overlay */}
          <svg
            width={size}
            height={size}
            className="absolute top-0 left-0"
            style={{ pointerEvents: 'none' }}
          >
            {/* Polygon edges */}
            <motion.polygon
              points={vertices.map((v) => `${v.x},${v.y}`).join(' ')}
              fill="rgba(99, 102, 241, 0.1)"
              stroke="#6366f1"
              strokeWidth="2"
              initial={false}
              animate={{
                points: vertices.map((v) => `${v.x},${v.y}`).join(' '),
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Vertices */}
            {vertices.map((v, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={v.x}
                  cy={v.y}
                  r={i === 0 ? 10 : 6}
                  fill={vertexColors[i % vertexColors.length]}
                  initial={false}
                  animate={{ cx: v.x, cy: v.y }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                {showLabels && (
                  <motion.text
                    x={v.x}
                    y={v.y}
                    dy={i === 0 ? -15 : -10}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="12"
                    initial={false}
                    animate={{ x: v.x, y: v.y }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {i}
                  </motion.text>
                )}
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-4">
          {/* Current state */}
          <div className="p-4 bg-dark-800 rounded-lg">
            <p className="text-sm text-dark-400 mb-1">Current transformation:</p>
            <p className="text-2xl font-mono text-primary-400">
              {group.toString(currentElement)}
            </p>
            <p className="text-sm text-dark-400 mt-2">
              {currentElement.isReflection
                ? `Reflection${currentElement.rotation > 0 ? ` composed with ${currentElement.rotation} rotation(s)` : ''}`
                : currentElement.rotation === 0
                ? 'Identity (no transformation)'
                : `Rotation by ${(currentElement.rotation * 360) / n}°`}
            </p>
          </div>

          {/* Transformation buttons */}
          <div className="space-y-2">
            <p className="text-sm text-dark-400">Apply transformation:</p>

            <div className="flex flex-wrap gap-2">
              {/* Rotation */}
              <button
                onClick={() => applyTransformation({ rotation: 1, isReflection: false })}
                disabled={isAnimating}
                className="btn-secondary"
              >
                r (rotate {360 / n}°)
              </button>

              <button
                onClick={() => applyTransformation({ rotation: n - 1, isReflection: false })}
                disabled={isAnimating}
                className="btn-secondary"
              >
                r⁻¹ (rotate -{360 / n}°)
              </button>

              {/* Reflection */}
              <button
                onClick={() => applyTransformation({ rotation: 0, isReflection: true })}
                disabled={isAnimating}
                className="btn-secondary"
              >
                s (reflect)
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {/* All rotations */}
              {Array.from({ length: n }, (_, k) => (
                <button
                  key={k}
                  onClick={() => applyTransformation({ rotation: k, isReflection: false })}
                  disabled={isAnimating}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    currentElement.rotation === k && !currentElement.isReflection
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }`}
                >
                  {k === 0 ? 'e' : k === 1 ? 'r' : `r^${k}`}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {/* All reflections */}
              {Array.from({ length: n }, (_, k) => (
                <button
                  key={k}
                  onClick={() => applyTransformation({ rotation: k, isReflection: true })}
                  disabled={isAnimating}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    currentElement.rotation === k && currentElement.isReflection
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }`}
                >
                  {k === 0 ? 's' : k === 1 ? 'sr' : `sr^${k}`}
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <button onClick={resetToIdentity} className="btn-ghost">
            Reset to identity
          </button>

          {/* Info */}
          <div className="text-sm text-dark-400 space-y-1">
            <p>
              <strong>Order of D<sub>{n}</sub>:</strong> {2 * n} elements
            </p>
            <p>
              <strong>Relations:</strong> r<sup>{n}</sup> = e, s<sup>2</sup> = e, srs = r<sup>-1</sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component with n selector
export function SymmetryAnimationDemo() {
  const [n, setN] = useState(4);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-dark-400">Number of sides:</label>
        <input
          type="range"
          min={3}
          max={8}
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="w-32"
        />
        <span className="text-primary-400 font-mono">{n}</span>
      </div>

      <SymmetryAnimation n={n} />
    </div>
  );
}
