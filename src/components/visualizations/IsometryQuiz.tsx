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

// Identify isometry type
function generateIdentifyQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { desc: 'has no fixed points and preserves orientation', type: 'Translation', why: 'only translations have no fixed points while preserving orientation' },
    { desc: 'has exactly one fixed point and preserves orientation', type: 'Rotation', why: 'rotations fix only the center point' },
    { desc: 'has a line of fixed points and reverses orientation', type: 'Reflection', why: 'reflections fix all points on the mirror line' },
  ] : difficulty === 'medium' ? [
    { desc: 'has no fixed points and reverses orientation', type: 'Glide reflection', why: 'glide reflections have no fixed points but reverse orientation' },
    { desc: 'fixes every point', type: 'Identity', why: 'only the identity fixes all points' },
    { desc: 'is the composition of two reflections across parallel lines', type: 'Translation', why: 'two parallel reflections = translation by twice the gap' },
  ] : [
    { desc: 'is the composition of two reflections across intersecting lines', type: 'Rotation', why: 'angle = twice the angle between lines, center = intersection' },
    { desc: 'is the composition of three reflections', type: 'Glide reflection', why: 'odd number of reflections reverses orientation with no fixed points' },
    { desc: 'has order 2 and reverses orientation', type: 'Reflection', why: 'only reflections are order-2 orientation-reversing' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(['Translation', 'Rotation', 'Reflection', 'Glide reflection']);

  return {
    type: 'identify',
    responseType: 'multiple_choice',
    question: `Which type of isometry ${scenario.desc}?`,
    options,
    correctIndex: options.indexOf(scenario.type),
    explanation: `${scenario.type}: ${scenario.why}.`
  };
}

// Fixed points question
function generateFixedPointsQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = [
    { isometry: 'Translation (non-identity)', fixed: 'None', why: 'every point moves by the same vector' },
    { isometry: 'Rotation by 90° about point P', fixed: 'Exactly one point (P)', why: 'only the center is fixed' },
    { isometry: 'Reflection across line L', fixed: 'All points on line L', why: 'points on the mirror line are fixed' },
    { isometry: 'Glide reflection', fixed: 'None', why: 'combination of translation and reflection has no fixed points' },
    { isometry: 'Identity', fixed: 'All points', why: 'the identity fixes everything' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(['None', 'Exactly one point (P)', 'All points on line L', 'All points']);

  return {
    type: 'fixed_points',
    responseType: 'multiple_choice',
    question: `How many fixed points does a ${scenario.isometry} have?`,
    options,
    correctIndex: options.indexOf(scenario.fixed),
    explanation: scenario.why
  };
}

// Composition question
function generateCompositionQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { comp: 'two translations', result: 'Translation', why: 'T_u ∘ T_v = T_{u+v}' },
    { comp: 'reflection followed by itself', result: 'Identity', why: 'σ² = id' },
  ] : difficulty === 'medium' ? [
    { comp: 'two reflections across parallel lines', result: 'Translation', why: 'perpendicular to lines, distance = 2× gap' },
    { comp: 'two reflections across intersecting lines', result: 'Rotation', why: 'about intersection, angle = 2× angle between lines' },
    { comp: 'rotation and translation', result: 'Rotation', why: 'still a rotation (possibly different center)' },
  ] : [
    { comp: 'three reflections (general position)', result: 'Glide reflection', why: 'odd number of reflections reverses orientation' },
    { comp: 'two rotations about different centers', result: 'Rotation or Translation', why: 'rotation if angles don\'t sum to 360°, translation if they do' },
    { comp: 'glide reflection followed by itself', result: 'Translation', why: 'G² translates by twice the glide vector' },
  ];

  const scenario = randomChoice(scenarios);
  const allResults = ['Translation', 'Rotation', 'Reflection', 'Glide reflection', 'Identity', 'Rotation or Translation'];
  const options = shuffle([scenario.result, ...allResults.filter(r => r !== scenario.result).slice(0, 3)]);

  return {
    type: 'composition',
    responseType: 'multiple_choice',
    question: `What is the composition of ${scenario.comp}?`,
    options,
    correctIndex: options.indexOf(scenario.result),
    explanation: scenario.why
  };
}

