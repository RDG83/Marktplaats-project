const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const storage = multer.diskStorage;

// Declare Stripe Payment Public and Private Keys
const stripePublicKey = "pk_test_nGMHwCRhhiEskjG9nbZ8dXv000GNF0HPDN";
const stripeSecretKey = "sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh";

// Stripe Payment requirement with secret key
const stripe = require('stripe')(stripeSecretKey);

router.get("/", (req, res) =>
{
    res.render("stripe/index");
});

router.get("/complete", (req, res) =>
{
    res.render("stripe/complete");
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
    console.log("Create Payment-intent POST route wordt aangetikt");
    const { items, currency } = req.body;

    // Create a PaymentIntent with the order amount and currency
    // Set payment_method_types to the set of PaymentMethods you want to accept
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 200,
        currency: "eur",
        payment_method_types: ["ideal"]
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