'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

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
      <main className="pt-16 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                  Frequently Asked Questions
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Got Questions About Interior Designing Service in Delhi?
                  <span className="block text-accent mt-2">We&apos;ve Got Answers</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Explore our FAQs to understand the how, why, and what behind construction and interior works. Backed by professionals with 30+ years of industry exposure, each answer is crafted to help you choose the right solutions efficiently.
                </p>
                <button className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg">
                  ▶ Read More
                </button>
              </div>

              {/* Right Side - FAQ List */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => toggleFAQ(faq._id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-lg"
                    >
                      <h3 className="text-base font-medium text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {expandedFAQ === faq._id ? (
                          <FaChevronUp className="text-accent w-4 h-4" />
                        ) : (
                          <FaChevronDown className="text-gray-400 w-4 h-4" />
                        )}
                      </div>
                    </button>
                    {expandedFAQ === faq._id && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <div 
                          className="text-gray-700 leading-relaxed pt-4"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-accent text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-lg mb-6 opacity-90">Get a Free Consultation with UDI Today.</p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Get A Quote
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}