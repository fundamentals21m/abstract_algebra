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

// Orbit definition
function generateOrbitQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'ℤ₃ = ⟨r⟩ acts on triangle vertices', element: 'vertex 1', orbit: 'all 3 vertices', why: 'rotation cycles through all vertices' },
    { group: 'S₃ acts on {1,2,3}', element: '1', orbit: '{1, 2, 3}', why: 'permutations can move 1 to any element' },
  ] : difficulty === 'medium' ? [
    { group: 'D₄ acts on vertices of square', element: 'a vertex', orbit: 'all 4 vertices', why: 'rotations and reflections move any vertex to any other' },
    { group: 'ℤ₂ acts on ℤ by n ↦ -n', element: '3', orbit: '{3, -3}', why: 'only identity and negation' },
  ] : [
    { group: 'GL₂(ℝ) acts on ℝ²', element: '(1,0)', orbit: 'ℝ² \\ {(0,0)}', why: 'invertible matrices can map any nonzero vector to any other' },
    { group: 'S₄ acts on {1,2,3,4} pairs by σ({a,b}) = {σ(a), σ(b)}', element: '{1,2}', orbit: 'all 6 pairs', why: 'permutations act transitively on pairs' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'orbit',
    responseType: 'multiple_choice',
    question: `If ${scenario.group}, what is the orbit of ${scenario.element}?`,
    options: shuffle([scenario.orbit, 'just {' + scenario.element + '}', 'the entire group', 'empty set']),
    correctIndex: shuffle([scenario.orbit, 'just {' + scenario.element + '}', 'the entire group', 'empty set']).indexOf(scenario.orbit),
    explanation: `The orbit is ${scenario.orbit} because ${scenario.why}.`
  };
}

// Stabilizer
function generateStabilizerQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'D₄ acting on square vertices', element: 'center of square', stabilizer: 'all of D₄', why: 'every symmetry fixes the center' },
    { group: 'Sₙ acting on {1,...,n}', element: '1', stabilizer: 'S_{n-1}', why: 'permutations fixing 1 permute {2,...,n}' },
  ] : difficulty === 'medium' ? [
    { group: 'D₄ acting on vertices', element: 'a vertex', stabilizer: '{e, reflection through vertex}', why: 'only identity and one reflection fix a vertex' },
    { group: 'SO(3) acting on unit sphere', element: 'north pole', stabilizer: 'SO(2)', why: 'rotations about z-axis fix north pole' },
  ] : [
    { group: 'GL_n(ℝ) acting on ℝⁿ', element: 'e₁ = (1,0,...,0)', stabilizer: 'matrices with first column e₁', why: 'Ae₁ = e₁ means first column is e₁' },
    { group: 'Sₙ acting on k-subsets', element: '{1,2,...,k}', stabilizer: 'Sₖ × S_{n-k}', why: 'separately permute elements in and out of subset' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'stabilizer',
    responseType: 'multiple_choice',
    question: `For ${scenario.group}, what is the stabilizer of ${scenario.element}?`,
    options: shuffle([scenario.stabilizer, 'trivial subgroup', 'the whole group', 'doesn\'t exist']),
    correctIndex: shuffle([scenario.stabilizer, 'trivial subgroup', 'the whole group', 'doesn\'t exist']).indexOf(scenario.stabilizer),
    explanation: `The stabilizer is ${scenario.stabilizer} because ${scenario.why}.`
  };
}

// Orbit-Stabilizer Theorem
function generateOrbitStabilizerQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { group: 'S₄', groupOrder: 24, stabilizerOrder: 6, orbitSize: 4, why: '|orbit| = |G|/|Stab| = 24/6 = 4' },
    { group: 'D₃', groupOrder: 6, stabilizerOrder: 2, orbitSize: 3, why: '|orbit| = |G|/|Stab| = 6/2 = 3' },
  ] : difficulty === 'medium' ? [
    { group: 'D₄', groupOrder: 8, stabilizerOrder: 2, orbitSize: 4, why: '|orbit| = |G|/|Stab| = 8/2 = 4' },
    { group: 'S₅', groupOrder: 120, stabilizerOrder: 24, orbitSize: 5, why: '|orbit| = |G|/|Stab| = 120/24 = 5' },
  ] : [
    { group: 'A₅', groupOrder: 60, stabilizerOrder: 12, orbitSize: 5, why: '|orbit| = |G|/|Stab| = 60/12 = 5' },
    { group: 'S₆', groupOrder: 720, stabilizerOrder: 48, orbitSize: 15, why: '|orbit| = |G|/|Stab| = 720/48 = 15' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'orbit_stabilizer',
    responseType: 'free_response',
    question: `If |${scenario.group}| = ${scenario.groupOrder} and the stabilizer of an element has order ${scenario.stabilizerOrder}, what is the size of the orbit?`,
    correctAnswer: scenario.orbitSize.toString(),
    acceptedAnswers: [scenario.orbitSize.toString()],
    explanation: `By Orbit-Stabilizer Theorem: ${scenario.why}.`
  };
}

