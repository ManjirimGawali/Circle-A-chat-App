import HeroContent from "./HeroContent";
import PhotoCollage from "./PhotoCollage";
import FeatureList from "./FeatureList";
import AuthCard from "../Auth/AuthCard";
import "../../App.css"
interface HeroProps {
    onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
    return (
       <section className="main-section">

            <div className="hero-section">

                <HeroContent
                    onGetStarted={onGetStarted}
                />

                <PhotoCollage />

                <FeatureList />

            </div>


            <div className="auth-section">

                <AuthCard />

            </div>

        </section>
    );
};

export default Hero;