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

// Identify factor group isomorphism
function generateFactorIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ', normal: '2ℤ', factor: 'ℤ₂', why: 'cosets are even and odd integers' },
    { group: 'ℤ', normal: 'nℤ', factor: 'ℤₙ', why: 'by First Isomorphism Theorem via φ(k) = k mod n' },
    { group: 'ℤ₆', normal: '⟨2⟩ = {0, 2, 4}', factor: 'ℤ₂', why: '|ℤ₆|/|⟨2⟩| = 6/3 = 2' },
  ] : difficulty === 'medium' ? [
    { group: 'ℤ × ℤ', normal: 'ℤ × {0}', factor: 'ℤ', why: 'projection onto second factor' },
    { group: 'S₃', normal: 'A₃', factor: 'ℤ₂', why: 'sign homomorphism gives index 2' },
    { group: 'D₄', normal: '⟨r²⟩', factor: 'V₄', why: '|D₄|/|⟨r²⟩| = 8/2 = 4, result is Klein four-group' },
  ] : [
    { group: 'Q₈', normal: '{±1}', factor: 'V₄', why: '|Q₈|/|{±1}| = 8/2 = 4, quotient is Klein four-group' },
    { group: 'GL₂(ℝ)', normal: 'SL₂(ℝ)', factor: 'ℝ*', why: 'determinant map has kernel SL₂(ℝ)' },
    { group: 'A₄', normal: 'V₄', factor: 'ℤ₃', why: '|A₄|/|V₄| = 12/4 = 3' },
  ];

  const scenario = randomChoice(scenarios);
  const wrongAnswers = ['ℤ', 'ℤ₂', 'ℤ₃', 'ℤ₄', 'V₄', 'S₃', 'D₄'].filter(x => x !== scenario.factor);
  const options = shuffle([scenario.factor, ...shuffle(wrongAnswers).slice(0, 3)]);

  return {
    type: 'factor_iso',
    responseType: 'multiple_choice',
    question: `What is ${scenario.group}/${scenario.normal} isomorphic to?`,
    options,
    correctIndex: options.indexOf(scenario.factor),
    explanation: `${scenario.group}/${scenario.normal} ≅ ${scenario.factor} because ${scenario.why}.`
  };
}

// Factor group order
function generateFactorOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₁₂', normal: '⟨3⟩', groupOrder: 12, normalOrder: 4, why: '⟨3⟩ = {0, 3, 6, 9} has order 4' },
    { group: 'ℤ₁₀', normal: '⟨2⟩', groupOrder: 10, normalOrder: 5, why: '⟨2⟩ = {0, 2, 4, 6, 8} has order 5' },
  ] : difficulty === 'medium' ? [
    { group: 'S₄', normal: 'A₄', groupOrder: 24, normalOrder: 12, why: 'A₄ has index 2' },
    { group: 'D₆', normal: '⟨r⟩', groupOrder: 12, normalOrder: 6, why: 'rotations form subgroup of order 6' },
  ] : [
    { group: 'A₄', normal: 'V₄', groupOrder: 12, normalOrder: 4, why: 'V₄ = {e, (12)(34), (13)(24), (14)(23)}' },
    { group: 'D₁₂', normal: '⟨r²⟩', groupOrder: 24, normalOrder: 6, why: '⟨r²⟩ has 6 rotations' },
  ];

  const scenario = randomChoice(scenarios);
  const order = scenario.groupOrder / scenario.normalOrder;

  return {
    type: 'factor_order',
    responseType: 'free_response',
    question: `What is the order of the factor group ${scenario.group}/${scenario.normal}?`,
    correctAnswer: order.toString(),
    acceptedAnswers: [order.toString()],
    explanation: `|${scenario.group}/${scenario.normal}| = |${scenario.group}|/|${scenario.normal}| = ${scenario.groupOrder}/${scenario.normalOrder} = ${order}. (${scenario.why})`
  };
}

