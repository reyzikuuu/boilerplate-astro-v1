// =============================================================================
// SITE CONFIGURATION — Pusat Data Website
// =============================================================================
// Semua informasi tentang website dikumpulkan di sini.
// Ini memudahkan kamu mengubah nama, deskripsi, atau link tanpa harus
// mencari-cari di banyak file.
//
// Cara pakai: import { siteConfig } from '@data/siteConfig';
// =============================================================================

export const siteConfig = {
  // ---------------------------------------------------------------------------
  // INFO DASAR WEBSITE
  // ---------------------------------------------------------------------------
  /** Nama website / brand kamu */
  name: 'Bradwear',

  /** Tagline singkat (muncul setelah nama di title tag) */
  tagline: 'Premium Quality Fashion',

  /** Deskripsi website untuk SEO (120-160 karakter ideal) */
  description:
    'Tingkatkan citra perusahaan dengan kemeja custom bordir 3D. Material super premium, melayani pengiriman seluruh Indonesia untuk instansi & swasta.',

  /** URL production website (GANTI saat deploy!) */
  siteUrl: 'https://bradwear-lp.pages.dev',

  /** Bahasa utama website (untuk SEO & accessibility) */
  locale: 'id_ID',
  language: 'id',

  // ---------------------------------------------------------------------------
  // SEO & SOCIAL MEDIA
  // ---------------------------------------------------------------------------
  /** Gambar default untuk social sharing (OG Image) */
  ogImage: '/og-image.webp',

  /** Twitter/X handle (tanpa @) — opsional */
  twitterHandle: '',

  /** Keywords utama untuk SEO (pisahkan dengan koma) */
  keywords: 'fashion, premium, clothing, style, bradwear',

  // ---------------------------------------------------------------------------
  // KONTAK & WHATSAPP
  // ---------------------------------------------------------------------------
  /** Nomor WhatsApp (format internasional tanpa +) */
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '6281234567890',

  /** Pesan default WhatsApp */
  whatsappMessage:
    import.meta.env.PUBLIC_WHATSAPP_MESSAGE ||
    'Halo, saya tertarik dengan produk Bradwear!',

  // ---------------------------------------------------------------------------
  // META ADS / FACEBOOK PIXEL
  // ---------------------------------------------------------------------------
  /** Meta Pixel ID — untuk tracking ViewContent & Lead events */
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || '',

  // ---------------------------------------------------------------------------
  // SOCIAL LINKS
  // ---------------------------------------------------------------------------
  socials: {
    instagram: 'https://instagram.com/bradwear',
    facebook: 'https://facebook.com/bradwear',
    tiktok: 'https://tiktok.com/@bradwear',
    whatsapp: '', // Akan di-generate otomatis dari whatsappNumber
  },
} as const;

// ---------------------------------------------------------------------------
// HELPER: Generate WhatsApp URL
// ---------------------------------------------------------------------------
// Fungsi ini membuat link WhatsApp dengan pesan yang sudah di-encode.
// Cara pakai: <a href={getWhatsAppUrl()}>Chat via WhatsApp</a>
// ---------------------------------------------------------------------------
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || siteConfig.whatsappMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Type export untuk TypeScript
export type SiteConfig = typeof siteConfig;
