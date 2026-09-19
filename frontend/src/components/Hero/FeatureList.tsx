import {
    MessageCircle,
    Users,
    ShieldCheck
} from "lucide-react";
import "../../App.css"
const FeatureList = () => {
    return (
        <div
            className="feature-row"
            id="features"
        >

            <div className="feature">

                <MessageCircle size={28} />

                <div>
                    <strong>
                        Meaningful
                    </strong>

                    <span>
                        Conversations
                    </span>
                </div>

            </div>


            <div className="feature">

                <Users size={28} />

                <div>
                    <strong>
                        A Friendly
                    </strong>

                    <span>
                        Community
                    </span>
                </div>

            </div>


            <div className="feature">

                <ShieldCheck size={28} />

                <div>
                    <strong>
                        Safe &
                    </strong>

                    <span>
                        Private
                    </span>
                </div>

            </div>

        </div>
    );
};

export default FeatureList;