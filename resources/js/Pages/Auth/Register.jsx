import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="grid grid-cols-1 md:grid-cols-2  justify-center items-center">
                <div className="col-span-1 relative md:min-h-[35rem] mb-8 md:mb-0">
                    <div className="w-full h-full flex justify-center">
                        <img
                            src="/register.png"
                            alt="Create account"
                            className="w-full max-w-[25rem] h-[25rem] md:h-[35rem] object-cover object-center shadow-md rounded-l-xl"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:pl-16 text-center md:text-left p-4">
                        <div className="text-white p-6 rounded-lg">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                                Create your
                                <br />
                                Account
                            </h1>
                            <p className="text-lg md:text-xl text-blue-100 font-light">
                                Share your artwork
                                <br />
                                and Get projects!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-r-xl p-6 md:p-8">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? "text"
                                                : "password"
                                        }
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <Link
                                    href={route("login")}
                                        
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation
                                            )
                                        }
                                    >
                                        {showPasswordConfirmation ? (
                                            <Eye />
                                        ) : (
                                            <EyeOff />
                                        )}
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black mt-2 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                                >
                                    Register
                                </button>
                                <div className="flex items-center my-4">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-4 text-gray-500 text-sm">
                                        or
                                    </span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        <img
                                            src="/google.png "
                                            alt=""
                                            className="h-8 w-8"
                                        />
                                        Sign up with Google
                                    </button>
                                </div>
                                <div className="text-center text-sm text-gray-600 mt-4">
                                    Already have an account?{" "}
                                    <Link
                                        href={route("login")}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Log in
                                    </Link>
                                </div>

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            {/* <div className="mt-4 flex items-center justify-end">
                                <Link
                                    href={route("login")}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
