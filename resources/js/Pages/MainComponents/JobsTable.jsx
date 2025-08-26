import JobForm from "@/AddFormComponemts/JobForm";
import JobEditForm from "@/EditFormComponents/JobEditForm";
import { Link } from "@inertiajs/react";
import axios from "axios";
import {
    ArrowDownUp,
    EllipsisVertical,
    Eye,
    LoaderCircle,
    PenBoxIcon,
    Plus,
    Search,
    Trash,
    Upload,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Wrapper from "../BarComponents/Wrapper";

const JobTable = () => {
    const [showJobForm, setShowJobForm] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(route("jobs.index"));
                setAllJobs(response.data || []);
            } catch (error) {
                console.error("fetching error", error);
                setAllJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?"))
            return;

        try {
            await axios.delete(route("jobs.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        setShowJobForm(true);
    };

    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            const response = await axios.post(
                route("jobs.update", { id }),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setReloadTrigger((prev) => !prev);
            return response.data;
        } catch (error) {
            console.error("Error updating job", error);
            throw error;
        }
    };

    const handleImportExport = () => {
        // Export functionality
        const dataToExport = filteredJobs.map((job) => ({
            ID: job.id || "",
            Title: job.job_title || "",
            Company: job.company_name || "",
            Location: job.location || "",
            Experience: job.experience || "",
            Position: job.position || "",
            Type: job.type || "",
            Status: job.status || "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
        XLSX.writeFile(workbook, "jobs_data.xlsx");
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredJobs = allJobs
        .filter((job) => {
            const title = job.job_title ? job.job_title.toLowerCase() : "";
            const company = job.company_name
                ? job.company_name.toLowerCase()
                : "";
            const location = job.location ? job.location.toLowerCase() : "";
            const type = job.type ? job.type.toLowerCase() : "";
            const query = searchQuery.toLowerCase();

            return (
                title.includes(query) ||
                company.includes(query) ||
                location.includes(query) ||
                type.includes(query)
            );
        })
        .sort((a, b) => {
            if (sortOption === "low") {
                return a.id - b.id;
            } else if (sortOption === "high") {
                return b.id - a.id;
            } else if (sortOption === "title-asc") {
                return (a.job_title || "").localeCompare(b.job_title || "");
            } else if (sortOption === "title-desc") {
                return (b.job_title || "").localeCompare(a.job_title || "");
            }
            return 0;
        });

    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28">
                <div className="">
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Job Listings</h2>
                        <p className="text-lg text-gray-600">
                            Manage and organize all job opportunities in one place
                        </p>
                    </div>

                    <JobForm
                        showJobForm={showJobForm && !editingJob}
                        setShowJobForm={setShowJobForm}
                        setReloadTrigger={setReloadTrigger}
                    />

                    {editingJob && (
                        <JobEditForm
                            editingJob={editingJob}
                            setEditingJob={setEditingJob}
                            setShowJobForm={setShowJobForm}
                            setReloadTrigger={setReloadTrigger}
                            handleUpdate={handleUpdate}
                        />
                    )}

                    <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:justify-between lg:items-center">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setReloadTrigger((prev) => !prev)}
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <LoaderCircle className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-700">Refresh</span>
                            </button>

                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                                <ArrowDownUp className="h-4 w-4 text-gray-600" />
                                <select
                                    className="border-none focus:ring-0 bg-transparent text-sm text-gray-700 cursor-pointer"
                                    aria-label="Sort Options"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="">Sort By</option>
                                    <option value="low">ID Low to High</option>
                                    <option value="high">ID High to Low</option>
                                    <option value="title-asc">Title A-Z</option>
                                    <option value="title-desc">Title Z-A</option>
                                </select>
                            </div>
                        </div>

                        <form className="relative w-full sm:w-72">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>

                        <div className="flex flex-wrap gap-3 justify-start sm:justify-end">
                            <button
                                onClick={() => {
                                    setShowJobForm(true);
                                    setEditingJob(null);
                                }}
                                className="flex items-center gap-2 bg-[#7c3aed] text-white py-2.5 px-5 rounded-lg text-sm hover:bg-purple-700 transition-colors shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add New Job
                            </button>
                            <button
                                onClick={handleImportExport}
                                className="flex items-center gap-2 bg-white py-2.5 px-5 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <Upload className="h-4 w-4" />
                                Import/Export
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="flex flex-col items-center">
                                    <LoaderCircle className="animate-spin h-10 w-10 text-purple-600 mb-3" />
                                    <p className="text-gray-600">Loading job listings...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr className="text-left text-gray-700">
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Experience
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Position
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 font-medium text-sm uppercase tracking-wider text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredJobs.length > 0 ? (
                                            filteredJobs.map((job, index) => (
                                                <tr
                                                    key={job.id || index}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {job.id || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {job.job_title || "-"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-700">
                                                            {job.company_name || "-"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {job.location || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {job.experience || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {job.position || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                                            {job.type
                                                                ? job.type
                                                                      .replace("_", " ")
                                                                      .toUpperCase()
                                                                : "-"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                                job.status === "active"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : job.status === "new"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : job.status === "close"
                                                                    ? "bg-red-100 text-red-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                        >
                                                            {job.status?.toUpperCase() || "UNKNOWN"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-1">
                                                            <Link
                                                                href={route('jobs.show', { slug: job.slug })}
                                                                className="p-2 text-purple-600 hover:text-purple-900 rounded hover:bg-purple-50 transition-colors"
                                                                aria-label="View job details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleEdit(job)}
                                                                className="p-2 text-purple-600 hover:text-purple-900 rounded hover:bg-purple-50 transition-colors"
                                                                aria-label="Edit job"
                                                            >
                                                                <PenBoxIcon className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => job.id && handleDelete(job.id)}
                                                                className="p-2 text-red-600 hover:text-red-900 rounded hover:bg-red-50 transition-colors"
                                                                aria-label="Delete job"
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="9"
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <Search className="h-12 w-12 mb-4 text-gray-300" />
                                                        <p className="text-lg font-medium mb-1">
                                                            No jobs found
                                                        </p>
                                                        <p className="text-sm">
                                                            Try adjusting your search or filter to find what you're looking for.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {filteredJobs.length > 0 && (
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <div>
                                Showing <span className="font-medium">1</span> to{" "}
                                <span className="font-medium">{filteredJobs.length}</span> of{" "}
                                <span className="font-medium">{filteredJobs.length}</span> results
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
                                    Previous
                                </button>
                                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default JobTable;