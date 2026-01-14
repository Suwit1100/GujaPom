import { WEEKLY_PLAN, type WorkoutPlan } from "../types/workout";

export function getTodayWorkout(): WorkoutPlan {
  const today = new Date().getDay();
  return WEEKLY_PLAN.find((p) => p.day === today) || WEEKLY_PLAN[0];
}

export function getWeeklyPlan(): WorkoutPlan[] {
  return WEEKLY_PLAN;
}
