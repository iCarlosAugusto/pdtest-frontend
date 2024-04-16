import "./button.css";

interface ButtonProps {
    onClick: () => void;
    label: string;
    isLoading?: boolean;
}

const Button = ({onClick, label, isLoading}: ButtonProps) => {
    return (
        <button className="button" onClick={onClick}>
            {label}
        </button>
    )
}

export { Button }