import { ArrowRight } from "lucide-react";
import "../../App.css"
interface HeroContentProps {
    onGetStarted: () => void;
}

const HeroContent = ({
    onGetStarted
}: HeroContentProps) => {

    return (
        <div className="hero-content">

            <p className="eyebrow">
                A WARMER INTERNET
            </p>

            <h1 className="hero-title1">
                For People
            </h1>

            <p className="hero-description">
                Real people. Real conversations.
                <br />
                A simpler, kinder space to connect,
                <br />
                share and belong.
            </p>

            <button
                className="get-started-button"
                onClick={onGetStarted}
            >
                Get Started

                <ArrowRight size={18} />
            </button>

        </div>
    );
};

export default HeroContent;