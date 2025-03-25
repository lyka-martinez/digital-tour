import { ArrowDownRight } from 'lucide-react';

type ButtonProps = {
    text: string;
    onClick?: () => void;
    isActive?: boolean;
}

/* Landing Page Button */
export function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            className="btn text-base h-[2.625rem] md:btn-lg md:h-[3.25rem] w-fit font-medium pl-9 pr-6 gap-3 rounded-md duration-200 trasition-all bg-brnd-secondary text-white border-2 border-brnd-secondary hover:bg-base-200 hover:text-brnd-secondary shadow-sm"
            onClick={onClick}
        >
            {text}
            <ArrowDownRight />
        </button>
    );
}

/* Accordion Item Button */
export function AccordionButton({ text, onClick, isActive }: ButtonProps) {
    return (
        <button
            className={`btn btn-block rounded-md border hover:bg-brnd-primary hover:border-brnd-primary hover:text-base-100 active:bg-brnd-primary-50 active:border-brnd-primary-50 ${
                isActive
                    ? "bg-brnd-primary text-brnd-light border-brnd-primary-50"
                    : "border border-brnd-muted text-brnd-secondary bg-transparent"
            }`}

            onClick={onClick}
        >
            {text}
        </button>
    );
}