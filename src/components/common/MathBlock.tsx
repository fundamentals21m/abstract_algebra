import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  children: string;
  display?: boolean;
  className?: string;
}

export function Math({ children, display = false, className = '' }: MathProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(children, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          strict: false,
        });
      } catch (error) {
        console.error('KaTeX error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = children;
        }
      }
    }
  }, [children, display]);

  if (display) {
    return (
      <div className={`math-block ${className}`}>
        <span ref={containerRef} />
      </div>
    );
  }

  return <span ref={containerRef} className={className} />;
}

interface MathBlockProps {
  children: string;
  className?: string;
  label?: string;
}

export function MathBlock({ children, className = '', label }: MathBlockProps) {
  return (
    <div className={`relative ${className}`}>
      <Math display>{children}</Math>
      {label && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 text-sm">
          ({label})
        </span>
      )}
    </div>
  );
}

// Common math expressions for reuse
export const MathSymbols = {
  // Groups
  integers: '\\mathbb{Z}',
  rationals: '\\mathbb{Q}',
  reals: '\\mathbb{R}',
  complex: '\\mathbb{C}',
  naturals: '\\mathbb{N}',

  // Modular arithmetic
  zn: (n: number | string) => `\\mathbb{Z}_{${n}}`,
  znStar: (n: number | string) => `\\mathbb{Z}_{${n}}^*`,

  // Groups
  sn: (n: number | string) => `S_{${n}}`,
  an: (n: number | string) => `A_{${n}}`,
  dn: (n: number | string) => `D_{${n}}`,
  gln: (n: number | string, field = '\\mathbb{R}') => `GL_{${n}}(${field})`,
  sln: (n: number | string, field = '\\mathbb{R}') => `SL_{${n}}(${field})`,

  // Operations
  compose: '\\circ',
  times: '\\times',
  directSum: '\\oplus',
  directProduct: '\\times',
  isomorphic: '\\cong',
  normalSubgroup: '\\triangleleft',
  subgroup: '\\leq',

  // Set notation
  element: '\\in',
  notElement: '\\notin',
  subset: '\\subseteq',
  properSubset: '\\subset',
  union: '\\cup',
  intersection: '\\cap',
  setMinus: '\\setminus',
  emptySet: '\\emptyset',

  // Arrows
  mapsto: '\\mapsto',
  to: '\\to',
  implies: '\\Rightarrow',
  iff: '\\Leftrightarrow',

  // Functions
  ker: '\\ker',
  im: '\\text{im}',
  aut: '\\text{Aut}',
  inn: '\\text{Inn}',
  ord: '\\text{ord}',
  gcd: '\\gcd',
  lcm: '\\text{lcm}',
};

// Helper for common patterns
export function groupNotation(name: string, subscript?: string | number): string {
  if (subscript !== undefined) {
    return `${name}_{${subscript}}`;
  }
  return name;
}

export function fraction(num: string | number, denom: string | number): string {
  return `\\frac{${num}}{${denom}}`;
}

export function power(base: string | number, exp: string | number): string {
  return `${base}^{${exp}}`;
}

export function subscript(base: string, sub: string | number): string {
  return `${base}_{${sub}}`;
}

export function set(...elements: (string | number)[]): string {
  return `\\{${elements.join(', ')}\\}`;
}

export function tuple(...elements: (string | number)[]): string {
  return `(${elements.join(', ')})`;
}

export function abs(expr: string): string {
  return `|${expr}|`;
}

export function norm(expr: string): string {
  return `\\|${expr}\\|`;
}
