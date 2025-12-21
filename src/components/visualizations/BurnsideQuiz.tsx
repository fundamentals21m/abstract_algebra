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

// Burnside's Lemma statement
function generateBurnsideStatementQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    '|X/G| = (1/|G|) Σ_{g∈G} |X^g|',
    '|X/G| = |X| × |G|',
    '|X/G| = |X| / |G|',
    '|X/G| = Σ_{x∈X} |G_x|'
  ]);

  return {
    type: 'burnside_statement',
    responseType: 'multiple_choice',
    question: 'What is the correct statement of Burnside\'s Lemma (Cauchy-Frobenius Lemma)?',
    options,
    correctIndex: options.indexOf('|X/G| = (1/|G|) Σ_{g∈G} |X^g|'),
    explanation: 'Burnside\'s Lemma states that the number of orbits equals the average number of fixed points: |X/G| = (1/|G|) Σ_{g∈G} |X^g|, where X^g = {x ∈ X : g·x = x}.'
  };
}

// Fixed point counting
function generateFixedPointCountQuestion(difficulty: Difficulty): FreeResponseQuestion {
  type BurnsideScenario = {
    setup: string;
    answer: string;
    why: string;
  };

  const scenarios: BurnsideScenario[] = difficulty === 'easy' ? [
    {
      setup: 'ℤ₂ acts on a set of 4 colored beads (2 red, 2 blue) by reflection',
      answer: '4',
      why: 'Identity fixes all 6 arrangements, reflection fixes 2 (symmetric ones). (6+2)/2 = 4 distinct necklaces'
    },
  ] : difficulty === 'medium' ? [
    {
      setup: 'ℤ₃ acts on colorings of triangle vertices with 2 colors',
      answer: '4',
      why: 'Identity: 2³=8 fixed. Rotations: only monochromatic colorings (2 each). (8+2+2)/3 = 4'
    },
  ] : [
    {
      setup: 'D₃ acts on colorings of triangle vertices with 2 colors',
      answer: '4',
      why: '(8 + 2 + 2 + 4 + 4 + 4)/6 = 24/6 = 4 distinct colorings'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'fixed_point_count',
    responseType: 'free_response',
    question: `Using Burnside's Lemma: ${scenario.setup}. How many distinct arrangements are there?`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

// Orbit counting for necklaces
function generateNecklaceQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { n: 3, colors: 2, answer: '4', rotationsOnly: true, why: '(8+2+2)/3 = 4 necklaces' },
    { n: 4, colors: 2, answer: '6', rotationsOnly: true, why: '(16+2+4+2)/4 = 6 necklaces' },
  ] : difficulty === 'medium' ? [
    { n: 5, colors: 2, answer: '8', rotationsOnly: true, why: 'ℤ₅ action: (32+2+2+2+2)/5 = 8' },
    { n: 6, colors: 2, answer: '14', rotationsOnly: true, why: 'ℤ₆ action: (64+2+4+8+4+2)/6 = 14' },
  ] : [
    { n: 4, colors: 3, answer: '24', rotationsOnly: true, why: 'ℤ₄ on 3 colors: (81+3+9+3)/4 = 24' },
    { n: 3, colors: 4, answer: '24', rotationsOnly: true, why: 'ℤ₃ on 4 colors: (64+4+4)/3 = 24' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'necklace',
    responseType: 'free_response',
    question: `How many distinct necklaces with ${scenario.n} beads using ${scenario.colors} colors (rotations only, no reflections)?`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

// Bracelet counting (including reflections)
function generateBraceletQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      n: 3,
      colors: 2,
      necklaces: 4,
      bracelets: 4,
      why: 'All 3-bead necklaces are symmetric under reflection'
    },
  ] : difficulty === 'medium' ? [
    {
      n: 4,
      colors: 2,
      necklaces: 6,
      bracelets: 6,
      why: 'D₄ action gives same count as ℤ₄ for binary necklaces'
    },
  ] : [
    {
      n: 5,
      colors: 2,
      necklaces: 8,
      bracelets: 8,
      why: 'D₅ action: some necklaces merge under reflections'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'bracelet',
    responseType: 'multiple_choice',
    question: `There are ${scenario.necklaces} necklaces with ${scenario.n} beads and ${scenario.colors} colors. How many bracelets (allowing flips)?`,
    options: shuffle([scenario.bracelets.toString(), (scenario.bracelets + 2).toString(), (scenario.bracelets - 1).toString(), (scenario.bracelets * 2).toString()]),
    correctIndex: 0,
    explanation: `${scenario.bracelets} bracelets. ${scenario.why}.`
  };
}

// Fixed points of specific elements
function generateSpecificFixedQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      group: 'ℤ₄',
      element: 'r² (180° rotation)',
      set: '4-bead necklace with 2 colors',
      answer: '4',
      why: 'r² swaps positions (1,3) and (2,4). Fixed: same color in swapped pairs. 2² = 4'
    },
  ] : difficulty === 'medium' ? [
    {
      group: 'D₄',
      element: 'a reflection through opposite vertices',
      set: '4-vertex square colorings with 2 colors',
      answer: '4',
      why: 'Two vertices fixed, two swapped. 2¹ × 2¹ = 4 fixed colorings'
    },
  ] : [
    {
      group: 'S₄',
      element: 'a 4-cycle (1234)',
      set: 'colorings of 4 elements with 3 colors',
      answer: '3',
      why: 'All 4 elements must have same color: 3 choices'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'specific_fixed',
    responseType: 'free_response',
    question: `For ${scenario.group} acting on ${scenario.set}, how many colorings are fixed by ${scenario.element}?`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer],
    explanation: scenario.why
  };
}

// Understanding X^g notation
function generateNotationQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'The set of elements fixed by g',
    'The orbit of g',
    'The stabilizer of g',
    'The conjugacy class of g'
  ]);

  return {
    type: 'notation',
    responseType: 'multiple_choice',
    question: 'In Burnside\'s Lemma, what does X^g denote?',
    options,
    correctIndex: options.indexOf('The set of elements fixed by g'),
    explanation: 'X^g = {x ∈ X : g·x = x} is the set of fixed points of g. Burnside\'s Lemma averages |X^g| over all group elements.'
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateBurnsideStatementQuestion,
    generateFixedPointCountQuestion,
    generateNecklaceQuestion,
    generateBraceletQuestion,
    generateSpecificFixedQuestion,
    generateNotationQuestion,
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

export function BurnsideQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Burnside's Lemma Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of counting orbits and Burnside's Lemma!</p>
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
