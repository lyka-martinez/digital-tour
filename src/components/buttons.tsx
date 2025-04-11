import { memo } from 'react';
import { ArrowDownRight } from 'lucide-react';

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    isActive?: boolean;
}

/* Start Tour Button */
export const StartTourBtn = ({ text, onClick }: ButtonProps) => {
    return (
        <button
            className="btn pl-8 pr-5 gap-2 bg-brnd-secondary text-white border-2 border-brnd-secondary duration-200 trasition-all rounded-lg shadow-sm hover:bg-base-200 hover:text-brnd-secondary md:btn-lg md:pl-9 md:pr-6 lg:h-[3rem] xl:h-[3.25rem] xl:pl-11 xl:pr-8"
            onClick={onClick}
        >
            {text}
            <ArrowDownRight className="w-auto h-[1.25rem] md:h-[1.5rem] xl:h-[1.625rem]" />
        </button>
    );
};

/* Back to Main Page Button */
export const BackToPageBtn = ({ text, onClick }: ButtonProps) => {
    return (
        
        <button
            className="btn font-medium px-2 gap-2 duration-200 trasition-all rounded-lg shadow-sm md:btn-lg md:px-8 lg:h-[3rem] xl:h-[3.25rem]"
            onClick={onClick}
        >
            {text}
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