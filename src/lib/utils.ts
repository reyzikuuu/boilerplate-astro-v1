// =============================================================================
// UTILITY FUNCTIONS — Fungsi Helper Umum
// =============================================================================
// Kumpulan fungsi yang sering dipakai di berbagai tempat.
//
// Cara pakai: import { cn, formatDate } from '@lib/utils';
// =============================================================================

/**
 * cn() — Class Name Merger
 * Menggabungkan beberapa class string, mengabaikan yang falsy.
 *
 * Contoh:
 * cn('text-lg', isActive && 'text-primary', 'font-bold')
 * // Jika isActive = true:  "text-lg text-primary font-bold"
 * // Jika isActive = false: "text-lg font-bold"
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * formatDate() — Format tanggal ke bahasa Indonesia
 *
 * Contoh: formatDate(new Date()) → "15 Mei 2026"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * slugify() — Ubah string menjadi URL-friendly slug
 *
 * Contoh: slugify("Produk Baru & Terkini!") → "produk-baru-terkini"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus karakter spesial
    .replace(/\s+/g, '-') // Ganti spasi dengan dash
    .replace(/-+/g, '-') // Hapus double dash
    .trim();
}

/**
 * truncate() — Potong string ke panjang tertentu
 *
 * Contoh: truncate("Kalimat yang sangat panjang sekali", 20) → "Kalimat yang sangat..."
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '...';
}

/**
 * sleep() — Delay execution (untuk animasi, loading, dll)
 *
 * Contoh: await sleep(1000) → tunggu 1 detik
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
