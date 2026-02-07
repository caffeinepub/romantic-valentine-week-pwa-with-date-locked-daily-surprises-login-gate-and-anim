import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import RomanticScene from '../components/RomanticScene';
import RomanticDecorations from '../components/RomanticDecorations';
import { setAuthState } from '../state/authStorage';
import { calculateEvasivePosition, getRandomPosition, type Position } from '../lib/evasiveMotion';

interface ValentinePromptScreenProps {
  onAccept: () => void;
}

export default function ValentinePromptScreen({ onAccept }: ValentinePromptScreenProps) {
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current;
      const button = noButtonRef.current;
      const rect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setNoButtonPos({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    }
  }, []);

  const handleYesClick = () => {
    setShowConfetti(true);
    setAuthState({ hasAcceptedPrompt: true });
    setTimeout(() => {
      onAccept();
    }, 1500);
  };

  const handleNoHover = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const pointerPos: Position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    const newPos = calculateEvasivePosition(
      noButtonPos,
      pointerPos,
      rect.width,
      rect.height,
      200
    );
    
    setNoButtonPos(newPos);
  };

  const handleNoTouch = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const newPos = getRandomPosition(rect.width, rect.height, 80);
    setNoButtonPos(newPos);
  };

  return (
    <AppLayout>
      <RomanticScene />
      <RomanticDecorations showConfetti={showConfetti} density="high" />
      
      <div 
        ref={containerRef}
        className="min-h-screen flex items-center justify-center p-4 relative"
      >
        <Card className="w-full max-w-2xl glass-card shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-heart-beat">
              <Heart className="w-12 h-12 text-primary fill-primary" />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold leading-tight">
              Will you be my valentine?
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-12">
            <p className="text-center text-lg text-muted-foreground max-w-md mx-auto">
              I've prepared something special for you - a week full of love, 
              surprises, and beautiful moments. Say yes and let's celebrate our love together! 💕
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="text-xl px-12 py-6 h-auto font-semibold"
              >
                Yes! 💖
              </Button>

              <button
                ref={noButtonRef}
                onMouseMove={handleNoHover}
                onTouchStart={handleNoTouch}
                className="absolute px-8 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 ease-out font-semibold"
                style={{
                  left: `${noButtonPos.x}px`,
                  top: `${noButtonPos.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                No
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
