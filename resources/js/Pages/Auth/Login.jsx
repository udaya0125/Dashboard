import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 ">
                <div
                    className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80')] bg-cover bg-center z-0"
                    style={{ filter: "brightness(0.6)" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/40 to-gray-900/60 z-10"></div>

                <div className="relative w-full max-w-md z-20">
                    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Login
                            </h1>
                            <p className="text-white/80 text-sm">
                                Welcome back please login to your account
                            </p>
                        </div>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
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

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-white/80">
                                        Remember me
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-white/80 text-sm hover:text-white hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 mt-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-100"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-center mt-4">
                                <span className="text-white/80 text-sm">
                                    Don't have an account?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-white font-semibold hover:underline transition-all duration-300"
                                    >
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                        </form>
                        <div className="text-center mt-8 pt-6 border-t border-white/10">
                            <p className="text-white/60 text-xs">
                                Created by{" "}
                                <span className="font-semibold">
                                    Sait
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}