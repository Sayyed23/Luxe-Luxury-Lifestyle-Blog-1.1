import React from 'react';
import CategoryHeader from '../components/CategoryHeader';
import ArticleGrid from '../components/ArticleGrid';

const Lifestyle = () => {
  const articles = [
    {
      slug: 'art-of-living',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
      title: 'The Art of Living Well',
      excerpt: 'Discover the principles of refined living, from curating the perfect home environment to mastering the art of entertaining.',
      readMore: 'Explore our comprehensive guide to elevated living, featuring expert advice on interior design and entertaining.'
    },
    {
      slug: 'wellness-luxury',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
      title: 'Wellness & Luxury',
      excerpt: 'Experience the intersection of luxury and well-being through exclusive spa retreats and personalized fitness programs.',
      readMore: 'Dive into our curated selection of luxury wellness experiences and bespoke fitness programs.'
    },
    {
      slug: 'modern-living',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Modern Living',
      excerpt: 'Embrace contemporary luxury living with smart home innovations and sustainable practices that enhance daily life.',
      readMore: 'Discover how modern technology and thoughtful design combine to create luxurious living spaces.'
    }
  ];

  return (
    <div className="pt-20">
      <CategoryHeader 
        title="Lifestyle" 
        description="Elevate your everyday living with curated experiences and refined choices"
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
      />
      <ArticleGrid articles={articles} category="lifestyle" />
    </div>
  );
};

export default Lifestyle;