let memoryFallbackState = null;

const STRICT_SECURITY_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
  'Surrogate-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-teacher-passkey',
};

async function handleRequest(method, headers, body) {
  const getHeader = (name) => {
    if (!headers) return '';
    if (typeof headers.get === 'function') return headers.get(name) || '';
    return headers[name.toLowerCase()] || headers[name] || '';
  };

  // CORS preflight
  if (method === 'OPTIONS') {
    return {
      status: 204,
      headers: STRICT_SECURITY_HEADERS,
      body: '',
    };
  }

  let store = null;
  try {
    const { getStore } = await import('@netlify/blobs');
    store = getStore('meoncross_chess');
  } catch (e) {
    // Netlify Blobs not available or not configured; memory fallback will be used
  }

  if (method === 'GET') {
    let data = memoryFallbackState;
    if (store) {
      try {
        const blobData = await store.get('live_session', { type: 'json' });
        if (blobData) data = blobData;
      } catch (err) {
        console.warn('Blobs get error, using memory fallback:', err.message);
      }
    }

    // GDPR Sanitization check: Ensure no academic year or unsanitized fields leak
    if (data && Array.isArray(data.players)) {
      data.players.forEach((p) => {
        delete p.year;
      });
    }

    return {
      status: 200,
      headers: STRICT_SECURITY_HEADERS,
      body: JSON.stringify(data || null),
    };
  }

  if (method === 'POST') {
    const passkey = getHeader('x-teacher-passkey').trim().toLowerCase();
    const validPasskeys = ['drake.30!', 'drake.30'];
    if (!validPasskeys.includes(passkey)) {
      return {
        status: 401,
        headers: STRICT_SECURITY_HEADERS,
        body: JSON.stringify({ error: 'Unauthorized teacher passkey' }),
      };
    }

    let parsedPayload = {};
    try {
      parsedPayload = typeof body === 'string' ? JSON.parse(body) : body;
    } catch (e) {
      return {
        status: 400,
        headers: STRICT_SECURITY_HEADERS,
        body: JSON.stringify({ error: 'Invalid JSON body' }),
      };
    }

    // GDPR scrub on ingress: Strip any year field
    if (Array.isArray(parsedPayload.players)) {
      parsedPayload.players.forEach((p) => {
        delete p.year;
      });
    }

    const stateToStore = {
      ...parsedPayload,
      syncedAt: Date.now(),
    };

    memoryFallbackState = stateToStore;

    if (store) {
      try {
        await store.setJSON('live_session', stateToStore);
      } catch (err) {
        console.warn('Blobs set error, preserved in memory:', err.message);
      }
    }

    return {
      status: 200,
      headers: STRICT_SECURITY_HEADERS,
      body: JSON.stringify({ success: true, syncedAt: stateToStore.syncedAt }),
    };
  }

  return {
    status: 405,
    headers: STRICT_SECURITY_HEADERS,
    body: 'Method Not Allowed',
  };
}

// Modern Netlify Functions (v2 Web Request/Response API)
export default async (req, context) => {
  const method = req.method;
  const headers = req.headers;
  let body = null;
  if (method === 'POST') {
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }
  }

  const res = await handleRequest(method, headers, body);
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
};

// Classic Netlify Functions (v1 AWS Lambda style)
export const handler = async (event, context) => {
  const method = event.httpMethod;
  const headers = event.headers;
  const body = event.body;

  const res = await handleRequest(method, headers, body);
  return {
    statusCode: res.status,
    headers: res.headers,
    body: res.body,
  };
};
