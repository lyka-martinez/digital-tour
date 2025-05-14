import { memo, ReactNode } from 'react';


type ButtonProps = {
    type: 'startTour' | 'backToPage' | 'bedOption' | 'facility' | 'control';
    text?: string;
    tooltip?: string;
    onClick?: () => void;
    isActive?: boolean;
    icon?: ReactNode;
}


/**
 * Button component for various UI actions.
 * @param type - The type of button to render.
 * @param text - The text to display on the button.
 * @param tooltip - The tooltip text to display on hover.
 * @param onClick - The function to call when the button is clicked.
 * @param isActive - Whether the button is in an active state.
 * @param icon - The icon to display on the button.
 * @returns The rendered Button component.
 */

const Button = ({ type, text, tooltip, onClick, isActive, icon }: ButtonProps) => {
    const baseClass = "btn font-medium duration-200 transition-all";

    const typeClass = {
        startTour: 
            "text-base-100 bg-brnd-secondary border-2 border-brnd-secondary rounded-lg shadow-sm pl-8 pr-5 gap-2 hover:bg-base-200 hover:text-brnd-secondary md:btn-lg md:pl-9 md:pr-6 lg:h-[3rem] xl:h-[3.25rem] xl:pl-11 xl:pr-8",
        backToPage:
            "rounded-lg shadow-sm px-2 gap-2 md:btn-lg md:px-8 lg:h-[3rem] xl:h-[3.25rem]",
        bedOption:
            `rounded-lg shadow-xs justify-start hover:border-brnd-secondary/80 focus:border-brnd-secondary/80 xl:h-[2.625rem] ${
                isActive
                    ? "text-base-100 bg-brnd-primary border-brnd-secondary/40 active:bg-brnd-primary-50"
                    : "text-brnd-secondary bg-base-100 hover:bg-base-100/40"
            }`,
        facility:
            `font-semibold text-wrap justify-start rounded-lg hover:border-brnd-secondary/80 focus:border-brnd-secondary/80 xl:h-[2.625rem] ${
                isActive
                    ? "text-base-100 bg-brnd-primary border-brnd-secondary/40 active:bg-brnd-primary-50"
                    : "bg-base-100 border-neutral/20 hover:bg-brnd-primary/7 focus:bg-brnd-primary/7"
            }`,
        control: 
            "text-base-100 bg-transparent border-transparent shadow-none px-1 size-[2.375rem] xl:size-[2.5rem] hover:bg-neutral-800/80 focus:bg-neutral-800/80 active:bg-neutral-800/80"
    };


    const content = {
        startTour: <>{text}{icon}</>,
        bedOption: <>{icon}{text}</>,
        backToPage: text,
        facility: text,
        control: icon,
    }[type];


    const buttonEl = (
        <button className={`${baseClass} ${typeClass[type]}`} onClick={onClick} aria-label={tooltip || text} >
            {content}
        </button>
    );


    /** Tooltip for control buttons. */
    return type === "control" ? (
        <div className="tooltip tooltip-xs tooltip-neutral-800" data-tip={tooltip}>
            {buttonEl}
        </div>
    ) : buttonEl;
};

export default memo(Button);
