import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  showBackground?: boolean;
}

export default function AppLayout({ children, showBackground = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      {showBackground && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-romantic-gradient dark:bg-romantic-gradient-dark" />
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: 'url(/assets/generated/romantic-background.dim_1920x1080.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
