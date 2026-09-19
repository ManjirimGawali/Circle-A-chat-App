import { useState } from "react";
import {
    Users,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import AuthInput from "./AuthInput";
import "../../App.css"
interface SignupFormProps {
    onLogin: () => void;
}

const SignupForm = ({
    onLogin
}: SignupFormProps) => {

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleSignup = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                setError(
                    data.message ||
                    "Signup failed"
                );

                return;
            }

            setSuccess(
                "Account created successfully!"
            );

            setUsername("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                onLogin();
            }, 1200);

        } catch (error) {

            setError(
                "Unable to connect to server."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSignup}
        >

            {error && (
                <div className="message error">
                    {error}
                </div>
            )}

            {success && (
                <div className="message success">
                    {success}
                </div>
            )}


            <AuthInput
                icon={<Users size={21} />}
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />


            <AuthInput
                icon={<Mail size={21} />}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />


            <AuthInput
                icon={<Lock size={21} />}
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
                rightElement={
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                    >
                        {showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />
                        }
                    </button>
                }
            />


            <button
                type="submit"
                className="auth-button"
                disabled={loading}
            >

                {loading
                    ? "Creating account..."
                    : "Create Account"
                }

                {!loading && (
                    <ArrowRight size={19} />
                )}

            </button>


            <p className="switch-auth">

                Already have an account?

                <button
                    type="button"
                    onClick={onLogin}
                >
                    Login
                </button>

            </p>

        </form>
    );
};

export default SignupForm;