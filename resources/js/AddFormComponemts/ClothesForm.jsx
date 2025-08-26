import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ClothesForm = ({
    setShowForm,
    showForm,
    setReloadTrigger,
    reloadTrigger,
    handleUpdate,
    editingProducts,
    setEditingProducts,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [productForm, setProductForm] = useState({
        clothes_name: "",
        actual_price: "",
        discount_price: "",
        category: "",
        description: "",
        short_description: "",
        image: null,
    });

    useEffect(() => {
        if (editingProducts) {
            setProductForm({
                clothes_name: editingProducts.clothes_name || "",
                actual_price: editingProducts.actual_price || "",
                discount_price: editingProducts.discount_price || "",
                category: editingProducts.category || "",
                description: editingProducts.description || "",
                short_description: editingProducts.short_description || "",
                image: null,
            });
        } else {
            setProductForm({
                clothes_name: "",
                actual_price: "",
                discount_price: "",
                category: "",
                description: "",
                short_description: "",
                image: null,
            });
        }
    }, [editingProducts]);

    const validatePrices = () => {
        if (productForm.discount_price && productForm.actual_price) {
            return parseFloat(productForm.discount_price) < parseFloat(productForm.actual_price);
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePrices()) {
            alert("Discount price must be less than actual price");
            return;
        }
        
        setSubmitting(true);
        
        try {
            const formData = new FormData();
            
            formData.append('clothes_name', productForm.clothes_name);
            formData.append('actual_price', productForm.actual_price);
            formData.append('discount_price', productForm.discount_price);
            formData.append('category', productForm.category);
            formData.append('description', productForm.description);
            formData.append('short_description', productForm.short_description);

            if (productForm.image) {
                if (Array.isArray(productForm.image)) {
                    productForm.image.forEach((file) => {
                        formData.append('images[]', file);
                    });
                } else {
                    formData.append('images[]', productForm.image);
                }
            }

            if (editingProducts) {
                formData.append('_method', 'PUT');
                await handleUpdate(formData, editingProducts.id);
            } else {
                await axios.post(route("product.store"), formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setProductForm({
                clothes_name: "",
                actual_price: "",
                discount_price: "",
                description: "",
                category: "",
                short_description: "",
                image: null,
            });
            setShowForm(false);
            setEditingProducts(null);
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error saving data", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (files) {
            setProductForm(prev => ({
                ...prev,
                [name]: files.length > 1 ? Array.from(files) : files[0]
            }));
        } else {
            setProductForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDescriptionChange = (value) => {
        setProductForm(prev => ({
            ...prev,
            description: value
        }));
    };

    // Quill modules and formats configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    const calculateDiscountPercentage = () => {
        if (productForm.actual_price && productForm.discount_price) {
            return Math.round(((productForm.actual_price - productForm.discount_price) / productForm.actual_price * 100));
        }
        return 0;
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
            showForm ? "block" : "hidden"
        }`}>
            <div className="relative px-6 py-6 rounded-xl w-full max-w-lg h-[600px] overflow-y-auto bg-white shadow-md">
                <button
                    onClick={() => {
                        setShowForm(false);
                        setEditingProducts(null);
                    }}
                    className="absolute top-4 right-4"
                    aria-label="Close form"
                    type="button"
                >
                    <X />
                </button>

                <h2 className="text-center text-xl font-medium mb-6">
                    {editingProducts ? "Edit Product" : "Add New Product"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="clothes_name"
                            value={productForm.clothes_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            {editingProducts ? "Update Image (optional)" : "Product Images"}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            multiple={!editingProducts}
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="category"
                            onChange={handleChange}
                            value={productForm.category}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          
                        >
                            <option value="">Select Category</option>
                            <option value="tshirt">T-Shirt</option>
                            <option value="shirts">Shirts</option>
                            <option value="jeans">Jeans</option>
                            <option value="jackets">Jackets</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="actual_price" className="block text-sm font-medium text-gray-700 mb-1">
                            Actual Price
                        </label>
                        <input
                            type="number"
                            id="actual_price"
                            name="actual_price"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={productForm.actual_price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           
                        />
                    </div>

                    <div>
                        <label htmlFor="discount_price" className="block text-sm font-medium text-gray-700 mb-1">
                            Discounted Price
                        </label>
                        <input
                            type="number"
                            id="discount_price"
                            name="discount_price"
                            min="0"
                            max={productForm.actual_price || ""}
                            step="0.01"
                            onChange={handleChange}
                            value={productForm.discount_price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          
                        />
                        {productForm.actual_price && productForm.discount_price && (
                            <div className="text-sm text-green-600 mt-1">
                                {calculateDiscountPercentage()}% OFF
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description
                        </label>
                        <input
                            type="text"
                            id="short_description"
                            name="short_description"
                            onChange={handleChange}
                            value={productForm.short_description}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={productForm.description}
                            onChange={handleDescriptionChange}
                            modules={modules}
                            formats={formats}
                            className="bg-white rounded-md"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={submitting}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {submitting ? "Processing..." : editingProducts ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClothesForm;