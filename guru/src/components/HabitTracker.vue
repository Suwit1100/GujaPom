<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { saveHabit, getTodayHabit } from '../services/storage';

const water = ref(false);
const movement = ref(false);
const sleep = ref(false);

onMounted(() => {
    const today = getTodayHabit();
    if (today) {
        water.value = today.water;
        movement.value = today.movement;
        sleep.value = today.sleep;
    }
});

watch([water, movement, sleep], () => {
    saveHabit({
        water: water.value,
        movement: movement.value,
        sleep: sleep.value
    });
});
</script>

<template>
    <div class="card mb-3">
        <div class="card-body bg-dark">
            <h5 class="card-title mb-3">Habits</h5>

            <div class="d-flex flex-column gap-3">
                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="water ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitWater">💧 ดื่มน้ำ</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="water" class="form-check-input" type="checkbox" role="switch" id="habitWater"
                            style="transform: scale(1.3);" />
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="movement ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitMovement">🏃‍♂️ ขยับร่างกาย</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="movement" class="form-check-input" type="checkbox" role="switch"
                            id="habitMovement" style="transform: scale(1.3);" />
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="sleep ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitSleep">😴 นอนพอ (≥ 6 ชม.)</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="sleep" class="form-check-input" type="checkbox" role="switch" id="habitSleep"
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