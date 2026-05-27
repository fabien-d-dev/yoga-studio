// nuxt.config.ts
export default defineNuxtConfig({
  // 1. Your active modules
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/icon'
  ],

  // 2. Vite-specific configuration (to avoid page reloads)
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },

  // 3. Your Supabase configuration (if you have chosen to disable types for now)
  supabase: {
    redirect: false,
    types: false // Switch back to true once your database types are generated
  }
})