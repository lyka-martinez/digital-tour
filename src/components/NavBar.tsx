import { ChevronLeft } from 'lucide-react';

type NavBarProps = {
    onClick: () => void;
};

export default function NavBar({ onClick }: NavBarProps) {
    return (
        <div className="navbar bg-base-100 shadow-sm flex-none gap-4">
            <div className="flex-none">
                <button
                    className="btn btn-square btn-ghost rounded-md"
                    aria-label="Go back"
                    onClick={onClick}
                >
                    <ChevronLeft size={30} />
                </button>
            </div>

            <div className="flex-1">
                <img src="./images/ter-long-logo.png" alt="TER Logo" className="h-[42px] w-auto object-cover" />
            </div>
        </div>
    );
}