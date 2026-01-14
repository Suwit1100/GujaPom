export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number;
}

export type FoodLevel = "clean" | "normal" | "cheat";

export interface FoodEntry {
  date: string;
  level: FoodLevel;
}

export type WorkoutStatus = "complete" | "partial" | "skip";

export interface WorkoutEntry {
  date: string;
  status: WorkoutStatus;
}

export interface HabitEntry {
  date: string;
  water: boolean;
  sugarFree: boolean; // เพิ่มใหม่
  alcoholFree: boolean; // เพิ่มใหม่
  mealLimit: boolean; // เพิ่มใหม่
  sleep: boolean;
  // movement: boolean;  <-- ลบทิ้งหรือคอมเมนต์ไว้ก็ได้ครับ
}

export interface DailyGoalEntry {
  date: string;
  steps: boolean; // ≥ 6000 steps
  noDrink: boolean; // no sweet drinks / alcohol
}

export interface DailyData {
  weight?: WeightEntry;
  food?: FoodEntry;
  workout?: WorkoutEntry;
  habit?: HabitEntry;
  goal?: DailyGoalEntry;
}
