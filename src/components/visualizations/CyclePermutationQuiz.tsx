import { useState } from 'react';

// Difficulty levels
type Difficulty = 'easy' | 'medium' | 'hard';

// Types for quiz questions
type QuestionType =
  | 'cycle_to_mapping'      // Given cycle notation, find where an element maps to
  | 'mapping_to_cycle'      // Given two-line notation, write cycle notation
  | 'compose_cycles'        // Compose two cycles
  | 'find_order'            // Find the order of a permutation
  | 'find_parity'           // Determine if even or odd
  | 'cycle_to_transpositions'; // Write as product of transpositions

interface MultipleChoiceQuestion {
  type: QuestionType;
  responseType: 'multiple_choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface FreeResponseQuestion {
  type: QuestionType;
  responseType: 'free_response';
  question: string;
  correctAnswer: string;
  acceptedAnswers: string[]; // Alternative valid answers
  explanation: string;
}

type Question = MultipleChoiceQuestion | FreeResponseQuestion;

// Utility functions for permutations
function composePerm(a: number[], b: number[]): number[] {
  // a ∘ b means apply b first, then a
  return b.map(x => a[x - 1]);
}

function cycleToPermutation(cycle: number[], n: number): number[] {
  const perm = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = 0; i < cycle.length; i++) {
    const from = cycle[i];
    const to = cycle[(i + 1) % cycle.length];
    perm[from - 1] = to;
  }
  return perm;
}

function multipleCyclesToPermutation(cycles: number[][], n: number): number[] {
  let perm = Array.from({ length: n }, (_, i) => i + 1);
  // Apply cycles from right to left
  for (let i = cycles.length - 1; i >= 0; i--) {
    const cyclePerm = cycleToPermutation(cycles[i], n);
    perm = composePerm(cyclePerm, perm);
  }
  return perm;
}

function permutationToCycles(perm: number[]): number[][] {
  const n = perm.length;
  const visited = new Array(n).fill(false);
  const cycles: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    const cycle: number[] = [];
    let j = i;
    while (!visited[j]) {
      visited[j] = true;
      cycle.push(j + 1);
      j = perm[j] - 1;
    }
    if (cycle.length > 1) {
      cycles.push(cycle);
    }
  }
  return cycles;
}

