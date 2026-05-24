import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Log to server console to mimic database storage
        console.log('--- NEW CONTACT INQUIRY ---');
        console.log(`Name: ${body.firstName} ${body.lastName}`);
        console.log(`Email: ${body.email}`);
        console.log(`Message: ${body.message}`);
        console.log('---------------------------');

        // Added artificial delay to simulate backend processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json(
            { success: true, message: 'Message successfully received' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
