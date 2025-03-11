import { useState } from "react";

export const LobbyCollapse = () => {
  const [isOpen, setIsOpen] = useState(true); // Track if the collapse is open

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[var(--color-brnd-light)] w-70 border-transparent font-medium overflow-visible">
      {/* Clickable title to toggle */}
      <div
        className="collapse-title sm:text-[1.25rem] text-[var(--color-brnd-primary)] cursor-pointer flex items-center justify-between"
        onClick={toggleCollapse}
      >
        Lobby
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>

      {/* Collapse content */}
      {isOpen && (
        <div className="collapse-content">
          <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">
            {/* Front Office */}
            <div className="dropdown dropdown-hover dropdown-center">
              <div
                role="button"
                className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"
              >
                Front Office
              </div>
            </div>

            {/* Elevator */}
            <div className="dropdown dropdown-hover dropdown-center">
              <div
                role="button"
                className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"
              >
                Elevator
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};
