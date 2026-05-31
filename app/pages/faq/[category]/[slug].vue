<script setup>
import snarkdown from 'snarkdown'

const route = useRoute()
const { category, slug } = route.params

const { data: response } = await useFetch(`/api/faq`, {
  query: { slug: slug }
})

const htmlAnswer = computed(() => {
  if (!response.value?.data?.answer) return ''
  return snarkdown(response.value.data.answer)
})
</script>

<template>
  <div class="faq-article-page">

    <div class="container" v-if="response?.data">
      <BackButton to="/faq" text="Retour FAQ" />
      <article class="faq-article">
        <h1 class="article-title">{{ response.data.title }}</h1>
        <div class="divider"></div>

        <div class="article-content" v-html="htmlAnswer"></div>
      </article>
    </div>

    <div class="container text-center" v-else>
      <p>Question introuvable.</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@200;400&display=swap');

.faq-article-page {
  background-color: #0b0c10;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.back-link {
  color: #c5a880;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
}

.article-category {
  color: #c5a880;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 3px;
  display: block;
  margin-bottom: 15px;
}

.article-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 20px 0;
}

.divider {
  width: 40px;
  height: 1px;
  background-color: #c5a880;
  margin-bottom: 40px;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #cccccc;
  font-weight: 200;
  letter-spacing: 0.5px;
}

.article-content :deep(p) {
  margin-bottom: 25px;
}

.article-content :deep(h3) {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: 400;
  margin-top: 35px;
  margin-bottom: 15px;
  letter-spacing: 0px;
}

.article-content :deep(strong) {
  color: #c5a880;
  font-weight: 400;
}

.article-content :deep(em) {
  font-style: italic;
  color: #ffffff;
  opacity: 0.9;
}

.article-content :deep(ul) {
  margin: 20px 0 30px 20px;
  list-style-type: square;
}

.article-content :deep(li) {
  margin-bottom: 10px;
  color: #b3b3b3;
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 40px 0;
}
</style>