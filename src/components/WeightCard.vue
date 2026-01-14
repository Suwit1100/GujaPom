<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { saveWeight, getTodayWeight, getWeights } from '../services/storage';

const weight = ref<number | null>(null);
const trend = ref<string>('→');

onMounted(() => {
    const today = getTodayWeight();
    if (today) {
        weight.value = today.weight;
    }

    // Calculate trend
    const weights = getWeights();
    if (weights.length >= 2) {
        const latest = weights[0].weight;
        const previous = weights[1].weight;

        if (latest < previous) trend.value = '↓';
        else if (latest > previous) trend.value = '↑';
        else trend.value = '→';
    }
});

function handleSave() {
    const w = Number(weight.value);
    if (w && w > 0) {
        saveWeight(w);

        // Update trend immediately
        setTimeout(() => {
            const weights = getWeights();
            if (weights.length >= 2) {
                const latest = weights[0].weight;
                const previous = weights[1].weight;

                if (latest < previous) trend.value = '↓';
                else if (latest > previous) trend.value = '↑';
                else trend.value = '→';
            }
        }, 100);
    }
}
</script>

<template>
    <div class="card mb-3">
        <div class="card-body text-cente bg-dark">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title mb-0 text-white">น้ำหนักวันนี้</h5>
                <span class="badge bg-dark text-white border border-secondary rounded-pill px-3">
                    {{ trend === '↓' ? 'LD' : trend === '↑' ? 'UP' : 'ST' }}
                    <span
                        :class="{ 'text-success': trend === '↓', 'text-danger': trend === '↑', 'text-muted': trend === '→' }">{{
                        trend }}</span>
                </span>
            </div>

            <div class="position-relative py-3">
                <div class="d-flex justify-content-center align-items-baseline">
                    <input v-model.number="weight" type="number"
                        class="form-control form-control-lg bg-transparent border-0 text-white text-center p-0 fw-bold"
                        placeholder="00.0" style="font-size: 4rem; width: 200px; height: auto;" step="0.1" />
                    <span class="fs-4 text-muted ms-2">KG</span>
                </div>
            </div>

            <button @click="handleSave" class="btn btn-primary w-100 py-3 mt-2">
                บันทึกน้ำหนัก
            </button>
        </div>
    </div>
</template>