export type WorkoutType = "upper" | "lower" | "cardio" | "light" | "rest";

export interface WorkoutPlan {
  day: number; // 0 = Sunday, 1 = Monday, ...
  type: WorkoutType;
  label: string;
}

export const WEEKLY_PLAN: WorkoutPlan[] = [
  { day: 0, type: "rest", label: "Rest" },
  { day: 1, type: "upper", label: "Upper Body" },
  { day: 2, type: "cardio", label: "Cardio" },
  { day: 3, type: "lower", label: "Lower Body" },
  { day: 4, type: "cardio", label: "Cardio" },
  { day: 5, type: "upper", label: "Upper Body" },
  { day: 6, type: "light", label: "Light Cardio / Walk" },
];
