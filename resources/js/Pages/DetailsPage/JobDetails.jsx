import React from "react";
import Wrapper from "../BarComponents/Wrapper";
import { Link } from "@inertiajs/react";
import parse from "html-react-parser";

import { Phone, Mail, Globe, MapPin, Building2 } from "lucide-react";
import { ListRenderer } from "@/AddFormComponemts/ListRenderer";

const JobDetails = ({ job }) => {
    return (
        <Wrapper>
            <div className="py-6 px-4 md:px-6 lg:px-10 w-full md:w-[82%] ml-auto mt-20 md:mt-0 pt-28 h-[160rem]">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <h2 className="text-lg font-semibold mb-2 md:mb-0">
                        Job Details
                    </h2>
                    <div className="flex items-center gap-1 font-medium text-gray-600">
                        <Link
                            href={`/jobs/list`}
                            className="font-semibold text-gray-500 hover:text-gray-700"
                        >
                            Job
                        </Link>
                        <span className="font-extralight text-gray-500">/</span>
                        <span className="font-extralight text-gray-500">
                            Job Detail
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    <div className="w-full lg:w-[35%] space-y-6">
                        <div className="bg-white shadow-md rounded-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Overview
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Job Title
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.job_title}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Experience
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.experience}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Vacancy
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.vacancy}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Job Type
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.jobtype}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Status
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Posted Date
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.posted_date}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-600">
                                        Close Date
                                    </span>
                                    <span className="text-gray-800">
                                        {job?.close_date}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                    Apply Now
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                    Contact Us
                                </button>
                            </div>
                        </div>

                        {/* Company Info Card */}
                        <div className="bg-white shadow-md rounded-md p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-gray-400">
                                    <img
                                        src=""
                                        alt="Company Logo"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Themesbrand
                                </h2>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <span>Since July 2017</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phone
                                        </p>
                                        <p className="text-gray-800">
                                            +589 560 56555
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="text-gray-800">
                                            themesbrand@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Website
                                        </p>
                                        <p className="text-gray-800">
                                            www.themesbrand.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Location
                                        </p>
                                        <p className="text-gray-800">
                                            Oakridge Lane Richardson.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-[65%] bg-white shadow-md rounded-md p-6">
                        <div className="flex flex-row gap-4 items-start border-b-2 border-gray-200 pb-6">
                            <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                                {job?.company_logo ? (
                                    <img
                                        src={job.company_logo}
                                        alt="company logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Building2 size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {job?.job_title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600 mt-2 flex-wrap">
                                    <span className="flex items-center gap-1 text-sm">
                                        <Building2 size={12} />
                                        <span className="font-medium">
                                            {job?.company_name}
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <MapPin size={12} />
                                        <span>{job?.location}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-6">
                            {job?.description && (
                                // <div>
                                //     <h2 className="text-lg font-semibold mb-2">
                                //         Description
                                //     </h2>
                                //     <div className="prose max-w-none">
                                //         {parse(job.description)}
                                //     </div>
                                // </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Description
                                    </h2>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: job.description,
                                        }}
                                    />
                                </div>
                            )}

                            {job?.responsibilities && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Responsibilities:
                                    </h2>
                                    <ListRenderer htmlContent={job.responsibilities}/>
                                </div>
                            )}
                            {/* //className="prose max-w-none" */}

                            {job?.requirements && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Requirements:
                                    </h2>
                                    <ListRenderer htmlContent={job.requirements}/>
                                </div>
                            )}

                            {job?.qualification && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Qualification:
                                    </h2>
                                    <div className="prose max-w-none">
                                        {parse(job.qualification)}
                                    </div>
                                </div>
                            )}

                            {job?.skill_and_experience && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Skill & Experience:
                                    </h2>
                                    <ListRenderer htmlContent={job.skill_and_experience}/>
                                </div>
                            )}

                            {job?.programming_languages && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Programming Languages:
                                    </h2>
                                    <div className="prose max-w-none">
                                        {parse(job.programming_languages)}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-600 mb-3">
                                    Share this Job:
                                </h3>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                                        Facebook
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm">
                                        Google+
                                    </button>
                                    <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors text-sm">
                                        LinkedIn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default JobDetails;