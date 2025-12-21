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

// Sylow subgroup order
function generateSylowOrderQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { groupOrder: 12, p: 2, sylowOrder: 4, factorization: '12 = 2² × 3' },
    { groupOrder: 18, p: 3, sylowOrder: 9, factorization: '18 = 2 × 3²' },
    { groupOrder: 20, p: 5, sylowOrder: 5, factorization: '20 = 2² × 5' },
  ] : difficulty === 'medium' ? [
    { groupOrder: 72, p: 2, sylowOrder: 8, factorization: '72 = 2³ × 3²' },
    { groupOrder: 56, p: 7, sylowOrder: 7, factorization: '56 = 2³ × 7' },
    { groupOrder: 60, p: 5, sylowOrder: 5, factorization: '60 = 2² × 3 × 5' },
  ] : [
    { groupOrder: 168, p: 2, sylowOrder: 8, factorization: '168 = 2³ × 3 × 7' },
    { groupOrder: 200, p: 5, sylowOrder: 25, factorization: '200 = 2³ × 5²' },
    { groupOrder: 360, p: 3, sylowOrder: 9, factorization: '360 = 2³ × 3² × 5' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'sylow_order',
    responseType: 'free_response',
    question: `What is the order of a Sylow ${scenario.p}-subgroup of a group of order ${scenario.groupOrder}?`,
    correctAnswer: scenario.sylowOrder.toString(),
    acceptedAnswers: [scenario.sylowOrder.toString()],
    explanation: `Since ${scenario.factorization}, the highest power of ${scenario.p} dividing ${scenario.groupOrder} is ${scenario.sylowOrder}.`
  };
}

// Number of Sylow subgroups
function generateNumSylowQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { groupOrder: 15, p: 3, options: ['1', '5', '3', '15'], correct: '1', why: 'n₃ | 5 and n₃ ≡ 1 (mod 3), so n₃ = 1' },
    { groupOrder: 15, p: 5, options: ['1', '3', '5', '15'], correct: '1', why: 'n₅ | 3 and n₅ ≡ 1 (mod 5), so n₅ = 1' },
  ] : difficulty === 'medium' ? [
    { groupOrder: 12, p: 3, options: ['1', '4', '3', '12'], correct: '1 or 4', why: 'n₃ | 4 and n₃ ≡ 1 (mod 3), so n₃ ∈ {1, 4}' },
    { groupOrder: 20, p: 5, options: ['1', '4', '5', '10'], correct: '1', why: 'n₅ | 4 and n₅ ≡ 1 (mod 5), so n₅ = 1' },
  ] : [
    { groupOrder: 168, p: 7, options: ['1', '8', '7', '24'], correct: '8', why: 'n₇ | 24 and n₇ ≡ 1 (mod 7). Candidates: 1, 8. For PSL(2,7), n₇ = 8' },
    { groupOrder: 60, p: 5, options: ['1', '6', '12', '5'], correct: '6', why: 'n₅ | 12 and n₅ ≡ 1 (mod 5). For A₅, n₅ = 6' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(scenario.options);
  return {
    type: 'num_sylow',
    responseType: 'multiple_choice',
    question: `Which values are possible for the number of Sylow ${scenario.p}-subgroups in a group of order ${scenario.groupOrder}?`,
    options,
    correctIndex: options.indexOf(scenario.correct),
    explanation: scenario.why
  };
}

// p-group properties
function generatePGroupQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'Every p-group has trivial center', truth: false, why: 'False: every p-group has nontrivial center (class equation)' },
    { statement: 'Every group of order p² is abelian', truth: true, why: 'True: |G/Z(G)| ∈ {1, p} forces G/Z(G) cyclic, so G abelian' },
  ] : difficulty === 'medium' ? [
    { statement: 'A group of order p³ is always abelian', truth: false, why: 'False: there are non-abelian groups of order p³ (e.g., Heisenberg group)' },
    { statement: 'In a p-group, |Z(G)| is divisible by p', truth: true, why: 'True: class equation shows |Z(G)| ≡ |G| ≡ 0 (mod p)' },
  ] : [
    { statement: 'Every maximal subgroup of a p-group is normal', truth: true, why: 'True: maximal subgroups have index p, hence normal' },
    { statement: 'A p-group of order pⁿ has exactly one subgroup of order pᵏ for each k ≤ n', truth: false, why: 'False: it has at least one, but may have more (e.g., ℤ₂ × ℤ₂ has 3 subgroups of order 2)' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'p_group',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.truth ? 0 : 1,
    explanation: scenario.why
  };
}

