import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

interface PracticeState {
  currentQuestion: Question | null;
  questions: Question[];
  userAnswers: Record<string, number>;
  score: number;
  loading: boolean;
  error: string | null;
  currentSubject: string;
  currentTopic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const initialState: PracticeState = {
  currentQuestion: null,
  questions: [],
  userAnswers: {},
  score: 0,
  loading: false,
  error: null,
  currentSubject: '',
  currentTopic: '',
  difficulty: 'medium',
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.currentQuestion = action.payload[0] || null;
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: number }>) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
      
      const question = state.questions.find(q => q.id === questionId);
      if (question && question.correctAnswer === answer) {
        state.score += 1;
      }
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.currentSubject = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.currentTopic = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<'easy' | 'medium' | 'hard'>) => {
      state.difficulty = action.payload;
    },
    resetPractice: (state) => {
      state.currentQuestion = null;
      state.userAnswers = {};
      state.score = 0;
    },
  },
});

export const {
  setQuestions,
  setCurrentQuestion,
  answerQuestion,
  setSubject,
  setTopic,
  setDifficulty,
  resetPractice,
} = practiceSlice.actions;

export default practiceSlice.reducer; 