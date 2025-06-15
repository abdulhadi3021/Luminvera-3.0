import React from 'react';

const dealCategories = [
  {
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Gadgets & Tech',
    image: 'https://images.pexels.com/photos/4790243/pexels-photo-4790243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Fashion & Travel',
    image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Baby & Kids',
    image: 'https://images.pexels.com/photos/3661354/pexels-photo-3661354.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const beautyProducts = [
  'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3738347/pexels-photo-3738347.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const DealsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Exclusive Deals
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get your hands on special discounts across a wide range of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {dealCategories.map((category, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={category.image}
                alt={`${category.name} category image`}
                loading="lazy"
                className="w-full h-44 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Beauty & Health Section */}
        <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Health & Beauty
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Discover premium beauty products and accessories at discounted prices.
              </p>
              <button className="mt-4 px-5 py-2 text-sm font-medium bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition active:scale-95">
                Shop Now
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {beautyProducts.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Beauty product"
                  loading="lazy"
                  className="w-32 h-32 object-cover rounded-xl flex-shrink-0 transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ending CTA */}
        <div className="text-center">
          <button className="mt-4 px-6 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition active:scale-95">
            View All Deals
          </button>
        </div>

      </div>
    </section>
  );
};

export default DealsSection;
