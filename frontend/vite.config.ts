import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // Raise this limit to suppress warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@clerk')) return 'clerk';
            if (id.includes('@uiw/react-md-editor')) return 'editor';
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('gsap')) return 'animation';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'icons';
            if (id.includes('styled-components')) return 'styled';
            if (id.includes('react-router') || id.includes('react-router-dom')) return 'router';
            if (id.includes('react-type-animation') || id.includes('react-typed')) return 'typing';
            if (id.includes('next-themes')) return 'theme';
            if (id.includes('sonner')) return 'notify';
            if (id.includes('clsx') || id.includes('class-variance-authority')) return 'classnames';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('tailwind')) return 'tailwind';
            if (id.includes('uuid')) return 'uuid';
            return 'vendor'; // default group
          }
        },
      },
    },
  },
});
