import { questions } from '../data/questions';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'draft' | 'published';
}

export interface QuestionInput {
  examId: string;
  subjectId: string;
  question: Omit<Question, 'id' | 'status'>;
}

class QuestionService {
  private static instance: QuestionService;
  private questions: typeof questions;

  private constructor() {
    this.questions = { ...questions };
  }

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  public getQuestions(examId: string, subjectId: string): Question[] {
    return this.questions[examId]?.[subjectId] || [];
  }

  public addQuestion(input: QuestionInput): Question {
    const { examId, subjectId, question } = input;
    
    if (!this.questions[examId]) {
      this.questions[examId] = {};
    }
    
    if (!this.questions[examId][subjectId]) {
      this.questions[examId][subjectId] = [];
    }

    const newQuestion: Question = {
      ...question,
      id: this.generateId(),
      status: 'draft',
    };

    this.questions[examId][subjectId].push(newQuestion);
    return newQuestion;
  }

  public updateQuestion(
    examId: string,
    subjectId: string,
    questionId: number,
    updates: Partial<Question>
  ): Question | null {
    const questionIndex = this.questions[examId]?.[subjectId]?.findIndex(
      (q) => q.id === questionId
    );

    if (questionIndex === undefined || questionIndex === -1) {
      return null;
    }

    const updatedQuestion = {
      ...this.questions[examId][subjectId][questionIndex],
      ...updates,
    };

    this.questions[examId][subjectId][questionIndex] = updatedQuestion;
    return updatedQuestion;
  }

  public deleteQuestion(
    examId: string,
    subjectId: string,
    questionId: number
  ): boolean {
    const questionIndex = this.questions[examId]?.[subjectId]?.findIndex(
      (q) => q.id === questionId
    );

    if (questionIndex === undefined || questionIndex === -1) {
      return false;
    }

    this.questions[examId][subjectId].splice(questionIndex, 1);
    return true;
  }

  public publishQuestion(
    examId: string,
    subjectId: string,
    questionId: number
  ): Question | null {
    return this.updateQuestion(examId, subjectId, questionId, {
      status: 'published',
    });
  }

  public unpublishQuestion(
    examId: string,
    subjectId: string,
    questionId: number
  ): Question | null {
    return this.updateQuestion(examId, subjectId, questionId, {
      status: 'draft',
    });
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}

export default QuestionService; 