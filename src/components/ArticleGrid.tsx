import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  image: string;
  title: string;
  excerpt: string;
  readMore: string;
  slug?: string;
}

interface ArticleGridProps {
  articles: Article[];
  category: string;
}

export default function ArticleGrid({ articles, category }: ArticleGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div 
            key={index}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={item}
            transition={{ duration: 0.5 }}
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
              <motion.h3 
                className="text-xl font-serif text-gray-900 mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {article.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-4 line-clamp-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {article.excerpt}
              </motion.p>
              <motion.div 
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link to={`/${category}/article/${article.slug || index}`}>
                  <motion.button 
                    className="flex items-center text-gray-900 font-medium group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-2">Read More</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
                <motion.div 
                  className="mt-4 overflow-hidden"
                  initial={{ height: 0 }}
                  whileHover={{ height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {article.readMore}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}