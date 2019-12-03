const express = require("express");
const router = express.Router({ mergeParams: true });

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh');

// OUTE TO PAYMENT FORM
router.get("/", (req, res) =>
{
    
        const paymentIntent = stripe.paymentIntents.create({
            amount: 1099,
            currency: 'eur',
            payment_method_types: ['ideal'],
        });

    res.send(paymentIntent);

    //res.render("payment/test");
});

router.post("/doen", function (req, res)
{
    try
    {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id
                })
            )
            .then(() => res.render("completed.html"))
            .catch(err => console.log(err));
    }
    catch (err)
    {
        res.send(err);
    }
});

module.exports = router;