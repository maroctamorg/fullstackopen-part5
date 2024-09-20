import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '127.0.0.1',
        proxy: {
            '/api': {
                target: 'http://localhost:3003',
                changeOrigin: true,
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './testSetup.js',
        exclude: [
            ...configDefaults.exclude, 
            'e2etests/*'
        ]
    },
})
