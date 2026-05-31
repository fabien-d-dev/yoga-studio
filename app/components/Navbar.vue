<script setup>
const config = useRuntimeConfig()
const nameOfApp = config.public.appName

const route = useRoute()
const user = useSupabaseUser()
</script>

<template>
  <nav class="global-navbar">
    <div class="nav-container">
      <NuxtLink to="/" class="nav-brand">
        <img src="/gatoShadow.png" alt="yogaClass.title" class="nav-icon site-icon" loading="lazy" />
        <span class="site-title desktop-title">{{ nameOfApp }}</span>
        <span class="site-title mobile-title">FYS</span>
      </NuxtLink>

      <div class="nav-links">
        <NuxtLink to="/classes" class="nav-item">Classes</NuxtLink>
        <NuxtLink to="/faq" class="nav-item">FAQ</NuxtLink>

        <NuxtLink v-if="user" to="/account" class="nav-item">Mon compte</NuxtLink>
        <NuxtLink v-else to="/auth/login" class="nav-item">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.global-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: rgba(26, 41, 57, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand:hover .site-icon {
  opacity: 1;
  filter: brightness(1.2);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-brand:hover {
  color: #ecda71;
}

.nav-icon {
  font-size: 1.3rem;
}

.site-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 2px;
}

.mobile-title {
  display: none;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  font-family: 'Montserrat', sans-serif;
  color: #aaaaaa;
  text-decoration: none;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  position: relative;
  padding: 4px 0;
  transition: color 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ecda71;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-item.router-link-active {
  color: #ecda71;
  pointer-events: none;
  cursor: default;
}

.nav-item.router-link-active::after {
  transform: scaleX(1);
  background-color: #ecda71;
}

.site-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  vertical-align: middle;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.nav-brand:hover .site-icon {
  opacity: 1;
  filter: brightness(1.2);
}

@media (max-width: 600px) {
  .nav-container {
    padding: 0 20px;
  }

  .desktop-title {
    display: none;
  }

  .mobile-title {
    display: inline-block;
    font-size: 1.1rem;
  }
}
</style>