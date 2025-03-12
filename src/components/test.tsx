import { useState } from "react";

// Types
type Room = {
    name: string;
    options?: string[];
};

type AccordionProps = {
    title: string;
    with_drops?: string[];
    rooms?: Room[];
    no_drops?: string[];
};

export const Accordion = ({ title, with_drops, rooms, no_drops }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[var(--color-brnd-muted)] rounded-lg overflow-hidden">
            {/* Toggle Accordion */}
            <div 
                className="collapse-title cursor-pointer sm:text-[1.25rem] text-[var(--color-brnd-primary)] p-4 bg-[var(--color-brnd-light)] flex justify-between items-center" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {/* Arrow Icon (Rotates when open) */}
                <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    ▼
                </span>
            </div>

            {/* Accordion Content (Hidden when closed) */}
            {isOpen && (
                <div className="p-4 bg-white">
                    <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">
                        {/* Items with dropdown */}
                        {with_drops && with_drops.map((with_drop, index) => (
                            <div key={index} className="dropdown dropdown-hover dropdown-center">
                                <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">
                                    {with_drop}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm">
                                    {rooms && rooms.map((room, index) => (
                                        <li key={index} className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">
                                            <a>{room.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Items without dropdown */}
                        {no_drops && no_drops.map((no_drop, index) => (
                            <div key={index} className="dropdown dropdown-hover dropdown-right">
                                <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">
                                    {no_drop}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
