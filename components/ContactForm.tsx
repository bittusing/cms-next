'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const SERVICE_SEPARATOR = '::';

// This must match the options you want to show in the single select dropdown.
const serviceCategories: Record<string, string[]> = {
  'Interior Designer': ['2D And 3D Interior', 'Residential Interior', 'Commercial Interior'],
  'Residential Interior': ['Bedroom Interior', 'Modular Kitchen', 'Living Room', 'Dining Room', 'Kids Room'],
  'Commercial Interior': ['Office Interior'],
};

export type ContactFormPayload = {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  subService?: string;
  message?: string;
};

export default function ContactForm({
  onSuccess,
  showMessageField = true,
  compact = false,
}: {
  onSuccess?: () => void;
  showMessageField?: boolean;
  compact?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subService: '',
    selectedService: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleServiceChange = (value: string) => {
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        selectedService: '',
        service: '',
        subService: '',
      }));
      return;
    }

    const [service, subService] = value.split(SERVICE_SEPARATOR);
    setFormData((prev) => ({
      ...prev,
      selectedService: value,
      service,
      subService: subService || '',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const payload: ContactFormPayload = {
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        service: formData.service || undefined,
        subService: formData.subService || undefined,
        message: formData.message || undefined,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send message');
        setStatus('error');
        return;
      }

      await res.json();
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        subService: '',
        selectedService: '',
        message: '',
      });
      onSuccess?.();
    } catch (error) {
      setErrorMessage('Failed to send message');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          Select a service *
        </label>
        <select
          id="service"
          required
          value={formData.selectedService}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">Select a service</option>
          {Object.entries(serviceCategories).map(([category, services]) => (
            <optgroup key={category} label={category}>
              {services.map((specificService) => (
                <option
                  key={`${category}${SERVICE_SEPARATOR}${specificService}`}
                  value={`${category}${SERVICE_SEPARATOR}${specificService}`}
                >
                  {specificService}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {showMessageField && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Tell us about your project requirements..."
          />
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full bg-accent text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 transform hover:-translate-y-1 hover:shadow-lg ${
          compact ? 'py-2.5' : 'py-3'
        }`}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

