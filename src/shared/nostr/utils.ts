/**
 * Nostr utility functions
 * bech32 encoding/decoding for npub/nsec/note
 */

const BECH32_ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const BECH32_GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

/**
 * Bech32 polymod checksum calculation
 */
function polymod(values: number[]): number {
  let chk = 1;
  for (const v of values) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) {
      if ((top >> i) & 1) {
        chk ^= BECH32_GENERATOR[i];
      }
    }
  }
  return chk;
}

/**
 * Expand human-readable part for checksum
 */
function hrpExpand(hrp: string): number[] {
  const result: number[] = [];
  for (const c of hrp) {
    result.push(c.charCodeAt(0) >> 5);
  }
  result.push(0);
  for (const c of hrp) {
    result.push(c.charCodeAt(0) & 31);
  }
  return result;
}

/**
 * Verify bech32 checksum
 */
function verifyChecksum(hrp: string, data: number[]): boolean {
  return polymod([...hrpExpand(hrp), ...data]) === 1;
}

/**
 * Create bech32 checksum
 */
function createChecksum(hrp: string, data: number[]): number[] {
  const values = [...hrpExpand(hrp), ...data, 0, 0, 0, 0, 0, 0];
  const mod = polymod(values) ^ 1;
  const checksum: number[] = [];
  for (let i = 0; i < 6; i++) {
    checksum.push((mod >> (5 * (5 - i))) & 31);
  }
  return checksum;
}

/**
 * Convert bytes to 5-bit groups
 */
function convertBits(
  data: Uint8Array,
  fromBits: number,
  toBits: number,
  pad: boolean
): number[] | null {
  let acc = 0;
  let bits = 0;
  const result: number[] = [];
  const maxv = (1 << toBits) - 1;

  for (const value of data) {
    if (value < 0 || value >> fromBits !== 0) {
      return null;
    }
    acc = (acc << fromBits) | value;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((acc >> bits) & maxv);
    }
  }

  if (pad) {
    if (bits > 0) {
      result.push((acc << (toBits - bits)) & maxv);
    }
  } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
    return null;
  }

  return result;
}

/**
 * Encode bytes to bech32
 */
export function bech32Encode(hrp: string, data: Uint8Array): string {
  const data5bit = convertBits(data, 8, 5, true);
  if (!data5bit) {
    throw new Error('Failed to convert data to 5-bit groups');
  }

  const checksum = createChecksum(hrp, data5bit);
  let result = hrp + '1';

  for (const d of data5bit) {
    result += BECH32_ALPHABET[d];
  }
  for (const c of checksum) {
    result += BECH32_ALPHABET[c];
  }

  return result;
}

/**
 * Decode bech32 to bytes
 */
export function bech32Decode(bech: string): { hrp: string; data: Uint8Array } | null {
  const lowerBech = bech.toLowerCase();
  const upperBech = bech.toUpperCase();

  // Must be either all lowercase or all uppercase
  if (bech !== lowerBech && bech !== upperBech) {
    return null;
  }

  const b = lowerBech;
  const pos = b.lastIndexOf('1');

  if (pos < 1 || pos + 7 > b.length || b.length > 90) {
    return null;
  }

  const hrp = b.slice(0, pos);
  const dataChars = b.slice(pos + 1);

  const data5bit: number[] = [];
  for (const c of dataChars) {
    const idx = BECH32_ALPHABET.indexOf(c);
    if (idx === -1) {
      return null;
    }
    data5bit.push(idx);
  }

  if (!verifyChecksum(hrp, data5bit)) {
    return null;
  }

  // Remove checksum (last 6 characters)
  const data5bitNoChecksum = data5bit.slice(0, -6);
  const data8bit = convertBits(new Uint8Array(data5bitNoChecksum), 5, 8, false);

  if (!data8bit) {
    return null;
  }

  return { hrp, data: new Uint8Array(data8bit) };
}

/**
 * Convert hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert Uint8Array to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert hex pubkey to npub (bech32)
 */
