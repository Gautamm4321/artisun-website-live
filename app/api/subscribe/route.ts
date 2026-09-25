import { handleSubscribe } from '@/lib/subscribe-handler';

// POST /api/subscribe — signup popup + footer newsletter.
// Always runs on the server (Node runtime) so Shopify Admin credentials stay private.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return handleSubscribe(req);
}
