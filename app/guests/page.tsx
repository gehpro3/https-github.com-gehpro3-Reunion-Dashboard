// File: app/guests/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import GuestTable from '../ui/guesttable';
import AddGuestModal from '../ui/AddGuestModal';
import EditGuestModal from '../ui/EditGuestModal';
import { fetchGuests } from '../lib/data';

type Guest = { id: string; name: string; email: string; created_at: string; };

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [addModalVersion, setAddModalVersion] = useState(0);

  const loadGuests = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/guests');
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
      const fetchedGuests = await response.json();
      setGuests(fetchedGuests);
    } catch (error) {
      console.error("Failed to load guests:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadGuests(); }, [loadGuests]);

  const handleEditGuest = (guestId: string) => {
    const guestToEdit = guests.find(g => g.id === guestId);
    if (guestToEdit) setEditingGuest(guestToEdit);
  };

  const handleGuestAdded = (newGuest: Guest) => {
    setGuests(currentGuests => [newGuest, ...currentGuests]);
  };

  const openAddModal = () => {
    setAddModalVersion(p => p + 1);
    setIsAddModalOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Guest List</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
        >
          Add New Guest
        </button>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading guests...</p>
        ) : (
          <GuestTable
            guests={guests}
            onEditGuest={handleEditGuest}
            onGuestDeleted={loadGuests}
          />
        )}
      </div>

      <AddGuestModal
        key={`add-${addModalVersion}`}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onGuestAdded={handleGuestAdded}
      />

      <EditGuestModal
        key={editingGuest ? `edit-${editingGuest.id}` : 'edit-modal-closed'}
        isOpen={!!editingGuest}
        onClose={() => setEditingGuest(null)}
        onGuestUpdated={loadGuests}
        guest={editingGuest}
      />
    </div>
  );
}
