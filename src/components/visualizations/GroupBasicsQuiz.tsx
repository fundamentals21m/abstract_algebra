import { useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface MultipleChoiceQuestion {
  type: string;
  responseType: 'multiple_choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface FreeResponseQuestion {
  type: string;
  responseType: 'free_response';
  question: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  explanation: string;
}

type Question = MultipleChoiceQuestion | FreeResponseQuestion;

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

// Question: Is operation closed?
function generateClosureQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { set: 'ℤ (integers)', op: 'addition', closed: true, why: 'sum of two integers is always an integer' },
    { set: 'ℤ (integers)', op: 'subtraction', closed: true, why: 'difference of two integers is always an integer' },
    { set: 'ℕ (natural numbers)', op: 'addition', closed: true, why: 'sum of natural numbers is always natural' },
  ] : difficulty === 'medium' ? [
    { set: 'ℕ (natural numbers)', op: 'subtraction', closed: false, why: '2 - 5 = -3 is not a natural number' },
    { set: 'ℤ (integers)', op: 'division', closed: false, why: '1 ÷ 2 = 0.5 is not an integer' },
    { set: 'ℚ* (nonzero rationals)', op: 'multiplication', closed: true, why: 'product of nonzero rationals is nonzero rational' },
  ] : [
    { set: 'odd integers', op: 'addition', closed: false, why: '3 + 5 = 8 is even, not odd' },
    { set: 'odd integers', op: 'multiplication', closed: true, why: 'product of odd numbers is always odd' },
    { set: '{-1, 0, 1}', op: 'multiplication', closed: true, why: 'all products stay in the set' },
    { set: '{-1, 0, 1}', op: 'addition', closed: false, why: '1 + 1 = 2 is not in the set' },
  ];

  const scenario = randomChoice(scenarios);

  return {
    type: 'closure',
    responseType: 'multiple_choice',
    question: `Is ${scenario.set} closed under ${scenario.op}?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.closed ? 0 : 1,
    explanation: scenario.closed
      ? `Yes, ${scenario.set} is closed under ${scenario.op}: ${scenario.why}.`
      : `No, ${scenario.set} is not closed under ${scenario.op}: ${scenario.why}.`
  };
}

// Question: Is operation associative?
function generateAssociativityQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { op: 'addition on ℤ', assoc: true, why: '(a + b) + c = a + (b + c) always' },
    { op: 'multiplication on ℤ', assoc: true, why: '(a · b) · c = a · (b · c) always' },
  ] : difficulty === 'medium' ? [
    { op: 'subtraction on ℤ', assoc: false, why: '(5 - 3) - 2 = 0 but 5 - (3 - 2) = 4' },
    { op: 'division on ℚ*', assoc: false, why: '(8 ÷ 4) ÷ 2 = 1 but 8 ÷ (4 ÷ 2) = 4' },
  ] : [
    { op: 'exponentiation on ℕ', assoc: false, why: '(2³)² = 64 but 2^(3²) = 512' },
    { op: 'a * b = (a + b)/2 on ℚ', assoc: false, why: '(0 * 2) * 4 = 1 * 4 = 2.5 but 0 * (2 * 4) = 0 * 3 = 1.5' },
    { op: 'matrix multiplication', assoc: true, why: '(AB)C = A(BC) for all matrices where products are defined' },
  ];

  const scenario = randomChoice(scenarios);

  return {
    type: 'associativity',
    responseType: 'multiple_choice',
    question: `Is ${scenario.op} associative?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.assoc ? 0 : 1,
    explanation: scenario.assoc
      ? `Yes, ${scenario.op} is associative: ${scenario.why}.`
      : `No, ${scenario.op} is not associative: ${scenario.why}.`
  };
}

