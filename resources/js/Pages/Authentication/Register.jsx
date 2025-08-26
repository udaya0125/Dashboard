import React, { useState } from "react";
import { Facebook, Twitter, Eye, EyeOff, Heart } from "lucide-react";
import { Link } from "@inertiajs/react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full flex flex-col gap-3">
                {/* Header */}
                <div className="bg-blue-400 p-5 flex justify-between items-center w-full rounded-lg">
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-lg text-white">
                            Free Register
                        </h2>
                        <span className="text-sm text-blue-100">
                            Get your free Skote account now.
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

                {/* Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col gap-4">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <div>
                            <button
                                type="button"
                                onClick={() => console.log("Register clicked")}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6">
                        <p className="text-center text-sm text-gray-600 mb-4">
                            Sign up using
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                <span className="font-bold">G</span>
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            By registering you agree to the Skote{" "}
                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-500"
                            >
                                Terms of Use
                            </a>
                        </p>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href={`/auth/login`}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 flex justify-center mt-2 items-center gap-1">
                    © 2025 Skote. Crafted with
                    <Heart className="w-3 h-3 text-red-500 fill-current" />
                    by Themesbrand
                </div>
            </div>
        </div>
    );
};

export default Register;
