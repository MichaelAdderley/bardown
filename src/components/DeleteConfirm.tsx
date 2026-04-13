'use client';

import { useState } from 'react';

interface DeleteConfirmProps {
  eventTitle: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteConfirm({
  eventTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCancel}
      />

      <div className="glass-strong relative w-full max-w-xs rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div className="mb-4 flex justify-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: 'var(--error-subtle)', boxShadow: '0 0 24px var(--error-subtle)' }}
          >
            <svg className="h-6 w-6" style={{ color: 'var(--error)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>

        <h3 className="mb-1 text-center text-base font-bold" style={{ color: 'var(--text-primary)' }}>
          Delete Event
        </h3>
        <p className="mb-5 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Are you sure you want to delete &ldquo;{eventTitle}&rdquo;? This action cannot be undone.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="glass-button flex-1 rounded-xl px-3 py-2.5 text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-50"
            style={{
              background: 'var(--error)',
              boxShadow: '0 0 20px var(--error-glow)',
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
