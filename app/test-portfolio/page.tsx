import { mockProjects, mockCategories } from '@/lib/mockData';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TestPortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-4">Test Portfolio (Mock Data)</h1>
            <p className="text-xl">Showing {mockProjects.length} projects from mock data</p>
          </div>
        </div>

        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
