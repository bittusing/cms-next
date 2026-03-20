import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaAward, FaUsers, FaLightbulb, FaHandshake, FaArrowRight, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import AnimatedPage from '@/components/AnimatedPage';

export const metadata: Metadata = {
  title: 'About Us | Urban Design India',
  description: 'Learn more about Urban Design India - Your trusted interior design partner with over 15 years of excellence in luxury interior design.',
};

export default function AboutPage() {
  const achievements = [
    { number: '500', label: 'Projects Completed', icon: '🏠' },
    { number: '18', label: 'Years Experience', icon: '⭐' },
    { number: '98', label: 'Client Satisfaction', icon: '❤️' },
    { number: '50', label: 'Team Members', icon: '👥' }
  ];

  const values = [
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality standards and attention to detail.'
    },
    {
      icon: FaUsers,
      title: 'Collaboration',
      description: 'We work closely with our clients, understanding their vision and bringing it to life through collaborative design.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge design trends and technologies to create spaces that are both timeless and contemporary.'
    },
    {
      icon: FaHandshake,
      title: 'Trust',
      description: 'We build lasting relationships with our clients based on transparency, reliability, and exceptional service.'
    }
  ];

  const services = [
    'Residential Interior Design',
    'Commercial Space Planning',
    'Office Interior Solutions',
    'Modular Kitchen Design',
    'Furniture Design & Selection',
    'Lighting Design',
    'Color Consultation',
    'Project Management'
  ];

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0" data-parallax="0.5">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
              alt="About Urban Design India"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div 
                className="text-accent text-sm font-semibold tracking-wider uppercase mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                About Urban Design India
              </div>
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Crafting Spaces That 
                <span className="block text-accent">
                  Inspire Excellence
                </span>
              </h1>
              <p 
                className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed px-4 sm:px-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                For over 15 years, we&apos;ve been transforming dreams into reality through exceptional interior design and unparalleled craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="text-center group transform hover:scale-110 transition-all duration-500 hover:-translate-y-2"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">{achievement.icon}</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:text-primary transition-colors duration-300">
                    <span data-counter={achievement.number}>0</span>+
                  </div>
                  <div className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-delay="100">
                <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                  Our Story
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  Designing Dreams Since 
                  <span className="text-accent"> 2008</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Urban Design India began as a vision to transform the way people experience their living and working spaces. Founded by a team of passionate designers and architects, we&apos;ve grown from a small studio to one of India&apos;s most trusted interior design firms.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our journey has been marked by countless successful projects, satisfied clients, and a relentless pursuit of design excellence. Every space we create tells a unique story, reflecting the personality and aspirations of those who inhabit it.
                </p>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition-all duration-500 shadow-xl w-full sm:w-auto justify-center transform hover:-translate-y-2 hover:scale-105"
                >
                  View Our Work
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
              <div className="relative" data-aos="fade-left" data-aos-delay="200">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
                    alt="Our Design Process"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div 
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform hover:scale-110 transition-transform duration-300"
                  data-aos="zoom-in"
                  data-aos-delay="500"
                >
                  <div className="flex items-center space-x-3">
                    <FaQuoteLeft className="text-accent text-2xl" />
                    <div>
                      <div className="text-sm text-gray-600">Our Mission</div>
                      <div className="font-bold text-gray-900">Creating Extraordinary Spaces</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                Our Values
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">What Drives Us Forward</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our core values shape every decision we make and every design we create, ensuring that we deliver exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="group text-center transform hover:-translate-y-4 hover:scale-105 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <value.icon className="text-3xl text-white transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                       style={{ boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.2)' }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                  Our Expertise
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Comprehensive Design 
                  <span className="text-accent"> Solutions</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  From initial concept to final installation, we offer a complete range of interior design services tailored to meet your unique needs and preferences.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center border-2 border-accent text-accent px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  Explore Services
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaCheck className="text-accent flex-shrink-0" />
                    <span className="text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
                Our Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                Design is Not Just What It Looks Like
                <span className="block text-accent">Design is How It Works</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We believe that exceptional design goes beyond aesthetics. It&apos;s about creating spaces that enhance your lifestyle, improve functionality, and reflect your unique personality. Every element we choose, every color we select, and every layout we design serves a purpose in creating your perfect environment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Creative Vision</h3>
                  <p className="text-gray-600">Transforming ideas into stunning visual realities</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Functional Design</h3>
                  <p className="text-gray-600">Creating spaces that work as beautifully as they look</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="text-3xl mb-4">💎</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Premium Quality</h3>
                  <p className="text-gray-600">Using only the finest materials and craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="container-custom text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Design Journey?</h2>
            <p className="text-xl mb-8 text-white opacity-80 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s collaborate to create a space that perfectly reflects your vision and enhances your lifestyle. Your dream interior is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-accent px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl w-full sm:w-auto justify-center"
              >
                Get Started Today
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 w-full sm:w-auto justify-center"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
