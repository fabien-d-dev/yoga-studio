<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const showPassword = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas."
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (!error) {
    successMessage.value = "Inscription réussie ! Vérifiez votre boîte mail pour confirmer votre compte."
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } else {
    errorMessage.value = error.message || "Une erreur est survenue lors de l'inscription."
  }
}
</script>

<template>
  <div class="register-page">
    <div class="form-section">
      <div class="form-wrapper">
        <h1 class="register-title">S'inscrire</h1>

        <div class="oauth-buttons">
          <button class="btn-oauth" type="button">
            <Icon name="logos:google-icon" class="oauth-icon" />
            <span>Inscrivez-vous avec Gmail</span>
            <Icon name="lucide:arrow-right" class="arrow-icon" />
          </button>
        </div>

        <div class="divider">
          <span>Ou</span>
        </div>

        <form @submit.prevent="handleRegister" class="credentials-form">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="E-mail" required />
          </div>

          <div class="input-group">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" required />
            <button type="button" class="btn-reveal" @click="showPassword = !showPassword"
              aria-label="Toggle password visibility">
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" />
            </button>
          </div>

          <div class="input-group">
            <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Confirmez le mot de passe"
              required />
            <button type="button" class="btn-reveal" @click="showPassword = !showPassword"
              aria-label="Toggle password visibility">
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" />
            </button>
          </div>

          <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-text">{{ successMessage }}</p>

          <button class="btn-submit" type="submit" :disabled="loading">
            <span v-if="loading">Création d'un compte...</span>
            <span v-else>S'inscrire</span>
            <Icon v-if="!loading" name="lucide:arrow-right" class="arrow-icon" />
          </button>
        </form>

        <div class="form-footer">
          <p class="login-prompt">
            Vous avez déjà un compte ? <NuxtLink to="/auth/login" class="footer-link highlight">Se connecter</NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <div class="image-section">
      <div class="gradient-overlay"></div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap');

.register-page {
  display: flex;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
}


.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(to right, #050505 70%, transparent 100%);
  z-index: 2;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.register-title {
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 40px;
  letter-spacing: 1px;
}


.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-oauth {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 14px 24px;
  border-radius: 30px;
  font-size: 0.85rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-oauth span {
  flex-grow: 1;
  text-align: left;
  margin-left: 14px;
}

.oauth-icon {
  font-size: 1.2rem;
}

.text-white {
  color: #ffffff;
}

.arrow-icon {
  font-size: 1rem;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.btn-oauth:hover,
.btn-submit:hover {
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.03);
}

.btn-oauth:hover .arrow-icon,
.btn-submit:hover .arrow-icon {
  transform: translateX(4px);
}

.divider {
  margin: 35px 0;
  position: relative;
}

.divider span {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #666666;
  background-color: #050505;
  padding: 0 15px;
}

.credentials-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.input-group {
  position: relative;
  width: 100%;
}

.input-group input {
width: 100%;
  background-color: #ffffff;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #000000;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  outline: none;
  transition: border-color 0.3s;
  border-radius: 1rem;
  padding: 1rem 3.5rem 1rem 1rem;
}

.input-group input:focus {
  border-color: #ffffff;
}

.btn-reveal {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: color 0.3s ease;
  z-index: 3;
}

.btn-reveal:hover {
  color: #000000;
}

.btn-reveal :deep(svg) {
  width: 1.15rem;
  height: 1.15rem;
}

.error-text {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin: -10px 0 0 0;
}

.success-text {
  color: #69db7c;
  font-size: 0.85rem;
  margin: -10px 0 0 0;
  line-height: 1.4;
}

.btn-submit {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 14px 24px;
  border-radius: 30px;
  font-size: 0.9rem;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


.form-footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.login-prompt {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-link.highlight {
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 400;
  margin-left: 5px;
  transition: color 0.3s;
}

.footer-link.highlight:hover {
  color: #c5a880;
}


.image-section {
  flex: 1.2;
  background-image: url('https://nirrfemzxuxswmfzgeps.supabase.co/storage/v1/object/public/yoga-studio/images/6e8b1fc28121384bc6305ee25aff2c0b.png');
  background-size: cover;
  background-position: center center;
  position: relative;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #000000 0%, transparent 40%);
}

@media (max-width: 900px) {
  .image-section {
    display: none;
  }

  .form-section {
    background: #000000;
  }
}

.input-group input:-webkit-autofill,
.input-group input:-webkit-autofill:hover,
.input-group input:-webkit-autofill:focus,
.input-group input:-webkit-autofill:active {
  -webkit-text-fill-color: #000000 !important;
  box-shadow: 0 0 0 1000px #ffffff inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>