// =============================================================================
// ENVIRONMENT TYPE DECLARATIONS
// =============================================================================
// File ini memberikan TypeScript info tentang tipe data environment variables
// dan fungsi global yang tersedia di browser.
//
// JANGAN HAPUS FILE INI! TypeScript butuh ini untuk autocomplete & type-check.
// =============================================================================

/// <reference types="astro/client" />

// ---------------------------------------------------------------------------
// ENVIRONMENT VARIABLES
// ---------------------------------------------------------------------------
// Deklarasi tipe untuk semua env variables yang dipakai di project ini.
// Ini membantu TypeScript memberi autocomplete & warning jika ada yang missing.
interface ImportMetaEnv {
  /** URL production website */
  readonly SITE_URL: string;

  /** Meta Pixel ID (accessible di browser karena PUBLIC_ prefix) */
  readonly PUBLIC_META_PIXEL_ID: string;

  /** Meta CAPI Access Token (server-only, RAHASIA!) */
  readonly META_CAPI_ACCESS_TOKEN: string;

  /** Meta Test Event Code (opsional, untuk testing) */
  readonly META_TEST_EVENT_CODE: string;

  /** Nomor WhatsApp (accessible di browser) */
  readonly PUBLIC_WHATSAPP_NUMBER: string;

  /** Pesan default WhatsApp (accessible di browser) */
  readonly PUBLIC_WHATSAPP_MESSAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ---------------------------------------------------------------------------
// GLOBAL WINDOW DECLARATIONS
// ---------------------------------------------------------------------------
// Deklarasi fungsi global yang ditambahkan oleh script kita.
// Ini mencegah TypeScript error saat memanggil window.trackMetaEvent()
interface Window {
  /**
   * Track Meta event (Pixel + Conversion API)
   * @param eventName - Nama event Meta ('ViewContent', 'Lead', dll)
   * @param eventData - Data tambahan untuk event
   */
  trackMetaEvent: (eventName: string, eventData?: Record<string, unknown>) => void;

  /** Facebook Pixel function */
  fbq: (...args: unknown[]) => void;
}
