const apiPublicKey = "pk_test_nGMHwCRhhiEskjG9nbZ8dXv000GNF0HPDN";
const apiPrivateKey = "sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh";
const paymentProvider = "Stripe";
const stripe = require('stripe')('sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys


(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2, //hardcoded user story value for now
    currency: 'eur',
    payment_method_types: ['ideal'],
  });
})();