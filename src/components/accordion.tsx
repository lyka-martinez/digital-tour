//types
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

export const Accordion = ({title, with_drops, rooms, no_drops} : AccordionProps) => {
    return (
        <> 
            <div className="collapse collapse-arrow bg-[var(--color-brnd-light)] w-70 border-transparent font-medium overflow-visible">
                <input type="radio" name="my-accordion-2" defaultChecked />

                <div className="collapse-title sm:text-[1.25rem] text-[var(--color-brnd-primary)]">{title}</div>

                <div className="collapse-content">
                    <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">

                        {with_drops && with_drops.map((with_drop, index) => (
                            <div key={index} className="dropdown dropdown-hover dropdown-center">
                                <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">{with_drop}</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm">
                                    {rooms && rooms.map((room, index) => (
                                        <li key={index} className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>{room.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {no_drops && no_drops.map((no_drop, index) => (
                            <div key={index} className="dropdown dropdown-hover dropdown-right">
                                <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">{no_drop}</div>
                            </div>
                        ))}

                    </ul>
                </div>
            </div>
        </>
    );
}