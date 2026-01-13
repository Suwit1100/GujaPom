<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { saveDailyGoal, getTodayGoal } from '../services/storage';

const steps = ref(false);
const noDrink = ref(false);

onMounted(() => {
    const today = getTodayGoal();
    if (today) {
        steps.value = today.steps;
        noDrink.value = today.noDrink;
    }
});

watch([steps, noDrink], () => {
    saveDailyGoal({
        steps: steps.value,
        noDrink: noDrink.value
    });
});
</script>

<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title mb-3">Daily Goals</h5>

            <div class="d-flex flex-column gap-3">
                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="steps ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500" for="goalSteps">👟 เดิน ≥ 6,000 ก้าว</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="steps" class="form-check-input" type="checkbox" role="switch" id="goalSteps"
                            style="transform: scale(1.3);" />
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="noDrink ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500" for="goalNoDrink">🥤 งดน้ำหวาน/Lกฮ</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="noDrink" class="form-check-input" type="checkbox" role="switch" id="goalNoDrink"
                            style="transform: scale(1.3);" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.transition-bg {
    transition: background-color 0.3s ease;
}

.form-check-input:checked {
    background-color: var(--accent-primary);
    border-color: var(--accent-primary);
}
</style>