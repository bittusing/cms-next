import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaClock, FaUser, FaArrowLeft, FaShare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

// Lazy load components
const BlogCard = dynamic(() => import('@/components/BlogCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return null;
  }
}

async function getRelatedBlogs(category: string, currentSlug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs?category=${encodeURIComponent(category)}&limit=3`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs.filter((blog: any) => blog.slug !== currentSlug);
  } catch (error) {
    console.error('Failed to fetch related blogs:', error);
    return [];
  }
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found - Urban Design India',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.seoKeywords || blog.tags.join(', '),
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: [blog.featuredImage],
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: [blog.featuredImage],
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`
    }
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug);
  const currentUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blogs/${blog.slug}`;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="container-custom">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-amber-600">Home</Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-amber-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{blog.title}</span>
            </nav>
          </div>
        </section>

        {/* Blog Header */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blogs"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"
              >
                <FaArrowLeft className="mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {blog.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <FaUser className="mr-2" />
                  <span>By {blog.author}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <FaCalendar className="mr-2" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <FaClock className="mr-2" />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-gray-600 font-medium">Share:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="pb-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedBlogs.slice(0, 3).map((relatedBlog: any) => (
                    <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 text-amber-100">
              Let our expert designers bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}