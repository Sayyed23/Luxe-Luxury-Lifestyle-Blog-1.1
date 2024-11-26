import React from 'react';

export default function About() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif text-gray-900 mb-8">About LUXE</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              LUXE is your window into the world of sophisticated living, curating the finest in fashion, 
              travel, and lifestyle. We believe in the art of living well and sharing stories that inspire 
              and elevate.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experts and contributors spans the globe, bringing you authentic perspectives 
              on luxury living, from hidden travel gems to emerging design trends.
            </p>
            <h2 className="text-2xl font-serif text-gray-900 mt-12 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To inspire and guide our readers in their pursuit of sophisticated living, providing 
              thoughtfully curated content that celebrates quality, craftsmanship, and timeless elegance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}