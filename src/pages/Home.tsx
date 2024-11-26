import React from 'react';
import FeaturedArticle from '../components/FeaturedArticle';
import { articles } from '../data/articles';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="pt-20">
        <div className="relative h-[70vh] bg-cover bg-center" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154526-990dced4db0d)' }}>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-5xl font-serif text-white mb-6">Welcome to LUXE</h1>
              <p className="text-xl text-gray-200">Discover the Art of Sophisticated Living</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif text-gray-900 mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <FeaturedArticle key={index} {...article} />
          ))}
        </div>
      </div>
    </>
  );
}