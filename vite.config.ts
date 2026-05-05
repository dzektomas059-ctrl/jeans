import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-expect-error optional source tags plugin
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {
    /* optional plugin not present */
  }

  // BASE_PATH lets us build for a subpath (e.g. GitHub Pages: /jeans/)
  // while keeping root-served deployments (devinapps, dev server) working.
  const base = process.env.BASE_PATH ?? '/';

  return { base, plugins };
})
