import { useState } from 'react';
import { Trophy } from 'lucide-react';

const BusinessBingo = () => {
  const bingoItems = [
    "Synergy", "Paradigm Shift", "Think Outside the Box", "Low-hanging Fruit", "Circle Back",
    "Deep Dive", "Best Practice", "Game Changer", "Move the Needle", "Leverage",
    "Disruptive", "Scalable", "ROI", "FREE SPACE", "KPI",
    "Streamline", "Value-add", "Ecosystem", "Digital Transformation", "Innovation",
    "Stakeholder", "Bandwidth", "Touch Base", "Pivot", "Growth Hacking"
  ];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(25).fill(false));
  const [bingoLines, setBingoLines] = useState<number>(0);

  const toggleItem = (index: number) => {
    if (index === 12) return; // Free space is always checked
    
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    
    // Check for bingo lines
    checkBingo(newCheckedItems);
  };

  const checkBingo = (items: boolean[]) => {
    let lines = 0;
    
    // Mark free space as checked
    items[12] = true;
    
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (items.slice(i * 5, i * 5 + 5).every(item => item)) {
        lines++;
      }
    }
    
    // Check columns
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every(row => items[row * 5 + i])) {
        lines++;
      }
    }
    
    // Check diagonals
    if ([0, 6, 12, 18, 24].every(i => items[i])) lines++;
    if ([4, 8, 12, 16, 20].every(i => items[i])) lines++;
    
    setBingoLines(lines);
  };

  const resetGame = () => {
    setCheckedItems(new Array(25).fill(false));
    setBingoLines(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
          Business Buzzword Bingo
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] mb-4">
          Mark off the buzzwords as you hear them during the event!
        </p>
        
        {bingoLines > 0 && (
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--golden))] bg-opacity-20 text-golden px-4 py-2 rounded-full border border-[hsl(var(--golden))] border-opacity-40">
            <Trophy size={20} />
            <span className="font-semibold">
              {bingoLines === 1 ? 'BINGO!' : `${bingoLines} BINGOS!`}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {bingoItems.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleItem(index)}
            className={`
              aspect-square p-2 text-xs sm:text-sm font-medium rounded-lg border-2 transition-all duration-300
              ${index === 12 
                ? 'bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))] border-[hsl(var(--golden-dark))]' 
                : checkedItems[index]
                ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary-dark))] scale-95'
                : 'bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--golden))] hover:scale-105'
              }
            `}
            disabled={index === 12}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={resetGame}
          className="btn-primary"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default BusinessBingo;