// Sylow theorems application
function generateSylowApplicationQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      groupOrder: 15,
      conclusion: 'G is cyclic',
      why: 'n₃ = n₅ = 1, so unique Sylow subgroups are normal. G ≅ ℤ₃ × ℤ₅ ≅ ℤ₁₅'
    },
  ] : difficulty === 'medium' ? [
    {
      groupOrder: 35,
      conclusion: 'G is cyclic',
      why: 'n₅ = 1 (since n₅ | 7, n₅ ≡ 1 mod 5) and n₇ = 1 (since n₇ | 5, n₇ ≡ 1 mod 7). G ≅ ℤ₃₅'
    },
  ] : [
    {
      groupOrder: 56,
      conclusion: 'G has a normal Sylow 7-subgroup',
      why: 'n₇ | 8 and n₇ ≡ 1 (mod 7), so n₇ = 1 or 8. If n₇ = 8, counting elements gives contradiction'
    },
  ];

  const scenario = randomChoice(scenarios);
  const wrongOptions = [
    'G is simple',
    'G has no normal subgroups',
    'G is isomorphic to Sₙ'
  ].filter(x => x !== scenario.conclusion);

  const options = shuffle([scenario.conclusion, ...wrongOptions.slice(0, 3)]);
  return {
    type: 'sylow_application',
    responseType: 'multiple_choice',
    question: `What can we conclude about a group of order ${scenario.groupOrder} using the Sylow theorems?`,
    options,
    correctIndex: options.indexOf(scenario.conclusion),
    explanation: scenario.why
  };
}

// Conjugacy of Sylow subgroups
function generateConjugacyQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'All Sylow p-subgroups of a group are conjugate', truth: true, why: 'Second Sylow Theorem: any two Sylow p-subgroups are conjugate' },
    { statement: 'A unique Sylow p-subgroup must be normal', truth: true, why: 'If n_p = 1, the unique Sylow p-subgroup P = gPg⁻¹ for all g, so P is normal' },
  ] : difficulty === 'medium' ? [
    { statement: 'If n_p = 1, then P is characteristic', truth: true, why: 'Unique Sylow p-subgroup is fixed by all automorphisms, hence characteristic' },
    { statement: 'Sylow p-subgroups of different primes commute', truth: false, why: 'False in general; they may not even intersect trivially' },
  ] : [
    { statement: 'The normalizer of a Sylow p-subgroup contains itself', truth: true, why: 'P ⊆ N_G(P) since P normalizes itself' },
    { statement: 'n_p = [G : N_G(P)] for any Sylow p-subgroup P', truth: true, why: 'Sylow subgroups form single conjugacy class of size [G : N_G(P)]' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'conjugacy',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.truth ? 0 : 1,
    explanation: scenario.why
  };
}

// Counting with Sylow
function generateCountingQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      setup: 'G has order 21 and exactly 7 Sylow 3-subgroups',
      question: 'How many elements of order 3 are there?',
      answer: '14',
      why: 'Each Sylow 3-subgroup has order 3 (ℤ₃) with 2 elements of order 3. 7 × 2 = 14'
    },
  ] : difficulty === 'medium' ? [
    {
      setup: 'G has order 20 and n₅ = 1',
      question: 'How many elements of order 5 are there?',
      answer: '4',
      why: 'Unique Sylow 5-subgroup has order 5, so 4 elements of order 5'
    },
  ] : [
    {
      setup: 'G has order 56 = 8 × 7 with n₇ = 8',
      question: 'How many elements of order 7 are there?',
      answer: '48',
      why: 'Each of 8 Sylow 7-subgroups contributes 6 elements of order 7: 8 × 6 = 48'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'counting',
    responseType: 'free_response',
    question: `${scenario.setup}. ${scenario.question}`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateSylowOrderQuestion,
    generateNumSylowQuestion,
    generatePGroupQuestion,
    generateSylowApplicationQuestion,
    generateConjugacyQuestion,
    generateCountingQuestion,
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

export function SylowQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Sylow Theorems Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of Sylow subgroups and p-groups!</p>
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