function cyclesToString(cycles: number[][]): string {
  if (cycles.length === 0) return 'e';
  return cycles.map(c => `(${c.join(' ')})`).join('');
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function orderOfPermutation(cycles: number[][]): number {
  if (cycles.length === 0) return 1;
  return cycles.reduce((acc, cycle) => lcm(acc, cycle.length), 1);
}

function cycleToTranspositions(cycle: number[]): string {
  if (cycle.length <= 1) return 'e';
  const transpositions: string[] = [];
  for (let i = cycle.length - 1; i >= 1; i--) {
    transpositions.push(`(${cycle[0]} ${cycle[i]})`);
  }
  return transpositions.join('');
}

// Shuffle array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate random cycle
function randomCycle(elements: number[], length: number): number[] {
  const shuffled = shuffle(elements);
  return shuffled.slice(0, length);
}

// Question generators
function generateCycleToMappingQuestion(difficulty: Difficulty): FreeResponseQuestion {
  // Easy: S3, single short cycle. Medium: S4-S5. Hard: S5-S6, may have multiple cycles
  const n = difficulty === 'easy' ? 3 : difficulty === 'medium' ? (4 + Math.floor(Math.random() * 2)) : (5 + Math.floor(Math.random() * 2));
  const elements = Array.from({ length: n }, (_, i) => i + 1);

  let cycles: number[][];
  if (difficulty === 'easy') {
    // Single 2 or 3 cycle
    const cycleLength = 2 + Math.floor(Math.random() * 2);
    cycles = [randomCycle(elements, cycleLength)];
  } else if (difficulty === 'medium') {
    // Single cycle of length 2-4
    const cycleLength = 2 + Math.floor(Math.random() * 3);
    cycles = [randomCycle(elements, cycleLength)];
  } else {
    // May have multiple disjoint cycles
    if (Math.random() > 0.5) {
      const cycle1 = randomCycle(elements.slice(0, 3), 2 + Math.floor(Math.random() * 2));
      const remaining = elements.filter(e => !cycle1.includes(e));
      const cycle2 = randomCycle(remaining, Math.min(2, remaining.length));
      cycles = cycle2.length >= 2 ? [cycle1, cycle2] : [cycle1];
    } else {
      cycles = [randomCycle(elements, 3 + Math.floor(Math.random() * 3))];
    }
  }

  const perm = multipleCyclesToPermutation(cycles, n);
  const cycleStr = cyclesToString(cycles);

  // Pick a random element to query
  const queryElement = 1 + Math.floor(Math.random() * n);
  const correctAnswer = perm[queryElement - 1];

  return {
    type: 'cycle_to_mapping',
    responseType: 'free_response',
    question: `In S${n}, if σ = ${cycleStr}, what is σ(${queryElement})?`,
    correctAnswer: correctAnswer.toString(),
    acceptedAnswers: [correctAnswer.toString()],
    explanation: `Apply the permutation: ${queryElement} → ${correctAnswer}.${cycles.length > 1 ? ' Remember to check each cycle.' : ''}`
  };
}

function generateMappingToCycleQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  // Easy: S3, Medium: S4, Hard: S5
  const n = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const numCycles = difficulty === 'easy' ? 1 : (1 + Math.floor(Math.random() * 2));
  const elements = Array.from({ length: n }, (_, i) => i + 1);

  let cycles: number[][] = [];
  let remaining = [...elements];

  for (let i = 0; i < numCycles && remaining.length >= 2; i++) {
    const maxLen = difficulty === 'easy' ? 2 : 3;
    const cycleLen = Math.min(2 + Math.floor(Math.random() * maxLen), remaining.length);
    const cycle = remaining.slice(0, cycleLen);
    cycles.push(cycle);
    remaining = remaining.slice(cycleLen);
  }

  const perm = multipleCyclesToPermutation(cycles, n);
  const correctCycles = permutationToCycles(perm);
  const correctAnswer = cyclesToString(correctCycles);

  // Generate wrong answers
  const wrongAnswers: string[] = [];

  // Wrong: different cycle structure
  if (correctCycles.length === 1 && correctCycles[0].length === 3) {
    wrongAnswers.push(`(${correctCycles[0][0]} ${correctCycles[0][2]} ${correctCycles[0][1]})`);
  }
  if (correctCycles.length === 1 && correctCycles[0].length === 2) {
    const other = elements.filter(e => !correctCycles[0].includes(e));
    if (other.length >= 2) {
      wrongAnswers.push(`(${other[0]} ${other[1]})`);
    }
  }

  // Add some random wrong cycles
  const randomWrong = shuffle(elements);
  wrongAnswers.push(`(${randomWrong[0]} ${randomWrong[1]})`);
  if (randomWrong.length >= 3) {
    wrongAnswers.push(`(${randomWrong[0]} ${randomWrong[1]} ${randomWrong[2]})`);
    wrongAnswers.push(`(${randomWrong[1]} ${randomWrong[2]})`);
    wrongAnswers.push(`(${randomWrong[0]} ${randomWrong[2]})`);
  }
  if (correctAnswer !== 'e') {
    wrongAnswers.push('e');
  }

  const uniqueWrong = [...new Set(wrongAnswers)].filter(w => w !== correctAnswer).slice(0, 3);

  const options = shuffle([correctAnswer, ...uniqueWrong]);

  const header = Array.from({ length: n }, (_, i) => i + 1).join(' ');
  const twoLine = `[${header}] → [${perm.join(' ')}]`;

  return {
    type: 'mapping_to_cycle',
    responseType: 'multiple_choice',
    question: `Write ${twoLine} in cycle notation:`,
    options,
    correctIndex: options.indexOf(correctAnswer),
    explanation: `Following the mappings: ${perm.map((p, i) => `${i+1}→${p}`).join(', ')}. The cycle notation is ${correctAnswer}.`
  };
}

function generateComposeCyclesQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  // Easy: S3 with 2-cycles, Medium: S4, Hard: S5 with longer cycles
  const n = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const elements = Array.from({ length: n }, (_, i) => i + 1);

  let cycle1: number[], cycle2: number[];

  if (difficulty === 'easy') {
    // Two transpositions in S3
    cycle1 = randomCycle(elements, 2);
    const remaining = elements.filter(e => !cycle1.includes(e) || Math.random() > 0.5);
    cycle2 = randomCycle(remaining.length >= 2 ? remaining : elements, 2);
  } else if (difficulty === 'medium') {
    // Mix of 2 and 3 cycles
    cycle1 = randomCycle([1, 2, 3], 2);
    const cycle2Elems = Math.random() > 0.5 ? [1, 2, 3] : [2, 3, 4];
    cycle2 = randomCycle(cycle2Elems, 2 + Math.floor(Math.random() * 2));
  } else {
    // Longer cycles, may overlap
    cycle1 = randomCycle(elements.slice(0, 4), 2 + Math.floor(Math.random() * 2));
    cycle2 = randomCycle(elements.slice(1), 2 + Math.floor(Math.random() * 2));
  }

  const perm1 = cycleToPermutation(cycle1, n);
  const perm2 = cycleToPermutation(cycle2, n);
  const composed = composePerm(perm1, perm2);
  const resultCycles = permutationToCycles(composed);
  const correctAnswer = cyclesToString(resultCycles);

  const cycle1Str = `(${cycle1.join(' ')})`;
  const cycle2Str = `(${cycle2.join(' ')})`;

  // Generate wrong answers
  const wrong1Cycles = permutationToCycles(composePerm(perm2, perm1)); // Wrong order
  const wrong1 = cyclesToString(wrong1Cycles);

  const wrongAnswers = [wrong1];
  // Add some plausible wrong answers
  wrongAnswers.push(`(${cycle1[0]} ${cycle2[0]})`);
  if (cycle1.length > 1 && cycle2.length > 1) {
    wrongAnswers.push(`(${cycle1[0]} ${cycle1[1]} ${cycle2[cycle2.length - 1]})`);
    wrongAnswers.push(`(${cycle1[1]} ${cycle2[0]})`);
  }
  if (correctAnswer !== 'e') {
    wrongAnswers.push('e');
  }

  const uniqueWrong = [...new Set(wrongAnswers)].filter(w => w !== correctAnswer).slice(0, 3);

  const options = shuffle([correctAnswer, ...uniqueWrong]);

  return {
    type: 'compose_cycles',
    responseType: 'multiple_choice',
    question: `Compute ${cycle1Str} ∘ ${cycle2Str} (apply ${cycle2Str} first):`,
    options,
    correctIndex: options.indexOf(correctAnswer),
    explanation: `Apply ${cycle2Str} first, then ${cycle1Str}. Following the mappings gives ${correctAnswer}.`
  };
}

function generateFindOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  // Easy: single cycles, Medium: two disjoint cycles, Hard: complex combinations
  let cycles: number[][];
  let n: number;

  if (difficulty === 'easy') {
    n = 4;
    const easyConfigs = [
      [[1, 2]],           // order 2
      [[1, 2, 3]],        // order 3
      [[1, 2, 3, 4]],     // order 4
    ];
    cycles = easyConfigs[Math.floor(Math.random() * easyConfigs.length)];
  } else if (difficulty === 'medium') {
    n = 5;
    const mediumConfigs = [
      [[1, 2], [3, 4]],       // order 2
      [[1, 2, 3]],            // order 3
      [[1, 2, 3, 4]],         // order 4
      [[1, 2, 3, 4, 5]],      // order 5
    ];
    cycles = mediumConfigs[Math.floor(Math.random() * mediumConfigs.length)];
  } else {
    n = 6;
    const hardConfigs = [
      [[1, 2], [3, 4, 5]],        // order 6
      [[1, 2, 3], [4, 5]],        // order 6
      [[1, 2, 3, 4], [5, 6]],     // order 4
      [[1, 2, 3], [4, 5, 6]],     // order 3
      [[1, 2], [3, 4], [5, 6]],   // order 2
      [[1, 2, 3, 4, 5, 6]],       // order 6
      [[1, 2, 3, 4], [5, 6, 7].slice(0, 2)], // order 4
    ];
    cycles = hardConfigs[Math.floor(Math.random() * hardConfigs.length)];
  }

  const order = orderOfPermutation(cycles);
  const cycleStr = cyclesToString(cycles);
  const lengths = cycles.map(c => c.length);

  return {
    type: 'find_order',
    responseType: 'free_response',
    question: `What is the order of σ = ${cycleStr} in S${n}?`,
    correctAnswer: order.toString(),
    acceptedAnswers: [order.toString()],
    explanation: `The cycle lengths are ${lengths.join(' and ')}. Order = lcm(${lengths.join(', ')}) = ${order}.`
  };
}

function generateFindParityQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  let cycleConfigs: [number[][], 'even' | 'odd'][];

  if (difficulty === 'easy') {
    // Single cycles only
    cycleConfigs = [
      [[[1, 2]], 'odd'],
      [[[1, 2, 3]], 'even'],
      [[[1, 2, 3, 4]], 'odd'],
    ];
  } else if (difficulty === 'medium') {
    // Mix of single and double cycles
    cycleConfigs = [
      [[[1, 2]], 'odd'],
      [[[1, 2, 3]], 'even'],
      [[[1, 2, 3, 4]], 'odd'],
      [[[1, 2], [3, 4]], 'even'],
      [[[1, 2, 3, 4, 5]], 'even'],
    ];
  } else {
    // Complex combinations
    cycleConfigs = [
      [[[1, 2], [3, 4]], 'even'],
      [[[1, 2], [3, 4, 5]], 'odd'],
      [[[1, 2, 3, 4, 5]], 'even'],
      [[[1, 2, 3], [4, 5]], 'odd'],
      [[[1, 2], [3, 4], [5, 6]], 'odd'],
      [[[1, 2, 3], [4, 5, 6]], 'even'],
      [[[1, 2, 3, 4, 5, 6]], 'odd'],
    ];
  }

  const [cycles, parity] = cycleConfigs[Math.floor(Math.random() * cycleConfigs.length)];
  const cycleStr = cyclesToString(cycles);

  const options = ['even', 'odd'];

  let explanation = `A ${cycles[0].length}-cycle is ${cycles[0].length % 2 === 0 ? 'odd' : 'even'} (needs ${cycles[0].length - 1} transposition${cycles[0].length - 1 !== 1 ? 's' : ''}).`;
  if (cycles.length > 1) {
    explanation += ` Combined with ${cycles.slice(1).map(c => `a ${c.length}-cycle (${c.length - 1} transposition${c.length - 1 !== 1 ? 's' : ''})`).join(' and ')}, the total parity is ${parity}.`;
  }

  return {
    type: 'find_parity',
    responseType: 'multiple_choice',
    question: `Is σ = ${cycleStr} an even or odd permutation?`,
    options,
    correctIndex: options.indexOf(parity),
    explanation
  };
}

function generateTranspositionsQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  let cycles: number[][];

  if (difficulty === 'easy') {
    // Only 3-cycles
    cycles = [
      [1, 2, 3],
      [2, 3, 4],
      [1, 3, 4],
    ];
  } else if (difficulty === 'medium') {
    // 3 and 4 cycles
    cycles = [
      [1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4],
      [1, 3, 4],
    ];
  } else {
    // Up to 5-cycles
    cycles = [
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5],
      [1, 3, 4, 5],
    ];
  }

  const cycle = cycles[Math.floor(Math.random() * cycles.length)];
  const cycleStr = `(${cycle.join(' ')})`;
  const correct = cycleToTranspositions(cycle);

  // Generate wrong answers
  const wrongAnswers: string[] = [];
  // Wrong order
  const reversed = [...cycle].reverse();
  wrongAnswers.push(cycleToTranspositions(reversed));
  // Missing one
  if (cycle.length >= 3) {
    wrongAnswers.push(`(${cycle[0]} ${cycle[1]})`);
  }
  // Wrong elements
  if (cycle.length >= 3) {
    wrongAnswers.push(`(${cycle[0]} ${cycle[1]})(${cycle[0]} ${cycle[2]})`);
  }
  // Wrong starting element
  if (cycle.length >= 3) {
    wrongAnswers.push(`(${cycle[1]} ${cycle[2]})(${cycle[1]} ${cycle[0]})`);
  }

  const uniqueWrong = [...new Set(wrongAnswers)].filter(w => w !== correct).slice(0, 3);
  const options = shuffle([correct, ...uniqueWrong]);

  return {
    type: 'cycle_to_transpositions',
    responseType: 'multiple_choice',
    question: `Write ${cycleStr} as a product of transpositions:`,
    options,
    correctIndex: options.indexOf(correct),
    explanation: `${cycleStr} = ${correct}. Read right-to-left: ${cycle.slice(1).reverse().map(e => `swap ${cycle[0]} and ${e}`).join(', then ')}.`
  };
}

// Generate a random question based on difficulty
function generateQuestion(difficulty: Difficulty): Question {
  // Different question type distributions based on difficulty
  let generators: Array<(d: Difficulty) => Question>;

  if (difficulty === 'easy') {
    // Easy: focus on basic questions, more mapping and parity
    generators = [
      generateCycleToMappingQuestion,
      generateCycleToMappingQuestion,
      generateMappingToCycleQuestion,
      generateFindParityQuestion,
      generateFindOrderQuestion,
    ];
  } else if (difficulty === 'medium') {
    // Medium: balanced mix
    generators = [
      generateCycleToMappingQuestion,
      generateMappingToCycleQuestion,
      generateComposeCyclesQuestion,
      generateFindOrderQuestion,
      generateFindParityQuestion,
      generateTranspositionsQuestion,
    ];
  } else {
    // Hard: more complex questions
    generators = [
      generateCycleToMappingQuestion,
      generateMappingToCycleQuestion,
      generateComposeCyclesQuestion,
      generateComposeCyclesQuestion,
      generateFindOrderQuestion,
      generateFindParityQuestion,
      generateTranspositionsQuestion,
      generateTranspositionsQuestion,
    ];
  }

  const generator = generators[Math.floor(Math.random() * generators.length)];
  return generator(difficulty);
}

