import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Log to server console to mimic database storage for pre-orders
        console.log('--- NEW COFFEE PRE-ORDER ---');
        console.log(`Name: ${body.name}`);
        console.log(`Email: ${body.email}`);
        console.log(`Cake: ${body.cake}`);
        console.log(`Pickup: ${body.pickupTime}`);
        console.log(`Customizations: ${body.customizations || 'None'}`);
        console.log('----------------------------');

        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json(
            { success: true, message: 'Order successfully recorded' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to process order' },
            { status: 500 }
        );
    }
}
