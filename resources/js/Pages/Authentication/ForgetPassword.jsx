import React from "react";
import { Link } from "@inertiajs/react";

const ForgetPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-blue-400 p-5 flex justify-between items-center w-full rounded-lg">
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-lg text-white">
                            Reset Password
                        </h2>
                        <span className="text-sm text-blue-100">
                            Recover your Skote account
                        </span>
                    </div>
                    <div className="flex">
                        <img
                            src="../img.png"
                            alt="Welcome"
                            className="h-28 w-auto object-cover"
                        />
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <form className="space-y-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-6">
                                Enter your email and instructions will be sent to you!
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Reset Password
                            </button>
                        </div>

                        <div className="text-center text-sm">
                            <p className="text-gray-600">
                                Remember your password?{" "}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="text-center text-xs text-gray-500 mt-4">
                    © 2025 Skote. Crafted with{" "}
                    <span className="text-red-500">❤</span> by Themesbrand
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;