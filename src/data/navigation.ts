// =============================================================================
// NAVIGATION DATA — Struktur Menu Navigasi
// =============================================================================
// Definisi semua link navigasi di sini.
// Dipisahkan dari komponen agar mudah diubah tanpa edit HTML.
//
// Cara pakai: import { mainNavLinks } from '@data/navigation';
// =============================================================================

/** Tipe untuk item navigasi */
export interface NavLink {
  /** Teks yang ditampilkan di menu */
  label: string;
  /** URL tujuan (bisa internal atau external) */
  href: string;
  /** Apakah link dibuka di tab baru? */
  external?: boolean;
  /** Icon name (opsional) */
  icon?: string;
}

// ---------------------------------------------------------------------------
// MAIN NAVIGATION — Menu utama di header
// ---------------------------------------------------------------------------
export const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Katalog', href: '/katalog' },
  { label: 'Tentang', href: '/#about' },
  { label: 'Kontak', href: '/#contact' },
];

// ---------------------------------------------------------------------------
// FOOTER NAVIGATION — Link di footer
// ---------------------------------------------------------------------------
export const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Kebijakan Privasi', href: '/privacy' },
  { label: 'Syarat & Ketentuan', href: '/terms' },
];

// ---------------------------------------------------------------------------
// SOCIAL LINKS — untuk footer & sharing
// ---------------------------------------------------------------------------
export const socialLinks: NavLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/bradwear', external: true },
  { label: 'Facebook', href: 'https://facebook.com/bradwear', external: true },
  { label: 'TikTok', href: 'https://tiktok.com/@bradwear', external: true },
];
