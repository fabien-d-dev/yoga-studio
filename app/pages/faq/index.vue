<!-- app/pages/faq/index.vue -->
<script setup>
const { data: response } = await useFetch('/api/faq')
</script>

<template>
  <div class="faq-page">

    <div class="container">
      <BackButton to="/" text="Retour" />
      <h1 class="page-title">Foire Aux Questions</h1>

      <div class="faq-list">

        <NuxtLink v-for="item in response?.data" :key="item.slug" :to="`/faq/${item.category}/${item.slug}`"
          class="faq-link-item">
          <span class="faq-question-title">{{ item.title }}</span>
          <span class="arrow">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@200;400&display=swap');

.faq-page {
  background-color: #0b0c10;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.back-link {
  color: #ecda71;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.category-tag {
  color: #ecda71;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 3px;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 300;
  margin: 10px 0 40px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #222;
}

.faq-link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #222;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s;
}

.faq-link-item:hover {
  padding-left: 10px;
  color: #ecda71;
}

.faq-question-title {
  font-size: 1.1rem;
  font-weight: 300;
}

.arrow {
  color: #ecda71;
}
</style>