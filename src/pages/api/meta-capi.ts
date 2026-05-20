// =============================================================================
// API ENDPOINT: /api/meta-capi
// =============================================================================
// Endpoint ini menerima event dari browser (client-side) dan meneruskannya
// ke Meta Conversions API (server-side).
//
// ALUR DATA:
// 1. User mengunjungi halaman / klik CTA
// 2. Browser kirim event ke Meta Pixel (fbq) + ke endpoint ini
// 3. Endpoint ini kirim event ke Meta Graph API
// 4. Meta deduplikasi berdasarkan event_id yang sama
//
// URL: POST /api/meta-capi
// Body: JSON (lihat CAPIPayload di meta-capi.ts)
//
// SECURITY:
// - Access token TIDAK terekspos ke browser (disimpan di server env)
// - Endpoint ini hanya menerima POST request
// =============================================================================

import type { APIRoute } from 'astro';
import { sendServerEvent, type CAPIPayload } from '@lib/meta-capi';

/**
 * POST /api/meta-capi
 *
 * Menerima event tracking dari browser dan kirim ke Meta CAPI.
 * Dipanggil oleh fungsi window.trackMetaEvent() di MetaPixel.astro
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // --- Parse body request ---
    const payload: CAPIPayload = await request.json();

    // --- Validasi: pastikan ada event name dan event ID ---
    if (!payload.eventName || !payload.eventId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing eventName or eventId',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // --- Ambil IP address pengunjung ---
    // Cloudflare menyediakan IP melalui header CF-Connecting-IP
    // Fallback ke X-Forwarded-For dan X-Real-IP
    const clientIp =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
      request.headers.get('X-Real-IP') ||
      '0.0.0.0';

    // --- Kirim event ke Meta Conversions API ---
    const result = await sendServerEvent(payload, clientIp);

    // --- Response ke browser ---
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: {
        'Content-Type': 'application/json',
        // Prevent caching API responses
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    // Error parsing JSON atau error lainnya
    console.error('[API /meta-capi] ❌ Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// --- Tolak method selain POST ---
export const ALL: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
