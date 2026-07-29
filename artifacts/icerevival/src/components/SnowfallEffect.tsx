import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  drift: number;
  size: number;
}

export function SnowfallEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate 80 snowflakes with random properties
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100, // Random position across screen (%)
        animationDuration: 8 + Math.random() * 10, // 8-18 seconds
        animationDelay: Math.random() * 5, // 0-5 second delay
        drift: -20 + Math.random() * 40, // -20px to +20px drift
        size: 4 + Math.random() * 4, // 4-8px size
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1000 }}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            // @ts-ignore - CSS custom property
            '--drift': `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
