import { useState } from "react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";
import "../../App.css"
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router-dom";
interface LoginFormProps {
    onSignup: () => void;
}

const LoginForm = ({
    onSignup
}: LoginFormProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleLogin = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
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
                    "Login failed"
                );

                return;
            }

            // Store JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            console.log(
                "Login successful"
            );
             setSuccess(
                "Logged in successfully!"
            );
            navigate("/dashboard");

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
            onSubmit={handleLogin}
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
                icon={<Mail size={21} />}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />


            <AuthInput
                icon={<Lock size={21} />}
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
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
                    ? "Logging in..."
                    : "Login"
                }

                {!loading && (
                    <ArrowRight size={19} />
                )}

            </button>


            <p className="switch-auth">

                Don't have an account?

                <button
                    type="button"
                    onClick={onSignup}
                >
                    Create one
                </button>

            </p>

        </form>
    );
};

export default LoginForm;