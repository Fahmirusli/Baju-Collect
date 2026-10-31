// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    'nuxt-auth-utils',
  ],

  runtimeConfig: {
    databaseUrl: '',
    sessionPassword: '',
    adminUsername: '',
    adminPasswordHash: '',
    neonRealtimeUrl: '',
    neonRealtimeSecret: '',
    neonFunctionHelloBaseUrl: '',
    awsAccessKeyId: '',
    awsSecretAccessKey: '',
    awsEndpointUrlS3: '',
    awsRegion: '',
    neonObjectStorageBucket: 'assets',
    public: {
      siteUrl: 'http://localhost:3000',
      neonRealtimeUrl: '',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  icon: {
    serverBundle: 'auto',
  },

  app: {
    head: {
      title: 'Group Shirt Order',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Group shirt ordering system' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  nitro: {
    preset: 'vercel',
  },

  typescript: {
    strict: true,
  },
})

