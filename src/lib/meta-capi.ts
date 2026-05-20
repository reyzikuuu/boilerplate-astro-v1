// =============================================================================
// META CONVERSION API (CAPI) — Server-Side Helper
// =============================================================================
// File ini berisi fungsi untuk mengirim event ke Meta Conversions API.
// CAPI adalah pelengkap Meta Pixel — mengirim data dari SERVER, bukan browser.
//
// KENAPA PERLU CAPI?
// 1. Browser blocking (iOS 14+, ad blockers) tidak bisa blokir server-side
// 2. Data lebih akurat karena langsung dari server
// 3. Event Match Quality (EMQ) lebih tinggi
// 4. Meta Ads optimization jadi lebih baik
//
// CARA KERJA:
// Browser → /api/meta-capi (Astro endpoint) → Meta Graph API
//
// REFERENSI:
// https://developers.facebook.com/docs/marketing-api/conversions-api
// =============================================================================

// ---------------------------------------------------------------------------
// TYPES — Definisi tipe data untuk Conversion API
// ---------------------------------------------------------------------------

/** Data user yang dikirim untuk matching (harus di-hash SHA-256) */
interface UserData {
  /** IP address pengunjung (dari request header) */
  client_ip_address?: string;
  /** User agent browser */
  client_user_agent?: string;
  /** Facebook browser ID (dari cookie _fbp) */
  fbp?: string;
  /** Facebook click ID (dari cookie _fbc atau URL ?fbclid=) */
  fbc?: string;
  /** External ID unik (opsional) */
  external_id?: string;
}

/** Custom data untuk event spesifik */
interface CustomData {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

/** Struktur satu event untuk dikirim ke Meta */
interface ServerEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: 'website';
  user_data: UserData;
  custom_data?: CustomData;
}

/** Payload yang dikirim ke endpoint /api/meta-capi dari browser */
export interface CAPIPayload {
  eventName: string;
  eventId: string;
  eventData?: Record<string, unknown>;
  sourceUrl: string;
  userAgent: string;
  fbp?: string | null;
  fbc?: string | null;
}

// ---------------------------------------------------------------------------
// FUNGSI UTAMA: Kirim Event ke Meta CAPI
// ---------------------------------------------------------------------------

/**
 * sendServerEvent() — Kirim event ke Meta Conversions API
 *
 * Fungsi ini dipanggil dari API endpoint (/api/meta-capi)
 * untuk mengirim data event ke Meta secara server-side.
 *
 * @param payload - Data event dari browser
 * @param clientIp - IP address pengunjung (dari request header)
 * @returns Response dari Meta Graph API
 */
export async function sendServerEvent(
  payload: CAPIPayload,
  clientIp: string
): Promise<{ success: boolean; error?: string }> {
  // --- Ambil credentials dari environment variables ---
  const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
  const accessToken = import.meta.env.META_CAPI_ACCESS_TOKEN;

  // Validasi: Pastikan credentials tersedia
  if (!pixelId || !accessToken) {
    console.warn(
      '[Meta CAPI] ⚠️ Missing PIXEL_ID or ACCESS_TOKEN. Event not sent.'
    );
    return { success: false, error: 'Missing credentials' };
  }

  // --- Bangun event object sesuai format Meta API ---
  const serverEvent: ServerEvent = {
    // Nama event — HARUS SAMA persis dengan yang dikirim Pixel (case-sensitive!)
    event_name: payload.eventName,

    // Waktu event (Unix timestamp dalam detik)
    event_time: Math.floor(Date.now() / 1000),

    // Event ID — HARUS SAMA dengan yang dikirim Pixel untuk deduplication!
    event_id: payload.eventId,

    // URL halaman tempat event terjadi
    event_source_url: payload.sourceUrl,

    // Sumber aksi — selalu 'website' untuk web events
    action_source: 'website',

    // Data user — untuk Event Match Quality (EMQ)
    // Semakin banyak data, semakin baik matching Meta
    user_data: {
      client_ip_address: clientIp,
      client_user_agent: payload.userAgent,
      ...(payload.fbp && { fbp: payload.fbp }),
      ...(payload.fbc && { fbc: payload.fbc }),
    },
  };

  // Tambahkan custom data jika ada (content_name, value, dll)
  if (payload.eventData && Object.keys(payload.eventData).length > 0) {
    serverEvent.custom_data = payload.eventData as CustomData;
  }

  // --- Kirim ke Meta Graph API ---
  // Endpoint: https://graph.facebook.com/v22.0/{pixel_id}/events
  const graphApiUrl = `https://graph.facebook.com/v22.0/${pixelId}/events`;

  // Body request sesuai format Meta API
  const requestBody: Record<string, unknown> = {
    data: [serverEvent],
    access_token: accessToken,
  };

  // Tambahkan test_event_code jika sedang testing
  // (hapus setelah production!)
  const testEventCode = import.meta.env.META_TEST_EVENT_CODE;
  if (testEventCode) {
    requestBody.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(graphApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI] ❌ Error:', JSON.stringify(result));
      return {
        success: false,
        error: result.error?.message || 'Unknown API error',
      };
    }

    // Sukses! Log untuk debugging
    console.log(
      `[Meta CAPI] ✅ Event "${payload.eventName}" sent (ID: ${payload.eventId})`
    );
    return { success: true };
  } catch (error) {
    console.error('[Meta CAPI] ❌ Network error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
