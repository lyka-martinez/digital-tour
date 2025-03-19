import { ArrowDownRight } from 'lucide-react';

type ButtonProps = {
    text: string;
    onClick?: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            className="btn btn-lg h-[3.25rem] w-fit font-medium pl-9 pr-6 gap-3 rounded-md duration-200 trasition-all bg-brnd-secondary text-white border-2 border-brnd-secondary hover:bg-base-200 hover:text-brnd-secondary drop-shadow-sm"
            onClick={onClick}
        >
            {text}
            <ArrowDownRight />
        </button>
    );
}