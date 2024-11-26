import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryHeader from '../components/CategoryHeader';

const Fashion = () => {
  const articles = [
    {
      slug: 'evolution-of-luxury-fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
      title: 'The Evolution of Luxury Fashion',
      excerpt: 'From haute couture to contemporary luxury, discover how high-end fashion has transformed while maintaining its timeless appeal.',
      readMore: 'Journey through the transformative eras of luxury fashion, from the birth of haute couture in 19th century Paris to todays digital revolution.'
    },
    {
      slug: 'sustainable-luxury',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
      title: 'Sustainable Luxury: The Future of Fashion',
      excerpt: 'Discover how luxury brands are revolutionizing the industry with eco-conscious practices.',
      readMore: 'Explore the innovative ways luxury fashion brands are incorporating sustainability into their DNA.'
    },
    {
      slug: 'timeless-accessories',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
      title: 'Timeless Accessories',
      excerpt: 'Curated guide to investment pieces that transcend seasons and trends.',
      readMore: 'Discover our comprehensive guide to building a collection of timeless accessories.'
    }
  ];

  return (
    <div className="pt-20">
      <CategoryHeader 
        title="Fashion" 
        description="Curated collections and insights into luxury fashion, where timeless elegance meets contemporary style"
        image="https://images.unsplash.com/photo-1445205170230-053b83016050"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Link
                  to={`/fashion/article/${article.slug}`}
                  className="text-gray-900 font-medium hover:text-gray-700 transition-colors flex items-center"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fashion;