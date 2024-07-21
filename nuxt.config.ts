// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  pages: true,
  ssr: true,

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],

  compatibilityDate: "2024-07-21",
});