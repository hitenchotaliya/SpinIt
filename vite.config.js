import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Ensures proper asset linking
    build: {
        outDir: 'dist' // Output directory for build
    }
});
