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

// Count abelian groups of given order
function generateCountGroupsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  // Number of abelian groups of order n = product of partition numbers for each prime power
  const scenarios = difficulty === 'easy' ? [
    { n: 4, count: '2', why: '4 = 2², partitions of 2: (2), (1,1) → ℤ₄, ℤ₂×ℤ₂' },
    { n: 6, count: '1', why: '6 = 2·3, only one: ℤ₆ ≅ ℤ₂×ℤ₃' },
    { n: 8, count: '3', why: '8 = 2³, partitions of 3: (3), (2,1), (1,1,1)' },
  ] : difficulty === 'medium' ? [
    { n: 12, count: '2', why: '12 = 4·3 = 2²·3, partitions of 2 give 2 groups' },
    { n: 16, count: '5', why: '16 = 2⁴, partitions of 4: 5 total' },
    { n: 36, count: '4', why: '36 = 4·9 = 2²·3², 2×2 = 4 groups' },
  ] : [
    { n: 72, count: '6', why: '72 = 8·9 = 2³·3², 3×2 = 6 groups' },
    { n: 100, count: '4', why: '100 = 4·25 = 2²·5², 2×2 = 4 groups' },
    { n: 48, count: '5', why: '48 = 16·3 = 2⁴·3, 5×1 = 5 groups' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'count_groups',
    responseType: 'free_response',
    question: `How many non-isomorphic abelian groups of order ${scenario.n} exist?`,
    correctAnswer: scenario.count,
    acceptedAnswers: [scenario.count],
    explanation: scenario.why
  };
}

