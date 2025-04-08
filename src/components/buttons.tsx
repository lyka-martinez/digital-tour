import { memo } from 'react';
import { ArrowDownRight } from 'lucide-react';

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    isActive?: boolean;
}

/* Landing Page Button */
export const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button
            className="btn w-fit pl-8 pr-5 gap-2 bg-brnd-secondary text-white border-2 border-brnd-secondary duration-200 trasition-all rounded-md shadow-sm hover:bg-base-200 hover:text-brnd-secondary focus:outline-none focus:ring-2 focus:ring-brnd-secondary focus:ring-offset-2 md:btn-lg md:pl-9 md:pr-6 lg:h-[3rem] xl:h-[3.25rem] xl:pl-11 xl:pr-8"
            onClick={onClick}
        >
            {text}
            <ArrowDownRight className="w-auto h-[1.375rem] md:h-[1.5rem] lg:h-[1.625rem] xl:h-[1.75rem]" />
        </button>
    );
};

/* Accordion Item Button */
export const AccordionButton = memo(({ text, onClick, isActive }: ButtonProps) => {
    return (
        <button
            className={`btn btn-block rounded-md border hover:bg-brnd-primary hover:border-brnd-primary-50 hover:text-base-100 active:bg-brnd-primary-50 active:border-brnd-primary-50 ${
                isActive
                    ? "bg-brnd-primary text-brnd-light border-brnd-primary-50"
                    : "border border-brnd-muted text-brnd-secondary bg-transparent"
            }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
});