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

function subscript(n: number): string {
  const subs = '₀₁₂₃₄₅₆₇₈₉';
  return String(n).split('').map(d => subs[parseInt(d)]).join('');
}

// Coset computation
function generateCosetQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 12 : 18;
  const divisors = [];
  for (let d = 2; d < n; d++) {
    if (n % d === 0) divisors.push(d);
  }
  const subgroupOrder = randomChoice(divisors);
  const generator = n / subgroupOrder;

  const subgroupElements = [];
  for (let i = 0; i < subgroupOrder; i++) {
    subgroupElements.push((i * generator) % n);
  }
  subgroupElements.sort((a, b) => a - b);

  const nonSubgroupElements = [];
  for (let i = 1; i < n; i++) {
    if (!subgroupElements.includes(i)) nonSubgroupElements.push(i);
  }

  const a = randomChoice(nonSubgroupElements);
  const coset = subgroupElements.map(h => (a + h) % n).sort((a, b) => a - b);
  const smallestNonZero = coset.filter(x => x !== 0)[0] || coset[1];

  return {
    type: 'coset',
    responseType: 'free_response',
    question: `In ℤ${subscript(n)}, let H = ⟨${generator}⟩. What is the smallest positive element in the coset ${a} + H?`,
    correctAnswer: smallestNonZero.toString(),
    acceptedAnswers: [smallestNonZero.toString()],
    explanation: `${a} + H = {${coset.join(', ')}}. The smallest positive element is ${smallestNonZero}.`
  };
}

// Number of cosets
function generateNumberOfCosetsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₁₂', subgroup: '⟨4⟩', answer: '4', why: '|H| = 3, so [G:H] = 12/3 = 4' },
    { group: 'ℤ₁₀', subgroup: '⟨2⟩', answer: '2', why: '|H| = 5, so [G:H] = 10/5 = 2' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₂₄', subgroup: '⟨6⟩', answer: '6', why: '|H| = 4, so [G:H] = 24/4 = 6' },
    { group: 'D₄', subgroup: '⟨r⟩ (rotations)', answer: '2', why: '|H| = 4, so [D₄:H] = 8/4 = 2' },
  ] : [
    { group: 'S₄', subgroup: 'A₄', answer: '2', why: '|A₄| = 12, so [S₄:A₄] = 24/12 = 2' },
    { group: 'ℤ₃₀', subgroup: '⟨6⟩', answer: '6', why: '|H| = 5, so [G:H] = 30/5 = 6' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'number_of_cosets',
    responseType: 'free_response',
    question: `How many distinct cosets does ${scenario.subgroup} have in ${scenario.group}?`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

// Lagrange's theorem application
function generateLagrangeQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'group of order 12', order: '5', possible: false, why: '5 does not divide 12' },
    { group: 'group of order 12', order: '6', possible: true, why: '6 divides 12' },
    { group: 'group of order 15', order: '3', possible: true, why: '3 divides 15' },
  ] : difficulty === 'medium' ? [
    { group: 'group of order 24', order: '7', possible: false, why: '7 does not divide 24' },
    { group: 'group of order 30', order: '15', possible: true, why: '15 divides 30' },
    { group: 'group of order 20', order: '6', possible: false, why: '6 does not divide 20' },
  ] : [
    { group: 'group of order 60', order: '8', possible: false, why: '8 does not divide 60' },
    { group: 'group of order 36', order: '9', possible: true, why: '9 divides 36' },
    { group: 'group of order 100', order: '40', possible: false, why: '40 does not divide 100' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'lagrange',
    responseType: 'multiple_choice',
    question: `Can a ${scenario.group} have a subgroup of order ${scenario.order}?`,
    options: ['Yes (Lagrange allows it)', 'No (Lagrange forbids it)'],
    correctIndex: scenario.possible ? 0 : 1,
    explanation: scenario.possible
      ? `Yes, it's possible: ${scenario.why}. (Note: existence requires more than just divisibility.)`
      : `No: ${scenario.why}. By Lagrange's theorem, subgroup order must divide group order.`
  };
}

// Index computation
function generateIndexQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? randomChoice([6, 8, 10]) : difficulty === 'medium' ? randomChoice([12, 15, 18]) : randomChoice([24, 30, 36]);
  const divisors = [];
  for (let d = 2; d < n; d++) {
    if (n % d === 0) divisors.push(d);
  }
  const subgroupOrder = randomChoice(divisors);
  const index = n / subgroupOrder;

  return {
    type: 'index',
    responseType: 'free_response',
    question: `If H is a subgroup of order ${subgroupOrder} in a group of order ${n}, what is [G:H]?`,
    correctAnswer: index.toString(),
    acceptedAnswers: [index.toString()],
    explanation: `[G:H] = |G|/|H| = ${n}/${subgroupOrder} = ${index}.`
  };
}

// Left vs right cosets
function generateCosetEqualityQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = [
    { condition: 'G is abelian', equal: true, why: 'in abelian groups, gH = Hg for all g' },
    { condition: 'H is normal in G', equal: true, why: 'normality means gH = Hg by definition' },
    { condition: 'H has index 2 in G', equal: true, why: 'index 2 subgroups are always normal' },
    { condition: 'H is any subgroup', equal: false, why: 'left and right cosets can differ for non-normal subgroups' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'coset_equality',
    responseType: 'multiple_choice',
    question: `If ${scenario.condition}, must left cosets equal right cosets?`,
    options: ['Yes, always', 'No, not necessarily'],
    correctIndex: scenario.equal ? 0 : 1,
    explanation: scenario.equal
      ? `Yes: ${scenario.why}.`
      : `No: ${scenario.why}.`
  };
}

// Coset representative
function generateRepresentativeQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const n = difficulty === 'easy' ? 6 : 12;
  const scenarios = n === 6 ? [
    { subgroup: '⟨2⟩ = {0, 2, 4}', element: '5', sameAs: '1', why: '5 ≡ 1 (mod 2) in terms of coset membership' },
    { subgroup: '⟨3⟩ = {0, 3}', element: '4', sameAs: '1', why: '4 - 1 = 3 ∈ H' },
  ] : [
    { subgroup: '⟨4⟩ = {0, 4, 8}', element: '7', sameAs: '3', why: '7 - 3 = 4 ∈ H' },
    { subgroup: '⟨3⟩ = {0, 3, 6, 9}', element: '10', sameAs: '1', why: '10 - 1 = 9 ∈ H' },
  ];

  const scenario = randomChoice(scenarios);
  const wrongAnswers = ['0', '2', '5', '7'].filter(x => x !== scenario.sameAs);
  const options = shuffle([scenario.sameAs, ...wrongAnswers.slice(0, 3)]);

  return {
    type: 'representative',
    responseType: 'multiple_choice',
    question: `In ℤ${subscript(n)} with H = ${scenario.subgroup}, which element is in the same coset as ${scenario.element}?`,
    options,
    correctIndex: options.indexOf(scenario.sameAs),
    explanation: `${scenario.element} + H = ${scenario.sameAs} + H because ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateCosetQuestion,
    generateNumberOfCosetsQuestion,
    generateLagrangeQuestion,
    generateIndexQuestion,
    generateCosetEqualityQuestion,
    generateRepresentativeQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function CosetsQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Cosets Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your understanding of cosets, Lagrange's theorem, and indices:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Basic cosets, small groups</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Lagrange's theorem, indices</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Larger groups, normal subgroups</div>
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
          <h4 className="text-lg font-semibold">Cosets Quiz</h4>
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

export default CosetsQuiz;
