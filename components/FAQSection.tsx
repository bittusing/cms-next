'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

interface FAQSectionProps {
  maxItems?: number;
  showViewAllButton?: boolean;
}

export default function FAQSection({
  maxItems = 8,
  showViewAllButton = true
}: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    try {
      const response = await fetch('/api/faqs');
      if (response.ok) {
        let data = await response.json();
        
        // Limit items if specified
        if (maxItems) {
          data = data.slice(0, maxItems);
        }
        
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Content */}
          <div>
            <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Got Questions About Interior Designing Service in Delhi?
              <span className="block text-accent mt-2">We&apos;ve Got Answers</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Explore our FAQs to understand the how, why, and what behind construction and interior works. Backed by professionals with 30+ years of industry exposure, each answer is crafted to help you choose the right solutions efficiently.
            </p>
            {showViewAllButton && (
              <Link
                href="/faqs"
                className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg inline-flex items-center"
              >
                ▶ Read More
              </Link>
            )}
          </div>

          {/* Right Side - FAQ List with Fixed Height and Scroll */}
          <div className="h-[600px] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-accent scrollbar-track-gray-100">
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
  );
}