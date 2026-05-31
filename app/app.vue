<script setup>
const route = useRoute()
</script>

<template>
  <div class="app-container">
    <Navbar />

    <NuxtRouteAnnouncer />

    <main class="main-content">
      <NuxtPage />
    </main>

    <AppFooter v-if="route.path !== '/'" />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #1c1e26;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}
</style>