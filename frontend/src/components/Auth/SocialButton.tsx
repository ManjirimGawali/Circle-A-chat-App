const SocialButtons = () => {
    return (
        <>
            <div className="divider">
                <span></span>
                <p>OR</p>
                <span></span>
            </div>

            <button
                type="button"
                className="social-button"
            >
                <span className="google-icon">
                    G
                </span>

                Continue with Google
            </button>

            <button
                type="button"
                className="social-button"
            >
                <span className="apple-icon">
                    ●
                </span>

                Continue with Apple
            </button>
        </>
    );
};

export default SocialButtons;