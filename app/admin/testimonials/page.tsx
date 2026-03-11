'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Testimonials</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial: any) => (
              <div key={testimonial._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {testimonial.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{testimonial.name}</h3>
                      <p className="text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
