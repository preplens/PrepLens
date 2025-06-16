import { achievements, Badge, Achievement } from '../data/achievements';

export interface UserProgress {
  userId: string;
  points: number;
  badges: string[];
  stats: {
    questionsAnswered: number;
    correctAnswers: number;
    currentStreak: number;
    longestStreak: number;
    subjectProgress: {
      [subjectId: string]: {
        questionsAnswered: number;
        correctAnswers: number;
        accuracy: number;
      };
    };
  };
}

class ProgressService {
  private static instance: ProgressService;
  private progress: { [userId: string]: UserProgress } = {};

  private constructor() {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      this.progress = JSON.parse(savedProgress);
    }
  }

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  private saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(this.progress));
  }

  public initializeUserProgress(userId: string): UserProgress {
    if (!this.progress[userId]) {
      this.progress[userId] = {
        userId,
        points: 0,
        badges: [],
        stats: {
          questionsAnswered: 0,
          correctAnswers: 0,
          currentStreak: 0,
          longestStreak: 0,
          subjectProgress: {},
        },
      };
      this.saveProgress();
    }
    return this.progress[userId];
  }

  public getUserProgress(userId: string): UserProgress {
    return this.progress[userId] || this.initializeUserProgress(userId);
  }

  public updateProgress(
    userId: string,
    subjectId: string,
    isCorrect: boolean
  ): { newBadges: Badge[]; pointsEarned: number } {
    const progress = this.getUserProgress(userId);
    const newBadges: Badge[] = [];
    let pointsEarned = 0;

    // Update basic stats
    progress.stats.questionsAnswered++;
    if (isCorrect) {
      progress.stats.correctAnswers++;
      pointsEarned += 10; // Base points for correct answer
    }

    // Update subject progress
    if (!progress.stats.subjectProgress[subjectId]) {
      progress.stats.subjectProgress[subjectId] = {
        questionsAnswered: 0,
        correctAnswers: 0,
        accuracy: 0,
      };
    }
    const subjectProgress = progress.stats.subjectProgress[subjectId];
    subjectProgress.questionsAnswered++;
    if (isCorrect) {
      subjectProgress.correctAnswers++;
    }
    subjectProgress.accuracy = (subjectProgress.correctAnswers / subjectProgress.questionsAnswered) * 100;

    // Check for new badges
    achievements.forEach((achievement) => {
      achievement.badges.forEach((badge) => {
        if (!progress.badges.includes(badge.id)) {
          let earned = false;
          switch (badge.requirement.type) {
            case 'questions_answered':
              earned = progress.stats.questionsAnswered >= badge.requirement.value;
              break;
            case 'correct_answers':
              earned = progress.stats.correctAnswers >= badge.requirement.value;
              break;
            case 'subject_mastery':
              earned = subjectProgress.questionsAnswered >= badge.requirement.value;
              break;
          }
          if (earned) {
            progress.badges.push(badge.id);
            newBadges.push(badge);
            pointsEarned += badge.points;
          }
        }
      });
    });

    // Update total points
    progress.points += pointsEarned;
    this.saveProgress();

    return { newBadges, pointsEarned };
  }

  public getLeaderboard(): { userId: string; points: number }[] {
    return Object.values(this.progress)
      .map(({ userId, points }) => ({ userId, points }))
      .sort((a, b) => b.points - a.points);
  }

  public getAchievements(userId: string): Achievement[] {
    const progress = this.getUserProgress(userId);
    return achievements.map((achievement) => ({
      ...achievement,
      badges: achievement.badges.map((badge) => ({
        ...badge,
        earned: progress.badges.includes(badge.id),
      })),
    }));
  }
}

export default ProgressService; 