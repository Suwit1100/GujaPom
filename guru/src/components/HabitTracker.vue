<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { saveHabit, getTodayHabit } from '../services/storage';

// สร้าง refs สำหรับรายการ Habit ใหม่
const water = ref(false);
const sugarFree = ref(false);
const alcoholFree = ref(false);
const mealLimit = ref(false);
const sleep = ref(false);

onMounted(() => {
    const today = getTodayHabit();
    if (today) {
        water.value = today.water || false;
        sugarFree.value = today.sugarFree || false;
        alcoholFree.value = today.alcoholFree || false;
        mealLimit.value = today.mealLimit || false;
        sleep.value = today.sleep || false;
    }
});

// Watcher ตรวจสอบการเปลี่ยนแปลงและบันทึกข้อมูล
watch([water, sugarFree, alcoholFree, mealLimit, sleep], () => {
    saveHabit({
        water: water.value,
        sugarFree: sugarFree.value,
        alcoholFree: alcoholFree.value,
        mealLimit: mealLimit.value,
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
                    :style="sugarFree ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitSugar">🍰 ไม่กินของหวาน</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="sugarFree" class="form-check-input" type="checkbox" role="switch"
                            id="habitSugar" style="transform: scale(1.3);" />
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="alcoholFree ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitAlcohol">🍺 ไม่กินเหล้า</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="alcoholFree" class="form-check-input" type="checkbox" role="switch"
                            id="habitAlcohol" style="transform: scale(1.3);" />
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-3 rounded-3 transition-bg"
                    :style="mealLimit ? 'background: rgba(29, 185, 84, 0.1)' : 'background: #2a2a2a'">
                    <label class="form-check-label fs-6 fw-500 text-white" for="habitMeal">🍽️ ไม่กินข้าวเกิน 3
                        มื้อ</label>
                    <div class="form-check form-switch m-0">
                        <input v-model="mealLimit" class="form-check-input" type="checkbox" role="switch" id="habitMeal"
                            style="transform: scale(1.3);" />
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