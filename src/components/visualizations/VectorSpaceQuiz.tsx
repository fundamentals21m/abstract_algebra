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

function generateDimensionQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'What is the dimension of R³ as a vector space over R?',
      options: ['1', '2', '3', '∞'],
      correctAnswer: 2,
      explanation: 'R³ has the standard basis {e₁, e₂, e₃} with 3 vectors, so dim(R³) = 3.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'What is the dimension of the space of 2×2 matrices M₂(R) over R?',
      options: ['2', '3', '4', '8'],
      correctAnswer: 2,
      explanation: 'M₂(R) has 4 basis matrices (one 1 in each position), so dim = 4.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'What is the dimension of C as a vector space over R?',
      options: ['1', '2', '∞', 'undefined'],
      correctAnswer: 1,
      explanation: 'C has basis {1, i} over R, so [C:R] = 2.'
    };
  }
}

function generateSubspaceQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'Which of the following is NOT a subspace of R²?',
      options: [
        'The x-axis',
        'The origin {(0,0)}',
        'The line y = x',
        'The line y = x + 1'
      ],
      correctAnswer: 3,
      explanation: 'y = x + 1 does not pass through the origin, so it\'s not closed under scalar multiplication by 0.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'The kernel of a linear transformation T: V → W is always:',
      options: [
        'A subspace of W',
        'A subspace of V',
        'Equal to V',
        'Empty'
      ],
      correctAnswer: 1,
      explanation: 'ker(T) = {v ∈ V : T(v) = 0} is always a subspace of V.'
    };
  } else {
    return {
      type: 'free-response',
      question: 'If T: R⁵ → R³ is a linear transformation with dim(im T) = 2, what is dim(ker T)?',
      correctAnswer: '3',
      acceptableAnswers: ['3', 'three'],
      explanation: 'By the dimension formula: dim(V) = dim(ker T) + dim(im T), so 5 = dim(ker T) + 2.'
    };
  }
}

function generateLinearIndependenceQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'Vectors v₁, v₂, ..., vₙ are linearly independent if:',
      options: [
        'a₁v₁ + ... + aₙvₙ = 0 has only the trivial solution',
        'They span the entire space',
        'They are all unit vectors',
        'They are pairwise orthogonal'
      ],
      correctAnswer: 0,
      explanation: 'Linear independence means the only solution to the linear combination equaling zero is a₁ = ... = aₙ = 0.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'If {v₁, v₂, v₃} is linearly independent and dim(V) = 3, then:',
      options: [
        'These vectors might not span V',
        'These vectors form a basis for V',
        'We need more vectors to span V',
        'V must be R³'
      ],
      correctAnswer: 1,
      explanation: 'In a 3-dimensional space, any linearly independent set of 3 vectors forms a basis.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'In P₂(R) (polynomials of degree ≤ 2), which set is linearly independent?',
      options: [
        '{1, x, x²}',
        '{1, 1+x, 1+x+x²}',
        'Both A and B',
        'Neither'
      ],
      correctAnswer: 2,
      explanation: 'Both form valid bases for P₂(R). The second set can be transformed to the first via row operations.'
    };
  }
}

function generateBasisQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'A basis for a vector space V is:',
      options: [
        'Any spanning set',
        'Any linearly independent set',
        'A linearly independent spanning set',
        'The largest possible set'
      ],
      correctAnswer: 2,
      explanation: 'A basis must be both linearly independent (no redundancy) and spanning (covers all of V).'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'free-response',
      question: 'What is the dimension of the polynomial space Pₙ(F) of polynomials of degree at most n?',
      correctAnswer: 'n+1',
      acceptableAnswers: ['n+1', 'n + 1'],
      explanation: 'The basis {1, x, x², ..., xⁿ} has n+1 elements.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'If S ⊂ V is a linearly independent set and T ⊃ S is a spanning set, then:',
      options: [
        'There exists a basis B with S ⊆ B ⊆ T',
        'S must equal T',
        'dim(V) = |S|',
        'S automatically spans V'
      ],
      correctAnswer: 0,
      explanation: 'We can extend S to a basis by adding vectors from T until we span V.'
    };
  }
}

function generateTransformationQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'A linear transformation T: V → W satisfies:',
      options: [
        'T(av) = aT(v) only',
        'T(u + v) = T(u) + T(v) only',
        'T(au + bv) = aT(u) + bT(v)',
        'T(v) = v for all v'
      ],
      correctAnswer: 2,
      explanation: 'Linearity means T preserves linear combinations: T(au + bv) = aT(u) + bT(v).'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'If T: V → W is a linear isomorphism, then:',
      options: [
        'dim(V) > dim(W)',
        'dim(V) = dim(W)',
        'dim(V) < dim(W)',
        'T must be the identity'
      ],
      correctAnswer: 1,
      explanation: 'An isomorphism is bijective, so ker(T) = {0} and im(T) = W, giving dim(V) = dim(W).'
    };
  } else {
    return {
      type: 'free-response',
      question: 'If T: R⁴ → R⁴ is linear with dim(ker T) = 1, what is the rank of T (dimension of image)?',
      correctAnswer: '3',
      acceptableAnswers: ['3', 'three'],
      explanation: 'rank(T) = dim(V) - dim(ker T) = 4 - 1 = 3.'
    };
  }
}

const questionGenerators = [
  generateDimensionQuestion,
  generateSubspaceQuestion,
  generateLinearIndependenceQuestion,
  generateBasisQuestion,
  generateTransformationQuestion
];

export function VectorSpaceQuiz() {
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
        <h4 className="text-lg font-semibold mb-4">Vector Spaces Quiz</h4>
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
