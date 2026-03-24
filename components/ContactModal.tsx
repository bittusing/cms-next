'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]">
      <button
        className="absolute inset-0 bg-black/60 z-0"
        aria-label="Close contact modal"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative z-10 h-full w-full flex items-center justify-end p-0 sm:p-6">
        <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-md bg-white sm:rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="min-w-0">
              <div className="text-accent text-sm font-semibold tracking-wider uppercase">
                Get in Touch
              </div>
              <div className="text-gray-900 font-bold text-lg">Start your project</div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <ContactForm onSuccess={() => setIsOpen(false)} showMessageField={false} compact={true} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

