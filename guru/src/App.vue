<script setup lang="ts">
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* --- 🎨 PREMIUM DARK THEME OVERRIDES --- */
:root {
  --bg-body: #0e0e0e;
  --bg-card: #1c1c1c;
  --bg-input: #2a2a2a;
  --accent-primary: #1db954;
  /* Spotify Green */
  --accent-hover: #1ed760;
  --text-main: #ffffff;
  --text-muted: #b3b3b3;
  --radius-card: 24px;
  --radius-btn: 50px;
}

body {
  background-color: var(--bg-body) !important;
  color: var(--text-main) !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100vh;
  padding-bottom: 40px;
  /* Space for bottom scroll */
}

/* Container */
.container {
  max-width: 480px !important;
  /* Mobile focus */
  padding-left: 20px;
  padding-right: 20px;
}

/* Card Styling */
.card {
  background-color: var(--bg-card);
  border: none;
  border-radius: var(--radius-card);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  margin-bottom: 24px !important;
  overflow: hidden;
}

.card-body {
  padding: 24px;
}

.card-title {
  color: white;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Typography */
h1,
h2,
h3,
h4,
h5 {
  color: var(--text-main);
  font-weight: 700;
}

/* Form Controls */
.form-control {
  background-color: var(--bg-input);
  border: 1px solid transparent;
  color: var(--text-main);
  border-radius: 16px;
}

.form-control:focus {
  background-color: #333;
  color: #fff;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.25);
}

/* Buttons */
.btn {
  border-radius: var(--radius-btn);
  font-weight: 600;
  padding: 12px 24px;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: #000;
}

.btn-primary:hover,
.btn-primary:active {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
  color: #000 !important;
  transform: scale(1.02);
}

.btn-outline-primary {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-outline-primary:hover {
  background-color: var(--accent-primary);
  color: #000;
}

/* Utility to hide input arrows */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>