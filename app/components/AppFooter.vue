<template>
  <footer class="app-footer">
    <div class="footer-container">

      <div class="footer-main">
        <h2 class="footer-logo">FYS</h2>
        <p class="footer-description">
          Allier le mouvement, la respiration et la technique pour transcender votre pratique.
        </p>
      </div>

      <div class="footer-links-group">
        <div class="footer-nav-col">
          <h3 class="col-title">Navigation</h3>
          <NuxtLink to="/classes" class="footer-link">Classes</NuxtLink>
          <NuxtLink to="/faq" class="footer-link">FAQ</NuxtLink>
        </div>

        <div class="footer-nav-col">
          <h3 class="col-title">Légal</h3>
          <NuxtLink to="/legal" class="footer-link">Mentions Légales</NuxtLink>
          <NuxtLink to="/privacy" class="footer-link">Confidentialité</NuxtLink>
        </div>
      </div>

      <div class="footer-nav-col">
        <h3 class="col-title">Réseaux</h3>
        <a href="#" target="_blank" rel="noopener" class="footer-link instagram-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="instagram-icon">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span>Instagram</span>
        </a>
      </div>

      <div class="footer-bottom-container">
        <p>&copy; {{ currentYear }} FabuYogaStudio. All rights reserved.</p>
        <p class="designer-credit">Designed with Nuxt</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@200;300;400&display=swap');

.app-footer {
  background-color: #1a2939;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding-top: 30px;
  margin-top: auto;
}

.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px 40px 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-main {
  max-width: 400px;
}

.footer-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 15px 0;
}

.footer-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ffffff;
  font-weight: 200;
}

.footer-links-group {
  display: flex;
  gap: 80px;
}

.footer-nav-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-title {
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ecda71;
  margin-bottom: 8px;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 300;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #ecda71;
  transform: translateX(2px);
}

.instagram-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom-container {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  margin-top: 10px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #ffffff;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.designer-credit {
  color: #ffffff;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    padding: 0 20px 40px 20px;
    gap: 30px;
  }

  .footer-links-group {
    gap: 40px;
    flex-wrap: wrap;
  }

  .footer-bottom-container {
    margin-top: 10px;
    padding-top: 25px;
  }
}
</style>