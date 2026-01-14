<script setup lang="ts">
import { computed } from 'vue';
import { getWeeklyData } from '../services/storage';

const data = computed(() => getWeeklyData());

const weightTrend = computed(() => {
    const weights = data.value.weights;
    if (weights.length < 2) return '→';

    const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date));
    const first = sorted[0].weight;
    const last = sorted[sorted.length - 1].weight;

    if (last < first) return '↓ ลดลง';
    if (last > first) return '↑ เพิ่มขึ้น';
    return '→ คงที่';
});

const foodSummary = computed(() => {
    const foods = data.value.foods;
    const clean = foods.filter(f => f.level === 'clean').length;
    const normal = foods.filter(f => f.level === 'normal').length;
    const cheat = foods.filter(f => f.level === 'cheat').length;

    return { clean, normal, cheat };
});

const workoutSummary = computed(() => {
    const workouts = data.value.workouts;
    const complete = workouts.filter(w => w.status === 'complete').length;
    const partial = workouts.filter(w => w.status === 'partial').length;
    const skip = workouts.filter(w => w.status === 'skip').length;

    return { complete, partial, skip };
});

// ปรับปรุงการคำนวณ Habit Completion เป็น 5 หัวข้อใหม่
const habitCompletion = computed(() => {
    const habits = data.value.habits;
    if (habits.length === 0) return 0;

    // มี 5 habits: water, sugarFree, alcoholFree, mealLimit, sleep
    const totalPossible = habits.length * 5;
    const done = habits.reduce((sum, h) => {
        return sum +
            (h.water ? 1 : 0) +
            (h.sugarFree ? 1 : 0) +
            (h.alcoholFree ? 1 : 0) +
            (h.mealLimit ? 1 : 0) +
            (h.sleep ? 1 : 0);
    }, 0);

    return Math.round((done / totalPossible) * 100);
});

const goalCompletion = computed(() => {
    const goals = data.value.goals;
    if (goals.length === 0) return 0;

    const total = goals.length * 2;
    const done = goals.reduce((sum, g) => {
        return sum + (g.steps ? 1 : 0) + (g.noDrink ? 1 : 0);
    }, 0);

    return Math.round((done / total) * 100);
});

const insight = computed(() => {
    const { complete } = workoutSummary.value;
    const { cheat } = foodSummary.value;
    const trend = weightTrend.value;

    if (complete >= 4 && cheat <= 1 && trend.includes('↓')) {
        return '🚀 ยอดเยี่ยม! มาถูกทางแล้ว';
    }

    if (complete >= 3 && cheat === 0) {
        return '🔥 ดีมาก รักษาจังหวะนี้ไว้';
    }

    if (cheat >= 3) {
        return '⚠️ หลุดบ่อยไปนิด ดึงสติกลับมานะ';
    }

    return '💪 ทำไปเรื่อยๆ ไม่ต้องรีบ';
});
</script>

<template>
    <div class="card">
        <div class="card-body bg-dark">
            <h5 class="card-title text-center mb-4 text-white">WEEKLY RECAP</h5>

            <div class="row g-3 mb-4">
                <div class="col-6">
                    <div class="p-3 rounded-4 h-100" style="background: #252525;">
                        <small class="text-white d-block mb-1">Weight</small>
                        <div class="fw-bold fs-5 text-white">{{ weightTrend }}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 rounded-4 h-100" style="background: #252525;">
                        <small class="text-white d-block mb-1">Habits</small>
                        <div class="fw-bold fs-5" :class="habitCompletion > 70 ? 'text-success' : 'text-white'">
                            {{ habitCompletion }}%
                        </div>
                        <div class="progress mt-2" style="height: 4px; background: #333;">
                            <div class="progress-bar bg-success" :style="{ width: habitCompletion + '%' }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-white">Food</small>
                    <small class="text-white">Clean {{ foodSummary.clean }} / Normal {{ foodSummary.normal }} / Cheat {{
                        foodSummary.cheat }}</small>
                </div>
                <div class="progress rounded-pill" style="height: 8px; background: #333;">
                    <div class="progress-bar bg-success" :style="{ width: (foodSummary.clean * 14.3) + '%' }"></div>
                    <div class="progress-bar bg-primary" :style="{ width: (foodSummary.normal * 14.3) + '%' }"></div>
                    <div class="progress-bar bg-warning" :style="{ width: (foodSummary.cheat * 14.3) + '%' }"></div>
                </div>
            </div>

            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-white">Workout</small>
                    <small class="text-white">Done {{ workoutSummary.complete }} / Partial {{ workoutSummary.partial
                    }}</small>
                </div>
                <div class="progress rounded-pill" style="height: 8px; background: #333;">
                    <div class="progress-bar bg-success" :style="{ width: (workoutSummary.complete * 14.3) + '%' }">
                    </div>
                    <div class="progress-bar bg-warning" :style="{ width: (workoutSummary.partial * 14.3) + '%' }">
                    </div>
                </div>
            </div>

            <div class="alert border-0 text-center py-3"
                style="background: rgba(29, 185, 84, 0.15); color: #1db954; border-radius: 16px;">
                <i class="bi bi-lightning-fill me-2"></i>
                {{ insight }}
            </div>
        </div>
    </div>
</template>