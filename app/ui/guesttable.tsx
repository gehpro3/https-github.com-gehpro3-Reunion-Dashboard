// File: app/ui/guesttable.tsx

'use client';

import { deleteGuest } from '../lib/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

type Guest = { id: string; name: string; email: string; created_at: string; };

// This is the dedicated component for the delete button.
function DeleteGuestForm({ guestId }: { guestId: string }) {
  const initialState = { message: '', success: false };
  const [state, dispatch] = useFormState(deleteGuest, initialState);

  // THIS IS THE FIX: We now check if 'state' exists before using it.
  useEffect(() => {
    // Only show a toast if the state exists, has a message, and was NOT successful.
    // On success, the page will redirect, so we don't need a toast.
    if (state && state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const handleDelete = (event: React.MouseEvent<HTMLFormElement>) => {
    if (!window.confirm('Are you sure you want to delete this guest?')) {
      event.preventDefault();
    }
  };

  return (
    // The form now calls the confirmation handler on submit.
    <form action={dispatch} onSubmit={handleDelete}>
      <input type="hidden" name="id" value={guestId} />
      <button type="submit" className="text-red-500 hover:text-red-400">
        Delete
      </button>
    </form>
  );
}

// This is your main table component.
// It is now much simpler.
type GuestTableProps = {
  guests: Guest[];
  onEditGuest: (id: string) => void;
};

export default function GuestTable({ guests, onEditGuest }: GuestTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Guest&apos;s Email</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {guests.length === 0 ? (
            <tr><td colSpan={3} className="text-center py-4 text-gray-400">No guests found.</td></tr>
          ) : (
            guests.map((guest) => (
              <tr key={guest.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{guest.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{guest.email}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <div className="flex justify-end space-x-4">
                    <button onClick={() => onEditGuest(guest.id)} className="text-indigo-400 hover:text-indigo-300">
                      Edit
                    </button>
                    {/* We now use our new, self-contained, and resilient DeleteGuestForm */}
                    <DeleteGuestForm guestId={guest.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
