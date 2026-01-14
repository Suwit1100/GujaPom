<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTodayWorkout as getTodayWorkoutPlan } from '../services/workoutPlan';
import { saveWorkout, getTodayWorkout } from '../services/storage';
import type { WorkoutStatus } from '../types/daily';

const todayPlan = getTodayWorkoutPlan();
const status = ref<WorkoutStatus | null>(null);

onMounted(() => {
    const today = getTodayWorkout();
    if (today) {
        status.value = today.status;
    }
});

function setStatus(s: WorkoutStatus) {
    status.value = s;
    saveWorkout(s);
}
</script>

<template>
    <div class="card mb-3">
        <div class="card-body bg-dark">
            <h5 class="card-title text-white">ออกกำลังกายวันนี้</h5>

            <div class="p-3 mb-4 rounded-3 text-center" style="background: linear-gradient(45deg, #2a2a2a, #1c1c1c);">
                <span class="d-block text-muted small mb-1">MISSION</span>
                <span class="fs-4 fw-bold text-white">{{ todayPlan.label }}</span>
            </div>

            <div class="row g-2">
                <div class="col-12">
                    <button @click="setStatus('complete')" class="btn w-100 py-3"
                        :class="status === 'complete' ? 'btn-primary' : 'btn-dark'"
                        :style="status !== 'complete' ? 'background: #2a2a2a;' : ''">
                        🔥 ทำครบ
                    </button>
                </div>
                <div class="col-6">
                    <button @click="setStatus('partial')" class="btn w-100 py-2 small"
                        :class="status === 'partial' ? 'text-warning border border-warning' : 'text-white bg-transparent border border-secondary'">
                        ทำบางส่วน
                    </button>
                </div>
                <div class="col-6">
                    <button @click="setStatus('skip')" class="btn w-100 py-2 small"
                        :class="status === 'skip' ? 'text-danger border border-danger' : 'text-white bg-transparent border border-secondary'">
                        ข้าม
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>