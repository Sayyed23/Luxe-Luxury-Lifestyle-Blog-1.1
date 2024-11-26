import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
  description: string;
  image: string;
}

export default function CategoryHeader({ title, description, image }: CategoryHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <motion.button
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-200 transition-colors"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft size={24} className="mr-2" />
        <span className="text-lg">Back</span>
      </motion.button>
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
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}