// File: app/api/guests/route.ts

import { fetchGuests } from '@/app/lib/data'; // Uses a path alias to find the data file
import { NextResponse } from 'next/server';

// This line tells Vercel to always run this function dynamically, never cache it.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Call the function that gets data from the database.
    const guests = await fetchGuests();
    // 2. Send the data back as a successful JSON response.
    return NextResponse.json(guests);
  } catch (error) {
    // 3. If anything goes wrong, send back a 500 error.
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 });
  }
}
