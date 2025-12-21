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

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function subscript(n: number): string {
  const subs = '₀₁₂₃₄₅₆₇₈₉';
  return String(n).split('').map(d => subs[parseInt(d)]).join('');
}

// Does subset generate the group?
function generateGeneratesQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₆', subset: '{1}', generates: true, why: '1 generates all of ℤ₆' },
    { group: 'ℤ₆', subset: '{2}', generates: false, why: '⟨2⟩ = {0, 2, 4}, only half the group' },
    { group: 'ℤ', subset: '{1}', generates: true, why: '1 and -1 generate all integers' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₁₂', subset: '{2, 3}', generates: true, why: 'gcd(2,3)=1 which divides 12' },
    { group: 'ℤ₁₂', subset: '{4, 6}', generates: false, why: 'gcd(4,6)=2, only generates even elements' },
    { group: 'D₃', subset: '{r}', generates: false, why: 'only generates rotations, not reflections' },
    { group: 'D₃', subset: '{r, s}', generates: true, why: 'rotation and reflection generate all of D₃' },
  ] : [
    { group: 'S₃', subset: '{(1 2), (1 2 3)}', generates: true, why: 'transposition and 3-cycle generate S₃' },
    { group: 'S₄', subset: '{(1 2), (1 2 3 4)}', generates: true, why: 'adjacent transposition and n-cycle generate Sₙ' },
    { group: 'ℤ₁₅', subset: '{3, 5}', generates: true, why: 'gcd(3,5)=1 which divides 15' },
    { group: 'A₄', subset: '{(1 2 3)}', generates: false, why: '⟨(1 2 3)⟩ has order 3, but |A₄|=12' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'generates',
    responseType: 'multiple_choice',
    question: `Does ${scenario.subset} generate ${scenario.group}?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.generates ? 0 : 1,
    explanation: scenario.generates
      ? `Yes: ${scenario.why}.`
      : `No: ${scenario.why}.`
  };
}

// What subgroup does element generate?
function generateGeneratedSubgroupQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? randomChoice([4, 6]) : difficulty === 'medium' ? randomChoice([8, 10, 12]) : randomChoice([15, 18, 20]);
  const elements = [];
  for (let k = 1; k < n; k++) {
    if (k !== 1 && gcd(k, n) > 1) elements.push(k);
  }
  const k = randomChoice(elements.length > 0 ? elements : [2]);
  const order = n / gcd(k, n);

  return {
    type: 'generated_subgroup',
    responseType: 'free_response',
    question: `In ℤ${subscript(n)}, what is the order of ⟨${k}⟩?`,
    correctAnswer: order.toString(),
    acceptedAnswers: [order.toString()],
    explanation: `|⟨${k}⟩| = ${n}/gcd(${k},${n}) = ${n}/${gcd(k, n)} = ${order}.`
  };
}

// Minimum generating set size
function generateMinGeneratorsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₁₂', answer: '1', why: 'cyclic groups need only 1 generator' },
    { group: 'ℤ', answer: '1', why: 'ℤ = ⟨1⟩ is cyclic' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₂ × ℤ₂', answer: '2', why: 'not cyclic, but any two non-identity elements generate it' },
    { group: 'D₃', answer: '2', why: 'need rotation r and reflection s' },
  ] : [
    { group: 'ℤ₂ × ℤ₂ × ℤ₂', answer: '3', why: 'rank equals number of ℤ₂ factors' },
    { group: 'D₄', answer: '2', why: 'D₄ = ⟨r, s⟩ with r⁴=s²=e, srs=r⁻¹' },
    { group: 'S₃', answer: '2', why: 'S₃ = ⟨(1 2), (1 2 3)⟩' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'min_generators',
    responseType: 'free_response',
    question: `What is the minimum number of generators needed for ${scenario.group}?`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: `${scenario.answer}: ${scenario.why}.`
  };
}

// Word length question
function generateWordLengthQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₈', generator: '1', element: '3', length: '3', why: '3 = 1+1+1' },
    { group: 'ℤ₆', generator: '1', element: '2', length: '2', why: '2 = 1+1' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ₁₀', generator: '1', element: '7', length: '3', why: '7 = -3 (mod 10), using -1 three times' },
    { group: 'ℤ₁₂', generator: '1', element: '5', length: '5', why: '5 = 1+1+1+1+1' },
  ] : [
    { group: 'ℤ₂₀', generator: '1', element: '8', length: '8', why: '8 = 1+1+...+1 (8 times)' },
    { group: 'ℤ₁₅', generator: '1', element: '6', length: '6', why: '6 = 1+1+...+1 (6 times)' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'word_length',
    responseType: 'free_response',
    question: `In ${scenario.group} with generator {${scenario.generator}}, what is the word length of ${scenario.element}?`,
    correctAnswer: scenario.length,
    acceptedAnswers: [scenario.length],
    explanation: `Word length is ${scenario.length}: ${scenario.why}.`
  };
}

// Group presentation identification
function generatePresentationQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      presentation: '⟨a | a⁶ = e⟩',
      group: 'ℤ₆',
      wrong: ['ℤ₃', 'D₃', 'S₃']
    },
    {
      presentation: '⟨a | a⁴ = e⟩',
      group: 'ℤ₄',
      wrong: ['ℤ₂', 'D₂', 'V₄']
    }
  ] : difficulty === 'medium' ? [
    {
      presentation: '⟨r, s | r³ = s² = e, srs = r⁻¹⟩',
      group: 'D₃',
      wrong: ['S₃', 'ℤ₆', 'A₃']
    },
    {
      presentation: '⟨a, b | a² = b² = (ab)² = e⟩',
      group: 'V₄ (Klein 4-group)',
      wrong: ['ℤ₄', 'ℤ₂ × ℤ₂ (different presentation)', 'D₂']
    }
  ] : [
    {
      presentation: '⟨r, s | r⁴ = s² = e, srs = r⁻¹⟩',
      group: 'D₄',
      wrong: ['ℤ₈', 'Q₈', 'ℤ₄ × ℤ₂']
    },
    {
      presentation: '⟨a | ⟩ (no relations)',
      group: 'ℤ (infinite cyclic)',
      wrong: ['ℤₙ for some n', 'trivial group', 'free group on 2 generators']
    }
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.group, ...scenario.wrong.slice(0, 3)]);

  return {
    type: 'presentation',
    responseType: 'multiple_choice',
    question: `Which group has presentation ${scenario.presentation}?`,
    options,
    correctIndex: options.indexOf(scenario.group),
    explanation: `${scenario.presentation} is the presentation of ${scenario.group}.`
  };
}

// Order of element in generator notation
function generateGeneratorOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { context: 'D₃ where r is rotation by 120°', element: 'r', order: '3', why: 'r³ = e (three 120° rotations = 360°)' },
    { context: 'D₄ where s is a reflection', element: 's', order: '2', why: 's² = e (reflecting twice returns to start)' },
  ] : difficulty === 'medium' ? [
    { context: 'D₆ where r is rotation by 60°', element: 'r²', order: '3', why: '(r²)³ = r⁶ = e' },
    { context: 'D₄ where r is rotation by 90°', element: 'r²', order: '2', why: '(r²)² = r⁴ = e' },
  ] : [
    { context: 'D₅ where r is rotation and s is reflection', element: 'sr', order: '2', why: '(sr)² = srsr = ss = e (since srs = r⁻¹)' },
    { context: 'D₆ where r is rotation by 60°', element: 'r³', order: '2', why: '(r³)² = r⁶ = e' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'generator_order',
    responseType: 'free_response',
    question: `In ${scenario.context}, what is the order of ${scenario.element}?`,
    correctAnswer: scenario.order,
    acceptedAnswers: [scenario.order],
    explanation: `Order is ${scenario.order}: ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = difficulty === 'easy' ? [
    generateGeneratesQuestion,
    generateGeneratedSubgroupQuestion,
    generateMinGeneratorsQuestion,
    generatePresentationQuestion,
  ] : difficulty === 'medium' ? [
    generateGeneratesQuestion,
    generateGeneratedSubgroupQuestion,
    generateMinGeneratorsQuestion,
    generateWordLengthQuestion,
    generatePresentationQuestion,
    generateGeneratorOrderQuestion,
  ] : [
    generateGeneratesQuestion,
    generateGeneratedSubgroupQuestion,
    generateMinGeneratorsQuestion,
    generateWordLengthQuestion,
    generatePresentationQuestion,
    generateGeneratorOrderQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function GeneratorsQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Generators Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your knowledge of generating sets, presentations, and Cayley graphs:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Cyclic generators, basic presentations</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Dihedral presentations, word length</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Symmetric groups, complex presentations</div>
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
          <h4 className="text-lg font-semibold">Generators Quiz</h4>
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

export default GeneratorsQuiz;
