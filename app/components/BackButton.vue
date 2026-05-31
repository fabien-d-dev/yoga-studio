<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: "Retour"
  }
})
</script>

<template>
  <header class="header-nav">
    <NuxtLink :to="to" class="back-link">
      ← {{ text }}
    </NuxtLink>
  </header>
</template>

<style scoped>
.header-nav {
  padding-top: 4.5rem;
  padding-bottom: 1rem;
}

.back-link {
  display: inline-block;
  color: #f3dd62;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s, transform 0.3s;
}

.back-link:hover {
  color: #ffffff;
  transform: translateX(-4px);
}
</style>