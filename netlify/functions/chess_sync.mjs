import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-teacher-passkey',
      },
    });
  }

  let store;
  try {
    store = getStore('meoncross_chess');
  } catch (e) {
    console.warn('Could not initialize Netlify Blobs store:', e.message);
  }

  // GET: Pupils and teachers fetch the latest live session state
  if (req.method === 'GET') {
    try {
      let data = null;
      if (store) {
        data = await store.get('live_session', { type: 'json' });
      }
      return new Response(JSON.stringify(data || null), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // POST: Only teachers with the valid passkey can broadcast updates
  if (req.method === 'POST') {
    try {
      const passkey = (req.headers.get('x-teacher-passkey') || '').trim().toLowerCase();
      const validPasskeys = ['drake.30!', 'drake.30'];
      if (!validPasskeys.includes(passkey)) {
        return new Response(JSON.stringify({ error: 'Unauthorized teacher passkey' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const payload = await req.json();
      const stateToStore = {
        ...payload,
        syncedAt: Date.now(),
      };

      if (store) {
        await store.setJSON('live_session', stateToStore);
      }

      return new Response(JSON.stringify({ success: true, syncedAt: stateToStore.syncedAt }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
};
