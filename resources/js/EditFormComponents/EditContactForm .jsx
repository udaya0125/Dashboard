import axios from "axios";
import { LoaderCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditContactForm = ({
    showContactForm,
    setShowContactForm,
    editingContact,
    setEditingContact,
    setReloadTrigger,
    handleUpdate,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [backendErrors, setBackendErrors] = useState({});

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            tags: "",
            project: "",
            status: "active",
            image: null,
        },
    });

    // Watch image file to show preview
    const imageFile = watch("image");

    useEffect(() => {
        if (editingContact) {
            // Set form values for editing
            setValue("name", editingContact.name);
            setValue("email", editingContact.email);
            setValue("tags", editingContact.tags);
            setValue("project", editingContact.project);
            setValue("status", editingContact.status);
            if (editingContact.image_url) {
                setPreviewImage(editingContact.image_url);
            }
        }
    }, [editingContact, setValue]);

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            setPreviewImage(URL.createObjectURL(file));
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            setBackendErrors({});
            clearErrors();

            const formData = new FormData();

            formData.append("name", data.name.trim());
            formData.append("email", data.email.trim());
            formData.append("status", data.status);

            if (data.tags) formData.append("tags", data.tags);
            if (data.project) formData.append("project", data.project);
            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            await handleUpdate(formData, editingContact.id);
            resetForm();
            setShowContactForm(false);
        } catch (error) {
            console.error("Form submission error", error);

            if (error.response?.data?.errors) {
                setBackendErrors(error.response.data.errors);

                if (error.response.data.errors.name) {
                    setError("name", {
                        type: "server",
                        message: error.response.data.errors.name[0],
                    });
                }
                if (error.response.data.errors.email) {
                    setError("email", {
                        type: "server",
                        message: error.response.data.errors.email[0],
                    });
                }
            }
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        reset();
        setPreviewImage(null);
        setBackendErrors({});
    };

    const handleClose = () => {
        setShowContactForm(false);
        setEditingContact(null);
        resetForm();
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showContactForm ? "block" : "hidden"}`}
        >
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Edit Contact
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Image
                            </label>
                            <div className="flex items-center gap-4">
                                {previewImage && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <label className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        {...register("image")}
                                    />
                                    <div className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-center">
                                        {previewImage
                                            ? "Change Image"
                                            : "Select Image"}
                                    </div>
                                </label>
                            </div>
                            {backendErrors.image && (
                                <p className="mt-1 text-sm text-red-600">
                                    {backendErrors.image[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name *
                            </label>
                            <input
                                type="text"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.name ? "border-red-500" : ""
                                }`}
                                {...register("name", {
                                    required: "Name is required",
                                    validate: (value) =>
                                        value.trim() !== "" ||
                                        "Name cannot be empty",
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.email ? "border-red-500" : ""
                                }`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("tags")}
                                placeholder="Comma separated tags"
                            />
                            {backendErrors.tags && (
                                <p className="mt-1 text-sm text-red-600">
                                    {backendErrors.tags[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("project")}
                            />
                            {backendErrors.project && (
                                <p className="mt-1 text-sm text-red-600">
                                    {backendErrors.project[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status *
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("status", {
                                    required: "Status is required",
                                })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="archived">Archived</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
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
                                        Processing...
                                    </>
                                ) : (
                                    "Update Contact"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditContactForm;
