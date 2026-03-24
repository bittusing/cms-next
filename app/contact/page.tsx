'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contact Us
            </h1>
            <p 
              className="text-lg sm:text-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Let&apos;s discuss your next project
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div data-aos="fade-right" data-aos-delay="100">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-700 mb-8">
                  Have a project in mind? We&apos;d love to hear from you. Send us a message
                  and we&apos;ll respond as soon as possible.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-gray-600">info@urbandesignindia.com</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <p className="text-gray-600">+91 97111 48175</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Address</h3>
                    <p className="text-gray-600">A-135, GF Sunlight Colony-II, Ashram, New Delhi – 110014, India</p>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left" data-aos-delay="200">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
