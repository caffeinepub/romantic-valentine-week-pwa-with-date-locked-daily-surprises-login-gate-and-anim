import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import RomanticDecorations from '../components/RomanticDecorations';
import Romantic3DReveal from '../components/Romantic3DReveal';
import { getDayContent } from '../config/valentineWeek';
import { isUnlocked, getUnlockDateLabel } from '../lib/dateLock';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface DayDetailScreenProps {
  dayNumber: number;
  onBack: () => void;
}

export default function DayDetailScreen({ dayNumber, onBack }: DayDetailScreenProps) {
  const day = getDayContent(dayNumber);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const [showReveal, setShowReveal] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  const unlocked = day ? isUnlocked(day) : false;

  // Trigger reveal sequence when opening an unlocked day
  useEffect(() => {
    if (unlocked && !prefersReducedMotion) {
      // Small delay to ensure mount is complete
      const timer = setTimeout(() => {
        setShowReveal(true);
        setShowBurst(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (unlocked && prefersReducedMotion) {
      // Skip animations but mark as complete
      setRevealComplete(true);
    }
  }, [unlocked, prefersReducedMotion]);

  // Mark reveal as complete after animation
  useEffect(() => {
    if (showReveal && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setRevealComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showReveal, prefersReducedMotion]);

  if (!day) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">Day not found</p>
              <Button onClick={onBack} className="mt-4">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Regular confetti for unlocked days (not burst) */}
      <RomanticDecorations 
        showConfetti={unlocked && !showBurst} 
        density="medium" 
      />
      
      {/* Extra confetti burst on reveal */}
      {showBurst && (
        <RomanticDecorations 
          showConfetti={true}
          density="high"
          burstMode={true}
          onBurstComplete={() => setShowBurst(false)}
        />
      )}

      {/* 3D romantic reveal animations */}
      <Romantic3DReveal isActive={showReveal} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Week
          </Button>

          {/* Day Content with reveal animation */}
          <Card 
            className={`glass-card shadow-2xl ${
              unlocked && !revealComplete && !prefersReducedMotion
                ? 'animate-day-reveal' 
                : ''
            }`}
          >
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="text-7xl animate-heart-beat">
                {day.emoji}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">
                  Day {day.dayNumber}
                </p>
                <CardTitle className="text-4xl md:text-5xl font-bold">
                  {day.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 pb-12">
              {unlocked ? (
                <>
                  <div className="prose prose-lg dark:prose-invert mx-auto text-center">
                    <p className="text-xl leading-relaxed">
                      {day.message}
                    </p>
                  </div>

                  <div className="flex justify-center pt-6">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
                      <span className="text-2xl">💕</span>
                      <span>With all my love</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 py-12">
                  <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <Lock className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">This Day is Locked</h3>
                    <p className="text-muted-foreground">
                      Come back on {getUnlockDateLabel(day)} to unlock this special message
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
