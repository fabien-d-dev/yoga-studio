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
        <div class="meta-header">
          <span class="category-badge">{{ currentClass.tag }}</span>
          <p class="video-duration">{{ currentClass.duration }}</p>
        </div>

        <h1 class="video-title">{{ currentClass.title }}</h1>

        <div class="specs-grid">
          <div class="spec-item">
            <span class="spec-label">Niveau</span>
            <span class="spec-value">{{ currentClass.level }}</span>
          </div>

          <div class="spec-item">
            <span class="spec-label">Méthode</span>
            <span class="spec-value">{{ currentClass.method || 'Non spécifiée' }}</span>
          </div>

          <div class="spec-item full-width" v-if="currentClass.myofascial_lines">
            <span class="spec-label">Lignes Myofasciales</span>
            <div class="myofascial-tags">
              <template v-if="Array.isArray(currentClass.myofascial_lines)">
                <span v-for="line in currentClass.myofascial_lines" :key="line" class="myofascial-tag">
                  {{ line }}
                </span>
              </template>
              <template
                v-else-if="typeof currentClass.myofascial_lines === 'string' && currentClass.myofascial_lines.trim()">
                <span v-for="line in currentClass.myofascial_lines.split(',')" :key="line" class="myofascial-tag">
                  {{ line.trim() }}
                </span>
              </template>
            </div>
          </div>
        </div>

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
  color: #ecda71;
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
  width: 100%;
}

.meta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.category-badge {
  color: #ecda71;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: rgba(236, 218, 113, 0.08);
  border: 1px solid rgba(236, 218, 113, 0.2);
  padding: 4px 10px;
  border-radius: 4px;
}

.video-duration {
  font-size: 0.85rem;
  color: #c1c1c1;
}

.video-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 300;
  margin: 0 0 30px 0;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  background-color: #121418;
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 30px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.spec-item.full-width {
  grid-column: span 2;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 15px;
  margin-top: 5px;
}

.spec-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #555555;
  letter-spacing: 1.5px;
}

.spec-value {
  font-size: 0.95rem;
  color: #dddddd;
  font-weight: 300;
}

.myofascial-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.myofascial-tag {
  font-size: 0.75rem;
  font-weight: 300;
  color: #ecda71;
  background-color: rgba(236, 218, 113, 0.05);
  border: 1px solid rgba(236, 218, 113, 0.15);
  padding: 4px 10px;
  border-radius: 4px;
}

.divider {
  width: 40px;
  height: 1px;
  background-color: rgba(201, 186, 93, 0.746);
  margin-bottom: 30px;
}

.video-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #b3b3b3;
  font-weight: 200;
}

@media (max-width: 600px) {
  .video-title {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }

  .specs-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .spec-item.full-width {
    grid-column: span 1;
  }
}
</style>