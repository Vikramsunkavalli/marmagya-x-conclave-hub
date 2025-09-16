import { useEffect, useState } from 'react';
import BusinessBingo from './BusinessBingo';

const Games = () => {
  const [activeGame, setActiveGame] = useState('bingo');

  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const games = [
    {
      id: 'bingo',
      name: 'Business Bingo',
      description: 'Test your business knowledge with our interactive bingo game',
      icon: '🎯'
    },
    {
      id: 'quiz',
      name: 'Business Quiz',
      description: 'Challenge yourself with our business trivia quiz',
      icon: '🧠'
    },
    {
      id: 'puzzle',
      name: 'Business Puzzle',
      description: 'Solve puzzles related to business concepts',
      icon: '🧩'
    }
  ];

  return (
    <section id="games" className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                Interactive <span className="text-golden">Games</span>
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--golden))] mx-auto mb-8"></div>
              <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                Have fun while learning with our interactive games
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`p-6 rounded-lg text-left transition-all ${
                    activeGame === game.id
                      ? 'bg-[hsl(var(--golden))] text-white'
                      : 'bg-white text-[hsl(var(--primary))] hover:bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                  <p className="text-sm opacity-90">{game.description}</p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 fade-in">
              {activeGame === 'bingo' && <BusinessBingo />}
              {activeGame === 'quiz' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-4">
                    Business Quiz
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Quiz functionality coming soon!
                  </p>
                  <button className="bg-[hsl(var(--golden))] text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                    Coming Soon
                  </button>
                </div>
              )}
              {activeGame === 'puzzle' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🧩</div>
                  <h3 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-4">
                    Business Puzzle
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Puzzle functionality coming soon!
                  </p>
                  <button className="bg-[hsl(var(--golden))] text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                    Coming Soon
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
  );
};

export default Games;
