'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';

interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export default function TestFeaturesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, faqsRes, themeRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/faqs'),
          fetch('/api/theme-settings')
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        if (faqsRes.ok) {
          const faqsData = await faqsRes.json();
          setFaqs(faqsData);
        }

        if (themeRes.ok) {
          const themeData = await themeRes.json();
          setTheme(themeData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-4">Features Test Page</h1>
            <p className="text-xl">Testing all advanced admin features</p>
          </div>
        </div>

        {/* Theme Settings Display */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Theme Settings</h2>
            {theme && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg" style={{ backgroundColor: theme.primaryColor, color: 'white' }}>
                  <h3 className="text-xl font-bold">Primary Color</h3>
                  <p>{theme.primaryColor}</p>
                </div>
                <div className="p-6 rounded-lg border-2" style={{ backgroundColor: theme.secondaryColor }}>
                  <h3 className="text-xl font-bold">Secondary Color</h3>
                  <p>{theme.secondaryColor}</p>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: theme.accentColor, color: 'white' }}>
                  <h3 className="text-xl font-bold">Accent Color</h3>
                  <p>{theme.accentColor}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Services Display */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Dynamic Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <div 
                    className="text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="text-accent mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-600">
              Services loaded: {services.length}
            </p>
          </div>
        </section>

        {/* FAQs Display */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Dynamic FAQs</h2>
            <div className="space-y-4">
              {faqs.slice(0, 3).map((faq) => (
                <div key={faq._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <div 
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {faq.category}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-600">
              FAQs loaded: {faqs.length}
            </p>
          </div>
        </section>

        {/* Testimonials Display */}
        <TestimonialsSection maxItems={4} />

        {/* Test Summary */}
        <section className="py-20 bg-gray-100">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-8">Feature Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Theme Colors</h3>
                <p className={theme ? 'text-green-600' : 'text-red-600'}>
                  {theme ? '✅ Working' : '❌ Not Working'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Services</h3>
                <p className={services.length > 0 ? 'text-green-600' : 'text-red-600'}>
                  {services.length > 0 ? '✅ Working' : '❌ Not Working'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">FAQs</h3>
                <p className={faqs.length > 0 ? 'text-green-600' : 'text-red-600'}>
                  {faqs.length > 0 ? '✅ Working' : '❌ Not Working'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Testimonials</h3>
                <p className="text-blue-600">Check Above Section</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}