// File: app/ui/AddGuestModal.tsx
'use client';
import { createGuest } from '../lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useRef } from 'react';

// ... (SubmitButton is the same)
export default function AddGuestModal({ isOpen, onClose, onGuestAdded }: any) {
  const initialState = { message: '', errors: {}, success: false, newGuest: null };
  const [state, dispatch] = useFormState(createGuest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.newGuest) {
      toast.success(state.message || 'Guest added!');
      onGuestAdded(state.newGuest); // <-- This now works
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, onClose, onGuestAdded]);
  // ... (rest of the component is the same)
}
