// nuxt.config.ts
export default defineNuxtConfig({

  compatibilityDate: '2026-05-28',

  modules: [
    '@nuxtjs/supabase',
    '@nuxt/icon'
  ],

  runtimeConfig: {
    public: {
      appName: 'Fabu Yoga Studio'
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'snarkdown',
      ]
    }
  },


  supabase: {
    redirect: false,
    types: false
  }
})