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

function generateUFDDefinitionQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'What does UFD stand for?',
      options: [
        'Unique Field Domain',
        'Unique Factorization Domain',
        'Universal Factor Domain',
        'Unified Function Domain'
      ],
      correctAnswer: 1,
      explanation: 'UFD stands for Unique Factorization Domain, where every element factors uniquely into irreducibles.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'In a UFD, which of the following is true?',
      options: [
        'Prime and irreducible are equivalent',
        'Every irreducible is a unit',
        'Factorization may not exist',
        'There are no prime elements'
      ],
      correctAnswer: 0,
      explanation: 'In a UFD, an element is prime if and only if it is irreducible. This equivalence characterizes UFDs.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'Which ring is NOT a UFD?',
      options: [
        'Z (the integers)',
        'F[x] for a field F',
        'Z[√-5]',
        'Z[i] (Gaussian integers)'
      ],
      correctAnswer: 2,
      explanation: 'Z[√-5] is not a UFD: 6 = 2·3 = (1+√-5)(1-√-5) gives two different factorizations into irreducibles.'
    };
  }
}

function generateHierarchyQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'Which is the correct ordering of these domain types?',
      options: [
        'Integral Domains ⊂ PIDs ⊂ Euclidean Domains ⊂ Fields',
        'Fields ⊂ Euclidean Domains ⊂ PIDs ⊂ UFDs',
        'UFDs ⊂ PIDs ⊂ Euclidean Domains ⊂ Fields',
        'PIDs ⊂ UFDs ⊂ Integral Domains ⊂ Fields'
      ],
      correctAnswer: 1,
      explanation: 'The hierarchy is: Fields ⊂ Euclidean Domains ⊂ PIDs ⊂ UFDs ⊂ Integral Domains.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'Which statement is correct about Z[x]?',
      options: [
        'It is a PID',
        'It is a UFD but not a PID',
        'It is not a UFD',
        'It is a Euclidean domain'
      ],
      correctAnswer: 1,
      explanation: 'Z[x] is a UFD (polynomials over a UFD form a UFD) but not a PID: the ideal (2, x) is not principal.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'If D is a PID, which is always true?',
      options: [
        'D is a field',
        'D is a Euclidean domain',
        'D is a UFD',
        'D is finite'
      ],
      correctAnswer: 2,
      explanation: 'Every PID is a UFD. However, not every PID is Euclidean (e.g., Z[(1+√-19)/2]).'
    };
  }
}

function generateEuclideanQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'What is the norm function for Z (integers) in the Euclidean algorithm?',
      options: [
        'ν(n) = n',
        'ν(n) = |n|',
        'ν(n) = n²',
        'ν(n) = 1'
      ],
      correctAnswer: 1,
      explanation: 'For integers, the norm is the absolute value: ν(n) = |n|.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'free-response',
      question: 'What is gcd(252, 105) using the Euclidean algorithm?',
      correctAnswer: '21',
      acceptableAnswers: ['21', 'twenty-one'],
      explanation: '252 = 105·2 + 42, 105 = 42·2 + 21, 42 = 21·2 + 0. So gcd = 21.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'For F[x] (polynomials over field F), the Euclidean norm is:',
      options: [
        'ν(f) = |coefficients|',
        'ν(f) = deg(f)',
        'ν(f) = f(0)',
        'ν(f) = leading coefficient'
      ],
      correctAnswer: 1,
      explanation: 'For polynomials, the degree function serves as the Euclidean norm.'
    };
  }
}

function generateGCDQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'In a UFD, the GCD of two elements:',
      options: [
        'May not exist',
        'Always exists',
        'Is always 1',
        'Must be a prime'
      ],
      correctAnswer: 1,
      explanation: 'In any UFD, any two nonzero elements have a GCD (found by comparing factorizations).'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'Bézout\'s identity (gcd(a,b) = xa + yb) holds in:',
      options: [
        'All rings',
        'All integral domains',
        'All UFDs',
        'All PIDs (and Euclidean domains)'
      ],
      correctAnswer: 3,
      explanation: 'Bézout\'s identity holds in PIDs because gcd(a,b) generates the ideal (a,b) = (d).'
    };
  } else {
    return {
      type: 'free-response',
      question: 'In the Gaussian integers Z[i], what is the norm of 3 + 4i?',
      correctAnswer: '25',
      acceptableAnswers: ['25', 'twenty-five'],
      explanation: 'The norm is |3 + 4i|² = 3² + 4² = 9 + 16 = 25.'
    };
  }
}

function generateFactorizationQuestion(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    return {
      type: 'multiple-choice',
      question: 'The Fundamental Theorem of Arithmetic is a statement about unique factorization in:',
      options: [
        'The reals R',
        'The integers Z',
        'The rationals Q',
        'Polynomials'
      ],
      correctAnswer: 1,
      explanation: 'The Fundamental Theorem of Arithmetic says Z is a UFD: every integer factors uniquely into primes.'
    };
  } else if (difficulty === 'medium') {
    return {
      type: 'multiple-choice',
      question: 'Two factorizations in a UFD are the same "up to order and associates." Associates differ by:',
      options: [
        'Any nonzero element',
        'A prime element',
        'A unit (invertible element)',
        'An irreducible element'
      ],
      correctAnswer: 2,
      explanation: 'Associates are elements that differ by multiplication by a unit. In Z, associates differ by ±1.'
    };
  } else {
    return {
      type: 'multiple-choice',
      question: 'In Z[√-5], which elements are irreducible but NOT prime?',
      options: [
        '2 and 3',
        '1 + √-5 and 1 - √-5',
        'Both A and B',
        'There are no such elements'
      ],
      correctAnswer: 2,
      explanation: 'All of 2, 3, 1+√-5, 1-√-5 are irreducible in Z[√-5], but none are prime (the domain is not a UFD).'
    };
  }
}

const questionGenerators = [
  generateUFDDefinitionQuestion,
  generateHierarchyQuestion,
  generateEuclideanQuestion,
  generateGCDQuestion,
  generateFactorizationQuestion
];

export function UFDQuiz() {
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
        <h4 className="text-lg font-semibold mb-4">UFDs & Euclidean Domains Quiz</h4>
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
