import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoSection from '@/components/VideoSection';

export const metadata = {
  title: 'Videos - Urban Design India | Interior Design Success Stories',
  description: 'Watch our interior design project videos, client testimonials, and design tips. See how Urban Design India transforms spaces into beautiful homes.',
  keywords: 'interior design videos, home design videos, client testimonials, project showcase, design tips',
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Design Journey
              <span className="block text-accent mt-2">In Motion</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience our interior design transformations through video. From initial concepts to stunning completions, 
              watch how we bring dreams to life.
            </p>
          </div>
        </section>

        {/* Video Section */}
        <VideoSection 
          title="From Vision to Reality: Home Interior Success Stories"
          subtitle="Watch our latest projects, client testimonials, and design insights"
          showCategories={true}
          maxVideos={12}
        />

        {/* CTA Section */}
        <section className="py-20 bg-accent text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's create something extraordinary together. Your dream space is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Free Consultation
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300"
              >
                View Our Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}