export function hexToNpub(hex: string): string {
  if (hex.length !== 64) {
    throw new Error('Pubkey must be 32 bytes (64 hex characters)');
  }
  const bytes = hexToBytes(hex);
  return bech32Encode('npub', bytes);
}

/**
 * Convert npub (bech32) to hex pubkey
 */
export function npubToHex(npub: string): string {
  const decoded = bech32Decode(npub);
  if (!decoded || decoded.hrp !== 'npub') {
    throw new Error('Invalid npub');
  }
  return bytesToHex(decoded.data);
}

/**
 * Check if a string is a valid npub
 */
export function isValidNpub(npub: string): boolean {
  try {
    const decoded = bech32Decode(npub);
    return decoded !== null && decoded.hrp === 'npub' && decoded.data.length === 32;
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid hex pubkey
 */
export function isValidHexPubkey(hex: string): boolean {
  return /^[0-9a-f]{64}$/i.test(hex);
}

/**
 * Shorten npub for display (npub1abc...xyz)
 */
export function shortenNpub(npub: string, chars: number = 8): string {
  if (npub.length <= chars * 2 + 3) {
    return npub;
  }
  return `${npub.slice(0, chars)}...${npub.slice(-chars)}`;
}

/**
 * Check if window.nostr is available (NIP-07 extension installed)
 */
export function hasNostrExtension(): boolean {
  return typeof window !== 'undefined' && window.nostr !== undefined;
}

/**
 * Wait for nostr extension to be injected (some extensions inject after page load)
 */
export function waitForNostrExtension(timeout: number = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    if (hasNostrExtension()) {
      resolve(true);
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      if (hasNostrExtension()) {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        resolve(false);
      }
    }, 100);
  });
}

// Default relays to query for profiles
const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.nostr.band',
  'wss://nos.lol',
  'wss://relay.primal.net',
];

/**
 * Nostr profile metadata (kind 0)
 */
export interface NostrProfile {
  name?: string;
  display_name?: string;
  nip05?: string;
  picture?: string;
  about?: string;
}

/**
 * Fetch profile from a single relay
 */
function fetchProfileFromRelay(
  relayUrl: string,
  pubkeyHex: string
): Promise<NostrProfile | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      ws.close();
      resolve(null);
    }, 5000);

    const ws = new WebSocket(relayUrl);
    const subId = Math.random().toString(36).substring(2, 15);

    ws.onopen = () => {
      const req = JSON.stringify([
        'REQ',
        subId,
        { kinds: [0], authors: [pubkeyHex], limit: 1 },
      ]);
      ws.send(req);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data[0] === 'EVENT' && data[1] === subId) {
          const content = JSON.parse(data[2].content);
          clearTimeout(timeout);
          ws.close();
          resolve({
            name: content.name || content.display_name,
            display_name: content.display_name,
            nip05: content.nip05,
            picture: content.picture,
            about: content.about,
          });
        } else if (data[0] === 'EOSE') {
          clearTimeout(timeout);
          ws.close();
          resolve(null);
        }
      } catch {
        // Ignore parse errors
      }
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      ws.close();
      resolve(null);
    };
  });
}

/**
 * Fetch a user's Nostr profile from relays
 */
export async function fetchNostrProfile(npub: string): Promise<NostrProfile | null> {
  try {
    const pubkeyHex = npubToHex(npub);

    for (const relayUrl of DEFAULT_RELAYS) {
      try {
        const profile = await fetchProfileFromRelay(relayUrl, pubkeyHex);
        if (profile) {
          return profile;
        }
      } catch {
        // Try next relay
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch multiple profiles in parallel (with concurrency limit)
 */
export async function fetchNostrProfiles(
  npubs: string[]
): Promise<Map<string, NostrProfile>> {
  const results = new Map<string, NostrProfile>();

  // Fetch up to 10 profiles in parallel
  const batchSize = 10;
  for (let i = 0; i < npubs.length; i += batchSize) {
    const batch = npubs.slice(i, i + batchSize);
    const promises = batch.map(async (npub) => {
      const profile = await fetchNostrProfile(npub);
      if (profile) {
        results.set(npub, profile);
      }
    });
    await Promise.all(promises);
  }

  return results;
}
