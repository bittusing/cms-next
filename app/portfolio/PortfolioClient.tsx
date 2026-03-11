'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { FaFilter } from 'react-icons/fa';

interface PortfolioClientProps {
  initialProjects: any[];
  initialCategories: any[];
}

export default function PortfolioClient({ initialProjects, initialCategories }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? initialProjects
    : initialProjects.filter((p: any) => p.category._id === selectedCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4 flex items-center justify-center gap-2">
            <FaFilter className="text-amber-600" />
            Filter Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Premium 
            <span className="text-amber-600"> Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of exceptional interior design projects that showcase our expertise across various categories and styles.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold text-sm uppercase tracking-wider ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200'
            }`}
          >
            All Projects
          </button>
          {initialCategories.map((category: any) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold text-sm uppercase tracking-wider ${
                selectedCategory === category._id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl text-white">🏠</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
              <p className="text-gray-600">
                We're working on adding more amazing projects to this category. Check back soon!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredProjects.map((project: any) => (
                <div key={project._id} className="group">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            {/* Results Counter */}
            <div className="text-center">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                <span className="text-gray-600 font-medium">
                  Showing {filteredProjects.length} of {initialProjects.length} projects
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
