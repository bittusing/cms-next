'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import AnimatedPage from '@/components/AnimatedPage';

interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
  order: number;
  isActive: boolean;
}

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
    <AnimatedPage>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary to-gray-800 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container-custom text-center relative z-10">
            <div 
              className="text-accent text-sm font-semibold tracking-wider uppercase mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              PROFESSIONAL INTERIOR DESIGN
            </div>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Transform Your Space with
              <span className="block text-accent mt-2">Expert Design Solutions</span>
            </h1>
            <p 
              className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              From concept to completion, we create stunning interiors that reflect your personality and enhance your lifestyle
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <div className="text-accent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider uppercase mb-6">
                OUR SERVICES
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:-translate-y-4 hover:bg-gradient-to-br hover:from-accent/5 hover:to-accent/10 hover:rotate-1 ${
                    index % 2 === 0 ? 'md:translate-y-0 hover:md:-rotate-1' : 'md:translate-y-8 hover:md:rotate-1'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-4 group-hover:translate-y-0"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 transform translate-y-4 group-hover:translate-y-0"></div>
                  <div className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1400 transform translate-y-4 group-hover:translate-y-0"></div>
                  
                  {/* Subtle background overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-0 group-hover:scale-100 rounded-2xl"></div>
                  
                  <div className="p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mr-4 group-hover:bg-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                        <div className="w-6 h-6 bg-accent rounded-full group-hover:bg-white transition-all duration-500 transform group-hover:scale-110"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent transition-all duration-500 transform group-hover:translate-x-2">
                        {service.title}
                      </h3>
                    </div>
                    <div 
                      className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-all duration-500"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start text-gray-600 group-hover:text-gray-700 transition-all duration-500 transform hover:translate-x-2"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-5 h-5 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-accent group-hover:scale-125 transition-all duration-500 shadow-sm group-hover:shadow-lg">
                            <span className="text-accent text-xs font-bold group-hover:text-white transition-colors duration-500 transform group-hover:scale-110">✓</span>
                          </div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                       style={{ boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.3)' }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <div className="text-accent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider uppercase mb-6">
                OUR PROCESS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How We Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our proven 5-step process ensures your project is completed on time, within budget, and exceeds expectations
              </p>
            </div>

            {/* Process Steps - Alternating Flow with Consistent Sizing */}
            <div className="max-w-5xl mx-auto space-y-4">
              {/* Step 1 - Left title, Right description */}
              <div 
                className="flex items-center w-full group hover:scale-105 transition-all duration-500"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="flex items-center justify-start bg-white border-2 border-accent rounded-full px-6 py-4 w-1/2 min-h-[80px] group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-x-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-base font-bold mr-4 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-accent transition-colors duration-500 text-left">
                    Consultation & Understanding
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-4 w-1/2 min-h-[80px] flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:translate-x-2 group-hover:shadow-2xl">
                  <p className="text-center text-base">
                    We explore your ideas, preferences, and functional requirements
                  </p>
                </div>
              </div>

              {/* Step 2 - Left description, Right title */}
              <div 
                className="flex items-center w-full group hover:scale-105 transition-all duration-500"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="bg-accent text-white rounded-full px-6 py-4 w-1/2 min-h-[80px] flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:-translate-x-2 group-hover:shadow-2xl">
                  <p className="text-center text-base">
                    Creative planning with mood boards, layouts, and visual direction
                  </p>
                </div>
                <div className="flex items-center justify-end bg-white border-2 border-accent rounded-full px-6 py-4 w-1/2 min-h-[80px] group-hover:shadow-xl transition-all duration-500 transform group-hover:translate-x-2">
                  <h3 className="font-bold text-gray-900 text-base mr-4 group-hover:text-accent transition-colors duration-500 text-right">
                    Concept Development
                  </h3>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    2
                  </div>
                </div>
              </div>

              {/* Step 3 - Left title, Right description */}
              <div 
                className="flex items-center w-full group hover:scale-105 transition-all duration-500"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <div className="flex items-center justify-start bg-white border-2 border-accent rounded-full px-6 py-4 w-1/2 min-h-[80px] group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-x-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-base font-bold mr-4 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-accent transition-colors duration-500 text-left">
                    2D & 3D Visualization
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-4 w-1/2 min-h-[80px] flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:translate-x-2 group-hover:shadow-2xl">
                  <p className="text-center text-base">
                    Realistic renderings for clarity and refinement
                  </p>
                </div>
              </div>

              {/* Step 4 - Left description, Right title */}
              <div 
                className="flex items-center w-full group hover:scale-105 transition-all duration-500"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <div className="bg-accent text-white rounded-full px-6 py-4 w-1/2 min-h-[80px] flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:-translate-x-2 group-hover:shadow-2xl">
                  <p className="text-center text-base">
                    Precise implementation with strict quality control
                  </p>
                </div>
                <div className="flex items-center justify-end bg-white border-2 border-accent rounded-full px-6 py-4 w-1/2 min-h-[80px] group-hover:shadow-xl transition-all duration-500 transform group-hover:translate-x-2">
                  <h3 className="font-bold text-gray-900 text-base mr-4 group-hover:text-accent transition-colors duration-500 text-right">
                    Execution & Supervision
                  </h3>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    4
                  </div>
                </div>
              </div>

              {/* Step 5 - Left title, Right description */}
              <div 
                className="flex items-center w-full group hover:scale-105 transition-all duration-500"
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <div className="flex items-center justify-start bg-white border-2 border-accent rounded-full px-6 py-4 w-1/2 min-h-[80px] group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-x-2">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-base font-bold mr-4 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    5
                  </div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-accent transition-colors duration-500 text-left">
                    Final Styling & Handover
                  </h3>
                </div>
                <div className="bg-accent text-white rounded-full px-6 py-4 w-1/2 min-h-[80px] flex items-center justify-center group-hover:bg-primary transition-all duration-500 transform group-hover:translate-x-2 group-hover:shadow-2xl">
                  <p className="text-center text-base">
                    A perfectly finished space ready to inspire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom text-center">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              data-aos="fade-up"
            >
              Ready to Transform Your Space?
            </h2>
            <p 
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Let&apos;s discuss your project and create something amazing together
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-hover-slide relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
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
    </AnimatedPage>
  );
}
