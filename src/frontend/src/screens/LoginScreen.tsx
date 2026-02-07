import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import RomanticScene from '../components/RomanticScene';
import RomanticDecorations from '../components/RomanticDecorations';
import { setAuthState } from '../state/authStorage';

const CORRECT_PASSWORD = 'JaloMat';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setAuthState({ isUnlocked: true });
        onLoginSuccess();
      } else {
        setError('Incorrect password. Try again! 💔');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <AppLayout>
      <RomanticScene />
      <RomanticDecorations density="low" />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-heart-beat">
              <Heart className="w-10 h-10 text-primary fill-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Welcome to Our Love Story
            </CardTitle>
            <CardDescription className="text-base">
              A special journey awaits you, my love. Each day brings a new surprise, 
              a new memory, and a new reason to celebrate us. 💕
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Enter the Secret Word
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="text-lg h-12"
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground italic">
                  Hint: Something that I say to you at least 50 times a day
                </p>
                {error && (
                  <p className="text-sm text-destructive font-medium">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isLoading || !password}
              >
                {isLoading ? 'Unlocking...' : 'Unlock My Heart 💖'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
