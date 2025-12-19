import { useState } from 'react';
import { LessonLayout } from '../../components/layout/LessonLayout';
import { Callout } from '../../components/common/Callout';
import { Math as MathInline, MathBlock } from '../../components/common/MathBlock';
import { Card, CardGrid } from '../../components/common/Card';

// Interactive Set Builder Component
function SetBuilder() {
  const [elements, setElements] = useState<string[]>(['1', '2', '3']);
  const [newElement, setNewElement] = useState('');

  const addElement = () => {
    if (newElement && !elements.includes(newElement)) {
      setElements([...elements, newElement]);
      setNewElement('');
    }
  };

  const removeElement = (elem: string) => {
    setElements(elements.filter(e => e !== elem));
  };

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Interactive Set Builder</h4>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newElement}
          onChange={(e) => setNewElement(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addElement()}
          placeholder="Add element..."
          className="input flex-1"
        />
        <button onClick={addElement} className="btn-primary">Add</button>
      </div>

      <div className="bg-dark-800 rounded-lg p-4">
        <p className="text-dark-400 text-sm mb-2">Your set:</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl text-primary-400">{'{'}</span>
          {elements.map((elem, i) => (
            <span key={elem} className="flex items-center">
              <button
                onClick={() => removeElement(elem)}
                className="px-3 py-1 bg-dark-700 text-dark-100 rounded hover:bg-red-900 transition-colors"
              >
                {elem}
              </button>
              {i < elements.length - 1 && <span className="text-dark-400 mx-1">,</span>}
            </span>
          ))}
          <span className="text-2xl text-primary-400">{'}'}</span>
        </div>
        <p className="text-dark-500 text-sm mt-2">
          Cardinality: |S| = {elements.length}
        </p>
      </div>
    </div>
  );
}

// Set Operations Visualizer
function SetOperations() {
  const setA = new Set(['1', '2', '3', '4']);
  const setB = new Set(['3', '4', '5', '6']);

  const union = new Set([...setA, ...setB]);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const differenceAB = new Set([...setA].filter(x => !setB.has(x)));
  const differenceBA = new Set([...setB].filter(x => !setA.has(x)));

  const SetDisplay = ({ set, label, color }: { set: Set<string>; label: string; color: string }) => (
    <div className="text-center">
      <p className={`text-sm font-semibold ${color} mb-1`}>{label}</p>
      <p className="font-mono">{'{' + [...set].join(', ') + '}'}</p>
    </div>
  );

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Set Operations</h4>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <SetDisplay set={setA} label="A" color="text-blue-400" />
        <SetDisplay set={setB} label="B" color="text-green-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-xs text-dark-400 mb-1">A ∪ B (Union)</p>
          <p className="font-mono text-sm text-purple-400">{'{' + [...union].join(', ') + '}'}</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-xs text-dark-400 mb-1">A ∩ B (Intersection)</p>
          <p className="font-mono text-sm text-yellow-400">{'{' + [...intersection].join(', ') + '}'}</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-xs text-dark-400 mb-1">A − B (Difference)</p>
          <p className="font-mono text-sm text-blue-400">{'{' + [...differenceAB].join(', ') + '}'}</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-xs text-dark-400 mb-1">B − A (Difference)</p>
          <p className="font-mono text-sm text-green-400">{'{' + [...differenceBA].join(', ') + '}'}</p>
        </div>
      </div>
    </div>
  );
}

