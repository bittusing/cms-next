import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaClock, FaUser, FaArrowRight } from 'react-icons/fa';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    author: string;
    category: string;
    tags: string[];
    readTime: number;
    publishedAt: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group">
      <Link href={`/blogs/${blog.slug}`}>
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="relative h-48">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
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
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
            
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                <FaUser className="inline mr-1" />
                {blog.author}
              </span>
              <FaArrowRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}