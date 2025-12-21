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

// Polynomial ring basics
function generatePolynomialRingQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'ℤ[x] is a ring', correct: true, why: 'polynomials over a ring form a ring' },
    { statement: 'Degree of product equals sum of degrees', correct: true, why: 'deg(fg) = deg(f) + deg(g) over an integral domain' },
  ] : difficulty === 'medium' ? [
    { statement: 'ℤ[x] is an integral domain', correct: true, why: 'ℤ is an integral domain, so is ℤ[x]' },
    { statement: 'Every nonzero polynomial in ℤ[x] has a multiplicative inverse', correct: false, why: 'only constant units (±1) are invertible' },
  ] : [
    { statement: 'R[x] is a field when R is a field', correct: false, why: 'F[x] is only a Euclidean domain, not a field' },
    { statement: 'R[x]/(p(x)) is a field iff p(x) is irreducible over R (R a field)', correct: true, why: 'irreducible elements generate maximal ideals' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'poly_ring',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Irreducibility
function generateIrreducibilityQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { poly: 'x² + 1 over ℝ', irreducible: true, why: 'has no real roots, can\'t factor' },
    { poly: 'x² - 1 over ℝ', irreducible: false, why: '(x-1)(x+1)' },
    { poly: 'x² + 1 over ℂ', irreducible: false, why: '(x-i)(x+i)' },
  ] : difficulty === 'medium' ? [
    { poly: 'x² + 1 over ℤ₂', irreducible: true, why: 'no roots: 0² + 1 = 1, 1² + 1 = 0 in ℤ₂... wait, 1 is a root, so irreducible test fails' },
    { poly: 'x³ + x + 1 over ℤ₂', irreducible: true, why: 'degree 3 with no roots in ℤ₂ (check 0 and 1)' },
    { poly: 'x² + x + 1 over ℤ₂', irreducible: true, why: '0² + 0 + 1 = 1 ≠ 0, 1² + 1 + 1 = 1 ≠ 0' },
  ] : [
    { poly: 'x⁴ + 1 over ℚ', irreducible: true, why: 'Eisenstein after substitution x → x + 1' },
    { poly: 'x² + 2 over ℚ', irreducible: true, why: 'Eisenstein with p = 2' },
    { poly: 'x³ - 2 over ℚ', irreducible: true, why: 'Eisenstein with p = 2' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'irreducibility',
    responseType: 'multiple_choice',
    question: `Is ${scenario.poly} irreducible?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.irreducible ? 0 : 1,
    explanation: scenario.irreducible ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Division algorithm
function generateDivisionQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { dividend: 'x² + 2x + 1', divisor: 'x + 1', quotient: 'x + 1', remainder: '0', why: '(x+1)² = x² + 2x + 1' },
  ] : difficulty === 'medium' ? [
    { dividend: 'x³ + 1', divisor: 'x + 1', quotient: 'x² - x + 1', remainder: '0', why: 'sum of cubes factorization' },
  ] : [
    { dividend: 'x⁴ + 1', divisor: 'x² + 1', quotient: 'x² - 1', remainder: '2', why: '(x²-1)(x²+1) + 2 = x⁴ - 1 + 2 = x⁴ + 1' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'division',
    responseType: 'free_response',
    question: `When dividing ${scenario.dividend} by ${scenario.divisor}, what is the remainder?`,
    correctAnswer: scenario.remainder,
    acceptedAnswers: [scenario.remainder],
    explanation: `${scenario.dividend} = (${scenario.quotient})(${scenario.divisor}) + ${scenario.remainder}. ${scenario.why}`
  };
}

// GCD of polynomials
function generateGCDQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { poly1: 'x² - 1', poly2: 'x - 1', gcd: 'x - 1', why: 'x² - 1 = (x-1)(x+1)' },
  ] : difficulty === 'medium' ? [
    { poly1: 'x³ - 1', poly2: 'x² - 1', gcd: 'x - 1', why: 'common factor is x - 1' },
  ] : [
    { poly1: 'x² + x', poly2: 'x² - x', gcd: 'x', why: 'x(x+1) and x(x-1) share factor x' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.gcd, '1', 'x', 'x + 1']);
  return {
    type: 'gcd',
    responseType: 'multiple_choice',
    question: `What is gcd(${scenario.poly1}, ${scenario.poly2}) in ℚ[x]?`,
    options,
    correctIndex: options.indexOf(scenario.gcd),
    explanation: scenario.why
  };
}

// Roots and irreducibility
function generateRootQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'A polynomial of degree 2 or 3 with no roots is irreducible', correct: true, why: 'if reducible, one factor has degree 1, giving a root' },
  ] : difficulty === 'medium' ? [
    { statement: 'x⁴ + x² + 1 has no real roots but is reducible over ℝ', correct: true, why: 'factors as (x² + x + 1)(x² - x + 1)' },
  ] : [
    { statement: 'Over a finite field, every polynomial has a root in some extension', correct: true, why: 'finite fields have algebraic closures' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'root',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Eisenstein criterion
function generateEisensteinQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'p divides all coefficients except leading, p² does not divide constant term',
    'All coefficients are divisible by a prime',
    'The polynomial has no rational roots',
    'The polynomial is monic'
  ]);

  return {
    type: 'eisenstein',
    responseType: 'multiple_choice',
    question: 'What does Eisenstein\'s criterion require for irreducibility over ℚ?',
    options,
    correctIndex: options.indexOf('p divides all coefficients except leading, p² does not divide constant term'),
    explanation: 'Eisenstein: if p | aᵢ for i < n, p ∤ aₙ, and p² ∤ a₀, then f is irreducible over ℚ.'
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generatePolynomialRingQuestion,
    generateIrreducibilityQuestion,
    generateDivisionQuestion,
    generateGCDQuestion,
    generateRootQuestion,
    generateEisensteinQuestion,
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

export function PolynomialQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Polynomial Rings Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of polynomial rings and irreducibility!</p>
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
