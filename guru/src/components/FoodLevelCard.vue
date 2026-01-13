<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { saveFood, getTodayFood } from '../services/storage';
import type { FoodLevel } from '../types/daily';

const selected = ref<FoodLevel | null>(null);

onMounted(() => {
    const today = getTodayFood();
    if (today) {
        selected.value = today.level;
    }
});

function select(level: FoodLevel) {
    selected.value = level;
    saveFood(level);
}
</script>

<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">อาหารวันนี้</h5>
            <div class="d-grid gap-3">

                <button @click="select('clean')"
                    class="btn btn-block py-3 d-flex justify-content-between align-items-center"
                    :style="selected === 'clean' ? 'background: rgba(29, 185, 84, 0.2); color: #1db954; border: 1px solid #1db954;' : 'background: #2a2a2a; color: white; border: 1px solid transparent;'">
                    <span>🥗 คลีน</span>
                    <span v-if="selected === 'clean'">●</span>
                </button>

                <button @click="select('normal')"
                    class="btn btn-block py-3 d-flex justify-content-between align-items-center"
                    :style="selected === 'normal' ? 'background: rgba(13, 110, 253, 0.2); color: #0d6efd; border: 1px solid #0d6efd;' : 'background: #2a2a2a; color: white; border: 1px solid transparent;'">
                    <span>🍛 ปกติ</span>
                    <span v-if="selected === 'normal'">●</span>
                </button>

                <button @click="select('cheat')"
                    class="btn btn-block py-3 d-flex justify-content-between align-items-center"
                    :style="selected === 'cheat' ? 'background: rgba(255, 193, 7, 0.2); color: #ffc107; border: 1px solid #ffc107;' : 'background: #2a2a2a; color: white; border: 1px solid transparent;'">
                    <span>🍔 หลุด</span>
                    <span v-if="selected === 'cheat'">●</span>
                </button>

            </div>
        </div>
    </div>
</template>