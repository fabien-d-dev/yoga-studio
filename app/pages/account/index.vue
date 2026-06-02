<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const newEmail = ref('')
const newPassword = ref('')
const confirmPassword = ref('')


const showEmailForm = ref(false)
const showPasswordForm = ref(false)

const loadingEmail = ref(false)
const loadingPassword = ref(false)
const loadingStripe = ref(false) 
const showPassword = ref(false)

const emailSuccess = ref('')
const emailError = ref('')
const passwordSuccess = ref('')
const passwordError = ref('')
const stripeError = ref('')


onMounted(() => {
  if (!user.value) {
    navigateTo('/auth/login')
  }
})


const { data: profile } = await useAsyncData('profile', async () => {
  if (!user.value) return null
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.value.id)
    .single()
  return data
})


const handleManageSubscription = async () => {
  loadingStripe.value = true
  stripeError.value = ''

  try {
    
    const response = await $fetch('/api/stripe/create-portal', {
      method: 'POST',
      body: {
        userId: user.value.id
      }
    })

    if (response?.url) {
      
      window.location.href = response.url
    } else {
      throw new Error("L'URL du portail de facturation n'a pas pu être générée.")
    }
  } catch (error) {
    stripeError.value = "Impossible d'accéder à la gestion de l'abonnement pour le moment."
  } finally {
    loadingStripe.value = false
  }
}


const handleUpdateEmail = async () => {
  if (!newEmail.value) return

  loadingEmail.value = true
  emailSuccess.value = ''
  emailError.value = ''

  const { error } = await supabase.auth.updateUser({
    email: newEmail.value
  })

  loadingEmail.value = false

  if (!error) {
    emailSuccess.value = "Un e-mail de confirmation a été envoyé à votre nouvelle adresse."
    newEmail.value = ''
  } else {
    emailError.value = error.message || "Erreur lors de la mise à jour de l'e-mail."
  }
}


const handleUpdatePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) return

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = "Les mots de passe ne correspondent pas."
    return
  }

  loadingPassword.value = true
  passwordSuccess.value = ''
  passwordError.value = ''

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value
  })

  loadingPassword.value = false

  if (!error) {
    passwordSuccess.value = "Votre mot de passe a bien été mis à jour."
    newPassword.value = ''
    confirmPassword.value = ''
  } else {
    passwordError.value = error.message || "Erreur lors de la mise à jour du mot de passe."
  }
}


const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/auth/login')
}
</script>

