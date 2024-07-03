import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      manifest: {
        name: "派对抽奖",
        short_name: "派对抽奖",
        description: "在派对、婚礼、公司年会等活动现场举行抽奖活动",
        start_url: "/?utm_source=pwa",
        theme_color: "#ffa500",
        background_color: "#333333",
        lang: "zh-CN",
        orientation: "landscape",
        icons: [
          {
            src: "/apple-touch-icon.png",
            type: "image/png",
            sizes: "144x144",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
