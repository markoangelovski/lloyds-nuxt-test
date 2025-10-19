import tailwindcss from "@tailwindcss/vite";
import { routeRules } from "./utils/data/routeRules";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules,
  nitro: {
    preset: "vercel", // For deployment on Vercel, vercel build expects /dist folder by default. Nuxt creates /.output folder.
  },
});
