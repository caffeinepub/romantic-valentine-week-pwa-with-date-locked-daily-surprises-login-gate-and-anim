import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import LoginScreen from './screens/LoginScreen';
import ValentinePromptScreen from './screens/ValentinePromptScreen';
import WeekOverviewScreen from './screens/WeekOverviewScreen';
import DayDetailScreen from './screens/DayDetailScreen';
import { getAuthState, clearAuthState } from './state/authStorage';
import { Toaster } from '@/components/ui/sonner';

type AppView = 'login' | 'prompt' | 'week' | 'day';

function AppContent() {
  const [view, setView] = useState<AppView>('login');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAcceptedPrompt, setHasAcceptedPrompt] = useState(false);

  useEffect(() => {
    const authState = getAuthState();
    if (authState.isUnlocked) {
      setIsAuthenticated(true);
      if (authState.hasAcceptedPrompt) {
        setHasAcceptedPrompt(true);
        setView('week');
      } else {
        setView('prompt');
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('prompt');
  };

  const handleAcceptPrompt = () => {
    setHasAcceptedPrompt(true);
    setView('week');
  };

  const handleSelectDay = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    setView('day');
  };

  const handleBackToWeek = () => {
    setSelectedDay(null);
    setView('week');
  };

  const handleLogout = () => {
    clearAuthState();
    setIsAuthenticated(false);
    setHasAcceptedPrompt(false);
    setView('login');
  };

  return (
    <>
      {view === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
      {view === 'prompt' && <ValentinePromptScreen onAccept={handleAcceptPrompt} />}
      {view === 'week' && <WeekOverviewScreen onSelectDay={handleSelectDay} onLogout={handleLogout} />}
      {view === 'day' && selectedDay && (
        <DayDetailScreen dayNumber={selectedDay} onBack={handleBackToWeek} />
      )}
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppContent />
    </ThemeProvider>
  );
}
