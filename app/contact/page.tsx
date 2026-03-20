'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subService: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const serviceCategories = {
    'Interior Designer': [
      '2D And 3D Interior',
      'Residential Interior',
      'Commercial Interior'
    ],
    'Residential Interior': [
      'Bedroom Interior',
      'Modular Kitchen',
      'Living Room',
      'Dining Room',
      'Kids Room'
    ],
    'Commercial Interior': [
      'Office Interior'
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    console.log('Submitting form data:', formData); // Debug log

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        console.log('Contact created successfully:', result); // Debug log
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', subService: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send message');
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('Failed to send message');
      setStatus('error');
    }
  };

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contact Us
            </h1>
            <p 
              className="text-lg sm:text-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Let&apos;s discuss your next project
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div data-aos="fade-right" data-aos-delay="100">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-700 mb-8">
                  Have a project in mind? We&apos;d love to hear from you. Send us a message
                  and we&apos;ll respond as soon as possible.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-gray-600">info@urbandesignindia.com</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <p className="text-gray-600">+91 97111 48175</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Address</h3>
                    <p className="text-gray-600">A-135, GF Sunlight Colony-II, Ashram, New Delhi – 110014, India</p>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left" data-aos-delay="200">
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service Category *
                    </label>
                    <select
                      id="service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value, subService: '' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {Object.keys(serviceCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.service && (
                    <div>
                      <label htmlFor="subService" className="block text-sm font-medium mb-2">
                        Specific Service *
                      </label>
                      <select
                        id="subService"
                        required
                        value={formData.subService}
                        onChange={(e) => setFormData({ ...formData, subService: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="">Select specific service</option>
                        {serviceCategories[formData.service as keyof typeof serviceCategories]?.map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

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
                    className="w-full bg-accent text-white py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
