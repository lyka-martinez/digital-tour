import { ArrowDownRight } from 'lucide-react';

type ButtonProps = {
    text: string;
    onClick?: () => void;
}

/* Landing Page Button */
export function Button({ text, onClick }: ButtonProps) {
    return (
        <button
        className="btn btn-lg h-[3.25rem] w-fit font-medium pl-9 pr-6 gap-3 rounded-md duration-200 trasition-all bg-brnd-secondary text-white border-2 border-brnd-secondary hover:bg-base-200 hover:text-brnd-secondary shadow-sm"
        onClick={onClick}
        >
            {text}
            <ArrowDownRight />
        </button>
    );
}

/* Accordion Item Button */
export function AccordionButton({ text, onClick }: ButtonProps) {
    return (
        <button
            className="btn btn-block rounded-md border border-brnd-muted text-brnd-secondary bg-transparent hover:bg-brnd-primary hover:border-brnd-primary hover:text-brnd-light active:bg-brnd-primary active:border-brnd-secondary active:text-brnd-light"
            onClick={onClick}
        >
            {text}
        </button>
    );
}