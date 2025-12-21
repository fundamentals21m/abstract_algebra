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

// Is subgroup normal?
function generateNormalQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'any abelian group', subgroup: 'any subgroup', normal: true, why: 'all subgroups of abelian groups are normal' },
    { group: 'any group G', subgroup: '{e}', normal: true, why: 'the trivial subgroup is always normal' },
    { group: 'any group G', subgroup: 'G itself', normal: true, why: 'every group is normal in itself' },
  ] : difficulty === 'medium' ? [
    { group: 'Sₙ (n ≥ 3)', subgroup: 'Aₙ', normal: true, why: 'the alternating group is normal (kernel of sign)' },
    { group: 'any group', subgroup: 'index 2 subgroup', normal: true, why: 'index 2 subgroups are always normal' },
    { group: 'S₃', subgroup: '⟨(1 2)⟩', normal: false, why: 'conjugates give different subgroups' },
  ] : [
    { group: 'Dₙ', subgroup: '⟨r⟩ (rotations)', normal: true, why: 'rotations are normal in dihedral groups' },
    { group: 'D₄', subgroup: '⟨s⟩ (a reflection)', normal: false, why: 'rsr⁻¹ = sr⁻² ∉ ⟨s⟩' },
    { group: 'any group', subgroup: 'kernel of homomorphism', normal: true, why: 'kernels are always normal' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'is_normal',
    responseType: 'multiple_choice',
    question: `In ${scenario.group}, is ${scenario.subgroup} normal?`,
    options: ['Yes, it is normal', 'No, it is not normal'],
    correctIndex: scenario.normal ? 0 : 1,
    explanation: scenario.why
  };
}

// Factor group order
function generateFactorOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₁₂', normal: '⟨4⟩ (order 3)', order: '4', why: '12/3 = 4' },
    { group: 'ℤ₁₀', normal: '⟨2⟩ (order 5)', order: '2', why: '10/5 = 2' },
  ] : difficulty === 'medium' ? [
    { group: 'D₃', normal: '⟨r⟩ (order 3)', order: '2', why: '6/3 = 2' },
    { group: 'S₃', normal: 'A₃ (order 3)', order: '2', why: '6/3 = 2' },
    { group: 'ℤ₂₄', normal: '⟨6⟩ (order 4)', order: '6', why: '24/4 = 6' },
  ] : [
    { group: 'S₄', normal: 'A₄ (order 12)', order: '2', why: '24/12 = 2' },
    { group: 'D₆', normal: '⟨r⟩ (order 6)', order: '2', why: '12/6 = 2' },
    { group: 'ℤ₃₆', normal: '⟨9⟩ (order 4)', order: '9', why: '36/4 = 9' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'factor_order',
    responseType: 'free_response',
    question: `What is the order of ${scenario.group}/${scenario.normal}?`,
    correctAnswer: scenario.order,
    acceptedAnswers: [scenario.order],
    explanation: `|G/N| = |G|/|N| = ${scenario.why}.`
  };
}

// Factor group isomorphism
function generateFactorIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { quotient: 'ℤ/6ℤ', iso: 'ℤ₆', wrong: ['ℤ₃', 'ℤ₂ × ℤ₃', 'S₃'] },
    { quotient: 'ℤ₁₂/⟨4⟩', iso: 'ℤ₄', wrong: ['ℤ₃', 'ℤ₁₂', 'ℤ₂ × ℤ₂'] },
  ] : difficulty === 'medium' ? [
    { quotient: 'D₃/⟨r⟩', iso: 'ℤ₂', wrong: ['ℤ₃', 'D₃', 'S₃'] },
    { quotient: 'S₃/A₃', iso: 'ℤ₂', wrong: ['ℤ₃', 'S₂', 'A₃'] },
    { quotient: 'ℤ × ℤ/⟨(1,1)⟩', iso: 'ℤ', wrong: ['ℤ × ℤ', 'ℤ₂', '{0}'] },
  ] : [
    { quotient: 'S₄/A₄', iso: 'ℤ₂', wrong: ['ℤ₄', 'S₂', 'A₄'] },
    { quotient: 'D₄/⟨r²⟩', iso: 'ℤ₂ × ℤ₂', wrong: ['ℤ₄', 'D₂', 'ℤ₂'] },
    { quotient: 'ℤ₆ × ℤ₄/⟨(3,2)⟩', iso: 'ℤ₆', wrong: ['ℤ₁₂', 'ℤ₂ × ℤ₂', 'ℤ₄'] },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.iso, ...scenario.wrong.slice(0, 3)]);

  return {
    type: 'factor_iso',
    responseType: 'multiple_choice',
    question: `What is ${scenario.quotient} isomorphic to?`,
    options,
    correctIndex: options.indexOf(scenario.iso),
    explanation: `${scenario.quotient} ≅ ${scenario.iso}.`
  };
}

