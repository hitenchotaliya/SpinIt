import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Ensures correct relative path for assets
    build: {
        outDir: 'dist'  // Ensure built files go into 'dist'
    }
});