// Relation Matrix Visualizer
function RelationMatrix() {
  const [relation, setRelation] = useState<boolean[][]>([
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ]);

  const toggleCell = (i: number, j: number) => {
    const newRelation = relation.map(row => [...row]);
    newRelation[i][j] = !newRelation[i][j];
    setRelation(newRelation);
  };

  // Check properties
  const isReflexive = relation.every((row, i) => row[i]);
  const isSymmetric = relation.every((row, i) =>
    row.every((val, j) => val === relation[j][i])
  );
  const isAntisymmetric = relation.every((row, i) =>
    row.every((val, j) => i === j || !(val && relation[j][i]))
  );

  // Check transitivity
  let isTransitive = true;
  for (let i = 0; i < 3 && isTransitive; i++) {
    for (let j = 0; j < 3 && isTransitive; j++) {
      if (relation[i][j]) {
        for (let k = 0; k < 3 && isTransitive; k++) {
          if (relation[j][k] && !relation[i][k]) {
            isTransitive = false;
          }
        }
      }
    }
  }

  const isEquivalence = isReflexive && isSymmetric && isTransitive;
  const isPartialOrder = isReflexive && isAntisymmetric && isTransitive;

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Relation Matrix</h4>
      <p className="text-dark-400 text-sm mb-4">
        Click cells to toggle. The matrix shows a relation R on the set {'{1, 2, 3}'}.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <table className="cayley-table">
            <thead>
              <tr>
                <th className="bg-dark-900">R</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              {relation.map((row, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  {row.map((val, j) => (
                    <td
                      key={j}
                      onClick={() => toggleCell(i, j)}
                      className={`cursor-pointer ${val ? 'bg-primary-900/50 text-primary-300' : ''}`}
                    >
                      {val ? '1' : '0'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-sm">
            <span className={isReflexive ? 'text-green-400' : 'text-red-400'}>
              {isReflexive ? '✓' : '✗'}
            </span>
            {' '}Reflexive
          </p>
          <p className="text-sm">
            <span className={isSymmetric ? 'text-green-400' : 'text-red-400'}>
              {isSymmetric ? '✓' : '✗'}
            </span>
            {' '}Symmetric
          </p>
          <p className="text-sm">
            <span className={isAntisymmetric ? 'text-green-400' : 'text-red-400'}>
              {isAntisymmetric ? '✓' : '✗'}
            </span>
            {' '}Antisymmetric
          </p>
          <p className="text-sm">
            <span className={isTransitive ? 'text-green-400' : 'text-red-400'}>
              {isTransitive ? '✓' : '✗'}
            </span>
            {' '}Transitive
          </p>
          <div className="pt-2 border-t border-dark-700">
            <p className="text-sm">
              <span className={isEquivalence ? 'text-green-400' : 'text-dark-500'}>
                {isEquivalence ? '✓' : '✗'}
              </span>
              {' '}Equivalence relation
            </p>
            <p className="text-sm">
              <span className={isPartialOrder ? 'text-green-400' : 'text-dark-500'}>
                {isPartialOrder ? '✓' : '✗'}
              </span>
              {' '}Partial order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section00() {
  return (
    <LessonLayout sectionId={0}>
      {/* Introduction */}
      <p className="text-lg text-dark-300 mb-6">
        Before diving into abstract algebra, we need to establish a firm foundation in set theory and relations.
        These concepts form the language we'll use throughout our study of algebraic structures.
      </p>

      {/* Sets Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Sets</h2>

      <Callout type="definition">
        <p>
          A <strong>set</strong> is a well-defined collection of distinct objects, called <strong>elements</strong> or <strong>members</strong>.
          We write <MathInline>{'a \\in S'}</MathInline> to mean "a is an element of S" and <MathInline>{'a \\notin S'}</MathInline> to mean "a is not an element of S".
        </p>
      </Callout>

      <p className="my-4">
        Sets can be described in several ways:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4 text-dark-200">
        <li><strong>Roster notation:</strong> List elements explicitly, e.g., <MathInline>{'S = \\{1, 2, 3\\}'}</MathInline></li>
        <li><strong>Set-builder notation:</strong> Describe elements by a property, e.g., <MathInline>{'S = \\{x \\in \\mathbb{Z} : x > 0\\}'}</MathInline></li>
        <li><strong>Interval notation:</strong> For subsets of real numbers, e.g., <MathInline>{'[0, 1] = \\{x \\in \\mathbb{R} : 0 \\le x \\le 1\\}'}</MathInline></li>
      </ul>

      <SetBuilder />

      <h3 className="text-xl font-semibold mt-8 mb-4">Important Number Sets</h3>

      <CardGrid>
        <Card title="Natural Numbers (ℕ)">
          <p className="font-mono text-primary-400">{'{0, 1, 2, 3, ...}'}</p>
          <p className="text-sm text-dark-400 mt-2">Sometimes defined as {'{1, 2, 3, ...}'}</p>
        </Card>
        <Card title="Integers (ℤ)">
          <p className="font-mono text-primary-400">{'{..., -2, -1, 0, 1, 2, ...}'}</p>
          <p className="text-sm text-dark-400 mt-2">All whole numbers, positive and negative</p>
        </Card>
        <Card title="Rationals (ℚ)">
          <p className="font-mono text-primary-400">{'{p/q : p, q ∈ ℤ, q ≠ 0}'}</p>
          <p className="text-sm text-dark-400 mt-2">All fractions</p>
        </Card>
        <Card title="Reals (ℝ)">
          <p className="font-mono text-primary-400">All points on the number line</p>
          <p className="text-sm text-dark-400 mt-2">Includes irrational numbers like √2, π</p>
        </Card>
      </CardGrid>

      <h3 className="text-xl font-semibold mt-8 mb-4">Set Operations</h3>

      <Callout type="definition">
        <p>For sets A and B:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Union:</strong> <MathInline>{'A \\cup B = \\{x : x \\in A \\text{ or } x \\in B\\}'}</MathInline></li>
          <li><strong>Intersection:</strong> <MathInline>{'A \\cap B = \\{x : x \\in A \\text{ and } x \\in B\\}'}</MathInline></li>
          <li><strong>Difference:</strong> <MathInline>{'A - B = \\{x : x \\in A \\text{ and } x \\notin B\\}'}</MathInline></li>
          <li><strong>Complement:</strong> <MathInline>{'A^c = \\{x \\in U : x \\notin A\\}'}</MathInline> (relative to universe U)</li>
        </ul>
      </Callout>

      <SetOperations />

      <h3 className="text-xl font-semibold mt-8 mb-4">Cartesian Product</h3>

      <Callout type="definition">
        <p>
          The <strong>Cartesian product</strong> of sets A and B is:
        </p>
        <MathBlock>{'A \\times B = \\{(a, b) : a \\in A \\text{ and } b \\in B\\}'}</MathBlock>
        <p className="mt-2">
          Elements of <MathInline>{'A \\times B'}</MathInline> are called <strong>ordered pairs</strong>.
        </p>
      </Callout>

      <Callout type="example">
        <p>If <MathInline>{'A = \\{1, 2\\}'}</MathInline> and <MathInline>{'B = \\{a, b\\}'}</MathInline>, then:</p>
        <MathBlock>{'A \\times B = \\{(1, a), (1, b), (2, a), (2, b)\\}'}</MathBlock>
        <p className="mt-2">Note that <MathInline>{'|A \\times B| = |A| \\cdot |B| = 2 \\cdot 2 = 4'}</MathInline></p>
      </Callout>

      {/* Relations Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Relations</h2>

      <Callout type="definition">
        <p>
          A <strong>relation</strong> R from set A to set B is a subset <MathInline>{'R \\subseteq A \\times B'}</MathInline>.
          If <MathInline>{'(a, b) \\in R'}</MathInline>, we write <MathInline>{'a \\mathrel{R} b'}</MathInline> and say "a is related to b".
        </p>
        <p className="mt-2">
          A relation on a set A is a relation from A to A (i.e., <MathInline>{'R \\subseteq A \\times A'}</MathInline>).
        </p>
      </Callout>

      <h3 className="text-xl font-semibold mt-8 mb-4">Properties of Relations</h3>

      <p className="mb-4">A relation R on a set A may have the following properties:</p>

      <div className="space-y-4 mb-6">
        <Callout type="definition">
          <p><strong>Reflexive:</strong> For all <MathInline>{'a \\in A'}</MathInline>, we have <MathInline>{'a \\mathrel{R} a'}</MathInline></p>
          <p className="text-sm text-dark-400 mt-1">Every element is related to itself.</p>
        </Callout>

        <Callout type="definition">
          <p><strong>Symmetric:</strong> For all <MathInline>{'a, b \\in A'}</MathInline>, if <MathInline>{'a \\mathrel{R} b'}</MathInline> then <MathInline>{'b \\mathrel{R} a'}</MathInline></p>
          <p className="text-sm text-dark-400 mt-1">If a is related to b, then b is related to a.</p>
        </Callout>

        <Callout type="definition">
          <p><strong>Antisymmetric:</strong> For all <MathInline>{'a, b \\in A'}</MathInline>, if <MathInline>{'a \\mathrel{R} b'}</MathInline> and <MathInline>{'b \\mathrel{R} a'}</MathInline> then <MathInline>{'a = b'}</MathInline></p>
          <p className="text-sm text-dark-400 mt-1">Two different elements cannot be mutually related.</p>
        </Callout>

        <Callout type="definition">
          <p><strong>Transitive:</strong> For all <MathInline>{'a, b, c \\in A'}</MathInline>, if <MathInline>{'a \\mathrel{R} b'}</MathInline> and <MathInline>{'b \\mathrel{R} c'}</MathInline> then <MathInline>{'a \\mathrel{R} c'}</MathInline></p>
          <p className="text-sm text-dark-400 mt-1">The relation "chains" together.</p>
        </Callout>
      </div>

      <RelationMatrix />

      {/* Equivalence Relations */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Equivalence Relations</h3>

      <Callout type="theorem">
        <p>
          A relation R on a set A is an <strong>equivalence relation</strong> if and only if it is reflexive, symmetric, and transitive.
        </p>
      </Callout>

      <Callout type="example">
        <p><strong>Congruence modulo n:</strong> On <MathInline>{'\\mathbb{Z}'}</MathInline>, define <MathInline>{'a \\equiv b \\pmod{n}'}</MathInline> iff <MathInline>{'n | (a - b)'}</MathInline>.</p>
        <p className="mt-2">This is an equivalence relation! Let's verify for n = 3:</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li><strong>Reflexive:</strong> <MathInline>{'a \\equiv a \\pmod{3}'}</MathInline> since <MathInline>{'3 | 0'}</MathInline></li>
          <li><strong>Symmetric:</strong> If <MathInline>{'3 | (a-b)'}</MathInline> then <MathInline>{'3 | (b-a)'}</MathInline></li>
          <li><strong>Transitive:</strong> If <MathInline>{'3 | (a-b)'}</MathInline> and <MathInline>{'3 | (b-c)'}</MathInline> then <MathInline>{'3 | (a-c)'}</MathInline></li>
        </ul>
      </Callout>

      <Callout type="definition">
        <p>
          For an equivalence relation ~ on A, the <strong>equivalence class</strong> of <MathInline>{'a \\in A'}</MathInline> is:
        </p>
        <MathBlock>{'[a] = \\{x \\in A : x \\sim a\\}'}</MathBlock>
        <p className="mt-2">The set of all equivalence classes is called the <strong>quotient set</strong>, denoted <MathInline>{'A/{\\sim}'}</MathInline>.</p>
      </Callout>

      <Callout type="theorem">
        <p>
          <strong>Partition Theorem:</strong> The equivalence classes of an equivalence relation on A form a partition of A.
          Conversely, every partition of A determines an equivalence relation.
        </p>
      </Callout>

      {/* Functions */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Functions</h2>

      <Callout type="definition">
        <p>
          A <strong>function</strong> (or <strong>mapping</strong>) <MathInline>{'f: A \\to B'}</MathInline> is a relation from A to B such that
          for every <MathInline>{'a \\in A'}</MathInline>, there exists exactly one <MathInline>{'b \\in B'}</MathInline> with <MathInline>{'(a, b) \\in f'}</MathInline>.
        </p>
        <p className="mt-2">
          We write <MathInline>{'f(a) = b'}</MathInline> and call:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>A the <strong>domain</strong> of f</li>
          <li>B the <strong>codomain</strong> of f</li>
          <li><MathInline>{'f(A) = \\{f(a) : a \\in A\\}'}</MathInline> the <strong>range</strong> (or image) of f</li>
        </ul>
      </Callout>

      <h3 className="text-xl font-semibold mt-8 mb-4">Types of Functions</h3>

      <CardGrid>
        <Card title="Injective (One-to-One)">
          <p className="text-sm text-dark-300">
            If <MathInline>{'f(a_1) = f(a_2)'}</MathInline> implies <MathInline>{'a_1 = a_2'}</MathInline>
          </p>
          <p className="text-xs text-dark-500 mt-2">Different inputs give different outputs</p>
        </Card>
        <Card title="Surjective (Onto)">
          <p className="text-sm text-dark-300">
            For every <MathInline>{'b \\in B'}</MathInline>, there exists <MathInline>{'a \\in A'}</MathInline> with <MathInline>{'f(a) = b'}</MathInline>
          </p>
          <p className="text-xs text-dark-500 mt-2">Every element of B is hit by f</p>
        </Card>
        <Card title="Bijective (One-to-One Correspondence)">
          <p className="text-sm text-dark-300">
            Both injective and surjective
          </p>
          <p className="text-xs text-dark-500 mt-2">Has an inverse function <MathInline>{'f^{-1}: B \\to A'}</MathInline></p>
        </Card>
      </CardGrid>

      <Callout type="info">
        <p>
          <strong>Why does this matter for algebra?</strong> Bijective functions (bijections) between algebraic structures
          that preserve the operations are called <strong>isomorphisms</strong>. Two structures are "essentially the same"
          if there's an isomorphism between them.
        </p>
      </Callout>

      {/* Key Takeaways */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Takeaways</h2>

      <div className="bg-dark-800 rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">1.</span>
            <span>Sets are collections of distinct objects. Set operations (∪, ∩, −) let us combine sets.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">2.</span>
            <span>Relations describe how elements are connected. Key properties: reflexive, symmetric, antisymmetric, transitive.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">3.</span>
            <span>Equivalence relations (reflexive + symmetric + transitive) partition sets into equivalence classes.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 font-bold">4.</span>
            <span>Functions are special relations. Bijections have inverses and will define "sameness" of algebraic structures.</span>
          </li>
        </ul>
      </div>
    </LessonLayout>
  );
}