// Orientation question
function generateOrientationQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = [
    { isometry: 'Translation', preserves: true, why: 'translations preserve handedness' },
    { isometry: 'Rotation', preserves: true, why: 'rotations preserve handedness' },
    { isometry: 'Reflection', preserves: false, why: 'reflections swap left and right' },
    { isometry: 'Glide reflection', preserves: false, why: 'contains a reflection component' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'orientation',
    responseType: 'multiple_choice',
    question: `Does a ${scenario.isometry} preserve or reverse orientation?`,
    options: ['Preserves orientation', 'Reverses orientation'],
    correctIndex: scenario.preserves ? 0 : 1,
    explanation: scenario.why
  };
}

// Minimum reflections question
function generateMinReflectionsQuestion(_difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = [
    { isometry: 'Identity', min: '0', why: 'no reflections needed' },
    { isometry: 'Reflection', min: '1', why: 'a reflection is itself' },
    { isometry: 'Translation', min: '2', why: 'two parallel reflections' },
    { isometry: 'Rotation', min: '2', why: 'two intersecting reflections' },
    { isometry: 'Glide reflection', min: '3', why: 'reflection + translation = 3 reflections' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'min_reflections',
    responseType: 'free_response',
    question: `What is the minimum number of reflections needed to express a ${scenario.isometry}?`,
    correctAnswer: scenario.min,
    acceptedAnswers: [scenario.min],
    explanation: `${scenario.min} reflections: ${scenario.why}.`
  };
}

// Finite subgroups question
function generateFiniteSubgroupQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'rotations only (n-fold symmetry)', type: 'Cyclic (ℤₙ)', why: 'rotations alone form a cyclic group' },
    { group: 'rotations and reflections of a regular polygon', type: 'Dihedral (Dₙ)', why: 'includes reflections' },
  ] : [
    { group: 'symmetries of a regular hexagon', type: 'Dihedral (D₆)', why: '6 rotations + 6 reflections' },
    { group: 'symmetries of an equilateral triangle', type: 'Dihedral (D₃)', why: '3 rotations + 3 reflections' },
    { group: '90° rotations only (no reflections)', type: 'Cyclic (ℤ₄)', why: 'just the rotation subgroup' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(['Cyclic (ℤₙ)', 'Dihedral (Dₙ)', 'Symmetric (Sₙ)', 'Alternating (Aₙ)']);

  return {
    type: 'finite_subgroup',
    responseType: 'multiple_choice',
    question: `What type of group is the symmetry group with ${scenario.group}?`,
    options,
    correctIndex: options.indexOf(scenario.type),
    explanation: scenario.why
  };
}

// Order of isometry
function generateOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { isometry: 'reflection', order: '2', why: 'σ² = identity' },
    { isometry: 'rotation by 180°', order: '2', why: 'two 180° rotations = identity' },
    { isometry: 'rotation by 90°', order: '4', why: 'four 90° rotations = 360°' },
  ] : difficulty === 'medium' ? [
    { isometry: 'rotation by 120°', order: '3', why: 'three 120° rotations = 360°' },
    { isometry: 'rotation by 60°', order: '6', why: 'six 60° rotations = 360°' },
    { isometry: 'rotation by 72°', order: '5', why: 'five 72° rotations = 360°' },
  ] : [
    { isometry: 'rotation by 45°', order: '8', why: 'eight 45° rotations = 360°' },
    { isometry: 'rotation by 40°', order: '9', why: 'nine 40° rotations = 360°' },
    { isometry: 'non-identity translation', order: '∞', why: 'translations have infinite order' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'order',
    responseType: 'free_response',
    question: `What is the order of a ${scenario.isometry}?`,
    correctAnswer: scenario.order,
    acceptedAnswers: [scenario.order, scenario.order === '∞' ? 'infinite' : scenario.order, scenario.order === '∞' ? 'inf' : scenario.order],
    explanation: `Order is ${scenario.order}: ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateIdentifyQuestion,
    generateFixedPointsQuestion,
    generateCompositionQuestion,
    generateOrientationQuestion,
    generateMinReflectionsQuestion,
    generateFiniteSubgroupQuestion,
    generateOrderQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function IsometryQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Plane Isometries Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your understanding of translations, rotations, reflections, and glide reflections:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">Basic classification</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Compositions, fixed points</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Complex compositions</div>
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
          <h4 className="text-lg font-semibold">Plane Isometries Quiz</h4>
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

export default IsometryQuiz;
