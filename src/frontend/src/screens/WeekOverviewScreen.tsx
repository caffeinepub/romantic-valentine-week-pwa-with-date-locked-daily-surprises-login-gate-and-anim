import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Heart, Bell, BellOff } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import AppHeader from '../components/AppHeader';
import RomanticDecorations from '../components/RomanticDecorations';
import { VALENTINE_WEEK_DAYS } from '../config/valentineWeek';
import { isUnlocked, getUnlockDateLabel, getDaysUntilUnlock } from '../lib/dateLock';
import { useValentineNotifications } from '../hooks/useValentineNotifications';
import { toast } from 'sonner';

interface WeekOverviewScreenProps {
  onSelectDay: (dayNumber: number) => void;
  onLogout: () => void;
}

export default function WeekOverviewScreen({ onSelectDay, onLogout }: WeekOverviewScreenProps) {
  const { 
    permissionGranted, 
    showReminderBanner, 
    requestPermission, 
    dismissReminder 
  } = useValentineNotifications();

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  const handleDayClick = (dayNumber: number) => {
    const day = VALENTINE_WEEK_DAYS.find(d => d.dayNumber === dayNumber);
    if (day && isUnlocked(day)) {
      onSelectDay(dayNumber);
    } else {
      toast.error('This day is still locked. Come back on the unlock date! 🔒');
    }
  };

  return (
    <AppLayout>
      <AppHeader onLogout={onLogout} />
      <RomanticDecorations density="medium" />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Our Valentine Week Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seven days of love, seven beautiful surprises. Each day unlocks at midnight 
            with a special message just for you. 💕
          </p>
        </div>

        {/* Notification Banner */}
        {showReminderBanner && (
          <Card className="mb-8 border-primary/50 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">
                    Today's surprise is ready! Check out the unlocked day above. 💝
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={dismissReminder}>
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Enable Card */}
        {!permissionGranted && (
          <Card className="mb-8 glass-card">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BellOff className="w-6 h-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Enable Daily Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified at 11 AM each day when a new surprise unlocks
                    </p>
                  </div>
                </div>
                <Button onClick={handleEnableNotifications} className="shrink-0">
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALENTINE_WEEK_DAYS.map((day) => {
            const unlocked = isUnlocked(day);
            const daysUntil = getDaysUntilUnlock(day);

            return (
              <Card
                key={day.dayNumber}
                className={`glass-card transition-all duration-300 hover:shadow-xl ${
                  unlocked ? 'cursor-pointer hover:scale-105' : 'opacity-75'
                }`}
                onClick={() => handleDayClick(day.dayNumber)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <span className="text-3xl">{day.emoji}</span>
                        Day {day.dayNumber}
                      </CardTitle>
                      <CardDescription className="text-base font-medium">
                        {day.title}
                      </CardDescription>
                    </div>
                    {unlocked ? (
                      <Badge variant="default" className="gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {unlocked ? (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {day.message}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Unlocks on {getUnlockDateLabel(day)}
                      </p>
                      {daysUntil > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {daysUntil} {daysUntil === 1 ? 'day' : 'days'} to go
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>© 2026. Built with love using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">caffeine.ai</a> ❤️</p>
        </div>
      </div>
    </AppLayout>
  );
}
