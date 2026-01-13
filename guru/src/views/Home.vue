<script setup lang="ts">
import { useRouter } from 'vue-router';
import WeightCard from '../components/WeightCard.vue';
import FoodLevelCard from '../components/FoodLevelCard.vue';
import WorkoutTodayCard from '../components/WorkoutTodayCard.vue';
import HabitTracker from '../components/HabitTracker.vue';
import DailyGoal from '../components/DailyGoal.vue';

const router = useRouter();

function goToSummary() {
    router.push('/summary');
}
</script>

<template>
    <div class="container py-4">
        <header class="d-flex justify-content-between align-items-end mb-4 px-1">
            <div>
                <span class=" small text-uppercase">Overview</span>
                <h1 class="mb-0 display-6 fw-bold">Today</h1>
            </div>
            <div class="text-end">
                <span class=" small">{{ new Date().toLocaleDateString('th-TH', {
                    weekday: 'short', day:
                    'numeric'}) }}</span>
            </div>
        </header>

        <WeightCard />
        <FoodLevelCard />
        <WorkoutTodayCard />
        <HabitTracker />
        <DailyGoal />

        <div class="d-grid mt-5 mb-4">
            <button @click="goToSummary" class="btn btn-outline-secondary py-3 text-white border-0"
                style="background: #1c1c1c;">
                ดูสรุปสัปดาห์นี้ →
            </button>
        </div>
    </div>
</template>