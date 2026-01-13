import type {
  WeightEntry,
  FoodEntry,
  WorkoutEntry,
  HabitEntry,
  DailyGoalEntry,
} from "../types/daily";

const STORAGE_KEY = "weight_loss_data";

interface StorageData {
  weights: WeightEntry[];
  foods: FoodEntry[];
  workouts: WorkoutEntry[];
  habits: HabitEntry[];
  goals: DailyGoalEntry[];
}

function getStorage(): StorageData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      weights: [],
      foods: [],
      workouts: [],
      habits: [],
      goals: [],
    };
  }
  return JSON.parse(raw);
}

function setStorage(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

// Weight
export function saveWeight(weight: number): void {
  const data = getStorage();
  const today = getTodayDate();
  const idx = data.weights.findIndex((w) => w.date === today);

  if (idx >= 0) {
    data.weights[idx].weight = weight;
  } else {
    data.weights.push({ date: today, weight });
  }

  setStorage(data);
}

export function getWeights(): WeightEntry[] {
  return getStorage().weights.sort((a, b) => b.date.localeCompare(a.date));
}

export function getTodayWeight(): WeightEntry | undefined {
  const today = getTodayDate();
  return getStorage().weights.find((w) => w.date === today);
}

// Food
export function saveFood(level: FoodEntry["level"]): void {
  const data = getStorage();
  const today = getTodayDate();
  const idx = data.foods.findIndex((f) => f.date === today);

  if (idx >= 0) {
    data.foods[idx].level = level;
  } else {
    data.foods.push({ date: today, level });
  }

  setStorage(data);
}

export function getTodayFood(): FoodEntry | undefined {
  const today = getTodayDate();
  return getStorage().foods.find((f) => f.date === today);
}

// Workout
export function saveWorkout(status: WorkoutEntry["status"]): void {
  const data = getStorage();
  const today = getTodayDate();
  const idx = data.workouts.findIndex((w) => w.date === today);

  if (idx >= 0) {
    data.workouts[idx].status = status;
  } else {
    data.workouts.push({ date: today, status });
  }

  setStorage(data);
}

export function getTodayWorkout(): WorkoutEntry | undefined {
  const today = getTodayDate();
  return getStorage().workouts.find((w) => w.date === today);
}

// Habit
export function saveHabit(habit: Omit<HabitEntry, "date">): void {
  const data = getStorage();
  const today = getTodayDate();
  const idx = data.habits.findIndex((h) => h.date === today);

  const entry: HabitEntry = { date: today, ...habit };

  if (idx >= 0) {
    data.habits[idx] = entry;
  } else {
    data.habits.push(entry);
  }

  setStorage(data);
}

export function getTodayHabit(): HabitEntry | undefined {
  const today = getTodayDate();
  return getStorage().habits.find((h) => h.date === today);
}

// Daily Goal
export function saveDailyGoal(goal: Omit<DailyGoalEntry, "date">): void {
  const data = getStorage();
  const today = getTodayDate();
  const idx = data.goals.findIndex((g) => g.date === today);

  const entry: DailyGoalEntry = { date: today, ...goal };

  if (idx >= 0) {
    data.goals[idx] = entry;
  } else {
    data.goals.push(entry);
  }

  setStorage(data);
}

export function getTodayGoal(): DailyGoalEntry | undefined {
  const today = getTodayDate();
  return getStorage().goals.find((g) => g.date === today);
}

// Weekly Summary
export function getWeeklyData() {
  const data = getStorage();
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const weekAgoStr = weekAgo.toISOString().split("T")[0];
  const todayStr = getTodayDate();

  return {
    weights: data.weights.filter(
      (w) => w.date >= weekAgoStr && w.date <= todayStr
    ),
    foods: data.foods.filter((f) => f.date >= weekAgoStr && f.date <= todayStr),
    workouts: data.workouts.filter(
      (w) => w.date >= weekAgoStr && w.date <= todayStr
    ),
    habits: data.habits.filter(
      (h) => h.date >= weekAgoStr && h.date <= todayStr
    ),
    goals: data.goals.filter((g) => g.date >= weekAgoStr && g.date <= todayStr),
  };
}
