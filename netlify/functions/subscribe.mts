/**
 * POST /.netlify/functions/subscribe — legacy endpoint, kept so old builds and
 * any hard-coded NEXT_PUBLIC_SUBSCRIBE_ENDPOINT keep working on Netlify.
 * The site now posts to /api/subscribe (app/api/subscribe/route.ts), which
 * works on both Vercel and Netlify. Logic lives in lib/subscribe-handler.ts.
 */
import { handleSubscribe } from '../../lib/subscribe-handler';

export default handleSubscribe;