// Question: What is the identity element?
function generateIdentityQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    const scenarios = [
      { set: 'ℤ under addition', identity: '0', why: 'a + 0 = 0 + a = a for all a' },
      { set: 'ℤ under multiplication', identity: '1', why: 'a · 1 = 1 · a = a for all a' },
      { set: 'ℝ* under multiplication', identity: '1', why: 'a · 1 = 1 · a = a for all a ≠ 0' },
    ];
    const scenario = randomChoice(scenarios);
    return {
      type: 'identity',
      responseType: 'free_response',
      question: `What is the identity element for ${scenario.set}?`,
      correctAnswer: scenario.identity,
      acceptedAnswers: [scenario.identity],
      explanation: `The identity is ${scenario.identity} because ${scenario.why}.`
    };
  } else {
    const scenarios = [
      { set: 'functions under composition', identity: 'identity function (f(x) = x)', options: ['f(x) = x', 'f(x) = 0', 'f(x) = 1', 'No identity exists'], correct: 0 },
      { set: 'n×n matrices under multiplication', identity: 'identity matrix I', options: ['Zero matrix', 'Identity matrix I', 'Any diagonal matrix', 'No identity exists'], correct: 1 },
      { set: 'ℤ under subtraction', identity: 'none', options: ['0', '1', '-1', 'No identity exists'], correct: 3 },
    ];
    const scenario = randomChoice(scenarios);
    return {
      type: 'identity',
      responseType: 'multiple_choice',
      question: `What is the identity element for ${scenario.set}?`,
      options: scenario.options,
      correctIndex: scenario.correct,
      explanation: scenario.correct === 3
        ? `There is no identity: subtraction is not even associative, so it cannot form a group.`
        : `The identity is ${scenario.options[scenario.correct]}.`
    };
  }
}

// Question: What is the inverse?
function generateInverseQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { context: 'ℤ under addition', element: '5', inverse: '-5', why: '5 + (-5) = 0' },
    { context: 'ℤ under addition', element: '-3', inverse: '3', why: '-3 + 3 = 0' },
    { context: 'ℚ* under multiplication', element: '2', inverse: '1/2', why: '2 · (1/2) = 1' },
  ] : difficulty === 'medium' ? [
    { context: 'ℚ* under multiplication', element: '-4', inverse: '-1/4', why: '(-4) · (-1/4) = 1' },
    { context: 'ℤ under addition', element: '0', inverse: '0', why: '0 + 0 = 0 (identity is its own inverse)' },
    { context: 'ℚ* under multiplication', element: '3/5', inverse: '5/3', why: '(3/5) · (5/3) = 1' },
  ] : [
    { context: 'ℚ* under multiplication', element: '-2/7', inverse: '-7/2', why: '(-2/7) · (-7/2) = 1' },
    { context: 'ℤ₁₂ under addition', element: '5', inverse: '7', why: '5 + 7 ≡ 0 (mod 12)' },
    { context: 'ℤ₁₀ under addition', element: '3', inverse: '7', why: '3 + 7 ≡ 0 (mod 10)' },
  ];

  const scenario = randomChoice(scenarios);

  return {
    type: 'inverse',
    responseType: 'free_response',
    question: `In ${scenario.context}, what is the inverse of ${scenario.element}?`,
    correctAnswer: scenario.inverse,
    acceptedAnswers: [scenario.inverse, scenario.inverse.replace('/', '÷')],
    explanation: `The inverse is ${scenario.inverse} because ${scenario.why}.`
  };
}

