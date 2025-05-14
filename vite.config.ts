import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        base: env.VERCEL === '1' ? '/' : '/digital-tour/'   // Set base dynamically based on VERCEL env variable
    }
})
