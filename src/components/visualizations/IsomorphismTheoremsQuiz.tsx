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

// First Isomorphism Theorem
function generateFirstIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      statement: 'G/ker(φ) ≅ im(φ)',
      correct: true,
      why: 'This is exactly the First Isomorphism Theorem'
    },
    {
      statement: 'The kernel of a homomorphism is always a normal subgroup',
      correct: true,
      why: 'True: if φ(g) = e, then φ(hgh⁻¹) = φ(h)φ(g)φ(h)⁻¹ = φ(h)eφ(h)⁻¹ = e'
    },
  ] : difficulty === 'medium' ? [
    {
      statement: 'Every normal subgroup is the kernel of some homomorphism',
      correct: true,
      why: 'True: N is the kernel of the canonical projection π: G → G/N'
    },
    {
      statement: 'If φ: G → H is surjective, then G/ker(φ) ≅ H',
      correct: true,
      why: 'True: this is the First Isomorphism Theorem when im(φ) = H'
    },
  ] : [
    {
      statement: 'For φ: G → H, [G : ker(φ)] = |im(φ)|',
      correct: true,
      why: 'True: G/ker(φ) ≅ im(φ) implies their orders are equal'
    },
    {
      statement: 'The First Isomorphism Theorem applies only to finite groups',
      correct: false,
      why: 'False: it applies to all groups, including infinite groups'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'first_iso',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Second Isomorphism Theorem
function generateSecondIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      theorem: 'If H ≤ G and N ⊴ G, then HN ≤ G',
      correct: true,
      why: 'True: HN is a subgroup since N is normal (allows rearranging hn = n\'h\')'
    },
  ] : difficulty === 'medium' ? [
    {
      theorem: 'For H ≤ G and N ⊴ G: HN/N ≅ H/(H ∩ N)',
      correct: true,
      why: 'This is the Second Isomorphism Theorem (Diamond Isomorphism Theorem)'
    },
    {
      theorem: 'H ∩ N is normal in H (when N ⊴ G)',
      correct: true,
      why: 'True: H ∩ N = ker(π|_H) where π: G → G/N is the projection'
    },
  ] : [
    {
      theorem: '[HN : N] = [H : H ∩ N]',
      correct: true,
      why: 'True: |HN/N| = |H/(H∩N)| by Second Isomorphism Theorem'
    },
    {
      theorem: 'If H and N are both normal in G, then HN is normal in G',
      correct: true,
      why: 'True: HN is a product of normal subgroups'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'second_iso',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.theorem}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Third Isomorphism Theorem
function generateThirdIsoQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      setup: 'If K ⊴ H ⊴ G with K ⊴ G',
      conclusion: '(G/K)/(H/K) ≅ G/H',
      correct: true,
      why: 'This is the Third Isomorphism Theorem'
    },
  ] : difficulty === 'medium' ? [
    {
      setup: 'ℤ/6ℤ with subgroup 2ℤ/6ℤ',
      conclusion: '(ℤ/6ℤ)/(2ℤ/6ℤ) ≅ ℤ/2ℤ',
      correct: true,
      why: 'By Third Isomorphism Theorem: ≅ ℤ/2ℤ (order 6/3 = 2)'
    },
  ] : [
    {
      setup: 'For K ⊆ H both normal in G',
      conclusion: 'There\'s a bijection between subgroups of G/K containing H/K and subgroups of G containing H',
      correct: true,
      why: 'This is the Correspondence Theorem (Fourth Isomorphism Theorem)'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'third_iso',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.setup}, then ${scenario.conclusion}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Application problems
function generateApplicationQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      question: 'φ: ℤ → ℤ₆ by φ(n) = n mod 6. What is the kernel?',
      answer: '6ℤ',
      alternates: ['6Z', '6z', '6ℤ', 'multiples of 6'],
      why: 'ker(φ) = {n ∈ ℤ : n ≡ 0 (mod 6)} = 6ℤ'
    },
  ] : difficulty === 'medium' ? [
    {
      question: 'For φ: S₃ → {±1} (sign map), |S₃/ker(φ)| = ?',
      answer: '2',
      alternates: ['2'],
      why: 'im(φ) = {±1} has order 2, so |S₃/A₃| = 2 by First Iso Theorem'
    },
  ] : [
    {
      question: 'If φ: G → H is surjective and |ker(φ)| = 5, |H| = 7, what is |G|?',
      answer: '35',
      alternates: ['35'],
      why: 'G/ker(φ) ≅ H, so |G|/5 = 7, giving |G| = 35'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'application',
    responseType: 'free_response',
    question: scenario.question,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer, ...scenario.alternates],
    explanation: scenario.why
  };
}

// Identify the theorem
function generateIdentifyTheoremQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = [
    {
      statement: 'G/ker(φ) ≅ im(φ)',
      theorem: 'First Isomorphism Theorem',
      why: 'The fundamental connection between kernels and images'
    },
    {
      statement: 'HN/N ≅ H/(H ∩ N)',
      theorem: 'Second Isomorphism Theorem',
      why: 'Also called the Diamond Isomorphism Theorem'
    },
    {
      statement: '(G/K)/(H/K) ≅ G/H',
      theorem: 'Third Isomorphism Theorem',
      why: 'Relates quotients of quotients to quotients'
    },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle(['First Isomorphism Theorem', 'Second Isomorphism Theorem', 'Third Isomorphism Theorem', 'Lagrange\'s Theorem']);

  return {
    type: 'identify_theorem',
    responseType: 'multiple_choice',
    question: `Which theorem states: ${scenario.statement}?`,
    options,
    correctIndex: options.indexOf(scenario.theorem),
    explanation: `This is the ${scenario.theorem}. ${scenario.why}.`
  };
}

// Lattice/Correspondence theorem
function generateCorrespondenceQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      statement: 'Subgroups of G/N correspond to subgroups of G containing N',
      correct: true,
      why: 'The Correspondence (Lattice) Theorem establishes this bijection'
    },
  ] : difficulty === 'medium' ? [
    {
      statement: 'Normal subgroups of G/N correspond to normal subgroups of G containing N',
      correct: true,
      why: 'The correspondence preserves normality'
    },
  ] : [
    {
      statement: 'The correspondence preserves indices: [G:H] = [G/N : H/N]',
      correct: true,
      why: 'The lattice isomorphism preserves index'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'correspondence',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateFirstIsoQuestion,
    generateSecondIsoQuestion,
    generateThirdIsoQuestion,
    generateApplicationQuestion,
    generateIdentifyTheoremQuestion,
    generateCorrespondenceQuestion,
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

export function IsomorphismTheoremsQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Isomorphism Theorems Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of the fundamental isomorphism theorems!</p>
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
