<script setup>
const config = useRuntimeConfig()
const nameOfApp = config.public.appName
</script>

<template>
  <main class="hero-container">
    <div class="hero-bg-image"></div>
    <div class="hero-overlay"></div>

    <div class="content">
      <header>
        <span class="subtitle">Le Studio En Ligne</span>
        <h1 class="brand-title">{{ nameOfApp }}</h1>
        <div class="divider"></div>
        <p class="description">
          Optimiser la récupération et les performances grâce à l'anatomie fonctionnelle.
          Un&nbsp;catalogue de cours ciblés entre lignes myofasciales, mobilité active et passive.
        </p>
      </header>

      <nav class="navigation-links">
        <NuxtLink to="/classes" class="btn btn-primary">
          Explorer les Classes
        </NuxtLink>

        <NuxtLink to="/faq" class="btn btn-secondary">
          Foire Aux Questions
        </NuxtLink>
      </nav>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@200;400;600&display=swap');

.hero-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #ffffff;
  padding: 20px;
  overflow: hidden;
  background-color: #1c1e26;
}


.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://nirrfemzxuxswmfzgeps.supabase.co/storage/v1/object/public/yoga-studio/images/genesis.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}


.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(11, 12, 16, 0.5) 0%, rgba(11, 12, 16, 0.85) 100%);
  z-index: 2;
}

.content {
  position: relative;
  text-align: center;
  max-width: 700px;
  z-index: 3;
  padding: 0 20px;
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.85rem;
  font-weight: 200;
  color: #c5a880;
}

.brand-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 4rem;
  margin: 15px 0;
  font-weight: 300;
  letter-spacing: 2px;
}

.divider {
  width: 60px;
  height: 1px;
  background-color: #c5a880;
  margin: 20px auto;
}

.description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.05rem;
  font-weight: 200;
  line-height: 1.8;
  color: #e0e0e0;
  margin-bottom: 45px;
  letter-spacing: 0.5px;
}

.navigation-links {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  font-family: 'Montserrat', sans-serif;
  display: inline-block;
  padding: 16px 36px;
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 2px;
}

.btn-primary {
  background-color: #ffffff;
  color: #0b0c10;
  border: 1px solid #ffffff;
}

.btn-primary:hover {
  background-color: transparent;
  color: #ffffff;
  transform: translateY(-2px);
}

.btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.btn-secondary:hover {
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .brand-title {
    font-size: 2.8rem;
  }

  .btn {
    width: 100%;
    padding: 14px 20px;
  }
}
</style>