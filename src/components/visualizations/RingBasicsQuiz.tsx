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

// Ring definition
function generateRingDefinitionQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'An abelian group under addition with associative multiplication satisfying distributive laws',
    'An abelian group under both addition and multiplication',
    'Any set with two operations',
    'A group with a second operation'
  ]);

  return {
    type: 'ring_definition',
    responseType: 'multiple_choice',
    question: 'What is a ring?',
    options,
    correctIndex: options.indexOf('An abelian group under addition with associative multiplication satisfying distributive laws'),
    explanation: 'A ring (R, +, ·) is an abelian group under addition, with associative multiplication that distributes over addition.'
  };
}

// Is it a ring?
function generateIsRingQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { set: 'ℤ with usual + and ×', isRing: true, why: 'integers under standard operations form a ring' },
    { set: 'ℤ with + only', isRing: false, why: 'needs two operations to be a ring' },
    { set: 'ℚ with usual + and ×', isRing: true, why: 'rationals form a ring (actually a field)' },
  ] : difficulty === 'medium' ? [
    { set: 'ℤₙ with mod n arithmetic', isRing: true, why: 'integers mod n form a ring' },
    { set: '2ℤ (even integers) with + and ×', isRing: true, why: 'closed under both operations, satisfies axioms' },
    { set: 'n × n matrices over ℝ', isRing: true, why: 'matrix ring Mₙ(ℝ)' },
  ] : [
    { set: 'continuous functions ℝ → ℝ', isRing: true, why: 'pointwise operations give a ring' },
    { set: 'ℤ[√2] = {a + b√2 : a, b ∈ ℤ}', isRing: true, why: 'closed under +, -, × and contains 0, 1' },
    { set: '{0} with trivial operations', isRing: true, why: 'the zero ring is a valid ring' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'is_ring',
    responseType: 'multiple_choice',
    question: `Is ${scenario.set} a ring?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.isRing ? 0 : 1,
    explanation: scenario.isRing ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Commutative rings
function generateCommutativeQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { ring: 'ℤ', commutative: true, why: 'ab = ba for all integers' },
    { ring: 'ℚ', commutative: true, why: 'multiplication of rationals is commutative' },
  ] : difficulty === 'medium' ? [
    { ring: 'M₂(ℝ)', commutative: false, why: 'matrix multiplication is not commutative' },
    { ring: 'ℤ[x]', commutative: true, why: 'polynomial multiplication is commutative' },
  ] : [
    { ring: 'ℍ (quaternions)', commutative: false, why: 'ij = k but ji = -k' },
    { ring: 'End(V) for dim V > 1', commutative: false, why: 'composition of linear maps need not commute' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'commutative',
    responseType: 'multiple_choice',
    question: `Is ${scenario.ring} a commutative ring?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.commutative ? 0 : 1,
    explanation: scenario.commutative ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Units
function generateUnitsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { ring: 'ℤ', units: '{1, -1}', why: 'only ±1 have integer inverses' },
    { ring: 'ℚ', units: 'ℚ*', why: 'all nonzero rationals are units (a/b has inverse b/a)' },
  ] : difficulty === 'medium' ? [
    { ring: 'ℤ₅', units: '{1, 2, 3, 4}', why: 'all nonzero elements are units in a field' },
    { ring: 'ℤ₆', units: '{1, 5}', why: 'only elements coprime to 6 are units' },
  ] : [
    { ring: 'ℤ[i] (Gaussian integers)', units: '{1, -1, i, -i}', why: 'norm must be 1' },
    { ring: 'ℤ₈', units: '{1, 3, 5, 7}', why: 'elements coprime to 8' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'units',
    responseType: 'free_response',
    question: `What are the units of ${scenario.ring}?`,
    correctAnswer: scenario.units,
    acceptedAnswers: [scenario.units],
    explanation: `Units of ${scenario.ring}: ${scenario.units}. ${scenario.why}.`
  };
}

// Zero divisors
function generateZeroDivisorQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'ℤ has zero divisors', correct: false, why: 'if ab = 0 in ℤ, then a = 0 or b = 0' },
    { statement: 'ℤ₆ has zero divisors', correct: true, why: '2 · 3 = 6 ≡ 0 (mod 6)' },
  ] : difficulty === 'medium' ? [
    { statement: '3 is a zero divisor in ℤ₁₂', correct: true, why: '3 · 4 = 12 ≡ 0 (mod 12)' },
    { statement: 'ℤₚ (p prime) has zero divisors', correct: false, why: 'ℤₚ is a field, no zero divisors' },
  ] : [
    { statement: 'In M₂(ℝ), there exist nonzero matrices A, B with AB = 0', correct: true, why: 'e.g., [1,0;0,0][0,0;0,1] = 0' },
    { statement: 'An integral domain has no zero divisors', correct: true, why: 'this is the definition of integral domain' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'zero_divisor',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Integral domain
function generateIntegralDomainQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { ring: 'ℤ', isDomain: true, why: 'no zero divisors, commutative with unity' },
    { ring: 'ℤ₆', isDomain: false, why: '2 · 3 = 0, so has zero divisors' },
  ] : difficulty === 'medium' ? [
    { ring: 'ℤₚ (p prime)', isDomain: true, why: 'it\'s a field, hence an integral domain' },
    { ring: 'ℤ × ℤ', isDomain: false, why: '(1,0)(0,1) = (0,0) gives zero divisors' },
  ] : [
    { ring: 'ℤ[x]', isDomain: true, why: 'polynomials over an integral domain form an integral domain' },
    { ring: 'ℤ/n for composite n', isDomain: false, why: 'n = ab gives a · b ≡ 0' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'integral_domain',
    responseType: 'multiple_choice',
    question: `Is ${scenario.ring} an integral domain?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.isDomain ? 0 : 1,
    explanation: scenario.isDomain ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateRingDefinitionQuestion,
    generateIsRingQuestion,
    generateCommutativeQuestion,
    generateUnitsQuestion,
    generateZeroDivisorQuestion,
    generateIntegralDomainQuestion,
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

export function RingBasicsQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Ring Basics Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of rings, units, and integral domains!</p>
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