// Simple group question
function generateSimpleQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₅', simple: true, why: 'prime order groups are simple' },
    { group: 'ℤ₆', simple: false, why: 'has proper normal subgroup ℤ₂, ℤ₃' },
    { group: 'ℤ₇', simple: true, why: 'prime order groups are simple' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₄', simple: false, why: 'has normal subgroup ℤ₂' },
    { group: 'S₃', simple: false, why: 'A₃ is a proper normal subgroup' },
    { group: 'A₃ ≅ ℤ₃', simple: true, why: 'prime order' },
  ] : [
    { group: 'A₅', simple: true, why: 'smallest nonabelian simple group (order 60)' },
    { group: 'A₄', simple: false, why: 'V₄ is a proper normal subgroup' },
    { group: 'S₅', simple: false, why: 'A₅ is a proper normal subgroup' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'simple',
    responseType: 'multiple_choice',
    question: `Is ${scenario.group} a simple group?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.simple ? 0 : 1,
    explanation: scenario.why
  };
}

// First isomorphism theorem application
function generateFirstIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { phi: 'φ: ℤ → ℤₙ by φ(k) = k mod n', conclusion: 'ℤ/nℤ ≅ ℤₙ', wrong: ['ℤ ≅ ℤₙ', 'ker(φ) = ℤₙ', 'im(φ) = ℤ'] },
  ] : difficulty === 'medium' ? [
    { phi: 'φ: G → G/N (canonical projection)', conclusion: 'G/ker(φ) ≅ G/N', wrong: ['G ≅ G/N', 'ker(φ) = G', 'N = G'] },
    { phi: 'sign: Sₙ → {±1}', conclusion: 'Sₙ/Aₙ ≅ ℤ₂', wrong: ['Sₙ ≅ ℤ₂', 'Aₙ ≅ ℤ₂', 'ker(sign) = Sₙ'] },
  ] : [
    { phi: 'det: GL(n,ℝ) → ℝ*', conclusion: 'GL(n,ℝ)/SL(n,ℝ) ≅ ℝ*', wrong: ['GL(n,ℝ) ≅ ℝ*', 'SL(n,ℝ) = GL(n,ℝ)', 'ker(det) = ℝ*'] },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.conclusion, ...scenario.wrong.slice(0, 3)]);

  return {
    type: 'first_iso',
    responseType: 'multiple_choice',
    question: `By the First Isomorphism Theorem, for ${scenario.phi}, which is true?`,
    options,
    correctIndex: options.indexOf(scenario.conclusion),
    explanation: `G/ker(φ) ≅ im(φ) gives us ${scenario.conclusion}.`
  };
}

// Coset multiplication
function generateCosetMultQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? 6 : 12;
  const scenarios = n === 6 ? [
    { group: 'ℤ₆', normal: '⟨3⟩ = {0,3}', a: '1', b: '2', product: '0', why: '(1+⟨3⟩)(2+⟨3⟩) = 3+⟨3⟩ = 0+⟨3⟩' },
    { group: 'ℤ₆', normal: '⟨2⟩ = {0,2,4}', a: '1', b: '1', product: '2', why: '(1+⟨2⟩)(1+⟨2⟩) = 2+⟨2⟩' },
  ] : [
    { group: 'ℤ₁₂', normal: '⟨4⟩ = {0,4,8}', a: '2', b: '3', product: '1', why: '(2+⟨4⟩)(3+⟨4⟩) = 5+⟨4⟩ = 1+⟨4⟩' },
    { group: 'ℤ₁₂', normal: '⟨3⟩ = {0,3,6,9}', a: '1', b: '2', product: '0', why: '(1+⟨3⟩)(2+⟨3⟩) = 3+⟨3⟩ = 0+⟨3⟩' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'coset_mult',
    responseType: 'free_response',
    question: `In ${scenario.group}/${scenario.normal}, what representative is (${scenario.a}+N)(${scenario.b}+N)?`,
    correctAnswer: scenario.product,
    acceptedAnswers: [scenario.product],
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateNormalQuestion,
    generateFactorOrderQuestion,
    generateFactorIsoQuestion,
    generateSimpleQuestion,
    generateFirstIsoQuestion,
    generateCosetMultQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function NormalSubgroupQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Normal Subgroups & Factor Groups Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your understanding of normal subgroups, quotient groups, and isomorphism theorems:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Basic normal subgroups</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Factor groups, first iso theorem</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Simple groups, advanced quotients</div>
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
          <h4 className="text-lg font-semibold">Normal Subgroups Quiz</h4>
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

export default NormalSubgroupQuiz;
