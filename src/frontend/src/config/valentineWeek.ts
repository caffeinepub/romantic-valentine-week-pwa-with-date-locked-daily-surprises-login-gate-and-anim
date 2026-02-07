export interface DayContent {
  dayNumber: number;
  title: string;
  message: string;
  unlockDate: Date;
  emoji: string;
}

// Valentine Week 2026: February 7-13
export const VALENTINE_WEEK_DAYS: DayContent[] = [
  {
    dayNumber: 1,
    title: "Rose Day",
    message: "Like a rose in full bloom, you bring beauty and joy to every moment of my life. Your presence is the sweetest fragrance in my world. 🌹",
    unlockDate: new Date(2026, 1, 7), // Feb 7
    emoji: "🌹"
  },
  {
    dayNumber: 2,
    title: "Propose Day",
    message: "Every day with you feels like a dream come true. You are my today and all of my tomorrows. Will you continue this beautiful journey with me? 💍",
    unlockDate: new Date(2026, 1, 8), // Feb 8
    emoji: "💍"
  },
  {
    dayNumber: 3,
    title: "Chocolate Day",
    message: "You're sweeter than the finest chocolate, and just like chocolate, you make everything better. Life with you is the sweetest treat. 🍫",
    unlockDate: new Date(2026, 1, 9), // Feb 9
    emoji: "🍫"
  },
  {
    dayNumber: 4,
    title: "Teddy Day",
    message: "Just like a teddy bear brings comfort and warmth, you are my safe haven. In your arms, I've found my home. 🧸",
    unlockDate: new Date(2026, 1, 10), // Feb 10
    emoji: "🧸"
  },
  {
    dayNumber: 5,
    title: "Promise Day",
    message: "I promise to love you in all your forms, now and forever. Through every season, every challenge, every joy - I choose you, always. 💝",
    unlockDate: new Date(2026, 1, 11), // Feb 11
    emoji: "💝"
  },
  {
    dayNumber: 6,
    title: "Hug Day",
    message: "In your embrace, I find peace. Your hugs are my favorite place to be. They say home is where the heart is, and my heart is with you. 🤗",
    unlockDate: new Date(2026, 1, 12), // Feb 12
    emoji: "🤗"
  },
  {
    dayNumber: 7,
    title: "Valentine's Day",
    message: "You are my greatest adventure, my deepest love, and my forever valentine. Thank you for being you, for loving me, and for making every day feel like Valentine's Day. I love you more than words can express. ❤️",
    unlockDate: new Date(2026, 1, 13), // Feb 13
    emoji: "❤️"
  }
];

export function getDayContent(dayNumber: number): DayContent | undefined {
  return VALENTINE_WEEK_DAYS.find(day => day.dayNumber === dayNumber);
}
