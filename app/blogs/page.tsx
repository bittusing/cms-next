import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaClock, FaUser, FaArrowRight, FaSearch, FaFilter } from 'react-icons/fa';

// Lazy load components
const BlogCard = dynamic(() => import('@/components/BlogCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

export const metadata: Metadata = {
  title: 'Interior Design Blog - Urban Design India',
  description: 'Discover the latest trends, tips, and insights in interior design. Expert advice from Urban Design India professionals.',
  keywords: 'interior design blog, home decor tips, design trends, architecture insights, Urban Design India',
  openGraph: {
    title: 'Interior Design Blog - Urban Design India',
    description: 'Discover the latest trends, tips, and insights in interior design.',
    images: ['/logo.png'],
  }
};

async function getBlogs(searchParams: any) {
  try {
    const params = new URLSearchParams({
      page: searchParams.page || '1',
      limit: '12',
      ...(searchParams.category && { category: searchParams.category }),
      ...(searchParams.search && { search: searchParams.search })
    });

    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs?${params}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return { blogs: [], pagination: { page: 1, pages: 1, total: 0 } };
    return res.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { blogs: [], pagination: { page: 1, pages: 1, total: 0 } };
  }
}

async function getFeaturedBlogs() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs?featured=true&limit=3`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs;
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
}

interface BlogsPageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const [{ blogs, pagination }, featuredBlogs] = await Promise.all([
    getBlogs(searchParams),
    getFeaturedBlogs()
  ]);

  const categories = ['Interior Design', 'Home Decor', 'Architecture', 'Tips & Guides', 'Trends', 'Case Studies'];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Design <span className="text-amber-400">Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Discover the latest trends, expert tips, and inspiring ideas in interior design
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <form method="GET" className="relative">
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchParams.search}
                    placeholder="Search for design tips, trends, ideas..."
                    className="w-full px-6 py-4 pr-16 text-gray-900 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Articles</h2>
                <p className="text-lg text-gray-600">Our most popular and trending design insights</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredBlogs.map((blog: any) => (
                  <div key={blog._id} className="group">
                    <Link href={`/blogs/${blog.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="relative h-48">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FaCalendar className="mr-2" />
                            {new Date(blog.publishedAt).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <FaClock className="mr-2" />
                            {blog.readTime} min read
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              <FaUser className="inline mr-1" />
                              {blog.author}
                            </span>
                            <FaArrowRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blogs"
                className={`px-6 py-2 rounded-full transition-colors ${
                  !searchParams.category
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </Link>
              {categories.map(category => (
                <Link
                  key={category}
                  href={`/blogs?category=${encodeURIComponent(category)}`}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    searchParams.category === category
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container-custom">
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No blogs found</h3>
                <p className="text-gray-600 mb-8">
                  {searchParams.search || searchParams.category
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Check back soon for new content!'}
                </p>
                {(searchParams.search || searchParams.category) && (
                  <Link
                    href="/blogs"
                    className="inline-flex items-center bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    View All Blogs
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog: any) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => {
                        const isActive = page === parseInt(searchParams.page || '1');
                        const href = new URLSearchParams({
                          ...(searchParams.category && { category: searchParams.category }),
                          ...(searchParams.search && { search: searchParams.search }),
                          page: page.toString()
                        });
                        
                        return (
                          <Link
                            key={page}
                            href={`/blogs?${href}`}
                            className={`px-4 py-2 rounded-md transition-colors ${
                              isActive
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {page}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}