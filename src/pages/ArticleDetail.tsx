import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { fashionArticles } from '../data/fashionArticles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = fashionArticles[slug as keyof typeof fashionArticles];

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-600 mb-4">Article not found</h1>
          <Link 
            to="/"
            className="text-gray-900 hover:text-gray-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <Link to={`/${article.category.toLowerCase()}`}>
          <motion.button
            className="fixed top-24 left-8 z-10 flex items-center text-gray-900 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to {article.category}</span>
          </motion.button>
        </Link>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 py-12"
        >
          <div className="relative h-[50vh] mb-12">
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover rounded-lg"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
            <motion.h1 
              className="absolute bottom-8 left-8 right-8 text-4xl font-serif text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {article.title}
            </motion.h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-gray-700 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}