// Quiz component
export function CyclePermutationQuiz() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);

  const startQuiz = (diff: Difficulty) => {
    setDifficulty(diff);
    setQuestions(Array.from({ length: 10 }, () => generateQuestion(diff)));
    setAnswered(new Array(10).fill(false));
    setQuizStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
  };

  const currentQuestion = questions[currentIndex];

  const handleMultipleChoiceAnswer = (optionIndex: number) => {
    if (showResult) return;
    const q = currentQuestion as MultipleChoiceQuestion;
    const correct = optionIndex === q.correctIndex;

    setSelectedAnswer(optionIndex);
    setShowResult(true);
    setIsCorrect(correct);

    if (correct && !answered[currentIndex]) {
      setScore(s => s + 1);
    }

    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
  };

  const handleFreeResponseSubmit = () => {
    if (showResult || !textAnswer.trim()) return;
    const q = currentQuestion as FreeResponseQuestion;
    const userAnswer = textAnswer.trim().toLowerCase();
    const correct = q.acceptedAnswers.some(a => a.toLowerCase() === userAnswer);

    setShowResult(true);
    setIsCorrect(correct);

    if (correct && !answered[currentIndex]) {
      setScore(s => s + 1);
    }

    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFreeResponseSubmit();
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const prevQuestion = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
  };

  const isComplete = answered.length > 0 && answered.every(a => a);

  // Difficulty selection screen
  if (!quizStarted) {
    return (
      <div className="demo-container">
        <h4 className="text-xl font-semibold mb-6 text-center">Cycle Permutation Quiz</h4>
        <p className="text-dark-300 text-center mb-8">
          Choose your difficulty level to begin:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => startQuiz('easy')}
            className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all group"
          >
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">
              S₃–S₄, single cycles, basic questions
            </div>
          </button>
          <button
            onClick={() => startQuiz('medium')}
            className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">
              S₄–S₅, mixed cycles, all question types
            </div>
          </button>
          <button
            onClick={() => startQuiz('hard')}
            className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all group"
          >
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">
              S₅–S₆, multiple cycles, complex compositions
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Safety check for when quiz hasn't loaded questions yet
  if (!currentQuestion) {
    return <div className="demo-container">Loading...</div>;
  }

  return (
    <div className="demo-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-semibold">Cycle Permutation Quiz</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
            difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400">
            Score: <span className="text-primary-400 font-semibold">{score}</span>/{answered.filter(a => a).length}
          </span>
          <button onClick={resetQuiz} className="btn-ghost text-sm">
            Change Difficulty
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6 justify-center">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setSelectedAnswer(null);
              setTextAnswer('');
              setShowResult(false);
              setIsCorrect(false);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-primary-500 scale-125'
                : answered[i]
                  ? 'bg-green-500'
                  : 'bg-dark-600'
            }`}
            title={q.responseType === 'free_response' ? 'Free response' : 'Multiple choice'}
          />
        ))}
      </div>

      {/* Question */}
      <div className="p-6 bg-dark-800/50 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-dark-400">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded ${
            currentQuestion.responseType === 'free_response'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-purple-500/20 text-purple-400'
          }`}>
            {currentQuestion.responseType === 'free_response' ? 'Type answer' : 'Multiple choice'}
          </span>
        </div>
        <p className="text-lg font-medium text-dark-100 font-mono">
          {currentQuestion.question}
        </p>
      </div>

      {/* Answer area */}
      {currentQuestion.responseType === 'multiple_choice' ? (
        /* Multiple choice options */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((option, i) => {
            const isCorrectOption = i === currentQuestion.correctIndex;
            const isSelected = i === selectedAnswer;

            let bgClass = 'bg-dark-800 hover:bg-dark-700 border-dark-600';
            if (showResult) {
              if (isCorrectOption) {
                bgClass = 'bg-green-500/20 border-green-500';
              } else if (isSelected) {
                bgClass = 'bg-red-500/20 border-red-500';
              }
            } else if (isSelected) {
              bgClass = 'bg-primary-500/20 border-primary-500';
            }

            return (
              <button
                key={i}
                onClick={() => handleMultipleChoiceAnswer(i)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 text-left font-mono transition-all ${bgClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        /* Free response input */
        <div className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={showResult}
              placeholder="Enter your answer..."
              className={`flex-1 px-4 py-3 rounded-lg border-2 bg-dark-800 font-mono text-lg transition-all focus:outline-none ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-red-500 bg-red-500/20'
                  : 'border-dark-600 focus:border-primary-500'
              }`}
            />
            <button
              onClick={handleFreeResponseSubmit}
              disabled={showResult || !textAnswer.trim()}
              className="btn-primary px-6 disabled:opacity-50"
            >
              Check
            </button>
          </div>
          {showResult && !isCorrect && (
            <p className="mt-2 text-sm text-dark-400">
              Correct answer: <span className="font-mono text-green-400">{currentQuestion.correctAnswer}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect
            ? 'bg-green-500/10 border border-green-500/30'
            : 'bg-orange-500/10 border border-orange-500/30'
        }`}>
          <p className={`font-semibold mb-2 ${
            isCorrect ? 'text-green-400' : 'text-orange-400'
          }`}>
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-dark-300 text-sm">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="btn-ghost disabled:opacity-50"
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="btn-primary"
          >
            Next
          </button>
        ) : isComplete ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-primary-400">
              Quiz Complete! Score: {score}/{questions.length}
            </p>
          </div>
        ) : (
          <button
            onClick={nextQuestion}
            disabled
            className="btn-ghost opacity-50"
          >
            Answer all questions
          </button>
        )}
      </div>
    </div>
  );
}

export default CyclePermutationQuiz;
