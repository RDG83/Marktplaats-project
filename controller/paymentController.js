const apiPublicKey = "pk_test_nGMHwCRhhiEskjG9nbZ8dXv000GNF0HPDN";
const apiPrivateKey = "sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh";
const paymentProvider = "Stripe";
const stripe = require('stripe')('sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh");

stripe.customers.createSource(
  'cus_GGcoX1xfjRF5y4',
  {
    source: 'src_1Fk5ZJHMcYHPqzMlfX5lBTAM',
  },
  function (err, source)
  {
    // asynchronously called
  }
);