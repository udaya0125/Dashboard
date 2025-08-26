import React, { useState } from "react";
import Wrapper from "../BarComponents/Wrapper";
import { Link } from "@inertiajs/react";
import { ShoppingCart, CreditCard, Star } from "lucide-react";
import parse from "html-react-parser";
import ReviewsPage from "@/Review/ReviewsPage";

const ProductDetail = ({ product }) => {
    const defaultProduct = {
        clothes_name: "",
        actual_price: "",
        discount_price: "",
        category: "",
        description: "",
        short_description: "",
        images: [],
    };

    const currentProduct = product || defaultProduct;
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setMainImageIndex(index);
    };

    const handleAddToCart = () => {
        alert("✅ Item added to cart!");
    };

    const handleBuyNow = () => {
        alert("💳 Redirecting to checkout...");
    };

    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28">
                {/* Breadcrumb and Title Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Product Details</h2>
                    <div className="flex items-center gap-1 font-medium text-gray-600">
                        <Link
                            href={`/ecommerce/products`}
                            className="font-semibold text-gray-500 hover:text-gray-700"
                        >
                            Ecommerce
                        </Link>
                        <span className="font-extralight text-gray-500">/</span>
                        <span className="font-extralight text-gray-500">
                            Product Detail
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Thumbnail images */}
                            {currentProduct.images?.length > 1 && (
                                <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
                                    {currentProduct.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`/storage/${img?.image_path}`}
                                            alt={`Product thumbnail ${
                                                index + 1
                                            }`}
                                            className={`h-16 w-16 object-cover cursor-pointer rounded ${
                                                mainImageIndex === index
                                                    ? "ring-2 ring-blue-500"
                                                    : "opacity-70 hover:opacity-100"
                                            }`}
                                            onClick={() =>
                                                handleThumbnailClick(index)
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Main product image */}
                            <div className="flex-1 order-1 md:order-2">
                                <img
                                    src={
                                        currentProduct.images?.length > 0
                                            ? `/storage/${currentProduct.images[mainImageIndex]?.image_path}`
                                            : "/placeholder-product.jpg"
                                    }
                                    alt="Main product"
                                    className="w-full max-h-96 object-contain"
                                />

                                {/* Stylish Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-lg font-extralight">
                                    {currentProduct?.category}
                                </h1>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                                    {currentProduct?.clothes_name}
                                </h2>
                                <div className="space-y-6 mt-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 font-medium">
                                            Price:
                                        </span>
                                        <span className="text-gray-400 line-through text-lg">
                                            ${currentProduct.actual_price} USD
                                        </span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${currentProduct.discount_price} USD
                                        </span>
                                    </div>

                                    <div className="text-gray-600 leading-relaxed">
                                        {parse(currentProduct.description)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <ReviewsPage />
                </div>

                <div>
                    <h2 className="mt-8 text-lg font-semibold">
                        Recent product:
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {/* Product Card */}
                        <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center">
                            <img
                                src="../girl2.png"
                                alt="Wireless Headphone"
                                className="w-24 h-24 object-cover rounded-md"
                            />

                            <div className="flex flex-col justify-between">
                                <h2 className="text-base font-semibold">
                                    Wireless headphone
                                </h2>

                                <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="ml-1 text-sm text-gray-600">
                                        4
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 line-through">
                                        $4500
                                    </span>
                                    <span className="text-sm text-green-600 font-bold">
                                        $3500
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center">
                            <img
                                src="../girl2.png"
                                alt="Smiley Plain T-shirt"
                                className="w-24 h-24 object-cover rounded-md"
                            />

                            <div className="flex flex-col justify-between">
                                <h2 className="text-base font-semibold">
                                    Smiley Plain T-shirt
                                </h2>

                                <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="ml-1 text-sm text-gray-600">
                                        4
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 line-through">
                                        $4500
                                    </span>
                                    <span className="text-sm text-green-600 font-bold">
                                        $3500
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center">
                            <img
                                src="../girl2.png"
                                alt="Wireless Headphone"
                                className="w-24 h-24 object-cover rounded-md"
                            />

                            <div className="flex flex-col justify-between">
                                <h2 className="text-base font-semibold">
                                   Sky Blue color T-shirt
                                </h2>

                                <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="ml-1 text-sm text-gray-600">
                                        4
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 line-through">
                                        $4500
                                    </span>
                                    <span className="text-sm text-green-600 font-bold">
                                        $3500
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default ProductDetail;
