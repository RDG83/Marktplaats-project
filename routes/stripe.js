const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });

// Declare Stripe Payment Public and Private Keys
const stripePublicKey = "pk_test_nGMHwCRhhiEskjG9nbZ8dXv000GNF0HPDN";
const stripeSecretKey = "sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh";

// Stripe Payment requirement with secret key
const stripe = require('stripe')(stripeSecretKey);


// STRIPE WEBHOOK ENDPOINT
router.post('/test', (req, res) =>
{
    // Logic if payment succeeded
    if (req.body.type == "payment_intent.succeeded")
    {
        // Retrieve productid
        Product.findById(req.body.data.object.metadata.productId, function (error, foundProduct)
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                foundProduct.premium = true;
                foundProduct.save();
            }
        });
    }
    else if (req.body.type == "payment_intent.payment_failed")
    {
        // Logic if payment failed
    }
});

router.get("/payment-intent", async (req, res) =>
{
    const { paymentIntentId } = req.query;

    // Display the resulting PaymentIntent in the complete.html view
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("Payment-intent route wordt aangetikt");
    res.send(paymentIntent);
});

router.post("/create-payment-intent", async (req, res) =>
{
    // Get values from client side json object
    let productId = req.body.productId;

    // Create a PaymentIntent with the order amount and currency
    // Set payment_method_types to the set of PaymentMethods you want to accept
    const paymentIntent = await stripe.paymentIntents.create
        ({
            amount: 200,
            currency: "eur",
            payment_method_types: ["ideal"],
            metadata: { "productId": productId }
        });
    // Send publishable key and PaymentIntent details to client
    res.send({
        publishableKey: stripePublicKey,
        clientSecret: paymentIntent.client_secret
    });
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks

module.exports = router;