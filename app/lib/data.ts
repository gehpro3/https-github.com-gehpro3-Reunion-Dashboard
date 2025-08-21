// File: app/lib/data.ts
import { sql } from '@vercel/postgres';

export async function fetchGuests() {
  try {
    const data = await sql`SELECT * FROM guests ORDER BY created_at DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch guests.');
  }
}

export async function getTotalGuests() {
  try {
    const data = await sql`SELECT COUNT(*) FROM guests`;
    return data.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total guests.');
  }
}

export async function getGuestStats() {
  return { attending: '0', pending: '0' };
}
