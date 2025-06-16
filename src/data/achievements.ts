export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  requirement: {
    type: 'questions_answered' | 'correct_answers' | 'streak' | 'subject_mastery';
    value: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  badges: Badge[];
}

export const achievements: Achievement[] = [
  {
    id: 'beginner',
    name: 'Getting Started',
    description: 'Complete your first practice session',
    points: 100,
    badges: [
      {
        id: 'first_question',
        name: 'First Question',
        description: 'Answer your first question',
        icon: '🎯',
        points: 10,
        requirement: {
          type: 'questions_answered',
          value: 1
        }
      },
      {
        id: 'first_correct',
        name: 'First Success',
        description: 'Get your first correct answer',
        icon: '✅',
        points: 20,
        requirement: {
          type: 'correct_answers',
          value: 1
        }
      }
    ]
  },
  {
    id: 'intermediate',
    name: 'Consistent Learner',
    description: 'Maintain a 3-day practice streak',
    points: 200,
    badges: [
      {
        id: 'three_day_streak',
        name: 'Three Day Streak',
        description: 'Practice for 3 consecutive days',
        icon: '🔥',
        points: 50,
        requirement: {
          type: 'streak',
          value: 3
        }
      },
      {
        id: 'subject_master',
        name: 'Subject Master',
        description: 'Complete 50 questions in a single subject',
        icon: '📚',
        points: 100,
        requirement: {
          type: 'subject_mastery',
          value: 50
        }
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Expert Level',
    description: 'Achieve 90% accuracy in any subject',
    points: 500,
    badges: [
      {
        id: 'accuracy_master',
        name: 'Accuracy Master',
        description: 'Maintain 90% accuracy in a subject',
        icon: '🎯',
        points: 200,
        requirement: {
          type: 'correct_answers',
          value: 90
        }
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Answer 10 questions in under 5 minutes',
        icon: '⚡',
        points: 150,
        requirement: {
          type: 'questions_answered',
          value: 10
        }
      }
    ]
  }
]; 