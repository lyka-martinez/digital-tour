//Icons
import { ChevronLeft } from 'lucide-react';

export function Header() {
    return (
        <>
            <div className="navbar bg-[#FFFFFF] shadow-sm bg">
                <div className="flex">
                    <button className="btn max-w-full min-h-3 max-h-13 justify-items-center mt-1.5 rounded-full bg-[#FFFFFF] border-transparent hover:border-[#d3d3d3]">
                        <ChevronLeft />
                    </button>
                    <img src="/logos/TER_logo.png" alt="TER_logo" className="max-w-full min-h-3 max-h-13 ml-2"/>
                </div>
            </div>
        </>
    )
}