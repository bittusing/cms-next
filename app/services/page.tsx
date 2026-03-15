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
  order: number;
  isActive: boolean;
}

interface ProcessStep {
  _id: string;
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, stepsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/process-steps')
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        if (stepsRes.ok) {
          const stepsData = await stepsRes.json();
          setProcessSteps(stepsData);
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg sm:text-xl">Comprehensive interior design solutions</p>
          </div>
        </div>

        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service._id} className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <div 
                    className="text-gray-700 mb-6"
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
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              {processSteps.map((step) => (
                <div key={step._id}>
                  <div className="text-4xl font-bold text-accent mb-4">
                    {step.stepNumber.toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection serviceType="All" maxItems={4} />
      </main>
      <Footer />
    </>
  );
}
