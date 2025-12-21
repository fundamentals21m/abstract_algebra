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

// Field definition
function generateFieldDefinitionQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'A commutative ring with unity where every nonzero element has a multiplicative inverse',
    'Any ring with division',
    'A ring where every element is invertible',
    'A commutative ring'
  ]);

  return {
    type: 'field_definition',
    responseType: 'multiple_choice',
    question: 'What is a field?',
    options,
    correctIndex: options.indexOf('A commutative ring with unity where every nonzero element has a multiplicative inverse'),
    explanation: 'A field is a commutative division ring: every nonzero element a has inverse a⁻¹ with a·a⁻¹ = 1.'
  };
}

// Is it a field?
function generateIsFieldQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { ring: 'ℚ', isField: true, why: 'every nonzero rational has a multiplicative inverse' },
    { ring: 'ℤ', isField: false, why: '2 has no integer inverse' },
    { ring: 'ℝ', isField: true, why: 'real numbers form a field' },
  ] : difficulty === 'medium' ? [
    { ring: 'ℤₚ (p prime)', isField: true, why: 'every nonzero element is coprime to p, hence invertible' },
    { ring: 'ℤ₆', isField: false, why: '2 and 3 are zero divisors, not invertible' },
    { ring: 'ℂ', isField: true, why: 'complex numbers form a field' },
  ] : [
    { ring: 'ℚ(√2)', isField: true, why: 'field extension of ℚ' },
    { ring: 'ℤ[i]', isField: false, why: 'Gaussian integers: 2 has no inverse in ℤ[i]' },
    { ring: 'ℤ₄', isField: false, why: '2² = 0, so 2 is a zero divisor' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'is_field',
    responseType: 'multiple_choice',
    question: `Is ${scenario.ring} a field?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.isField ? 0 : 1,
    explanation: scenario.isField ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Field of fractions
function generateFractionFieldQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { domain: 'ℤ', fractionField: 'ℚ', why: 'rationals are fractions of integers' },
  ] : difficulty === 'medium' ? [
    { domain: 'ℤ[x]', fractionField: 'ℚ(x)', why: 'field of rational functions over ℚ' },
    { domain: 'F[x] (F a field)', fractionField: 'F(x)', why: 'rational functions over F' },
  ] : [
    { domain: 'ℤ[√2]', fractionField: 'ℚ(√2)', why: 'fractions of elements of ℤ[√2]' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.fractionField, 'ℤ', 'ℝ', 'ℂ']);

  return {
    type: 'fraction_field',
    responseType: 'multiple_choice',
    question: `What is the field of fractions of ${scenario.domain}?`,
    options,
    correctIndex: options.indexOf(scenario.fractionField),
    explanation: scenario.why
  };
}

// Characteristic
function generateCharacteristicQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { field: 'ℚ', char: '0', why: 'no positive n with n·1 = 0' },
    { field: 'ℤ₃', char: '3', why: '3·1 = 0 in ℤ₃' },
    { field: 'ℤ₅', char: '5', why: '5·1 = 0 in ℤ₅' },
  ] : difficulty === 'medium' ? [
    { field: 'ℝ', char: '0', why: 'contains ℚ, so characteristic 0' },
    { field: 'ℤ₂', char: '2', why: '1 + 1 = 0 in ℤ₂' },
  ] : [
    { field: 'ℂ', char: '0', why: 'contains ℚ, so characteristic 0' },
    { field: 'GF(8) = 𝔽₈', char: '2', why: 'extension of ℤ₂ has same characteristic' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'characteristic',
    responseType: 'free_response',
    question: `What is the characteristic of ${scenario.field}?`,
    correctAnswer: scenario.char,
    acceptedAnswers: [scenario.char],
    explanation: `char(${scenario.field}) = ${scenario.char}. ${scenario.why}.`
  };
}

// Field extensions
function generateExtensionQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'ℂ is a field extension of ℝ', correct: true, why: 'ℝ ⊂ ℂ and both are fields' },
    { statement: 'ℝ is a field extension of ℚ', correct: true, why: 'ℚ ⊂ ℝ and both are fields' },
  ] : difficulty === 'medium' ? [
    { statement: '[ℂ : ℝ] = 2', correct: true, why: 'basis {1, i} over ℝ' },
    { statement: 'ℚ(√2) has degree 2 over ℚ', correct: true, why: 'basis {1, √2}, minimal polynomial x² - 2' },
  ] : [
    { statement: '[ℚ(∛2) : ℚ] = 3', correct: true, why: 'minimal polynomial x³ - 2 has degree 3' },
    { statement: 'Every finite extension is algebraic', correct: true, why: 'elements satisfy polynomials over the base field' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'extension',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Finite fields
function generateFiniteFieldQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'A finite field has order pⁿ for some prime p', correct: true, why: 'characteristic must be prime, order is power of characteristic' },
  ] : difficulty === 'medium' ? [
    { statement: 'There exists a field of order 6', correct: false, why: '6 = 2·3 is not a prime power' },
    { statement: 'There exists a field of order 8', correct: true, why: '8 = 2³, so GF(8) exists' },
  ] : [
    { statement: 'All fields of order pⁿ are isomorphic', correct: true, why: 'GF(pⁿ) is unique up to isomorphism' },
    { statement: 'GF(4) contains ℤ₂ as a subfield', correct: true, why: 'the prime subfield' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'finite_field',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateFieldDefinitionQuestion,
    generateIsFieldQuestion,
    generateFractionFieldQuestion,
    generateCharacteristicQuestion,
    generateExtensionQuestion,
    generateFiniteFieldQuestion,
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

export function FieldsQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Fields Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of fields, extensions, and characteristics!</p>
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
