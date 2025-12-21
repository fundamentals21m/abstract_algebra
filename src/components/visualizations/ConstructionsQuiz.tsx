import { useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FreeResponseQuestion {
  type: 'free-response';
  question: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanation: string;
}

type Question = MultipleChoiceQuestion | FreeResponseQuestion;

function generateConstructibilityQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'A real number α is constructible if [Q(α):Q] is:',
      options: [
        'Any integer',
        'A prime number',
        'A power of 2',
        'Less than 5'
      ],
      correctAnswer: 2,
      explanation: 'α is constructible ⟺ [Q(α):Q] = 2^n for some n. This is because compass-straightedge operations only solve quadratic equations.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'Which number is NOT constructible?',
      options: [
        '√2',
        '√(√2)',
        '∛2',
        '√2 + √3'
      ],
      correctAnswer: 2,
      explanation: '∛2 has minimal polynomial x³ - 2, so [Q(∛2):Q] = 3, which is not a power of 2.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'The degree [Q(cos 20°):Q] equals:',
      options: ['2', '3', '4', '6'],
      correctAnswer: 1,
      explanation: 'cos(20°) satisfies 8x³ - 6x - 1 = 0 (irreducible), so the degree is 3, making the angle untrisectable.'
    };
  }
}

function generateImpossibleQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'Squaring the circle is impossible because:',
      options: [
        'π is irrational',
        'π is transcendental',
        'π is negative',
        'Circles have no area'
      ],
      correctAnswer: 1,
      explanation: 'Squaring the circle requires √π, but π is transcendental (not algebraic), so not constructible.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'Doubling the cube requires constructing:',
      options: ['√2', '∛2', '∜2', '2^(1/6)'],
      correctAnswer: 1,
      explanation: 'A cube of double volume has side ∛2, which has degree 3 over Q, not a power of 2.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'Trisecting a 60° angle would require constructing:',
      options: [
        'sin(20°)',
        'cos(20°)',
        'tan(20°)',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'Trisecting 60° gives 20°. All trig values of 20° have degree 3 over Q, so all are non-constructible.'
    };
  }
}

function generatePolygonQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'A regular 17-gon is:',
      options: [
        'Not constructible',
        'Constructible (proven by Gauss)',
        'Constructible only with a protractor',
        'Impossible to define'
      ],
      correctAnswer: 1,
      explanation: 'Gauss proved the 17-gon is constructible because 17 is a Fermat prime (2^(2^2) + 1 = 17).'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'A regular n-gon is constructible if n is:',
      options: [
        'Any prime',
        'Any odd number',
        '2^k times a product of distinct Fermat primes',
        'A power of 3'
      ],
      correctAnswer: 2,
      explanation: 'By the Gauss-Wantzel theorem, n-gon is constructible ⟺ n = 2^k · p₁ · p₂ · ... where pᵢ are distinct Fermat primes.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'Which regular polygon is NOT constructible?',
      options: [
        '15-gon',
        '17-gon',
        '20-gon',
        '7-gon'
      ],
      correctAnswer: 3,
      explanation: '7 is not a Fermat prime and cannot be written as 2^k times Fermat primes, so the 7-gon is not constructible.'
    };
  }
}

function generateFermatQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'A Fermat prime has the form:',
      options: [
        '2^n + 1',
        '2^(2^n) + 1',
        'n^2 + 1',
        '2n + 1'
      ],
      correctAnswer: 1,
      explanation: 'Fermat primes are of the form 2^(2^n) + 1. Known ones: 3, 5, 17, 257, 65537.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'How many Fermat primes are known?',
      options: ['3', '5', '7', 'Infinitely many'],
      correctAnswer: 1,
      explanation: 'Only 5 Fermat primes are known: 3, 5, 17, 257, 65537. It\'s unknown if more exist.'
    };
  } else {
    return {
      type: 'free-response',
      question: 'What is the largest known Fermat prime?',
      correctAnswer: '65537',
      acceptableAnswers: ['65537', '2^16 + 1', '2^(2^4) + 1'],
      explanation: 'F₄ = 2^(2^4) + 1 = 65537 is the largest known Fermat prime.'
    };
  }
}

function generateHistoryQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'Who proved the regular 17-gon is constructible?',
      options: ['Euclid', 'Gauss', 'Galois', 'Fermat'],
      correctAnswer: 1,
      explanation: 'Carl Friedrich Gauss proved this in 1796 at age 19, reviving interest in classical construction problems.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'The impossibility of trisecting an angle was proven using:',
      options: [
        'Calculus',
        'Field extension theory',
        'Coordinate geometry',
        'Number theory'
      ],
      correctAnswer: 1,
      explanation: 'The impossibility proofs use field extensions: constructible ⟺ degree is a power of 2.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'The three classical construction problems (doubling cube, trisecting angle, squaring circle) were proven impossible in:',
      options: [
        'Ancient Greece',
        'The Renaissance',
        'The 19th century',
        'The 20th century'
      ],
      correctAnswer: 2,
      explanation: 'Wantzel (1837) proved the first two; Lindemann (1882) proved π is transcendental, settling the third.'
    };
  }
}

const questionGenerators = [
  generateConstructibilityQuestion,
  generateImpossibleQuestion,
  generatePolygonQuestion,
  generateFermatQuestion,
  generateHistoryQuestion
];

export function ConstructionsQuiz() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    const newQuestions = questionGenerators.map(gen => gen(difficulty));
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setTextAnswer('');
    setAnswered(false);
    setQuizStarted(true);
  };

  const handleAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'multiple-choice') {
      isCorrect = selectedAnswer === question.correctAnswer;
    } else {
      isCorrect = question.acceptableAnswers.some(
        ans => textAnswer.toLowerCase().trim() === ans.toLowerCase()
      );
    }

    if (isCorrect) setScore(score + 1);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (!quizStarted) {
    return (
      <div className="card">
        <h4 className="text-lg font-semibold mb-4">Geometric Constructions Quiz</h4>
        <div className="mb-4">
          <label className="block text-sm text-dark-400 mb-2">Select Difficulty:</label>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded capitalize ${
                  difficulty === d
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <button onClick={startQuiz} className="btn-primary">
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="card">
        <h4 className="text-lg font-semibold mb-4">Quiz Complete!</h4>
        <p className="text-xl mb-4">
          Score: {score} / {questions.length}
        </p>
        <button onClick={() => setQuizStarted(false)} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Question {currentQuestion + 1} of {questions.length}</h4>
        <span className="text-sm text-dark-400 capitalize">{difficulty}</span>
      </div>

      <p className="mb-4">{question.question}</p>

      {question.type === 'multiple-choice' ? (
        <div className="space-y-2 mb-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !answered && setSelectedAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-3 rounded transition-colors ${
                answered
                  ? idx === question.correctAnswer
                    ? 'bg-green-600/30 border border-green-500'
                    : idx === selectedAnswer
                    ? 'bg-red-600/30 border border-red-500'
                    : 'bg-dark-700'
                  : selectedAnswer === idx
                  ? 'bg-primary-600/30 border border-primary-500'
                  : 'bg-dark-700 hover:bg-dark-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={answered}
            className="w-full p-3 rounded bg-dark-700 border border-dark-600 focus:border-primary-500 focus:outline-none"
            placeholder="Enter your answer"
          />
          {answered && (
            <p className={`mt-2 ${
              question.acceptableAnswers.some(a => textAnswer.toLowerCase().trim() === a.toLowerCase())
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              Correct answer: {question.correctAnswer}
            </p>
          )}
        </div>
      )}

      {answered && (
        <div className="mb-4 p-3 bg-dark-700 rounded">
          <p className="text-dark-300">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-2">
        {!answered ? (
          <button
            onClick={handleAnswer}
            disabled={question.type === 'multiple-choice' ? selectedAnswer === null : textAnswer.trim() === ''}
            className="btn-primary disabled:opacity-50"
          >
            Submit Answer
          </button>
        ) : (
          <button onClick={nextQuestion} className="btn-primary">
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
