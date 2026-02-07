import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Romantic3DRevealProps {
  isActive: boolean;
}

export default function Romantic3DReveal({ isActive }: Romantic3DRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive && !prefersReducedMotion) {
      setShow(true);
      // Auto-hide after animation completes
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive, prefersReducedMotion]);

  if (!show || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {/* Gift Box - Left Side */}
      <div
        className="absolute animate-3d-gift-left"
        style={{ top: '20%', left: '-10%' }}
      >
        <div className="text-8xl transform-gpu perspective-1000">
          🎁
        </div>
      </div>

      {/* Gift Box - Right Side */}
      <div
        className="absolute animate-3d-gift-right"
        style={{ top: '60%', right: '-10%' }}
      >
        <div className="text-7xl transform-gpu perspective-1000">
          🎁
        </div>
      </div>

      {/* Rose - Top Left */}
      <div
        className="absolute animate-3d-flower-spin-left"
        style={{ top: '10%', left: '15%' }}
      >
        <div className="text-6xl transform-gpu perspective-1000">
          🌹
        </div>
      </div>

      {/* Rose - Top Right */}
      <div
        className="absolute animate-3d-flower-spin-right"
        style={{ top: '15%', right: '20%' }}
      >
        <div className="text-6xl transform-gpu perspective-1000">
          🌹
        </div>
      </div>

      {/* Bouquet - Bottom Center */}
      <div
        className="absolute animate-3d-bouquet-rise"
        style={{ bottom: '-15%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="text-9xl transform-gpu perspective-1000">
          💐
        </div>
      </div>

      {/* Cherry Blossoms - Floating */}
      <div
        className="absolute animate-3d-blossom-drift-1"
        style={{ top: '30%', left: '10%' }}
      >
        <div className="text-5xl transform-gpu perspective-1000">
          🌸
        </div>
      </div>

      <div
        className="absolute animate-3d-blossom-drift-2"
        style={{ top: '40%', right: '15%' }}
      >
        <div className="text-5xl transform-gpu perspective-1000">
          🌸
        </div>
      </div>

      {/* Heart Box - Center */}
      <div
        className="absolute animate-3d-heart-box-pop"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="text-7xl transform-gpu perspective-1000 opacity-60">
          💝
        </div>
      </div>
    </div>
  );
}
