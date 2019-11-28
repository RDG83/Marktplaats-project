const express = require("express");
const router = express.Router({ mergeParams: true });

// OUTE TO PAYMENT FORM
router.get("/", function (req, res)
{
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require('stripe')('sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh');

    stripe.charges.create
        ({
            amount: 2,
            currency: 'eur',
            source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
            payment_method_types: ['ideal']
        }, function (err, charge)
        {
            // asynchronously called
        });
    res.render("payment/test");
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