// Question: Is this a group?
function generateIsGroupQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { set: '(ℤ, +)', isGroup: true, why: 'closed, associative, identity 0, every element has additive inverse' },
    { set: '(ℕ, +)', isGroup: false, why: 'no inverses: there is no natural number n with 5 + n = 0' },
  ] : difficulty === 'medium' ? [
    { set: '(ℤ, ·)', isGroup: false, why: 'most elements lack inverses: 2 has no integer inverse' },
    { set: '(ℚ*, ·)', isGroup: true, why: 'closed, associative, identity 1, every nonzero rational has reciprocal' },
    { set: '(ℤ, −)', isGroup: false, why: 'subtraction is not associative' },
  ] : [
    { set: '({1, -1}, ·)', isGroup: true, why: 'closed, associative, identity 1, each element is its own inverse' },
    { set: '(2ℤ, +) even integers', isGroup: true, why: 'closed, associative, identity 0, -2n is inverse of 2n' },
    { set: '(odd integers, +)', isGroup: false, why: 'not closed: 3 + 5 = 8 is even' },
    { set: '({0, 1, 2}, + mod 3)', isGroup: true, why: 'this is ℤ₃, a cyclic group of order 3' },
  ];

  const scenario = randomChoice(scenarios);

  return {
    type: 'is_group',
    responseType: 'multiple_choice',
    question: `Is ${scenario.set} a group?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.isGroup ? 0 : 1,
    explanation: scenario.isGroup
      ? `Yes: ${scenario.why}.`
      : `No: ${scenario.why}.`
  };
}

// Question: Which axiom fails?
function generateAxiomFailureQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = [
    { set: '(ℕ, +)', fails: 'Inverses', why: 'no natural number n satisfies 1 + n = 0' },
    { set: '(ℤ, ·)', fails: 'Inverses', why: '2 has no integer multiplicative inverse' },
    { set: '(ℤ, −)', fails: 'Associativity', why: '(5-3)-2 ≠ 5-(3-2)' },
    { set: '(ℚ, ÷)', fails: 'Associativity', why: '(8÷4)÷2 ≠ 8÷(4÷2)' },
    { set: '(odd integers, +)', fails: 'Closure', why: '3 + 5 = 8 is not odd' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(['Closure', 'Associativity', 'Identity', 'Inverses']);

  return {
    type: 'axiom_failure',
    responseType: 'multiple_choice',
    question: `Which group axiom fails for ${scenario.set}?`,
    options,
    correctIndex: options.indexOf(scenario.fails),
    explanation: `${scenario.fails} fails: ${scenario.why}.`
  };
}

// Question: Set cardinality
function generateCardinalityQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { set: '{a, b, c}', card: '3' },
    { set: '{1, 2, 3, 4, 5}', card: '5' },
    { set: '∅ (empty set)', card: '0' },
  ] : difficulty === 'medium' ? [
    { set: 'power set of {a, b}', card: '4' },
    { set: 'power set of {1, 2, 3}', card: '8' },
    { set: '{x ∈ ℤ : -2 ≤ x ≤ 2}', card: '5' },
  ] : [
    { set: 'power set of a 4-element set', card: '16' },
    { set: '{x ∈ ℤ : x² < 10}', card: '7' },
    { set: 'ℤ₆ (integers mod 6)', card: '6' },
  ];

  const scenario = randomChoice(scenarios);

  return {
    type: 'cardinality',
    responseType: 'free_response',
    question: `What is the cardinality of ${scenario.set}?`,
    correctAnswer: scenario.card,
    acceptedAnswers: [scenario.card],
    explanation: `|${scenario.set}| = ${scenario.card}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = difficulty === 'easy' ? [
    generateClosureQuestion,
    generateIdentityQuestion,
    generateInverseQuestion,
    generateCardinalityQuestion,
    generateIsGroupQuestion,
  ] : difficulty === 'medium' ? [
    generateClosureQuestion,
    generateAssociativityQuestion,
    generateIdentityQuestion,
    generateInverseQuestion,
    generateIsGroupQuestion,
    generateAxiomFailureQuestion,
  ] : [
    generateClosureQuestion,
    generateAssociativityQuestion,
    generateIdentityQuestion,
    generateInverseQuestion,
    generateIsGroupQuestion,
    generateAxiomFailureQuestion,
    generateCardinalityQuestion,
  ];

  const generator = randomChoice(generators);
  return generator(difficulty);
}

