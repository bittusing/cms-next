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

// Static process steps as requested
const staticProcessSteps = [
  {
    stepNumber: 1,
    title: "Consultation & Planning",
    description: "We begin with understanding your vision, requirements, and budget to create a comprehensive design plan."
  },
  {
    stepNumber: 2,
    title: "Design Development",
    description: "Our team creates detailed designs, 3D visualizations, and material selections tailored to your preferences."
  },
  {
    stepNumber: 3,
    title: "Material Selection",
    description: "We help you choose the perfect materials, colors, and finishes that align with your style and budget."
  },
  {
    stepNumber: 4,
    title: "Project Execution",
    description: "Our skilled craftsmen bring the design to life with precision, quality workmanship, and attention to detail."
  },
  {
    stepNumber: 5,
    title: "Final Delivery",
    description: "We complete the project with final touches, quality checks, and handover your dream space ready to enjoy."
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary to-gray-800 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container-custom text-center relative z-10">
            <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
              PROFESSIONAL INTERIOR DESIGN
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Space with
              <span className="block text-accent mt-2">Expert Design Solutions</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              From concept to completion, we create stunning interiors that reflect your personality and enhance your lifestyle
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                OUR SERVICES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Design Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer a complete range of interior design services to transform your space into something extraordinary
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service._id} 
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-8'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <div className="w-6 h-6 bg-accent rounded-full"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <div 
                      className="text-gray-700 mb-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <div className="w-5 h-5 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-accent text-xs font-bold">✓</span>
                          </div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                OUR PROCESS
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How We Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our proven 5-step process ensures your project is completed on time, within budget, and exceeds expectations
              </p>
            </div>

            {/* Process Steps - Full Width Connected Design */}
            <div className="max-w-5xl mx-auto space-y-1">
              {/* Step 1 - Left title, Right description */}
              <div className="flex items-center w-full">
                <div className="flex items-center bg-white border-2 border-accent rounded-full px-6 py-3 flex-1 mr-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Consultation & Understanding
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-3 flex-1">
                  <p className="text-center text-sm">
                    We explore your ideas, preferences, and functional requirements. Consultation & Understanding
                  </p>
                </div>
              </div>

              {/* Step 2 - Left description, Right title */}
              <div className="flex items-center w-full">
                <div className="bg-accent text-white rounded-full px-6 py-3 flex-1 mr-2">
                  <p className="text-center text-sm">
                    Creative planning with mood boards, layouts, and visual direction.
                  </p>
                </div>
                <div className="flex items-center bg-white border-2 border-accent rounded-full px-6 py-3 flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mr-4">
                    Concept Development
                  </h3>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                </div>
              </div>

              {/* Step 3 - Left title, Right description */}
              <div className="flex items-center w-full">
                <div className="flex items-center bg-white border-2 border-accent rounded-full px-6 py-3 flex-1 mr-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    2D & 3D Visualization
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-3 flex-1">
                  <p className="text-center text-sm">
                    Realistic renderings for clarity and refinement.
                  </p>
                </div>
              </div>

              {/* Step 4 - Left description, Right title */}
              <div className="flex items-center w-full">
                <div className="bg-accent text-white rounded-full px-6 py-3 flex-1 mr-2">
                  <p className="text-center text-sm">
                    Precise implementation with strict quality control.
                  </p>
                </div>
                <div className="flex items-center bg-white border-2 border-accent rounded-full px-6 py-3 flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mr-4">
                    Execution & Supervision
                  </h3>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                </div>
              </div>

              {/* Step 5 - Left title, Right description */}
              <div className="flex items-center w-full">
                <div className="flex items-center bg-white border-2 border-accent rounded-full px-6 py-3 flex-1 mr-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    5
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Final Styling & Handover
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-3 flex-1">
                  <p className="text-center text-sm">
                    A perfectly finished space ready to inspire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create something amazing together
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Today
              <span className="ml-2">→</span>
            </a>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection serviceType="All" maxItems={4} />
      </main>
      <Footer />
    </>
  );
}
