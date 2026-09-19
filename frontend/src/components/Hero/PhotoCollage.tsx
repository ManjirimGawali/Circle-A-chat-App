import "../../App.css"
const PhotoCollage = () => {
    return (
        <div className="photo-collage">

            {/* Main image */}
            <div className="photo photo-main">
                <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
                    alt="Beautiful landscape"
                />
            </div>


            {/* Quote */}
            <div className="quote-card">

                <p>
                    Good
                    <br />
                    Chats.
                    <br />
                    Brighter
                    <br />
                    Days.
                </p>

                <span>♡</span>

            </div>


            {/* Coffee */}
            <div className="photo photo-coffee">

                <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85"
                    alt="Coffee"
                />

            </div>


            {/* Bottom image */}
            <div className="photo photo-bottom">

                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85"
                    alt="Coastal landscape"
                />

            </div>


           

        </div>
    );
};

export default PhotoCollage;