import { makeThreat, threatSpace } from '../public/grammar.js';

const MAX_N = 20;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export function onRequestGet({ request }) {
  const params = new URL(request.url).searchParams;

  const requested = Number.parseInt(params.get('n') ?? '1', 10);
  const n = Number.isNaN(requested) ? 1 : Math.min(Math.max(requested, 1), MAX_N);

  const threats = Array.from({ length: n }, () => makeThreat());

  const headers = {
    ...CORS,
    // Every call should churn something new.
    'Cache-Control': 'no-store',
  };

  if (params.get('format') === 'text') {
    return new Response(threats.join('\n') + '\n', {
      headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const body = n === 1
    ? { threat: threats[0], source: 'makeubutr.com' }
    : { threats, source: 'makeubutr.com' };
  body.space = threatSpace();

  return new Response(JSON.stringify(body, null, 2) + '\n', {
    headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
  });
}
