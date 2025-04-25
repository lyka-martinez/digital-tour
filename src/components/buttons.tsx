import { memo, ReactNode } from 'react';
import { ArrowDownRight } from 'lucide-react';


type ButtonProps = {
    text?: string;
    onClick?: () => void;
    isActive?: boolean;
    icon?: ReactNode;
}

/* Start Tour Button */
export const StartTourBtn = ({ text, onClick }: ButtonProps) => {
    return (
        <button
            className="btn font-medium pl-8 pr-5 gap-2 bg-brnd-secondary text-base-100 border-2 border-brnd-secondary duration-200 trasition-all rounded-lg shadow-sm hover:bg-base-200 hover:text-brnd-secondary md:btn-lg md:pl-9 md:pr-6 lg:h-[3rem] xl:h-[3.25rem] xl:pl-11 xl:pr-8"
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

/* Bed Options Button */
export const BedOptionButton = memo(({ text, onClick, isActive, icon }: ButtonProps) => {
    return (
        <button
            className={`btn font-medium rounded-lg justify-start hover:border-brnd-secondary focus:border-brnd-secondary xl:h-[2.625rem] shadow-xs ${
                isActive
                    ? "text-base-100 bg-brnd-primary border-brnd-secondary active:bg-brnd-primary-50"
                    : "text-brnd-secondary bg-base-100 border-transparent hover:bg-base-100/40"
            }`}
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}
            {text}
        </button>
    );
});

/* Facilities Item Button */
export const FacilityButton = memo(({ text, onClick, isActive }: ButtonProps) => {
    return (
        <button
            className={`btn text-wrap justify-start rounded-lg hover:border-brnd-secondary focus:border-brnd-secondary xl:h-[2.625rem] ${
                isActive
                ? "text-base-100 bg-brnd-primary border-brnd-secondary active:bg-brnd-primary-50"
                : "bg-base-100 border-neutral/20 hover:bg-brnd-primary/7 focus:bg-brnd-primary/7"
            }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
});
