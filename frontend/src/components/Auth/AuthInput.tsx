import type { ReactNode } from "react";
import "../../App.css"
interface AuthInputProps {
    icon: ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    rightElement?: ReactNode;
}

const AuthInput = ({
    icon,
    type,
    placeholder,
    value,
    onChange,
    rightElement
}: AuthInputProps) => {

    return (
        <div className="input-container">

            <div className="input-icon">
                {icon}
            </div>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />

            {rightElement}

        </div>
    );
};

export default AuthInput;