import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { articles } from '../data/articles';

const categoryData = {
  fashion: {
    title: 'Fashion Articles',
    description: 'Explore our complete collection of fashion insights, trends, and luxury style guides',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    articles: [
      {
        title: 'The Evolution of Luxury Fashion',
        excerpt: 'From haute couture to contemporary luxury, discover how high-end fashion has transformed.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        date: 'March 15, 2024'
      },
      {
        title: 'Sustainable Luxury: The Future of Fashion',
        excerpt: 'How luxury brands are revolutionizing the industry with eco-conscious practices.',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
        date: 'March 12, 2024'
      },
      {
        title: 'The Art of Accessorizing',
        excerpt: 'Master the subtle art of elevating any outfit with the perfect accessories.',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
        date: 'March 10, 2024'
      },
      {
        title: 'Iconic Fashion Houses',
        excerpt: 'A deep dive into the history and influence of legendary fashion houses.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
        date: 'March 8, 2024'
      }
    ]
  },
  travel: {
    title: 'Travel Articles',
    description: 'Discover extraordinary destinations and exclusive travel experiences',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
    articles: [
      {
        title: 'Hidden Luxury Retreats',
        excerpt: 'Discover secluded paradises that redefine exclusive travel experiences.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        date: 'March 14, 2024'
      },
      {
        title: 'Private Island Escapes',
        excerpt: 'Experience ultimate privacy in these exceptional island destinations.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        date: 'March 11, 2024'
      },
      {
        title: 'Luxury Train Journeys',
        excerpt: 'Embark on extraordinary rail adventures across stunning landscapes.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        date: 'March 9, 2024'
      },
      {
        title: 'Mountain Sanctuaries',
        excerpt: 'Elevated retreats offering solitude and spectacular views.',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
        date: 'March 7, 2024'
      }
    ]
  },
  lifestyle: {
    title: 'Lifestyle Articles',
    description: 'Curated content for those who appreciate the finer things in life',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    articles: [
      {
        title: 'The Art of Living Well',
        excerpt: 'Master the principles of refined living and sophisticated entertaining.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
        date: 'March 13, 2024'
      },
      {
        title: 'Wellness & Luxury',
        excerpt: 'Where luxury meets well-being: exclusive spa retreats and wellness programs.',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
        date: 'March 10, 2024'
      },
      {
        title: 'Modern Living Spaces',
        excerpt: 'Contemporary design meets luxury in these inspiring living spaces.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        date: 'March 8, 2024'
      },
      {
        title: 'Culinary Excellence',
        excerpt: 'Exploring the world of fine dining and gourmet experiences.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
        date: 'March 6, 2024'
      }
    ]
  }
};

export default function AllArticles() {
  const { category } = useParams();
  const data = category ? categoryData[category as keyof typeof categoryData] : null;

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <div className="pt-20">
      <div className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url(${data.image})` }}>
        <Link to={`/${category}`}>
          <motion.button
            className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-200 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={24} className="mr-2" />
            <span className="text-lg">Back to {category}</span>
          </motion.button>
        </Link>
        <motion.div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl px-4">
            <motion.h1 
              className="text-4xl font-serif text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {data.description}
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.articles.map((article, index) => (
            <motion.article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500">{article.date}</span>
                <h2 className="text-xl font-serif text-gray-900 mt-2 mb-3">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Link 
                  to="#" 
                  className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
                >
                  Read full article →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}