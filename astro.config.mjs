// @ts-check
// ============================================================================
// ASTRO CONFIGURATION
// ============================================================================
// File ini adalah pusat konfigurasi Astro. Semua plugin, adapter, dan
// pengaturan website dikonfigurasi di sini.
//
// Dokumentasi: https://docs.astro.build/en/reference/configuration-reference/
// ============================================================================

import { defineConfig } from 'astro/config';

// --- Plugin & Adapter Imports ---
// Tailwind CSS v4 menggunakan plugin Vite (bukan @astrojs/tailwind yang deprecated)
import tailwindcss from '@tailwindcss/vite';

// Auto-generate sitemap.xml untuk SEO (membantu Google index halaman)
import sitemap from '@astrojs/sitemap';

// Auto-generate robots.txt (mengatur akses crawler/bot)
import robotsTxt from 'astro-robots-txt';

// ============================================================================
// KONFIGURASI UTAMA
// ============================================================================
export default defineConfig({
  // --------------------------------------------------------------------------
  // SITE URL
  // --------------------------------------------------------------------------
  // URL production website kamu. WAJIB diisi untuk sitemap & canonical URL.
  // Ganti dengan domain asli saat deploy.
  site: 'https://bradwear-lp.pages.dev',

  // --------------------------------------------------------------------------
  // OUTPUT MODE
  // --------------------------------------------------------------------------
  // 'static' = Full static (semua halaman di-generate jadi HTML saat build)
  // API endpoint Meta CAPI ditangani oleh Cloudflare Pages Functions
  // (file di folder /functions/) sehingga tidak butuh SSR dari Astro.
  output: 'static',

  // --------------------------------------------------------------------------
  // TRAILING SLASH
  // --------------------------------------------------------------------------
  // 'never' = URL bersih tanpa trailing slash (example.com/about bukan /about/)
  // Penting untuk SEO agar tidak ada duplicate content.
  trailingSlash: 'never',

  // --------------------------------------------------------------------------
  // PREFETCH
  // --------------------------------------------------------------------------
  // Preload halaman saat user hover link — meningkatkan perceived speed.
  prefetch: {
    defaultStrategy: 'hover',    // Prefetch saat mouse hover
    prefetchAll: false,           // Hanya prefetch link yang visible
  },

  // --------------------------------------------------------------------------
  // IMAGE OPTIMIZATION
  // --------------------------------------------------------------------------
  // Astro otomatis mengoptimasi gambar (resize, format WebP/AVIF, lazy load)
  image: {
    // Domain eksternal yang diizinkan untuk optimasi gambar
    // Tambahkan domain CDN atau API gambar kamu di sini
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // VITE PLUGINS
  // --------------------------------------------------------------------------
  // Tailwind CSS v4 dikonfigurasi sebagai Vite plugin (bukan Astro integration)
  vite: {
    plugins: [tailwindcss()],
  },

  // --------------------------------------------------------------------------
  // INTEGRATIONS
  // --------------------------------------------------------------------------
  // Plugin-plugin Astro yang menambah fitur ke website.
  integrations: [
    // Sitemap: Auto-generate sitemap.xml saat build
    // Google Search Console membutuhkan ini untuk index halaman
    sitemap({
      // Halaman yang TIDAK mau dimasukkan ke sitemap
      filter: (page) => !page.includes('/api/'),
    }),

    // Robots.txt: Auto-generate file robots.txt
    // Mengatur bot mana yang boleh crawl halaman apa
    robotsTxt({
      policy: [
        {
          userAgent: '*',           // Semua bot
          allow: '/',               // Boleh crawl semua halaman
          disallow: ['/api/'],      // Kecuali API endpoints
        },
      ],
      sitemap: true,                // Tambahkan link sitemap di robots.txt
    }),
  ],
});
