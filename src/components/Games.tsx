import { useState } from 'react';
import { Gamepad2, Trophy, Target } from 'lucide-react';
import BusinessBingo from './BusinessBingo';

const Games = () => {
  const [activeGame, setActiveGame] = useState<'bingo' | 'quiz' | null>('bingo');

  const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const questions = [
      {
        question: "What does ROI stand for in business?",
        options: ["Return on Investment", "Rate of Interest", "Revenue over Income", "Risk of Investment"],
        correct: 0
      },
      {
        question: "Which management theory emphasizes employee motivation?",
        options: ["Scientific Management", "Human Relations Theory", "Bureaucratic Theory", "Systems Theory"],
        correct: 1
      },
      {
        question: "What is the primary purpose of SWOT analysis?",
        options: ["Financial planning", "Strategic planning", "Marketing research", "HR management"],
        correct: 1
      }
    ];

    const handleAnswer = (answerIndex: number) => {
      setSelectedAnswer(answerIndex);
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }, 1000);
    };

    const resetQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
    };

    if (showResult) {
      return (
        <div className="text-center">
          <Trophy className="w-16 h-16 text-golden mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
            Quiz Complete!
          </h3>
          <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6">
            You scored {score} out of {questions.length}
          </p>
          <button onClick={resetQuiz} className="btn-hero">
            Play Again
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-hover">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-golden font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2 mb-4">
              <div 
                className="bg-[hsl(var(--golden))] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-6">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'border-[hsl(var(--border))] hover:border-[hsl(var(--golden))] hover:bg-[hsl(var(--golden))] hover:bg-opacity-10'
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : index === questions[currentQuestion].correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-[hsl(var(--border))] opacity-50'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="games" className="py-20 gradient-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary-foreground))] mb-6">
            Interactive <span className="text-golden">Games</span>
          </h2>
          <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
          <p className="text-lg text-[hsl(var(--primary-foreground))] opacity-90 max-w-3xl mx-auto">
            Engage with fun, educational games during the event
          </p>
        </div>

        {/* Game Selection */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[hsl(var(--card))] bg-opacity-20 backdrop-blur-sm rounded-lg p-2 border border-[hsl(var(--golden))] border-opacity-30">
            <button
              onClick={() => setActiveGame('bingo')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                activeGame === 'bingo'
                  ? 'bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))]'
                  : 'text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--golden))] hover:bg-opacity-20'
              }`}
            >
              <Target size={20} />
              Business Bingo
            </button>
            <button
              onClick={() => setActiveGame('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                activeGame === 'quiz'
                  ? 'bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))]'
                  : 'text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--golden))] hover:bg-opacity-20'
              }`}
            >
              <Gamepad2 size={20} />
              Business Quiz
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-[hsl(var(--card))] bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-[hsl(var(--golden))] border-opacity-20">
          {activeGame === 'bingo' && <BusinessBingo />}
          {activeGame === 'quiz' && <QuizGame />}
        </div>
      </div>
    </section>
  );
};

export default Games;