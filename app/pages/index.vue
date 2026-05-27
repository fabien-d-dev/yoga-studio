<template>
  <main class="hero-container">
    <div class="content">
      <header>
        <span class="subtitle">Bienvenue au Studio</span>
        <h1>Yoga & Sérénité</h1>
        <p class="description">
          Découvrez nos cours en ligne, progressez à votre rythme et accédez à notre catalogue de vidéos exclusives !
        </p>
      </header>

      <nav class="navigation-links">
        <NuxtLink to="/classes" class="btn btn-primary">
          Voir les Classes
        </NuxtLink>
        
        <NuxtLink to="/faq" class="btn btn-secondary">
          Des questions ? (FAQ)
        </NuxtLink>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f5f2;
  font-family: sans-serif;
  color: #2c3e50;
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 600px;
}

.subtitle {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #8e948c;
}

h1 {
  font-size: 3rem;
  margin: 10px 0 20px 0;
  font-weight: 300;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #57606f;
  margin-bottom: 40px;
}

.navigation-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4a5d4e;
  color: white;
}

.btn-primary:hover {
  background-color: #38473b;
  transform: translateY(-2px);
}

.btn-secondary {
  border: 2px solid #4a5d4e;
  color: #4a5d4e;
}

.btn-secondary:hover {
  background-color: rgba(74, 93, 78, 0.1);
  transform: translateY(-2px);
}
</style>