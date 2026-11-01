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
    databaseUrl: process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL || '',
    sessionPassword: process.env.NUXT_SESSION_PASSWORD || process.env.SESSION_PASSWORD || 'baju-collect-secret-session-password-at-least-32-chars',
    adminUsername: process.env.NUXT_ADMIN_USERNAME || 'admin',
    adminPasswordHash: process.env.NUXT_ADMIN_PASSWORD_HASH || '$2a$10$xGHRQ5ZDwGgEPYLXCYLhm.S14TmUlUt1GiYwm5R72BlRwCZwz1/WW',
    neonRealtimeUrl: process.env.NEON_REALTIME_URL || '',
    neonRealtimeSecret: process.env.NEON_REALTIME_SECRET || '',
    neonFunctionHelloBaseUrl: process.env.NEON_FUNCTION_HELLO_BASE_URL || '',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    awsEndpointUrlS3: process.env.AWS_ENDPOINT_URL_S3 || '',
    awsRegion: process.env.AWS_REGION || 'ap-southeast-1',
    neonObjectStorageBucket: process.env.NEON_OBJECT_STORAGE_BUCKET || 'assets',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      neonRealtimeUrl: process.env.NEON_REALTIME_URL || '',
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

