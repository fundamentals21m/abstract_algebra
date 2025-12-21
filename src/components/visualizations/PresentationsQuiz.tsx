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

// Identify group from presentation
function generateIdentifyQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { presentation: '⟨a | aⁿ = e⟩', group: 'ℤₙ', why: 'One generator with order n gives cyclic group' },
    { presentation: '⟨a | ⟩', group: 'ℤ', why: 'One generator with no relations gives infinite cyclic group' },
  ] : difficulty === 'medium' ? [
    { presentation: '⟨r, s | rⁿ = s² = e, srs = r⁻¹⟩', group: 'Dₙ', why: 'Standard presentation of dihedral group' },
    { presentation: '⟨a, b | ab = ba⟩', group: 'ℤ × ℤ', why: 'Free abelian group on two generators' },
  ] : [
    { presentation: '⟨a, b | a² = b² = (ab)² = e⟩', group: 'V₄ (Klein four-group)', why: 'Two involutions whose product is also an involution' },
    { presentation: '⟨a, b | a² = b³ = (ab)³ = e⟩', group: 'A₄', why: 'Standard (2,3,3) presentation of A₄' },
  ];

  const scenario = randomChoice(scenarios);
  const options = shuffle([scenario.group, 'ℤ', 'Sₙ', 'free group']);

  return {
    type: 'identify',
    responseType: 'multiple_choice',
    question: `What group does the presentation ${scenario.presentation} define?`,
    options,
    correctIndex: options.indexOf(scenario.group),
    explanation: scenario.why
  };
}

// Presentation notation
function generateNotationQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'Generators and relations that define the group',
    'A list of all group elements',
    'The multiplication table of the group',
    'The center of the group'
  ]);

  return {
    type: 'notation',
    responseType: 'multiple_choice',
    question: 'In a group presentation ⟨S | R⟩, what do S and R represent?',
    options,
    correctIndex: options.indexOf('Generators and relations that define the group'),
    explanation: 'S is the set of generators, R is the set of relations. The group is F(S) / ⟨⟨R⟩⟩, the free group modulo the normal closure of R.'
  };
}

// Relations in standard groups
function generateRelationQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      group: 'ℤₙ',
      relation: 'aⁿ = e',
      why: 'The defining relation of cyclic group of order n'
    },
  ] : difficulty === 'medium' ? [
    {
      group: 'Dₙ',
      relation: 'srs = r⁻¹ (or srs⁻¹ = r⁻¹)',
      why: 'Reflection conjugates rotation to its inverse'
    },
    {
      group: 'abelian group',
      relation: 'ab = ba (for all generators)',
      why: 'Commutativity relations make the group abelian'
    },
  ] : [
    {
      group: 'Quaternion Q₈',
      relation: 'i² = j² = k² = ijk = -1',
      why: 'The quaternion relations with -1 as the unique element of order 2'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'relation',
    responseType: 'multiple_choice',
    question: `Which relation is characteristic of ${scenario.group}?`,
    options: shuffle([scenario.relation, 'ab = e', 'a = b', 'aⁿ = bⁿ']),
    correctIndex: shuffle([scenario.relation, 'ab = e', 'a = b', 'aⁿ = bⁿ']).indexOf(scenario.relation),
    explanation: scenario.why
  };
}

// Finitely presented groups
function generateFinitelyPresentedQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { statement: 'Every finite group is finitely presented', correct: true, why: 'Can use all elements as generators with multiplication table as relations' },
  ] : difficulty === 'medium' ? [
    { statement: 'A finitely presented group is always finite', correct: false, why: 'False: ⟨a, b | ⟩ (free group F₂) is finitely presented but infinite' },
    { statement: 'ℤ is finitely presented', correct: true, why: '⟨a | ⟩ uses 1 generator and 0 relations' },
  ] : [
    { statement: 'It is decidable whether a finitely presented group is trivial', correct: false, why: 'This is undecidable in general (Adian-Rabin theorem)' },
    { statement: 'Adding relations to a presentation always decreases the group size', correct: false, why: 'Adding redundant relations doesn\'t change the group' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'finitely_presented',
    responseType: 'multiple_choice',
    question: `True or False: ${scenario.statement}`,
    options: ['True', 'False'],
    correctIndex: scenario.correct ? 0 : 1,
    explanation: scenario.why
  };
}

// Tietze transformations
function generateTietzeQuestion(_difficulty: Difficulty): MultipleChoiceQuestion {
  const options = shuffle([
    'Operations that change a presentation without changing the group',
    'Ways to find the center of a group',
    'Methods to compute group order',
    'Algorithms for finding normal subgroups'
  ]);

  return {
    type: 'tietze',
    responseType: 'multiple_choice',
    question: 'What are Tietze transformations?',
    options,
    correctIndex: options.indexOf('Operations that change a presentation without changing the group'),
    explanation: 'Tietze transformations (adding/removing generators or relations) preserve the isomorphism class while modifying the presentation.'
  };
}

// Writing presentations
function generateWritePresentationQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    {
      group: 'ℤ₃',
      answer: '⟨a | a³ = e⟩',
      alternates: ['<a | a^3 = e>', '<a | a^3>', '⟨a | a³⟩'],
      why: 'One generator of order 3'
    },
  ] : difficulty === 'medium' ? [
    {
      group: 'ℤ₂ × ℤ₂',
      answer: '⟨a, b | a² = b² = e, ab = ba⟩',
      alternates: ['<a, b | a^2 = b^2 = e, ab = ba>'],
      why: 'Two commuting elements of order 2'
    },
  ] : [
    {
      group: 'D₃',
      answer: '⟨r, s | r³ = s² = e, srs = r⁻¹⟩',
      alternates: ['<r, s | r^3 = s^2 = e, srs = r^-1>'],
      why: 'Rotation of order 3, reflection of order 2, with conjugation relation'
    },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'write_presentation',
    responseType: 'free_response',
    question: `Write a presentation for ${scenario.group}:`,
    correctAnswer: scenario.answer,
    acceptedAnswers: [scenario.answer, ...scenario.alternates],
    explanation: scenario.why
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateIdentifyQuestion,
    generateNotationQuestion,
    generateRelationQuestion,
    generateFinitelyPresentedQuestion,
    generateTietzeQuestion,
    generateWritePresentationQuestion,
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

export function PresentationsQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Group Presentations Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of group presentations, generators, and relations!</p>
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
