import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaAward, FaUsers, FaLightbulb, FaHandshake, FaArrowRight, FaQuoteLeft, FaCheck } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'About Us | Urban Design India',
  description: 'Learn more about Urban Design India - Your trusted interior design partner with over 15 years of excellence in luxury interior design.',
};

export default function AboutPage() {
  const achievements = [
    { number: '500+', label: 'Projects Completed', icon: '🏠' },
    { number: '15+', label: 'Years Experience', icon: '⭐' },
    { number: '98%', label: 'Client Satisfaction', icon: '❤️' },
    { number: '50+', label: 'Team Members', icon: '👥' }
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
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0">
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
              <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-4 animate-fade-in-up">
                About Urban Design India
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
                Crafting Spaces That 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Inspire Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-400">
                For over 15 years, we've been transforming dreams into reality through exceptional interior design and unparalleled craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  Designing Dreams Since 
                  <span className="text-amber-600"> 2008</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Urban Design India began as a vision to transform the way people experience their living and working spaces. Founded by a team of passionate designers and architects, we've grown from a small studio to one of India's most trusted interior design firms.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our journey has been marked by countless successful projects, satisfied clients, and a relentless pursuit of design excellence. Every space we create tells a unique story, reflecting the personality and aspirations of those who inhabit it.
                </p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl"
                >
                  View Our Work
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
                    alt="Our Design Process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <FaQuoteLeft className="text-amber-600 text-2xl" />
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
            <div className="text-center mb-16">
              <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">
                Our Values
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">What Drives Us Forward</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our core values shape every decision we make and every design we create, ensuring that we deliver exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <value.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
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
                <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-4">
                  Our Expertise
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Comprehensive Design 
                  <span className="text-amber-400"> Solutions</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  From initial concept to final installation, we offer a complete range of interior design services tailored to meet your unique needs and preferences.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                >
                  Explore Services
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaCheck className="text-amber-400 flex-shrink-0" />
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
              <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">
                Our Philosophy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                Design is Not Just What It Looks Like
                <span className="block text-amber-600">Design is How It Works</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We believe that exceptional design goes beyond aesthetics. It's about creating spaces that enhance your lifestyle, improve functionality, and reflect your unique personality. Every element we choose, every color we select, and every layout we design serves a purpose in creating your perfect environment.
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
        <section className="py-24 bg-gradient-to-r from-amber-500 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="container-custom text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Design Journey?</h2>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to create a space that perfectly reflects your vision and enhances your lifestyle. Your dream interior is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Started Today
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
