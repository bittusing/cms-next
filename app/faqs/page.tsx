'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const categories = ['all', 'General', 'Services', 'Pricing', 'Process', 'Support'];

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, [selectedCategory]);

  const fetchFAQs = async () => {
    try {
      const url = selectedCategory === 'all' ? '/api/faqs' : `/api/faqs?category=${selectedCategory}`;
      const response = await fetch(url);
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchFAQs();
      return;
    }

    try {
      const response = await fetch(`/api/faqs/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to search FAQs:', error);
    }
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg sm:text-xl">Find answers to common questions about our services</p>
          </div>
        </div>

        <section className="py-20">
          <div className="container-custom">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-accent text-white px-6 py-3 rounded-md hover:opacity-90 flex items-center gap-2"
                    >
                      <FaSearch /> Search
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* FAQs by Category */}
            {Object.keys(groupedFAQs).map(category => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-accent">
                  {category}
                </h2>
                <div className="space-y-4">
                  {groupedFAQs[category].map((faq) => (
                    <div key={faq._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq._id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq._id ? (
                          <FaChevronUp className="text-accent flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-accent flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === faq._id && (
                        <div className="px-6 pb-4">
                          <div 
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {faqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No FAQs found. Try adjusting your search or category filter.</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-accent text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-lg mb-6 opacity-90">Get a Free Consultation with UDI Today.</p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
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