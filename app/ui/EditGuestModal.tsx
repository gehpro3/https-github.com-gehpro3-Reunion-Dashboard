// File: app/ui/EditGuestModal.tsx
'use client';
import { updateGuest } from '../lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

// ... (SubmitButton and types are the same)
export default function EditGuestModal({ isOpen, onClose, onGuestUpdated, guest }: any) {
  const initialState = { message: '', errors: {}, success: false, updatedGuest: null };
  const [state, dispatch] = useFormState(updateGuest, initialState);

  useEffect(() => {
    if (state.success && state.updatedGuest) {
      toast.success(state.message || 'Guest updated!');
      onGuestUpdated(state.updatedGuest); // <-- This now works
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, onClose, onGuestUpdated]);
  // ... (rest of the component is the same)
}
