import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <div className="app">

            <Navbar />
            <Hero onGetStarted={() => {}} />

        </div>
    );
};

export default Home;