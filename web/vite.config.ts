import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { db } from './src/data'

// Prerender page list generated from the data catalog so coverage
// can never drift from content.
const pages = [
  { path: '/routine' },
  ...db.days.map((d) => ({ path: `/routine/${d.slug}` })),
  ...Object.keys(db.exercises).map((id) => ({ path: `/exercise/${id}` })),
  ...Object.keys(db.equipment).map((id) => ({ path: `/equipment/${id}` })),
]

export default defineConfig({
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).pathname,
    },
  },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
      },
      pages,
    }),
    viteReact(),
    tailwindcss(),
  ],
})
