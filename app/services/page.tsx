import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Urban Design India',
  description: 'Explore Urban Design India interior design services - Residential, Commercial & 3D Visualization',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Design',
      description: 'Transform your home into a personalized sanctuary with our residential design services.',
      features: [
        'Living room design',
        'Bedroom design',
        'Kitchen design',
        'Bathroom design',
        'Home office design',
      ],
    },
    {
      title: 'Commercial Design',
      description: 'Create inspiring workspaces that enhance productivity and reflect your brand.',
      features: [
        'Office design',
        'Retail space design',
        'Restaurant design',
        'Hotel design',
        'Co-working spaces',
      ],
    },
    {
      title: 'Renovation & Remodeling',
      description: 'Breathe new life into your existing spaces with our renovation services.',
      features: [
        'Space planning',
        'Structural changes',
        'Material selection',
        'Project management',
        'Budget optimization',
      ],
    },
    {
      title: 'Consultation',
      description: 'Get expert advice and guidance for your interior design projects.',
      features: [
        'Design consultation',
        'Color consultation',
        'Furniture selection',
        'Lighting design',
        'Material sourcing',
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl">Comprehensive interior design solutions</p>
          </div>
        </div>

        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="text-accent mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-accent mb-4">01</div>
                <h3 className="text-xl font-bold mb-2">Consultation</h3>
                <p className="text-gray-600">We discuss your vision and requirements</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-4">02</div>
                <h3 className="text-xl font-bold mb-2">Design</h3>
                <p className="text-gray-600">We create detailed design concepts</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-4">03</div>
                <h3 className="text-xl font-bold mb-2">Implementation</h3>
                <p className="text-gray-600">We bring the design to life</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-4">04</div>
                <h3 className="text-xl font-bold mb-2">Completion</h3>
                <p className="text-gray-600">Final touches and handover</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
