import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PerformanceData {
  date: string;
  score: number;
  totalQuestions: number;
  subject: string;
  topic: string;
  timeSpent: number;
}

interface AnalyticsState {
  performanceHistory: PerformanceData[];
  averageScore: number;
  totalQuestionsAttempted: number;
  timeSpentTotal: number;
  subjectWisePerformance: Record<string, { correct: number; total: number }>;
  topicWisePerformance: Record<string, { correct: number; total: number }>;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  performanceHistory: [],
  averageScore: 0,
  totalQuestionsAttempted: 0,
  timeSpentTotal: 0,
  subjectWisePerformance: {},
  topicWisePerformance: {},
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    addPerformanceData: (state, action: PayloadAction<PerformanceData>) => {
      state.performanceHistory.push(action.payload);
      
      // Update total questions attempted
      state.totalQuestionsAttempted += action.payload.totalQuestions;
      
      // Update time spent
      state.timeSpentTotal += action.payload.timeSpent;
      
      // Update subject-wise performance
      const subject = action.payload.subject;
      if (!state.subjectWisePerformance[subject]) {
        state.subjectWisePerformance[subject] = { correct: 0, total: 0 };
      }
      state.subjectWisePerformance[subject].total += action.payload.totalQuestions;
      state.subjectWisePerformance[subject].correct += action.payload.score;
      
      // Update topic-wise performance
      const topic = action.payload.topic;
      if (!state.topicWisePerformance[topic]) {
        state.topicWisePerformance[topic] = { correct: 0, total: 0 };
      }
      state.topicWisePerformance[topic].total += action.payload.totalQuestions;
      state.topicWisePerformance[topic].correct += action.payload.score;
      
      // Update average score
      const totalScore = state.performanceHistory.reduce((sum, data) => sum + data.score, 0);
      state.averageScore = totalScore / state.performanceHistory.length;
    },
    clearAnalytics: (state) => {
      state.performanceHistory = [];
      state.averageScore = 0;
      state.totalQuestionsAttempted = 0;
      state.timeSpentTotal = 0;
      state.subjectWisePerformance = {};
      state.topicWisePerformance = {};
    },
  },
});

export const { addPerformanceData, clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer; 