export function GroupBasicsQuiz() {
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
    if (correct && !answered[currentIndex]) setScore(s => s + 1);
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
    if (correct && !answered[currentIndex]) setScore(s => s + 1);
    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleFreeResponseSubmit();
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1);
  };

  const prevQuestion = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const resetQuiz = () => setQuizStarted(false);
  const isComplete = answered.length > 0 && answered.every(a => a);

  if (!quizStarted) {
    return (
      <div className="demo-container">
        <h4 className="text-xl font-semibold mb-6 text-center">Group Basics Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your understanding of sets, operations, and group axioms:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Closure, identity, inverses</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">All axioms, is it a group?</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Which axiom fails?</div>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return <div className="demo-container">Loading...</div>;

  return (
    <div className="demo-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-semibold">Group Basics Quiz</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400">Score: <span className="text-primary-400 font-semibold">{score}</span>/{answered.filter(a => a).length}</span>
          <button onClick={resetQuiz} className="btn-ghost text-sm">Change Difficulty</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 justify-center">
        {questions.map((_, i) => (
          <button key={i} onClick={() => { setCurrentIndex(i); setSelectedAnswer(null); setTextAnswer(''); setShowResult(false); setIsCorrect(false); }}
            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-primary-500 scale-125' : answered[i] ? 'bg-green-500' : 'bg-dark-600'}`} />
        ))}
      </div>

      <div className="p-6 bg-dark-800/50 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-dark-400">Question {currentIndex + 1} of {questions.length}</p>
          <span className={`text-xs px-2 py-0.5 rounded ${currentQuestion.responseType === 'free_response' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
            {currentQuestion.responseType === 'free_response' ? 'Type answer' : 'Multiple choice'}
          </span>
        </div>
        <p className="text-lg font-medium text-dark-100">{currentQuestion.question}</p>
      </div>

      {currentQuestion.responseType === 'multiple_choice' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((option, i) => {
            const isCorrectOption = i === currentQuestion.correctIndex;
            const isSelected = i === selectedAnswer;
            let bgClass = 'bg-dark-800 hover:bg-dark-700 border-dark-600';
            if (showResult) {
              if (isCorrectOption) bgClass = 'bg-green-500/20 border-green-500';
              else if (isSelected) bgClass = 'bg-red-500/20 border-red-500';
            } else if (isSelected) bgClass = 'bg-primary-500/20 border-primary-500';
            return (
              <button key={i} onClick={() => handleMultipleChoiceAnswer(i)} disabled={showResult}
                className={`p-4 rounded-lg border-2 text-left transition-all ${bgClass}`}>{option}</button>
            );
          })}
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex gap-3">
            <input type="text" value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} onKeyDown={handleKeyDown} disabled={showResult}
              placeholder="Enter your answer..." className={`flex-1 px-4 py-3 rounded-lg border-2 bg-dark-800 font-mono text-lg transition-all focus:outline-none ${showResult ? (isCorrect ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20') : 'border-dark-600 focus:border-primary-500'}`} />
            <button onClick={handleFreeResponseSubmit} disabled={showResult || !textAnswer.trim()} className="btn-primary px-6 disabled:opacity-50">Check</button>
          </div>
          {showResult && !isCorrect && <p className="mt-2 text-sm text-dark-400">Correct answer: <span className="font-mono text-green-400">{currentQuestion.correctAnswer}</span></p>}
        </div>
      )}

      {showResult && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
          <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>{isCorrect ? 'Correct!' : 'Not quite.'}</p>
          <p className="text-dark-300 text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={prevQuestion} disabled={currentIndex === 0} className="btn-ghost disabled:opacity-50">Previous</button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={nextQuestion} className="btn-primary">Next</button>
        ) : isComplete ? (
          <p className="text-lg font-semibold text-primary-400">Quiz Complete! Score: {score}/{questions.length}</p>
        ) : (
          <button disabled className="btn-ghost opacity-50">Answer all questions</button>
        )}
      </div>
    </div>
  );
}

export default GroupBasicsQuiz;
