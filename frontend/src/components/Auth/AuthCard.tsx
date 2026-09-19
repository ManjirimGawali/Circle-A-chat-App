import { useState } from "react";
import "../../App.css"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import SocialButtons from "./SocialButton";

type AuthMode = "login" | "signup";

const AuthCard = () => {

    const [mode, setMode] =
        useState<AuthMode>("login");

    return (
        <div className="auth-card">

            <div className="auth-heading">

                <h2>
                    {mode === "login"
                        ? "Welcome Back"
                        : "Create Account"
                    }
                </h2>

                <p>
                    {mode === "login"
                        ? "Login to continue to Circle."
                        : "Join Circle and start connecting."
                    }
                </p>

            </div>


            {mode === "login" ? (
                <LoginForm
                    onSignup={() =>
                        setMode("signup")
                    }
                />
            ) : (
                <SignupForm
                    onLogin={() =>
                        setMode("login")
                    }
                />
            )}


        </div>
    );
};

export default AuthCard;