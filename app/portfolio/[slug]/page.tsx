import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

interface Props {
  params: { slug: string };
}

async function getProject(slug: string) {
  await dbConnect();
  const project = await Project.findOne({ slug }).populate('category').lean();
  return project ? JSON.parse(JSON.stringify(project)) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.images[0]],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600">The project you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[500px] w-full">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Details */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <p className="text-accent text-sm mb-2">{project.category.name}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              </div>

              {/* Image Gallery - Focus on Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image: string, index: number) => (
                  <div key={index} className="relative h-96 rounded-lg overflow-hidden group">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
