const form = document.getElementById('payment-form');

form.addEventListener('submit', (event) =>
{
    event.preventDefault();

    // Redirects away from the client
    const { error } = await stripe.confirmIdealPayment(
        '{{PAYMENT_INTENT_CLIENT_SECRET}}',
        {
            payment_method:
            {
                ideal: idealBank,
            },
            return_url: 'https://your-website.com/checkout/complete',
        }
    );
});