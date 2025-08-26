import axios from "axios";
import { LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const JobForm = ({
    showJobForm,
    setShowJobForm,
    setReloadTrigger,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            job_title: "",
            company_name: "",
            location: "",
            experience: "",
            vacancy: "",
            jobtype: "",
            posted_date: "",
            close_date: "",
            description: "",
            responsibilities: "",
            requirements: "",
            qualification: "",
            skill_and_experience: "",
            programming_languages: "",
            position: "",
            type: "full_time",
            status: "active",
        }
    });

    // React Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    // React Quill formats configuration
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

    const handleCreate = async (formData) => {
        try {
            await axios.post(route("jobs.store"), formData);
            setReloadTrigger(prev => !prev);
            setShowJobForm(false);
            reset();
        } catch (error) {
            console.error("Error creating job", error);
            throw error;
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                formData.append(key, value);
            }
        });

        try {
            setSubmitting(true);
            await handleCreate(formData);
        } catch (error) {
            console.error("Form submission error", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowJobForm(false);
        reset();
    };

    // Watch the rich text fields to handle their changes
    const description = watch("description");
    const responsibilities = watch("responsibilities");
    const requirements = watch("requirements");
    const qualification = watch("qualification");
    const skill_and_experience = watch("skill_and_experience");

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showJobForm ? "block" : "hidden"}`}>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Add New Job</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                {...register("job_title", { required: "Job title is required" })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.job_title && (
                                <p className="mt-1 text-sm text-red-600">{errors.job_title.message}</p>
                            )}
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                {...register("company_name", { required: "Company name is required" })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.company_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                {...register("location", { required: "Location is required" })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
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

                        {/* Vacancy */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vacancy
                            </label>
                            <input
                                type="text"
                                {...register("vacancy")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type
                            </label>
                            <select
                                {...register("jobtype")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Job Type</option>
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                                <option value="contract">Contract</option>
                                <option value="temporary">Temporary</option>
                                <option value="internship">Internship</option>
                                <option value="remote">Remote</option>
                            </select>
                        </div>

                        {/* Posted Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Posted Date
                            </label>
                            <input
                                type="date"
                                {...register("posted_date")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Close Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Close Date
                            </label>
                            <input
                                type="date"
                                {...register("close_date")}
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
                                {...register("type", { required: "Type is required" })}
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
                                {...register("status", { required: "Status is required" })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>

                        {/* Description - React Quill */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={(value) => setValue("description", value)}
                                modules={modules}
                                formats={formats}
                                className="border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Responsibilities - React Quill */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Responsibilities
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={responsibilities}
                                onChange={(value) => setValue("responsibilities", value)}
                                modules={modules}
                                formats={formats}
                                className="border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Requirements - React Quill */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Requirements
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={requirements}
                                onChange={(value) => setValue("requirements", value)}
                                modules={modules}
                                formats={formats}
                                className="border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Qualification - React Quill */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Qualification
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={qualification}
                                onChange={(value) => setValue("qualification", value)}
                                modules={modules}
                                formats={formats}
                                className="border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Skills and Experience - React Quill */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skills and Experience
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={skill_and_experience}
                                onChange={(value) => setValue("skill_and_experience", value)}
                                modules={modules}
                                formats={formats}
                                className="border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Programming Languages */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Programming Languages
                            </label>
                            <input
                                type="text"
                                {...register("programming_languages")}
                                placeholder="Comma separated list (e.g., JavaScript, Python, Java)"
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
                                        Creating...
                                    </>
                                ) : (
                                    "Add Job"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobForm;