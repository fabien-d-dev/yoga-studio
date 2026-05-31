<script setup>
const route = useRoute()
const classSlug = route.params.slug

const { data: response } = await useFetch('/api/classes')

const currentClass = computed(() => {
  return response.value?.data?.find(yogaClass => yogaClass.slug === classSlug)
})
</script>

<template>
  <div class="video-player-page">

    <div class="container" v-if="currentClass">
      <BackButton to="/classes" text="Retour classes" />

      <div class="video-section">
        <div class="video-wrapper">
          <video controls crossorigin="anonymous" controlsList="nodownload" :poster="currentClass.image">
            <source :src="currentClass.video_url" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>

      <div class="info-section">
        <span class="collection-tag">{{ currentClass.collection }} • {{ currentClass.level }}</span>
        <h1 class="video-title">{{ currentClass.title }}</h1>
        <p class="video-duration">Durée de la séance : {{ currentClass.duration }}</p>

        <div class="divider"></div>

        <p class="video-description">
          {{ currentClass.description }}
        </p>
      </div>
    </div>

    <div class="container text-center" v-else>
      <p>Classe introuvable.</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@200;400;500&display=swap');

.video-player-page {
  background-color: #0b0c10;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.back-link {
  color: #c5a880;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s;
}

.back-link:hover {
  color: #ffffff;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px 60px 20px;
}

/* Style du lecteur vidéo */
.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000000;
  border: 1px solid #1f2124;
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

video::-webkit-media-controls-panel {
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.video-wrapper:hover video::-webkit-media-controls-panel {
  opacity: 1;
}

.info-section {
  margin-top: 40px;
  max-width: 800px;
}

.collection-tag {
  color: #c5a880;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 2px;
}

.video-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 300;
  margin: 10px 0 5px 0;
  letter-spacing: 1px;
}

.video-duration {
  font-size: 0.9rem;
  color: #777777;
  margin: 0 0 25px 0;
}

.divider {
  width: 50px;
  height: 1px;
  background-color: #c5a880;
  margin-bottom: 25px;
}

.video-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #cccccc;
  font-weight: 200;
}

@media (max-width: 600px) {
  .video-title {
    font-size: 2rem;
  }
}
</style>