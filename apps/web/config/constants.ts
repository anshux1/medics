export const testNoOfQuestions = [
  { label: "20 Ques", value: 20 },
  { label: "50 Ques", value: 50 },
  { label: "60 Ques", value: 60 },
  { label: "80 Ques", value: 80 },
  { label: "100 Ques", value: 100 },
  { label: "120 Ques", value: 120 },
  { label: "150 Ques", value: 150 },
  { label: "180 Ques", value: 180 },
] as const;

export const testTimeLimit = [
  { label: "20 min", value: 20 },
  { label: "50 min", value: 50 },
  { label: "60 min", value: 60 },
  { label: "80 min", value: 80 },
  { label: "100 min", value: 100 },
  { label: "120 min", value: 120 },
  { label: "150 min", value: 150 },
  { label: "180 min", value: 180 },
] as const;

export const testDifficulty = [
  { label: "Easy", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Hard", value: 3 },
] as const;

export interface Proportions {
  easy: number;
  medium: number;
  hard: number;
}

type DifficultyProportions = {
  [key: number]: Proportions;
};

export const difficultyProportions: DifficultyProportions = {
  1: { easy: 70, medium: 20, hard: 10 },
  2: { easy: 30, medium: 50, hard: 20 },
  3: { easy: 10, medium: 20, hard: 70 },
} as const;

export interface TestSubjectsProps {
  id: string;
  subjectName: string;
}

export interface TestSyllabusProps {
  id: string;
  unitName: string;
  totalChapters: number;
  subjectId: string;
  chapters: {
    id: string;
    chapterName: string;
  }[];
}
