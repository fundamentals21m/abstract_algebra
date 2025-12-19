import { LessonLayout } from '../../components/layout';
import { Theorem, Example, Math, MathBlock } from '../../components/common';
import 'katex/dist/katex.min.css';

export default function Section25() {
  return (
    <LessonLayout sectionId={25}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-lg text-dark-300 leading-relaxed">
            <strong>RSA encryption</strong> is one of the most important applications of abstract algebra.
            It uses the difficulty of factoring large numbers, combined with Euler's theorem, to create
            secure public-key cryptography.
          </p>
        </section>

        {/* Public Key Cryptography */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Public Key Cryptography</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">The Key Exchange Problem</h4>
            <p className="text-dark-300 mb-3">
              Symmetric encryption requires sharing a secret key. But how do you share a secret
              over an insecure channel?
            </p>
            <p className="text-dark-300">
              <strong>Public key cryptography</strong> solves this: publish a public key for encryption,
              keep a private key for decryption. Only the private key holder can decrypt.
            </p>
          </div>
        </section>

        {/* RSA Algorithm */}
        <section>
          <h3 className="text-xl font-semibold mb-4">The RSA Algorithm</h3>

          <div className="space-y-4">
            <div className="card border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-400 mb-3">Step 1: Key Generation</h4>
              <ol className="list-decimal list-inside space-y-2 text-dark-300">
                <li>Choose two large primes <Math>p</Math> and <Math>q</Math></li>
                <li>Compute <Math>{'n = pq'}</Math></li>
                <li>Compute <Math>{'\\phi(n) = (p-1)(q-1)'}</Math></li>
                <li>Choose <Math>e</Math> with <Math>{'\\gcd(e, \\phi(n)) = 1'}</Math> (often <Math>{'e = 65537'}</Math>)</li>
                <li>Compute <Math>d</Math> such that <Math>{'ed \\equiv 1 \\pmod{\\phi(n)}'}</Math></li>
              </ol>
              <div className="mt-3 p-3 bg-dark-800 rounded">
                <p><strong>Public key:</strong> <Math>{'(n, e)'}</Math></p>
                <p><strong>Private key:</strong> <Math>{'(n, d)'}</Math></p>
              </div>
            </div>

            <div className="card border-l-4 border-green-500">
              <h4 className="font-semibold text-green-400 mb-3">Step 2: Encryption</h4>
              <p className="text-dark-300 mb-2">
                To encrypt message <Math>m</Math> (where <Math>{'0 \\leq m < n'}</Math>):
              </p>
              <MathBlock>{'c = m^e \\mod n'}</MathBlock>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-3">Step 3: Decryption</h4>
              <p className="text-dark-300 mb-2">
                To decrypt ciphertext <Math>c</Math>:
              </p>
              <MathBlock>{'m = c^d \\mod n'}</MathBlock>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Why RSA Works</h3>

          <Theorem title="RSA Correctness">
            <p>
              Decryption recovers the original message: <Math>{'c^d \\equiv m \\pmod n'}</Math>.
            </p>
          </Theorem>

          <div className="card">
            <h4 className="font-semibold mb-3">Proof</h4>
            <div className="space-y-2 text-dark-300">
              <p>Since <Math>{'ed \\equiv 1 \\pmod{\\phi(n)}'}</Math>, we have <Math>{'ed = 1 + k\\phi(n)'}</Math> for some <Math>k</Math>.</p>
              <p>Then:</p>
              <MathBlock>{'c^d = (m^e)^d = m^{ed} = m^{1 + k\\phi(n)} = m \\cdot (m^{\\phi(n)})^k'}</MathBlock>
              <p>If <Math>{'\\gcd(m, n) = 1'}</Math>, by Euler's theorem:</p>
              <MathBlock>{'m^{\\phi(n)} \\equiv 1 \\pmod n'}</MathBlock>
              <p>So <Math>{'c^d \\equiv m \\cdot 1^k = m \\pmod n'}</Math>.</p>
            </div>
          </div>
        </section>

        {/* Example */}
        <section>
          <h3 className="text-xl font-semibold mb-4">RSA Example</h3>

          <Example title="Small RSA (Toy Example)">
            <div className="bg-dark-900 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold text-primary-400">Key Generation:</p>
                <ul className="list-disc list-inside text-dark-300 ml-2">
                  <li><Math>{'p = 61, q = 53'}</Math></li>
                  <li><Math>{'n = 61 \\times 53 = 3233'}</Math></li>
                  <li><Math>{'\\phi(n) = 60 \\times 52 = 3120'}</Math></li>
                  <li><Math>{'e = 17'}</Math> (coprime to 3120)</li>
                  <li><Math>{'d = 2753'}</Math> (since <Math>{'17 \\times 2753 = 46801 = 1 + 15 \\times 3120'}</Math>)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-primary-400">Encryption:</p>
                <p className="text-dark-300">Message <Math>{'m = 123'}</Math></p>
                <p className="text-dark-300"><Math>{'c = 123^{17} \\mod 3233 = 855'}</Math></p>
              </div>

              <div>
                <p className="font-semibold text-primary-400">Decryption:</p>
                <p className="text-dark-300"><Math>{'m = 855^{2753} \\mod 3233 = 123'}</Math> ✓</p>
              </div>
            </div>
          </Example>
        </section>

        {/* Security */}
        <section>
          <h3 className="text-xl font-semibold mb-4">RSA Security</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">Why Is It Secure?</h4>
            <p className="text-dark-300 mb-3">
              Breaking RSA requires finding <Math>d</Math> from <Math>{'(n, e)'}</Math>. This requires
              computing <Math>{'\\phi(n)'}</Math>, which requires factoring <Math>{'n = pq'}</Math>.
            </p>
            <ul className="list-disc list-inside text-dark-400 space-y-1">
              <li>Factoring large numbers is believed to be computationally hard</li>
              <li>No efficient classical algorithm is known</li>
              <li>Modern RSA uses 2048+ bit keys (<Math>n</Math> has 600+ digits)</li>
            </ul>
          </div>

          <div className="callout-info">
            <p>
              <strong>Quantum Threat:</strong> Shor's algorithm can factor efficiently on a quantum
              computer. Post-quantum cryptography is being developed as a replacement.
            </p>
          </div>
        </section>

        {/* Digital Signatures */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Digital Signatures</h3>

          <div className="card">
            <h4 className="font-semibold mb-3">RSA Signatures</h4>
            <p className="text-dark-300 mb-3">
              RSA can also provide authentication through digital signatures:
            </p>
            <ul className="space-y-2 text-dark-300">
              <li>
                <strong>Sign:</strong> <Math>{'s = m^d \\mod n'}</Math> (using private key)
              </li>
              <li>
                <strong>Verify:</strong> Check <Math>{'s^e \\equiv m \\pmod n'}</Math> (using public key)
              </li>
            </ul>
            <p className="text-dark-400 text-sm mt-3">
              Only the private key holder can create valid signatures, but anyone can verify.
            </p>
          </div>
        </section>

        {/* Practical Considerations */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Practical Considerations</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Padding Schemes</h4>
              <p className="text-dark-300 text-sm">
                Raw RSA is vulnerable to attacks. Real implementations use padding
                (OAEP, PKCS#1) to add randomness and prevent chosen-ciphertext attacks.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Hybrid Encryption</h4>
              <p className="text-dark-300 text-sm">
                RSA is slow for large data. In practice, use RSA to encrypt a random
                symmetric key, then use that key with AES for the actual data.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Key Size</h4>
              <p className="text-dark-300 text-sm">
                2048 bits is the current minimum recommended. 4096 bits provides
                more security margin for sensitive applications.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary-400 mb-2">Chinese Remainder Theorem</h4>
              <p className="text-dark-300 text-sm">
                Decryption can be sped up 4× using CRT, computing mod <Math>p</Math> and
                mod <Math>q</Math> separately, then combining.
              </p>
            </div>
          </div>
        </section>

        {/* Other Cryptosystems */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Related Cryptosystems</h3>

          <div className="space-y-3">
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400">Diffie-Hellman Key Exchange</p>
              <p className="text-dark-300 text-sm">Based on discrete logarithm problem in <Math>{'\\mathbb{Z}_p^*'}</Math></p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400">Elliptic Curve Cryptography (ECC)</p>
              <p className="text-dark-300 text-sm">Uses group structure on elliptic curves over finite fields</p>
            </div>
            <div className="bg-dark-900 p-3 rounded">
              <p className="font-semibold text-primary-400">ElGamal</p>
              <p className="text-dark-300 text-sm">Public key encryption based on discrete log</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-2 text-dark-300">
            <li>
              RSA uses <Math>{'n = pq'}</Math>, public exponent <Math>e</Math>, private exponent <Math>d</Math>.
            </li>
            <li>
              <strong>Encrypt:</strong> <Math>{'c = m^e \\mod n'}</Math>; <strong>Decrypt:</strong> <Math>{'m = c^d \\mod n'}</Math>
            </li>
            <li>
              Security relies on the difficulty of factoring <Math>n</Math>.
            </li>
            <li>
              Euler's theorem proves correctness: <Math>{'m^{ed} \\equiv m \\pmod n'}</Math>.
            </li>
            <li>
              RSA also enables digital signatures for authentication.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
}
