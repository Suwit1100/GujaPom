<script setup lang="ts">
import { useRouter } from 'vue-router';
import WeeklySummaryCard from '../components/WeeklySummaryCard.vue';

const router = useRouter();

function goBack() {
    router.push('/');
}
</script>

<template>
    <div class="container py-4">
        <div class="d-flex align-items-center mb-4">
            <button @click="goBack"
                class="btn btn-dark rounded-circle p-0 me-3 d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px; background: #2a2a2a;">
                ←
            </button>
            <h1 class="mb-0 fs-3">Summary</h1>
        </div>

        <WeeklySummaryCard />
    </div>
</template>