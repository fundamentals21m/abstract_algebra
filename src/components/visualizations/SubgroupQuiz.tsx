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

// Is the group abelian?
function generateAbelianQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ under addition', abelian: true, why: 'a + b = b + a for all integers' },
    { group: 'ℤₙ under addition', abelian: true, why: 'addition mod n is commutative' },
    { group: 'ℚ* under multiplication', abelian: true, why: 'ab = ba for all nonzero rationals' },
  ] : difficulty === 'medium' ? [
    { group: 'S₃ (symmetric group on 3 elements)', abelian: false, why: 'permutations don\'t commute: (1 2)(1 3) ≠ (1 3)(1 2)' },
    { group: 'D₃ (symmetries of equilateral triangle)', abelian: false, why: 'rotation followed by reflection ≠ reflection followed by rotation' },
    { group: 'ℤ × ℤ under componentwise addition', abelian: true, why: 'direct product of abelian groups is abelian' },
  ] : [
    { group: 'GL₂(ℝ) (invertible 2×2 matrices)', abelian: false, why: 'matrix multiplication is not commutative' },
    { group: 'D₄ (symmetries of square)', abelian: false, why: 'has 8 elements but only abelian groups of order 8 are ℤ₈, ℤ₄×ℤ₂, ℤ₂×ℤ₂×ℤ₂' },
    { group: 'Quaternion group Q₈', abelian: false, why: 'ij = k but ji = -k' },
    { group: 'Klein four-group V₄', abelian: true, why: 'isomorphic to ℤ₂ × ℤ₂, which is abelian' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'abelian',
    responseType: 'multiple_choice',
    question: `Is ${scenario.group} abelian?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.abelian ? 0 : 1,
    explanation: scenario.abelian ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Order of dihedral group
function generateDihedralOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? randomChoice([3, 4, 5]) : difficulty === 'medium' ? randomChoice([6, 8, 10]) : randomChoice([7, 9, 12]);
  const order = 2 * n;

  return {
    type: 'dihedral_order',
    responseType: 'free_response',
    question: `What is the order of D${n} (the dihedral group of a regular ${n}-gon)?`,
    correctAnswer: order.toString(),
    acceptedAnswers: [order.toString()],
    explanation: `|D${n}| = 2n = 2(${n}) = ${order}. There are ${n} rotations and ${n} reflections.`
  };
}

// Order of symmetric group
function generateSymmetricOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const n = difficulty === 'easy' ? randomChoice([2, 3]) : difficulty === 'medium' ? randomChoice([4, 5]) : randomChoice([6, 7]);
  const factorial = [1, 1, 2, 6, 24, 120, 720, 5040][n];

  return {
    type: 'symmetric_order',
    responseType: 'free_response',
    question: `What is the order of S${n} (the symmetric group on ${n} elements)?`,
    correctAnswer: factorial.toString(),
    acceptedAnswers: [factorial.toString()],
    explanation: `|S${n}| = ${n}! = ${factorial}.`
  };
}

// Is this a subgroup?
function generateIsSubgroupQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { subset: '{0} in (ℤ, +)', isSubgroup: true, why: 'trivial subgroup containing only identity' },
    { subset: '2ℤ (even integers) in (ℤ, +)', isSubgroup: true, why: 'closed under addition, contains 0, has inverses' },
    { subset: 'ℕ in (ℤ, +)', isSubgroup: false, why: 'no inverses: 5 has no inverse in ℕ' },
  ] : difficulty === 'medium' ? [
    { subset: '{1, -1} in (ℚ*, ·)', isSubgroup: true, why: 'closed, contains 1, each element is own inverse' },
    { subset: 'SL₂(ℝ) (det = 1 matrices) in GL₂(ℝ)', isSubgroup: true, why: 'det(AB) = det(A)det(B) = 1, det(I) = 1, det(A⁻¹) = 1' },
    { subset: 'positive rationals in (ℚ*, ·)', isSubgroup: true, why: 'closed under multiplication, contains 1, positive inverses exist' },
  ] : [
    { subset: '{e, r, r²} in D₃ (rotations only)', isSubgroup: true, why: 'rotations form cyclic subgroup ⟨r⟩' },
    { subset: '{e, s} in D₃ (identity and one reflection)', isSubgroup: true, why: 's² = e, so closed with inverses' },
    { subset: '{r, s} in D₃', isSubgroup: false, why: 'doesn\'t contain identity e' },
    { subset: 'A₄ (even permutations) in S₄', isSubgroup: true, why: 'product of even permutations is even, identity is even' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'is_subgroup',
    responseType: 'multiple_choice',
    question: `Is ${scenario.subset} a subgroup?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.isSubgroup ? 0 : 1,
    explanation: scenario.isSubgroup ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Number of elements of specific order in Dₙ
function generateDihedralElementOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { n: 4, orderAsked: 2, count: '5', why: '4 reflections + r² (180° rotation) = 5 elements of order 2' },
    { n: 3, orderAsked: 2, count: '3', why: '3 reflections have order 2' },
  ] : difficulty === 'medium' ? [
    { n: 6, orderAsked: 2, count: '7', why: '6 reflections + r³ = 7 elements' },
    { n: 4, orderAsked: 4, count: '2', why: 'r and r³ both have order 4' },
  ] : [
    { n: 5, orderAsked: 5, count: '4', why: 'r, r², r³, r⁴ all have order 5' },
    { n: 6, orderAsked: 3, count: '2', why: 'r² and r⁴ have order 3' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'dihedral_element_order',
    responseType: 'free_response',
    question: `How many elements of order ${scenario.orderAsked} are in D${scenario.n}?`,
    correctAnswer: scenario.count,
    acceptedAnswers: [scenario.count],
    explanation: scenario.why
  };
}

// Center of a group
function generateCenterQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₁₂', center: 'ℤ₁₂ (the whole group)', why: 'abelian groups have Z(G) = G' },
    { group: 'any abelian group G', center: 'G itself', why: 'every element commutes with every other' },
  ] : difficulty === 'medium' ? [
    { group: 'S₃', center: '{e} (trivial)', why: 'no non-identity element commutes with all others' },
    { group: 'D₃', center: '{e}', why: 'reflections don\'t commute with rotations' },
  ] : [
    { group: 'D₄', center: '{e, r²}', why: 'only 180° rotation commutes with all elements' },
    { group: 'Q₈ (quaternions)', center: '{1, -1}', why: '-1 commutes with everything' },
  ];

  const scenario = randomChoice(scenarios);
  const wrongCenters = ['G itself', '{e}', '{e, r²}', '{1, -1}', 'empty set'].filter(c => c !== scenario.center);
  const options = shuffle([scenario.center, ...wrongCenters.slice(0, 3)]);

  return {
    type: 'center',
    responseType: 'multiple_choice',
    question: `What is the center Z(${scenario.group})?`,
    options,
    correctIndex: options.indexOf(scenario.center),
    explanation: `Z(${scenario.group}) = ${scenario.center}: ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = difficulty === 'easy' ? [
    generateAbelianQuestion,
    generateDihedralOrderQuestion,
    generateSymmetricOrderQuestion,
    generateIsSubgroupQuestion,
  ] : difficulty === 'medium' ? [
    generateAbelianQuestion,
    generateDihedralOrderQuestion,
    generateSymmetricOrderQuestion,
    generateIsSubgroupQuestion,
    generateDihedralElementOrderQuestion,
  ] : [
    generateAbelianQuestion,
    generateDihedralOrderQuestion,
    generateSymmetricOrderQuestion,
    generateIsSubgroupQuestion,
    generateDihedralElementOrderQuestion,
    generateCenterQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

export function SubgroupQuiz() {
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
        <h4 className="text-xl font-semibold mb-6 text-center">Subgroups Quiz</h4>
        <p className="text-dark-300 text-center mb-8">Test your knowledge of abelian groups, dihedral groups, and subgroups:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button onClick={() => startQuiz('easy')} className="p-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-semibold text-green-400 mb-2">Easy</div>
            <div className="text-sm text-dark-400">|Dₙ|, |Sₙ|, basic subgroups</div>
          </button>
          <button onClick={() => startQuiz('medium')} className="p-6 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">Medium</div>
            <div className="text-sm text-dark-400">Non-abelian examples, element orders</div>
          </button>
          <button onClick={() => startQuiz('hard')} className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-semibold text-red-400 mb-2">Hard</div>
            <div className="text-sm text-dark-400">Centers, advanced structures</div>
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
          <h4 className="text-lg font-semibold">Subgroups Quiz</h4>
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

export default SubgroupQuiz;
