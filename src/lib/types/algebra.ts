/**
 * Core type definitions for algebraic structures
 */

/**
 * A finite group with elements of type T
 */
export interface Group<T> {
  name: string;
  elements: T[];
  identity: T;
  operation: (a: T, b: T) => T;
  inverse: (a: T) => T;
  equals: (a: T, b: T) => boolean;
  toString: (a: T) => string;
}

/**
 * A permutation represented as a mapping
 * For a permutation σ, mapping[i] = σ(i)
 */
export interface Permutation {
  n: number;
  mapping: number[];
}

/**
 * A cycle in cycle notation
 * e.g., (1 2 3) means 1→2, 2→3, 3→1
 */
export type Cycle = number[];

/**
 * An element of the dihedral group D_n
 * rotation: r^k for some k
 * reflection: s * r^k for some k
 */
export interface DihedralElement {
  rotation: number; // k in r^k
  isReflection: boolean;
}

/**
 * A subgroup identified by its generators or elements
 */
export interface Subgroup<T> {
  elements: T[];
  generators?: T[];
  isNormal?: boolean;
  index?: number;
}

/**
 * A ring with elements of type T
 */
export interface Ring<T> {
  name: string;
  elements: T[];
  zero: T;
  one: T;
  add: (a: T, b: T) => T;
  negate: (a: T) => T;
  multiply: (a: T, b: T) => T;
  equals: (a: T, b: T) => boolean;
  toString: (a: T) => string;
}

/**
 * A field extends a ring with multiplicative inverses
 */
export interface Field<T> extends Ring<T> {
  multiplicativeInverse: (a: T) => T | null;
}

/**
 * A polynomial with coefficients of type T
 */
export interface Polynomial<T> {
  coefficients: T[]; // [a_0, a_1, ..., a_n] for a_0 + a_1*x + ... + a_n*x^n
  variable?: string;
}

/**
 * Result of polynomial division
 */
export interface PolynomialDivision<T> {
  quotient: Polynomial<T>;
  remainder: Polynomial<T>;
}

/**
 * An ideal in a ring
 */
export interface Ideal<T> {
  generators: T[];
  contains: (element: T) => boolean;
  isPrime?: boolean;
  isMaximal?: boolean;
}

/**
 * A field extension
 */
export interface FieldExtension<T, S> {
  baseField: Field<T>;
  extensionField: Field<S>;
  degree: number;
  minimalPolynomial?: Polynomial<T>;
}

/**
 * A group homomorphism
 */
export interface GroupHomomorphism<T, S> {
  domain: Group<T>;
  codomain: Group<S>;
  map: (element: T) => S;
  kernel?: T[];
  image?: S[];
  isInjective?: boolean;
  isSurjective?: boolean;
}

/**
 * Cayley table entry
 */
export interface CayleyTableCell<T> {
  row: T;
  col: T;
  result: T;
  rowIndex: number;
  colIndex: number;
}
