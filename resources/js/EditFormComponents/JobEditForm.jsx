import axios from "axios";
import { LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const JobEditForm = ({
    editingJob,
    setEditingJob,
    setShowJobForm,
    setReloadTrigger,
    handleUpdate,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            job_title: editingJob?.job_title || "",
            company_name: editingJob?.company_name || "",
            location: editingJob?.location || "",
            experience: editingJob?.experience || "",
            position: editingJob?.position || "",
            type: editingJob?.type || "full_time",
            status: editingJob?.status || "active",
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                formData.append(key, value);
            }
        });

        try {
            setSubmitting(true);
            await handleUpdate(formData, editingJob.id);
            reset();
            setShowJobForm(false);
            setEditingJob(null);
        } catch (error) {
            console.error("Form submission error", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowJobForm(false);
        setEditingJob(null);
        reset();
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
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
                        Edit Job
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Job Title */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                {...register("job_title", {
                                    required: "Job title is required",
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.job_title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.job_title.message}
                                </p>
                            )}
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                {...register("company_name", {
                                    required: "Company name is required",
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.company_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.company_name.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                {...register("location", {
                                    required: "Location is required",
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience
                            </label>
                            <input
                                type="text"
                                {...register("experience")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Position
                            </label>
                            <input
                                type="text"
                                {...register("position")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type *
                            </label>
                            <select
                                {...register("type", {
                                    required: "Type is required",
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                                <option value="freelance">Freelance</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status *
                            </label>
                            <select
                                {...register("status", {
                                    required: "Status is required",
                                })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="new">New</option>
                                <option value="close">Close</option>
                            </select>
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
                                    "Update Job"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobEditForm;