// Transitivity
function generateTransitivityQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { action: 'Sₙ on {1,...,n}', transitive: true, why: 'any element can be mapped to any other by some permutation' },
    { action: 'ℤ₂ on {1, 2, 3} by swapping 1 and 2', transitive: false, why: '3 is fixed, so not in the same orbit as 1 or 2' },
  ] : difficulty === 'medium' ? [
    { action: 'Dₙ on vertices of n-gon', transitive: true, why: 'rotations can move any vertex to any other' },
    { action: 'S₃ on itself by left multiplication', transitive: true, why: 'g·e = g, so we can reach any element' },
  ] : [
    { action: 'GL_n(ℝ) on ℝⁿ\\{0}', transitive: true, why: 'any nonzero vector maps to any other via invertible matrix' },
    { action: 'SO(3) on ℝ³', transitive: false, why: 'rotations preserve distance, so spheres of different radii are separate orbits' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'transitivity',
    responseType: 'multiple_choice',
    question: `Is the action of ${scenario.action} transitive?`,
    options: ['Yes', 'No'],
    correctIndex: scenario.transitive ? 0 : 1,
    explanation: scenario.transitive ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`
  };
}

// Faithful action
function generateFaithfulQuestion(difficulty: Difficulty): MultipleChoiceQuestion {
  const scenarios = difficulty === 'easy' ? [
    { action: 'Sₙ on {1,...,n}', faithful: true, why: 'only identity fixes all elements' },
    { action: 'trivial action (every g acts as identity)', faithful: false, why: 'every group element acts trivially' },
  ] : difficulty === 'medium' ? [
    { action: 'D₄ on square vertices', faithful: true, why: 'different symmetries give different permutations of vertices' },
    { action: 'ℤ on ℤ₂ via parity', faithful: false, why: 'all even numbers act the same, all odd numbers act the same' },
  ] : [
    { action: 'G on G/H by left multiplication', faithful: 'if H contains no nontrivial normal subgroup', why: 'kernel is ⋂ gHg⁻¹, largest normal subgroup in H' },
    { action: 'Cayley action (G on itself)', faithful: true, why: 'only e·g = g for all g, so kernel is trivial' },
  ];

  const scenario = randomChoice(scenarios);
  const isBool = typeof scenario.faithful === 'boolean';

  return {
    type: 'faithful',
    responseType: 'multiple_choice',
    question: `Is the action of ${scenario.action} faithful?`,
    options: isBool ? ['Yes', 'No'] : ['Yes', 'No', 'Depends on H'],
    correctIndex: isBool ? (scenario.faithful ? 0 : 1) : 2,
    explanation: isBool
      ? (scenario.faithful ? `Yes: ${scenario.why}.` : `No: ${scenario.why}.`)
      : `It depends: ${scenario.why}.`
  };
}

// Fixed points
function generateFixedPointsQuestion(difficulty: Difficulty): FreeResponseQuestion {
  const scenarios = difficulty === 'easy' ? [
    { action: 'identity element on any set X', count: '|X|', why: 'identity fixes every element' },
    { action: 'rotation r in Dₙ on vertices (n prime)', count: '0', why: 'non-identity rotation has no fixed vertices' },
  ] : difficulty === 'medium' ? [
    { action: 'reflection in D₄ through two vertices', count: '2', why: 'fixes exactly those two vertices' },
    { action: '(1 2 3) in S₄ on {1,2,3,4}', count: '1', why: 'only 4 is fixed by this 3-cycle' },
  ] : [
    { action: 'reflection in D₆ through a vertex', count: '2', why: 'fixes the vertex and the opposite vertex' },
    { action: '(1 2)(3 4) in S₄ on {1,2,3,4}', count: '0', why: '1↔2 and 3↔4, no fixed points' },
  ];

  const scenario = randomChoice(scenarios);
  return {
    type: 'fixed_points',
    responseType: 'free_response',
    question: `How many fixed points does the action of ${scenario.action} have?`,
    correctAnswer: scenario.count,
    acceptedAnswers: [scenario.count],
    explanation: `The answer is ${scenario.count} because ${scenario.why}.`
  };
}

function generateQuestion(difficulty: Difficulty): Question {
  const generators = [
    generateOrbitQuestion,
    generateStabilizerQuestion,
    generateOrbitStabilizerQuestion,
    generateTransitivityQuestion,
    generateFaithfulQuestion,
    generateFixedPointsQuestion,
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

export function GroupActionsQuiz() {
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
        <h3 className="text-xl font-bold text-purple-300 mb-4">Group Actions Quiz</h3>
        <p className="text-gray-300 mb-4">Test your understanding of group actions, orbits, and stabilizers!</p>
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
