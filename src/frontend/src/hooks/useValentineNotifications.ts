import { useEffect, useState } from 'react';
import { VALENTINE_WEEK_DAYS } from '../config/valentineWeek';
import { toast } from 'sonner';

const NOTIFICATION_PERMISSION_KEY = 'valentine_notification_permission';
const NOTIFIED_DAYS_KEY = 'valentine_notified_days';

export function useValentineNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showReminderBanner, setShowReminderBanner] = useState(false);

  useEffect(() => {
    const permission = localStorage.getItem(NOTIFICATION_PERMISSION_KEY);
    if (permission === 'granted' && 'Notification' in window && Notification.permission === 'granted') {
      setPermissionGranted(true);
      checkAndShowReminder();
    }
  }, []);

  const checkAndShowReminder = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = VALENTINE_WEEK_DAYS.find(day => {
      const dayDate = new Date(day.unlockDate);
      return dayDate.toDateString() === now.toDateString();
    });

    if (currentDay && currentHour >= 11) {
      const notifiedDays = getNotifiedDays();
      if (!notifiedDays.includes(currentDay.dayNumber)) {
        setShowReminderBanner(true);
        markDayAsNotified(currentDay.dayNumber);
      }
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications are not supported in this browser');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
        setPermissionGranted(true);
        scheduleNotifications();
        toast.success('Notifications enabled! You\'ll receive daily reminders at 11 AM');
        return true;
      } else {
        toast.error('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
      return false;
    }
  };

  const scheduleNotifications = () => {
    // Check every minute if it's time to show a notification
    const interval = setInterval(() => {
      checkAndNotify();
    }, 60000); // Check every minute

    // Initial check
    checkAndNotify();

    return () => clearInterval(interval);
  };

  const checkAndNotify = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Check if it's 11:00 AM
    if (currentHour === 11 && currentMinute === 0) {
      const currentDay = VALENTINE_WEEK_DAYS.find(day => {
        const dayDate = new Date(day.unlockDate);
        return dayDate.toDateString() === now.toDateString();
      });

      if (currentDay) {
        const notifiedDays = getNotifiedDays();
        if (!notifiedDays.includes(currentDay.dayNumber)) {
          showNotification(currentDay);
          markDayAsNotified(currentDay.dayNumber);
        }
      }
    }
  };

  const showNotification = (day: typeof VALENTINE_WEEK_DAYS[0]) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`${day.emoji} ${day.title}`, {
        body: `A special message is waiting for you! Open the app to see today's surprise.`,
        icon: '/assets/generated/valentine-app-icon.dim_512x512.png',
        badge: '/assets/generated/valentine-app-icon.dim_512x512.png',
        tag: `valentine-day-${day.dayNumber}`,
        requireInteraction: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  const getNotifiedDays = (): number[] => {
    try {
      const stored = localStorage.getItem(NOTIFIED_DAYS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const markDayAsNotified = (dayNumber: number) => {
    const notifiedDays = getNotifiedDays();
    if (!notifiedDays.includes(dayNumber)) {
      notifiedDays.push(dayNumber);
      localStorage.setItem(NOTIFIED_DAYS_KEY, JSON.stringify(notifiedDays));
    }
  };

  const dismissReminder = () => {
    setShowReminderBanner(false);
  };

  return {
    permissionGranted,
    showReminderBanner,
    requestPermission,
    dismissReminder,
  };
}
