import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const ProductDetail = ({ product = {} }) => {
  const [selectedColor, setSelectedColor] = useState('Red');

  // Default product data to match the image
  const productData = {
    name: product?.clothes_name || 'Half sleeve T-shirt',
    originalPrice: product?.actual_price || 500,
    discountPrice: product?.discount_price || 450,
    discount: '5% OFF',
    rating: 4,
    reviews: 0,
    description: product?.description || 'To achieve this, it would be necessary to have uniform grammar pronunciation and more common words If several languages coalesce',
    features: [
      'Fit: Regular fit',
      'Highest quality fabric',
      'Suitable for all weather condition',
      'Excellent Washing and Light Fastness'
    ],
    colors: [
      { name: 'Red', value: '#8B4B4B', selected: true },
      { name: 'Black', value: '#4A90E2', selected: false }
    ]
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <span className="text-blue-600 font-medium">T-shirts</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Product Images */}
            <div className="space-y-6">
              {/* Thumbnail Images */}
              <div className="flex gap-3">
                <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-200">
                  <div className="w-8 h-10 bg-red-600 rounded"></div>
                </div>
                <div className="w-16 h-20 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-10 bg-green-600 rounded"></div>
                </div>
                <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-10 bg-blue-600 rounded"></div>
                </div>
              </div>

              {/* Main Product Image */}
              <div className="bg-red-50 rounded-lg p-8 flex items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="relative">
                  {/* T-shirt silhouette */}
                  <div className="w-64 h-80 bg-red-800 rounded-t-3xl relative" style={{ 
                    clipPath: 'polygon(20% 0%, 80% 0%, 90% 15%, 90% 25%, 100% 25%, 100% 100%, 0% 100%, 0% 25%, 10% 25%, 10% 15%)'
                  }}>
                    {/* Small logo/emblem on chest */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-red-900 rounded opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={20} />
                  Add to cart
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Buy now
                </button>
              </div>
            </div>

            {/* Right side - Product Details */}
            <div className="space-y-6">
              {/* Product Title */}
              <h1 className="text-3xl font-semibold text-gray-900">
                {productData.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(productData.rating)}
                </div>
                <span className="text-gray-500">
                  ( {productData.reviews} Customers Review )
                </span>
              </div>

              {/* Discount Badge */}
              <div className="inline-block">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium">
                  {productData.discount}
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium">Price :</span>
                  <span className="text-gray-400 line-through text-lg">
                    ${productData.originalPrice} USD
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${productData.discountPrice} USD
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-600 leading-relaxed">
                {productData.description}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Color :</h3>
                <div className="flex gap-4">
                  {productData.colors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-16 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                          selectedColor === color.name 
                            ? 'border-gray-400 shadow-md' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <div 
                            className="w-8 h-10 rounded"
                            style={{ 
                              backgroundColor: color.name === 'Red' ? '#8B4B4B' : '#4A90E2'
                            }}
                          ></div>
                        </div>
                      </button>
                      <span className={`text-sm font-medium ${
                        selectedColor === color.name 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`}>
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;