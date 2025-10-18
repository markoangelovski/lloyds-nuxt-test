import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    inlineRouteRules: true,
  },
  // routeRules: {
  // Homepage pre-rendered at build time
  // "/": { prerender: true },
  // // Products page generated on demand, revalidates in background, cached until API response changes
  // "/products": { swr: true },
  // // Product pages generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
  // "/products/**": { swr: 3600 },
  // // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
  // "/blog": { isr: 3600 },
  // // Blog post page generated on demand once until next deployment, cached on CDN
  // "/blog/**": { isr: true },
  // // Admin dashboard renders only on client-side
  // "/admin/**": { ssr: false },
  // // Add cors headers on API routes
  // "/api/**": { cors: true },
  // // Redirects legacy urls
  // "/old-page": { redirect: "/new-page" },
  // },
});