<template>
  <div v-if="user" class="account-page">
    <div class="top-bar"></div>

    <div class="account-container">
      <header class="account-header">
        <h1 class="account-title">Mon Espace</h1>
      </header>

      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar-placeholder">
            {{ (profile?.full_name || user.email)[0].toUpperCase() }}
          </div>
          <div class="user-meta">
            <h2>{{ profile?.full_name || 'Abonné Yoga' }}</h2>
            <p class="user-email">{{ user.email }}</p>
          </div>
        </div>

        <div class="profile-divider"></div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-label">Statut du compte</span>
            <span class="detail-value status-badge">
              <Icon name="lucide:sparkles" class="badge-icon" />
              {{ profile?.role || 'Membre' }}
            </span>
          </div>
        </div>

        <div class="card-actions">
          <button @click="handleLogout" class="btn-logout">
            <Icon name="lucide:log-out" class="logout-icon" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      <div class="settings-card">
        <h2 class="settings-title">Paramètres du compte</h2>

        <div class="actions-wrapper">

          <div class="cta-section">
            <button @click="handleManageSubscription" class="btn-trigger" :disabled="loadingStripe">
              <div class="btn-trigger-content">
                <Icon name="lucide:credit-card" class="trigger-icon stripe-accent" />
                <div class="trigger-text">
                  <span>Abonnement & Facturation</span>
                  <p v-if="loadingStripe">Chargement du portail sécurisé...</p>
                  <p v-else>Gérer vos paiements, factures et formules via Stripe</p>
                </div>
              </div>
              <Icon name="lucide:external-link" class="chevron-icon" />
            </button>
            <p v-if="stripeError" class="error-text link-padding">{{ stripeError }}</p>
          </div>

          <div class="settings-divider"></div>

          <div class="cta-section">
            <button @click="showEmailForm = !showEmailForm" class="btn-trigger" :class="{ active: showEmailForm }">
              <div class="btn-trigger-content">
                <Icon name="lucide:mail" class="trigger-icon" />
                <div class="trigger-text">
                  <span>Adresse e-mail</span>
                  <p>Modifier votre adresse de connexion</p>
                </div>
              </div>
              <Icon :name="showEmailForm ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="chevron-icon" />
            </button>

            <transition name="fade-slide">
              <form v-if="showEmailForm" @submit.prevent="handleUpdateEmail" class="settings-form expanded-form">
                <div class="input-group">
                  <input v-model="newEmail" type="email" placeholder="Nouvelle adresse e-mail" required />
                </div>

                <p v-if="emailError" class="error-text">{{ emailError }}</p>
                <p v-if="emailSuccess" class="success-text">{{ emailSuccess }}</p>

                <button class="btn-save" type="submit" :disabled="loadingEmail">
                  <span v-if="loadingEmail">Mise à jour...</span>
                  <span v-else>Confirmer le changement</span>
                </button>
              </form>
            </transition>
          </div>

          <div class="settings-divider"></div>

          <div class="cta-section">
            <button @click="showPasswordForm = !showPasswordForm" class="btn-trigger"
              :class="{ active: showPasswordForm }">
              <div class="btn-trigger-content">
                <Icon name="lucide:lock" class="trigger-icon" />
                <div class="trigger-text">
                  <span>Mot de passe</span>
                  <p>Mettre à jour votre clé d'accès sécurisée</p>
                </div>
              </div>
              <Icon :name="showPasswordForm ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="chevron-icon" />
            </button>

            <transition name="fade-slide">
              <form v-if="showPasswordForm" @submit.prevent="handleUpdatePassword" class="settings-form expanded-form">
                <div class="input-group">
                  <input v-model="newPassword" :type="showPassword ? 'text' : 'password'"
                    placeholder="Nouveau mot de passe" required />
                  <button type="button" class="btn-reveal" @click="showPassword = !showPassword"
                    aria-label="Toggle password visibility">
                    <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" />
                  </button>
                </div>

                <div class="input-group">
                  <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'"
                    placeholder="Confirmer le nouveau mot de passe" required />
                  <button type="button" class="btn-reveal" @click="showPassword = !showPassword"
                    aria-label="Toggle password visibility">
                    <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" />
                  </button>
                </div>

                <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
                <p v-if="passwordSuccess" class="success-text">{{ passwordSuccess }}</p>

                <button class="btn-save" type="submit" :disabled="loadingPassword">
                  <span v-if="loadingPassword">Mise à jour...</span>
                  <span v-else>Confirmer le nouveau mot de passe</span>
                </button>
              </form>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500&display=swap');

.account-page {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  padding: 60px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.account-container {
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.account-header {
  text-align: center;
}

.account-title {
  font-size: 2.4rem;
  font-weight: 200;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.account-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
}

/* Cards shared design */
.profile-card,
.settings-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 35px;
  backdrop-filter: blur(10px);
}

.settings-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-title {
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0 0 10px 0;
}

.actions-wrapper {
  display: flex;
  flex-direction: column;
}

.cta-section {
  display: flex;
  flex-direction: column;
}

.btn-trigger {
  width: 100%;
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn-trigger:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.03);
}

.btn-trigger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-trigger.active {
  background: rgba(255, 255, 255, 0.01);
}

.btn-trigger-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.trigger-icon {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);
}

.stripe-accent {
  color: #635bff;
}

.trigger-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.trigger-text span {
  font-size: 0.95rem;
  font-weight: 400;
}

.trigger-text p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  font-weight: 300;
  text-align: left;
}

.chevron-icon {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.3s;
}

.btn-trigger:hover:not(:disabled) .chevron-icon {
  color: #ffffff;
}

.expanded-form {
  padding: 15px 10px 10px 10px;
  margin-top: 5px;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-placeholder {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
}

.user-meta h2 {
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
}

.user-email {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  font-weight: 300;
}

.profile-divider,
.settings-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 15px 0;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}

.badge-icon {
  font-size: 0.9rem;
  color: #ecda71;
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
  border-radius: 1rem;
  padding: 1rem 3.5rem 1rem 1rem;
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
  text-align: left;
  margin: 5px 0 0 0;
}

.link-padding {
  padding-left: 10px;
}

.success-text {
  color: #69db7c;
  font-size: 0.85rem;
  text-align: left;
  margin: 5px 0 0 0;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255, 91, 91, 0.3);
  color: #ff5b5b;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(255, 91, 91, 0.05);
  border-color: #ff5b5b;
}

.btn-save {
  align-self: flex-start;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 0.85rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save:hover:not(:disabled) {
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.03);
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 600px) {
  .account-title {
    font-size: 2rem;
  }

  .profile-card,
  .settings-card {
    padding: 20px;
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