/**
 * Mathematical utility functions for abstract algebra
 */

/**
 * Proper modulo operation that handles negative numbers correctly.
 * In JavaScript, -1 % 5 = -1, but mathematically we want 4.
 */
export function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

/**
 * Greatest Common Divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Least Common Multiple
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Extended Euclidean Algorithm
 * Returns { gcd, x, y } where gcd = a*x + b*y
 */
export function extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) {
    return { gcd: a, x: 1, y: 0 };
  }

  const result = extendedGcd(b, a % b);
  return {
    gcd: result.gcd,
    x: result.y,
    y: result.x - Math.floor(a / b) * result.y,
  };
}

/**
 * Modular multiplicative inverse
 * Returns x such that (a * x) ≡ 1 (mod n)
 * Returns null if no inverse exists (when gcd(a, n) ≠ 1)
 */
export function modInverse(a: number, n: number): number | null {
  a = mod(a, n);
  const result = extendedGcd(a, n);
  if (result.gcd !== 1) {
    return null; // No inverse exists
  }
  return mod(result.x, n);
}

/**
 * Modular exponentiation using square-and-multiply
 * Computes (base^exp) mod modulus efficiently
 */
export function modPow(base: number, exp: number, modulus: number): number {
  if (modulus === 1) return 0;

  let result = 1;
  base = mod(base, modulus);

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = mod(result * base, modulus);
    }
    exp = Math.floor(exp / 2);
    base = mod(base * base, modulus);
  }

  return result;
}

/**
 * Check if a number is prime using trial division
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Get all prime factors of n
 */
export function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let remaining = Math.abs(n);

  for (let p = 2; p * p <= remaining; p++) {
    while (remaining % p === 0) {
      factors.push(p);
      remaining /= p;
    }
  }

  if (remaining > 1) {
    factors.push(remaining);
  }

  return factors;
}

/**
 * Prime factorization as a map of prime -> exponent
 */
export function primeFactorization(n: number): Map<number, number> {
  const result = new Map<number, number>();
  const factors = primeFactors(n);

  for (const p of factors) {
    result.set(p, (result.get(p) || 0) + 1);
  }

  return result;
}

/**
 * Euler's totient function φ(n)
 * Returns the count of integers k where 1 ≤ k ≤ n and gcd(k, n) = 1
 */
export function totient(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let result = n;
  const factorization = primeFactorization(n);

  for (const p of factorization.keys()) {
    result -= result / p;
  }

  return Math.round(result);
}

/**
 * Get all positive divisors of n
 */
export function divisors(n: number): number[] {
  const result: number[] = [];
  n = Math.abs(n);

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }

  return result.sort((a, b) => a - b);
}

/**
 * Check if two numbers are coprime (gcd = 1)
 */
export function areCoprime(a: number, b: number): boolean {
  return gcd(a, b) === 1;
}

/**
 * Get all numbers from 1 to n-1 that are coprime to n
 */
export function getCoprimes(n: number): number[] {
  const result: number[] = [];
  for (let i = 1; i < n; i++) {
    if (areCoprime(i, n)) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Factorial
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n <= 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Binomial coefficient "n choose k"
 */
export function binomial(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Use the more efficient calculation
  k = Math.min(k, n - k);

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

/**
 * Generate range of integers [start, end)
 */
export function range(start: number, end?: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return Array.from({ length: end - start }, (_, i) => start + i);
}

/**
 * Check if n is a perfect square
 */
export function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

/**
 * Integer square root (floor of sqrt)
 */
export function isqrt(n: number): number {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.floor(Math.sqrt(n));
}
