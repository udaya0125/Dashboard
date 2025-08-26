import React, { useEffect, useState } from "react";
import Wrapper from "../BarComponents/Wrapper";
import ReactPaginate from "react-paginate";
import {
    ChevronRight,
    Star,
    Plus,
    Search,
    List,
    LayoutGrid,
} from "lucide-react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ClothesForm from "@/AddFormComponemts/ClothesForm";
import axios from "axios";
import { Link } from "@inertiajs/react";

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingProducts, setEditingProducts] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [activeCategory, setActiveCategory] = useState("tshirt");
    const [viewMode, setViewMode] = useState("grid");
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const categories = [
        { label: "T-Shirts", value: "tshirt" },
        { label: "Shirts", value: "shirts" },
        { label: "Jeans", value: "jeans" },
        { label: "Jackets", value: "jackets" }
    ];

    const discountOptions = [
        { label: "Less than 10%", value: 10 },
        { label: "10% or more", value: 10 },
        { label: "20% or more", value: 20 },
        { label: "30% or more", value: 30 },
        { label: "40% or more", value: 40 },
        { label: "50% or more", value: 50 },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(route("product.index"));
                const products = Array.isArray(response.data)
                    ? response.data
                    : response.data.data || [];
                setAllProducts(
                    products.map((product) => ({
                        ...product,
                        image: product.image || [],
                    }))
                );
            } catch (error) {
                console.error("Fetching error", error);
            }
        };
        fetchProducts();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(route("product.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.log("Delete error", error);
        }
    };

    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("product.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Update error", error);
            throw error;
        }
    };

    const handleDiscountChange = (value, index) => {
        setSelectedDiscounts(prev => {
            // For "Less than 10%" (index 0), we need special handling
            if (index === 0) {
                // If it's being selected, we need to ensure no other discounts are selected
                if (prev.includes(value)) {
                    return prev.filter(v => v !== value);
                } else {
                    return [value]; // Only this one can be selected
                }
            } else {
                // For other options, we can't have "Less than 10%" selected
                const newSelected = prev.filter(v => v !== 10); // Remove "Less than 10%" if present
                if (newSelected.includes(value)) {
                    return newSelected.filter(v => v !== value);
                } else {
                    return [...newSelected, value];
                }
            }
        });
        setCurrentPage(0);
    };

    // Filter by search, category, price range, and discount
    const filteredProducts = allProducts.filter((item) => {
        const priceToCheck = item.discount_price || item.actual_price || 0;
        const discountPercentage = item.discount_price && item.actual_price 
            ? Math.round(((item.actual_price - item.discount_price) / item.actual_price * 100))
            : 0;

        // Category and price range filters
        const categoryMatch = activeCategory === "" || item.category === activeCategory;
        const searchMatch = searchQuery === "" ||
            item.clothes_name.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch = priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];

        // Discount filter
        let discountMatch = true;
        if (selectedDiscounts.length > 0) {
            if (selectedDiscounts.includes(10) && discountOptions[0].value === 10) {
                // Special case for "Less than 10%"
                discountMatch = discountPercentage > 0 && discountPercentage < 10;
            } else {
                // For other options ("X% or more")
                discountMatch = selectedDiscounts.some(minDiscount => 
                    discountPercentage >= minDiscount
                );
            }
        }

        return categoryMatch && searchMatch && priceMatch && discountMatch;
    });

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28 bg-[#f8f8fb]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Product Dashboard
                    </h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        <Plus size={18} />
                        Add Products
                    </button>
                </div>

                <ClothesForm
                    showForm={showForm}
                    setShowForm={setShowForm}
                    setReloadTrigger={setReloadTrigger}
                    reloadTrigger={reloadTrigger}
                    handleUpdate={handleUpdate}
                    editingProducts={editingProducts}
                    setEditingProducts={setEditingProducts}
                />

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-[25%] bg-white shadow-lg p-6 rounded-xl border border-gray-100 h-[850px]">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="font-medium mb-3 text-gray-700">
                                    Categories
                                </h3>
                                <div className="flex flex-col gap-2 text-gray-600">
                                    {categories.map((category) => (
                                        <button
                                            key={category.value}
                                            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                                                activeCategory === category.value
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "hover:bg-gray-50 hover:text-gray-800"
                                            }`}
                                            onClick={() => {
                                                setActiveCategory(category.value);
                                                setCurrentPage(0);
                                            }}
                                        >
                                            <ChevronRight size={16} />
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-medium mb-3 text-gray-700">
                                    Price Range
                                </h2>
                                <RangeSlider
                                    min={0}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onInput={(value) => {
                                        setPriceRange(value);
                                        setCurrentPage(0); 
                                    }}
                                    className="mb-4"
                                />
                                <div className="flex justify-between text-sm">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                        ${priceRange[0]}
                                    </span>
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                        ${priceRange[1]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h2 className="font-medium mb-3 text-gray-700">
                                    Discount
                                </h2>
                                <div className="space-y-2">
                                    {discountOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`discount-${index}`}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                checked={selectedDiscounts.includes(option.value)}
                                                onChange={() => handleDiscountChange(option.value, index)}
                                            />
                                            <label
                                                htmlFor={`discount-${index}`}
                                                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-medium mb-3 text-gray-700">
                                    Customer Rating
                                </h2>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <div
                                            key={rating}
                                            className="flex items-center gap-3"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`rating-${rating}`}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor={`rating-${rating}`}
                                                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 cursor-pointer"
                                            >
                                                {rating}{" "}
                                                {rating !== 1 && " & Above"}
                                                <div className="flex ml-1">
                                                    {[...Array(rating)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {categories.find(c => c.value === activeCategory)?.label || "All Products"} ({filteredProducts.length} items)
                            </h3>

                            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative w-full md:w-72">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(0); 
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg border transition-colors ${
                                            viewMode === "list"
                                                ? "bg-blue-50 border-blue-400 text-blue-600"
                                                : "border-gray-300 hover:bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg border transition-colors ${
                                            viewMode === "grid"
                                                ? "bg-blue-50 border-blue-400 text-blue-600"
                                                : "border-gray-300 hover:bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {currentItems.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No products found matching your criteria</p>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={
                                        viewMode === "grid"
                                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                            : "space-y-6"
                                    }
                                >
                                    {currentItems.map((item) => (
                                        <Link href={`/ecommerce/${item.slug}`}
                                            key={item.id}
                                            className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
                                                viewMode === "list" ? "flex" : ""
                                            }`}
                                        >
                                            <div
                                                className={`relative ${
                                                    viewMode === "list"
                                                        ? "w-1/3 pb-[30%]"
                                                        : "pb-[100%]"
                                                }`}
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
                                                    <img
                                                        src={`/storage/${item?.images[0]?.image_path}`}
                                                        alt={item.clothes_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {item.discount_price && item.actual_price && (
                                                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                        {Math.round(((item.actual_price - item.discount_price) / item.actual_price * 100))}% OFF
                                                    </span>
                                                )}
                                            </div>

                                            <div
                                                className={`p-4 ${
                                                    viewMode === "list"
                                                        ? "w-2/3 flex flex-col justify-center"
                                                        : "flex flex-col items-center justify-center"
                                                }`}
                                            >
                                                <h3 className="font-medium text-gray-800 mb-1">
                                                    {item.clothes_name}
                                                </h3>
                                                <h2 className="font-light text-gray-800 mb-1">
                                                    {item.short_description}
                                                </h2>

                                                <div className="flex gap-2 items-center">
                                                    <span className="font-bold text-gray-900">
                                                        ${item.discount_price || item.actual_price}
                                                    </span>
                                                    {item.discount_price && item.actual_price && (
                                                        <>
                                                            <span className="text-sm text-gray-500 line-through">
                                                                ${item.actual_price}
                                                            </span>
                                                            {/* <span className="text-sm font-medium text-green-600 ml-1">
                                                                {Math.round(((item.actual_price - item.discount_price) / item.actual_price * 100))}% OFF
                                                            </span> */}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pageCount > 1 && (
                                    <div className="mt-6 flex justify-center">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Next ›"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            marginPagesDisplayed={1}
                                            pageCount={pageCount}
                                            previousLabel="‹ Prev"
                                            containerClassName="flex gap-2"
                                            pageClassName="px-3 py-1 border rounded cursor-pointer"
                                            activeClassName="bg-blue-500 text-white"
                                            previousClassName="px-3 py-1 border rounded cursor-pointer"
                                            nextClassName="px-3 py-1 border rounded cursor-pointer"
                                            disabledClassName="opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Products;