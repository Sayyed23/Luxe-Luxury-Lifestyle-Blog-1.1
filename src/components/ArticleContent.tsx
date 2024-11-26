import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Tag } from 'lucide-react';

interface ArticleContentProps {
  title: string;
  category: string;
  content: string[];
  image: string;
  date?: string;
  author?: string;
}

export default function ArticleContent({ 
  title, 
  category, 
  content, 
  image, 
  date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  author = 'LUXE Editorial'
}: ArticleContentProps) {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="relative h-[50vh] mb-12">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div 
            className="flex items-center space-x-6 text-white/90 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="text-sm">{author}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-2" />
              <span className="text-sm">{category}</span>
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl font-serif text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h1>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {content.map((paragraph, index) => (
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

      <motion.div 
        className="mt-12 pt-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-serif text-gray-900 mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Share on Twitter
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Share on Facebook
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Copy Link
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}