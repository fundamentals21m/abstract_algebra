/**
 * Permutation group S_n implementations
 */

import type { Group, Permutation, Cycle } from '../types/algebra';

/**
 * Create the identity permutation on n elements
 */
export function identityPermutation(n: number): Permutation {
  return {
    n,
    mapping: Array.from({ length: n }, (_, i) => i),
  };
}

/**
 * Create a permutation from a mapping array
 * mapping[i] = j means i → j
 */
export function permutationFromMapping(mapping: number[]): Permutation {
  return {
    n: mapping.length,
    mapping: [...mapping],
  };
}

/**
 * Create a permutation from cycle notation
 * e.g., [[0, 1, 2], [3, 4]] represents (0 1 2)(3 4)
 * Note: We use 0-based indexing internally
 */
export function permutationFromCycles(n: number, cycles: Cycle[]): Permutation {
  const mapping = Array.from({ length: n }, (_, i) => i);

  for (const cycle of cycles) {
    if (cycle.length < 2) continue;

    for (let i = 0; i < cycle.length; i++) {
      const from = cycle[i];
      const to = cycle[(i + 1) % cycle.length];
      mapping[from] = to;
    }
  }

  return { n, mapping };
}

/**
 * Compose two permutations: (σ ∘ τ)(x) = σ(τ(x))
 * Note: We apply τ first, then σ (right-to-left composition)
 */
export function composePermutations(sigma: Permutation, tau: Permutation): Permutation {
  if (sigma.n !== tau.n) {
    throw new Error('Permutations must have the same degree');
  }

  const mapping = tau.mapping.map((i) => sigma.mapping[i]);
  return { n: sigma.n, mapping };
}

/**
 * Get the inverse of a permutation
 */
export function inversePermutation(perm: Permutation): Permutation {
  const mapping = new Array(perm.n);

  for (let i = 0; i < perm.n; i++) {
    mapping[perm.mapping[i]] = i;
  }

  return { n: perm.n, mapping };
}

/**
 * Check if two permutations are equal
 */
export function permutationsEqual(a: Permutation, b: Permutation): boolean {
  if (a.n !== b.n) return false;
  return a.mapping.every((val, i) => val === b.mapping[i]);
}

/**
 * Convert a permutation to disjoint cycle notation
 * Returns array of cycles, each cycle is an array of elements
 */
export function toCycles(perm: Permutation): Cycle[] {
  const cycles: Cycle[] = [];
  const visited = new Array(perm.n).fill(false);

  for (let i = 0; i < perm.n; i++) {
    if (visited[i]) continue;

    const cycle: Cycle = [];
    let current = i;

    while (!visited[current]) {
      visited[current] = true;
      cycle.push(current);
      current = perm.mapping[current];
    }

    // Only include non-trivial cycles (length > 1)
    if (cycle.length > 1) {
      cycles.push(cycle);
    }
  }

  return cycles;
}

/**
 * Convert permutation to cycle notation string
 * Uses 1-based indexing for display (standard mathematical convention)
 */
export function cycleNotation(perm: Permutation, oneBased = true): string {
  const cycles = toCycles(perm);

  if (cycles.length === 0) {
    return 'e'; // Identity
  }

  return cycles
    .map((cycle) => {
      const adjusted = oneBased ? cycle.map((x) => x + 1) : cycle;
      return `(${adjusted.join(' ')})`;
    })
    .join('');
}

/**
 * Convert permutation to two-row notation
 */
export function twoRowNotation(perm: Permutation, oneBased = true): {
  top: number[];
  bottom: number[];
} {
  const offset = oneBased ? 1 : 0;
  return {
    top: Array.from({ length: perm.n }, (_, i) => i + offset),
    bottom: perm.mapping.map((x) => x + offset),
  };
}

/**
 * Get the order of a permutation (smallest k such that σ^k = e)
 */
export function permutationOrder(perm: Permutation): number {
  const cycles = toCycles(perm);

  if (cycles.length === 0) return 1;

  // Order is LCM of cycle lengths
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

  return cycles.reduce((acc, cycle) => lcm(acc, cycle.length), 1);
}

/**
 * Check if a permutation is even (even number of transpositions)
 */
