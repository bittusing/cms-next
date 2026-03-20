import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedHomepage from '@/components/AnimatedHomepage';
import ModernAdsBanner from '@/components/ModernAdsBanner';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

// Lazy load components for better performance
const ProjectCardModal = dynamic(() => import('@/components/ProjectCardModal'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-screen"></div>
});
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64"></div>
});
const VideoSection = dynamic(() => import('@/components/VideoSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64"></div>
});
const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64"></div>
});

async function getSliders() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/slider`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch sliders:', error);
    return [];
  }
}

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export const metadata = {
  title: 'Urban Design India - Premium Interior Design Services',
  description: 'Transform your space with Urban Design India. Expert interior design services for residential, commercial, and luxury renovation projects. 15+ years of excellence.',
  keywords: 'interior design, home design, commercial design, luxury renovation, Urban Design India, interior designer',
  openGraph: {
    title: 'Urban Design India - Premium Interior Design Services',
    description: 'Transform your space with Urban Design India. Expert interior design services for residential, commercial, and luxury renovation projects.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Design India - Premium Interior Design Services',
    description: 'Transform your space with Urban Design India. Expert interior design services.',
  }
};

export default async function Home() {
  const [sliders, projects] = await Promise.all([
    getSliders(),
    getProjects()
  ]);

  const featuredProjects = projects.slice(0, 6);

  return (
    <AnimatedHomepage>
      <Navbar />
      <ModernAdsBanner />
      <main className="pt-16">
        {/* Dynamic Hero Slider */}
        {sliders.length > 0 ? (
          <HeroSlider slides={sliders} />
        ) : (
          // Premium Hero Section
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Background Video/Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop"
                alt="Luxury Interior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            <div className="relative z-10 container-custom text-center text-white">
              <div className="max-w-4xl mx-auto">
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Luxury Interior
                  <span className="block text-accent">
                    Design Excellence
                  </span>
                </h1>
                <p 
                  className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed px-4 sm:px-0"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Creating extraordinary spaces that reflect your vision and elevate your lifestyle. 
                  Where sophistication meets functionality.
                </p>
                <div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <Link
                    href="/portfolio"
                    className="group bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center shadow-2xl w-full sm:w-auto justify-center btn-hover-slide relative overflow-hidden transform hover:-translate-y-1"
                  >
                    Explore Our Work
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Premium About Section */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-delay="100">
                <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                  About Urban Design India
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  Crafting Spaces That 
                  <span className="text-accent"> Inspire</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  For over 15 years, Urban Design India has been at the forefront of luxury interior design, 
                  creating bespoke spaces that seamlessly blend aesthetics with functionality. Our award-winning 
                  team of designers brings your vision to life with unparalleled attention to detail.
                </p>
                
                {/* Statistics with Counter Animation */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div 
                    className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">
                      <span data-counter="500">0</span>+
                    </div>
                    <div className="text-sm font-semibold">Projects Completed</div>
                  </div>
                  <div 
                    className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">
                      <span data-counter="18">0</span>+
                    </div>
                    <div className="text-sm font-semibold">Years Experience</div>
                  </div>
                  <div 
                    className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">
                      <span data-counter="450">0</span>+
                    </div>
                    <div className="text-sm font-semibold">Happy Clients</div>
                  </div>
                  <div 
                    className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">
                      <span data-counter="25">0</span>+
                    </div>
                    <div className="text-sm font-semibold">Team Members</div>
                  </div>
                </div>
                
                <Link
                  href="/about"
                  className="inline-flex items-center text-accent font-semibold hover:opacity-80 transition-all duration-300 transform hover:translate-x-2"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  Learn More About Us
                  <FaArrowRight className="ml-2 transition-transform duration-300" />
                </Link>
              </div>
              <div className="relative" data-aos="fade-left" data-aos-delay="200">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                    alt="Luxury Interior Design"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl transform hover:scale-110 transition-transform duration-300"
                  data-aos="zoom-in"
                  data-aos-delay="700"
                >
                  <div className="text-2xl font-bold">
                    <span data-counter="18">0</span>+
                  </div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Services */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                Our Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">Premium Design Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From concept to completion, we offer comprehensive interior design solutions 
                tailored to your unique style and requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 relative overflow-hidden hover:bg-gradient-to-br hover:from-accent/5 hover:to-accent/10 transform hover:rotate-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-0 group-hover:scale-100 rounded-2xl"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-4 group-hover:translate-y-0"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 transform translate-y-4 group-hover:translate-y-0"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <div className="text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">🏠</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-accent transition-all duration-500 transform group-hover:translate-x-2">Residential Design</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-all duration-500">
                    Transform your home into a sanctuary of luxury and comfort with our bespoke residential design solutions.
                  </p>
                  <Link href="/services" className="text-accent font-semibold hover:opacity-80 transition-all duration-300 flex items-center group-hover:translate-x-4">
                    Learn More <FaArrowRight className="ml-2 text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </div>

              <div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 relative overflow-hidden hover:bg-gradient-to-br hover:from-accent/5 hover:to-accent/10 transform hover:-rotate-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-0 group-hover:scale-100 rounded-2xl"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-4 group-hover:translate-y-0"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 transform translate-y-4 group-hover:translate-y-0"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <div className="text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">🏢</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-accent transition-all duration-500 transform group-hover:translate-x-2">Commercial/office  Design</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-all duration-500">
                    Create inspiring workspaces that enhance productivity and reflect your brand&apos;s identity and values.
                  </p>
                  <Link href="/services" className="text-accent font-semibold hover:opacity-80 transition-all duration-300 flex items-center group-hover:translate-x-4">
                    Learn More <FaArrowRight className="ml-2 text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </div>

              <div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 relative overflow-hidden hover:bg-gradient-to-br hover:from-accent/5 hover:to-accent/10 transform hover:rotate-1"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-0 group-hover:scale-100 rounded-2xl"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-4 group-hover:translate-y-0"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 transform translate-y-4 group-hover:translate-y-0"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <div className="text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">✨</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-accent transition-all duration-500 transform group-hover:translate-x-2">Consultation</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-all duration-500">
                   Bring your ideas to life with expert consultation tailored to your needs. Whether you&apos;re planning a new space or upgrading an existing one, our consultation services help you make informed and confident decisions.
                  </p>
                  <Link href="/services" className="text-accent font-semibold hover:opacity-80 transition-all duration-300 flex items-center group-hover:translate-x-4">
                    Learn More <FaArrowRight className="ml-2 text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                Our Portfolio
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover our latest masterpieces that showcase our commitment to excellence and innovation in design.
              </p>
            </div>
            
            {featuredProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project: any, index: number) => (
                    <div
                      key={project._id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <ProjectCardModal project={project} />
                    </div>
                  ))}
                </div>
                <div 
                  className="text-center mt-12"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-xl btn-hover-slide relative overflow-hidden transform hover:-translate-y-1"
                  >
                    View All Projects
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Our featured projects will be displayed here soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          maxItems={6}
          showViewAllButton={true}
        />

        {/* Premium CTA */}
        <section className="py-24 bg-accent text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-ping"></div>
          
          <div className="container-custom text-center relative z-10">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transform hover:scale-105 transition-transform duration-300"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              Ready to Transform Your Space?
            </h2>
            <p 
              className="text-xl mb-8 text-white opacity-80 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Let&apos;s collaborate to create something extraordinary. Your dream space is just a conversation away.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-500 shadow-xl w-full sm:w-auto justify-center btn-hover-slide relative overflow-hidden transform hover:-translate-y-2 hover:scale-105"
              >
                <span className="relative z-10">Start Your Project</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-500 w-full sm:w-auto justify-center transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              >
                View Our Work
                <div className="ml-2 transform group-hover:rotate-45 transition-transform duration-300">→</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Moved to bottom */}
        <TestimonialsSection showFeaturedOnly={true} maxItems={6} />

        {/* Video Section */}
        <VideoSection 
          featuredOnly={true} 
          maxVideos={3}
          showCategories={false}
        />
      </main>
      <Footer />
    </AnimatedHomepage>
  );
}
