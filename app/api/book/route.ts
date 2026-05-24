import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Log to server console to mimic database storage for booking reservations
        console.log('--- NEW TABLE RESERVATION ---');
        console.log(`Name: ${body.name}`);
        console.log(`Email: ${body.email}`);
        console.log(`Date: ${body.date} at ${body.time}`);
        console.log(`Guests: ${body.guests}`);
        console.log(`Special Requests: ${body.requests || 'None'}`);
        console.log('-----------------------------');

        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json(
            { success: true, message: 'Table reservation recorded' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to process reservation' },
            { status: 500 }
        );
    }
}
