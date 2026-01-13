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
  movement: boolean;
  sleep: boolean;
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