// Simplicity
function generateSimplicityQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤₚ (p prime)', simple: true, why: 'only subgroups are trivial, so no proper normal subgroups' },
    { group: 'ℤ₆', simple: false, why: 'has proper normal subgroup ⟨2⟩ of order 3' },
    { group: 'ℤ₄', simple: false, why: 'has proper normal subgroup ⟨2⟩ of order 2' },
  ] : difficulty === 'medium' ? [
    { group: 'A₅', simple: true, why: 'smallest non-abelian simple group (order 60)' },
    { group: 'S₃', simple: false, why: 'A₃ ≅ ℤ₃ is a proper normal subgroup' },
    { group: 'D₄', simple: false, why: '⟨r²⟩ is a proper normal subgroup' },
  ] : [
    { group: 'Aₙ (n ≥ 5)', simple: true, why: 'alternating groups are simple for n ≥ 5' },
    { group: 'A₄', simple: false, why: 'V₄ is a normal subgroup' },
    { group: 'PSL(2, 7)', simple: true, why: 'projective special linear groups are often simple' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'simplicity',
    responseType: 'multiple_choice',
    question: `Is ${scenario.group} a simple group?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.simple ? 0 : 1,
    explanation: scenario.simple ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// First Isomorphism Theorem application
function generateFirstIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      setup: 'φ: ℤ → ℤₙ by φ(k) = k mod n',
      kernel: 'nℤ',
      image: 'ℤₙ',
      correct: 'ℤ/nℤ ≅ ℤₙ'
    },
  ] : difficulty === 'medium' ? [
    {
      setup: 'φ: Sₙ → {±1} by φ(σ) = sign(σ)',
      kernel: 'Aₙ',
      image: '{±1}',
      correct: 'Sₙ/Aₙ ≅ ℤ₂'
    },
  ] : [
    {
      setup: 'φ: GL₂(ℝ) → ℝ* by φ(A) = det(A)',
      kernel: 'SL₂(ℝ)',
      image: 'ℝ*',
      correct: 'GL₂(ℝ)/SL₂(ℝ) ≅ ℝ*'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'first_iso',
    responseType: 'multiple_choice',
    question: `Given ${scenario.setup}, what does the First Isomorphism Theorem tell us?`,
    options: shuffle([
      scenario.correct,
      `ker(φ) = ${scenario.image}`,
      `im(φ) = ${scenario.kernel}`,
      'φ is injective'
    ]),
    correctIndex: shuffle([
      scenario.correct,
      `ker(φ) = ${scenario.image}`,
      `im(φ) = ${scenario.kernel}`,
      'φ is injective'
    ]).indexOf(scenario.correct),
    explanation: `By the First Isomorphism Theorem: G/ker(φ) ≅ im(φ), so ${scenario.correct}.`
  };
}

// Coset multiplication
function generateCosetMultQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      group: 'ℤ₆',
      normal: '⟨3⟩ = {0, 3}',
      a: '1',
      b: '2',
      result: '0 + ⟨3⟩',
      why: '(1 + ⟨3⟩)(2 + ⟨3⟩) = (1+2) + ⟨3⟩ = 3 + ⟨3⟩ = 0 + ⟨3⟩'
    },
  ] : difficulty === 'medium' ? [
    {
      group: 'ℤ₁₂',
      normal: '⟨4⟩ = {0, 4, 8}',
      a: '2',
      b: '3',
      result: '5 + ⟨4⟩',
      why: '(2 + ⟨4⟩)(3 + ⟨4⟩) = (2+3) + ⟨4⟩ = 5 + ⟨4⟩'
    },
  ] : [
    {
      group: 'ℤ₁₂',
      normal: '⟨3⟩ = {0, 3, 6, 9}',
      a: '5',
      b: '7',
      result: '0 + ⟨3⟩',
      why: '(5 + ⟨3⟩)(7 + ⟨3⟩) = 12 + ⟨3⟩ = 0 + ⟨3⟩'
    },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([
    scenario.result,
    `${scenario.a} + ${scenario.normal}`,
    `${scenario.b} + ${scenario.normal}`,
    '1 + ⟨3⟩'
  ]);

  return {
    type: 'coset_mult',
    responseType: 'multiple_choice',
    question: `In ${scenario.group}/${scenario.normal}, compute (${scenario.a} + N)(${scenario.b} + N) where N = ${scenario.normal}.`,
    options,
    correctIndex: options.indexOf(scenario.result),
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateFactorIsoQuestion,
    generateFactorOrderQuestion,
    generateSimplicityQuestion,
    generateFirstIsoQuestion,
    generateCosetMultQuestion,
  ];

  return randomChoice(generators)(difficulty);
}

function generateQuiz(difficulty: Difficulty): Question[] {
  const questions: Question[] = [];
  const usedTypes = new Set<string>();

  while (questions.length < 5) {
    const question = generateQuestion(difficulty);
    if (!usedTypes.has(question.type)) {
      usedTypes.add(question.type);
      questions.push(question);
    }
  }

  return questions;
}

export function FactorGroupQuiz() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const startQuiz = (diff: Difficulty) => {
    setDifficulty(diff);
    setQuestions(generateQuiz(diff));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTextAnswer('');
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.responseType === 'multiple_choice') {
      isCorrect = selectedAnswer === question.correctIndex;
    } else {
      const normalizedAnswer = textAnswer.trim().toLowerCase();
      isCorrect = question.acceptedAnswers.some(
        ans => ans.toLowerCase() === normalizedAnswer
      );
    }

    if (isCorrect) setScore(score + 1);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setShowResult(false);
    }
  };

  if (!difficulty) {
    return (
      <div className="my-8 p-6 bg-gray-900 rounded-xl border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Factor Groups Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of factor groups and the isomorphism theorems!</p>
        <div className="flex gap-4 flex-wrap">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => startQuiz(diff)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                diff === 'easy' ? 'bg-green-600 hover:bg-green-500' :
                diff === 'medium' ? 'bg-yellow-600 hover:bg-yellow-500' :
                'bg-red-600 hover:bg-red-500'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="my-8 p-6 bg-gray-900 rounded-xl border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Quiz Complete!</h3>
        <p className="text-2xl text-white mb-4">
          Score: {score}/{questions.length} ({Math.round(score/questions.length * 100)}%)
        </p>
        <button
          onClick={() => setDifficulty(null)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="my-8 p-6 bg-gray-900 rounded-xl border border-purple-500/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-purple-300">
          Question {currentQuestion + 1}/{questions.length}
        </h3>
        <span className="text-gray-400 capitalize">{difficulty}</span>
      </div>

      <p className="text-white text-lg mb-6">{question.question}</p>

      {question.responseType === 'multiple_choice' ? (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                showResult
                  ? index === question.correctIndex
                    ? 'bg-green-600/30 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-600/30 border-red-500'
                    : 'bg-gray-800 border-gray-600'
                  : selectedAnswer === index
                  ? 'bg-purple-600/30 border-purple-500'
                  : 'bg-gray-800 border-gray-600 hover:border-purple-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          disabled={showResult}
          placeholder="Enter your answer..."
          className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
        />
      )}

      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          (question.responseType === 'multiple_choice' && selectedAnswer === question.correctIndex) ||
          (question.responseType === 'free_response' && question.acceptedAnswers.some(a => a.toLowerCase() === textAnswer.trim().toLowerCase()))
            ? 'bg-green-600/20 border border-green-500'
            : 'bg-red-600/20 border border-red-500'
        }`}>
          <p className="text-gray-200">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={question.responseType === 'multiple_choice' ? selectedAnswer === null : !textAnswer.trim()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-all"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-all"
          >
            {currentQuestion + 1 >= questions.length ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
