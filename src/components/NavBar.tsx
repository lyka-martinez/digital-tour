import { memo } from "react";
import { ChevronLeft } from 'lucide-react';

type NavBarProps = {
    onClick: () => void;
};

const NavBar = ({ onClick }: NavBarProps) => {
    return (
        <div className="navbar bg-base-100 flex-none gap-1 p-1 min-h-[50px] shadow-sm">
            <div className="flex-none">
                <button
                    className="btn btn-square btn-ghost rounded-md"
                    aria-label="Go back"
                    onClick={onClick}
                >
                    <ChevronLeft className="w-auto h-[24px]" />
                </button>
            </div>

            <div className="flex-1">
                <img 
                    src="./images/ter-long-logo.webp" 
                    alt="The Exchange Regency Hotel Logo" 
                    aria-label="The Exchange Regency Hotel Logo"  
                    className="object-cover h-[40px] w-auto" 
                />
            </div>
        </div>
    );
};

export default memo(NavBar);
