import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: { enabled: true },
            workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,ts}'] },
            includeAssets: ['*'],
            manifest: {
                name: 'Offline Key',
                short_name: 'Offline Key',
                description: 'An offline password generator!',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
                screenshots: [
                    {
                        src: "desktop.png",
                        type: "image/png",
                        sizes: "1920x1080",
                        form_factor: "wide"
                    },
                    {
                        src: "mobile.png",
                        type: "image/png",
                        sizes: "556x935",
                        form_factor: "narrow"
                    },
                ],
            }
        })
    ],
    server: {
        host: true, // or '0.0.0.0' to listen on all interfaces
        port: 80, // Or whatever port you're using
    },
})