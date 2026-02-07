import { useEffect, useState } from 'react';

interface RomanticDecorationsProps {
  showConfetti?: boolean;
  density?: 'low' | 'medium' | 'high';
  burstMode?: boolean;
  onBurstComplete?: () => void;
}

export default function RomanticDecorations({ 
  showConfetti = false, 
  density = 'medium',
  burstMode = false,
  onBurstComplete
}: RomanticDecorationsProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; delay: number; duration: number; left: string }>>([]);

  useEffect(() => {
    if (showConfetti) {
      // Burst mode creates a much denser, shorter-lived confetti effect
      const count = burstMode 
        ? 120 // Dense burst
        : density === 'low' ? 20 : density === 'medium' ? 40 : 60;
      
      const pieces = Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: burstMode ? Math.random() * 0.5 : Math.random() * 3,
        duration: burstMode ? 2 + Math.random() * 1 : 3 + Math.random() * 2,
        left: `${Math.random() * 100}%`,
      }));
      setConfettiPieces(pieces);

      // Auto-clear burst confetti after animation completes
      if (burstMode && onBurstComplete) {
        const maxDuration = Math.max(...pieces.map(p => p.delay + p.duration));
        const timer = setTimeout(() => {
          onBurstComplete();
        }, maxDuration * 1000);
        return () => clearTimeout(timer);
      }
    } else {
      setConfettiPieces([]);
    }
  }, [showConfetti, density, burstMode, onBurstComplete]);

  const decorations = [
    { emoji: '🌹', className: 'text-4xl animate-float', style: { top: '10%', left: '5%' } },
    { emoji: '💝', className: 'text-3xl animate-float-slow', style: { top: '20%', right: '8%' } },
    { emoji: '🍫', className: 'text-3xl animate-float-delayed', style: { bottom: '15%', left: '10%' } },
    { emoji: '🌸', className: 'text-4xl animate-float', style: { top: '60%', right: '5%' } },
    { emoji: '💕', className: 'text-2xl animate-pulse-glow', style: { top: '40%', left: '15%' } },
    { emoji: '🌺', className: 'text-3xl animate-float-slow', style: { bottom: '25%', right: '12%' } },
  ];

  return (
    <>
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {decorations.map((deco, index) => (
          <div
            key={index}
            className={`absolute ${deco.className} opacity-20`}
            style={deco.style}
          >
            {deco.emoji}
          </div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className={burstMode ? 'absolute animate-confetti-burst' : 'absolute animate-confetti'}
              style={{
                left: piece.left,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
              }}
            >
              {['❤️', '💕', '💖', '🌹', '💝', '✨', '🌸', '💐'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