// Identify if groups are isomorphic
function generateIsomorphismQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { g1: 'ℤ₆', g2: 'ℤ₂ × ℤ₃', iso: true, why: 'gcd(2,3) = 1, so ℤ₂ × ℤ₃ ≅ ℤ₆' },
    { g1: 'ℤ₄', g2: 'ℤ₂ × ℤ₂', iso: false, why: 'ℤ₄ has element of order 4, ℤ₂×ℤ₂ does not' },
  ] : difficulty === 'medium' ? [
    { g1: 'ℤ₁₂', g2: 'ℤ₄ × ℤ₃', iso: true, why: 'gcd(4,3) = 1' },
    { g1: 'ℤ₁₂', g2: 'ℤ₆ × ℤ₂', iso: false, why: 'ℤ₁₂ has element of order 12, ℤ₆×ℤ₂ does not' },
    { g1: 'ℤ₂ × ℤ₂ × ℤ₂', g2: 'ℤ₄ × ℤ₂', iso: false, why: 'different max element orders: 2 vs 4' },
  ] : [
    { g1: 'ℤ₃₀', g2: 'ℤ₂ × ℤ₃ × ℤ₅', iso: true, why: 'pairwise coprime factors' },
    { g1: 'ℤ₄ × ℤ₆', g2: 'ℤ₂ × ℤ₁₂', iso: true, why: 'both have invariant factors 2, 12' },
    { g1: 'ℤ₈ × ℤ₂', g2: 'ℤ₄ × ℤ₄', iso: false, why: 'different elementary divisors' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'isomorphism',
    responseType: 'multiple_choice',
    question: `Are ${scenario.g1} and ${scenario.g2} isomorphic?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.iso ? 0 : 1,
    explanation: scenario.iso ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Convert between forms
function generateConversionQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      from: 'ℤ₁₂ (invariant)',
      to: 'elementary divisors',
      answer: 'ℤ₄ × ℤ₃',
      wrong: ['ℤ₆ × ℤ₂', 'ℤ₂ × ℤ₂ × ℤ₃', 'ℤ₁₂']
    },
    {
      from: 'ℤ₄ × ℤ₃ (elementary)',
      to: 'invariant factors',
      answer: 'ℤ₁₂',
      wrong: ['ℤ₄ × ℤ₃', 'ℤ₆ × ℤ₂', 'ℤ₂ × ℤ₆']
    },
  ] : difficulty === 'medium' ? [
    {
      from: 'ℤ₂ × ℤ₄ × ℤ₃ (elementary)',
      to: 'invariant factors',
      answer: 'ℤ₂ × ℤ₁₂',
      wrong: ['ℤ₂₄', 'ℤ₆ × ℤ₄', 'ℤ₂ × ℤ₄ × ℤ₃']
    },
  ] : [
    {
      from: 'ℤ₆ × ℤ₁₂ (invariant)',
      to: 'elementary divisors',
      answer: 'ℤ₂ × ℤ₄ × ℤ₃ × ℤ₃',
      wrong: ['ℤ₂ × ℤ₂ × ℤ₃ × ℤ₆', 'ℤ₇₂', 'ℤ₆ × ℤ₁₂']
    },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.answer, ...scenario.wrong.slice(0, 3)]);

  return {
    type: 'conversion',
    responseType: 'multiple_choice',
    question: `Convert ${scenario.from} to ${scenario.to} form:`,
    options,
    correctIndex: options.indexOf(scenario.answer),
    explanation: `The answer is ${scenario.answer}.`
  };
}

// Free rank question
function generateFreeRankQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ × ℤ₆', rank: '1', why: 'one copy of ℤ' },
    { group: 'ℤ₁₂', rank: '0', why: 'finite group, no free part' },
    { group: 'ℤ × ℤ', rank: '2', why: 'two copies of ℤ' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ × ℤ × ℤ₄', rank: '2', why: 'two copies of ℤ' },
    { group: 'ℤ³ × ℤ₂ × ℤ₃', rank: '3', why: 'three copies of ℤ' },
  ] : [
    { group: 'ℤ⁵ × ℤ₆ × ℤ₁₀', rank: '5', why: 'five copies of ℤ' },
    { group: 'ℤ × ℤ₂ × ℤ × ℤ₃ × ℤ', rank: '3', why: 'three copies of ℤ scattered' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'free_rank',
    responseType: 'free_response',
    question: `What is the free rank (Betti number) of ${scenario.group}?`,
    correctAnswer: scenario.rank,
    acceptedAnswers: [scenario.rank],
    explanation: `Free rank is ${scenario.rank}: ${scenario.why}.`
  };
}

// Torsion subgroup
function generateTorsionQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ × ℤ₆', torsion: 'ℤ₆', why: 'elements of finite order form ℤ₆' },
    { group: 'ℤ × ℤ', torsion: '{0}', why: 'no elements of finite order except identity' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ × ℤ₄ × ℤ₃', torsion: 'ℤ₄ × ℤ₃ ≅ ℤ₁₂', why: 'the finite cyclic parts' },
    { group: 'ℤ² × ℤ₂ × ℤ₂', torsion: 'ℤ₂ × ℤ₂', why: 'the ℤ₂ factors' },
  ] : [
    { group: 'ℤ³ × ℤ₆ × ℤ₁₀', torsion: 'ℤ₆ × ℤ₁₀ ≅ ℤ₂ × ℤ₃₀', why: 'all finite parts' },
  ];

  const scenario = randomChoice(scenarios);
  const wrongOptions = ['{0}', 'ℤ', 'ℤ₂', 'ℤ × ℤ₂', 'the whole group'].filter(x => x !== scenario.torsion);
  const options = shuffle([scenario.torsion, ...wrongOptions.slice(0, 3)]);

  return {
    type: 'torsion',
    responseType: 'multiple_choice',
    question: `What is the torsion subgroup of ${scenario.group}?`,
    options,
    correctIndex: options.indexOf(scenario.torsion),
    explanation: `T(G) = ${scenario.torsion}: ${scenario.why}.`
  };
}

// Maximum element order
function generateMaxOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₂ × ℤ₃', maxOrder: '6', why: 'lcm(2,3) = 6' },
    { group: 'ℤ₂ × ℤ₂', maxOrder: '2', why: 'lcm(2,2) = 2' },
    { group: 'ℤ₄ × ℤ₃', maxOrder: '12', why: 'lcm(4,3) = 12' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₄ × ℤ₆', maxOrder: '12', why: 'lcm(4,6) = 12' },
    { group: 'ℤ₂ × ℤ₄ × ℤ₅', maxOrder: '20', why: 'lcm(2,4,5) = 20' },
  ] : [
    { group: 'ℤ₆ × ℤ₁₀ × ℤ₁₅', maxOrder: '30', why: 'lcm(6,10,15) = 30' },
    { group: 'ℤ₈ × ℤ₁₂', maxOrder: '24', why: 'lcm(8,12) = 24' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'max_order',
    responseType: 'free_response',
    question: `What is the maximum order of an element in ${scenario.group}?`,
    correctAnswer: scenario.maxOrder,
    acceptedAnswers: [scenario.maxOrder],
    explanation: `Maximum order = ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateCountGroupsQuestion,
    generateIsomorphismQuestion,
    generateConversionQuestion,
    generateFreeRankQuestion,
    generateTorsionQuestion,
    generateMaxOrderQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function AbelianStructureQuiz() {
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

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleFreeResponseSubmit(); };
  const nextQuestion = () => { setSelectedAnswer(null); setTextAnswer(''); setShowResult(false); setIsCorrect(false); if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1); };
  const prevQuestion = () => { setSelectedAnswer(null); setTextAnswer(''); setShowResult(false); setIsCorrect(false); if (currentIndex > 0) setCurrentIndex(i => i - 1); };
  const resetQuiz = () => setQuizStarted(false);
  const isComplete = answered.length > 0 && answered.every(a => a);

  if (!quizStarted) {
    return (
      <div className="demo-container">
        <h4 className="text-xl font-semibold mb-6 text-center">Abelian Structure Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test the Fundamental Theorem of Finitely Generated Abelian Groups:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Small orders, basic isomorphisms</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Conversions, counting groups</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Complex decompositions</div>
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
          <h4 className="text-lg font-semibold">Abelian Structure Quiz</h4>
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
            if (showResult) { if (isCorrectOption) bgClass = 'bg-green-500/20 border-green-500'; else if (isSelected) bgClass = 'bg-red-500/20 border-red-500'; }
            else if (isSelected) bgClass = 'bg-primary-500/20 border-primary-500';
            return <button key={i} onClick={() => handleMultipleChoiceAnswer(i)} disabled={showResult} className={`p-4 rounded-lg border-2 text-left transition-all ${bgClass}`}>{option}</button>;
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
        {currentIndex < questions.length - 1 ? <button onClick={nextQuestion} className="btn-primary">Next</button>
          : isComplete ? <p className="text-lg font-semibold text-primary-400">Quiz Complete! Score: {score}/{questions.length}</p>
          : <button disabled className="btn-ghost opacity-50">Answer all questions</button>}
      </div>
    </div>
  );
}

export default AbelianStructureQuiz;
