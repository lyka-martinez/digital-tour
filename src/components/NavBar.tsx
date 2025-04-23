import { memo } from "react";
import { ChevronLeft } from 'lucide-react';

type NavBarProps = {
    onClick: () => void;
};

const NavBar = ({ onClick }: NavBarProps) => {
    return ( 
        <div className="navbar bg-base-100 flex-none gap-1 py-0 min-h-[3.25rem] border-b border-base-300">
            <div className="flex-none">
                <button
                    className="btn btn-square btn-ghost rounded-md border-transparent w-[2.5rem] h-[2.625rem] md:w-[2.625rem]"
                    aria-label="Go back"
                    onClick={onClick}
                >   
                    <ChevronLeft className="w-auto h-[1.5rem] md:h-[1.75rem] " />
                </button>
            </div>

            <div className="flex-1">
                <img 
                    src="./images/ter-long-logo.webp" 
                    alt="The Exchange Regency Hotel Logo" 
                    aria-label="The Exchange Regency Hotel Logo"  
                    className="object-cover w-auto h-[2.5rem] md:h-[2.625rem]" 
                />
            </div>
        </div>
    );
};

export default memo(NavBar);
