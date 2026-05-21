// =============================================================================
// CLOUDFLARE PAGES FUNCTION: /api/meta-capi
// =============================================================================
// Endpoint ini menerima event dari browser (client-side) dan meneruskannya
// ke Meta Conversions API (server-side).
//
// File ini berada di folder /functions/ agar dikenali oleh Cloudflare Pages
// sebagai serverless function (bukan bagian dari Astro).
//
// URL: POST /api/meta-capi
// =============================================================================

interface CAPIPayload {
  eventName: string;
  eventId: string;
  eventData?: Record<string, unknown>;
  sourceUrl: string;
  userAgent: string;
  fbp?: string | null;
  fbc?: string | null;
}

interface Env {
  PUBLIC_META_PIXEL_ID: string;
  META_CAPI_ACCESS_TOKEN: string;
  META_TEST_EVENT_CODE?: string;
}

// Hanya terima POST request
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // --- Parse body request ---
    const payload: CAPIPayload = await request.json();

    // --- Validasi: pastikan ada event name dan event ID ---
    if (!payload.eventName || !payload.eventId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing eventName or eventId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Ambil credentials dari environment variables ---
    const pixelId = env.PUBLIC_META_PIXEL_ID;
    const accessToken = env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      console.warn('[Meta CAPI] ⚠️ Missing PIXEL_ID or ACCESS_TOKEN.');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing credentials' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Ambil IP address pengunjung ---
    const clientIp =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
      request.headers.get('X-Real-IP') ||
      '0.0.0.0';

    // --- Bangun event object sesuai format Meta API ---
    const serverEvent: Record<string, unknown> = {
      event_name: payload.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: payload.eventId,
      event_source_url: payload.sourceUrl,
      action_source: 'website',
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: payload.userAgent,
        ...(payload.fbp && { fbp: payload.fbp }),
        ...(payload.fbc && { fbc: payload.fbc }),
      },
    };

    if (payload.eventData && Object.keys(payload.eventData).length > 0) {
      serverEvent.custom_data = payload.eventData;
    }

    // --- Kirim ke Meta Graph API ---
    const graphApiUrl = `https://graph.facebook.com/v22.0/${pixelId}/events`;
    const requestBody: Record<string, unknown> = {
      data: [serverEvent],
      access_token: accessToken,
    };

    const testEventCode = env.META_TEST_EVENT_CODE;
    if (testEventCode) {
      requestBody.test_event_code = testEventCode;
    }

    const response = await fetch(graphApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI] ❌ Error:', JSON.stringify(result));
      return new Response(
        JSON.stringify({ success: false, error: (result as any).error?.message || 'API error' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
      );
    }

    console.log(`[Meta CAPI] ✅ Event "${payload.eventName}" sent (ID: ${payload.eventId})`);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('[Meta CAPI] ❌ Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Tolak method selain POST
export const onRequest: PagesFunction = async () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
};
