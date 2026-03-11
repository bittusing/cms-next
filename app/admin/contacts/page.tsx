'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaTrash } from 'react-icons/fa';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'PATCH' });
      fetchContacts();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact: any) => (
              <div
                key={contact._id}
                className={`bg-white rounded-lg shadow p-6 ${
                  !contact.isRead ? 'border-l-4 border-accent' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-600">{contact.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!contact.isRead && (
                      <button
                        onClick={() => markAsRead(contact._id)}
                        className="text-sm bg-accent text-white px-3 py-1 rounded hover:bg-opacity-90"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{contact.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
