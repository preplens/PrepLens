import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExamType = 'ssc-cgl' | 'ssc-chsl' | 'rrb-ntpc' | 'rrb-je';

interface ExamState {
  selectedExam: ExamType | null;
}

const initialState: ExamState = {
  selectedExam: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setSelectedExam: (state, action: PayloadAction<ExamType>) => {
      state.selectedExam = action.payload;
    },
    clearSelectedExam: (state) => {
      state.selectedExam = null;
    },
  },
});

export const { setSelectedExam, clearSelectedExam } = examSlice.actions;
export default examSlice.reducer; 