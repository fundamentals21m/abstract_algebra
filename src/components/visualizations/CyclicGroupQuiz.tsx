import { useState } from 'react';

// Difficulty levels
type Difficulty = 'easy' | 'medium' | 'hard';

// Types for quiz questions
type QuestionType =
  | 'find_element_order'    // What is the order of k in ℤₙ?
  | 'is_generator'          // Is k a generator of ℤₙ?
  | 'count_generators'      // How many generators does ℤₙ have?
  | 'compute_gcd'           // What is gcd(a, b)?
  | 'compute_totient'       // What is φ(n)?
  | 'count_subgroups'       // How many subgroups does ℤₙ have?
  | 'find_generator';       // Which element generates the subgroup of order d?

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
  acceptedAnswers: string[];
  explanation: string;
}

type Question = MultipleChoiceQuestion | FreeResponseQuestion;

// Utility functions
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function totient(n: number): number {
  let result = n;
  let p = 2;
  let temp = n;
  while (p * p <= temp) {
    if (temp % p === 0) {
      while (temp % p === 0) {
        temp = Math.floor(temp / p);
      }
      result -= Math.floor(result / p);
    }
    p++;
  }
  if (temp > 1) {
    result -= Math.floor(result / temp);
  }
  return result;
}

function getDivisors(n: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

function orderInZn(k: number, n: number): number {
  if (k === 0) return 1;
  return n / gcd(k, n);
}

function isGenerator(k: number, n: number): boolean {
  return gcd(k, n) === 1;
}

function getGenerators(n: number): number[] {
  const gens: number[] = [];
  for (let k = 1; k < n; k++) {
    if (gcd(k, n) === 1) {
      gens.push(k);
    }
  }
  return gens;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Question generators

function generateFindElementOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  let n: number, k: number;

  if (difficulty === 'easy') {
    n = randomChoice([6, 8, 10]);
    k = randomChoice([1, 2, 3, 4, 5].filter(x => x < n));
  } else if (difficulty === 'medium') {
    n = randomChoice([12, 15, 18]);
    k = 1 + Math.floor(Math.random() * (n - 1));
  } else {
    n = randomChoice([20, 24, 30]);
    k = 1 + Math.floor(Math.random() * (n - 1));
  }

  const order = orderInZn(k, n);
  const g = gcd(k, n);

  return {
    type: 'find_element_order',
    responseType: 'free_response',
    question: `What is the order of ${k} in ℤ₁${n >= 10 ? String(n).slice(1) : ''}${n < 10 ? n : String(n).slice(0, 1) + '₀' + (n >= 20 ? String(n).slice(1) : '')}`.replace(/ℤ₁[0-9₀-₉]*/g, `ℤ${subscript(n)}`),
    correctAnswer: order.toString(),
    acceptedAnswers: [order.toString()],
    explanation: `Order of ${k} in ℤ${subscript(n)} = ${n} / gcd(${k}, ${n}) = ${n} / ${g} = ${order}.`
  };
}

function subscript(n: number): string {
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return String(n).split('').map(c => subscripts[c] || c).join('');
}

function generateIsGeneratorQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  let n: number, k: number;

  if (difficulty === 'easy') {
    n = randomChoice([6, 8, 10]);
    k = 1 + Math.floor(Math.random() * (n - 1));
  } else if (difficulty === 'medium') {
    n = randomChoice([12, 15, 18]);
    k = 1 + Math.floor(Math.random() * (n - 1));
  } else {
    n = randomChoice([20, 24, 30]);
    k = 1 + Math.floor(Math.random() * (n - 1));
  }

  const isGen = isGenerator(k, n);
  const g = gcd(k, n);

  return {
    type: 'is_generator',
    responseType: 'multiple_choice',
    question: `Is ${k} a generator of ℤ${subscript(n)}?`,
    options: ['Yes', 'No'],
    correctIndex: isGen ? 0 : 1,
    explanation: `gcd(${k}, ${n}) = ${g}. ${isGen ? `Since gcd = 1, ${k} is a generator.` : `Since gcd ≠ 1, ${k} is not a generator.`}`
  };
}

function generateCountGeneratorsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  let n: number;

  if (difficulty === 'easy') {
    n = randomChoice([4, 5, 6, 8]);
  } else if (difficulty === 'medium') {
    n = randomChoice([10, 12, 15]);
  } else {
    n = randomChoice([18, 20, 24]);
  }

  const phi = totient(n);

  return {
    type: 'count_generators',
    responseType: 'free_response',
    question: `How many generators does ℤ${subscript(n)} have?`,
    correctAnswer: phi.toString(),
    acceptedAnswers: [phi.toString()],
    explanation: `The number of generators of ℤ${subscript(n)} is φ(${n}) = ${phi}.`
  };
}

function generateComputeGcdQuestion(difficulty: Difficulty): FreeResponseQuestion {
  let a: number, b: number;

  if (difficulty === 'easy') {
    a = randomChoice([6, 8, 10, 12]);
    b = randomChoice([2, 3, 4, 6]);
  } else if (difficulty === 'medium') {
    a = randomChoice([12, 15, 18, 20, 24]);
    b = randomChoice([4, 6, 8, 9, 10]);
  } else {
    a = randomChoice([24, 30, 36, 42, 48]);
    b = randomChoice([8, 12, 14, 15, 16, 18]);
  }

  // Ensure a > b for nicer presentation
  if (b > a) [a, b] = [b, a];

  const g = gcd(a, b);

  return {
    type: 'compute_gcd',
    responseType: 'free_response',
    question: `What is gcd(${a}, ${b})?`,
    correctAnswer: g.toString(),
    acceptedAnswers: [g.toString()],
    explanation: `gcd(${a}, ${b}) = ${g}. ${a} = ${Math.floor(a/g)} × ${g}, ${b} = ${Math.floor(b/g)} × ${g}.`
  };
}

function generateComputeTotientQuestion(difficulty: Difficulty): FreeResponseQuestion {
  let n: number;

  if (difficulty === 'easy') {
    n = randomChoice([4, 5, 6, 8, 9]);
  } else if (difficulty === 'medium') {
    n = randomChoice([10, 12, 14, 15, 16]);
  } else {
    n = randomChoice([18, 20, 21, 24, 25]);
  }

  const phi = totient(n);

  // Generate explanation based on prime factorization
  let explanation = `φ(${n}) = ${phi}. `;
  const coprimes = [];
  for (let i = 1; i < n; i++) {
    if (gcd(i, n) === 1) coprimes.push(i);
  }
  if (coprimes.length <= 8) {
    explanation += `Numbers coprime to ${n}: {${coprimes.join(', ')}}.`;
  }

  return {
    type: 'compute_totient',
    responseType: 'free_response',
    question: `What is φ(${n})?`,
    correctAnswer: phi.toString(),
    acceptedAnswers: [phi.toString()],
    explanation
  };
}

function generateCountSubgroupsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  let n: number;

  if (difficulty === 'easy') {
    n = randomChoice([4, 6, 8, 9]);
  } else if (difficulty === 'medium') {
    n = randomChoice([10, 12, 15, 16]);
  } else {
    n = randomChoice([18, 20, 24, 30]);
  }

  const divisors = getDivisors(n);
  const count = divisors.length;

  return {
    type: 'count_subgroups',
    responseType: 'free_response',
    question: `How many subgroups does ℤ${subscript(n)} have?`,
    correctAnswer: count.toString(),
    acceptedAnswers: [count.toString()],
    explanation: `ℤ${subscript(n)} has one subgroup for each divisor of ${n}. Divisors: {${divisors.join(', ')}}. Count: ${count}.`
  };
}

function generateFindGeneratorQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  let n: number;

  if (difficulty === 'easy') {
    n = randomChoice([6, 8, 10]);
  } else if (difficulty === 'medium') {
    n = randomChoice([12, 15, 18]);
  } else {
    n = randomChoice([20, 24, 30]);
  }

  const divisors = getDivisors(n).filter(d => d > 1 && d < n);
  const d = randomChoice(divisors);
  const generator = n / d;

  // Generate wrong answers
  const wrongAnswers: number[] = [];
  for (let i = 1; i < n; i++) {
    if (i !== generator && orderInZn(i, n) !== d) {
      wrongAnswers.push(i);
    }
  }

  const selectedWrong = shuffle(wrongAnswers).slice(0, 3);
  const options = shuffle([generator.toString(), ...selectedWrong.map(x => x.toString())]);

  return {
    type: 'find_generator',
    responseType: 'multiple_choice',
    question: `In ℤ${subscript(n)}, which element generates the unique subgroup of order ${d}?`,
    options,
    correctIndex: options.indexOf(generator.toString()),
    explanation: `The subgroup of order ${d} in ℤ${subscript(n)} is ⟨${generator}⟩ = ⟨${n}/${d}⟩.`
  };
}

function generateWhichAreGeneratorsQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  let n: number;

  if (difficulty === 'easy') {
    n = randomChoice([6, 8, 10]);
  } else if (difficulty === 'medium') {
    n = 12;
  } else {
    n = randomChoice([15, 18, 20]);
  }

  const generators = getGenerators(n);
  const nonGenerators = [];
  for (let i = 1; i < n; i++) {
    if (!generators.includes(i)) nonGenerators.push(i);
  }

  // Create options - one correct (all generators) and others with mistakes
  const correctOption = generators.slice(0, Math.min(4, generators.length)).join(', ');

  // Wrong: include a non-generator
  const wrong1Elements = [...generators.slice(0, 2), randomChoice(nonGenerators)].sort((a, b) => a - b);
  const wrong1 = wrong1Elements.join(', ');

  // Wrong: only non-generators
  const wrong2Elements = shuffle(nonGenerators).slice(0, 3).sort((a, b) => a - b);
  const wrong2 = wrong2Elements.join(', ');

  // Wrong: missing some generators
  const wrong3Elements = generators.slice(0, Math.max(1, generators.length - 2));
  const wrong3 = wrong3Elements.join(', ');

  const options = shuffle([correctOption, wrong1, wrong2, wrong3]);

  return {
    type: 'find_generator',
    responseType: 'multiple_choice',
    question: `Which of the following lists contains only generators of ℤ${subscript(n)}?`,
    options,
    correctIndex: options.indexOf(correctOption),
    explanation: `The generators of ℤ${subscript(n)} are elements k where gcd(k, ${n}) = 1: {${generators.join(', ')}}.`
  };
}

// Generate a random question based on difficulty
function generateQuestion(difficulty: Difficulty): Question {
  let generators: Array<(d: Difficulty) => Question>;

  if (difficulty === 'easy') {
    generators = [
      generateFindElementOrderQuestion,
      generateFindElementOrderQuestion,
      generateIsGeneratorQuestion,
      generateComputeGcdQuestion,
      generateComputeGcdQuestion,
      generateCountSubgroupsQuestion,
    ];
  } else if (difficulty === 'medium') {
    generators = [
      generateFindElementOrderQuestion,
      generateIsGeneratorQuestion,
      generateCountGeneratorsQuestion,
      generateComputeGcdQuestion,
      generateComputeTotientQuestion,
      generateCountSubgroupsQuestion,
      generateFindGeneratorQuestion,
    ];
  } else {
    generators = [
      generateFindElementOrderQuestion,
      generateIsGeneratorQuestion,
      generateCountGeneratorsQuestion,
      generateComputeTotientQuestion,
      generateComputeTotientQuestion,
      generateCountSubgroupsQuestion,
      generateFindGeneratorQuestion,
      generateWhichAreGeneratorsQuestion,
    ];
  }

  const generator = generators[Math.floor(Math.random() * generators.length)];
  return generator(difficulty);
}

// Quiz component
export function CyclicGroupQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Cyclic Groups Quiz</h4>
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
              ℤ₆, ℤ₈, ℤ₁₀ — basic order and gcd
            </div>
          </button>
          <button
            onClick={() => startQuiz('medium')}
            className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">
              ℤ₁₂, ℤ₁₅, ℤ₁₈ — totient and subgroups
            </div>
          </button>
          <button
            onClick={() => startQuiz('hard')}
            className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all group"
          >
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">
              ℤ₂₀, ℤ₂₄, ℤ₃₀ — all question types
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Safety check
  if (!currentQuestion) {
    return <div className="demo-container">Loading...</div>;
  }

  return (
    <div className="demo-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-semibold">Cyclic Groups Quiz</h4>
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
        <p className="text-lg font-medium text-dark-100">
          {currentQuestion.question}
        </p>
      </div>

      {/* Answer area */}
      {currentQuestion.responseType === 'multiple_choice' ? (
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

export default CyclicGroupQuiz;
