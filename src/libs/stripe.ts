import Stripe from 'stripe';

import { stripe as stripeConfig } from './env';

const stripe = new Stripe(stripeConfig.apiKey, {
  // @ts-ignore
  apiVersion: '2022-11-15',
  typescript: true
});

export default stripe;
