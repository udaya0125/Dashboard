import axios from "axios";
import { LoaderCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const EditForm = ({
    showForm,
    setShowForm,
    editingCustomer,
    setEditingCustomer,
    setReloadTrigger,
    handleUpdate,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [formCustomer, setFormCustomer] = useState({
        customer_name: "",
        image: null,
        email: "",
        phone: "",
        address: "",
        gender: "",
        date_of_birth: "",
        status: "active",
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (editingCustomer) {
            setFormCustomer({
                customer_name: editingCustomer.customer_name,
                image: null,
                email: editingCustomer.email,
                phone: editingCustomer.phone,
                address: editingCustomer.address,
                gender: editingCustomer.gender,
                date_of_birth: editingCustomer.date_of_birth,
                status: editingCustomer.status,
            });
            setImagePreview(editingCustomer.image ? `/storage/${editingCustomer.image}` : null);
        }
    }, [editingCustomer]);

    const resetForm = () => {
        setFormCustomer({
            customer_name: "",
            image: null,
            email: "",
            phone: "",
            address: "",
            gender: "",
            date_of_birth: "",
            status: "active",
        });
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        Object.entries(formCustomer).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                formData.append(key, value);
            }
        });

        try {
            setSubmitting(true);
            await handleUpdate(formData, editingCustomer.id);
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Form submission error", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === "file") {
            const file = files[0];
            setFormCustomer(prev => ({ ...prev, [name]: file }));
            
            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                setImagePreview(editingCustomer?.image ? `/storage/${editingCustomer.image}` : null);
            }
        } else {
            setFormCustomer(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleClose = () => {
        setShowForm(false);
        setEditingCustomer(null);
        resetForm();
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showForm ? "block" : "hidden"}`}>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Edit Customer
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Customer Name */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={formCustomer.customer_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Image
                            </label>
                            <div className="flex items-center gap-4">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-16 h-16 rounded-full object-cover border"
                                    />
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formCustomer.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formCustomer.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formCustomer.date_of_birth}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formCustomer.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formCustomer.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formCustomer.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <LoaderCircle className="animate-spin h-4 w-4" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Customer"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditForm;