import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    // Specify API version
    apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
    try {
        const { items } = await request.json();
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // Developer experience: smoothly fallback to a simulated success if env variable is missing
        if (!process.env.STRIPE_SECRET_KEY) {
            console.log("No STRIPE_SECRET_KEY detected. Simulating a successful backend checkout for testing.");
            await new Promise((resolve) => setTimeout(resolve, 800)); // fake network delay
            return NextResponse.json({ url: `${origin}/success` });
        }

        // Real Stripe Session configuration
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${item.name} (${item.size})`,
                        description: item.customizations || 'Standard order',
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/canceled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
