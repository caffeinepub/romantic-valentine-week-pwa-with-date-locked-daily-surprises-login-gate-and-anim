import { VALENTINE_WEEK_DAYS, type DayContent } from '../config/valentineWeek';

export function isUnlocked(day: DayContent): boolean {
  const now = new Date();
  const unlockDate = new Date(day.unlockDate);
  
  // Set both to start of day for comparison
  now.setHours(0, 0, 0, 0);
  unlockDate.setHours(0, 0, 0, 0);
  
  return now >= unlockDate;
}

export function getUnlockDateLabel(day: DayContent): string {
  const unlockDate = new Date(day.unlockDate);
  return unlockDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function getNextUnlockInfo(): { dayNumber: number; date: Date } | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  for (const day of VALENTINE_WEEK_DAYS) {
    const unlockDate = new Date(day.unlockDate);
    unlockDate.setHours(0, 0, 0, 0);
    
    if (unlockDate > now) {
      return { dayNumber: day.dayNumber, date: unlockDate };
    }
  }
  
  return null;
}

export function getDaysUntilUnlock(day: DayContent): number {
  const now = new Date();
  const unlockDate = new Date(day.unlockDate);
  
  now.setHours(0, 0, 0, 0);
  unlockDate.setHours(0, 0, 0, 0);
  
  const diffTime = unlockDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
