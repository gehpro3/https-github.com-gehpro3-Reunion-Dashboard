// File: app/lib/actions.ts
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
// NO LONGER NEED 'redirect' here
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a name.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  date: z.string(),
});
const CreateGuest = FormSchema.omit({ id: true, date: true });

// CREATE GUEST (Updated to match your summary)
export async function createGuest(prevState: any, formData: FormData) {
  const validatedFields = CreateGuest.safeParse({ name: formData.get('name'), email: formData.get('email') });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Missing Fields.', success: false };
  }
  const { name, email } = validatedFields.data;
  const createdAt = new Date().toISOString();
  try {
    // We use RETURNING * to get the new guest object back from the database
    const { rows } = await sql`
      INSERT INTO guests (name, email, created_at)
      VALUES (${name}, ${email}, ${createdAt})
      RETURNING *
    `;
    revalidatePath('/guests');
    // On success, we return the new guest object
    return { message: 'Successfully added guest!', success: true, errors: {}, newGuest: rows[0] };
  } catch (error) {
    console.error('Database Create Error:', error);
    return { message: 'Database Error: Failed to Create Guest.', success: false, errors: {} };
  }
  // NO redirect('/guests');
}

// UPDATE GUEST (Updated to match your summary)
export async function updateGuest(prevState: any, formData: FormData) {
  const validatedFields = CreateGuest.safeParse({ name: formData.get('name'), email: formData.get('email') });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Validation Error.', success: false };
  }
  const { name, email } = validatedFields.data;
  const id = formData.get('id')?.toString();
  if (!id) return { message: 'Guest ID is missing.', success: false, errors: {} };
  try {
    // We use RETURNING * here as well to get the updated guest object
    const { rows } = await sql`
      UPDATE guests
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
      RETURNING *
    `;
    revalidatePath('/guests');
    // On success, we return the updated guest object
    return { message: 'Successfully updated guest!', success: true, errors: {}, updatedGuest: rows[0] };
  } catch (error) {
    console.error('Database Update Error:', error);
    return { message: 'Database Error: Failed to Update Guest.', success: false, errors: {} };
  }
  // NO redirect('/guests');
}

// DELETE GUEST (This one can still use a simple redirect for now, or be updated later)
export async function deleteGuest(prevState: any, formData: FormData) {
  const id = formData.get('id')?.toString();
  try {
    if (!id) throw new Error('Guest ID is missing');
    await sql`DELETE FROM guests WHERE id = ${id}`;
    revalidatePath('/guests');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Guest.' };
  }
  redirect('/guests');
}
