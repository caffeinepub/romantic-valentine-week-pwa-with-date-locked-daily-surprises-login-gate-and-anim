import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface AppHeaderProps {
  onLogout: () => void;
}

export default function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-background/30 border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          Valentine Week 💕
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Lock
        </Button>
      </div>
    </header>
  );
}