export function isEvenPermutation(perm: Permutation): boolean {
  const cycles = toCycles(perm);

  // A k-cycle can be written as (k-1) transpositions
  // Sum of (cycle length - 1) for all cycles gives total transpositions
  const transpositions = cycles.reduce((sum, cycle) => sum + cycle.length - 1, 0);

  return transpositions % 2 === 0;
}

/**
 * Get the sign (signature) of a permutation: +1 for even, -1 for odd
 */
export function permutationSign(perm: Permutation): 1 | -1 {
  return isEvenPermutation(perm) ? 1 : -1;
}

/**
 * Create the symmetric group S_n
 */
export function createSn(n: number): Group<Permutation> {
  if (n < 1) throw new Error('n must be positive');

  // Generate all permutations
  const elements = generateAllPermutations(n);
  const identity = identityPermutation(n);

  return {
    name: `S_${n}`,
    elements,
    identity,
    operation: composePermutations,
    inverse: inversePermutation,
    equals: permutationsEqual,
    toString: (p) => cycleNotation(p),
  };
}

/**
 * Create the alternating group A_n (even permutations)
 */
export function createAn(n: number): Group<Permutation> {
  if (n < 1) throw new Error('n must be positive');

  const allPerms = generateAllPermutations(n);
  const elements = allPerms.filter(isEvenPermutation);
  const identity = identityPermutation(n);

  return {
    name: `A_${n}`,
    elements,
    identity,
    operation: composePermutations,
    inverse: inversePermutation,
    equals: permutationsEqual,
    toString: (p) => cycleNotation(p),
  };
}

/**
 * Generate all permutations of n elements
 */
function generateAllPermutations(n: number): Permutation[] {
  const result: Permutation[] = [];

  function permute(arr: number[], start: number) {
    if (start === arr.length) {
      result.push({ n, mapping: [...arr] });
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  const initial = Array.from({ length: n }, (_, i) => i);
  permute(initial, 0);

  return result;
}

/**
 * Create a transposition (swap two elements)
 */
export function transposition(n: number, i: number, j: number): Permutation {
  if (i < 0 || i >= n || j < 0 || j >= n) {
    throw new Error('Invalid indices for transposition');
  }

  const mapping = Array.from({ length: n }, (_, k) => k);
  mapping[i] = j;
  mapping[j] = i;

  return { n, mapping };
}

/**
 * Decompose a permutation into transpositions
 */
export function toTranspositions(perm: Permutation): Permutation[] {
  const cycles = toCycles(perm);
  const transpositions: Permutation[] = [];

  for (const cycle of cycles) {
    // (a b c d) = (a d)(a c)(a b)
    for (let i = cycle.length - 1; i > 0; i--) {
      transpositions.push(transposition(perm.n, cycle[0], cycle[i]));
    }
  }

  return transpositions;
}

/**
 * Apply a permutation to an array
 */
export function applyPermutation<T>(perm: Permutation, arr: T[]): T[] {
  if (arr.length !== perm.n) {
    throw new Error('Array length must match permutation degree');
  }

  const result = new Array(perm.n);
  for (let i = 0; i < perm.n; i++) {
    result[perm.mapping[i]] = arr[i];
  }

  return result;
}

/**
 * Get the orbit of an element under a permutation
 */
export function orbit(perm: Permutation, element: number): number[] {
  const result: number[] = [];
  let current = element;

  do {
    result.push(current);
    current = perm.mapping[current];
  } while (current !== element);

  return result;
}

/**
 * Get all orbits of a permutation
 */
export function allOrbits(perm: Permutation): number[][] {
  const orbits: number[][] = [];
  const visited = new Set<number>();

  for (let i = 0; i < perm.n; i++) {
    if (!visited.has(i)) {
      const orb = orbit(perm, i);
      orbits.push(orb);
      orb.forEach((x) => visited.add(x));
    }
  }

  return orbits;
}

/**
 * Get fixed points of a permutation
 */
export function fixedPoints(perm: Permutation): number[] {
  return perm.mapping
    .map((val, i) => (val === i ? i : -1))
    .filter((i) => i !== -1);
}
