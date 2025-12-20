import { useState } from 'react';

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
function generateCycleToMappingQuestion(): FreeResponseQuestion {
  const n = 4 + Math.floor(Math.random() * 2); // 4 or 5
  const cycleLength = 2 + Math.floor(Math.random() * (n - 1)); // 2 to n
  const elements = Array.from({ length: n }, (_, i) => i + 1);
  const cycle = randomCycle(elements, cycleLength);

  const queryElement = cycle[Math.floor(Math.random() * cycle.length)];
  const nextIndex = (cycle.indexOf(queryElement) + 1) % cycle.length;
  const correctAnswer = cycle[nextIndex];

  const cycleStr = `(${cycle.join(' ')})`;

  return {
    type: 'cycle_to_mapping',
    responseType: 'free_response',
    question: `In S${n}, if σ = ${cycleStr}, what is σ(${queryElement})?`,
    correctAnswer: correctAnswer.toString(),
    acceptedAnswers: [correctAnswer.toString()],
    explanation: `In the cycle ${cycleStr}, each element maps to the next one. So ${queryElement} → ${correctAnswer}.`
  };
}

function generateMappingToCycleQuestion(): MultipleChoiceQuestion {
  const n = 4;
  // Generate a random permutation with 1-2 non-trivial cycles
  const numCycles = 1 + Math.floor(Math.random() * 2);
  const elements = Array.from({ length: n }, (_, i) => i + 1);

  let cycles: number[][] = [];
  let remaining = [...elements];

  for (let i = 0; i < numCycles && remaining.length >= 2; i++) {
    const cycleLen = Math.min(2 + Math.floor(Math.random() * 2), remaining.length);
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
  wrongAnswers.push(`(${randomWrong[0]} ${randomWrong[1]} ${randomWrong[2]})`);
  wrongAnswers.push(`(${randomWrong[1]} ${randomWrong[2]})`);
  wrongAnswers.push(`(${randomWrong[0]} ${randomWrong[2]})`);
  if (correctAnswer !== 'e') {
    wrongAnswers.push('e');
  }

  const uniqueWrong = [...new Set(wrongAnswers)].filter(w => w !== correctAnswer).slice(0, 3);

  const options = shuffle([correctAnswer, ...uniqueWrong]);

  const twoLine = `[1 2 3 4] → [${perm.join(' ')}]`;

  return {
    type: 'mapping_to_cycle',
    responseType: 'multiple_choice',
    question: `Write ${twoLine} in cycle notation:`,
    options,
    correctIndex: options.indexOf(correctAnswer),
    explanation: `Following the mappings: ${perm.map((p, i) => `${i+1}→${p}`).join(', ')}. The cycle notation is ${correctAnswer}.`
  };
}

function generateComposeCyclesQuestion(): MultipleChoiceQuestion {
  const n = 4;
  // Generate two simple cycles
  const cycle1 = randomCycle([1, 2, 3], 2);
  const cycle2Elems = Math.random() > 0.5 ? [1, 2, 3] : [2, 3, 4];
  const cycle2 = randomCycle(cycle2Elems, 2);

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
  wrongAnswers.push(`(${cycle1[0]} ${cycle1[1]} ${cycle2[1]})`);
  wrongAnswers.push(`(${cycle1[1]} ${cycle2[0]})`);
  wrongAnswers.push(`(${cycle1[0]} ${cycle2[1]})`);
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

function generateFindOrderQuestion(): FreeResponseQuestion {
  const n = 5;
  // Generate a permutation with interesting order
  const cycleConfigs = [
    [[1, 2], [3, 4, 5]],      // order 6
    [[1, 2, 3], [4, 5]],      // order 6
    [[1, 2, 3, 4]],           // order 4
    [[1, 2, 3]],              // order 3
    [[1, 2], [3, 4]],         // order 2
    [[1, 2, 3, 4, 5]],        // order 5
  ];

  const cycles = cycleConfigs[Math.floor(Math.random() * cycleConfigs.length)];
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

function generateFindParityQuestion(): MultipleChoiceQuestion {
  const cycleConfigs: [number[][], 'even' | 'odd'][] = [
    [[[1, 2]], 'odd'],
    [[[1, 2, 3]], 'even'],
    [[[1, 2, 3, 4]], 'odd'],
    [[[1, 2], [3, 4]], 'even'],
    [[[1, 2], [3, 4, 5]], 'odd'],
    [[[1, 2, 3, 4, 5]], 'even'],
    [[[1, 2, 3], [4, 5]], 'odd'],
  ];

  const [cycles, parity] = cycleConfigs[Math.floor(Math.random() * cycleConfigs.length)];
  const cycleStr = cyclesToString(cycles);

  const options = ['even', 'odd'];

  return {
    type: 'find_parity',
    responseType: 'multiple_choice',
    question: `Is σ = ${cycleStr} an even or odd permutation?`,
    options,
    correctIndex: options.indexOf(parity),
    explanation: `A ${cycles[0].length}-cycle is ${cycles[0].length % 2 === 0 ? 'odd' : 'even'}. ${cycles.length > 1 ? `Combined with ${cycles.slice(1).map(c => `a ${c.length}-cycle`).join(' and ')}, the total parity is ${parity}.` : ''}`
  };
}

function generateTranspositionsQuestion(): MultipleChoiceQuestion {
  const cycles: number[][] = [
    [1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4],
    [1, 3, 4],
  ];

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
  wrongAnswers.push(`(${cycle[0]} ${cycle[1]})(${cycle[0]} ${cycle[2] || cycle[1]})`);

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

// Generate a random question
function generateQuestion(): Question {
  const generators = [
    generateCycleToMappingQuestion,
    generateMappingToCycleQuestion,
    generateComposeCyclesQuestion,
    generateFindOrderQuestion,
    generateFindParityQuestion,
    generateTranspositionsQuestion,
  ];

  const generator = generators[Math.floor(Math.random() * generators.length)];
  return generator();
}

// Quiz component
export function CyclePermutationQuiz() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    Array.from({ length: 10 }, generateQuestion)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(() => new Array(10).fill(false));

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
    setQuestions(Array.from({ length: 10 }, generateQuestion));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setAnswered(new Array(10).fill(false));
  };

  const isComplete = answered.every(a => a);

  return (
    <div className="demo-container">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold">Cycle Permutation Quiz</h4>
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400">
            Score: <span className="text-primary-400 font-semibold">{score}</span>/{answered.filter(a => a).length}
          </span>
          <button onClick={resetQuiz} className="btn-ghost text-sm">
            New Quiz
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
