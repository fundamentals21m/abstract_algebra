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

// Fermat's Little Theorem
function generateFermatQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { a: 2, p: 5, answer: '1', why: '2⁴ = 16 ≡ 1 (mod 5)' },
    { a: 3, p: 7, answer: '1', why: '3⁶ ≡ 1 (mod 7) by Fermat' },
  ] : difficulty === 'medium' ? [
    { a: 5, p: 11, answer: '1', why: '5¹⁰ ≡ 1 (mod 11) by Fermat' },
    { a: 7, p: 13, answer: '1', why: '7¹² ≡ 1 (mod 13) by Fermat' },
  ] : [
    { a: 2, p: 17, answer: '1', why: '2¹⁶ ≡ 1 (mod 17) by Fermat' },
    { a: 3, p: 23, answer: '1', why: '3²² ≡ 1 (mod 23) by Fermat' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'fermat',
    responseType: 'free_response',
    question: `By Fermat's Little Theorem, ${scenario.a}^${scenario.p - 1} ≡ ? (mod ${scenario.p})`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: `${scenario.why}. Fermat: aᵖ⁻¹ ≡ 1 (mod p) when gcd(a, p) = 1.`
  };
}

// Euler's Theorem
function generateEulerQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { n: 10, phi: 4, why: 'φ(10) = φ(2)φ(5) = 1·4 = 4' },
    { n: 12, phi: 4, why: 'φ(12) = φ(4)φ(3) = 2·2 = 4' },
  ] : difficulty === 'medium' ? [
    { n: 15, phi: 8, why: 'φ(15) = φ(3)φ(5) = 2·4 = 8' },
    { n: 20, phi: 8, why: 'φ(20) = φ(4)φ(5) = 2·4 = 8' },
  ] : [
    { n: 36, phi: 12, why: 'φ(36) = φ(4)φ(9) = 2·6 = 12' },
    { n: 100, phi: 40, why: 'φ(100) = φ(4)φ(25) = 2·20 = 40' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'euler',
    responseType: 'free_response',
    question: `What is φ(${scenario.n}) (Euler's totient function)?`,
    correctAnswer: scenario.phi.toString(),
    acceptedAnswers: [scenario.phi.toString()],
    explanation: scenario.why
  };
}

// RSA basics
function generateRSAQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      question: 'In RSA, what is the relationship between e and d?',
      correct: 'ed ≡ 1 (mod φ(n))',
      why: 'e and d are multiplicative inverses mod φ(n)'
    },
  ] : difficulty === 'medium' ? [
    {
      question: 'In RSA with n = pq, why must p and q be kept secret?',
      correct: 'Knowing p and q allows computing φ(n) = (p-1)(q-1), then finding d',
      why: 'The private key d depends on knowing φ(n)'
    },
  ] : [
    {
      question: 'Why does RSA decryption work: (mᵉ)ᵈ ≡ m (mod n)?',
      correct: 'Because ed ≡ 1 (mod φ(n)), so mᵉᵈ = m^(1 + kφ(n)) ≡ m (mod n) by Euler',
      why: 'Euler\'s theorem: m^φ(n) ≡ 1 (mod n) when gcd(m, n) = 1'
    },
  ];

  const scenario = randomChoice(scenarios);
  const wrongAnswers = [
    'e = d always',
    'e + d = n',
    'e and d are primes'
  ];
  const options = shuffle([scenario.correct, ...wrongAnswers.slice(0, 3)]);

  return {
    type: 'rsa',
    responseType: 'multiple_choice',
    question: scenario.question,
    options,
    correctIndex: options.indexOf(scenario.correct),
    explanation: scenario.why
  };
}

// Modular arithmetic
function generateModularQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { computation: '17 mod 5', answer: '2', why: '17 = 3·5 + 2' },
    { computation: '23 mod 7', answer: '2', why: '23 = 3·7 + 2' },
  ] : difficulty === 'medium' ? [
    { computation: '2¹⁰ mod 11', answer: '1', why: 'By Fermat: 2¹⁰ ≡ 1 (mod 11)' },
    { computation: '3⁴ mod 5', answer: '1', why: '3⁴ = 81 = 16·5 + 1, or by Fermat' },
  ] : [
    { computation: '7⁻¹ mod 11', answer: '8', why: '7·8 = 56 = 5·11 + 1 ≡ 1 (mod 11)' },
    { computation: '5⁻¹ mod 17', answer: '7', why: '5·7 = 35 = 2·17 + 1 ≡ 1 (mod 17)' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'modular',
    responseType: 'free_response',
    question: `Compute ${scenario.computation}:`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

// Chinese Remainder Theorem
function generateCRTQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      statement: 'CRT applies when the moduli are pairwise coprime',
      correct: true,
      why: 'gcd(mᵢ, mⱼ) = 1 for all i ≠ j is required for CRT'
    },
  ] : difficulty === 'medium' ? [
    {
      statement: 'x ≡ 1 (mod 3), x ≡ 2 (mod 5) has unique solution mod 15',
      correct: true,
      why: 'CRT: unique solution mod 3·5 = 15; x = 7 works'
    },
  ] : [
    {
      statement: 'ℤₘₙ ≅ ℤₘ × ℤₙ when gcd(m,n) = 1',
      correct: true,
      why: 'This is the ring isomorphism version of CRT'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'crt',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Order of elements
function generateOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { element: '2 in ℤ₃*', order: '2', why: '2² = 4 ≡ 1 (mod 3)' },
    { element: '2 in ℤ₅*', order: '4', why: '2¹=2, 2²=4, 2³=3, 2⁴=1' },
  ] : difficulty === 'medium' ? [
    { element: '3 in ℤ₇*', order: '6', why: '3 is a primitive root mod 7' },
    { element: '2 in ℤ₇*', order: '3', why: '2³ = 8 ≡ 1 (mod 7)' },
  ] : [
    { element: '2 in ℤ₁₁*', order: '10', why: '2 is a primitive root mod 11' },
    { element: '3 in ℤ₁₁*', order: '5', why: '3⁵ = 243 ≡ 1 (mod 11)' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'order',
    responseType: 'free_response',
    question: `What is the multiplicative order of ${scenario.element}?`,
    correctAnswer: scenario.order,
    acceptedAnswers: [scenario.order],
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateFermatQuestion,
    generateEulerQuestion,
    generateRSAQuestion,
    generateModularQuestion,
    generateCRTQuestion,
    generateOrderQuestion,
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

export function NumberTheoryQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Number Theory Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of Fermat, Euler, and RSA!</p>
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
