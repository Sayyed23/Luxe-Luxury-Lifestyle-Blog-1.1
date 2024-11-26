import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedArticleProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readMore: string;
}

export default function FeaturedArticle({ slug, category, title, excerpt, image, readMore }: FeaturedArticleProps) {
  return (
    <Link to={`/${category.toLowerCase()}/article/${slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="p-6">
          <motion.span 
            className="text-sm uppercase tracking-wider text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {category}
          </motion.span>
          <motion.h3 
            className="text-2xl font-serif mt-2 mb-3 text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-600 mb-4 line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {excerpt}
          </motion.p>
          <motion.div 
            className="flex items-center text-gray-900 group"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mr-2 font-medium">Read More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
          <motion.p
            className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {readMore}
          </motion.p>
        </div>
      </motion.article>
    </Link>
  );
}