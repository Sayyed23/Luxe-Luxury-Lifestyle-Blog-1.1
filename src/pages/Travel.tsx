import React from 'react';
import CategoryHeader from '../components/CategoryHeader';
import ArticleGrid from '../components/ArticleGrid';

const Travel = () => {
  const articles = [
    {
      slug: 'hidden-paradises',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      title: 'Hidden Paradises',
      excerpt: 'Venture beyond the ordinary to discover exclusive retreats and secluded luxury destinations that redefine the meaning of escape.',
      readMore: 'Uncover our carefully curated selection of the worlds most exclusive and hidden luxury destinations.'
    },
    {
      slug: 'art-of-luxury-travel',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      title: 'The Art of Luxury Travel',
      excerpt: 'Master the nuances of sophisticated travel, from private jet etiquette to securing exclusive reservations.',
      readMore: 'Explore comprehensive insights into luxury travel, including private transportation and exclusive accommodations.'
    },
    {
      slug: 'private-islands',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      title: 'Private Islands',
      excerpt: 'Experience the ultimate in privacy and luxury with our guide to the worlds most exclusive private islands.',
      readMore: 'Discover our detailed guide to the most exceptional private island experiences.'
    }
  ];

  return (
    <div className="pt-20">
      <CategoryHeader 
        title="Travel" 
        description="Explore the world's most exclusive destinations where luxury knows no bounds"
        image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd"
      />
      <ArticleGrid articles={articles} category="travel" />
    </div>
  );
};

export default Travel;